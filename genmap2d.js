var genmap_util = {};
	
genmap_util.lerp = function (t, a, b) {
	return a + t * (b - a);
};

genmap_util.fade = function (t) {
	return t * t * t * (t * (t * 6 - 15) + 10);
};

genmap_util.grad = function (hash, x, y) {
	var u = (hash & 2) === 0 ? x : -x;
	var v = (hash & 1) === 0 ? y : -y;
	return u + v;
};

genmap_util.noise = function (values, x, y) {

	var intX = (0 | x) & 0xff,
		intY = (0 | y) & 0xff;
		fracX = x - (0 | x),
		fracY = y - (0 | y);
	var r1 = values[intX] + intY,
		r2 = values[intX + 1] + intY;
	var t1 = genmap_util.fade(fracX),
		t2 = genmap_util.fade(fracY),
		a1 = genmap_util.grad(values[r1], fracX, fracY),
		a2 = genmap_util.grad(values[r1 + 1], fracX, fracY - 1),
		b1 = genmap_util.grad(values[r2], fracX - 1, fracY),
		b2 = genmap_util.grad(values[r2 + 1], fracX - 1, fracY - 1);

	return genmap_util.lerp(t2, genmap_util.lerp(t1, a1, b1), genmap_util.lerp(t1, a2, b2));

};

var genmap = function (params) {

	params = params || {};
	params.rarity = params.rarity || 100;
	params.density = params.density || 0.45;
	params.width = params.width || 800;
	params.height = params.height || 600;

	var size = 0xff + 1;
	var values = new Uint8Array(size * 2);
	for (var i = 0; i < size; i++) {
		values[i] = values[size + i] = 0 | (Math.random() * 0xff);
	}

	var map2d = [];

	for (var i = 0; i < params.width; ++i) {
		map2d[i] = [];
		for (var j = 0; j < params.height; ++j) {
			map2d[i][j] = genmap_util.noise(values, i / params.rarity, j / params.rarity);
			map2d[i][j] = (Math.max(0, Math.min(1, (1 + map2d[i][j]) / 2)) < params.density ? 0 : 1);
		}
	}

	return map2d;

};

module.exports = genmap;