// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import type { BitCatAPI, Direction } from './types/bit-cat-api';

// Methods that will be exposed to the renderer process
const bitCatAPI: BitCatAPI = {
	// Methods which send messages to the main process
	moveWindow: (x: number, y: number) => ipcRenderer.send('move-window', {x, y}),
	moveCat: () => ipcRenderer.send('move-cat'),
	log: (...messages: unknown[]) => ipcRenderer.send('log', messages),

	// Methods which listen for messages from the main process
	moveCatComplete: (callback: () => void) => ipcRenderer.on('move-cat-complete', () => callback()),
	changeCatDirection: (callback: (direction: Direction) => void) => ipcRenderer.on('change-cat-direction', (_, direction: Direction) => callback(direction)),
}

contextBridge.exposeInMainWorld('bitCatAPI', bitCatAPI);
