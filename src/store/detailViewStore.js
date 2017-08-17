import Store from "./Store";
import * as dispatchers from "../dispatchers";

/**
 * AppManager store class
 */
class DetailViewStore extends Store {
	constructor(state) {
		super(state);
		super.attachActions(({action}) => dispatchers.FinishDispatchers(this.state, action));
	}

	get cart() {
		return this.state.cart;
	}

	get courseName() {
		return this.state.cart.courseName;
	}

	get index() {
		return this.state.cart.id;
	}

	get mainImage() {
		return this.state.cart.mainImage;
	}

	get center() {
		const pos = [0, 1].map(val => this.cart.items
			.map(item => item.coord[val])
			.reduce((prev, next) => prev + next))
			.map(sum => sum / this.cart.items.length);

		return new naver.maps.LatLng(pos[0], pos[1]);
	}
}

export default DetailViewStore;
