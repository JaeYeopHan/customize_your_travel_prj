import PureComponent from "../PureComponent";
import CommonTemplate from "./Common.hbs";
import "./Common.css";
import {ObjectUtils, Dom} from "../../utils";
/**
 * This PureComponent is a common PureComponent for each screen and contains header and navigation.
 */
class Common extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root, {index, courseName}) {
		super(root);
		this._index = index;
		this._courseName = courseName;
		this._navInfo = {
			2: {
				prevNav: "돌아가기",
				nextNav: "편집하기",
			},
			3: {
				prevNav: "추가하기",
				nextNav: "확인하기",
			},
			4: {
				prevNav: "편집하기",
				nextNav: "완료하기",
			},
			99: {
				prevNav: "돌아가기",
				nextNav: "공유하기",
			},
		};

		this._init();
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({entryPage, nextPage, prevPage, optional}) {
		this.prevNav.addEventListener("click", () => {
			if (ObjectUtils.isEmpty(optional)) {
				return prevPage();
			}
			if (!ObjectUtils.isEmpty(optional.control)) {
				optional.control.changeCart();
				return prevPage();
			}
			if (!ObjectUtils.isEmpty(optional.detail)) {
				return entryPage();
			}
			return prevPage();
		});
		this.nextNav.addEventListener("click", () => {
			if (ObjectUtils.isEmpty(optional)) {
				return nextPage();
			}
			if (!ObjectUtils.isEmpty(optional.control)) {
				optional.control.changeCart();
				return nextPage();
			}
			if (!ObjectUtils.isEmpty(optional.finish)) {
				const {isCorrectInput, errorAlert, sAlert} = optional.finish;

				if (!isCorrectInput()) {
					return errorAlert();
				}

				return sAlert(entryPage);
			}
			if (!ObjectUtils.isEmpty(optional.detail)) {
				return optional.detail.sAlert();
			}
			return nextPage();
		});
		this.entryNav.addEventListener("click", () => entryPage());
	}

	/**
	 * @private 
	 */
	_init() {
		const courseName = this._courseName;
		const {prevNav, nextNav} = this._navInfo[this._index];

		super.render(
			CommonTemplate({
				courseName,
				prevNav,
				nextNav,
			}),
		);
		this.prevNav = document.querySelector("#direction_prev");
		this.nextNav = document.querySelector("#direction_next");
		this.entryNav = document.querySelector("#cyt_to_entry_btn");
		Dom.preventScroll(document.querySelector(".cyt_section_meta"));
	}
}

export default Common;
