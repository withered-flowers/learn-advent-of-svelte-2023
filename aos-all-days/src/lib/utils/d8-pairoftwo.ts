import { writable } from 'svelte/store';

export const COLUMN = 4;
export const ROW = 6;
export const MAX_NUMBER_IMAGE = 24;

export type ChosenNumber = {
	chosenNumber: number;
	count: number;
};

export type CardState = {
	imageNumber: number;
	state: 'hidden' | 'visible' | 'matched';
};

export const fillPairOfTwo = (maxNumber: number) => {
	const pairOfTwoArray: CardState[][] = Array.from(Array(COLUMN), () => new Array(ROW).fill(0));
	const maxChosenNumber = Math.floor(maxNumber / 2);

	const arrChosenNumber: ChosenNumber[] = [];

	for (let i = 1; i <= maxChosenNumber; i++) {
		let chosenNumber = Math.floor(Math.random() * MAX_NUMBER_IMAGE) + 1;

		while (arrChosenNumber.find((item) => item.chosenNumber === chosenNumber)) {
			chosenNumber = Math.floor(Math.random() * MAX_NUMBER_IMAGE) + 1;
		}

		arrChosenNumber.push({
			chosenNumber: chosenNumber,
			count: 0
		});
	}

	for (let i = 0; i < COLUMN; i++) {
		for (let j = 0; j < ROW; j++) {
			let idxNumber = Math.floor(Math.random() * arrChosenNumber.length);

			while (arrChosenNumber[idxNumber].count === 2) {
				idxNumber = Math.floor(Math.random() * arrChosenNumber.length);
			}

			pairOfTwoArray[i][j] = {
				imageNumber: arrChosenNumber[idxNumber].chosenNumber,
				state: 'hidden'
			};

			arrChosenNumber[idxNumber].count++;
		}
	}

	return pairOfTwoArray;
};

export const arrImageStore = writable<CardState[][]>(fillPairOfTwo(COLUMN * ROW));
