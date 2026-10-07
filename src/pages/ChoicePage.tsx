import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CharacterGuide from "../components/CharacterGuide";

export default function ChoicePage() {
  const navigate = useNavigate();

  return (
    <div
      className="aurora-bg min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-10"
        >
          <div className="text-5xl mb-4">🌟</div>
          <h1
            className="text-3xl md:text-4xl font-bold gradient-text mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What would you like to do?
          </h1>
          <p className="text-white/40 text-sm">Choose your adventure wisely ✨</p>
        </motion.div>

        <div className="flex flex-col gap-5">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <button
              onClick={() => navigate("/game")}
              className="w-full glass-strong rounded-3xl p-6 text-left group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{ border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 4px 30px rgba(139,92,246,0.2)" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3))", boxShadow: "0 0 20px rgba(139,92,246,0.3)" }}
                >
                  🎮
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Play a Game
                  </div>
                  <div className="text-white/50 text-sm">Test your skills... or maybe just have fun 😄</div>
                </div>
                <div className="ml-auto text-white/30 group-hover:text-white/70 transition-colors text-2xl">→</div>
              </div>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
            <button
              onClick={() => navigate("/secret")}
              className="w-full glass-strong rounded-3xl p-6 text-left group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{ border: "1px solid rgba(244,63,94,0.3)", boxShadow: "0 4px 30px rgba(244,63,94,0.15)" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(244,63,94,0.3), rgba(245,158,11,0.3))", boxShadow: "0 0 20px rgba(244,63,94,0.3)" }}
                >
                  🤫
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Want to Know the Developer's Secret
                  </div>
                  <div className="text-white/50 text-sm">Dare to uncover the mystery... 👀</div>
                </div>
                <div className="ml-auto text-white/30 group-hover:text-white/70 transition-colors text-2xl">→</div>
              </div>
            </button>
          </motion.div>
        </div>
      </motion.div>

      <CharacterGuide dialogue="Ooh, choose wisely! Both paths are... interesting 😏✨" />
    </div>
  );
}