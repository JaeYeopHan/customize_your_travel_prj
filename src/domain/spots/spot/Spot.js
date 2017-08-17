class Spot {
	/**
	 * @description
	 * 1. 데이터에 mapping되는 domain 객체  
	 * 2. 프로퍼티에 대한 getter 제공  
	 * 
	 * @param {Number} id
	 * @param {Array} coordinates
	 * @param {String} name
	 * @param {String} type
	 * @param {String} detailType
	 * @param {Number} order: id
	 */
	constructor({
		id,
		coordinates,
		name,
		type,
		detailType,
		description,
		countOfReview,
		hashtags,
		thumnail,
		link,
		image,
	}) {
		this._id = id;
		this._coordinates = coordinates;
		this._name = name;
		this._type = type;
		this._detailType = detailType;
		this._description = description;
		this._countOfReview = countOfReview;
		this._hashtags = hashtags;
		this._thumnail = thumnail;
		this._link = link;
		this._image = image;
	}

	get id() {
		return this._id;
	}

	get coord() {
		return this._coordinates;
	}

	get name() {
		return this._name;
	}

	get type() {
		return this._type;
	}

	get detailType() {
		return this._detailType;
	}

	get description() {
		return this._description;
	}

	get countOfReview() {
		return this._countOfReview;
	}

	get hashtags() {
		return this._hashtags;
	}

	get thumnail() {
		return this._thumnail;
	}

	get link() {
		return this._link;
	}

	get image() {
		return this._image;
	}

	get position() {
		return new naver.maps.LatLng(this._coordinates[0], this._coordinates[1]);
	}
}

export default Spot;
