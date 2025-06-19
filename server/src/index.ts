import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as imageAction from "./image/imageAction";
import router from "./routes"; // Import de ton routeur global

const app = express();
const PORT = 3310;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes images (tu peux garder celles-ci ou les déplacer dans routes/api)
app.get("/api/resources", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await imageAction.browse();
    res.json(images);
  } catch (err) {
    console.error("Erreur GET /api/resources:", err);
    next(err); // passe au middleware d'erreur
  }
});

app.get("/api/resources/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

    const images = await imageAction.browse();
    const image = images.find((img) => img.id === id);
    if (!image) return res.status(404).json({ error: "Image non trouvée" });

    res.json(image);
  } catch (err) {
    console.error(`Erreur GET /api/resources/${req.params.id}:`, err);
    next(err);
  }
});

app.post("/api/resources", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ error: "Données manquantes" });

    await imageAction.create({ name, url });
    res.status(201).json({ message: "Image ajoutée" });
  } catch (err) {
    console.error("Erreur POST /api/resources:", err);
    next(err);
  }
});

app.delete("/api/resources/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

    await imageAction.destroy(id);
    res.status(204).end();
  } catch (err) {
    console.error(`Erreur DELETE /api/resources/${req.params.id}:`, err);
    next(err);
  }
});

// Utilisation du routeur global pour toutes les routes /api/* non définies ci-dessus
app.use("/api", router);

// Middleware global de gestion des erreurs
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("ERREUR SERVEUR:", err);
  res.status(500).json({ error: "Erreur serveur interne" });
});

app.listen(PORT, () => {
  console.log(`Server lancé sur http://localhost:${PORT}`);
});
