import { RequestHandler } from "express";
import userRepository from "../userRepository/signRepository";

const add: RequestHandler = async (req, res) => {
  console.log("🔔 Requête reçue pour /user:", req.body);

  try {
    const result = await userRepository.create(req.body);

    if (result) {
      res.status(201).json("Your account has been created successfully");
    } else {
      res.status(400).json("Account creation failed");
    }
  } catch (err) {
    console.warn("🔥 Erreur création compte:", err);
    res.status(500).json("Internal server error");
  }
};

export default { add };
