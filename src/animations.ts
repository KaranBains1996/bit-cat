import Phaser from 'phaser';

const ROW = (n: number) => n * 8;

export function createAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('cat', { start: ROW(0), end: ROW(0) + 3 }),
    frameRate: 6,
    repeat: -1
  });

  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('cat', { start: ROW(4), end: ROW(4) + 7 }),
    frameRate: 6,
    repeat: -1
  });

  scene.anims.create({
    key: 'sleep',
    frames: scene.anims.generateFrameNumbers('cat', { start: ROW(6), end: ROW(6) + 3 }),
    frameRate: 6,
    repeat: -1
  });

  scene.anims.create({
    key: 'clean',
    frames: scene.anims.generateFrameNumbers('cat', { start: ROW(3), end: ROW(3) + 3 }),
    frameRate: 6,
    repeat: -1
  });

  scene.anims.create({
    key: 'poke',
    frames: scene.anims.generateFrameNumbers('cat', { start: ROW(7), end: ROW(7) + 5 }),
    frameRate: 6,
    repeat: -1
  });
}