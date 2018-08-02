import { getWidth } from "./Utils.js";

export default class Fretboard {
	constructor(active) {
		this.active = active;
		this.fretboard = SVG("fretboard");

		this.handleFretboardResize();
	}

	handleFretboardResize() {
		this.setFretboardSize();

		document.body.addEventListener("resize", this.setFretboardSize);
	}

	setFretboardSize() {
		this.fretboard.size(getWidth(), this.active.instrument.strings * 40);
	}
}
