import Store from "./Store";
import * as dispatchers from "../dispatchers";

/**
 * Main page store class
 */
class MainStore extends Store {
	/**
	 * @param {appState} state 
	 */
	constructor(state) {
		super(state);
		super.attachActions(({action}) => dispatchers.MainDispatchers(this.state, action));
	}
}

export default MainStore;
