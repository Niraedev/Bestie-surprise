import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ParticleField from "../components/ParticleField";
import CharacterGuide from "../components/CharacterGuide";
import MagicButton from "../components/magicbutton";

type GamePhase = "intro" | "q1" | "q1-wrong" | "q1-right" | "q2" | "q2-result" | "end";

export default function GamePage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [dialogue, setDialogue] = useState("Ki gal mere secret nhi dekhne 😁😂?");
  const [selectedQ1, setSelectedQ1] = useState<number | null>(null);
  const [selectedQ2, setSelectedQ2] = useState<number | null>(null);

  const handleQ1Answer = (ans: number) => {
    setSelectedQ1(ans);
    if (ans !== 4) {
      setDialogue("Maths tenu andi, mnu ni, mere dimaag naal khedo😂");
      setPhase("q1-wrong");
      setTimeout(() => navigate("/"), 2500);
    } else {
      setPhase("q1-right");
      setDialogue("You passed, but developer failed in maths😅😭 ... chalo next question");
    }
  };

  const handleQ2Answer = (ans: number) => {
    setSelectedQ2(ans);
    setPhase("q2-result");
    setDialogue("yaar, saare galat answer tere 🤦‍♂️");
  };

  return (
    <div
      className="aurora-bg min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <ParticleField count={30} />

      <AnimatePresence mode="wait">

        {/* INTRO */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative z-10 text-center max-w-md"
          >
            <div className="text-6xl mb-4">🎮</div>
            <h1
              className="text-3xl font-bold gradient-text mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let's Play!
            </h1>
            <p className="text-white/50 mb-4 text-sm">Ok whatever, let's play a game.</p>
            <p className="text-white/40 mb-8 text-xs">
              (Warning: This game is designed to be unwinnable 😅, you can't win in my world 😁😋 )
            </p>
            <MagicButton size="lg" onClick={() => { setPhase("q1"); setDialogue("Question 1 ! Concentrate karo 😤"); }}>
              ▶️ Play
            </MagicButton>
          </motion.div>
        )}

        {/* QUESTION 1 */}
        {(phase === "q1" || phase === "q1-wrong" || phase === "q1-right") && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-lg"
          >
            <div
              className="glass-strong rounded-3xl p-8"
              style={{ boxShadow: "0 0 40px rgba(139,92,246,0.25)" }}
            >
              <div className="text-center mb-6">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block"
                  style={{ background: "rgba(139,92,246,0.3)", color: "#A78BFA" }}
                >
                  Question 1 
                </span>
                <h2
                  className="text-2xl md:text-3xl font-bold text-white mt-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  2 + 2 = ?
                </h2>
              </div>

              {/* Number grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <motion.button
                    key={n}
                    whileHover={{ scale: phase === "q1" ? 1.08 : 1 }}
                    whileTap={{ scale: phase === "q1" ? 0.94 : 1 }}
                    onClick={() => phase === "q1" && handleQ1Answer(n)}
                    className="rounded-2xl py-4 text-xl font-bold transition-all duration-200"
                    style={{
                      background:
                        selectedQ1 === n
                          ? n === 4
                            ? "rgba(244,63, 94, 0.4)"
                            : "rgba(244,63,94,0.4)"
                          : "rgba(255,255,255,0.07)",
                      border:
                        selectedQ1 === n
                          ? `2px solid ${n === 4 ? "#F43F5E" : "#F43F5E"}`
                          : "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      cursor: phase === "q1" ? "pointer" : "default",
                      boxShadow:
                        selectedQ1 === n
                          ? `0 0 20px ${n === 4 ? "rgba(244,63,94,0.4)" : "rgba(244,63,94,0.4)"}`
                          : "none",
                    }}
                  >
                    {n}
                  </motion.button>
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {phase === "q1-wrong" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center rounded-2xl p-4"
                    style={{ background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)" }}
                  >
                    <p className="text-lg font-semibold" style={{ color: "#FB7185" }}>
                      Developer failed in maths 😭😂
                    </p>
                    <p className="text-white/50 text-sm mt-1">Going back to start...</p>
                  </motion.div>
                )}
                {phase === "q1-right" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div
                      className="rounded-2xl p-4 mb-4"
                      style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}
                    >
                      <p className="font-semibold" style={{ color: "#FCD34D" }}>
                        Ave 4 ? 22 hunda answer 😶😑
                      </p>
                    </div>
                    <MagicButton onClick={() => { setPhase("q2"); setDialogue("Question 2! May be this one is easy...😏"); }}>
                      Next Question →
                    </MagicButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* QUESTION 2 */}
        {(phase === "q2" || phase === "q2-result") && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-lg"
          >
            <div
              className="glass-strong rounded-3xl p-8"
              style={{ boxShadow: "0 0 40px rgba(6,182,212,0.25)" }}
            >
              <div className="text-center mb-6">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block"
                  style={{ background: "rgba(6,182,212,0.3)", color: "#67E8F9" }}
                >
                  Question 2
                </span>
                <h2
                  className="text-xl md:text-2xl font-bold text-white mt-3 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  How many times does the letter 'Z' appear in your name?
                </h2>
              </div>

              <div className="flex gap-3 justify-center mb-6 flex-wrap">
                {[1, 2, 3, 4, 5].map((n) => (
                  <motion.button
                    key={n}
                    whileHover={{ scale: phase === "q2" ? 1.1 : 1 }}
                    whileTap={{ scale: phase === "q2" ? 0.93 : 1 }}
                    onClick={() => phase === "q2" && handleQ2Answer(n)}
                    className="w-14 h-14 rounded-2xl text-xl font-bold transition-all duration-200"
                    style={{
                      background:
                      // selectedQ2 === n ? "rgba(244,63,94,0.4)" : "rgba(244,63,94,0.4)",
                        selectedQ2 === n ? "rgba(244,63,94,0.4)" : "rgba(255,255,255,0.07)",
                      border:
                        selectedQ2 === n ? "2px solid #F43F5E" : "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      cursor: phase === "q2" ? "pointer" : "default",
                    }}
                  >
                    {n}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {phase === "q2-result" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div
                      className="rounded-2xl p-4 mb-4"
                      style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}
                    >
                      <p className="font-semibold mb-2" style={{ color: "#FCD34D" }}>
                        Uffff, ekk vaar v nhi anda 'Z', saare answer galat tere 🤦‍♂️🤦‍♂️
                      </p>
                    </div>
                    <MagicButton onClick={() => setPhase("end")}>
                      Pagal...😁😎
                    </MagicButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* END */}
        {phase === "end" && (
          <motion.div
            key="end"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-lg"
          >
            <div
              className="glass-strong rounded-3xl p-8 text-center"
              style={{ boxShadow: "0 0 40px rgba(139,92,246,0.2)" }}
            >
              <div className="text-5xl mb-4">😒</div>
              <p
                className="text-white/80 leading-relaxed mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                So code goes too long, iss lyi mnu game khtm krni pyi, but mai frr vps avanga 😁😃, je dimaag garm hoya te dsdi
                <br /><br />
                Te haa Next version lyi tyar rhi.
                <br /><br />
                <span className="text-white/50 text-sm">
                  and gaala kaddni hoye te sidde developer nu kddi mnu nhi 👌😒
                </span>
              </p>
              <MagicButton onClick={() => navigate("/")} size="lg">
                🏠 OK🙄, Return Home
              </MagicButton>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      <CharacterGuide dialogue={dialogue} />
    </div>
  );
}
