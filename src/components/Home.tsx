import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnimatePresence, motion } from "framer-motion";

const animationUrl =
  "https://lottie.host/92d48605-4dde-4636-b9fe-bce61a2dfdca/V6KkJm4X7y.lottie";

const Home = () => {
  const [query, setQuery] = useState("");
  const [showAnimation, setShowAnimation] = useState(true);
  const [tapCount, setTapCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem("animationPlayed");

    if (!alreadyPlayed) {
      setShowAnimation(true);
      document.body.classList.add("overflow-hidden");

      const timer = setTimeout(() => {
        setShowAnimation(false);
        document.body.classList.remove("overflow-hidden");
        sessionStorage.setItem("animationPlayed", "true");
      }, 2500);

      return () => {
        clearTimeout(timer);
        document.body.classList.remove("overflow-hidden");
      };
    } else {
      setShowAnimation(false);
    }
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/character?name=${query}`);
    }
  };

  const handleLogoClick = () => {
    const newCount = tapCount + 1;
    if (newCount >= 5) {
      setShowEasterEgg(true);
      setTapCount(0);
    } else {
      setTapCount(newCount);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col justify-center items-center px-6 text-center relative">
      {showAnimation && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <DotLottieReact
            src={animationUrl}
            autoplay
            style={{ width: 220, height: 220 }}
          />
        </div>
      )}

      {/* -> Easter Egg <- */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            key="easter-egg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#0b1528]/90 backdrop-blur-md flex items-center justify-center"
          >
            <div className="relative w-[90vw] max-w-2xl aspect-video portal-mask overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/I1188GO4p1E?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&cc_load_policy=0"
                title="Rick & Morty Easter Egg"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="absolute top-50 right-20 z-50 bg-[#1cf094] text-[#0b1528] px-3 py-1 rounded-full text-sm font-bold hover:bg-[#24ffaa] transition pointer-events-auto shadow-xl"
            >
              Fermer le portail ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!showAnimation && (
        <>
          <img
            src="/Rick_and_Morty.svg"
            alt="Rick and Morty"
            onClick={handleLogoClick}
            className="absolute top-50 w-70 md:w-70 mb-8 hover:opacity-80 transition max-w-full max-h-[140px] object-contain mx-auto cursor-pointer"
          />

          <div className="w-full max-w-xl flex bg-[#0b1528] border border-[#1cf094]/30 rounded-full shadow-inner overflow-hidden">
            <input
              type="text"
              placeholder="Rechercher un personnage..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-6 py-4 text-md focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-[#1cf094] text-[#0b1528] px-6 font-bold text-sm hover:bg-[#24ffaa] transition-all"
            >
              Go !
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => navigate("/character")}
              className="text-indigo-500 hover:underline"
            >
              Afficher tous les personnages
            </button>
          </div>

          <button
            onClick={() => {
              const randomId = Math.floor(Math.random() * 826) + 1;
              navigate(`/character/${randomId}`);
            }}
            className="mt-4 text-[#1cf094] hover:underline fixed bottom-20 right-0 left-0"
          >
            🌀 Ouvre un portail vers un perso aléatoire
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
