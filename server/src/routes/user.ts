import { Router } from "express";
import { databaseClient } from "../database/clients";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const [rows] = await databaseClient.query("SELECT * FROM user");
    res.json(rows);
  } catch (error) {
    console.error("Erreur base de données:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
