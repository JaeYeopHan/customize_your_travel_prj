import PureComponent from "../../PureComponent";
import MapButtonsTemplate from "./MapButtons.hbs";
import "./MapButtons.css";
import {Dom} from "../../../utils";

/**
 * Button component for control map
 */
class MapButtons extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		super.render(MapButtonsTemplate());
		this.resetBtn = document.querySelector("#btn_reset");
		Dom.preventScroll(this.resetBtn);
	}

	addListener({resetCart}) {
		this.resetBtn.addEventListener("click", () => resetCart());
	}
}

export default MapButtons;
