import page from "page";
import {firebaseConfig} from "./config.json";
import {spots} from "../../spot_db.json";
import Spots from "../domain/spots";
import State from "../store/appState";
import {AppStore} from "../store";
import {
	IntroContainer,
	MainContainer,
	ControlContainer,
	FinishContainer,
	EntryContainer,
	DetailViewContainer,
} from "../container";
import * as action from "../actions";

import "../assets/css/normalize.css";
import "../assets/css/index.css";

/**
 * Manage each page class and load data
 */
class AppManager {
	constructor() {
		this._init();
	}

	/**
	 * @private
	 */
	_init() {
		firebase.initializeApp(firebaseConfig);
		this.state = new State(new Spots(spots)).state;
		this.store = new AppStore(this.state);
		this._routeBuild();
		this.store.on("action_trigger", AppManager._render);
		this.store.dispatch(action.render());
	}

	/**
	 * @private
	 */
	static _render({state}) {
		const {index, activeModuleId} = state;
		const path = location.hash;
		const modulePath = [...path].splice(1).join("");

		switch (index) {
			case 0: {
				if (location.pathname !== "/") {
					return page.redirect(location.pathname);
				}
				if (modulePath) {
					return page.redirect(modulePath);
				}
				return page("/");
			}
			case 1:
				return page("/intro");
			case 2:
				return page("/main");
			case 3:
				return page("/control");
			case 4:
				return page("/finish");
			case 99:
				return page(`/modules/${activeModuleId}`);
			default:
				return null;
		}
	}

	/**
	 * @description Method for building route
	 * @private
	 */
	_routeBuild() {
		page("/", () => new EntryContainer(this.store, this.state));
		page("/intro", () => new IntroContainer(this.store, this.state));
		page("/main", () => new MainContainer(this.store, this.state));
		page("/control", () => new ControlContainer(this.store, this.state));
		page("/finish", () => new FinishContainer(this.store, this.state));
		page("/modules/:activeModuleId", (ctx, next) => {
			this.here = new DetailViewContainer(this.store, this.state, ctx.params.activeModuleId);
		});
		page("*", () => page.redirect("/"));
	}
}

export default AppManager;
