import PureComponent from "../../PureComponent";
import TripModuleMainTemplate from "./TripModuleMain.hbs";
import "./TripModuleMain.css";

/**
 * This PureComponent is a TripModuleMain PureComponent for entry page.
 */
class TripModuleMain extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root) {
		super(root);
		this._elmRoot = super.render(TripModuleMainTemplate(), "#cyt_trip_module_list");
	}

	get subRoot() {
		return this._elmRoot;
	}

	attachEvent(id, itemsByDay, DEVICE_WIDTH = 300) {
		itemsByDay
			.filter(({items}) => items.length > 2)
			.forEach(({day, items}) => {
				this._applyCoord(id, items.length, day, DEVICE_WIDTH);
			});
	}

	_applyCoord(id, count, day, width) {
		const movableArea = document.querySelector(`#module_${id}_${day}`);
		const MIN_RANGE = count * 90 * (-1) - 90 + width;

		this.coord = new eg.MovableCoord({
			min: [MIN_RANGE, 0],
			max: [0, 0],
		}).on({
			"change": ({pos}) => {
				movableArea.style.transform = `translateX(${pos[0]}px)`;
			},
		});
		this.coord.bind(`#module_${id}_${day}`, {
			scale: [0.4, 0],
			direction: eg.MovableCoord.DIRECTION_HORIZONTAL,
		});
		this.coord.setTo(0, 0);
	}
}

export default TripModuleMain;
