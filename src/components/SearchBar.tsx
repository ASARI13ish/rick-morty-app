import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  value: string;
  status?: string;
  gender?: string;
  species?: string;
  onSearch: (query: string, filters: Filters) => void;
};

type Filters = {
  status?: string;
  gender?: string;
  species?: string;
};

const SearchBar = ({
  value,
  onSearch,
  status = "",
  gender = "",
  species = "",
}: Props) => {
  const [input, setInput] = useState(value);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    status,
    gender,
    species,
  });

  // Close filters if click outside of the box
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(input, filters);
    }
  };

  const updateFilter = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(input, newFilters);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-6">
      <div className="flex items-center bg-[#0b1528] border border-[#1cf094]/20 rounded-full px-5 py-3 shadow-inner">
        <input
          type="text"
          placeholder="Rechercher un personnage..."
          className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {input && (
          <button
            onClick={() => {
              setInput("");
              onSearch("", filters);
            }}
            className="ml-3 px-2 text-lg text-gray-400 hover:text-[#1cf094] transition"
          >
            ✕
          </button>
        )}

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="ml-4 text-sm text-[#1cf094] hover:underline"
        >
          Filtres
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            ref={filterRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-full bg-[#0b1528] border border-[#1cf094]/10 rounded-xl shadow-lg p-4 space-y-4 z-10"
          >
            {/* Status */}
            <div>
              <label className="text-sm text-white block mb-1">Statut</label>
              <select
                className="w-full bg-[#0f1a2c] text-white border border-[#1cf094]/20 rounded px-3 py-2"
                value={filters.status}
                onChange={(e) => updateFilter("status", e.target.value)}
              >
                <option value="">Tous</option>
                <option value="alive">Vivants</option>
                <option value="dead">Morts</option>
                <option value="unknown">Inconnu</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm text-white block mb-1">Genre</label>
              <select
                className="w-full bg-[#0f1a2c] text-white border border-[#1cf094]/20 rounded px-3 py-2"
                value={filters.gender}
                onChange={(e) => updateFilter("gender", e.target.value)}
              >
                <option value="">Tous</option>
                <option value="female">Femme</option>
                <option value="male">Homme</option>
                <option value="genderless">Sans genre</option>
                <option value="unknown">Inconnu</option>
              </select>
            </div>

            {/* Species */}
            <div>
              <label className="text-sm text-white block mb-1">Espèce</label>
              <input
                type="text"
                className="w-full bg-[#0f1a2c] text-white border border-[#1cf094]/20 rounded px-3 py-2"
                value={filters.species}
                onChange={(e) => updateFilter("species", e.target.value)}
                placeholder="ex: Human, Alien..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {(filters.status || filters.gender || filters.species) && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {filters.status && (
            <button
              onClick={() => updateFilter("status", "")}
              className="bg-[#1cf094]/10 text-[#1cf094] px-3 py-1 rounded-full text-sm flex items-center gap-2 hover:bg-[#1cf094]/20 transition"
            >
              Statut: {filters.status}
              <span className="text-lg leading-none">✕</span>
            </button>
          )}
          {filters.gender && (
            <button
              onClick={() => updateFilter("gender", "")}
              className="bg-[#1cf094]/10 text-[#1cf094] px-3 py-1 rounded-full text-sm flex items-center gap-2 hover:bg-[#1cf094]/20 transition"
            >
              Genre: {filters.gender}
              <span className="text-lg leading-none">✕</span>
            </button>
          )}
          {filters.species && (
            <button
              onClick={() => updateFilter("species", "")}
              className="bg-[#1cf094]/10 text-[#1cf094] px-3 py-1 rounded-full text-sm flex items-center gap-2 hover:bg-[#1cf094]/20 transition"
            >
              Espèce: {filters.species}
              <span className="text-lg leading-none">✕</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
