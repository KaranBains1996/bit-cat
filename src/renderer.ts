/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import Phaser from 'phaser';
import catSprite from './assets/cat-sprite-sheet.png';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 48,
  height: 48,
  backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
  transparent: true,
  scene: {
    preload,
    create,
    update
  }
};

let sprite: Phaser.GameObjects.Sprite;

const game = new Phaser.Game(config);

const ROW = (n: number) => n * 8;

function preload(this: Phaser.Scene) {
  this.load.spritesheet('cat', catSprite, {
    frameWidth: 32,
    frameHeight: 32
  });
}

function create(this: Phaser.Scene) {
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('cat', { start: ROW(0), end: ROW(0) + 3 }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('cat', { start: ROW(2), end: ROW(2) + 3 }),
    frameRate: 6,
    repeat: -1
  });

  this.textures.get('cat').setFilter(Phaser.Textures.FilterMode.NEAREST);


  sprite = this.add.sprite(24, 16, 'cat').setInteractive();
  sprite.setScale(2); // Optional: scale up to 64x64
  sprite.play('idle');

  sprite.on('pointerdown', () => {
    sprite.play('walk');
  });
}

function update() {
  // Optional: Move or change animations here
}