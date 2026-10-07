import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import WelcomePage from "./pages/WelcomePage";
import ChoicePage from "./pages/ChoicePage";
import SecretPage from "./pages/SecretPage";
import GamePage from "./pages/GamePage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/choose" element={<ChoicePage />} />
        <Route path="/secret" element={<SecretPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
