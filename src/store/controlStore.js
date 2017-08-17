import Store from "./Store";
import * as dispatchers from "../dispatchers";

/**
 * Control page store class
 */
class ControlStore extends Store {
	/**
	 * @param {appState} state 
	 */
	constructor(state) {
		super(state);
		super.attachActions(({action}) => dispatchers.ControlDispatchers(this.state, action));
	}
}

export default ControlStore;
