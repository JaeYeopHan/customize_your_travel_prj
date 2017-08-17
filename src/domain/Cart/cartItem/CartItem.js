class CartItem {
	constructor({order, id, item}) {
		this._order = order;
		this._id = id;
		this._item = item;
	}

	get id() {
		return this._item._id;
	}

	get name() {
		return this._item._name;
	}

	get day() {
		return this._item.day;
	}

	get hashtags() {
		return this._item._hashtags;
	}

	get thumnail() {
		return this._item._thumnail;
	}

	get coord() {
		return this._item._coordinates;
	}

	get position() {
		return new naver.maps.LatLng(this.coord[0], this.coord[1]);
	}

	get detailType() {
		return this._item._detailType;
	}

	get description() {
		return this._item._description;
	}

	get image() {
		return this._item._image;
	}

	get countOfReview() {
		return this._item._countOfReview;
	}
}

export default CartItem;
