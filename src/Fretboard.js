import { FRET_WIDTH, instruments, STRING_WIDTH } from "./Defaults.js";
import { getWidth } from "./Utils.js";

export default class Fretboard {
	constructor(active) {
		this.fretboard = SVG("fretboard");
		this.width = null;

		this.setActive(active);

		this.handleFretboardResize();
	}

	getInstrument() {
		return instruments[this.instrument.toLowerCase()];
	}

	handleFretboardResize() {
		this.setFretboardSize();

		document.body.addEventListener("resize", this.setFretboardSize);
	}

	redrawStrings() {
		const half = (FRET_WIDTH - STRING_WIDTH) / 2;
		const stringHalf = half + STRING_WIDTH;
		const instrument = this.getInstrument();
		let rects = 1;

		this.fretboard.clear();

		instrument.notes.forEach((note, index) => {
			const rect = index + 1;
			let heightDiff = half;

			if (rect !== 0) {
				heightDiff = (FRET_WIDTH * rect) - stringHalf;
			}

			this.fretboard
				.rect(this.width, STRING_WIDTH)
				.attr({ fill: "#333" })
				.move(0, heightDiff);

			this.fretboard
				.text(note)
				.move(0, heightDiff);
		});
	}

	setActive(active) {
		this.key = active.key;
		this.mode = active.mode;
		this.instrument = active.instrument;

		this.setFretboardSize();
	}

	setFretboardSize() {
		this.width = getWidth();

		const instrument = this.getInstrument();

		this.fretboard.size(this.width, instrument.strings * FRET_WIDTH);

		this.redrawStrings();
	}
}
