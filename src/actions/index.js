import {
	render,
	nextPage,
	prevPage,
	moveToIntro,
	moveToEntry,
	moveToDetail,
} from "./appActions";

import {
	createCourseName,
	saveRegion,
} from "./introActions";

import {
	changeFilterType,
	addToCart,
	changeCurrentId,
	resetCart,
} from "./mainActions";

import {
	renderCartList,
	addDayBar,
	delDayBar,
	delItem,
	addMapFolding,
} from "./controlActions";

import {
	changeSlideId,
} from "./finishActions";

import {
	addActiveId,
} from "./entryActions";

export {
	render,
	changeFilterType,
	nextPage,
	prevPage,
	moveToIntro,
	moveToEntry,
	moveToDetail,
	createCourseName,
	saveRegion,
	addToCart,
	changeCurrentId,
	resetCart,
	renderCartList,
	addDayBar,
	delDayBar,
	delItem,
	addMapFolding,
	changeSlideId,
	addActiveId,
};
