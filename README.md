# Mappa
Генератор 2D карты

**Использование**

```js
var MAP2D = Mappa({
  SIZE_X: 800,
  SIZE_Y: 600,
  RARENESS: 100,
  DENSITY: 0.45
});
```

**Пример**

```js
var SETTINGS = {
  SIZE_X: 800, // Ширина карты
  SIZE_Y: 600, // Высота карты
  RARENESS: 100, // Масштаб зон
  DENSITY: 0.45 // Плотность
};

// Генерация двумерного массива карты
var MAP2D = Mappa(SETTINGS); 

// Создание Canvas
var field = document.getElementById('field').getContext('2d');

// Создание изображения
var imageData = field.createImageData(SETTINGS.SIZE_X, SETTINGS.SIZE_Y);
var data = imageData.data;

// Заполнение изображения
for(var i = 0; i < SETTINGS.SIZE_X; ++i) {
  for(var j = 0; j < SETTINGS.SIZE_Y; ++j) {
    var x = (j * SETTINGS.SIZE_X + i) * 4;
    data[x + 0] = 0x00;
    data[x + 1] = 0x00;
    data[x + 2] = 0x00;
    // Установка прозрачности пикселя (0 или 255)
    data[x + 3] = MAP2D[i][j] * 255;
  }
}

// Отображение изображения
field.putImageData(imageData, 0, 0);
```

![](https://s8.hostingkartinok.com/uploads/images/2018/07/94bde7bec5aa70f13b22792bba915ffc.png)
