export type Direction = 'left' | 'right';

export interface BitCatAPI {
  moveWindow: (x: number, y: number) => void;
  moveCat: () => void;
  moveCatComplete: (callback: () => void) => void; // Updated to accept a callback function
  changeCatDirection: (callback: (direction: Direction) => void) => void;
  log: (...messages: unknown[]) => void;
}