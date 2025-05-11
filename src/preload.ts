// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import type { ElectronAPI } from './types/electronAPI';

const electronAPI: ElectronAPI = {
	moveWindow: (x: number, y: number) => ipcRenderer.send('move-window', {x, y}),
	log: (...messages) => ipcRenderer.send('log', messages),
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
