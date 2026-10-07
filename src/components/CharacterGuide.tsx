import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Mood = "idle" | "happy" | "kiss" | "shy" | "side" | "heart";

function detectMood(dialogue: string): Mood {
  const d = dialogue.toLowerCase();
  if (d.includes("welcome") || d.includes("waiting") || d.includes("yess") || d.includes("haan") || d.includes("jaldi")) return "happy";
  if (d.includes("cutie") || d.includes("😘") || d.includes("💕")) return "kiss";
  if (d.includes("secret") || d.includes("kyu") || d.includes("sab kuch") || d.includes("😏") || d.includes("sure")) return "shy";
  if (d.includes("game") || d.includes("whatever") || d.includes("😒") || d.includes("exit") || d.includes("rukna")) return "side";
  if (d.includes("jeet") || d.includes("love") || d.includes("✨") || d.includes("special") || d.includes("theek hai")) return "heart";
  return "idle";
}

// Use /public folder paths — place images in public/character/
const MOOD_IMAGES: Record<Mood, string> = {
  idle:  "/character/idle.png",
  happy: "/character/idle2.png",
  kiss:  "/character/kiss.png",
  shy:   "/character/shy.png",
  side:  "/character/side.png",
  heart: "/character/heart.png",
};

const GLOW: Record<Mood, string> = {
  idle:  "0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(6,182,212,0.2)",
  happy: "0 0 30px rgba(245,158,11,0.6), 0 0 60px rgba(139,92,246,0.3)",
  kiss:  "0 0 30px rgba(244,63,94,0.5), 0 0 60px rgba(139,92,246,0.2)",
  shy:   "0 0 30px rgba(139,92,246,0.5), 0 0 60px rgba(6,182,212,0.2)",
  side:  "0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(139,92,246,0.2)",
  heart: "0 0 30px rgba(245,158,11,0.6), 0 0 60px rgba(244,63,94,0.3)",
};

const DOT_COLOR: Record<Mood, string> = {
  idle:  "#06B6D4",
  happy: "#F59E0B",
  kiss:  "#F43F5E",
  shy:   "#8B5CF6",
  side:  "#06B6D4",
  heart: "#F59E0B",
};

interface CharacterGuideProps {
  dialogue: string;
}

export default function CharacterGuide({ dialogue }: CharacterGuideProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [mood, setMood] = useState<Mood>("idle");
  const [currentImage, setCurrentImage] = useState(MOOD_IMAGES.idle);

  // Typewriter
  useEffect(() => {
    setDisplayedText("");
    if (!dialogue) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < dialogue.length) {
        setDisplayedText(dialogue.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [dialogue]);

  // Mood + image update
  useEffect(() => {
    if (!dialogue) return;
    const newMood = detectMood(dialogue);
    setMood(newMood);
    setCurrentImage(MOOD_IMAGES[newMood]);
  }, [dialogue]);

  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none flex flex-col items-end gap-3"
      style={{ maxWidth: "250px" }}
    >
      {/* Dialogue Bubble */}
      <AnimatePresence mode="wait">
        {dialogue && (
          <motion.div
            key={dialogue}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bubble-tail glass-strong rounded-2xl rounded-br-sm px-5 py-4 text-sm md:text-base text-white/90 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", minWidth: "200px", maxWidth: "250px" }}
          >
            {displayedText}
            <span className="typewriter-cursor" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Frame */}
      <motion.div className="float-anim relative">
        {/* Mood glow ring */}
        <motion.div
          key={mood}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: GLOW[mood], zIndex: 1, borderRadius: "16px" }}
        />

        <div
          className="glass-strong rounded-2xl overflow-hidden relative"
          style={{ width: "160px", height: "220px" }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt="Character"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
              onError={() => setCurrentImage(MOOD_IMAGES.idle)}
            />
          </AnimatePresence>

          {/* Mood dot */}
          <motion.div
            key={`dot-${mood}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-2 right-2 w-2 h-2 rounded-full"
            style={{ background: DOT_COLOR[mood], boxShadow: `0 0 6px ${DOT_COLOR[mood]}` }}
          />
        </div>
      </motion.div>
    </div>
  );
}
