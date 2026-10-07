import { useState, useCallback } from "react";

/** Manages the character guide's dialogue state */
export function useDialogue(initial: string = "") {
  const [dialogue, setDialogue] = useState(initial);

  const say = useCallback((text: string) => {
    setDialogue(text);
  }, []);

  const clear = useCallback(() => {
    setDialogue("");
  }, []);

  return { dialogue, say, clear };
}
