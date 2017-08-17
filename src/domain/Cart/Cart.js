import CartItem from "./cartItem";
import {Collections} from "../../utils";

class Cart {
	constructor({id, courseName, region, lastDay, cart}) {
		this._id = id;
		this._courseName = courseName;
		this._region = region;
		this._lastDay = lastDay;
		this._rawCart = cart;

		this._init();
	}

	_init() {
		this._items = this._rawCart.map(data => new CartItem(data));
		this._originCart = this._rawCart.map(data => ({
			item: new CartItem(data),
		}));
		this._itemsByDay = Collections.newArray(this._lastDay).map(baseDay => ({
			day: baseDay,
			items: this._items
				.filter(({day}) => baseDay === day)
				.map(({name, thumnail}) => ({name, thumnail})),
		}));
	}

	get mainImage() {
		return this._items[0].image;
	}

	get originCart() {
		return this._originCart;
	}

	get items() {
		return this._items;
	}

	get countOfSpots() {
		return this._items.length;
	}

	get itemsByDay() {
		return this._itemsByDay;
	}

	get id() {
		return this._id;
	}

	get courseName() {
		return this._courseName;
	}

	get region() {
		return this._region;
	}

	get lastDay() {
		return this._lastDay;
	}

	get count() {
		return this._rawCart.length;
	}

	get hashtags() {
		return this._items[0].hashtags.concat(this._items[1].hashtags);
	}
}

export default Cart;
