import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode } from "react";

interface DialogueProps {
  show: boolean;
  children: ReactNode;
  onClose?: () => void;
  title?: string;
}

export function DialogueModal({ show, children, onClose, title }: DialogueProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(5,7,20,0.7)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="glass-strong rounded-3xl p-8 max-w-md w-full"
              style={{
                pointerEvents: "all",
                boxShadow: "0 0 60px rgba(139,92,246,0.3), 0 0 120px rgba(6,182,212,0.15)",
              }}
            >
              {title && (
                <h3
                  className="text-xl font-semibold mb-4 gradient-text"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h3>
              )}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface InlineDialogueProps {
  children: ReactNode;
  className?: string;
}

export function InlineDialogue({ children, className = "" }: InlineDialogueProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass rounded-2xl px-5 py-4 text-white/90 ${className}`}
    >
      {children}
    </motion.div>
  );
}