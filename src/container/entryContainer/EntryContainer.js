import Cart from "../../domain/Cart";
import Container from "../Container";
import {
	Header,
	TripModuleList,
	TripModuleMain,
	TripModuleSummary,
	TripModuleDescription,
	TripModuleBtn,
	CreateBtn,
} from "../../components";
import {
	EntryStore,
} from "../../store";
import * as action from "../../actions";
import {Dom} from "../../utils";

/**
 *  Entry page Container
 */
class EntryContainer extends Container {
	/**
	 * @param {appStore} store appStore AppManager's store class
	 * @param {appState} state Mangae state class
	 */
	constructor(appStore, state) {
		super();
		this._appStore = appStore;

		this._init();
	}

	_init() {
		firebase.database().ref("/data")
			.orderByKey()
			.once("value")
			.then(snapShot => {
				const data = snapShot.val();
				const carts = Object.values(data)
					.sort((prev, next) => next.id - prev.id)
					.map(rawData => new Cart(rawData));

				this._store = new EntryStore({
					carts,
					active: {},
				});
				this._render();
				this._attachEvent();
				this._store.dispatch(action.render());
			});
	}

	/**
	 * @private
	 */
	_render() {
		this.header = new Header(this._root);
		this.tripModuleList = new TripModuleList(this._root);
		this._renderTripModule();
		this.createBtn = new CreateBtn(this._root);
		Dom.fixScroll(document.querySelector("#cyt_trip_module_root"));
	}

	/**
	 * @private 
	 */
	_attachEvent() {
		this.createBtn.addListener({
			moveToIntro: () => this._appStore.dispatch(action.moveToIntro()),
		});
	}

	_renderTripModule() {
		return this._store.state.carts.map(cart => {
			const {id, courseName, region, lastDay, hashtags, itemsByDay, countOfSpots} = cart;

			this.tripModuleMain = new TripModuleMain(this.tripModuleList.subRoot);
			this.tripModuleSummary = new TripModuleSummary(
				this.tripModuleMain.subRoot,
				{id, courseName, region, lastDay, hashtags, countOfSpots},
			).addListener({
				moveToDetail: () => this._appStore.dispatch(action.moveToDetail(id)),
			});
			itemsByDay.forEach(({day, items}) => {
				this.tripModuleDescription = new TripModuleDescription(
					this.tripModuleSummary.subRoot, {id, day, items},
				);
			});
			this.tripModuleBtn = new TripModuleBtn(this.tripModuleMain.subRoot, {id, lastDay});
			this.tripModuleBtn.addListener({
				addActiveId: ({activeId, count}) => this._store.dispatch(action.addActiveId({activeId, count})),
			});
			return {id, itemsByDay};
		}).forEach(({id, itemsByDay}) => this.tripModuleMain.attachEvent(id, itemsByDay));
	}
}

export default EntryContainer;
