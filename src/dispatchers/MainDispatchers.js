import * as type from "../actions/ActionTypes";
import {ObjectUtils} from "../utils";

const initialState = {
	DEFAULT_DAY: 1,
	DEFAULT_INDEX: 0,
	DEFAULT_ORDER: 0,
	DEFAUT_FILTERTYPE: 0,
};

const MainReducers = (state, action) => {
	switch (action.type) {
		case type.CHANGE_FILTER_TYPE:
			return Object.assign(state, {filterType: action.payload});
		case type.ADD_TO_CART: {
			const curSpot = state.spots[state.curId];

			if (!curSpot) {
				return state;
			}
			const newSpot = ObjectUtils.copyAt(curSpot);

			return Object.assign(state, {
				cart: state.cart.concat([{
					order: state.curOrder,
					id: curSpot.id,
					item: Object.assign(newSpot, {day: state.lastDay}),
				}]),
				curOrder: state.curOrder + 1,
			});
		}
		case type.CHANGE_CURRENT_ID:
			return Object.assign(state, {curId: action.payload});
		case type.RESET_CART:
			return Object.assign(state, {
				cart: [],
				lastDay: initialState.DEFAULT_DAY,
				curId: initialState.DEFAULT_INDEX,
				curOrder: initialState.DEFAULT_ORDER,
				filterType: initialState.DEFAUT_FILTERTYPE,
			});
		default:
			return state;
	}
};

export default MainReducers;
