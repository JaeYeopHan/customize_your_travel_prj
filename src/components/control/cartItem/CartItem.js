import PureComponent from "../../PureComponent";
import CartItemTemplate from "./CartItem.hbs";
import "./CartItem.css";

/**
 * Item component to rendering in cartList
 */
class CartItem extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 * @param {Object} spot Information about spot to render
	 */
	constructor(root, {
		id,
		name,
		detailType,
		description,
	} = {}, order, marker) {
		super(root);
		this._marker = marker;
		super.render(CartItemTemplate({
			id,
			name,
			detailType,
			description,
			order,
		}));
		Array.from(document.querySelectorAll(".cyt_cart_item"))
			.forEach(elm => elm.parentElement.classList.add("list_group_item"));
		this.card = document.querySelector(`#cyt_cart_item_${id}`);
		this._attachEvent();
	}

	_attachEvent() {
		this.card.addEventListener("click", () => this._marker.clicked());
	}
}

export default CartItem;
