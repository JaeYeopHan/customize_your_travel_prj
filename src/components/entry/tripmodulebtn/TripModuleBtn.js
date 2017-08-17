import PureComponent from "../../PureComponent";
import TripModuleBtnTemplate from "./TripModuleBtn.hbs";
import "./TripModuleBtn.css";
/**
 * This PureComponent is a TripModuleBtn PureComponent for entry page.
 */
class TripModuleBtn extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root, {
		id,
		lastDay,
	}) {
		super(root);
		this._id = id;
		this._count = lastDay;
		super.render(TripModuleBtnTemplate({
			id,
		}));

		this._init(id);
	}

	_init(id) {
		this.btn = document.querySelector(`#cyt_module_btn_${id}`);
		this.list = document.querySelector(`#module_num_${this._id}`);
		this.toggles = document.querySelectorAll(`.cyt_module_btn_toggle_${id}`);
	}

	addListener({addActiveId}) {
		this.btn.addEventListener("click", ({target}) => {
			this.list.classList.toggle("module_dsc_unvisible");
			this.toggles.forEach(elm => elm.classList.toggle("cyt_module_btn_unvisible"));
			addActiveId({
				activeId: this._id,
				count: this._count,
			});
		});
	}
}

export default TripModuleBtn;
