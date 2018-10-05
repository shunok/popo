# PoPo Instance Method - Interactive

## addTo

- `addTo(container,  delay)`

- Parameter:
  - `{String|HTMLElement} container` Panel HTMLElement, Panel ID or alias
  - `{ Number } delay` delay, `ms`
- Return: `{ Object }` PoPo instance

Add a PoPo instance to a specified container.

```js
P.init(options).addTo('container');
```

## update

- `update(options)`
- Parameter:
  - `{Array | Object} options` update options. see below.
- Return: `{Object}` PoPo instance.

Refresh the layout or update the specified panel according to the options, If `option` defaults, the layout is refreshed, `options` can be an array of objects or objects, and the object structure is as follows:

- `{ String|Number|HTMLElement|Array } panels` Panel HTMLElement ,Panel ID or alias, Supports single and array sets.
- `{ Number } width` Panel width, `px`
- `{ Number } height` Panel height, `px`
- `{ Number } zIndex` Panel zIndex
- `{ Number } left` The distance between the panel and the left of the container, `px`
- `{ Number } top` The distance between the panel and the top of the container, `px`

```js
const popo = P.init(popoOptions).addTo('container');

// Update PoPo
popo.update();

// Update the specified panel (object)
popo.update({
    panels: [1, 2], 
    width: 500, 
    height: 200, 
    zIndex: 100, 
    left: 100, 
    top: 50
})

// Batch update the specified panel (array)
popo.update([{
    panels: [1, 2], 
    width: 500, 
    height: 200, 
    zIndex: 100, 
    left: 100, 
    top: 50
}, {
    panels: [3, 4], 
    width: 300, 
    height: 100, 
    zIndex: 98, 
    left: 50, 
    top: 50
}])
```

## remove

- `remove(target,  clearTpl)`
- Parameter:
  - `{ String|Number|HTMLElement|Array } target` Panel HTMLElement ,Panel ID or alias, Supports single and array sets.
  - `{ Boolean } clearTpl ` Do you want to remove the template contents loaded in the panel?
- Return: `{ Object }` PoPo instance

Deleting the specified panel or removing the entire PoPo instance, deleting the panel or removing the instance will no longer be useful for deleting the object

!> If the content created by the template in the panel, the default will be restored to the template location and not visible, and the template content will not be deleted

```js
var popo = P.init(popoOptions);

// Remove the entire PoPo instance
popo.remove();

// Remove the specified panel, but does not delete the template content
popo.remove([1, 2, 3])

// Remove the specified panel, and will delete the template content.
popo.remove([1, 2, 3],  true);

```

## restore

- `restore(options)`
- Parameter:
  - `{Object|Array<Object>} options` restore option.
- Return: `{ Object }` PoPo instance

Restore the layout or restore the layout of the specified panel according to the options, If `option` defaults to refresh the layout, `options` can be an array of objects or objects, and the object structure is as follows:
panels,  size = false,  position = false,  zIndex = false

- `{ String|Number|HTMLElement|Array } panels` Panel HTMLElement ,Panel ID or alias, Supports single and array sets.
- `{ Boolean } size` Whether to restore the width and height of the panel, the default is `true`
- `{ Boolean } position` Whether to restore the position of the panel, the default is `true`
- `{ Boolean } zIndex` Whether to restore the zIndex of the panel, the default is `true`

```js
const popo = P.init(popoOptions).addTo('container');

// Restore all panel position and size.
popo.restore();

// Restore the specified panel layout (object)
popo.restore({
    panels: [1, 2], 
    size: false, 
    position: true, 
    zIndex: false, 
})

// Batch restores the specified panel layout (array)
popo.restore([{
    panels: [1, 2], 
    size: false, 
    position: true, 
    zIndex: false, 
}, {
    panels: [3, 4], 
    size: true, 
    position: true, 
    zIndex: true, 
}]);
```

## setStyle

- `setStyle(style)`
- Parameter:
  - `{ Object } style` Style options, structure with configuration [`style`](/en/style.md)
- Return: `{ Object }` PoPo instance

Reset theme style

```js
const popo = P.init(popoOptions).addTo('container');

popo.setStyle({
    classname: 'popo-theme', 
    custom: [
        {
            panels: [1, 2, 3], 
            panel: {
              classanme: 'popo-panel-new', 
              style: {
                  borderColor: '1px solid red', 
              }
            }
        }
    ], 
});
```

## updateStyle

- `updateStyle(style)`
- Parameter:
  - `{ Object } style` Style options, structure with configuration [`style`](/en/style.md)
- Return: `{ Object }` PoPo instance

Refresh styles for merge styles

## removeStyle

- `removeStyle()`
- Return: `{ Object }` PoPo instance

Remove all styles and empty `style` objects.

## zoom

- `zoom(scale)`
- Parameter: `{ Number } scale` 缩放级别
- Return: `{ Object }` PoPo instance

