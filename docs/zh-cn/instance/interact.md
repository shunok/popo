# 实例方法 - 交互

## addTo

- `addTo(container, delay)`

- 参数:
  - `{String|HTMLElement} container` HTMLElement对象的ID值、HTMLElement对象
  - `{ Number } delay` 延迟时间，单位为毫秒 `ms`
- 返回值: `{ Object }` popo实例

将实例添加到指定容器

```js
P.init(options).addTo('container');
```

## update

- `update(options)`
- 参数:
  - `{Array | Object} options` 面板更新选项
- 返回值: `{Object}` 容器实例

刷新布局或根据选项更新指定的面板，`option`缺省则为刷新布局，`options`可以为对象或对象的数组集合，对象的结构如下:

- `{ String|Number|HTMLElement|Array } panels` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- `{ Number } width` 面板的宽度，单位为`px`
- `{ Number } height` 面板的高度，单位为`px`
- `{ Number } zIndex` 面板层级
- `{ Number } left` 面板 距离容器最左侧的距离，单位为`px`
- `{ Number } top` 面板 距离容器最顶部的距离，单位为`px`

```js
const popo = P.init(popoOptions).addTo('container');

// 刷新布局
popo.update();

// 刷新指定的面板(对象)
popo.update({
    panels: [1,2],
    width: 500,
    height: 200,
    zIndex: 100,
    left: 100,
    top: 50
})

// 批量刷新指定的面板(数组)
popo.update([{
    panels: [1,2],
    width: 500,
    height: 200,
    zIndex: 100,
    left: 100,
    top: 50
},{
    panels: [3,4],
    width: 300,
    height: 100,
    zIndex: 98,
    left: 50,
    top: 50
}])
```

## remove

- `remove(target, clearTpl)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
  - `{ Boolean } clearTpl ` 是否移除面板中加载的模板内容
- 返回值: `{ Object }` popo实例

删除指定的面板或移除整个PoPo实例，删除面板或移除实例后将无法再实用删除的对象

!> 如果面板中包括模板创建的内容，默认会恢复到模板位置中且不可见，不会删除模板内容

```js
var popo = P.init(popoOptions);

// 移除整个PoPo实例
popo.remove();

// 删除指定面板，但不会删除模板内容
popo.remove([1,2,3])

// 删除指定的面板，会删除模板内容
popo.remove([1,2,3], true);

```

## restore

- `restore(options)`
- 参数:
  - `{Object|Array<Object>} options` 恢复选项
- 返回值: `{ Object }` popo实例

恢复布局或根据选项恢复指定面板的布局，`option`缺省则为刷新布局，`options`可以为对象或对象的数组集合，对象的结构如下:
panels, size = false, position = false, zIndex = false

- `{ String|Number|HTMLElement|Array } panels` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- `{ Boolean } size` 是否恢复面板的宽度和高度，默认为`true`
- `{ Boolean } position` 是否恢复面板的位置，默认为`true`
- `{ Boolean } zIndex` 是否恢复面板的层级，默认为`true`

```js
const popo = P.init(popoOptions).addTo('container');

// 恢复布局
popo.restore();

// 恢复指定的面板布局(对象)
popo.restore({
    panels: [1,2],
    size: false,
    position: true,
    zIndex: false,
})

// 批量恢复指定的面板布局(数组)
popo.restore([{
    panels: [1,2],
    size: false,
    position: true,
    zIndex: false,
},{
    panels: [3,4],
    size: true,
    position: true,
    zIndex: true,
}]);
```

## setStyle

- `setStyle(style)`
- 参数:
  - `{ Object } style` 样式选项，结构同配置[`style`](/zh-cn/?id=options-style)
- 返回值: `{ Object }` popo实例

重置主题样式

```js
const popo = P.init(popoOptions).addTo('container');

