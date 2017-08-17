import PureComponent from "../../PureComponent";
import DayBarTemplate from "./DayBar.hbs";
import "./DayBar.css";

/**
 * Item component for dividing CartItem
 */
class DayBar extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 * @param {Number} item Number of last day
	 */
	constructor(root, item, mapFoldingState) {
		super(root);
		this._day = item;
		this._elmRoot = super.render(DayBarTemplate({
			item,
		}), `#cyt_day_descriptor_${item}`);
		this.flag = mapFoldingState[item];
	}

	get subRoot() {
		return this._elmRoot;
	}

	addMap(map) {
		this.map = map;
		this._init();
	}

	_init() {
		document.querySelector(".cyt_daybar_del_btn").classList.add("first_daybar_invisible");
		Array.from(document.querySelectorAll(".cyt_day_bar"))
			.forEach(elm => elm.parentElement.classList.add("list_group_item"));
		document.querySelector(".cyt_day_bar").parentElement.classList.remove("list_group_item");
		this.btn = document.querySelector(`#cartItem_mapBtn_${this._day}`);
		if (this.flag) {
			this.map.setSize({width: 376, height: 0});
		} else {
			this.map.setSize({width: 376, height: 220});
		}
	}

	addListener({addMapFolding}) {
		this.btn.addEventListener("click", () => {
			if (this.flag) {
				this.map.setSize({width: 376, height: 220});
				setTimeout(() => {
					addMapFolding(this._day, false);
				}, 500);
			} else {
				this.map.setSize({width: 376, height: 0});
				setTimeout(() => {
					addMapFolding(this._day, true);
				}, 500);
			}
		});
	}
}

export default DayBar;
