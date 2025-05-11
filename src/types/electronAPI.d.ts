export interface ElectronAPI {
  moveWindow: (x: number, y: number) => void;
  log: (...messages: unknown[]) => void;
}