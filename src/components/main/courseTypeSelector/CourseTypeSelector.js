import PureComponent from "../../PureComponent";
import CourseTypeSelectorTemplate from "./CourseTypeSelector.hbs";
import "./CourseTypeSelector.css";

/**
 * Button component for filtering cart list to spot's type
 */
class CourseTypeSelector extends PureComponent {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 */
	constructor(root, filterType) {
		super(root);
		const nameOfType = {
			0: "all",
			1: "place",
			2: "food",
			3: "shopping",
		}[filterType];

		const selectedType = {
			"all": false,
			"place": false,
			"food": false,
			"shopping": false,
		};

		selectedType[nameOfType] = true;
		super.render(CourseTypeSelectorTemplate(selectedType));
	}
}

export default CourseTypeSelector;
