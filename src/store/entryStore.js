import Store from "./Store";
import * as dispatchers from "../dispatchers";

/**
 * Entry page store class
 */
class EntryStore extends Store {
	/**
	 * @param {appState} state 
	 */
	constructor(state) {
		super(state);
		super.attachActions(({action}) => dispatchers.EntryDispatchers(this.state, action));
	}
}

export default EntryStore;
