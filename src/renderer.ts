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
import Phaser, { AUTO, Game, Textures, Math as PhaserMath } from 'phaser';
import catSprite from './assets/cat-sprite-sheet.png';
import catMeow from './assets/cat-meow.mp3';
import { state, AnimationKey } from './state';
import { createAnimations } from './animations';
import onPointerDown from './sprite-actions';
import { secondsToMilliseconds } from './utils/seconds-to-milliseconds';

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
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

new Game(config);

function preload(this: Phaser.Scene) {
  this.load.spritesheet('cat', catSprite, {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.audio('clickSound', catMeow);
}

function create(this: Phaser.Scene) {
  createAnimations(this);

  this.textures.get('cat').setFilter(Textures.FilterMode.NEAREST);

  sprite = this.add.sprite(24, 16, 'cat').setInteractive({ useHandCursor: true, cursor: 'pointer' });
  sprite.setScale(2);
  sprite.play('idle');
  sprite.setFlipX(state.directionFacing === 'left');

  sprite.on('pointerdown', () => {
    this.sound.play('clickSound');
    onPointerDown(sprite)
  });
}

  const animationLoop: AnimationKey[] = ['idle', 'sleep', 'clean', 'poke'];

function update(this: Phaser.Scene, time: number) {
  if (sprite.anims.getName() !== 'walk' && time - state.lastToggleTime > state.toggleInterval) {
    state.lastToggleTime = time;

    // Randomly select an animation from `animationLoop` which is not the current animation
    const nextAnimation = PhaserMath.RND.pick(animationLoop.filter(anim => anim !== state.currentAnimation));
    switch (nextAnimation) {
      case 'clean':
        state.toggleInterval = PhaserMath.Between(secondsToMilliseconds(3), secondsToMilliseconds(7));
        break;
      case 'poke':
        state.toggleInterval = secondsToMilliseconds(5);
        break;

      case 'sleep':
      case 'idle':
        state.toggleInterval = PhaserMath.Between(secondsToMilliseconds(10), secondsToMilliseconds(30));
        break
    }

    sprite.play(nextAnimation);
    state.currentAnimation = nextAnimation;
    state.directionFacing = state.directionFacing === 'right' ? 'left' : 'right';
    sprite.setFlipX(state.directionFacing === 'left');
  }
}

window.electronAPI.moveCatComplete(() => {
  sprite.play('idle');
  state.directionFacing = state.directionFacing === 'right' ? 'left' : 'right';
  sprite.setFlipX(state.directionFacing === 'left');
});
