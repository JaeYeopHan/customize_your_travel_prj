import * as type from "../actions/ActionTypes";

const FinishReducers = (state, action) => {
	switch (action.type) {
		case type.CHANGE_SLIDE_ID:
			return Object.assign(state, {
				slideId: action.payload,
			});
		default:
			return state;
	}
};

export default FinishReducers;
