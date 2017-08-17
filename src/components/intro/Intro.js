import PureComponent from "../PureComponent";
import introTemplate from "./Intro.hbs";
import "./Intro.css";

/**
 * Component for rendering Intro page
 */
class Intro extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root) {
		super(root);
		super.render(introTemplate());

		this._init();
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({nextPage, createCourseName, saveRegion, moveToEntry, sAlert}) {
		this.btn.addEventListener("click", () => {
			const courseName = document.querySelector("#cyt_course_name").value;

			if (courseName.length > 15) {
				return sAlert();
			}
			createCourseName(courseName !== "" ? courseName : undefined);
			return nextPage();
		});
		this.lists.addEventListener("click", ({target}) => {
			if (target.classList.contains("cyt_region_list")) {
				Array.from(this.regions).forEach(elm => elm.classList.remove("region_clicked"));
				target.classList.add("region_clicked");
				saveRegion(target.textContent);
			}
		});
		this.cancelBtn.addEventListener("click", () => moveToEntry());
	}

	/**
	 * @private
	 */
	_init() {
		this.btn = document.getElementById("cyt_region_submit_btn");
		this.cancelBtn = document.querySelector(".cyt_nav_cancel_btn");
		this.lists = document.querySelector(".cyt_region_lists");
		this.regions = document.querySelectorAll(".cyt_region_list");
		document.querySelector("#cyt_root").children[0].classList.add("cyt_container");
	}
}

export default Intro;
