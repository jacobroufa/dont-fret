import { keys, modes, instruments } from "./Defaults.js";
import { byId, c, modal } from "./DOM.js";
import Fretboard from "./Fretboard.js";
import { toUpperCase } from "./Utils.js";

const instrumentsEl = byId("instruments");
const keysEl = byId("keys");
const scalesEl = byId("scales");

const tempInstrumentDialog = c("div");
tempInstrumentDialog.appendChild(c("h2", { textContent: "Add a Custom Instrument" }));
tempInstrumentDialog.appendChild(c("p", { textContent: "This probably won't be implemented for a bit..." }));

const addInstrumentsDialog = modal(tempInstrumentDialog);

let active = {
	instrument: "Mandolin",
	key: "C",
	mode: "Ionian"
};
let controls = {};

document.body.appendChild(addInstrumentsDialog.el);

controls.instrument = createControls(Object.keys(instruments), "instrument");
controls.key = createControls(keys, "key");
controls.mode = createControls(modes, "mode");

controls.instrument.forEach(({ el }) => instrumentsEl.appendChild(el));
controls.key.forEach(({ el }) => keysEl.appendChild(el));
controls.mode.forEach(({ el }) => scalesEl.appendChild(el));

const fretboard = new Fretboard(active);

function createControl(key) {
	return (item) => {
		const activeClass = active[key] === item ? "active" : "";
		const className = `${ key } button ${ activeClass }`;
		const el = c("div", {
			className,
			id: `${ key }_${ item }`,
			textContent: item
		}, () => {
			if (item === "Add") {
				openAddInstrumentDialog();
			} else {
				selectEl(item, el, key);
			}
		});

		return { el, item };
	};
}

function createControls(list, key) {
	let controls = [ ...list ];

	if (key === "instrument") {
		controls = [ ...controls, "add" ].map(toUpperCase);
	}

	return controls.map(createControl(key));
}

function openAddInstrumentDialog() {
	addInstrumentsDialog.open();
}

function selectEl(item, itemEl, key) {
	active[key] = item;

	controls[key].filter(({ item }) => item !== active[key])
		.forEach(({ el }) => el.classList.remove("active"));

	itemEl.classList.add("active");

	fretboard.setActive(active);
}
