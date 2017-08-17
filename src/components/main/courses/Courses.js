import PureComponent from "../../PureComponent";
import CoursesTemplate from "./Courses.hbs";
import "./Courses.css";

/**
 * List Component for rendering CourseItem
 */
class Courses extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		this.root = root;
		this._elmRoot = super.render(CoursesTemplate(), "#course_item_lists");
		this.CARD_HEIGHT = 91;
		this.LAST_INDEX = 30;
		this.idx = {
			0: 0,
			1: 0,
			2: 11,
			3: 21,
		};
		// Count of spot by type - 1(list)
		this.range = {
			0: [30 * this.CARD_HEIGHT * -1, 0],
			1: [10 * this.CARD_HEIGHT * -1, 0],
			2: [9 * this.CARD_HEIGHT * -1, 0],
			3: [9 * this.CARD_HEIGHT * -1, 0],
		};
		// by type first axes course item num
		this.base = 0;
		// axes course item num
		this.index = 0;

		// Apply Axes for scrolling list
		this.courseList = new eg.Axes({
			scrollY: {
				range: [28 * this.CARD_HEIGHT * -1, 0],
				bounce: 30,
				circular: false,
			},
		}, {
			deceleration: 0.0024,
			interruptable: true,
		}, {
			"scrollY": 0,
		}).connect(
			[undefined, "scrollY"],
			new eg.Axes.PanInput(".api_list_scroll_wrapping"), {
				scale: [0, 0.01],
			},
		);
		this.cartArea = document.querySelector("#course_item_lists");
	}

	/**
	 * @return {HTMLElement} elmRoot Root element for rendering courseItem
	 */
	get subRoot() {
		return this._elmRoot;
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({changeCurrentId, showSpotInfo}) {
		this.courseList.on({
			"change": ({pos}) => {
				this.cartArea.style.transform = `translateY(${pos.scrollY}px)`;
			},
			"release": ({destPos}) => {
				this.index = Math.round(destPos.scrollY / this.CARD_HEIGHT) * -1;
				this.axesSetTo(this.index * this.CARD_HEIGHT * -1);
			},
			"animationEnd": () => {
				const changedId = this.index + this.base;

				if (changedId <= this.LAST_INDEX && (changedId === 0 || changedId)) {
					changeCurrentId(changedId);
				}
			},
		});

		this.cartArea.addEventListener("click", e => {
			e.preventDefault();
			if (e.target.classList.contains("cyt_totop_btn")) {
				return;
			}
			const target = $(e.target).closest(".inner");

			showSpotInfo(target.attr("href"));
			changeCurrentId(target.data("courseid"));
		});
		return this;
	}

	/**
	 * @description Methods for setting position
	 * @param {appState} state State of app 
	 */
	setTo({state}) {
		this.index = state.curId - this.base;
		this.axesSetTo(this.index * this.CARD_HEIGHT * -1);
	}

	/**
	 * @description Method for setting axes scroll position
	 * @param {Number} pos 
	 */
	axesSetTo(pos, isInitialize = false) {
		this.courseList.setTo({scrollY: pos}, 300);
		if (isInitialize) {
			this.index = 0;
		}
	}

	/**
	 * @param {String} filterType Spot's type for filtering list
	 */
	fixRange(filterType) {
		this.courseList.axis.scrollY.range = this.range[filterType];
		this.base = this.idx[filterType];
		this.courseList.trigger("change", {pos: {
			scrollY: 0,
		}});
	}
}

export default Courses;
