# Configuration - Layout

## container

- Type: `String | HTML Element`
- Default: `''`

Mount PoPo container can be instantiated by HTML `id` or HTML Element object, attribute values in the Element object. If a null value is not mounted behind the initialization, call `addTo (container) 'method loaded into the container object.

## rows

- Type: `Number`
- Default: `12`

The total rows of the container is divided into the corresponding number of equal height, the height of each row is `100 / rows`% of the total height of container, and the minimum is 1 (100% height).

## cols

- Type: `Number`
- Default: `24`

The total cols of grids, the width of the container is divided into the corresponding number of equal, the width of each column is the total width of the container `100 / cols`%, the minimum value is 1 (100% width)

## width

- Type: `Number`
- Default: `0`

Container width. The unit is `px`, When the value is 0, the width of the mounted container is automatically obtained.

## height

- Type: `Number`
- Default: `0`

Container height. The unit is `px`, The height of the mount container is automatically obtained at 0.

## gutter

- Type: `Number`
- Default: `10`

Grid gutter. the unit is `px`. `gutter / 2` clearance will be left around the container

## layout

- Type: `String | Array | Object`
- Default: `null`

Container layout option, which is the key parameter of grid layout. Default is `null`, Do not create any layout.If you only need to build a line column layout, can be set to `whole`, the uniform layout is recommended to use the `Object` type free layout using `Array` type, no matter what kind of parameters, internal procedures are eventually converted into an array form is calculated.

> PoPo use a grid system layout is divided into two types: uniform layout and free layout, layout generation width and height different panels, uniform layout generation width consistent panel layout parameters are shown in the following table, layout design ideas in more detail please refer to [grid layout] (/en/layout.md).

<table>
    <tr>
        <td>Layout</td>
        <td>Type</td>
        <td>Note</td>
   </tr>
    <tr>
        <td>One Row One Col</td>
        <td>`String`</td>
        <td>Value：`'whole'`<br>Building a grid layout of one line and one column</td>
    </tr>
    <tr>
        <td>Uniform layout</td>
        <td>`Object`</td>
        <td><br>Value：`{rows,  cols,  width,  height}`<br>`rows`: Number of panels in vertical direction, `cols`: The number of panels in the horizontal direction, `height`: Panel Height,  `width`: Panel Width, They can default.<br><br>The layout is determined by the combination of the above four elements, and follows the following principles：<br><br>1. Panel Count = `rows * cols`.When `cols' or `rows' is not assigned, Automatically get the `cols` or `rows` values in the grid configuration automatically.<br><br>2. The layout calculation will rounding, to ensure the correct layout, `cols` should be the total grid column divided by the number of `rows` should be able to be divided by the total number of grid.<br><br>3. Panel width and height：<br>3.1 When width, height defaults, the width of each panel is `1/cols`% of the width of the container, and the height of the container is `1/rows`% of the height of the container<br><br>3.2 The height or width of the value in the `0 ~ 1` will convert `%`, units more than `1` is `px`. when the width of a unit for `%`, the final value for the percentage of height when the height of the panel, `%` units, the final value for the percentage of.`width` and `height` panel width not less than 1. at the same time.<br><br></td>
    </tr>
    <tr>
        <td>Free Layout</td>
        <td>`Array`</td>
        <td><br>Value：`[[row,  [col,  col...]],  ...]` or `[[col,  [row,  row...]],  ...]`<br><br>The above array is the core structure of free layout, following the following principles：<br><br>1. The first array `row` to occupy the grid line number, right adjacent to the array of `[col `row`, col]`... For the corresponding line of the grid column distribution. Similarly, in the second array `col` to occupy the grid columns, right adjacent raster data `col` for the distribution of the corresponding column.<br><br>2. The sum of the first `row` values of the sibling array cannot be greater than the `rows` value in the configuration.<br><br>3. Support second `col` nested, such as the array value replacement for `[col, [row, row...]]`, the final form of `[[row, [col, [col, [row, row...]]]...],...]`, when the left is `row`, right side array is `col`, when the left `col`, the right to an array `row`<br><br>4. The right array defaults to null, which is actually equal to the `rows` or `cols` in the configuration option, occupying a grid position.<br>For example: `[row]`=`[row, [cols]]`, `[col]`=`[col, [rows]]`<br><br>5. Panle count = The sum of the length of all right arrays in an array.<br><br></td>
    </tr>
</table>

> Example of uniform layout

