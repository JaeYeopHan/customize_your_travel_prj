import PureComponent from "../../PureComponent";
import ToTopButtonTemplate from "./ToTopButton.hbs";
import "./ToTopButton.css";

/**
 * Button Component for slide show
 */
class ToTopButton extends PureComponent {
	constructor(root) {
		super(root);
		super.render(ToTopButtonTemplate());
		this.btn = document.querySelector("#cyt_totop_btn");
	}

	addListener({moveToTop}) {
		this.btn.addEventListener("click", () => moveToTop(0));
	}
}

export default ToTopButton;
