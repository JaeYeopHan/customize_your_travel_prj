import PureComponent from "../../PureComponent";
import DetailViewHeaderTemplate from "./DetailViewHeader.hbs";
import "./DetailViewHeader.css";
/**
 * This PureComponent is a DetailViewHeader PureComponent for each screen and contains header and navigation.
 */
class DetailViewHeader extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root, {index, courseName}) {
		super(root);
		this._index = index;
		this._courseName = courseName;
		this._init();
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({sAlert}) {
		this.nextNav.addEventListener("click", () => sAlert());
	}

	/**
	 * @private 
	 */
	_init() {
		super.render(
			DetailViewHeaderTemplate({
				courseName: this._courseName,
			}),
		);
		this.nextNav = document.querySelector("#direction_next");
	}
}

export default DetailViewHeader;
