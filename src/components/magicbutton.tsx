import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface MagicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const variants = {
  primary: {
    background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
    boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
    hoverShadow: "0 8px 30px rgba(139,92,246,0.7)",
  },
  secondary: {
    background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    hoverShadow: "0 8px 30px rgba(139,92,246,0.4)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  danger: {
    background: "linear-gradient(135deg, #F43F5E, #EF4444)",
    boxShadow: "0 4px 20px rgba(244,63,94,0.4)",
    hoverShadow: "0 8px 30px rgba(244,63,94,0.7)",
  },
  ghost: {
    background: "transparent",
    boxShadow: "none",
    hoverShadow: "0 4px 20px rgba(139,92,246,0.3)",
    border: "1px solid rgba(139,92,246,0.5)",
  },
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-2xl",
  lg: "px-10 py-4 text-lg rounded-2xl",
};

export default function MagicButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  style = {},
}: MagicButtonProps) {
  const v = variants[variant];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05, boxShadow: v.hoverShadow }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`font-body font-semibold text-white cursor-pointer select-none ${sizes[size]} ${className}`}
      style={{
        background: v.background,
        boxShadow: v.boxShadow,
        border: (v as any).border || "none",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'DM Sans', sans-serif",
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}