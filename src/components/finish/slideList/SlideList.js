import PureComponent from "../../PureComponent";
import SlideListTemplate from "./SlideList.hbs";
import "./SlideList.css";

/**
 * List Component for rendering SlotList
 */
class SlideList extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		this._elmRoot = super.render(SlideListTemplate(), "#slide_lists");
		this.flickRoot = document.querySelector("#slide_lists");
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({changeSlideId, attachEvent}) {
		if (this.flickRoot.children.length === 0) {
			return;
		}
		this.flicking = new eg.Flicking(this.flickRoot, {
			bounce: [50, 50],
		});
		this.flicking.on({
			"flickEnd": ({no}) => {
				changeSlideId(no);
			},
		});
		attachEvent();
	}

	/**
	 * 
	 * @param {Object} state Event Object or appState Object
	 */
	moveTo({state}) {
		if (typeof state.slideId === "number") {
			this.flicking.moveTo(state.slideId);
		}
	}

	/**
	 * @return {HTMLElmenet}
	 */
	get subRoot() {
		return this._elmRoot;
	}
}

export default SlideList;
