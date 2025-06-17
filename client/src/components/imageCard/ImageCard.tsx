import "./ImageCard.css";
import type { Image } from "../../types/image";

interface Props {
  image: Image;
  onDelete: (id: number) => void;
  onRead: (id: number) => void;
}

export default function ImageCard({ image, onDelete, onRead }: Props) {
  return (
    <div className="image-card">
      <h3>{image.name}</h3>
      <img src={image.url} alt={image.name} onClick={() => onRead(image.id)} style={{ cursor: "pointer" }} />
      <div>
        {/* Optionnel : on peut garder ou supprimer le bouton "Lire" */}
        {/* <button onClick={() => onRead(image.id)}>Lire</button> */}
        <button onClick={() => onDelete(image.id)}>Supprimer</button>
      </div>
    </div>
  );
}
