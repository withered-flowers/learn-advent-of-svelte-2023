export const recalculateScore = (tally: number) => {
	return tally > 0 ? 'nice' : 'naughty';
};
