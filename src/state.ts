import { secondsToMilliseconds } from './utils/seconds-to-milliseconds';

export type AnimationKey = 'idle' | 'walk' | 'sleep' | 'clean' | 'poke';

export type State = {
	directionFacing: 'left' | 'right';
	toggleInterval: number;
	lastToggleTime: number;
	currentAnimation: AnimationKey;
};

export const state: State = {
	directionFacing: 'right',
	currentAnimation: 'idle',
	toggleInterval: 0,
	lastToggleTime: secondsToMilliseconds(5),
};
