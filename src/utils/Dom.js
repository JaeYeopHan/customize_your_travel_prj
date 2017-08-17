const DOM = {
	render: (root, template, value) => {
		const wrapper = document.createElement("DIV");

		wrapper.innerHTML = template;
		root.appendChild(wrapper);

		if (value) {
			return document.querySelector(value);
		}
		return wrapper;
	},
	fixScroll(elm) {
		const dump = document.createElement("DIV");

		dump.classList.add("last_item_bottom");
		elm.appendChild(dump);
	},
	preventScroll(elm) {
		elm.addEventListener("DOMMouseScroll", e => e.preventDefault());
		elm.onwheel = e => e.preventDefault();
		elm.onmousewheel = e => e.preventDefault();
		elm.ontouchmove = e => e.preventDefault();
	},
};

export default DOM;
