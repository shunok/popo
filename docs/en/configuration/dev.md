# Configuration - Development

## dev.enable

- Type: `Boolean`
- Default: `false`

Development mode switch, default does not open.

## dev.showIds

- Type: `Array<Number>`
- Default: `null`

Only displays some specified panels and hides the rest of the panels.

## dev.panel

- Type: `Object`
- Default: See below

Panel information, including panel ID, width, height, location information, background style.

<table>
    <tr>
        <td>Item</td>
        <td>Type</td>
        <td>Default</td>
        <td>Note</td>
    </tr>
    <tr>
        <td>show</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Panel information switch</td>
    </tr>
    <tr>
        <td>id</td>
        <td>Boolean</td>
        <td>true</td>
        <td>Panel ID display switch</td>
    </tr>
    <tr>
        <td>size</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Panel width and height display switch</td>
    </tr>
    <tr>
        <td>position</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Panel position information display switch</td>
    </tr>
    <tr>
        <td>background</td>
        <td>String</td>
        <td>`''`</td>
        <td>Set the background style of the panel</td>
    </tr>
    <tr>
        <td>fontSize</td>
        <td>Number</td>
        <td>14</td>
        <td>Set font size for panel information</td>
    </tr>
    <tr>
        <td>fontColor</td>
        <td>String</td>
        <td>'#333333'</td>
        <td>Font color for setting panel information</td>
    </tr>
</table>

## dev.guideline

- Type: `Object`
- Default: See below

Grid auxiliary line.

<table>
    <tr>
        <td>Item</td>
        <td>Type</td>
        <td>Default</td>
        <td>Note</td>
    </tr>
    <tr>
        <td>show</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Grid auxiliary line display switch</td>
    </tr>
    <tr>
        <td>identifier</td>
        <td>Boolean</td>
        <td>true</td>
        <td>Grid mark display switch</td>
    </tr>
    <tr>
        <td>lineSize</td>
        <td>Number</td>
        <td>1</td>
        <td>Width of auxiliary line</td>
    </tr>
    <tr>
        <td>color</td>
        <td>String</td>
        <td>rgba(0, 0, 0, .25)</td>
        <td>Auxiliary line color</td>
    </tr>
    <tr>
        <td>zIndex</td>
        <td>Number</td>
        <td>0</td>
        <td>Auxiliary line zIndex</td>
    </tr>
    <tr>
        <td>fontSize</td>
        <td>Number</td>
        <td>14</td>
        <td>Font size for Auxiliary identification</td>
    </tr>
    <tr>
        <td>fontColor</td>
        <td>String</td>
        <td>'#333333'</td>
        <td>Font color for setting grid logo</td>
    </tr>
</table>

## dev.panelGuideline

- Type: `Object`
- Default: See below

Panel grid auxiliary line.

<table>
    <tr>
        <td>Item</td>
        <td>Type</td>
        <td>Default</td>
        <td>Note</td>
    </tr>
    <tr>
        <td>show</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Panel grid auxiliary line display switch</td>
    </tr>
    <tr>
        <td>ids</td>
        <td>Array</td>
        <td>null</td>
        <td>Panel ID collection that needs to display raster lines</td>
    </tr>
    <tr>
        <td>lineSize</td>
        <td>Number</td>
        <td>1</td>
        <td>Auxiliary line width</td>
    </tr>
    <tr>
        <td>color</td>
        <td>String</td>
        <td>rgba(0, 0, 0, .25)</td>
        <td>Auxiliary line color</td>
    </tr>
    <tr>
        <td>zIndex</td>
        <td>Number</td>
        <td>0</td>
        <td>Auxiliary line zIndex</td>
    </tr>
    <tr>
        <td>size</td>
        <td>Number</td>
        <td>15</td>
        <td>The size of the unit grid</td>
    </tr>
</table>

## dev.splitline

- Type: `Object`
- Default: See below

Separation auxiliary line.

<table>
    <tr>
        <td>Item</td>
        <td>Type</td>
        <td>Default</td>
        <td>Note</td>
    </tr>
    <tr>
        <td>show</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Split auxiliary line display switch</td>
    </tr>
    <tr>
        <td>width</td>
        <td>Number</td>
        <td>100</td>
        <td>Split cell width</td>
    </tr>
    <tr>
        <td>height</td>
        <td>Number</td>
        <td>100</td>
        <td>Split cell height</td>
    </tr>
    <tr>
        <td>identifier</td>
        <td>Boolean</td>
        <td>true</td>
        <td>Split unit identification display switch</td>
    </tr>
    <tr>
        <td>lineSize</td>
        <td>Number</td>
        <td>1</td>
        <td>Auxiliary line width</td>
    </tr>
    <tr>
        <td>color</td>
        <td>String</td>
        <td>#000</td>
        <td>Auxiliary line color</td>
    </tr>
    <tr>
        <td>zIndex</td>
        <td>Number</td>
        <td>0</td>
        <td>Auxiliary line zIndex</td>
    </tr>
    <tr>
        <td>fontSize</td>
        <td>Number</td>
        <td>12</td>
        <td>Font size for grid identification</td>
    </tr>
    <tr>
        <td>fontColor</td>
        <td>String</td>
        <td>'#333333'</td>
        <td>Font color for setting grid logo</td>
    </tr>
</table>

> Development configuration default options.

```js

dev: {

    enable: false,

    panel: {
        enable: true,
        id: true,
        size: false,
        position: false,
        background: '',
        fontSize: 14, // px
        fontColor: '#333',
    },

    guideline: {
        show: false,
        identifier: true,
        lineSize: 1,   // px
        color: 'rgba(0, 0, 0, .25)',
        zIndex: 0,
        fontSize: 14,  // px
        fontColor: '#333',
    },

    panelGuideline: {
        show: false,
        ids: [],
        lineSize: 0.5,  // px
        size: 15,  // px
        zIndex: 0,
        color: '#888',
    },

    splitline: {
        show: false,
        lineSize: 1,  // px
        width: 100,  // px
        height: 100,  // px
        color: '#000',
        zIndex: 0,
        identifier: true,
        fontColor: '#333333',
        fontSize: 12,  // px
    },

    showIds: [],
}
```