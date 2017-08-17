import * as type from "../actions/ActionTypes";

const IntroReducers = (state, action) => {
	switch (action.type) {
		case type.CREATE_COURSE_NAME:
			return Object.assign(state, {courseName: action.payload});
		case type.SAVE_REGION:
			return Object.assign(state, {region: action.payload});
		default:
			return state;
	}
};

export default IntroReducers;
