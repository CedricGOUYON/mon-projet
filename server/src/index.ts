import express from "express";
import cors from "cors";
import * as imageAction from "./image/imageAction";

const app = express();
const PORT = 3310;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// GET all images
app.get("/api/resources", async (req, res) => {
  try {
    const images = await imageAction.browse();
    res.json(images);
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET image by id
app.get("/api/resources/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

    const images = await imageAction.browse();
    const image = images.find((img) => img.id === id);
    if (!image) return res.status(404).json({ error: "Image non trouvée" });

    res.json(image);
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST add new image
app.post("/api/resources", async (req, res) => {
  try {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ error: "Données manquantes" });

    await imageAction.create({ name, url });
    res.status(201).json({ message: "Image ajoutée" });
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE image by id
app.delete("/api/resources/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

    await imageAction.destroy(id);
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend lancé sur http://localhost:${PORT}`);
});
