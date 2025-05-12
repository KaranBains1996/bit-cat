import type { BitCatAPI } from './bit-cat-api';

declare global {
  interface Window {
    bitCatAPI: BitCatAPI;
  }
}