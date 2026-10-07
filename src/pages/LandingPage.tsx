import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ParticleField from "../components/ParticleField";
import MagicButton from "../components/magicbutton";
import { config } from "../config/config";

export default function LandingPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hintIndex, setHintIndex] = useState(-1);
  const [shaking, setShaking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleUnlock = () => {
  const a = password.trim();
  const b = String(config.password).trim();
  console.log("Input:", JSON.stringify(a), "Config:", JSON.stringify(b), "Match:", a === b);
  if (a === b) {
    setError("");
    setUnlocking(true);
    setTimeout(() => navigate("/welcome"), 1800);
  } else {
    setShaking(true);
    setError(
      a.length === 0
        ? "Please enter the password first 🤫"
        : "Wrong password! Socho socho cuty 😅"
    );
    setTimeout(() => setShaking(false), 700);
  }
};
  const handleHint = () => {
    setHintIndex((prev) => (prev + 1) % config.hints.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleUnlock();
  };

  return (
    <div
      className="aurora-bg min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <ParticleField count={50} />

      {/* Decorative orbs */}
      <div
        className="absolute top-[10%] left-[15%] rounded-full blur-3xl pointer-events-none"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent)",
          animation: "floatAnim 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[15%] right-[10%] rounded-full blur-3xl pointer-events-none"
        style={{
          width: 250,
          height: 250,
          background: "radial-gradient(circle, rgba(6,182,212,0.15), transparent)",
          animation: "floatAnim 10s ease-in-out infinite reverse",
        }}
      />

      {/* Lock Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={
          unlocking
            ? { opacity: 0, scale: 1.15, y: -30 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: unlocking ? 0.8 : 0.7, ease: "easeOut" }}
        className={`relative z-10 w-full max-w-md ${shaking ? "shake" : ""}`}
      >
        <div
          className="glass-strong rounded-3xl p-8 md:p-10"
          style={{
            boxShadow:
              "0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(6,182,212,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={unlocking ? { rotate: [0, -10, 15, 0], scale: [1, 1.1, 1.2] } : {}}
            transition={{ duration: 0.8 }}
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3))",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 0 20px rgba(139,92,246,0.4)",
              }}
            >
              {unlocking ? "🔓" : "🔐"}
            </div>
          </motion.div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl md:text-4xl font-bold mb-2 gradient-text"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {config.siteTitle}
            </h1>
            <p className="text-white/50 text-sm">Please enter the password✨</p>
          </div>

          {/* Input with show/hide toggle */}
          <div className="mb-4 relative">
            <input
              ref={inputRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Your secret password..."
              className="magic-input w-full px-5 py-4 pr-14 text-base"
              style={{ fontSize: "16px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors text-xl select-none"
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm mb-4"
                style={{ color: "#F43F5E" }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Unlock Button */}
          <MagicButton
            onClick={handleUnlock}
            size="lg"
            className="w-full mb-3"
          >
            {unlocking ? "✨ Unlocking..." : "🔑 Unlock"}
          </MagicButton>

          {/* Hint Button */}
          <MagicButton
            onClick={handleHint}
            variant="ghost"
            size="md"
            className="w-full"
          >
            💡 Need a Hint?
          </MagicButton>

          {/* Hint Display */}
          <AnimatePresence>
            {hintIndex >= 0 && (
              <motion.div
                key={hintIndex}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div
                  className="rounded-2xl px-4 py-3 text-sm text-center"
                  style={{
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.3)",
                    color: "#C4B5FD",
                  }}
                >
                  <span className="text-white/40 text-xs block mb-1">
                    Hint {hintIndex + 1} of {config.hints.length}
                  </span>
                  {config.hints[hintIndex]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Unlocking overlay */}
      <AnimatePresence>
        {unlocking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-20 flex items-center justify-center"
            style={{ background: "rgba(5,7,20,0.6)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
              className="text-center"
            >
              <div className="text-8xl mb-4">✨</div>
              <p
                className="text-2xl gradient-text font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Access Granted!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
