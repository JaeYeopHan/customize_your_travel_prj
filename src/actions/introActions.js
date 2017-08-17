import * as type from "./ActionTypes";

const _initialState = {
	name: "코스 이름을 입력해주세요.",
};

export const createCourseName = (name = _initialState.name) => ({
	type: type.CREATE_COURSE_NAME,
	payload: name,
});

export const saveRegion = region => ({
	type: type.SAVE_REGION,
	payload: region,
});

export default createCourseName;
