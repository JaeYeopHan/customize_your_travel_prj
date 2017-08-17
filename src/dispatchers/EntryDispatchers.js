import * as type from "../actions/ActionTypes";

const EntryReducers = (state, action) => {
	switch (action.type) {
		case type.ADD_ACTIVE_ID:
			if (state.active[action.payload.activeId]) {
				state.active[action.payload.activeId] = 0;
			} else {
				state.active[action.payload.activeId] = action.payload.count;
			}
			return state;
		default:
			return state;
	}
};

export default EntryReducers;
