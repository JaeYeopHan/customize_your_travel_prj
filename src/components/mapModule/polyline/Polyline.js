import {Collections} from "../../../utils";
/**
 * Render Polyline after receiving data from Container
 */
class Polyline {
	/**
	 * @param {naver.maps.Map} map 
	 * @param {Number[]} coordinates Array of spot's coord property
	 */
	constructor(map, pathes, bridge = [], isSingle = false, day = -1) {
		this.map = map;
		this._defaultStyle = {
			strokeColor: "#28a1ff",
			strokeOpacity: 0.7,
			strokeWeight: 3,
			strokeStyle: "line",
			strokeLineCap: "round",
			strokeLineJoin: "round",
		};

		this._polyStyle = {
			999: "dash",
		};

		this._polyColor = {
			0: "#878585",
			1: "#28a1ff",
			2: "#918A3d",
			3: "#913D3D",
			4: "#579164",
			5: "#735E8F",
			999: "#3F4448",
		};

		if (isSingle) {
			this._singleRender(pathes, day);
		} else {
			this._render(pathes, bridge);
		}
	}

	/**
	 * @private
	 */
	_singleRender(path, day) {
		this._build(path, day);
	}

	/**
	 * @param {}
	 */
	reset() {
		this.polylines.map(polyline => polyline.setMap(null));
		this.bridge.map(polyline => polyline.setMap(null));
	}

	/**
	 * @private
	 */
	_render(pathes, bridge) {
		this.polylines = pathes.map((path, idx) => this._build(path, idx + 1));
		this.bridge = bridge.map(path => this._build(path, 999));
	}

	/**
	 * @private
	 */
	_build(path, day) {
		const {
			strokeColor,
			strokeOpacity,
			strokeWeight,
			strokeStyle,
			strokeLineCap,
			strokeLineJoin,
		} = {
			...this._defaultStyle,
			...{
				strokeColor: this._polyColor[day],
				strokeStyle: this._polyStyle[day],
			},
		};

		return new naver.maps.Polyline({
			map: this.map,
			path,
			strokeColor,
			strokeOpacity,
			strokeWeight,
			strokeStyle,
			strokeLineCap,
			strokeLineJoin,
		});
	}

	/**
	 * @private
	 */
	static _buildBridge(pathes) {
		const bridge = [];

		if (pathes.length < 2) {
			return undefined;
		}
		for (let i = 0; i < pathes.length - 1; ++i) {
			const path = [];
			const prev = pathes[i];
			const next = pathes[i + 1];

			if (!Collections.isEmpty(next)) {
				path.push(prev[prev.length - 1]);
				path.push(next[0]);
				bridge.push(path);
			}
		}
		return bridge;
	}
}

export default Polyline;
