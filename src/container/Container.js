class Container extends eg.Component {
	constructor() {
		super();
		this._root = document.querySelector("#cyt_root");
		this._root.innerHTML = null;
	}
}

export default Container;
