import Store from "./Store";
import * as dispatchers from "../dispatchers";

/**
 * Intro page store class
 */
class IntroStore extends Store {
	/**
	 * @param {appState} state 
	 */
	constructor(state) {
		super(state);
		super.attachActions(({action}) => dispatchers.IntroDispatchers(this.state, action));
	}
}

export default IntroStore;
