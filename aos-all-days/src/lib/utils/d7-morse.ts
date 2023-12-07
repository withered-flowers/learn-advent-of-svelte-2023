type MorseSound = 'dot' | 'dash' | 'silence' | 'space';

type MorseCode = {
	[key: string]: MorseSound[];
};

export const MORSE_ALPHABET_AND_NUMERIC: MorseCode = {
	A: ['dot', 'dash'],
	B: ['dash', 'dot', 'dot', 'dot'],
	C: ['dash', 'dot', 'dash', 'dot'],
	D: ['dash', 'dot', 'dot'],
	E: ['dot'],
	F: ['dot', 'dot', 'dash', 'dot'],
	G: ['dash', 'dash', 'dot'],
	H: ['dot', 'dot', 'dot', 'dot'],
	I: ['dot', 'dot'],
	J: ['dot', 'dash', 'dash', 'dash'],
	K: ['dash', 'dot', 'dash'],
	L: ['dot', 'dash', 'dot', 'dot'],
	M: ['dash', 'dash'],
	N: ['dash', 'dot'],
	O: ['dash', 'dash', 'dash'],
	P: ['dot', 'dash', 'dash', 'dot'],
	Q: ['dash', 'dash', 'dot', 'dash'],
	R: ['dot', 'dash', 'dot'],
	S: ['dot', 'dot', 'dot'],
	T: ['dash'],
	U: ['dot', 'dot', 'dash'],
	V: ['dot', 'dot', 'dot', 'dash'],
	W: ['dot', 'dash', 'dash'],
	X: ['dash', 'dot', 'dot', 'dash'],
	Y: ['dash', 'dot', 'dash', 'dash'],
	Z: ['dash', 'dash', 'dot', 'dot'],
	0: ['dash', 'dash', 'dash', 'dash', 'dash'],
	1: ['dot', 'dash', 'dash', 'dash', 'dash'],
	2: ['dot', 'dot', 'dash', 'dash', 'dash'],
	3: ['dot', 'dot', 'dot', 'dash', 'dash'],
	4: ['dot', 'dot', 'dot', 'dot', 'dash'],
	5: ['dot', 'dot', 'dot', 'dot', 'dot'],
	6: ['dash', 'dot', 'dot', 'dot', 'dot'],
	7: ['dash', 'dash', 'dot', 'dot', 'dot'],
	8: ['dash', 'dash', 'dash', 'dot', 'dot'],
	9: ['dash', 'dash', 'dash', 'dash', 'dot'],
	' ': ['space']
};

export const translateStringToMorse = (word: string): MorseSound[] => {
	const morseWord: MorseSound[] = [];
	const letters = word.toUpperCase().split('');

	letters.forEach((letter, index) => {
		const morseLetter = MORSE_ALPHABET_AND_NUMERIC[letter];

		if (morseLetter) {
			morseWord.push(...morseLetter);

			if (index !== letters.length - 1) {
				morseWord.push('silence');
			}
		}
	});

	return morseWord;
};

export const calculateSoundDelay = (sound: MorseSound): number => {
	let delayNumber;

	if (sound === 'dot') {
		delayNumber = 0.075;
	} else if (sound === 'dash') {
		delayNumber = 0.4;
	} else {
		delayNumber = 0;
	}

	return delayNumber;
};

export const playMorseSound = (audioContext: AudioContext, type: OscillatorType, x: number) => {
	const context = audioContext ?? new AudioContext({ latencyHint: 'playback' });
	const oscillatorNode = context.createOscillator();
	const gainNode = context.createGain();

	oscillatorNode.connect(gainNode);
	oscillatorNode.type = type;
	gainNode.connect(context.destination);
	oscillatorNode.start(0);

	gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + x);

	return { context, gainNode };
};
