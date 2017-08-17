import PureComponent from "../../PureComponent";
import SelectorWrapperTemplate from "./SelectorWrapper.hbs";
import "./SelectorWrapper.css";
import {Dom} from "../../../utils";

/**
 * This PureComponent is a SelectorWrapper PureComponent for entry page.
 */
class SelectorWrapper extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root) {
		super(root);
		this._elmRoot = super.render(SelectorWrapperTemplate(), "#cyt_select_type_lists");
		this.lists = document.querySelector(".cyt_select_type_lists");
		Dom.preventScroll(this.lists);
	}

	get subRoot() {
		return this._elmRoot;
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({changeFilter, fixRange}) {
		this.lists.addEventListener("click", ({target}) => {
			if (target.classList.contains("cyt_select_type")) {
				changeFilter(target.dataset.type);
				fixRange(target.dataset.type);
			}
		});
		return this;
	}
}

export default SelectorWrapper;
