import Store from "./Store";
import * as dispatchers from "../dispatchers";

/**
 * Finish page store class
 */
class FinishStore extends Store {
	/**
	 * @param {appState} state 
	 */
	constructor(state) {
		super(state);
		super.attachActions(({action}) => dispatchers.FinishDispatchers(this.state, action));
	}

	getCenter(defaultPos) {
		if (this._state.cart.length === 0) {
			return defaultPos;
		}
		const pos = [0, 1].map(val => this._state.cart
			.map(({item}) => item.coord[val])
			.reduce((prev, next) => prev + next))
			.map(sum => sum / this._state.cart.length);

		return new naver.maps.LatLng(pos[0], pos[1]);
	}

	get cart() {
		return this._state.cart;
	}

	get courseName() {
		return this._state.courseName;
	}

	get region() {
		return this._state.region;
	}

	get lastDay() {
		return this._state.lastDay;
	}
}

export default FinishStore;
