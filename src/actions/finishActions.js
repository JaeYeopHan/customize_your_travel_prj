import * as type from "./ActionTypes";

export const changeSlideId = id => ({
	type: type.CHANGE_SLIDE_ID,
	payload: id,
});

export default changeSlideId;