```js
// Example 1: construct a layout of 32 panels with 4 rows and 8 columns, each panel occupying 1 / 8 width and 1 / 4 high mesh ratio
rows: 12,  cols: 24, 
layout: { row: 4,  col: 8}
...
// Example 2: construct a layout of 8 panels with 1 rows and 8 columns, each panel occupying 0.5 * row width width, 100% high mesh ratio
rows: 12,   cols: 8, 
layout: { row: 1,  width: 0.5 }
...
// Example 3: construct a layout of 24 panels with 6 rows and 4 columns, each panel occupying 4 / 24 width, 300px high mesh ratio
rows: 6,   cols: 24, 
layout: { col: 4,  height: 300 }
```

> Example of free layout

```js
// Example 1: construct a layout of 2 vertical grids.
// The first row occupies 24 / 24 width, and the 1/ 12 high mesh ratio.
// The second row occupies 24 / 24 width and 11 / 12 high mesh ratio.
rows: 12,  cols: 24,
layout: [[1],  [11]]
...
// Example 2: construct a first line, 4 grids, second lines, 2 grids, a total of 6 grid layouts.
// The first row occupies 6 / 24 width and 1 / 12 high mesh ratio per column.
// Second rows each column occupies 12 / 24 width and 11 / 12 high mesh ratio.
rows: 12,  cols: 24,
layout: [ [1, [6, 6, 6, 6]],  [11,  [12, 12]] ]
```

## layoutStartType

- Type: `String`
- Default: `'row'`
- Available value: `'row',  'col'`

* Free layout * start type, `'row'`: The first numeric type of the layout expression is row, `'col'`: The first numeric type of the layout expression is column.

## fontScale

- Type: `Number`
- Default: `1`

Font scale, The PoPo instance automatically adds a CSS style `fontSize` to the container created internally, which is `em`. And update the panel `Panel` options in units of `px`, such as `head`, `foot` and other.`fontScale` suitable for configuring different screen font size and content layout width and height.

## fullId

- Type: `Number | String`
- Default: `0`

Set a Panel as full screen state with the value of Panel `id` or `alias`.

## fullZIndex

- Type: `Number`
- Default: `0`

Set the zIndex value of full screen Panel, the default is `0`, will be at the bottom of all Panel, Panel creation, `zIndex` Default is `1`.

## scroll

- Type: `Object`
- Default: `{ x: false,  y: false }`

Set scroll bar and overflow container contents visible state, `x` horizontal direction, `y` vertical direction, set `false` prohibited, `true` open

!> When the `zoom` option is opened, the container `overflow: visible` will be set and the `scroll` configuration will fail

<table>
    <tr>
        <td>Item</td>
        <td>CSS</td>
        <td>Note</td>
    </tr>
    <tr>
        <td>`{x: false,  y: false}`</td>
        <td>`overflow: hidden`</td>
        <td>Do not display beyond the container part. Disable horizontal and vertical scroll bars</td>
    </tr>
    <tr>
        <td>`{x: true,  y: true}`</td>
        <td>`overflow: auto`</td>
        <td>Display the horizontal and vertical scroll bars beyond the display of the container part</td>
    </tr>
    <tr>
        <td>`{x: true,  y: false}`</td>
        <td>`overflowX: auto;`<br> `overflowY: hidden;`</td>
        <td>Beyond the container part, horizontal direction is displayed, horizontal scroll bar is opened, vertical direction is not displayed, and vertical direction scroll bar is prohibited.</td>
    </tr>
    <tr>
        <td>`{x: false,  y: true}`</td>
        <td>`overflowX: hidden;`<br>`overflowY: auto;`</td>
        <td>Beyond the container part, horizontal direction is not displayed, horizontal scroll bar is prohibited, vertical direction is displayed, vertical direction scroll bar is opened.</td>
    </tr>
</table>

## panel

- Type: `Object`
- Default: See below

[1]: https://en.wikipedia.org/wiki/Holy_Grail_(web_design)

