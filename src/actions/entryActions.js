import * as type from "./ActionTypes";

export const addActiveId = ({activeId, count}) => ({
	type: type.ADD_ACTIVE_ID,
	payload: {activeId, count},
});

export default addActiveId;

