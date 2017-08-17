import PureComponent from "../../PureComponent";
import EmptySlotTemplate from "./EmptySlot.hbs";
import "./EmptySlot.css";
/**
 * This PureComponent is a EmptySlot PureComponent for entry page.
 */
class EmptySlot extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root) {
		super(root);
		super.render(EmptySlotTemplate());
	}
}

export default EmptySlot;
