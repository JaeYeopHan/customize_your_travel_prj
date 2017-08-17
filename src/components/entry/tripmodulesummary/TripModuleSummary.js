import PureComponent from "../../PureComponent";
import TripModuleSummaryTemplate from "./TripModuleSummary.hbs";
import "./TripModuleSummary.css";
/**
 * This PureComponent is a TripModuleSummary PureComponent for entry page.
 */
class TripModuleSummary extends PureComponent {
	/**
	 * @param {HTMLElement} root This parameter specifies the root PureComponent to render the PureComponent.
	 * @param {Number} index This parameter specifies index number of page.
	 */
	constructor(root, {
		id,
		courseName,
		region,
		lastDay,
		hashtags,
		countOfSpots,
	}) {
		super(root);
		this._subInfo = {
			1: "하루",
			2: "1박2일",
			3: "2박3일",
			4: "3박4일",
			5: "4박5일",
		};
		const tags = hashtags.map(tag => ({tag}));

		this._elmRoot = super.render(TripModuleSummaryTemplate({
			id,
			courseName,
			region,
			subTitle: this._subInfo[lastDay],
			tags,
			lastDay,
			countOfSpots,
		}), `#module_num_${id}`);
		this.summaryElm = document.querySelector(`#cyt_trip_module_detail_btn_${id}`);
	}

	get subRoot() {
		return this._elmRoot;
	}

	addListener({moveToDetail}) {
		this.summaryElm.addEventListener("click", ({target}) => moveToDetail());
		return this;
	}
}

export default TripModuleSummary;
