import PureComponent from "../../PureComponent";
import CourseTitleTemplate from "./CourseTitle.hbs";
import "./CourseTitle.css";
import {Dom} from "../../../utils";

/**
 * Course title Component
 */
class CourseTitle extends PureComponent {
	constructor(root, {courseName, region, lastDay}) {
		super(root);
		this._subInfo = {
			1: "하루",
			2: "1박2일",
			3: "2박3일",
			4: "3박4일",
			5: "4박5일",
		};
		this._render({
			courseName,
			region,
			subTitle: this._subInfo[lastDay],
			lastDay,
		});
		Dom.preventScroll(root);
	}

	_render({courseName, region, subTitle, lastDay}) {
		super.render(CourseTitleTemplate({
			courseName,
			region,
			subTitle,
		}));
	}
}

export default CourseTitle;
