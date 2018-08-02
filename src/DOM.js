export const $ = (selector) => document.querySelector(selector);
export const byId = (selector) => document.getElementById(selector);

/**
 * Our generic element creation interface
 */
export function c(tag, opts, click) {
	const el = document.createElement(tag);
	const keys = (obj) => Object.keys(obj);

	keys(opts).forEach((opt) => {
		const setAttr = (attr) => el.setAttribute(attr, opt[attr]);

		if (opt === "data") {
			keys(opt).forEach(setAttr);
		} else {
			el[opt] = opts[opt];
		}
	});

	if (click) {
		el.addEventListener("click", (e) => {
			e.preventDefault();

			click(e, opts.data);
		});
	}

	return el;
}