Set the panel layout, including the initialization of the panel layout, default panel layout settings and custom panel layout. Open `enabel` options will be based on the options for the initial Panel content layout, content layout using Panel classic [Holy grail][1] layout structure, panel layout including `head`, left`, `right`, `foot`, `center`, five.

<table>
    <tr>
        <td colspan=4>Item</td>
        <td>Default</td>
        <td>Note</td>
    </tr>
    <tr>
        <td colspan=3>enable</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Panel layout switch, The default does not create a panel layout</td>
    </tr>
    <tr>
        <td rowspan=5>default</td>
        <td colspan=2>gutter</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>Gutter.The setting method is consistent with CSS `margin`.Setting sequence is "top right bottom left", The unit is `px`.</td>
    </tr>
    <tr>
        <td colspan=2>headHeight</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>The height of the head area, the percentage string accepted, the ratio of the height of the panel, the numerical unit is pixel.</td>
    </tr>
    <tr>
        <td colspan=2>footHeight</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>The height of the bottom area, the percentage string accepted, the ratio of the height of the panel, the numerical unit is pixel.</td>
    </tr>
    <tr>
        <td colspan=2>leftWidth</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>The width of the left area, the percentage string accepted, the ratio of the width of the panel, the numerical unit is pixel.</td>
    </tr>
    <tr>
        <td colspan=2>rightWidth</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>The width of the right area, the percentage string accepted, the ratio of the panel width, the numerical unit is pixel.</td>
    </tr>
    <tr>
        <td colspan=3>custom</td>
        <td>`Array<Object>`</td>
        <td>null</td>
        <td>Custom Panel, The structure is the same as `default`</td>
    </tr>
</table>

```js
panel: {
    enable: false,
    default: {
        headHeight: 0,  // {Number|String} Support pixels and percentages
        footHeight: 0,  // {Number|String} Support pixels and percentages
        leftWidth: 0,  // {Number|String} Support pixels and percentages
        rightWidth: 0,   // {Number|String} Support pixels and percentages
        zIndex: 1 //{Number} Panel zIndex
    }, 
    custom: [{ // Custom Panle
        panels: [],  //Panel ID or alias collection.
        headHeight: 0,  // {Number|String} Support pixels and percentages
        footHeight: 0,  // {Number|String} Support pixels and percentages
        leftWidth: 0,  // {Number|String} Support pixels and percentages
        rightWidth: 0,   // {Number|String} Support pixels and percentages
        zIndex: 1 //{Number} Panel zIndex
    }, ...]
}
```

## panelOverflow

- Type: `Object`
- Default: `{ visible: null,  overflowX: null,  overflowY: null,  overflow: null }`

Setting Overflow related attributes of Panel,  `visible`,`overflowX`,`overflowY` The parameter is Panel`id`or`id`collection, `'all'` for all Panel.

```js
panelOverflow: [{
    visible: [1,  2],   // Set Panel #1, #2 overflow is visible.
    overflowX: [3] // Set Panel #3 overflowX to'auto', if there is overflow, there will be horizontal scroll bar.
    overflowY: [4] // Set Panel #4 overflowY to'auto', and if there is an overflow, there will be a vertical scrollbar.
}]
```

## alias

- Type: `{Array<Object>}`
  - `{String} name` alias
  - `{Number} id` Panel id
- Default: `null`

Set the panel alias, when the display terminal data source or more need to fit a variety of sizes, alias is very convenient for the relationship management panel and the content, can also be used in the definition of attributes, such as component types.

```js
// example 1
alias:[
    { name: "caption",  id: 4 }, 
    { name: "chart1",  id: 1 }, 
    { name: "chart2",  id: 2 }, 
    { name: "chart3",  id: 3 }, 
    { name: "chart4",  id: 6 }, 
    { name: "chart5",  id: 7 }, 
    { name: "chart6",  id: 8 }, 
    { name: "chart7",  id: 9 }, 
    { name: "chinamap",  id: 5 }
]

// example 2
alias:[
    { name: "caption",  id: 4,  type: 'title'}, 
    { name: "chart1",  id: 1,  type: 'chart' }, 
    { name: "chart2",  id: 2,  type: 'chart' }, 
    { name: "chart3",  id: 3,  type: 'chart'  }, 
    { name: "chart4",  id: 6,  type: 'chart' }, 
    { name: "chart5",  id: 7,  type: 'chart' }, 
    { name: "chart6",  id: 8,  type: 'chart' }, 
    { name: "chart7",  id: 9,  type: 'chart' }, 
    { name: "chinamap",  id: 5 ,  type: 'map' }
]

```

## extends

- Type: `Array`
- Default: `null`

Add the extension panel, layout and extension panel can be used in combination, the parameter structure is as follows:

```js
extends: [{
    size: { // Set panel height and width
        width: 0,  // {Number} px
        height: 0,  // {Number} px
        responsive: true,  // Is it a response, if it is converted to percentage? Defaults is response.
    }, 
    position: {
        left: 0,  // Set the distance to the left of the container. px
        top: 0,  // Set the distance to the top of the container
        responsive: true,  // Is it a response, if it is converted to percentage? Defaults is response.
    }, 
    layout: {
        gutter:0,
        headHeight: 0,
        footHeight:0,
        leftWidth:0,
        rightWidth:0
    }, 
    zIndex: CT.PANEL_DEFAULT_ZINDEX,   // Default zIndex, 1
    id: '',  // Adding DOM ID value
    style: styleDefine // Style setting
}]
```

`style` definition and structure are detailed [styleDefine](/en/configuration/funcs#style).