import express from "express";
import userAction from "./user/userAction/signAction";
import authAction from "./user/userAction/authAction";
import { userValidation } from "./validation/validations";
import auth from "./middleware/auth";
import verifyToken from "./middleware/verifyToken";

// Sous-routeur API
import apiRoutes from "./routes/api";

const router = express.Router();

router.use("/resources", apiRoutes);

router.post("/user", userValidation, auth.hashPassword, userAction.add);
router.post("/login", authAction.login);

// Route protégée test
router.get("/private", verifyToken, (req, res) => {
  res.json({ message: "Tu es connecté", user: (req as any).user });
});

export default router;
