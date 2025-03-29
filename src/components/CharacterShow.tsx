import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Origin = {
  name: string;
};

type Location = {
  name: string;
};

type Episode = {
  id: number;
  name: string;
  episode: string;
};

type CharacterInfo = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: Origin;
  location: Location;
  episode: string[];
};

const CharacterShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<CharacterInfo | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const handleBack = () => navigate(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCharacter = async () => {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await res.json();
        setCharacter(data);

        const episodesFetched = await Promise.all(
          data.episode.map((url: string) =>
            fetch(url).then((res) => res.json())
          )
        );
        setEpisodes(episodesFetched);
      } catch (err) {
        console.error("Erreur API:", err);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character)
    return <p className="text-center text-white mt-10">Chargement...</p>;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-[#070f1c] text-white px-6 py-6"
    >
      <button
        onClick={handleBack}
        className="mb-4 text-gray-400 hover:text-[#1cf094] text-lg"
      >
        ← Retour
      </button>

      {/* Photo + basic info */}
      <div className="flex gap-4 items-start mb-6">
        <img
          src={character.image}
          alt={character.name}
          className="w-28 h-28 rounded-md object-cover"
        />
        <div className="space-y-1 pt-1">
          <h1 className="text-2xl font-bold text-[#1cf094]">
            {character.name}
          </h1>
          <p className="text-sm text-gray-300">{character.status}</p>
          <p className="text-sm text-gray-300">
            {character.gender} — {character.species}
          </p>
        </div>
      </div>

      {/* Origin */}
      <div className="w-full py-4 border-t border-[#1cf094]/20">
        <h2 className="text-[#1cf094] text-sm font-semibold uppercase mb-1">
          Origine
        </h2>
        <p className="text-gray-200">{character.origin.name}</p>
      </div>

      {/* Location */}
      <div className="w-full py-4 border-t border-[#1cf094]/20">
        <h2 className="text-[#1cf094] text-sm font-semibold uppercase mb-1">
          Localisation actuelle
        </h2>
        <p className="text-gray-200">{character.location.name}</p>
      </div>

      {/* Featured Episodes */}
      <div className="w-full py-4 border-t border-[#1cf094]/20">
        <h2 className="text-[#1cf094] text-sm font-semibold uppercase mb-2">
          Épisodes
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
          {episodes.map((ep) => (
            <li key={ep.id}>
              {ep.episode} — {ep.name}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default CharacterShow;
