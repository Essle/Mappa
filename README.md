## Generation of 2D maps
.
* ### Install

```sh
npm i genmap2d
```

* ### Configuration
| Parameter | Type | Default |
| --- | --- | --- |
| width | number | 800 |
| height | number | 600 |
| rarity | number | 100 |
| density | number | 0.45 |

* ### Usage

```js
const genmap2d = require('genmap2d');
const map = genmap2d({
  /* configuration */ 
});
```

* ### Example

```js
const CONFIG = {
  width: 800,
  height: 600
};

// Generation of map
const genmap2d = require('genmap2d');
const map = genmap2d(CONFIG); 

// Creating canvas
const field = document.getElementById('field').getContext('2d');

// Creating image
const imageData = field.createImageData(CONFIG.width, CONFIG.height);
const data = imageData.data;

// Filling image from map
for(let i = 0; i < CONFIG.width; ++i) {
  for(let j = 0; j < CONFIG.height; ++j) {
    const x = (j * CONFIG.width + i) * 4;
    for (let c = 0; c < 3; c++) {
        data[x + c] = 0;
    }
    // Set pixel transparency (0 or 255)
    data[x + 3] = map[i][j] * 255;
  }
}

// Drawing image
field.putImageData(imageData, 0, 0);
```

![](https://s8.hostingkartinok.com/uploads/images/2018/07/94bde7bec5aa70f13b22792bba915ffc.png)
