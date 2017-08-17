import Spot from "./spot";

class Spots {
	/**
	 * @description
	 *  1. 데이터를 받아서 domain 객체에 mapping하는 역할.  
	 *  2. Spot 프로퍼티에 대한 getter제공  
	 * 
	 * @param {JSON[]} markerList: based data
	 */
	constructor(markerList) {
		this._markerList = markerList;
		this._build();
	}

	get spots() {
		return this._spots;
	}

	get centerOfMarkers() {
		return this._spots[0].position;
	}

	/**
	 * @param {Number} idx 
	 */
	getSpot(idx) {
		return this._spots[idx];
	}

	/**
	 * @param {Number} idx 
	 */
	getCoord(idx) {
		if (!this._spots[idx]) {
			return undefined;
		}
		return this._spots[idx].coord;
	}

	/**
	 * @param {Number} idx 
	 */
	getName(idx) {
		if (!this._spots[idx]) {
			return undefined;
		}
		return this._spots[idx].name;
	}

	/**
	 * @param {Number} idx 
	 * @return {naver.maps.Maps.Latlng} position
	 */
	getPosition(idx) {
		if (!this._spots[idx]) {
			return undefined;
		}
		return this._spots[idx].position;
	}

	_build() {
		this._spots = this._markerList
			.map(spotInfo => new Spot(spotInfo));
	}
}

export default Spots;
