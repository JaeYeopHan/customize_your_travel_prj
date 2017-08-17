import PureComponent from "../../PureComponent";
import NoticeTemplate from "./Notice.hbs";
import "./Notice.css";

/**
 * Item component for rendering when cartlist is empty
 */
class Notice extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		super.render(NoticeTemplate());
	}
}

export default Notice;
