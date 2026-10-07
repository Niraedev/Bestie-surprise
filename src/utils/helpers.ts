// General utility functions

/** Get a random position within viewport bounds with padding */
export function getRandomPosition(paddingX = 100, paddingY = 100) {
  return {
    x: Math.random() * (window.innerWidth - paddingX * 2) + paddingX,
    y: Math.random() * (window.innerHeight - paddingY * 2) + paddingY,
  };
}

/** Get a random offset from center (for button dodge mechanic) */
export function getRandomOffset(maxX = 200, maxY = 150) {
  return {
    x: (Math.random() - 0.5) * maxX * 2,
    y: (Math.random() - 0.5) * maxY * 2,
  };
}

/** Sleep for ms milliseconds */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Pick a random item from an array */
export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Cycle through an array index, looping */
export function nextIndex(current: number, length: number): number {
  return (current + 1) % length;
}
