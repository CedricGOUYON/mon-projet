import { useEffect, useState } from "react";
import "../rickAndMorty/RickAndMortyPage.css";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};

const RickAndMortyPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("Échec de la récupération des personnages");
        const data = await res.json();
        setCharacters(data.results);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Chargement des personnages...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="container">
      <h1>Personnages de Rick and Morty</h1>
      <div className="grid">
        {characters.map((char) => (
          <div className="card" key={char.id}>
            <img src={char.image} alt={char.name} />
            <h2>{char.name}</h2>
            <p>
              {char.species} - {char.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RickAndMortyPage;
