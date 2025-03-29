import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnimatePresence, motion } from "framer-motion";

type Character = {
  id: number;
  name: string;
  image: string;
};

type Filters = {
  status?: string;
  gender?: string;
  species?: string;
};

const CharacterList = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const nameParam = searchParams.get("name") || "";
  const statusParam = searchParams.get("status") || "";
  const genderParam = searchParams.get("gender") || "";
  const speciesParam = searchParams.get("species") || "";

  const [isLoading, setIsLoading] = useState(true);
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(pageParam);

  const updatePage = (newPage: number) => {
    setSearchParams({ name: nameParam, page: newPage.toString() });
    setPage(newPage);
  };

  const handleSearch = (query: string, filters: Filters) => {
    const params = {
      name: query,
      page: "1",
      ...filters,
    };

    setSearchParams(params);
    setPage(1);
  };

  useEffect(() => {
    setIsLoading(true);

    const url = new URL("https://rickandmortyapi.com/api/character/");
    url.searchParams.set("name", nameParam);
    url.searchParams.set("page", page.toString());
    if (statusParam) url.searchParams.set("status", statusParam);
    if (genderParam) url.searchParams.set("gender", genderParam);
    if (speciesParam) url.searchParams.set("species", speciesParam);

    fetch(url.toString())
      .then((response) => {
        if (!response.ok) throw new Error("Aucun résultat");
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur API:", error);
        setCharacters([]);
        setIsLoading(false);
      });
  }, [nameParam, statusParam, genderParam, speciesParam, page]);

  if (!isLoading && characters.length === 0) {
    return (
      <div className="p-4">
        <SearchBar
          value={nameParam}
          status={statusParam}
          gender={genderParam}
          species={speciesParam}
          onSearch={handleSearch}
        />
        <div className="text-center text-gray-500 flex flex-col items-center">
          <DotLottieReact
            src="https://lottie.host/99104286-a331-449b-bb48-c9aad1848ae0/tGL5EXW0o4.lottie"
            autoplay
            loop
            style={{ width: 220, height: 220 }}
          />
          <p className="mt-2 text-sm">
            Aucun personnage ne correspond à cette recherche.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-indigo-500 hover:underline mt-4"
          >
            Reviens à la maison Morty
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-[15vh]">
      <Link to="/" className="block w-fit mx-auto mb-6">
        <img
          src="/Rick_and_Morty.svg"
          alt="Rick and Morty Logo"
          className="h-12 md:h-16 hover:opacity-80 transition"
        />
      </Link>

      <SearchBar
        value={nameParam}
        status={statusParam}
        gender={genderParam}
        species={speciesParam}
        onSearch={handleSearch}
      />

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {characters.map((character) => (
              <Link key={character.id} to={`/character/${character.id}`}>
                <div className="bg-[#0b1528] rounded-3xl shadow-lg p-4 text-center hover:shadow-xl hover:brightness-110 transition-transform duration-300 hover:scale-90">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-24 h-24 mx-auto rounded-full"
                  />
                  <h2 className="mt-2 font-semibold">{character.name}</h2>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-[6vh] md:bottom-6 left-0 w-full flex justify-center gap-4 z-50 pointer-events-none">
        {page > 1 && (
          <button
            onClick={() => updatePage(page - 1)}
            className="pointer-events-auto bg-white/10 hover:bg-white/20 text-[#1cf094] backdrop-blur-md px-6 py-3 rounded-full text-lg shadow-lg transition-all"
          >
            ←
          </button>
        )}
        {characters.length === 20 && (
          <button
            onClick={() => updatePage(page + 1)}
            className="pointer-events-auto bg-white/10 hover:bg-white/20 text-[#1cf094] backdrop-blur-md px-6 py-3 rounded-full text-lg shadow-lg transition-all"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

export default CharacterList;
