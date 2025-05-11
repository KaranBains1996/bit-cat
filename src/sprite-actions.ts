import { state } from './state';

export default function onPointerDown(sprite: Phaser.GameObjects.Sprite) {
	// Prevent action if the 'walk' animation is already playing
	if (sprite.anims.getName() === 'walk') {
		return;
	}

	sprite.play('walk');

	const totalDistance = 300; // Total distance to move in pixels
	const duration = 5000; // Duration in milliseconds
	const interval = 16; // Update interval in milliseconds (~60 FPS)
	const step = (totalDistance / duration) * interval; // Distance to move per interval

	let movedDistance = 0;

	const intervalId = setInterval(() => {
		if (movedDistance < totalDistance) {
			const direction = state.directionFacing === 'right' ? step : -step; // Determine direction based on flag
			window.electronAPI.moveWindow(direction, 0); // Move the window step pixels in the determined direction
			movedDistance += step;
		} else {
			clearInterval(intervalId); // Stop the interval when the total distance is reached
			sprite.play('idle'); // Return to idle animation
			state.directionFacing = state.directionFacing === 'right' ? 'left' : 'right'; // Toggle the direction for the next move
			sprite.setFlipX(state.directionFacing === 'left');
		}
	}, interval);
}
