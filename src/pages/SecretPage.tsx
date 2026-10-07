import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ParticleField from "../components/ParticleField";
import CharacterGuide from "../components/CharacterGuide";
import MagicButton from "../components/magicbutton";
import { config } from "../config/config";
import ProgressBar from "../components/progressbar";

const SECRET_DIALOGUES = [
  "Kyu pta karne mere secret 😏",
  "Sab kuch te pta tenu 😶",
  "Game khelo, cutie... 😂",
  "Ki gal pulgi sab kuch? Jo tu pta karne secret😤",
];

const FAKE_DATA_LINES = [
  "Scanning local storage... 🔍",
  "Checking cookies... 🍪 (the edible kind)",
  "Accessing Iphone's database...",
  "Loading photos and videos....",
  "Found: 99% amazing, 1% mysterious ✨",
  "Compiling developer credentials...",
  "Almost there... (not really) 😅",
];

const REVEAL_LINES = [
  { text: "There is no secret registered about the developer.", delay: 0.2 },
  { text: "You have to message him directly by yourself to know his secret.", delay: 0.9 },
  { text: "Go quick, he is waiting for you... ⚡", delay: 1.6, highlight: true },
];

const CONTACTS = [
  { icon: "📞", label: "Phone", value: config.phoneNumber, delay: 2.5 },
  { icon: "📸", label: "Instagram", value: config.instagramId, delay: 3.1 },
  { icon: "👻", label: "Snapchat", value: config.snapchatId, delay: 3.7 },
];

interface RevealProps {
  setDialogue: (s: string) => void;
}

