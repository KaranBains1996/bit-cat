export interface ElectronAPI {
  moveWindow: (x: number, y: number) => void;
  moveCat: (direction: 'left' | 'right') => void;
  moveCatComplete: (callback: () => void) => void; // Updated to accept a callback function
  log: (...messages: unknown[]) => void;
}