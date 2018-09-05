/**
 * Gets the fret spacing for a given fret and neck length (page width)
 * Borrowed from: https://www.liutaiomottola.com/formulae/fret.htm
 *
 * @param number length
 * @param number number
 *
 * @return number
 */
export function getFretSpacing(length, number) {
	const position = number / 12;

	return length - (length / Math.pow(2, position));
}

/**
 * Get the fret spacing for every fret in our series
 *
 * @param number length
 * @param number fretCount
 */
export function getAllFretSpaces(length, fretCount) {
	let frets = [];

	while (frets.length < fretCount) {
		frets.push(frets.length + 1);
	}

	frets = frets.map((fret) => getFretSpacing(length, fret));
}

/**
 * Get the width of our page
 *
 * @return number
 */
export function getWidth() {
	const { clientWidth, scrollWidth } = document.body;

	return Math.min(clientWidth, scrollWidth, window.innerWidth);
}

/**
 * Properly-case a word
 *
 * @param string word
 * @return string
 */
export function toUpperCase(word) {
	const first = word.slice(0, 1).toUpperCase();
	const rest = word.slice(1);

	return first + rest;
}
