import * as type from "../actions/ActionTypes";
import {ObjectUtils} from "../utils";

const initialState = {
	MAX_DAY: 5,
};

const ControlReducers = (state, action) => {
	switch (action.type) {
		case type.ADD_DAY_BAR:
			if (state.lastDay >= initialState.MAX_DAY) {
				return state;
			}
			return Object.assign(state, {
				lastDay: state.lastDay + 1,
			});
		case type.DEL_DAY_BAR:
			if (state.lastDay <= 1) {
				return state;
			}

			state.cart
				.filter(cartItem => cartItem.item.day >= action.payload)
				.map(cartItem => Object.assign(cartItem, {
					item: Object.assign(ObjectUtils.copyAt(cartItem.item), {
						day: cartItem.item.day - 1,
					}),
				}));

			return Object.assign(state, {
				lastDay: state.lastDay - 1,
				cart: state.cart,
			});
		case type.DEL_ITEM:
			return Object.assign(state, {
				cart: state.cart
					.filter(({order}) => order !== ~~(action.payload)),
			});
		case type.ADD_MAP_FOLDING:
			state.mapFoldingState[action.payload.id] = action.payload.isFolding;
			return state;
		default:
			return state;
	}
};

export default ControlReducers;
