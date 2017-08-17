import PureComponent from "../../PureComponent";
import EmptyCartTemplate from "./EmptyCart.hbs";
import "./EmptyCart.css";

/**
 * Item component for rendering when cartlist is empty
 */
class EmptyCart extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		super.render(EmptyCartTemplate());
	}
}

export default EmptyCart;
