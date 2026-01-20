import { Router } from "express";
import {
    getAllProductsController,
    getOneProductController
} from "../controllers/productsController.js";

const router = Router();

router.get("/", getAllProductsController);
router.get("/:id", getOneProductController);

export default router;
