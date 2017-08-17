import PureComponent from "../../PureComponent";
import MapWrapperTemplate from "./MapWrapper.hbs";
import "./MapWrapper.css";

/**
 * Wrapper component for styling
 */
class MapWrapper extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		this.root = root;
		this._elmRoot = super.render(MapWrapperTemplate(), "#map");
		document.querySelector("#cyt_root").children[0].classList.add("cyt_container");
	}

	/**
	 * @return {HTMLElement} elmRoot Root element for rendering courseItem
	 */
	get subRoot() {
		return this._elmRoot;
	}
}

export default MapWrapper;
