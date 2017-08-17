import PureComponent from "../../PureComponent";
import CourseItemTemplate from "./CourseItem.hbs";
import "./CourseItem.css";

/**
 * Item component for rendering in course list
 */
class CourseItem extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 * @param {Object} spot Information about spot to render
	 */
	constructor(
		root,
		{
			id,
			name,
			detailType,
			description,
			countOfReview,
			hashtags,
			thumnail,
			link,
		}) {
		super(root);
		const tags = hashtags.map(tag => ({tag}));

		super.render(CourseItemTemplate({
			id,
			name,
			detailType,
			description,
			countOfReview,
			tags,
			thumnail,
			link,
		}));
	}
}

export default CourseItem;
