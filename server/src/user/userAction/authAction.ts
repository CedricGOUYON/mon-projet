import type { RequestHandler } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import authRepository from "../userRepository/authRepository";

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", { expiresIn: "2h" });

    res.status(200).json({
      token,
      firstName: user.firstName,
      email: user.email,
    });
  } catch (err) {
    console.error("Erreur dans login:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export default { login };
