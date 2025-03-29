import { Routes, Route } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterShow from "./components/CharacterShow";
import Home from "./components/Home";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  // AnimatePresence from Framer Motion => Wait for exit animation before mounting new route.

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/character" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterShow />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
};

export default App;
