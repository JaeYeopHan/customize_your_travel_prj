import Store from "./Store";
import * as dispatchers from "../dispatchers";

/**
 * AppManager store class
 */
class AppStore extends Store {
	constructor(state) {
		super(state);
		super.attachActions(({action}) => dispatchers.AppDispatchers(this.state, action));
	}

	get index() {
		return this.state.index;
	}

	get courseName() {
		return this.state.courseName;
	}

	get center() {
		return this.state.center;
	}

	get curActiveModuleId() {
		return this.state.activeModuleId;
	}
}

export default AppStore;
