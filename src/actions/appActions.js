import * as type from "./ActionTypes";

export const nextPage = () => ({
	type: type.NEXT_PAGE,
});

export const prevPage = () => ({
	type: type.PREV_PAGE,
});

export const render = () => ({
	type: type.RENDER_PAGE,
});

export const moveToIntro = () => ({
	type: type.MOVE_TO_INTRO,
});

export const moveToEntry = () => ({
	type: type.MOVE_TO_ENTRY,
});

export const moveToDetail = moduleId => ({
	type: type.MOVE_TO_DETAIL,
	payload: moduleId,
});
