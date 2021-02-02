/**
 * Generation of 2D maps
 *
 * @param {Object} [params] - Params of generation
 * @param {number} [params.width=800] - Length X of array
 * @param {number} [params.height=600] - Length Y of array
 * @param {number} [params.rarity=100] - Rarity of coverage
 * @param {number} [params.density=0.45] - Density of coverage
 *
 * @return {number[][]}
 */
module.exports = (params = {}) => {

	params = {
		width: 800,
		height: 600,
		rarity: 100,
		density: 0.45,
		...params,
	};

	const size = 256;
	const values = new Uint8Array(size * 2);
	for (let i = 0; i < size; i++) {
		values[i] = values[size + i] = 0 | (Math.random() * 255);
	}

	const map = [];
	for (let i = 0; i < params.width; i++) {
		map[i] = [];
		for (let j = 0; j < params.height; j++) {
			const w = utils.noise(values, i / params.rarity, j / params.rarity);
			const v = Math.max(0, Math.min(1, (1 + w) / 2));
			map[i][j] = Number(v >= params.density);
		}
	}

	return map;

};

/**
 * Math utils
 */
const utils = {
	lerp: (t, a, b) => (a + t * (b - a)),
	fade: (t) => (t * t * t * (t * (t * 6 - 15) + 10)),
	grad: (hash, x, y) => {
		const u = (hash & 2) === 0 ? x : -x;
		const v = (hash & 1) === 0 ? y : -y;
		return u + v;
	},
	noise: (values, x, y) => {
		const int = [(0 | x) & 0xff, (0 | y) & 0xff];
		const frac = [x - (0 | x), y - (0 | y)];
		const r = [values[int[0]] + int[1], values[int[0] + 1] + int[1]];
		const t = [utils.fade(frac[0]), utils.fade(frac[1])];
		const a = [utils.grad(values[r[0]], frac[0], frac[1]), utils.grad(values[r[0] + 1], frac[0], frac[1] - 1)];
		const b = [utils.grad(values[r[1]], frac[0] - 1, frac[1]), utils.grad(values[r[1] + 1], frac[0] - 1, frac[1] - 1)];
		return utils.lerp(t[1], utils.lerp(t[0], a[0], b[0]), utils.lerp(t[0], a[1], b[1]));
	},
};