import { Router } from "express";
import {
    userRegistrationController,
    loginController,
    checkAuthStatusController,
    refreshController,
    addProductToWishListController,
    removeProdToWihsListController,
    addProdToPurchasedGoodsController,
}
from "../controllers/userAccountsController.js";

const router = Router();

router.post("/registration", userRegistrationController);
router.post("/login", loginController);
router.get("/check-auth-status", checkAuthStatusController);
router.post("/update-token", refreshController);
router.post("/add-product-to-wishList", addProductToWishListController);
router.post("/remove-product-from-wishList", removeProdToWihsListController);
router.post("/add-product-from-purchaseds", addProdToPurchasedGoodsController);

export default router;
