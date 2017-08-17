import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Container from "../Container";
import {MainStore} from "../../store";
import {
	Common,
	MapWrapper,
	Map,
	Marker,
	Polyline,
	MapButtons,
	CartStatus,
	CartButton,
	SelectorWrapper,
	CourseTypeSelector,
	Courses,
	CourseItem,
	ToTopButton,
	SpotInfoTemplate,
} from "../../components";
import * as action from "../../actions";
import {Collections} from "../../utils";

/**
 * This Container is the Container where the main page begins rendering.
 * TODO : Seperate to map / course / control.
 */
class MainContainer extends Container {
	/**
	 * @param {appStore} appStore AppManager's store class
	 * @param {appState} state Mangae state class
	 */
	constructor(appStore, state) {
		super();
		this._appStore = appStore;
		this._store = new MainStore(state);
		this.DEVICE_HEIGHT = window.innerHeight - 200;
		this._index = 2;

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

		this.map = new Map("map", this._appStore.center, {
			width: 385,
			height: 400,
		});
		this.common = new Common(this._root, {
			index: this._index,
			courseName: this._appStore.courseName,
		});
		this.mapButtons = new MapButtons(this._root);
		this.cartStatus = new CartStatus(this._root);
		this.cartButton = new CartButton(this._root);
		this.courses = new Courses(this._root);
		this.courses.fixRange(this._store.state.filterType);
		this.selectorWrapper = new SelectorWrapper(this._root).addListener({
			changeFilter: type => this._store.dispatch(action.changeFilterType(type)),
			fixRange: type => this.courses.fixRange(type),
		});
	}

	/**
	 * @private
	 */
	_attachEvent() {
		this.common.addListener({
			nextPage: () => this._appStore.dispatch(action.nextPage()),
			prevPage: () => this._appStore.dispatch(action.prevPage()),
			entryPage: () => this._appStore.dispatch(action.moveToEntry()),
		});
		this.cartButton.addListener({
			addToCart: () => this._store.dispatch(action.addToCart()),
		});
		this.courses.addListener({
			changeCurrentId: curId => this._store.dispatch(action.changeCurrentId(curId)),
			showSpotInfo: link => this._showSpotInfo(link),
		});
		this.mapButtons.addListener({
			resetCart: () => this._store.dispatch(action.resetCart()),
		});
		this._store.on("action_trigger", this._drawMarkers.bind(this));
		this._store.on("action_trigger", this._drawCourses.bind(this));
		this._store.on("action_trigger", this._drawPolyline.bind(this));
		this._store.on("action_trigger", this._drawCartStatus.bind(this));
		this._store.on("action_trigger", this._drawCourseTypeSelector.bind(this));
		this._store.on("action_trigger", this.courses.setTo.bind(this.courses));
		this._store.on("action_trigger", this.map.panTo.bind(this.map));
	}

	/**
	 * @private 
	 */
	_drawCourseTypeSelector({state}) {
		const {filterType} = state;

		if (this.courseTypeSelector) {
			this.selectorWrapper.subRoot.innerHTML = null;
		}
		this.courseTypeSelector = new CourseTypeSelector(this.selectorWrapper.subRoot, filterType);
	}

	/**
	 * @private
	 */
	_drawCartStatus({state}) {
		this.cartStatus.render(state.cart.length);
	}

	/**
	 * @private
	 */
	_drawMarkers({state}) {
		const {filterType, spots, curId, cart} = state;

		if (this._markers) {
			this._markers.forEach(marker => marker.reset());
		}
		this._markers = spots
			.filter(({type}) => MainContainer._filteringByType(filterType, type))
			.concat(cart.map(({item}) => item))
			.map(spot => new Marker(this.map.map, spot, curId))
			.map(marker => marker.addListener({
				changeCurrentId: changedId => this._store.dispatch(action.changeCurrentId(changedId)),
			}));
	}

	/**
	 * @private
	 */
	_drawCourses({state}) {
		const {filterType, spots} = state;

		if (this._courses) {
			this.courses.subRoot.innerHTML = null;
		}
		this._courses = spots
			.filter(({type}) => MainContainer._filteringByType(filterType, type))
			.map(spot => new CourseItem(this.courses.subRoot, spot));
		this.toTopBtn = new ToTopButton(this.courses.subRoot).addListener({
			moveToTop: pos => this.courses.axesSetTo(pos, true),
		});
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
	static _filteringByType(filterType, type) {
		if (~~(filterType) === 0) {
			return true;
		}
		return type === {
			1: "명소",
			2: "맛집",
			3: "쇼핑",
		}[filterType];
	}

	/**
	 * @private
	 */
	_showSpotInfo(link) {
		return swal({
			html: SpotInfoTemplate({
				height: this.DEVICE_HEIGHT,
				link,
			}),
			background: "transparent",
			buttonsStyling: false,
			showConfirmButton: true,
			confirmButtonText: `<i class="fa fa-shopping-cart" aria-hidden="true"></i>`,
			confirmButtonClass: "show_spot_info_btn show_spot_info_add_btn",
			showCancelButton: true,
			cancelButtonText: `<i class="fa fa-times" aria-hidden="true"></i>`,
			cancelButtonColor: "transparent",
			cancelButtonClass: "show_spot_info_btn show_spot_info_cancel_btn",
		}).then(() => this._store.dispatch(action.addToCart()));
	}
}

export default MainContainer;
