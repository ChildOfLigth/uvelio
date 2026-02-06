import { Router } from "express";
import {
    userRegistrationController,
    loginController,
    getOneUserController
}
    from "../controllers/userAccountsController.js";

const router = Router();

router.post("/registration", userRegistrationController);
router.post("/login", loginController);
router.get("/:id", getOneUserController);

export default router;
