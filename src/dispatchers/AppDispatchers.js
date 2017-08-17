import * as type from "../actions/ActionTypes";

const initialState = {
	DEFAULT_DAY: 1,
	DEFAULT_INDEX: 0,
	DEFAULT_ORDER: 0,
	DEFAULT_SLIDE_ID: 0,
	DEFAULT_MAP_FOLDING_STATUS: {
		1: true,
		2: true,
		3: true,
		4: true,
		5: true,
	},
};

const AppReducers = (state, action) => {
	const idx = state.index;

	switch (action.type) {
		case type.RENDER_PAGE:
			return Object.assign(state, idx);
		case type.NEXT_PAGE:
			return Object.assign(state, {index: idx + 1});
		case type.PREV_PAGE:
			return Object.assign(state, {index: idx - 1});
		case type.MOVE_TO_INTRO:
			return Object.assign(state, {index: 1});
		case type.MOVE_TO_ENTRY:
			return Object.assign(state, {
				index: initialState.DEFAULT_INDEX,
				slideId: initialState.DEFAULT_SLIDE_ID,
				curId: initialState.DEFAULT_INDEX,
				lastDay: initialState.DEFAULT_DAY,
				curOrder: initialState.DEFAULT_ORDER,
				cart: [],
				mapFoldingState: initialState.DEFAULT_MAP_FOLDING_STATUS,
			});
		case type.MOVE_TO_DETAIL:
			return Object.assign(state, {
				index: 99,
				activeModuleId: action.payload,
			});
		default:
			return state;
	}
};

export default AppReducers;
