const Collections = {
	/**
	 * @param {Number} num
	 */
	newArray: num => {
		const arr = [];

		for (let i = 1; i <= num; ++i) {
			arr.push(i);
		}
		return arr;
	},
	/**
	 * @param {Array|Map|Set} collection
	 */
	isEmpty: collection => {
		if (collection === null || collection === undefined || collection.length === 0) {
			return true;
		}
		return false;
	},
};

export default Collections;
