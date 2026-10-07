import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CharacterGuide from "../components/CharacterGuide";
import ParticleField from "../components/ParticleField";
import MagicButton from "../components/magicbutton";

const WELCOME_TEXT = "Welcome KuchuPuchu in my Imagination";

export default function WelcomePage() {
  const [displayed, setDisplayed] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [celebrate, setCelebrate] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < WELCOME_TEXT.length) {
          setDisplayed(WELCOME_TEXT.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowButton(true), 600);
          setTimeout(() => setCelebrate(false), 3000);
        }
      }, 40);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div
      className="aurora-bg min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <ParticleField count={70} celebrate={celebrate} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${200 + i * 60}px`,
              height: `${200 + i * 60}px`,
              left: `${[10, 70, 40, 5, 80][i]}%`,
              top: `${[20, 60, 80, 70, 15][i]}%`,
              background: `radial-gradient(circle, ${
                ["rgba(139,92,246,0.2)", "rgba(6,182,212,0.15)", "rgba(244,63,94,0.1)", "rgba(245,158,11,0.1)", "rgba(16,185,129,0.12)"][i]
              }, transparent)`,
              animation: `floatAnim ${7 + i * 2}s ease-in-out infinite ${i % 2 === 0 ? "" : "reverse"}`,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl px-4"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          className="text-6xl mb-8 block"
        >
          
        </motion.div>

        <div className="relative mb-8">
          <h1
            className="glow-text font-bold leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              background: "linear-gradient(135deg, #A78BFA, #67E8F9, #FB7185)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {displayed}
            <span className="typewriter-cursor" style={{ WebkitTextFillColor: "#06B6D4" }} />
          </h1>
        </div>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-white/50 text-lg mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A special place, just for you 💗🌙
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", damping: 15 }}
              >
                <MagicButton size="lg" onClick={() => navigate("/choose")} className="text-xl">
                  Enter the World 🚀
                </MagicButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <CharacterGuide dialogue="Welcome cutieee ! 😋 I've been waiting for you since a month!" />
    </div>
  );
}