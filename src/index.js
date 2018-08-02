import { keys, modes, presets } from "./Defaults.js";
import { byId, c } from "./DOM.js";
import Fretboard from "./Fretboard.js";

const keysEl = byId("keys");
const scalesEl = byId("scales");

let active = {
	instrument: presets.mandolin,
	key: "C",
	mode: "Ionian"
};
let controls = {};

controls.key = createControls(keys, "key");
controls.mode = createControls(modes, "mode");

controls.key.forEach(({ el }) => keysEl.appendChild(el));
controls.mode.forEach(({ el }) => scalesEl.appendChild(el));

const fretboard = new Fretboard(active);

function createControls(list, key) {
	return list.map((item) => {
		const activeClass = active[key] === item ? "active" : "";
		const className = `${ key } button ${ activeClass }`;
		const el = c("div", {
			className,
			id: `${ key }_${ item }`,
			textContent: item
		}, () => {
			selectEl(item, el, key);
		});

		return { el, item };
	});
}

function selectEl(item, itemEl, key) {
	active[key] = item;

	controls[key].filter(({ item }) => item !== active[key])
		.forEach(({ el }) => el.classList.remove("active"));

	itemEl.classList.add("active");
}
