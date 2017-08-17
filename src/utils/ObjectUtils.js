const ObjectUtils = {
	/**
	 * @param {Object} obj
	 */
	copyAt: obj => (
		Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)
	),
	/**
	 * @param {Object} obj
	 */
	isEmpty: obj => {
		if (obj === {} || obj === undefined || obj === null) {
			return true;
		}
		return false;
	},
};

export default ObjectUtils;
