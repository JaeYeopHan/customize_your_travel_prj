import {Dom} from "../utils";
/**
 * Parent class for component
 */
class PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		this._root = root;
	}

	/**
	 * @param {HandlebarTemplate} template 
	 * @param {HTMLSelector} selector (optional)
	 * @return {HTMLElement} Dom.render(...)
	 */
	render(template, selector = undefined) {
		return Dom.render(
			this._root,
			template,
			selector,
		);
	}
}

export default PureComponent;
