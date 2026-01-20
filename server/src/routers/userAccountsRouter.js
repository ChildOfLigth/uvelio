import { Router } from "express";
import {
    getOneUser,
    addUser,
    deleteUser
} from "../controllers/userController.js";

const router = Router();

router.get("/:id", getOneUser);
router.post("/", addUser);
router.delete("/:id", deleteUser);

export default router;
