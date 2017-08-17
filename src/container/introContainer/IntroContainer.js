import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Container from "../Container";
import {Intro} from "../../components";
import {IntroStore} from "../../store";
import * as action from "../../actions";

/**
 *  Intro page Container
 */
class IntroContainer extends Container {
	/**
	 * @param {appStore} store appStore AppManager's store class
	 * @param {appState} state Mangae state class
	 */
	constructor(appStore, state) {
		super();
		this._appStore = appStore;
		this._store = new IntroStore(state);
		this._index = 1;

		this._appStore.forcedUpdate({index: this._index});
		this._render();
		this._attachEvent();
	}

	/**
	 * @private
	 */
	_render() {
		this.intro = new Intro(this._root);
	}

	/**
	 * @private 
	 */
	_attachEvent() {
		this.intro.addListener({
			nextPage: () => this._appStore.dispatch(action.nextPage()),
			createCourseName: name => this._store.dispatch(action.createCourseName(name)),
			saveRegion: region => this._store.dispatch(action.saveRegion(region)),
			moveToEntry: () => this._appStore.dispatch(action.moveToEntry()),
			sAlert: IntroContainer._applyAlert,
		});
	}

	static _applyAlert() {
		return swal(
			"코스 이름이 너무 깁니다.",
			"15글자 미만으로 해주세요.",
			"warning",
		);
	}
}

export default IntroContainer;
