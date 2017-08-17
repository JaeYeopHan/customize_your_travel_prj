import PureComponent from "../../PureComponent";
import CartListTemplate from "./CartList.hbs";
import "./CartList.css";
import {Dom} from "../../../utils";

/**
 * List Component for rendering CartItem
 */
class CartList extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		this.root = root;
		this._elmRoot = super.render(CartListTemplate(), ".cyt_cart_list");
	}

	get subRoot() {
		return this._elmRoot;
	}

	/**
	 * @private
	 */
	_init() {
		this.dayBarDelBtns = Array.from(document.querySelectorAll(".cyt_daybar_del_btn"));
		this.cartItemDelBtns = Array.from(document.querySelectorAll(".cyt_cartItem_del_btn"));
		Dom.fixScroll(document.querySelector("#list-group"));
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({delDayBar, delItem, changeCart}) {
		this._init();
		this.dayBarDelBtns.forEach(elm => {
			elm.addEventListener("click", ({target}) => {
				if (target.dataset.day) {
					changeCart();
					$(target).closest(".cyt_day_bar")
						.addClass("cyt_cart_delete_effect");
					setTimeout(() => delDayBar(target.dataset.day), 270);
				}
			});
		});

		this.cartItemDelBtns.forEach(elm => {
			elm.addEventListener("click", ({target}) => {
				if (target.dataset.order) {
					$(target).closest(".cyt_cart_item")
						.addClass("cyt_cart_delete_effect");
					setTimeout(() => delItem(target.dataset.order), 270);
				}
			});
		});
	}
}

export default CartList;
