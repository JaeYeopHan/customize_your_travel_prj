/**
 * All store class's parent class
 */
class Store extends eg.Component {
	/**
	 * @param {appState} state 
	 */
	constructor(state) {
		super();
		this._state = state;
	}

	/**
	 * @param {ActionType} action 
	 * @description Modify the state as defined in the action and reflect it in the view.
	 */
	dispatch(action) {
		this.trigger("action_trigger", {
			state: this._state,
			action,
		});
	}

	/**
	 * @param {reducer} reducer 
	 * @description Change the state by performing the defined action.
	 */
	attachActions(reducer) {
		this.on("action_trigger", reducer);
	}

	// TODO Refactoring
	forcedUpdate(newState) {
		const newStateObj = {};

		Object.getOwnPropertyNames(newState).forEach(prop => {
			newStateObj[prop] = newState[prop];
		});
		Object.assign(this._state, newStateObj);
	}

	get state() {
		return this._state;
	}
}

export default Store;
