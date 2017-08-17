import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Container from "../Container";
import {FinishStore} from "../../store";
import {
	Common,
	MapWrapper,
	Map,
	Marker,
	Polyline,
	SlideList,
	SlideSlot,
	CourseTitle,
	CartNav,
	EmptySlot,
} from "../../components";
import * as action from "../../actions";
import {Collections} from "../../utils";

/**
 *  Finish page Container
 */
class FinishContainer extends Container {
	/**
	 * @param {appStore} store appStore AppManager's store class
	 * @param {appState} state Mangae state class
	 */
	constructor(appStore, state) {
		super();
		this._appStore = appStore;
		this._store = new FinishStore(state);
		this._index = 4;

		this._appStore.forcedUpdate({index: this._index});
		this._render();
		this._attachEvent();
		this._store.dispatch(action.render());
	}

	/**
	 * @private
	 */
	_render() {
		this.mapWrapper = new MapWrapper(this._root);
		this._elmRoot = this.mapWrapper.subRoot;
		this.map = new Map("map", this._store.getCenter(this._appStore.center), {
			zoom: 4,
			width: 385,
			height: 400,
		});
		this.common = new Common(this._root, {
			index: this._index,
			courseName: this._appStore.courseName,
		});
		this.slideList = new SlideList(this._root);
		this.cartNav = new CartNav(this._root);
		if (this._store.cart.length === 0) {
			this.slot = new EmptySlot(this.slideList.subRoot);
		} else {
			this._store.cart.forEach(({item}) => new SlideSlot(this.slideList.subRoot, item));
		}
	}

	/**
	 * @private 
	 */
	_attachEvent() {
		this.common.addListener({
			prevPage: () => this._appStore.dispatch(action.prevPage()),
			optional: {
				finish: {
					isCorrectInput: this._isCorrectInput.bind(this),
					errorAlert: () => FinishContainer._errorAlert(),
					sAlert: moveToPage => this._applyAlert(moveToPage),
				},
			},
			entryPage: () => this._appStore.dispatch(action.moveToEntry()),
		});
		this.slideList.addListener({
			changeSlideId: id => this._store.dispatch(action.changeSlideId(id)),
			attachEvent: () => this._store.on("action_trigger", this.slideList.moveTo.bind(this.slideList)),
		});
		this._store.on("action_trigger", this._drawCourseTitle.bind(this));
		this._store.on("action_trigger", this._drawCartMarkers.bind(this));
		this._store.on("action_trigger", this._drawPolyline.bind(this));
		this._store.on("action_trigger", this._drawCartNav.bind(this));
		this._store.on("action_trigger", this.map.panToFinish.bind(this.map));
	}

	/**
	 * @private
	 */
	_drawCartNav({state}) {
		const {cart, slideId} = state;
		const navMap = cart.map(({item}) => item.day);

		this.cartNav.render(navMap, slideId);
	}

	/**
	 * @private
	 */
	_drawCourseTitle({state}) {
		const {courseName, region, lastDay} = state;

		this.courseTitle = new CourseTitle(this._root, {
			courseName,
			region,
			lastDay,
		});
	}

	/**
	 * @private
	 */
	_drawCartMarkers({state}) {
		const {cart, slideId} = state;

		if (this.cartMarkers) {
			this.cartMarkers.forEach(marker => marker.reset());
		}
		this.cartMarkers = cart
			.map(({item, order}) => new Marker(this.map.map, item, cart[slideId].id, order))
			.map(marker => marker.addListener({
				changeSlideId: id => this._store.dispatch(action.changeSlideId(id)),
			}));
	}

	/**
	 * @private
	 */
	_drawPolyline({state}) {
		const {cart, lastDay} = state;
		const pathes = Collections.newArray(lastDay).map(elm => (
			cart.filter(({item}) => item.day === elm)
				.map(({item}) => item.position)
		));
		const bridge = Polyline._buildBridge(pathes);

		if (this.polyline) {
			this.polyline.reset();
		}
		this.polyline = new Polyline(
			this.map.map,
			pathes,
			bridge,
		);
	}

	/**
	 * @private
	 */
	_applyAlert(moveToPage, sendToServer) {
		return swal({
			title: "Are you finished?",
			text: "일정 만들기를 완료합니다.",
			type: "info",
			showCancelButton: true,
			confirmButtonText: "완료하기",
			cancelButtonText: "취소하기",
			confirmButtonClass: "btn btn-common btn-complete",
			cancelButtonClass: "btn btn-common btn-cancel",
			buttonsStyling: false,
			target: ".recommend_content",
		}).then(() => {
			const id = Date.now();

			return firebase.database().ref(`/data/${id}`)
				.update({
					id,
					courseName: this._store.courseName,
					region: this._store.region,
					lastDay: this._store.lastDay,
					cart: this._store.cart,
				})
				.then(resp => (
					swal("Applied!", "일정 만들기가 완료되었습니다.", "success")
						.then(() => setTimeout(() => {
							location.href = "/";
						}, 500))
				))
				.catch(() => swal("Failed!", "다시 시도해주세요.", "error"));
		},
		dismiss => swal("Cancelled", "계속 일정을 편집합니다.", "warning"));
	}

	_isCorrectInput() {
		return this._store.cart.length > 1;
	}

	static _errorAlert() {
		return swal(
			"일정을 추가해주세요.",
			"일정이 비어있습니다.",
			"error",
		);
	}
}

export default FinishContainer;
