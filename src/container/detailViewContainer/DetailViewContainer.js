import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import "../../assets/css/share.css";
import Cart from "../../domain/Cart";
import Container from "../Container";
import {DetailViewStore} from "../../store";
import {
	DetailViewHeader,
	MapWrapper,
	Map,
	Marker,
	Polyline,
	SlideList,
	SlideSlot,
	CourseTitle,
	CartNav,
	MetaTagsTemplate,
} from "../../components";
import * as action from "../../actions";
import {Collections} from "../../utils";

/**
 *  Finish page Container
 */
class DetailViewContainer extends Container {
	/**
	 * @param {appStore} store appStore AppManager's store class
	 * @param {appState} state Mangae state class
	 */
	constructor(appStore, state, activeModuleId) {
		super();
		this._appStore = appStore;
		this._state = state;
		this._moduleId = activeModuleId;
		this._init();
	}

	/**
	 * @private
	 */
	_init() {
		firebase.database().ref(`/data/${this._moduleId}`)
			.once("value")
			.then(snapShot => {
				const data = snapShot.val();
				const moduleCart = new Cart(data);

				this._store = new DetailViewStore(
					Object.assign(this._state, {
						cart: moduleCart,
					}),
				);
				this._render();
				this._attachEvent();
				this._store.dispatch(action.render());
				this._insertMetaTag();
			});
	}

	/**
	 * @private 
	 */
	_insertMetaTag() {
		$("head").append(MetaTagsTemplate({
			url: `${location.href}`,
			title: "나만의 여행 코스",
			description: this._store.courseName,
			image: this._store.mainImage,
		}));
	}

	/**
	 * @private
	 */
	_render() {
		this.mapWrapper = new MapWrapper(this._root);
		this._elmRoot = this.mapWrapper.subRoot;
		this.map = new Map("map", this._store.center, {
			zoom: 4,
			width: 385,
			height: 400,
		});
		this.detailViewHeader = new DetailViewHeader(this._root, {
			index: 99,
			courseName: this._store.courseName,
		});
		this.slideList = new SlideList(this._root);
		this.cartNav = new CartNav(this._root);
		this._store.cart.items.forEach(item => new SlideSlot(this.slideList.subRoot, item));
	}

	/**
	 * @private 
	 */
	_attachEvent() {
		this.detailViewHeader.addListener({
			sAlert: DetailViewContainer._applyAlert,
		});
		this.slideList.addListener({
			changeSlideId: id => this._store.dispatch(action.changeSlideId(id)),
			attachEvent: () => this._store.on("action_trigger", this.slideList.moveTo.bind(this.slideList)),
		});
		this._store.on("action_trigger", this._drawCourseTitle.bind(this));
		this._store.on("action_trigger", this._drawCartMarkers.bind(this));
		this._store.on("action_trigger", this._drawPolyline.bind(this));
		this._store.on("action_trigger", this._drawCartNav.bind(this));
		this._store.on("action_trigger", this.map.panToDetail.bind(this.map));
	}

	/**
	 * @private
	 */
	_drawCartNav({state}) {
		const {cart, slideId} = state;
		const navMap = cart.items.map(item => item.day);

		this.cartNav.render(navMap, slideId);
	}

	/**
	 * @private
	 */
	_drawCourseTitle({state}) {
		const {cart} = state;

		this.courseTitle = new CourseTitle(this._root, {
			courseName: cart.courseName,
			region: cart.region,
			lastDay: cart.lastDay,
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
		this.cartMarkers = cart.items
			.map((item, order) => new Marker(this.map.map, item, cart.items[slideId].id, order))
			.map(marker => marker.addListener({
				changeSlideId: id => this._store.dispatch(action.changeSlideId(id)),
			}));
	}

	/**
	 * @private
	 */
	_drawPolyline({state}) {
		const {cart} = state;
		const pathes = Collections.newArray(cart.lastDay).map(elm => (
			cart.items
				.filter(item => item.day === elm)
				.map(item => item.position)
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
	static _applyAlert(moveToPage, sendToServer) {
		return swal({
			title: "공유하시겠습니까?",
			type: "info",
			html: `
			<div class="cyt_share_fb_btn"
				data-mobile-iframe="true">
				<i class="fa fa-facebook" aria-hidden="true"></i>
				<a class="fb-xfbml-parse-ignore" target="_blank"
					href="https://www.facebook.com/sharer/sharer.php?u=${location.href}">
					페이스북에 공유하기
				</a>
			</div>`,
			showCloseButton: true,
			showCancelButton: false,
			showConfirmButton: false,
		});
	}
}

export default DetailViewContainer;
