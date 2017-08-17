import Sortable from "sortablejs";
import Container from "../Container";
import {ControlStore} from "../../store";
import {
	Common,
	CartList,
	CartItem,
	DayBar,
	DayButton,
	EmptyCart,
	Notice,
	Map,
	Marker,
	Polyline,
} from "../../components";
import * as action from "../../actions";
import {Collections, ObjectUtils} from "../../utils";

class ControlContainer extends Container {
	/**
	 * @param {_appStore} _appStore AppManager"s store class
	 * @param {appState} state Mangae state class
	 */
	constructor(appStore, state) {
		super();
		this._appStore = appStore;
		this._store = new ControlStore(state);
		this._index = 3;

		this._appStore.forcedUpdate({index: this._index});
		this._render();
		this._attachEvent();
		this._store.dispatch(action.render());
	}

	/**
	 * @private
	 */
	_render() {
		this.common = new Common(this._root, {
			index: this._index,
			courseName: this._appStore.courseName,
		});
		this._notice = new Notice(this._root);
		this.cartList = new CartList(this._root);
		this.cartListRoot = this.cartList.subRoot;
		this.dayButton = new DayButton(this._root);
	}

	/**
	 * @private
	 */
	_attachEvent() {
		this.common.addListener({
			nextPage: () => this._appStore.dispatch(action.nextPage()),
			prevPage: () => this._appStore.dispatch(action.prevPage()),
			optional: {
				control: {
					changeCart: () => this._store.forcedUpdate(this._changedState()),
				},
			},
			entryPage: () => this._appStore.dispatch(action.moveToEntry()),
		});
		this.dayButton.addListener({
			changeCart: () => this._store.forcedUpdate(this._changedState()),
			addDayBar: () => this._store.dispatch(action.addDayBar()),
		});
		this._store.on("action_trigger", this._drawCartList.bind(this));
		this._store.on("action_trigger", this._enableDragAndDrop.bind(this));
	}

	/**
	 * @private
	 */
	_drawCartList({state}) {
		const {cart, lastDay, mapFoldingState} = state;

		if (this.lastDayBar) {
			this.cartListRoot.innerHTML = null;
		}
		Collections.newArray(lastDay).forEach(curDay => {
			this.lastDayBar = new DayBar(this.cartListRoot, curDay, mapFoldingState);
			this.map = new Map(
				this.lastDayBar.subRoot,
				this._appStore.center,
				{width: 376, height: 0},
				false,
			);
			this.lastDayBar.addMap(this.map);
			this.lastDayBar.addListener({
				addMapFolding: (id, isFolding) => this._store.dispatch(action.addMapFolding(id, isFolding)),
			});
			const path = cart
				.filter(({item}) => item.day === curDay)
				.map(({item, order}) => {
					this.marker = new Marker(this.map.map, item, undefined, order);
					this.item = new CartItem(this.cartListRoot, item, order, this.marker);
					return item;
				})
				.filter(item => item)
				.map(({position, coord}) => ({position, coord}));

			this.polyline = new Polyline(
				this.map.map,
				[...path.map(({position}) => position)],
				undefined,
				true,
				curDay,
			);
			this.map.setCenter(path.map(({coord}) => coord));
		});

		if (cart.length === 0) {
			this.latItem = new EmptyCart(this.cartListRoot);
		}
		this.cartList.addListener({
			delDayBar: day => this._store.dispatch(action.delDayBar(day)),
			delItem: id => this._store.dispatch(action.delItem(id)),
			changeCart: () => this._store.forcedUpdate(this._changedState()),
		});
	}

	/**
	 * @private
	 */
	_enableDragAndDrop() {
		return Sortable.create(document.querySelector("#list-group"), {
			handle: ".cyt_cart_item_control",
			animation: 150,
			draggable: ".list_group_item",
			filter: ".last_item_bottom",
			onUpdate: () => {
				this._store.forcedUpdate(this._changedState());
				this._store.dispatch(action.render());
			},
		});
	}

	/**
	 * @private
	 */
	_changedState() {
		let isCorrectChanged = false;
		const newState = {
			cart: [],
			curOrder: 0,
			lastDay: 1,
		};

		Array.from(document.querySelectorAll(".list_group_item"))
			.map(elm => elm.children[0])
			.forEach(itemElm => {
				if (itemElm.classList.contains("cyt_day_bar") && isCorrectChanged) {
					isCorrectChanged = false;
					return Object.assign(newState, {lastDay: newState.lastDay + 1});
				}

				if (!itemElm.dataset.spot) {
					return Object.assign(newState, {lastDay: newState.lastDay});
				}
				const id = ~~(itemElm.dataset.spot);
				const item = ObjectUtils.copyAt(this._store.state.spots[id]);

				isCorrectChanged = true;
				return Object.assign(newState, {
					cart: newState.cart.concat([{
						order: newState.curOrder,
						id,
						item: Object.assign(item, {day: newState.lastDay}),
					}]),
					curOrder: newState.curOrder + 1,
				});
			});
		return newState;
	}
}

export default ControlContainer;
