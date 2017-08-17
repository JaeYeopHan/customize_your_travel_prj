import PureComponent from "../../PureComponent";
import HeaderTemplate from "./Header.hbs";
import "./Header.css";
/**
 * This PureComponent is a Header PureComponent for entry page.
 */
class Header extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root) {
		super(root);
		super.render(HeaderTemplate());
	}
}

export default Header;
