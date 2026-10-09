import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { userAccountDB } from "../../database/initDB.js";
import { generateToken } from "../../operationsWithToken.js";

const SALT_ROUNDS = 14;

function dbGet(query, params = []) {
  return new Promise((resolve, reject) => {
    userAccountDB.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function dbRun(query, params = []) {
  return new Promise((resolve, reject) => {
    userAccountDB.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

async function userRegistration({ name, surname, email, password }) {
  const id = uuid();
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const existing = await dbGet("SELECT id FROM userAccounts WHERE email = ?", [
    email,
  ]);

  if (existing) {
    throw new Error("This email is already registered");
  }

  const accessToken = generateToken(
    id,
    process.env.JWT_SECRET,
    "15m",
    "access",
  );
  const refreshToken = generateToken(
    id,
    process.env.REFRESH_SECRET,
    "15d",
    "refresh",
  );

  const sql = `
    INSERT INTO userAccounts (id, name, surname, email, password, wish_list, purchased_goods, refresh_token)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await dbRun(sql, [
    id,
    name,
    surname,
    email,
    hashedPassword,
    "[]",
    "[]",
    refreshToken,
  ]);

  return {
    userData: {
      id: id,
      username: `${name} ${surname}`,
      email: email,
      wishList: [],
      purchasedGoods: [],
    },
    access: accessToken,
    refresh: refreshToken,
  };
}

async function loginUser({ email, password }) {
  const user = await dbGet("SELECT * FROM userAccounts WHERE email = ?", [
    email,
  ]);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const accessToken = generateToken(
    user.id,
    process.env.JWT_SECRET,
    "15m",
    "access",
  );
  const refreshToken = generateToken(
    user.id,
    process.env.REFRESH_SECRET,
    "15d",
    "refresh",
  );

  await dbRun("UPDATE userAccounts SET refresh_token = ? WHERE id = ?", [
    refreshToken,
    user.id,
  ]);

  return {
    userData: {
      id: user.id,
      username: `${user.name} ${user.surname}`,
      email: user.email,
      wishList: JSON.parse(user.wish_list || "[]"),
      purchasedGoods: JSON.parse(user.purchased_goods || "[]"),
    },
    access: accessToken,
    refresh: refreshToken,
  };
}

async function checkAuthStatus(accessToken) {
  if (!accessToken) {
    const err = new Error("The token does not exist.");
    err.code = 401;
    throw err;
  }

  let decoded;

  try {
    decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }

  const user = await dbGet("SELECT * FROM userAccounts WHERE id = ?", [
    decoded.userId,
  ]);

  if (!user) {
    const err = new Error("No user with this ID exists.");
    err.code = 401;
    throw err;
  };

  return {
    userData: {
      id: user.id,
      username: `${user.name} ${user.surname}`,
      email: user.email,
      wishList: JSON.parse(user.wish_list || "[]"),
      purchasedGoods: JSON.parse(user.purchased_goods || "[]"),
    },
    authStatus: true,
  };
}

async function updateToken(token) {
  if (!token) {
    const err = new Error("No refresh token");
    err.code = 401;
    throw err;
  };

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.REFRESH_SECRET);
  } catch (err) {
    throw err;
  };

  const user = await dbGet(
    "SELECT id, refresh_token FROM userAccounts WHERE id = ?",
    [decoded.userId],
  );

  if (!user) {
    const err = new Error("User not found");
    err.code = 404;
    throw err;
  }

  if (user.refresh_token !== token) {
    const err = new Error("Refresh token revoked");
    err.code = 401;
    throw err;
  }

  const newAccessToken = generateToken(
    decoded.userId,
    process.env.JWT_SECRET,
    "15m",
    "access",
  );

  const newRefreshToken = generateToken(
    decoded.userId,
    process.env.REFRESH_SECRET,
    "15d",
    "refresh",
  );

  await dbRun("UPDATE userAccounts SET refresh_token = ? WHERE id = ?", [
    newRefreshToken,
    decoded.userId,
  ]);

  return {
    userData: {
      id: decoded.userId,
      username: `${user.name} ${user.surname}`,
      email: user.email,
      wishList: JSON.parse(user.wish_list || "[]"),
      purchasedGoods: JSON.parse(user.purchased_goods || "[]"),
    },
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

function addProductToWishList(productId, userId) {
  return new Promise((resolve, reject) => {
    userAccountDB.get(
      "SELECT wish_list FROM userAccounts WHERE id = ?",
      [userId],
      (err, row) => {
        if (err) return reject(err);

        const currentWishList = JSON.parse(row?.wish_list) || [];
        const updatedWishList = [...currentWishList, productId];

        userAccountDB.run(
          "UPDATE userAccounts SET wish_list = ? WHERE id = ?",
          [JSON.stringify(updatedWishList), userId],
          (err) => {
            if (err) return reject(err);

            resolve(updatedWishList);
          },
        );
      },
    );
  });
}

function removeProdToWihsList(prodId, userId) {
  return new Promise((resolve, reject) => {
    userAccountDB.get(
      "SELECT wish_list FROM userAccounts WHERE id = ?",
      [userId],
      (err, row) => {
        if (err) return reject(err.message);

        let wishList = JSON.parse(row.wish_list);
        const index = wishList.indexOf(prodId);
        if (index > -1) {
          wishList.splice(index, 1);
        }

        userAccountDB.run(
          "UPDATE userAccounts SET wish_list = ? WHERE id = ?",
          [JSON.stringify(wishList), userId],
          (err) => {
            if (err) return reject(err);

            resolve(wishList);
          },
        );
      },
    );
  });
}

function addProdToPurchasedGoods(prodId, userId) {
  return new Promise((resolve, reject) => {
    userAccountDB.get(
      "SELECT purchased_goods FROM userAccounts WHERE id = ?",
      [userId],
      (err, row) => {
        if (err) reject(err.message);

        const currentPurchasedsArr = JSON.parse(row?.purchased_goods) || [];
        const updatedPurchasedsArr = [...currentPurchasedsArr, prodId];

        userAccountDB.run(
          "UPDATE userAccounts SET purchased_goods = ? WHERE id = ?",
          [JSON.stringify(updatedPurchasedsArr), userId],
          (err) => {
            if (err) reject(err.message);

            resolve(updatedPurchasedsArr);
          },
        );
      },
    );
  });
}

export {
  userRegistration,
  loginUser,
  checkAuthStatus,
  updateToken,
  addProductToWishList,
  removeProdToWihsList,
  addProdToPurchasedGoods,
};