import PureComponent from "../../PureComponent";
import CartNavTemplate from "./CartNav.hbs";
import CartNavSymbolTemplate from "./CartNavSymbol.hbs";
import "./CartNav.css";
import {Dom} from "../../../utils";

/**
 * Nav Component for current slide show id
 */
class CartNav extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 * @param {Number[]} navMap Array of day of cart's item
	 * @param {Number} slideId Current slide id.
	 */
	constructor(root, navMap, slideId) {
		super(root);
		this._elmRoot = super.render(CartNavTemplate(), ".cyt_cart_nav");
		Dom.preventScroll(root);
	}

	/**
	 * @description Method for dynamic rendering cart status
	 * @param {Number} count Count of item in current cart list
	 */
	render(navMap, slideId) {
		this._elmRoot.innerHTML = navMap
			.map((day, idx) => (
				CartNavSymbolTemplate({
					isCurrent: idx === slideId,
					day,
				})
			))
			.join("");
	}
}

export default CartNav;
