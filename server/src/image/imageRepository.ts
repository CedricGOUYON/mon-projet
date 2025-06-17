import { databaseClient } from "../database/clients";

export interface Image {
  id?: number;
  name: string;
  url: string;
}

export async function getAllImages(): Promise<Image[]> {
  const [rows] = await databaseClient.query("SELECT * FROM images");
  return rows as Image[];
}

export async function addImage(image: Image): Promise<void> {
  await databaseClient.execute("INSERT INTO images (name, url) VALUES (?, ?)", [image.name, image.url]);
}

export async function deleteImage(id: number): Promise<void> {
  await databaseClient.execute("DELETE FROM images WHERE id = ?", [id]);
}
