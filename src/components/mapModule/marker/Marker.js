import "./Marker.css";

/**
  * 1. naver.maps.Marker를 생성한다.  
  * 2. Marker에 동작을 정의한다.  
  * 3. 겹치는 마커에 대한 로직을 수행하여 겹치는 마커에 대한 배열을 계산한다.  
  */
class Marker {
	/**
	 * @param {naver.maps.Map} map
	 * @param {naver.maps.Latlag} position
	 * @param {Number} id spot's id
	 * @param {Number} day  
	 * @param {Number} curId curId in appState
	 */
	constructor(map, {position, id, day = 0}, curId = -1, order = 0) {
		this.map = map;
		this._position = position;
		this._id = id;
		this._defaultContent = `<div class="map_marker">
									<div class="ico_pin icon_type_${day} ${id === curId ? "icon_clicked" : ""}"></div>
								</div>`;
		this.marker = new naver.maps.Marker({
			position: this._position,
			map: this.map,
			id: this._id,
			order,
			icon: {
				content: this._defaultContent,
			},
			zIndex: id === curId ? "20000" : "",
		});
	}

	get id() {
		return this._id;
	}

	clicked() {
		this.marker.setAnimation(naver.maps.Animation.BOUNCE);
		setTimeout(() => this.marker.setAnimation(null), 2100);
	}

	/**
	 * @param {}
	 */
	reset() {
		this.marker.setMap(null);
	}

	/**
	 * @description Methods for injecting events into the component
	 * @param {appState} state State of app 
	 */
	addListener({changeCurrentId, changeSlideId}) {
		if (changeCurrentId) {
			naver.maps.Event.addListener(this.marker, "click", ({overlay}) => {
				changeCurrentId(overlay.id);
			});
		}

		if (changeSlideId) {
			naver.maps.Event.addListener(this.marker, "click", ({overlay}) => {
				changeSlideId(overlay.order);
			});
		}
		return this;
	}

	/**
	 * @param {Array<Marker>} markers 
	 */
	buildOverlapMarkers(markers) {
		return markers
			.filter(marker => this._intersect(marker._bounds()))
			.map(marker => ({
				"markerId": marker.id,
				"overlapMarker": marker,
			}));
	}

	/**
	 * @private
	 */
	_bounds() {
		return this.marker.getDrawingRect();
	}

	/**
	 * @private
	 */
	_intersect(bounds) {
		return this._bounds().intersect(bounds);
	}
}

export default Marker;
