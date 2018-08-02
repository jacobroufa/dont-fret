import * as Utils from "./Utils.js";
import { keys, presets } from "./Defaults.js";
import { byId, c } from "./DOM.js";

const keysEl = byId("keys");
const scalesEl = byId("scales");
const fretboardEl = byId("fretboard");

const allKeys = createKeys();
let activeKey = "C";

allKeys.forEach((key) => keysEl.appendChild(key));

function createKeys() {
	return keys.map((key) => {
		const active = 'activeKey';
		// const active = activeKey === key ? "activeKey" : "";
		const className = `key button ${ active }`;

		return c("div", {
			className,
			id: `key_${ key }`,
			textContent: key
		}, () => {
			activeKey = key;
			console.log(`${ key } has been clicked!`);
		});
	});
}
