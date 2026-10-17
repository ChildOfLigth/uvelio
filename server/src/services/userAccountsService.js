import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { pool } from "../../database/initDB.js";
import { generateToken } from "../../operationsWithToken.js";

const SALT_ROUNDS = 14;

async function userRegistration({ name, surname, email, password }) {
  const id = uuid();
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const existing = await pool.query(
    "SELECT id FROM userAccounts WHERE email = $1",
    [email],
  );

  if (existing.rows.length > 0) {
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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  await pool.query(sql, [
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
      id,
      username: `${name} ${surname}`,
      email,
      wishList: [],
      purchasedGoods: [],
    },
    access: accessToken,
    refresh: refreshToken,
  };
}

async function loginUser({ email, password }) {
  const result = await pool.query(
    "SELECT * FROM userAccounts WHERE email = $1",
    [email],
  );

  const user = result.rows[0];
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

  await pool.query("UPDATE userAccounts SET refresh_token = $1 WHERE id = $2", [
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

  const result = await pool.query("SELECT * FROM userAccounts WHERE id = $1", [
    decoded.userId,
  ]);

  const user = result.rows[0];

  if (!user) {
    const err = new Error("No user with this ID exists.");
    err.code = 401;
    throw err;
  }

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
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.REFRESH_SECRET);
  } catch (err) {
    throw err;
  }

  const result = await pool.query("SELECT * FROM userAccounts WHERE id = $1", [
    decoded.userId,
  ]);

  const user = result.rows[0];

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

  await pool.query("UPDATE userAccounts SET refresh_token = $1 WHERE id = $2", [
    newRefreshToken,
    decoded.userId,
  ]);

  return {
    access: newAccessToken,
    refresh: newRefreshToken,
  };
}

async function addProductToWishList(productId, userId) {
  const result = await pool.query(
    "SELECT wish_list FROM userAccounts WHERE id = $1",
    [userId],
  );

  const row = result.rows[0];
  const currentWishList = JSON.parse(row?.wish_list || "[]");
  const updatedWishList = [...currentWishList, productId];

  await pool.query("UPDATE userAccounts SET wish_list = $1 WHERE id = $2", [
    JSON.stringify(updatedWishList),
    userId,
  ]);

  return updatedWishList;
}

async function removeProdToWihsList(prodId, userId) {
  const result = await pool.query(
    "SELECT wish_list FROM userAccounts WHERE id = $1",
    [userId],
  );

  const row = result.rows[0];
  let wishList = JSON.parse(row?.wish_list || "[]");
  const index = wishList.indexOf(prodId);

  if (index > -1) {
    wishList.splice(index, 1);
  }

  await pool.query("UPDATE userAccounts SET wish_list = $1 WHERE id = $2", [
    JSON.stringify(wishList),
    userId,
  ]);

  return wishList;
}

async function addProdToPurchasedGoods(prodId, userId) {
  const result = await pool.query(
    "SELECT purchased_goods FROM userAccounts WHERE id = $1",
    [userId],
  );

  const row = result.rows[0];
  const currentPurchasedsArr = JSON.parse(row?.purchased_goods || "[]");
  const updatedPurchasedsArr = [...currentPurchasedsArr, prodId];

  await pool.query(
    "UPDATE userAccounts SET purchased_goods = $1 WHERE id = $2",
    [JSON.stringify(updatedPurchasedsArr), userId],
  );

  return updatedPurchasedsArr;
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
