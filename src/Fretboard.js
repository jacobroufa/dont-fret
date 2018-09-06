import {
	instruments,
	FRET_CONSTANT,
	FRET_SIZE,
	FRET_WIDTH,
	LEFT_MARGIN,
	NUT_SIZE,
	STRING_WIDTH
} from "./Defaults.js";
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

	redrawFrets() {
		const instrument = this.getInstrument();
		let drawnFrets = 0;
		let leftMargin = LEFT_MARGIN * 2;

		this.fretboard
			.rect(NUT_SIZE, this.height)
			.move(leftMargin, 0);

		leftMargin += NUT_SIZE;

		while (drawnFrets < instrument.frets) {
			const fretConstant = FRET_CONSTANT[drawnFrets];
			const fretBoard = this.width - leftMargin;
			const scaleLength = (fretBoard / 3) * 4;
			const fretDistance = fretConstant * scaleLength;

			// leftMargin += fretDistance;

			this.fretboard
				.rect(FRET_SIZE, this.height)
				.move(fretDistance, 0);

			// leftMargin += NUT_SIZE;

			drawnFrets++;
		}
	}

	redrawStrings() {
		const half = (FRET_WIDTH - STRING_WIDTH) / 2;
		const stringHalf = half + STRING_WIDTH;
		const instrument = this.getInstrument();
		let rects = 1;

		instrument.notes.forEach((note, index) => {
			const rect = index + 1;
			let heightDiff = half;

			if (rect !== 0) {
				heightDiff = (FRET_WIDTH * rect) - stringHalf;
			}

			this.fretboard
				.rect(this.width - LEFT_MARGIN, STRING_WIDTH)
				.attr({ fill: "#333" })
				.move(LEFT_MARGIN, heightDiff);

			const text = this.fretboard
				.text(note);
			const fontHeight = text.font("size") / 2;

			text.move(0, heightDiff - fontHeight);
		});
	}

	setActive(active) {
		this.key = active.key;
		this.mode = active.mode;
		this.instrument = active.instrument;

		this.setFretboardSize();
	}

	setFretboardSize() {
		const instrument = this.getInstrument();

		this.width = getWidth();
		this.height = instrument.strings * FRET_WIDTH;

		this.fretboard.clear();
		this.fretboard.size(this.width, this.height);

		this.redrawFrets();
		this.redrawStrings();
	}
}
