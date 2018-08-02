/**
 * Gets the fret spacing for a given fret and neck length (page width)
 * Borrowed from: https://www.liutaiomottola.com/formulae/fret.htm
 *
 * @param number length
 * @param number number
 *
 * @return number
 */
function getFretSpacing(length, number) {
	const position = number / 12;

	return length - (length / Math.pow(2, position));
}

/**
 * Get the fret spacing for every fret in our series
 *
 * @param number length
 * @param number fretCount
 */
function getAllFretSpaces(length, fretCount) {
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
function getWidth() {
	const { clientWidth, scrollWidth } = document.body;

	return Math.min(clientWidth, scrollWidth, window.innerWidth);
}
