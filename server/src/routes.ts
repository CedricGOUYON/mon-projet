import express from "express";
import userAction from "./user/userAction/signAction";
import authAction from "./user/userAction/authAction";
import { userValidation } from "./validation/validations";
import auth from "./middleware/auth";

// Sous-routeur API
import apiRoutes from "./routes/api";

const router = express.Router();

// Mount des routes REST d'image
router.use("/resources", apiRoutes);

// Auth routes
router.post("/user", userValidation, auth.hashPassword, userAction.add);
router.post("/login", authAction.login);

export default router;
