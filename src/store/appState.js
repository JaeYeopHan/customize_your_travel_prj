/**
 * Save Application status
 */
class State {
	/**
	 * @param {Spots} spots 
	 */
	constructor(spots) {
		this._spots = spots;
		this._state = {
			// Page indexing
			index: 0,

			// core data
			spots: this.spots.spots,

			// Intro page information
			courseName: "기분 전환 코스",
			region: "제주",

			// Main page default center of map
			center: spots.centerOfMarkers,

			// Main page current target id
			curId: 0,

			// Main page current filter type
			filterType: 0,

			// {Array} Cart info
			cart: [],

			// Current status about day
			lastDay: 1,

			// Order of cart item
			curOrder: 0,

			// Current folding in control page
			mapFoldingState: {
				1: true,
				2: true,
				3: true,
				4: true,
				5: true,
			},

			// id for slide show
			slideId: 0,

			// Active module id
			activeModuleId: 0,
		};
	}

	get state() {
		return this._state;
	}

	get spots() {
		return this._spots;
	}
}

export default State;
