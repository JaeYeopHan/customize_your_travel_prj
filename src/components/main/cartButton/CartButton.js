import PureComponent from "../../PureComponent";
import CartButtonTemplate from "./CartButton.hbs";
import "./CartButton.css";
import {Dom} from "../../../utils";

/**
 * Button component for adding spot to cart
 */
class CartButton extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		super.render(CartButtonTemplate());
		this.btn = document.querySelector("#cyt_add_course_btn");
		this._attachEvent();
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({addToCart}) {
		this.btn.addEventListener("click", () => {
			addToCart();
		});
	}

	/**
	 * @private
	 */
	_attachEvent() {
		this.btn.addEventListener("mousedown", ({target}) => target.classList.add("clicked"));
		this.btn.addEventListener("mouseup", ({target}) => target.classList.remove("clicked"));
		Dom.preventScroll(this.btn);
	}
}

export default CartButton;
