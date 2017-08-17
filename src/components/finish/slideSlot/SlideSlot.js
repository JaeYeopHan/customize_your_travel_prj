import PureComponent from "../../PureComponent";
import SlideSlotTemplate from "./SlideSlot.hbs";
import "./SlideSlot.css";

/**
 * Item Component for rendering SlotList
 */
class SlideSlot extends PureComponent {
	constructor(root, {
		name,
		detailType,
		description,
		countOfReview,
		image,
		day,
	}) {
		super(root);
		super.render(SlideSlotTemplate({
			name,
			detailType,
			description,
			countOfReview,
			image,
			day,
		}));
	}
}

export default SlideSlot;
