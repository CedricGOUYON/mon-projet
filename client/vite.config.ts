import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/", // le nom du repo GitHub exactement ici
  plugins: [react()],
});
