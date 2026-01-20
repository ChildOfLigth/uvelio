import { Router } from "express";
import {
    userRegistrationController,
    loginController,
    getOneUserController,
    deleteUserController
}
    from "../controllers/userAccountsController.js";

const router = Router();

router.post("/registration", userRegistrationController);
router.post("/login", loginController);
router.get("/:id", getOneUserController);
router.delete("/:id", deleteUserController);

export default router;
