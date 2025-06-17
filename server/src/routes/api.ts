import express from "express";
import * as imageController from "../controllers/imageController";

const router = express.Router();

router.get("/", imageController.getImages);
router.post("/", imageController.addImage);
router.delete("/:id", imageController.deleteImage);

export default router;
