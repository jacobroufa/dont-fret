import {
	instruments,
	keys,
	modes,
	EXPERIMENTAL_FRETS,
	FRET_CONSTANT,
	FRET_SIZE,
	FRET_WIDTH,
	LEFT_MARGIN,
	NOTE_SIZE,
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

	renderFrets() {
		const instrument = this.getInstrument();
		let drawnFrets = 0;
		let leftMargin = LEFT_MARGIN * 2;

		this.fretboard
			.rect(NUT_SIZE, this.height)
			.move(leftMargin, 0);

		leftMargin += NUT_SIZE;

		const fretBoard = this.width - leftMargin;
		const scaleLength = (fretBoard / 3) * 4;

		while (drawnFrets < instrument.frets) {
			let fretDistance;

			if (EXPERIMENTAL_FRETS) {
				// d = s – (s / (2 ^ (n / 12)))
				fretDistance = scaleLength - (scaleLength / (2 * ((drawnFrets + 1) / 12)));
			} else {
				const fretConstant = FRET_CONSTANT[drawnFrets];
				fretDistance = fretConstant * scaleLength;
			}

			this.fretboard
				.rect(FRET_SIZE, this.height)
				.move(leftMargin + fretDistance, 0);

			drawnFrets++;
		}
	}

	renderNotes(opts) {
		const string = opts.note;
		const instrument = this.getInstrument();
		const stringIndex = keys.findIndex((key) => key === string);
		const throughIndex = stringIndex + instrument.frets
		const leftMargin = (LEFT_MARGIN * 2) + NUT_SIZE;
		const fretBoard = this.width - leftMargin;
		const scaleLength = (fretBoard / 3) * 4;
		// IDK if I need to put four of these in here, but maybe theres an instrument with a ton of frets
		const notes = [ ...keys, ...keys, ...keys, ...keys ].slice(stringIndex, throughIndex);
		const noteColors = [ "red", "yellow", "lightblue", "gray", "lightgreen", "darkblue", "purple" ]

		notes.forEach((note, index) => {
			const noteIndex = opts.scale.indexOf(note);
			if (noteIndex === -1) {
				return false;
			}

			const fret = FRET_CONSTANT[index];
			const prevFret = FRET_CONSTANT[index - 1];
			const distance = fret * scaleLength;
			const prevDistance = index === 0 ? leftMargin : prevFret * scaleLength;
			const distDiff = index === 0 ? leftMargin / 2 : (distance - prevDistance);
			const halfNoteSize = NOTE_SIZE / 2;
			const notePlacement = (index === 0 ? prevDistance : distance) - distDiff;

			this.fretboard
				.circle(NOTE_SIZE)
				.attr({ fill: noteColors[noteIndex] })
				.move(notePlacement, opts.heightDiff - halfNoteSize);

			const text = this.fretboard
				.text(note);
			const halfFontSize = (text.font("size") / 2);

			text.move(notePlacement + halfFontSize, opts.heightDiff - halfFontSize);
		});
	}

	renderString(opts) {
		const { heightDiff, note } = opts;

		this.fretboard
			.rect(this.width - LEFT_MARGIN, STRING_WIDTH)
			.attr({ fill: "#333" })
			.move(LEFT_MARGIN, heightDiff);

		const text = this.fretboard
			.text(note);
		const fontHeight = text.font("size") / 2;

		text.move(0, heightDiff - fontHeight);
	}

	renderHorizontal(type) {
		const half = (FRET_WIDTH - STRING_WIDTH) / 2;
		const stringHalf = half + STRING_WIDTH;
		const instrument = this.getInstrument();
		const mode = [ 0, ...modes[this.mode] ];
		const modeIntervals = mode.map((interval, index, self) => {
			if (index === 0) {
				return 0;
			}

			const nextInterval = self
				.slice(0, index)
				.reduce((p, i) => i + p, 0);

			return interval + nextInterval;
		});
		const keyIndex = keys.indexOf(this.key);
		const notesForScale = [ ...keys, ...keys, ...keys ].slice(keyIndex, keys.length + keyIndex + 1);
		const scale = notesForScale.filter((note, index, self) => {
				if (index === modeIntervals[0]) {
					modeIntervals.shift();
					return true;
				}

				return false;
			});

		instrument.notes.forEach((note, index) => {
			const rect = index + 1;
			let heightDiff = half;
			let opts = {};

			if (rect !== 0) {
				heightDiff = (FRET_WIDTH * rect) - stringHalf;
			}

			if (type === "renderString") {
				opts = { heightDiff,  note };
			} else if (type === "renderNotes") {
				opts = { heightDiff, note, scale };
			}

			this[type](opts);
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

		this.renderFrets();
		this.renderHorizontal("renderString");
		this.renderHorizontal("renderNotes");
	}
}
