import { serialize } from "cookie";
import {
  userRegistration,
  loginUser,
  checkAuthStatus,
  updateToken,
  addProductToWishList,
  removeProdToWihsList,
  addProdToPurchasedGoods,
} from "../services/userAccountsService.js";

async function userRegistrationController(req, res) {
  try {
    const { name, surname, email, password } = req.body;
    const data = await userRegistration({ name, surname, email, password });
    const userData = data.userData;
    const accessToken = data.access;
    const refreshToken = data.refresh;

    res.setHeader("Set-Cookie", [
      serialize("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        maxAge: 15 * 60,
        path: "/",
      }),
      serialize("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        maxAge: 20 * 24 * 60 * 60,
        path: "/userAccount/update-token",
      }),
    ]);

    res.status(201).json(userData);
  } catch (err) {
    if (err.message.includes("already registered")) {
      return res.status(409).json({
        name: "conflict",
        message: err.message,
      });
    }

    res.status(500).json({
      name: "server_error",
      message: err.message,
    });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const data = await loginUser({ email, password });
    const userData = data.userData;
    const accessToken = data.access;
    const refreshToken = data.refresh;

    res.setHeader("Set-Cookie", [
      serialize("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        maxAge: 15 * 60,
        path: "/",
      }),
      serialize("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        maxAge: 20 * 24 * 60 * 60,
        path: "/userAccount/update-token",
      }),
    ]);

    res.status(200).json(userData);
  } catch (err) {
    if (
      err.message === "User not found" ||
      err.message === "Invalid password"
    ) {
      return res.status(401).json({
        name: "invalid_data",
        message: "User not found or incorrect data was received",
      });
    }
    res.status(500).json({ name: "server_error" });
  }
}

async function checkAuthStatusController(req, res) {
  try {
    const accessToken = req.cookies?.access_token;
    const result = await checkAuthStatus(accessToken);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.code || 500).json({
      code: err.code || 500,
      message: err.message,
    });
  }
}

async function refreshController(req, res) {
  try {
    const refreshTokenCookie = req.cookies.refresh_token;
    const data = await updateToken(refreshTokenCookie);

    res.setHeader("Set-Cookie", [
      serialize("access_token", data.access, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        maxAge: 15 * 60,
        path: "/",
      }),
      serialize("refresh_token", data.refresh, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true,
        maxAge: 20 * 24 * 60 * 60,
        path: "/userAccount/update-token",
      }),
    ]);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.clearCookie("access_token", {
      path: "/",
      secure: true,
      sameSite: "none",
      partitioned: true,
    });
    res.clearCookie("refresh_token", {
      path: "/userAccount/update-token",
      secure: true,
      sameSite: "none",
      partitioned: true,
    });

    return res.status(err.code || 500).json({ message: err.message });
  }
}

async function addProductToWishListController(req, res) {
  const { productId, userId } = req.body;

  if (!productId || !userId) {
    return res
      .status(400)
      .json({ message: "Product id or user id are required" });
  }

  try {
    const updateWishList = await addProductToWishList(productId, userId);
    res.status(200).json(updateWishList);
  } catch (err) {
    return res.status(err.code || 500).json(err.message);
  }
}

async function removeProdToWihsListController(req, res) {
  const { productId, userId } = req.body;

  if (!productId || !userId) {
    return res
      .status(400)
      .json({ message: "Product id or user id are required" });
  }

  try {
    const updatedData = await removeProdToWihsList(productId, userId);
    res.status(200).json(updatedData);
  } catch (err) {
    return res.status(500).json(err.name);
  }
}

async function addProdToPurchasedGoodsController(req, res) {
  const { productId, userId } = req.body;

  if (productId == undefined || userId == undefined) {
    return res
      .status(400)
      .json({ message: "Product id or user id are required" });
  }

  try {
    const updatedData = await addProdToPurchasedGoods(productId, userId);
    return res.status(200).json(updatedData);
  } catch (err) {
    return res.status(500).json(err.name);
  }
}

export {
  userRegistrationController,
  loginController,
  checkAuthStatusController,
  refreshController,
  addProductToWishListController,
  removeProdToWihsListController,
  addProdToPurchasedGoodsController,
};