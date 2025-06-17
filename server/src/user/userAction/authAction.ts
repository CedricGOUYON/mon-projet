import type { RequestHandler } from "express";
import argon2 from "argon2";
import authRepository from "../userRepository/authRepository";

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authRepository.findByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    console.error("❌ Erreur dans login:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export default { login };