function SecretReveal({ setDialogue }: RevealProps) {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [choice, setChoice] = useState<"ok" | "later" | null>(null);
  const [fetchProgress, setFetchProgress] = useState(0);
  const [fetchPhase, setFetchPhase] = useState(0);
  const [fetchDone, setFetchDone] = useState(false);
  const fetchRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowButtons(true), 4400);
    return () => clearTimeout(t);
  }, []);

  const startFakeProgress = () => {
    let progress = 0;
    fetchRef.current = setInterval(() => {
      progress += Math.random() * 2 + 0.5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(fetchRef.current!);
        setFetchDone(true);
      }
      setFetchProgress(progress);
      setFetchPhase((prev) => (prev + 1) % FAKE_DATA_LINES.length);
    }, 300);
  };

  useEffect(() => () => { if (fetchRef.current) clearInterval(fetchRef.current); }, []);

  const handleOk = () => {
    setChoice("ok");
    setDialogue("Haa haa ja jaldi! Developer wait kar raha teri 😄");
  };

  const handleLater = () => {
    setChoice("later");
    setDialogue("Na na hun nhi rukna putt 😉😃, dekha te shi");
    startFakeProgress();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: "spring", damping: 20 }}
      className="relative z-10 w-full max-w-lg"
    >
      <div
        className="glass-strong rounded-3xl p-8"
        style={{ boxShadow: "0 0 60px rgba(244,63,94,0.2), 0 0 120px rgba(139,92,246,0.15)" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="text-5xl mb-3"
          >
            🔍
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-bold gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Developer's Secret
          </motion.h1>
        </div>

        {/* Animated reveal lines */}
        <div className="mb-6 text-center space-y-3">
          {REVEAL_LINES.map(({ text, delay, highlight }, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay, duration: 0.6, ease: "easeOut" }}
              className="text-sm leading-relaxed"
              style={{
                color: highlight ? "#06B6D4" : "rgba(255,255,255,0.75)",
                fontWeight: highlight ? 600 : 400,
                fontSize: highlight ? "15px" : "14px",
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Animated contact cards */}
        <div className="flex flex-col gap-3 mb-6">
          {CONTACTS.map(({ icon, label, value, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay, duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl px-5 py-3 flex items-center gap-3"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-white/50 text-sm w-20">{label}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.3 }}
                className="text-white font-mono text-sm"
              >
                {value}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Two choice buttons */}
        <AnimatePresence>
          {showButtons && !choice && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex gap-3"
            >
              <MagicButton variant="primary" size="md" className="flex-1" onClick={handleOk}>
                ✅ OK
              </MagicButton>
              <MagicButton variant="secondary" size="md" className="flex-1" onClick={handleLater}>
                ⏳ Leter
              </MagicButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OK path */}
        <AnimatePresence>
          {choice === "ok" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="rounded-2xl p-5 text-center"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}
            >
              <div className="text-3xl mb-2">😄</div>
              <p className="font-semibold mb-4" style={{ color: "#10B981" }}>
                Yes yes go, nhi ta aage website nhi chlni yaa kuch alag v ho skda c😂
              </p>
              <MagicButton size="sm" onClick={() => navigate("/")}>
                🏠 Return to Home
              </MagicButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Later path — fake progress */}
        <AnimatePresence>
          {choice === "later" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-5"
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(139,92,246,0.2)" }}
            >
              <p
                className="text-xs mb-3 text-center"
                style={{ color: "#A78BFA", fontFamily: "'JetBrains Mono', monospace" }}
              >
                Nhi kita na message 🙂🙄 koi na hun frr maivi secret dekhna😁😀, now my web is collecting your device data
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={fetchPhase}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs mb-3"
                  style={{ color: "#67E8F9", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {">"} {FAKE_DATA_LINES[fetchPhase]}
                </motion.p>
              </AnimatePresence>
              <ProgressBar value={fetchProgress} color="multi" height={10} />
              {!fetchDone ? (
                <motion.div className="mt-3 flex justify-center">
                  <MagicButton
                    variant="danger"
                    size="sm"
                    onClick={() => setDialogue("Na na hun nhi rukna putt 😉😃 Sab kuch dekhanga")}
                  >
                    🛑 Stop Collecting
                  </MagicButton>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 text-center"
                >
                  <p className="text-xs mb-3" style={{ color: "#10B981" }}>
                    ✅ Fetch complete! (found absolutely what I want😝)
                  </p>
                  <MagicButton variant="secondary" size="sm" onClick={() => navigate("/")}>
                    🏠 Return Home
                  </MagicButton>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main SecretPage ──────────────────────────────────────────────────────────
export default function SecretPage() {
  const [clickCount, setClickCount] = useState(0);
  const [showSecretPage, setShowSecretPage] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [btnScale, setBtnScale] = useState(1);
  const [dialogue, setDialogue] = useState("Ooh, you chose the secret path... are you sure? 👀");

  const getRandomPos = useCallback(() => {
    const maxX = window.innerWidth * 0.3;
    const maxY = window.innerHeight * 0.25;
    return {
      x: (Math.random() - 0.5) * maxX,
      y: (Math.random() - 0.5) * maxY,
    };
  }, []);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount < 5) {
      setBtnPos(getRandomPos());
      setBtnScale((prev) => prev * 0.88);
      setDialogue(SECRET_DIALOGUES[newCount - 1]);
    } else {
      setShowSecretPage(true);
      setDialogue("Thik hai, jaa dekhla jeet gyi tu 😤");
    }
  };

  if (showSecretPage) {
    return (
      <div
        className="aurora-bg min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <ParticleField count={35} />
        <SecretReveal setDialogue={setDialogue} />
        <CharacterGuide dialogue={dialogue} />
      </div>
    );
  }

  return (
    <div
      className="aurora-bg min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <ParticleField count={30} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-md"
      >
        <div className="text-5xl mb-4">🤫</div>
        <h1
          className="text-2xl md:text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {clickCount === 0 ? "Developer's Secret" : "Pahla click te karke te dekha 🤣"}
        </h1>
        {clickCount === 0 && (
          <p className="text-white/50 mb-8 text-sm">
            Are you sure you want to know? (warning risk 99.9999%)
          </p>
        )}
        <motion.div
          animate={{ x: btnPos.x, y: btnPos.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ scale: btnScale }}
          className="inline-block mt-6"
        >
          <MagicButton
            onClick={handleSecretClick}
            variant="danger"
            size={btnScale < 0.7 ? "sm" : "lg"}
          >
            {clickCount === 0 ? "🤫 Reveal Secret" : "Click me! 😝"}
          </MagicButton>
        </motion.div>
      </motion.div>
      <CharacterGuide dialogue={dialogue} />
    </div>
  );
}
