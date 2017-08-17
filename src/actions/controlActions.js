import * as type from "./ActionTypes";

export const renderCartList = () => ({
	type: type.RENDER_CART_LIST,
});

export const addDayBar = () => ({
	type: type.ADD_DAY_BAR,
});

export const delDayBar = day => ({
	type: type.DEL_DAY_BAR,
	payload: day,
});

export const delItem = id => ({
	type: type.DEL_ITEM,
	payload: id,
});

export const addMapFolding = (id, isFolding) => ({
	type: type.ADD_MAP_FOLDING,
	payload: {
		id, isFolding,
	},
});
