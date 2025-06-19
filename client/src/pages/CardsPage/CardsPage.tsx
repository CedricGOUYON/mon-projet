import "./CardPage.css";
import { useEffect, useState } from "react";
import { getAllImages, addImage, deleteImage, getImageById } from "../../api/image";
import type { Image } from "../../types/image";
import ImageCard from "../../components/imageCard/ImageCard";

export default function CardsPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [filter, setFilter] = useState("");

  const fetchImages = async () => {
    try {
      const data = await getAllImages();
      setImages(data);
    } catch (err) {
      console.error("Erreur fetchImages:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAdd = async () => {
    if (!newName || !newUrl) return;
    try {
      await addImage({ name: newName, url: newUrl });
      setNewName("");
      setNewUrl("");
      fetchImages();
    } catch (err) {
      console.error("Erreur handleAdd:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteImage(id);

      if (selectedImage?.id === id) setSelectedImage(null);
      fetchImages();
    } catch (err) {
      console.error("Erreur handleDelete:", err);
    }
  };

  const handleRead = async (id: number) => {
    try {
      const img = await getImageById(id);
      setSelectedImage(img);
    } catch (err) {
      console.error("Erreur handleRead:", err);
    }
  };

  const filteredImages = filter ? images.filter((img) => img.name.toLowerCase().includes(filter.toLowerCase())) : images;

  return (
    <div className="cards-container">
      <h1>Les cartes</h1>

      <div className="form">
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nom" />
        <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL" />
        <button onClick={handleAdd}>Ajouter</button>
      </div>

      <div style={{ margin: "1rem 0" }}>
        <input type="text" placeholder="Filtrer par nom" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      {selectedImage && (
        <div className="selected">
          <h2>{selectedImage.name}</h2>
          <img src={selectedImage.url} alt={selectedImage.name} />
        </div>
      )}

      <div className="cards-grid">
        {filteredImages.map((img) => (
          <ImageCard key={img.id} image={img} onDelete={handleDelete} onRead={handleRead} />
        ))}
      </div>
    </div>
  );
}
