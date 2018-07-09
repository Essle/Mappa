# Mappa
Генератор 2D карты

**Использование**

```
var MAP2D = Mappa({
  SIZE_X: 800,
  SIZE_Y: 600,
  RARENESS: 100,
  DENSITY: 0.45
});
```

**Пример**

```
var SETTINGS = {
  SIZE_X: 800,
  SIZE_Y: 600,
  RARENESS: 100,
  DENSITY: 0.45
};

var MAP2D = Mappa(SETTINGS);

var field = document.getElementById('field').getContext('2d');
var imageData = field.createImageData(SETTINGS.SIZE_X, SETTINGS.SIZE_Y);
var data = imageData.data;
for(var i = 0; i < SETTINGS.SIZE_X; ++i) {
  for(var j = 0; j < SETTINGS.SIZE_Y; ++j) {
    var x = (j * SETTINGS.SIZE_X + i) * 4;
    data[x + 0] = 0x00;
    data[x + 1] = 0x00;
    data[x + 2] = 0x00;
    data[x + 3] = MAP2D[i][j] * 255;
  }
}
field.putImageData(imageData, 0, 0);
```

![](https://s8.hostingkartinok.com/uploads/images/2018/07/94bde7bec5aa70f13b22792bba915ffc.png)
