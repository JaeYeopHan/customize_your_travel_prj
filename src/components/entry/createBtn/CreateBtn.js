import PureComponent from "../../PureComponent";
import CreateBtnTemplate from "./CreateBtn.hbs";
import "./CreateBtn.css";
/**
 * This PureComponent is a CreateBtn PureComponent for entry page.
 */
class CreateBtn extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root) {
		super(root);
		super.render(CreateBtnTemplate());

		this._init();
	}

	_init() {
		this.btn = document.querySelector("#cyt_entry_create_btn");
	}

	addListener({moveToIntro}) {
		this.btn.addEventListener("click", () => moveToIntro());
	}
}

export default CreateBtn;
