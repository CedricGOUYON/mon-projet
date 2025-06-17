const API_BASE = "http://localhost:3310/api";

export async function getAllImages() {
  const res = await fetch(`${API_BASE}/resources`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des images");
  return res.json();
}

export async function getImageById(id: number) {
  const res = await fetch(`${API_BASE}/resources/${id}`);
  if (!res.ok) throw new Error("Erreur lors de la récupération de l'image");
  return res.json();
}

export async function addImage(imageData: { name: string; url: string }) {
  const res = await fetch(`${API_BASE}/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imageData),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout de l'image");
  return res.json();
}

export async function deleteImage(id: number) {
  const res = await fetch(`${API_BASE}/resources/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de l'image");
}
