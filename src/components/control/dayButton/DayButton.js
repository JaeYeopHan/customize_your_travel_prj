import PureComponent from "../../PureComponent";
import DayButtonTemplate from "./DayButton.hbs";
import "./DayButton.css";

/**
 * Button component for adding daybar in cartlist component
 */
class DayButton extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		super.render(DayButtonTemplate());

		this._init();
	}

	/**
	 * @private
	 */
	_init() {
		this.btn = document.querySelector("#cyt_add_day_btn");
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({changeCart, addDayBar}) {
		this.btn.addEventListener("click", () => {
			changeCart();
			addDayBar();
		});
	}
}

export default DayButton;
