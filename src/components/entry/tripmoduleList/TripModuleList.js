import PureComponent from "../../PureComponent";
import TripModuleListTemplate from "./TripModuleList.hbs";
import "./TripModuleList.css";

/**
 * This PureComponent is a TripModuleList PureComponent for entry page.
 */
class TripModuleList extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root) {
		super(root);
		this._elmRoot = super.render(TripModuleListTemplate(), "#cyt_trip_module_root");
		this.DEVICE_HEIGHT = window.innerHeight - 320;
		this.CART_HEIGHT = 152;
		this.LIST_HEIGHT = 95;
	}

	get subRoot() {
		return this._elmRoot;
	}
}

export default TripModuleList;
