# PoPo

> JS Layout library,  but not just layout Library

<div align=center>
<img src="https://shunok.github.io/popo/_media/popo.png" width=180 height=180>
</div>

## What's PoPo

PoPo is a two dimensional grid layout library, The rows and columns of the grid system are custom defined at runtime, no CSS dependence, supports any size screen, It is especially suitable for large screen and super large screen.PoPo adopts the double layout pattern of grid and panel, it encapsulates content independent layout code, You can quickly build any complex pages without writing any HTML or CSS code.

<div align="center">
    <img src="./docs/_images/ex1.gif" style="max-height:250px;"/>
    <img src="./docs/_images/ex2.gif" style="max-height:250px;"  />
    <img src="./docs/_images/ex3.gif" style="max-height:250px;" />
    <img src="./docs/_images/ex4.png" style="max-height:250px;" />
</div>

## Features

- Custom grid system,  no CSS dependence,  no third party library dependency,  no need to write HTML,  CSS code
- Grid system uniform and free layout && Universal panel layout && User defined layout patterns, Let layout be arbitrary.
- Scaling,  positioning,  auxiliary information,  grid auxiliary line,  sub screen (coordinate) auxiliary line,  panel auxiliary line debugging function,  so that the big screen application development debugging no longer bother
- Rapid construction of visualization applications
- Adaptive multi screen
- Rich configuration,  debugging options and API
- Compatible IE9+

## [Docs](https://shunok.github.io/popo)

## Examples

- [24 rows * 24 cols](https://shunok.github.io/popo-example/examples/grid_24_24.html)
- [24 rows * 48 cols](https://shunok.github.io/popo-example/examples/grid_24_48.html)
- [Free layout](https://shunok.github.io/popo-example/examples/layout_complex_2.html)
- [Uniform layout](https://shunok.github.io/popo-example/examples/layout_avg_1.html)
- [Grids In Circle](https://shunok.github.io/popo-example/examples/circle.html)
- [Scatter Diagram](https://shunok.github.io/popo-example/examples/scatter_diagram.html)
- [City, Click the sun into night mode and click the moon into day mode](https://shunok.github.io/popo-example/examples/city.html)
- [Progress Data Visualization For Big Screen And Mobile](https://shunok.github.io/popo-example/examples/dv_average.html)
- [Data Visualization For Multi Screen](https://shunok.github.io/popo-example/examples/bigscreen.html)

[More Examples...](https://github.com/shunok/popo-example/blob/master/README.md)

## Install

1. node.js

```js
// npm
npm install popojs  --save

// yarn
yarn add popojs
```

2. browser

```html
<srcript src="./js/popo.min.js"></script>
```

## Use

1. node.js

```js

var PoPo = require('popojs');

// es6
// import PoPo from 'popojs';

// Initialize PoPo Instance
var popoInstance = PoPo.init({
    rows: 12,
    cols: 24
});

...

// Render to container
popoInstance.addTo('container');

```

2. browser

```html
// body
...
<div id="container"></div>
...
<script>
PoPo.init({
    container: 'container',
    rows: 12,
    cols: 24
});
</script>

```
