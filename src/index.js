import * as Utils from "./Utils.js";
import { keys, presets } from "./Defaults.js";
import { byId, c } from "./DOM.js";

const keysEl = byId("keys");
const scalesEl = byId("scales");
const fretboardEl = byId("fretboard");

let activeKey = "C";

const allKeys = createKeys();

allKeys.forEach(({ el }) => keysEl.appendChild(el));

function createKeys() {
	return keys.map((key) => {
		const active = activeKey === key ? "activeKey" : "";
		const className = `key button ${ active }`;
		const el = c("div", {
			className,
			id: `key_${ key }`,
			textContent: key
		}, () => {
			selectKey(key, el);
		});

		return { el, key };
	});
}

function selectKey(key, keyEl) {
	activeKey = key;

	allKeys.filter(({ key }) => key !== activeKey)
		.forEach(({ el }) => el.classList.remove("activeKey"));

	keyEl.classList.add("activeKey");
}
