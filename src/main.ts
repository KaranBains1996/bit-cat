import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'node:path';
import shouldQuit from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (shouldQuit) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;
  const { x, y } = display.workArea; // x/y offset from multi-monitor setups

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 48,          // Full taskbar width
    height: 48,           // Your canvas height
    x: x + (width / 2),                  // Align with left edge
    y: y + height - 48,   // Position at bottom of usable screen
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    skipTaskbar: true,
    hasShadow: false,
    focusable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

ipcMain.on('move-window', (_, offset: { x: number, y: number }) => {
  const currentBounds = mainWindow.getBounds(); // Get the current window bounds
  const newX = currentBounds.x + offset.x; // Add offset.x to the current x position
  const newY = currentBounds.y + offset.y; // Add offset.y to the current y position

  mainWindow.setBounds({
    x: newX, // Update the x position
    y: newY, // Update the y position
    width: currentBounds.width, // Keep the width unchanged
    height: currentBounds.height // Keep the height unchanged
  });
});

ipcMain.on('move-cat', (_, direction: 'left' | 'right') => {
  const interval = 16; // Move every 16ms for 60 fps
  const duration = 5000; // Total duration of 5 seconds
  const step = direction === 'left' ? -1 : 1; // Move left or right by 1px
  const startTime = Date.now();

  const moveInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime >= duration) {
      clearInterval(moveInterval); // Stop moving after 5 seconds
      mainWindow.webContents.send('move-cat-complete'); // Notify that movement is complete
      return;
    }

    const currentBounds = mainWindow.getBounds();
    const newX = currentBounds.x + step;

    // Get the screen bounds
    const display = screen.getPrimaryDisplay();
    const { width } = display.workAreaSize;
    const { x } = display.workArea;

    // Check if the window is about to go off-screen
    if (newX < x || newX + currentBounds.width > x + width) {
      clearInterval(moveInterval); // Stop moving
      mainWindow.webContents.send('move-cat-complete'); // Notify that movement is complete
      return;
    }

    mainWindow.setBounds({
      x: newX, // Move 1px in the specified direction
      y: currentBounds.y,
      width: currentBounds.width,
      height: currentBounds.height,
    });
  }, interval);
});

ipcMain.on('log', (_, ...messages: unknown[]) => {
  console.log(...messages);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
