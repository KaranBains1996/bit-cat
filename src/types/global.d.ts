import type { ElectronAPI } from './electronAPI';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}