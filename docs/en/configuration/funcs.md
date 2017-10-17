# Configuration - Functions and Style

## style

- Type: `Object`
- Default: `null`

Add styles for containers and Panel, the structure is as follows:

```js
style: {
    container: styleDefine,
    default: {
        panel: styleDefine, 
        head: styleDefine, 
        center: styleDefine, 
        foot: styleDefine, 
        left: styleDefine, 
        right: styleDefine
    }, 
    custom: [{
        panels: [], 
        panel: styleDefine, 
        head: styleDefine, 
        center: styleDefine, 
        foot: styleDefine, 
        left: styleDefine, 
        right: styleDefine
    }]
}
```
`tyleDefine` receives three types of parameters, the structure is as follows:

```
// Class and CSS hybrid settings
styleDefine = {
    classname: 'classname',
    css: {
        cssName: cssValue,
        ...
    }
};

// Setting class
styleDefine = 'classname';

// Setting CSS
styleDefine = {
    cssName: cssValue,
    ...
};

```

## drag

- Type: `Boolean`
- Default: `false`

Whether to open the container drag and drop function, please note that the container is drag rather than panel drag when the content size exceeds the size of the container can be opened `drag`, change the view position, it is based on the realization of the `scroll` attribute, if you open the `zoom` option, the default `drag` automatically open.

## zoom

- Type: `Object`
- Default: `{enable: false,  control: true,  position: 'rightTop',  scale: 1,  ratio: 0.1,  min: 0.1,  max: 1,  wheelZoom: true }, `
Zoom options. When the width and height of the definition are greater than the size of the container itself, zoom function can be used to display the full screen state

<table>
    <tr>
        <td>Item</td>
        <td>Type</td>
        <td>Default</td>
        <td>Note</td>
    </tr>
    <tr>
        <td>enable</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Open the zoom function, the default does not open</td>
    </tr>
    <tr>
        <td>control</td>
        <td>Boolean</td>
        <td>true</td>
        <td>Whether to display zoom controls, the default display, zoom function after opening effective</td>
    </tr>
    <tr>
        <td>position</td>
        <td>String</td>
        <td>rightTop</td>
        <td>Zoom controls display position, values `rightTop`, `rightBottom`, `leftTop`, `leftBottom`, the default display, zoom function is valid after opening, default placed in the upper right corner</td>
    </tr>
    <tr>
        <td>scale</td>
        <td>Number</td>
        <td>1</td>
        <td>Default scaling</td>
    </tr>
    <tr>
        <td>ratio</td>
        <td>Number</td>
        <td>0.1</td>
        <td>Zoom coefficients, scaling 0.1 units at a time</td>
    </tr>
    <tr>
        <td>min</td>
        <td>Number</td>
        <td>0.1</td>
        <td>Minimum zoom ratio</td>
    </tr>
    <tr>
        <td>max</td>
        <td>Number</td>
        <td>1</td>
        <td>Maximum zoom ratio</td>
    </tr>
    <tr>
        <td>wheelZoom</td>
        <td>Boolean</td>
        <td>true</td>
        <td>Open the mouse wheel, open by default</td>
    </tr>
</table>

## focus

- Type: `Object`
- Default: `{ id: 0,  offsetX: 0,  offsetY: 0 }`

Focusing on a Panel, the focus coordinates are the upper left corner of the container: `{x: 0 + offsetX,  y: 0 + offsetY}`

<table>
    <tr>
        <td>Item</td>
        <td>Type</td>
        <td>Default</td>
        <td>Note</td>
    </tr>
    <tr>
        <td>id</td>
        <td>Number | String</td>
        <td>0</td>
        <td>Panel id or alias</td>
    </tr>
    <tr>
        <td>offsetX</td>
        <td>Number</td>
        <td>0</td>
        <td>Deviation value of horizontal X coordinate</td>
    </tr>
    <tr>
        <td>offsetY</td>
        <td>Number</td>
        <td>0</td>
        <td>Deviation value of Y coordinate in vertical direction</td>
    </tr>
</table>

## lineHeight

- Type: 'Object | Array'
- Default: `null`

The row height of the set area is equal to the height of the region itself. It is very useful for the vertical center of the single column, such as the title content. When the rows are set in different areas, the array form can be used.

<table>
    <tr>
        <td>Item</td>
        <td>Type</td>
        <td>Default</td>
        <td>Note</td>
    </tr>
    <tr>
        <td>panels</td>
        <td>Number | String | Array</td>
        <td>null</td>
        <td>Panel id or alias, or their Array collection</td>
    </tr>
    <tr>
        <td>type</td>
        <td>String</td>
        <td>Panel</td>
        <td>Area type</td>
    </tr>
</table>

```js
// Set the header area line height of all Panel
lineHeight: {
    panels: 'all',
    type: 'head'
}

// Set the header area line height of Panel with ID 2
lineHeight: {
    panels: 2,
    type: 'head'
}

// Set the head area line height of the Panel with the id of [2, 3, 4], set the bottom area line height of the Panel with the id of [4, 5, 6].
lineHeight: [{
    panels: [2, 3, 4],
    type: 'head'
},  {
    panels: [4, 5, 6],
    type: 'foot'
}]
```

## hideIds

- Type: `Array`
- Default: `null`

Set the hidden Panel to hide the parts that don't need rendering and fit the hidden areas with the `hideType`.

## hideType

- Type: `String`
- Default: `panel`

Hidden area type, default `panel`, Optional value are `panel`,`wrap`,`head`,`left`,`right`,`foot`,`center`.

## trackResize

- Type: `Boolean`
- Default: `true`

Follow the window changes, resize, open by default.

## updateInterval

- Type: `Number`
- Default: `200`

Window change response time, the unit is `ms`.

## renderDelay

- Type: `Number`
- Default: `0`

Rendering delay, unit `ms`, waiting for the specified time to render the content, especially for the application of a longer initialization time, loading welcome screen or loading progress UI scene.
