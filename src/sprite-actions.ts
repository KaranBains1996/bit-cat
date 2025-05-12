import { state } from './state';

export default function onPointerDown(sprite: Phaser.GameObjects.Sprite) {
	// Prevent action if the 'walk' animation is already playing
	if (sprite.anims.getName() === 'walk') {
		return;
	}

	sprite.play('walk');

	window.electronAPI.moveCat(state.directionFacing); // Call the Electron API to move the window
}
