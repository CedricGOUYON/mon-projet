import { Request, Response } from "express";
import * as imageAction from "../image/imageAction";

export async function getImages(req: Request, res: Response) {
  try {
    const images = await imageAction.browse();
    res.json(images);
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function addImage(req: Request, res: Response) {
  try {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ error: "name et url sont requis" });
    await imageAction.create({ name, url });
    res.status(201).json({ message: "Image ajoutée" });
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteImage(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });
    await imageAction.destroy(id);
    res.json({ message: "Image supprimée" });
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
