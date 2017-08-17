import PureComponent from "../../PureComponent";
import TripModuleDescriptionTemplate from "./TripModuleDescription.hbs";
import "./TripModuleDescription.css";
/**
 * This PureComponent is a TripModuleDescription PureComponent for entry page.
 */
class TripModuleDescription extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root, {id, day, items}) {
		super(root);

		super.render(TripModuleDescriptionTemplate({
			id,
			day,
			items,
		}));
	}
}

export default TripModuleDescription;
