import PureComponent from "../../PureComponent";
import CartStatusTemplate from "./CartStatus.hbs";
import StatusSymbol from "./StatusSymbol.hbs";
import "./CartStatus.css";
import {Collections} from "../../../utils";

/**
 * Status component for rendering status of current cart-list
 */
class CartStatus extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		super.render(CartStatusTemplate());
		this._elmRoot = document.querySelector(".cyt_selected_spots");
		this.MAX_LENGTH = 10;
	}

	/**
	 * @description Method for dynamic rendering cart status
	 * @param {Number} count Count of item in current cart list
	 */
	render(count) {
		const renderOption = {};

		if (count > this.MAX_LENGTH) {
			renderOption.over = true;
		}
		renderOption.countArr = Collections.newArray(count);
		this._elmRoot.innerHTML = StatusSymbol(
			renderOption,
		);
	}
}

export default CartStatus;
