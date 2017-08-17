import * as type from "./ActionTypes";

export const changeFilterType = filterType => ({
	type: type.CHANGE_FILTER_TYPE,
	payload: filterType,
});

export const addToCart = () => ({
	type: type.ADD_TO_CART,
});

export const changeCurrentId = id => ({
	type: type.CHANGE_CURRENT_ID,
	payload: id,
});

export const resetCart = () => ({
	type: type.RESET_CART,
});
