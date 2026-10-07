import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercent?: boolean;
  color?: "purple" | "teal" | "rose" | "multi";
  height?: number;
}

const colors = {
  purple: "linear-gradient(90deg, #7C3AED, #8B5CF6)",
  teal: "linear-gradient(90deg, #0891B2, #06B6D4)",
  rose: "linear-gradient(90deg, #E11D48, #F43F5E)",
  multi: "linear-gradient(90deg, #8B5CF6, #06B6D4, #F43F5E)",
};

export default function ProgressBar({
  value,
  label,
  showPercent = true,
  color = "multi",
  height = 12,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-2 text-sm text-white/60">
          {label && <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</span>}
          {showPercent && (
            <motion.span
              key={Math.floor(clampedValue)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/80 font-semibold"
            >
              {Math.floor(clampedValue)}%
            </motion.span>
          )}
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: `${height}px`,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: colors[color],
            boxShadow: "0 0 12px rgba(139,92,246,0.8), 0 0 24px rgba(6,182,212,0.4)",
          }}
        />
      </div>
    </div>
  );
}