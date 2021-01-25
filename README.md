# genmap2d.js
> Generation of 2D maps

## Install

```html
<script type="text/javascript" src="genmap2d.js"></script>
```
```sh
npm i genmap2d
```

## Usage

```js
var MAP = genmap({
  /* configuration */ 
});
```

## Configuration
| Param | Type | Default |
| --- | --- | --- |
| width | int | 800 |
| height | int | 600 |
| rarity | int | 100 |
| density | float | 0.45 |

## Example

```js
var SETTINGS = {
  width: 800,
  height: 600
};

// Generation of map
var MAP = genmap(SETTINGS); 

// Creating canvas
var field = document.getElementById('field').getContext('2d');

// Creating image
var imageData = field.createImageData(SETTINGS.width, SETTINGS.height);
var data = imageData.data;

// Filling image from map
for(var i = 0; i < SETTINGS.width; ++i) {
  for(var j = 0; j < SETTINGS.height; ++j) {
    var x = (j * SETTINGS.width + i) * 4;
    data[x + 0] = 0x00;
    data[x + 1] = 0x00;
    data[x + 2] = 0x00;
    // Set pixel transparency (0 or 255)
    data[x + 3] = MAP[i][j] * 255;
  }
}

// Drawing image
field.putImageData(imageData, 0, 0);
```

![](https://s8.hostingkartinok.com/uploads/images/2018/07/94bde7bec5aa70f13b22792bba915ffc.png)
