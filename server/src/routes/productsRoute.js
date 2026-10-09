import { Router } from "express";
import {
  getLengthController,
  getProductsController,
  searchProdsByNameController,
  additionalLoadingOfProdsController,
  gettingProdsForNewPageController,
  getPriceRangeController,
  getReviewForProductController,
  getProductsByIdController
} from "../controllers/productsController.js";

const router = Router();
router.get("/get-length", getLengthController);
router.get("/get-products", getProductsController);
router.get("/search-prods-by-name", searchProdsByNameController);
router.get("/additional-loading-of-prods", additionalLoadingOfProdsController);
router.get("/get-price-range", getPriceRangeController);
router.get("/getting-prods-for-new-page", gettingProdsForNewPageController);
router.get("/get-review", getReviewForProductController);
router.get("/get-produts-by-id", getProductsByIdController);

export default router;