popo.setStyle({
    classname: 'popo-theme',
    custom: [
        {
            panels: [1,2,3],
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
- 参数:
  - `{ Object } style` 样式选项，结构同配置[`style`](/zh-cn/?id=options-style)
- 返回值: `{ Object }` popo实例

刷新样式，用于合并样式

## removeStyle

- `removeStyle()`
- 参数: 无
- 返回值: `{ Object }` popo实例

移除所有样式并清空`style`对象

## zoom

- `zoom(scale)`
- 参数: `{ Number } scale` 缩放级别
- 返回值: `{ Object }` popo实例

缩放实例容器，只有开启选项[zoom](/zh-cn/?id=options-zoom)才有效

## show

- `show(target)`
- 参数: `{ Number | String | HTMLElement | Array<Number|String|HTMLElement> } target` 单个或多个面板，缺省为实例容器
- 返回值: `{ Object }` popo实例

显示单个或多个面板，缺省参数则显示整个实例容器

```js

const popo = P.init(popoOptions).addTo('container');

// 显示实例容器
popo.show();

// 显示ID为[1,2,3]的面板
popo.show([1,2,3]);

```

## hide

- `hide(ids)`
- 参数: `{ Number | String | HTMLElement | Array<Number|String|HTMLElement> } target` 单个或多个面板，缺省为实例容器
- 返回值: `{ Object }` popo实例

隐藏单个或多个面板，缺省参数则隐藏整个实例容器

```js

const popo = P.init(popoOptions).addTo('container');

// 隐藏实例容器
popo.hide();

// 隐藏ID为[1,2,3]的面板
popo.hide([1,2,3]);

```

## each

- `each(fn, targets, context)`
- 参数:
  - `{ Function } fn` 遍历函数，回调参数为 `elements`，包括`{id, alias, isExtend, panel, wrap, center, head, foot, left, right, position, size}`
  - `{Array<String|Number|HTMLElement>} targets` 面板对象集合，缺省为遍历所有面板
  - `{ Object } context` 遍历函数绑定的上下文
- 返回值: `{ Object }` popo实例

遍历指定或所有的面板

```js
const popo = P.init(popoOptions).addTo('container');

// 遍历所有面板
popo.each(function(elements) {
  console.log(elements);
});
// {id, alias, isExtend, panel, wrap, center, head, foot, left, right, position, size}...

// 遍历指定的面板
popo.each(function(elements) {
  console.log(elements);
}, [1,2,3]);

```

## full

- `full(target, zIndex)`
- 参数:
  - `{ String|Number|HTMLElement } target` 面板HTMLElement 、面板ID或别名值
  - `{ Number } zInex` 全屏面板的层级
- 返回值: `{ Object }` popo实例

全屏指定的面板

## unFull

- `unFull()`
- 参数: 无
- 返回值: `{ Object }` popo实例

恢复已全屏的面板

## addPanel

- `addPanel(options)`
- 参数:
  - `{Object} options` 面板选项
- 返回值: `{Object}` 创建的面板信息

向容器中添加面板，参数结构如下:

!> `layout`为`null`时不会创建面板布局

```js
{
    size: {
        width: 0, // {Number} 面板宽度, 单位为px
        height: 0, // {Number} 面板高度, 单位为px
        responsive: true, // {Boolean} 是否是响应式
    },
    position: {
        left: 0, // {Number} 面板距容器左侧的距离，单位为px
        top: 0, // {Number} 面板距容器顶部的距离，单位为px
        responsive: true, // {Boolean}是否是响应式
    },
    id: '', // {String} HTMLElement ID
    zIndex: 0, // {Number} 面板层级
    layout: { // 面板布局，为 null 时不会创建面板布
        headHeight: 0, //{Number|String} 头部高度，支持百分比与数值，数值单位为px
        footHeight: 0, //{Number|String} 底部区域高度，支持百分比与数值，数值单位为px
        leftWidth: 0, //{Number|String} 左侧宽度，支持百分比与数值，数值单位为px
        rightWidth: 0,  //{Number|String} 右侧宽度，支持百分比与数值，数值单位为px
        gutter: 0,  //{Number} 间隔大小，单位为`px`
    },
}
```

## setPanelLayout

- `setPanelLayout(options)`
- 参数:
  - `{Object | Array<Object>} options` 面板选项，支持对象与对象数组
- 返回值: `{ Object }` popo实例

设置面板布局，选项缺省默认值如下:

```js
{
    //{String|Number|HTMLElement|Array}面板HTMLElement、面板ID或别名值，支持单个和数组集合
    panels: null,
    headHeight: 0, //{Number|String} 头部高度，支持百分比与数值，数值单位为px
    footHeight: 0, //{Number|String} 底部区域高度，支持百分比与数值，数值单位为px
    leftWidth: 0, //{Number|String} 左侧宽度，支持百分比与数值，数值单位为px
    rightWidth: 0,  //{Number|String} 右侧宽度，支持百分比与数值，数值单位为px
    gutter: 0,  //{Number} 间隔大小，单位为`px`
}

```

## clearPanel

- `clearPanel(target, clearTpl)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
  - `{ Boolean } clearTpl ` 是否清除面板中加载的模板内容
- 返回值: `{ Object }` popo实例

清空面板

!> 如果面板中包括模板创建的内容，默认会恢复到模板位置中且不可见，不会清除模板内容

## clearAllPanel

- `clearAllPanel(clearTpl)`
- 参数:
  - `{ Boolean } clearTpl ` 是否清除面板中加载的模板内容
- 返回值: `{ Object }` popo实例

清空所有面板

## setBodyScroll

- `setBodyScroll()`
- 参数: 无
- 返回值: `{ Object }` popo实例

将实例容器的滚动条样式移动到`document.body`上，此方法主要用于浏览器屏幕截图

!> 由于popo实例创建了内部容器，超过可视屏幕区域的内容所产生的滚动条并不在`document.body`上，浏览器全屏截图的功能并不能识别非`document.body`的滚动条，如果需要全尺寸的屏幕截图，请在截图前调用此方法。

## resetBodyScroll

- `resetBodyScroll()`
- 参数: 无
- 返回值: `{ Object }` popo实例

恢复实例容器的滚动条样式。