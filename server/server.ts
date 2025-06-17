import express from "express";
import cors from "cors";
import imageRoutes from "../server/src/routes/api";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/images", imageRoutes);

const PORT = process.env.APP_PORT || 3310;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
