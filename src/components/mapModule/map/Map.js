/**
 * Component for render map from naver.maps API
 */
class Map {
	/**
	 * @param {HTMLElement} root The root element for which the component will be rendered.
	 * @param {naver.maps.LatLng} Initial position
	 */
	constructor(root, center, {zoom = 5, width, height}, isDraggable = true) {
		this._map = new naver.maps.Map(root, {
			"zoom": zoom,
			"draggable": isDraggable,
			"pinchZoom": true,
			"scrollWheel": true,
			"keyboardShortcuts": true,
			"disableDoubleTapZoom": false,
			"disableDoubleClickZoom": false,
			"disableTwoFingerTapZoom": false,
		});
		this._map.setCenter(center);
	}

	get zoom() {
		return this._map.getZoom();
	}

	get center() {
		return this._map.getCenter();
	}

	get map() {
		return this._map;
	}

	setCenter(path) {
		if (path.length === 0) {
			return;
		}
		const pos = [0, 1].map(val => path
			.map(position => position[val])
			.reduce((prev, next) => prev + next))
			.map(sum => sum / path.length);

		this._map.setCenter(new naver.maps.LatLng(pos[0], pos[1]));
	}

	setSize({width, height}) {
		this._map.setSize({width, height});
	}

	/**
	 * @param {Number} val
	 */
	setZoom(val) {
		this._map.setZoom(val, true);
	}

	/**
	 * @param {naver.maps.LatLng} pos 
	 */
	panTo({state}) {
		const {spots, curId} = state;

		if (spots[curId]) {
			this._map.panTo(spots[curId].position, {duration: 100, easing: "linear"});
		}
	}

	panToFinish({state}) {
		const {cart, slideId} = state;

		if (typeof slideId === "number") {
			const target = cart.find(({order}) => order === slideId);

			if (target) {
				this._map.panTo(target.item.position, {duration: 100, easing: "linear"});
			}
		}
	}

	panToDetail({state}) {
		const {cart, slideId} = state;

		if (typeof slideId === "number") {
			const target = cart.items.find((item, order) => order === slideId);

			if (target) {
				this._map.panTo(target.position);
			}
		}
	}
}

export default Map;