Scaling instance container, only option [zoom](/en/configuration/funcs#zoom) `enable` is valid.

## show

- `show(target)`
- Parameter: `{ Number | String | HTMLElement | Array<Number|String|HTMLElement> } target` Panel HTMLElement ,Panel ID or alias, Supports single and array sets. The default parameter displays the entire instance container
- Return: `{ Object }` PoPo instance

Displays the entire container, or a single, multiple panels, and the default parameter displays the entire instance container.

```js

const popo = P.init(popoOptions).addTo('container');

// Display instance container
popo.show();

// Show panels.
popo.show([1, 2, 3]);

```

## hide

- `hide(ids)`
- Parameter: `{ Number | String | HTMLElement | Array<Number|String|HTMLElement> } target` Panel HTMLElement ,Panel ID or alias, Supports single and array sets. The default parameter displays the entire instance container
- Return: `{ Object }` PoPo instance

Hide a single or more panels, and default parameters hide the entire instance container.

```js

const popo = P.init(popoOptions).addTo('container');

// Hide instance container
popo.hide();

// Hide panels.
popo.hide([1, 2, 3]);

```

## each

- `each(fn,  targets,  context)`
- Parameter:
  - `{ Function } fn` traversal function, Callback parameters is `elements`, It includes `{id,  alias,  isExtend,  panel,  wrap,  center,  head,  foot,  left,  right,  position,  size}`
  - `{Array<String|Number|HTMLElement>} targets` The panel object collection defaults to traversing all the panels
  - `{ Object } context` Context
- Return: `{ Object }` PoPo instance

Traverse the specified or all of the panels.

```js
const popo = P.init(popoOptions).addTo('container');

// Traverse all of the panels.
popo.each(function(elements) {
  console.log(elements);
});
// {id,  alias,  isExtend,  panel,  wrap,  center,  head,  foot,  left,  right,  position,  size}...

// Traverse the specified panels.
popo.each(function(elements) {
  console.log(elements);
},  [1, 2, 3]);

```

## full

- `full(target,  zIndex)`
- Parameter:
  - `{ String|Number|HTMLElement } target` Panel HTMLElement ,Panel ID or alias.
  - `{ Number } zInex` zIndex
- Return: `{ Object }` PoPo instance

Full screen specified panel.

## unFull

- `unFull()`
- Return: `{ Object }` PoPo instance

Restore full screen panel.

## addPanel

- `addPanel(options)`
- Parameter:
  - `{Object} options` Panel optoion
- Return: `{Object}` Added panel information

Add a panel to the container, and the parameter structure is as follows.

!> When `layout` is `null`, the panel layout is not created.

```js
{
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
    id: '',  // {String} HTMLElement ID
    zIndex: 0,  // {Number} Panel zIndex
    layout: { // Panel layout
        headHeight: 0,  // {Number|String} Support pixels and percentages
        footHeight: 0,  // {Number|String} Support pixels and percentages
        leftWidth: 0,  // {Number|String} Support pixels and percentages
        rightWidth: 0,   // {Number|String} Support pixels and percentages
        gutter: 0, // {Number} Panel gutter.
    },
}
```

### isInPanel

- `isInPanel(panel, x, y)`
- Parameter:
  - `{Object | Number | String} panel` Panel HTMLElement,Panel ID or alias
  - `{Number}` X
  - `{Number}` Y
- Return: `{ Boolean }`

Determine whether coordinates are in the panel.

## setPanelLayout

- `setPanelLayout(options)`
- Parameter:
  - `{Object | Array<Object>} options` Panel layout option, Support object and object array.
- Return: `{ Object }` PoPo instance

Set the panel layout, and the option defaults to Default as follows:

```js
{
    //{String|Number|HTMLElement|Array} Panel HTMLElement,Panel ID or alias, Supports single and array collection.
    panels: null, 
    headHeight: 0,  // {Number|String} Support pixels and percentages
    footHeight: 0,  // {Number|String} Support pixels and percentages
    leftWidth: 0,  // {Number|String} Support pixels and percentages
    rightWidth: 0,   // {Number|String} Support pixels and percentages
    gutter: 0, // {Number} Panel gutter.
}

```

## clearPanel

- `clearPanel(target,  clearTpl)`
- Parameter:
  - `{ String|Number|HTMLElement|Array } target` Panel HTMLElement ,Panel ID or alias, Supports single and array sets.
  - `{ Boolean } clearTpl ` Do you want to clear the template contents loaded in the panel?
- Return: `{ Object }` PoPo instance

Empty panel.

!> If the content created by the template in the panel, the default will be restored to the template location and not visible, and the template content will not be cleared.

## clearAllPanel

- `clearAllPanel(clearTpl)`
- Parameter:
  - `{ Boolean } clearTpl ` Do you want to clear the template contents loaded in the panel?
- Return: `{ Object }` PoPo instance

Empty all panels.

## setBodyScroll

- `setBodyScroll()`
- Return: `{ Object }` PoPo instance

Move the scroll bar style of the instance container to `document.body`. This method is mainly used for browser screen capture

!> Because the PoPo instance created the internal container, more than visible screen area of content generated by the scroll bar is not in the `document.body`, the browser screen capture function and can not identify the non `document.body` scroll bar, if you need the full size of the screenshot, please in the screenshot before calling this method.

## resetBodyScroll

- `resetBodyScroll()`
- Return: `{ Object }` PoPo instance

Restore the scroll bar style of the PoPo instance container.