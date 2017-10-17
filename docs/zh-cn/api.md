# API

## 全局方法

<hr>

### dispose

- `dispose(target)`
- 参数:
  - `{ String | HTML Element | PoPo Instance } target` HTML Element 对象的ID值,  HTML Element对象、 PoPo 实例
- 返回值: 无

销毁 PoPo 实例，一旦删除实例，实例将不能再使用。

```js
// 销毁实例
P.dispose('container');
```

### getInstanceByDom

- `getInstanceByDom(container)`
- 参数:
  - `{ String | HTML Element } container` HTML Element 对象的ID值或HTML Element 对象
- 返回：`{ Object }` PoPo 实例

```js
// 根据容器获取PoPo实例
P.getInstanceByDom('container');
// return popo instance

```

### init

- `init(options)`
- 参数:
  - `{ Object } options` 配置项
- 返回：`{ Object }` PoPo 实例

初始化一个PoPo实例

!> 不能在一个容器上添加多个PoPo实例。

```js
// 创建一个PoPo实例
P.init({
  container: 'container',
  layout: [[6], [6]]
});
```

### noConflict

- `noConflict()`
- 参数: 无
- 返回值: `{ Object } PoPo`

PoPo默认挂载在两个命名空间：`window.PoPo`和`window.P`上，如果应用中存在脚本库命名空间的冲突，可以使用此方法释放`P`变量标识符，继续使用`PoPo`命名空间使用PoPo。

```js
// 释放P命名空间，重新定义PoPo命名空间为$P
var $P = P.noConflict();
console.log(P);
// undefined
```

### 配置项

<hr>

### options.container

- 类型: `String | HTML Element`
- 默认值: `''`

PoPo实例化的挂载容器，可以是HTML Element对象，或者HTML Element对象的`id`属性值。初始化时如果为空值则不会挂载，后面可调用`addTo(container)`方法加载到容器对象中。

### options.rows

- 类型: `Number`
- 默认值: `12`

栅格总行数，将容器高度划分成对应数量的等比例，每行高度为容器总高度的`100 / rows`%，最小值为1(100%高度)。

### options.cols

- 类型: `Number`
- 默认值: `24`

栅格总列数，将容器宽度划分成对应数量的等比例，每列宽度为容器总宽的`100 / cols`%，最小值为1(100%宽度)。

### options.width

- 类型: `Number`
- 默认值: `0`

指定容器宽度，单位为`px`，为0时将自动获取挂载的容器宽度。

### options.height

- 类型: `Number`
- 默认值: `0`

指定容器高度，单位为`px`，为0时将自动获取挂载的容器高度。

### options.gutter

- 类型: `Number`
- 默认值: `10`

栅格间隙，单位为`px`。容器四周会留 `gutter / 2`的间隙。

### options.layout

- 类型: `String | Array | Object`
- 默认值: `null`

容器布局选项，栅格布局的关键参数。默认值为`null`，不创建任何布局。如果只需要构建一个一行一列的布局，可设置为`whole`，均匀布局推荐使用`Object`类型，自由布局使用`Array`类型，不论是哪种形式的参数，程序内部最终都会转换成数组形式进行计算。

> PoPo使用栅格系统布局，分两种类型：`均匀布局`和`自由布局`，自由布局生成宽高不同的面板，均匀布局生成宽高一致的面板，布局参数如下表所列，更详细的布局设计思路请参考[栅格布局](zh-cn/layout.md)

<table>
    <tr>
        <td>布局</td>
        <td>值类型</td>
        <td>说明</td>
   </tr>
    <tr>
        <td>一行一列</td>
        <td>`String`</td>
        <td>值：`'whole'`<br>构建一个一行一列的栅格布局</td>
    </tr>
    <tr>
        <td>均匀布局</td>
        <td>`Object`</td>
        <td><br>值：`{rows, cols, width, height}`<br>`rows`纵向面板数量，`cols`横向面板数量，`height`面板高度， `width`面板宽度，均可缺省。<br><br>布局由以上四个要素组合确定，遵循以下原则：<br><br>1、面板数量 = `rows * cols`。当`cols`或`rows`缺省时，会自动向上获取栅格配置项中的`cols`或`rows`值；<br><br>2、布局计算时会取整，为确保布局正确，`cols`应能被栅格总列数整除,`rows`应能被栅格总行数整除。<br><br>3、面板宽度和高度：<br>3.1 当width、height缺省时，每个面板宽度比例为容器宽度的`1/cols`%，高度为容器高度的`1/rows`%<br><br>3.2 高度或宽度的值在`0 ~ 1`之间时会转换成`%`，大于`1`时单位为`px`。当宽度单位为`%`时，最终值为面板高度的百分比，当高度单位为`%`时，最终值为面板宽度的百分比。`width`和`height`不能同时小于1。<br><br></td>
    </tr>
    <tr>
        <td>自由布局</td>
        <td>`Array`</td>
        <td><br>值：`[[row, [col, col...]], ...]`或`[[col, [row, row...]], ...]`<br><br>以上数组是自由布局的核心结构，遵循以下原则：<br><br>1、第一个数组中的`row`为占据的栅格行数，`row`相邻的右侧数组`[col, col...]`为对应行的栅格列分布。同理，第二个数组中的`col`为占据的栅格列数，`col`相邻的右侧数据为对应列的栅格行分布。<br><br>2、 兄弟数组的第一项`row`值之和不能大于配置中的`rows`值；<br><br>3、支持嵌套，如将上述数组中第二项`col`值替换为`[col, [row, row...]]`，最终形式为`[[row, [col, [col, [row, row...]]]...], ...]`，当左侧为`row`时，右侧数组项为`col`,当左侧为`col`时，右侧数组项为`row`<br><br>4、右侧数组缺省为空，实际等于配置选项中的`rows`或`cols`，占据一个栅格位置。<br>如`[row]`=`[row,[cols]]`,`[col]`=`[col,[rows]]`<br><br>5、面板数量 = 数组中所有右侧数组长度之和<br><br></td>
    </tr>
</table>

> 均匀布局 layout 示例

```js
// 示例1：构造一个4行 8列共32个面板的布局，每个面板占据 1 / 8 宽、 1 / 4 高的网格比例
rows: 12, cols: 24,
layout: { row: 4, col: 8}
...
// 示例2：构造一个1行 8列共8个面板的布局，每个面板占据 0.5 * 行高的宽度、100% 高的网格比例
rows: 12,  cols: 8,
layout: { row: 1, width: 0.5 }
...
// 示例3：构造一个6行 4列共24个面板的布局，每个面板占据 4 / 24 宽、300px高的网格比例
rows: 6,  cols: 24,
layout: { col: 4, height: 300 }
```

> 自由布局 layout 示例

```js
// 示例1：构造一个纵向 2 个网格的布局
// 第一行占据 24 / 24 宽、 1/ 12 高的网格比例
// 第二行占据 24 / 24 宽、 11 / 12 高的网格比例
rows: 12, cols: 24,
layout: [[1], [11]]
...
// 示例2：构造一个第一行 4 个网格，第二行 2 个网格，共计 6 个网格的布局
// 第一行每列占据 6 / 24宽、 1 / 12 高的网格比例
// 第二行每列占据 12 / 24 宽、 11 / 12 高的网格比例
rows: 12, cols: 24,
layout: [ [1,[6,6,6,6]], [11, [12,12]] ]
```

### options.layoutStartType

- 类型: `String`
- 默认值: `'row'`
- 可取值: `'row', 'col'`

** 自由布局 **起始类型，`'row'`布局表达式的第一个数字类型为行，`'col'`布局表达式的第一个数字类型为列。

### options.fontScale

- 类型: `Number`
- 默认值: `1`

字体比例，PoPo实例化会自动为内部创建的容器添加CSS样式`fontSize`，单位为`em`，并更新面板`Panel`选项中单位为`px`的项目，如`head`、`foot`等。`fontScale`适用于配置不同屏幕的字体大小与内容布局宽高。

### options.fullId

- 类型: `Number | String`
- 默认值: `0`

设置某个Panel为全屏状态，其值为Panel `id` 或 `alias`，全屏尺寸等于容器尺寸减去`padding`;

### options.fullZIndex

- 类型: `Number`
- 默认值: `0`

设置全屏Panel的zIndex值，默认为`0`时将位于所有Panel最底层，Panel创建时`zIndex`的默认值为`1`。

### options.scroll

- 类型: `Object`
- 默认值: `{ x: false, y: false }`

设置滚动条以及溢出容器的内容可见状态，`x` 水平方向，`y`垂直方向，设置`false`禁止，`true`开启。

!> `zoom`选项开启后, 会设置容器`overflow: visible`，`scroll`配置将失效。

<table>
    <tr>
        <td>设置项</td>
        <td>CSS</td>
        <td>说明</td>
    </tr>
    <tr>
        <td>`{x: false, y: false}`</td>
        <td>`overflow: hidden`</td>
        <td>超出容器部分不显示，禁用水平和垂直方向滚动条</td>
    </tr>
    <tr>
        <td>`{x: true, y: true}`</td>
        <td>`overflow: auto`</td>
        <td>超出容器部分显示，开启水平和垂直方向滚动条</td>
    </tr>
    <tr>
        <td>`{x: true, y: false}`</td>
        <td>`overflowX: auto;`<br> `overflowY: hidden;`</td>
        <td>超出容器部分，水平方向显示，开启水平方向滚动条，垂直方向不显示，禁用垂直方向滚动条</td>
    </tr>
    <tr>
        <td>`{x: false, y: true}`</td>
        <td>`overflowX: hidden;`<br>`overflowY: auto;`</td>
        <td>超出容器部分，水平方向不显示，禁止水平方向滚动条，垂直方向显示，开启垂直方向滚动条</td>
    </tr>
</table>

### options.panel

- 类型: `Object`
- 默认值: 见下方

[1]: https://en.wikipedia.org/wiki/Holy_Grail_(web_design)

设置面板布局, 包括是否初始化面板布局、默认面板布局设置以及自定义面板布局。开启`enabel`选项将根据选项初始Panel的内容布局， Panel内容布局采用经典的[圣杯 Holy Grail][1]结构，面板布局包括`head`、`left`、`right`、`foot`、`center`五个区域。

<table>
    <tr>
        <td colspan=4>参数项</td>
        <td>默认值</td>
        <td>说明</td>
    </tr>
    <tr>
        <td colspan=3>enable</td>
        <td>Boolean</td>
        <td>false</td>
        <td>是否开启面板布局，默认禁止</td>
    </tr>
    <tr>
        <td rowspan=5>default</td>
        <td colspan=2>gutter</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>间隔, 设置同 CSS margin, 设置顺序，"top right bottom left"，单位为px</td>
    </tr>
    <tr>
        <td colspan=2>headHeight</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>头部区域高度，接受百分比字符串，为面板高度比值，数值型单位为 px</td>
    </tr>
    <tr>
        <td colspan=2>footHeight</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>底部区域高度，接受百分比字符串，为面板高度比值，数值型单位为 px</td>
    </tr>
    <tr>
        <td colspan=2>leftWidth</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>左侧区域宽度，接受百分比字符串，为面板宽度比值，数值型单位为 px</td>
    </tr>
    <tr>
        <td colspan=2>rightWidth</td>
        <td>`Number|String`</td>
        <td>0</td>
        <td>右侧区域宽度，接受百分比字符串，为面板宽度比值，数值型单位为 px</td>
    </tr>
    <tr>
        <td colspan=3>custom</td>
        <td>`Array<Object>`</td>
        <td>null</td>
        <td>自定义Panel，结构同`default`</td>
    </tr>
</table>

```js
panel: { // panel 参数设置
    enable: false, //是否开启面板布局
    default: { // 设置所有Panel的默认布局样式
        headHeight: 0, // 头部区域高度
        footHeight: 0, // 底部区域高度
        leftWidth: 0, // 左侧区域宽度
        rightWidth: 0, // 右侧区域宽度
        zIndex: // 面板默认层级
    },
    custom: [{ // 自定义Panel
        panels: [], //面板ID或alias集合
        headHeight: 0, // 头部区域高度
        footHeight: 0, // 底部区域高度
        leftWidth: 0, // 左侧区域宽度
        rightWidth: 0, // 右侧区域宽度
        zIndex: // 面板默认层级
    },...]
}
```

### options.panelOverflow

- 类型: `Object`
- 默认值: `{ visible: null, overflowX: null, overflowY: null, overflow: null }`

设置Panel的Overflow相关属性, `visible`、`overflowX`、`overflowY`参数后为Panel的`id`或`id`数组集合，`'all'`为所有Panel。缺省状态下，Panel的CSS `overflow` 为`hidden`。

```js
panelOverflow: [{
    visible: [1, 2],  // 设置 Panel #1、#2 内容溢出为可见状态
    overflowX: [3] // 设置Panel #3 overflowX 为 'auto'，如果有溢出会出现水平滚动条
    overflowY: [4] // 设置Panel #4 overflowY 为 'auto'，如果有溢出会出现垂直滚动条
}]
```

### options.alias

- 类型: `Array<Object>`
  - name `String` 别名
  - id `Number` 面板ID
- 默认值: `null`

设置面板的别名，当数据源较多或者需要适配多种尺寸的显示终端时，设置别名非常便于管理面板与内容关系，也可以在其中定义需要用到的属性，比如组件类型等。

```js
// 示例1
alias:[
    { name: "caption", id: 4 },
    { name: "chart1", id: 1 },
    { name: "chart2", id: 2 },
    { name: "chart3", id: 3 },
    { name: "chart4", id: 6 },
    { name: "chart5", id: 7 },
    { name: "chart6", id: 8 },
    { name: "chart7", id: 9 },
    { name: "chinamap", id: 5 }
]

// 示例2
alias:[
    { name: "caption", id: 4, type: 'title'},
    { name: "chart1", id: 1, type: 'chart' },
    { name: "chart2", id: 2, type: 'chart' },
    { name: "chart3", id: 3, type: 'chart'  },
    { name: "chart4", id: 6, type: 'chart' },
    { name: "chart5", id: 7, type: 'chart' },
    { name: "chart6", id: 8, type: 'chart' },
    { name: "chart7", id: 9, type: 'chart' },
    { name: "chinamap", id: 5 , type: 'map' }
]

```

### options.extends

- 类型: `Array`
- 默认值: `null`

添加扩展面板，layout与扩展面板可组合使用，参数结构如下：

```js
extends: [{
    size: { // 设置内容高度和宽度
        width: 0, // 设置内容宽度
        height: 0, // 设置内容高度
        responsive: true, // 是否响应式，如果是会转换成%，默认为响应式
    },
    position: { // 设置内容位置
        left: 0, // 设置距离容器左侧的位置
        top: 0, // 设置距离容器顶部的位置
        responsive: true, // 是否响应式，如果是会转换成 %，默认为响应式
    },
    layout: {
        gutter:0,
        headHeight: 0,
        footHeight:0,
        leftWidth:0,
        rightWidth:0
    },
    zIndex: CT.PANEL_DEFAULT_ZINDEX,  // 设置层级，默认为1
    id: '', // 添加 dom ID 值
    style: styleDefine // 样式设置
}]
```

`style`的定义与结构详见 [styleDefine](/zh-cn/?id=options-style) 

## 配置项 - 功能与样式

<hr>

### options.drag

- 类型: `Boolean`
- 默认值: `false`

是否开启容器拖拽功能，请注意是容器拖拽而不是面板的拖拽，当内容尺寸超过容器尺寸时可开启`drag`，改变视图位置，它的实现基于`scroll`属性，如果开启`zoom`选项，`drag`默认自动开启。

### options.zoom

- 类型: `Object`
- 默认值: `{enable: false, control: true, position: 'rightTop', scale: 1, ratio: 0.1, min: 0.1, max: 1, wheelZoom: true },`

缩放选项，当定义的宽度和高度大于容器自身尺寸时可用缩放功能显示全屏状态。

<table>
    <tr>
        <td>值项</td>
        <td>值类型</td>
        <td>默认值</td>
        <td>说明</td>
    </tr>
    <tr>
        <td>enable</td>
        <td>Boolean</td>
        <td>false</td>
        <td>是否开启缩放功能，默认不开启</td>
    </tr>
    <tr>
        <td>control</td>
        <td>Boolean</td>
        <td>true</td>
        <td>是否显示缩放控件，默认显示，缩放功能开启后有效</td>
    </tr>
    <tr>
        <td>position</td>
        <td>String</td>
        <td>rightTop</td>
        <td>缩放控件显示位置，取值为`rightTop`(右上)、`rightBottom`(右下)、`leftTop`(左上)、`leftBottom`(左下)默认显示，缩放功能开启后有效，默认放在右上角</td>
    </tr>
    <tr>
        <td>scale</td>
        <td>Number</td>
        <td>1</td>
        <td>默认缩放比例</td>
    </tr>
    <tr>
        <td>ratio</td>
        <td>Number</td>
        <td>0.1</td>
        <td>缩放系数，每一次缩放0.1个单位</td>
    </tr>
    <tr>
        <td>min</td>
        <td>Number</td>
        <td>0.1</td>
        <td>最小缩放比例</td>
    </tr>
    <tr>
        <td>max</td>
        <td>Number</td>
        <td>1</td>
        <td>最大绽放比例</td>
    </tr>
    <tr>
        <td>wheelZoom</td>
        <td>Boolean</td>
        <td>true</td>
        <td>是否开启鼠标滚轮绽放，默认开启</td>
    </tr>
</table>

### options.focus

- 类型: `Object`
- 默认值: `{ id: 0, offsetX: 0, offsetY: 0 }`

聚焦于某个Panel上，聚焦坐标为容器左上角: `{x: 0 + offsetX, y: 0 + offsetY}`

<table>
    <tr>
        <td>值项</td>
        <td>值类型</td>
        <td>默认值</td>
        <td>说明</td>
    </tr>
    <tr>
        <td>id</td>
        <td>Number | String</td>
        <td>0</td>
        <td>Panel的 id 或 alias</td>
    </tr>
    <tr>
        <td>offsetX</td>
        <td>Number</td>
        <td>0</td>
        <td>水平方向X坐标的偏离值</td>
    </tr>
    <tr>
        <td>offsetY</td>
        <td>Number</td>
        <td>0</td>
        <td>垂直方向Y坐标的偏离值</td>
    </tr>
</table>

### options.lineHeight

- 类型: 'Object | Array'
- 默认值: `null`

设置区域的行高等于区域自身高度，对于单行如标题内容的垂直居中非常有用，当批量设置不同区域的行高时，可采用数组形式。

<table>
    <tr>
        <td>值项</td>
        <td>值类型</td>
        <td>默认值</td>
        <td>说明</td>
    </tr>
    <tr>
        <td>panels</td>
        <td>Number | String | Array</td>
        <td>null</td>
        <td>Panel的 id 或 别名，或数组集合</td>
    </tr>
    <tr>
        <td>type</td>
        <td>String</td>
        <td>Panel</td>
        <td>区域类型</td>
    </tr>
</table>

```js
// 设置所有Panel的头部区域行高
lineHeight: {
    panels: 'all',
    type: 'head'
}

// 设置id为2的Panel的头部区域行高
lineHeight: {
    panels: 2,
    type: 'head'
}

// 设置id为[2, 3, 4]的Panel的头部区域行高, 设置id为[4,5,6]的Panel的底部区域行高
lineHeight: [{
    panels: [2,3,4],
    type: 'head'
}, {
    panels: [4,5,6],
    type: 'foot'
}]
```

### options.hideIds

- 类型: `Array`
- 默认值: `null`

设置需要隐藏的Panel，用于隐藏不需要渲染的部分，可以配合`hideType`设置隐藏的区域

### options.hideType

- 类型: `String`
- 默认值: `panel`

隐藏区域类型，默认为`panel`，可选值 `panel`、`wrap`、`head`、`left`、`right`、`foot`、`center`;

### options.trackResize

- 类型: `Boolean`
- 默认值: `true`

是否跟踪窗口变化调整尺寸，默认开启

### options.updateInterval

- 类型: `Number`
- 默认值: `200`

窗口变化响应时间，单位为`ms`

### options.renderDelay

- 类型: `Number`
- 默认值: `0`

渲染延时，单位`ms`，等待指定时间后才渲染内容，尤其适用于初始化时间较长的应用，加载欢迎屏幕或加载进度UI场景。

### options.style

- 类型: `Object`
- 默认值: `null`

为容器和Panel添加样式，结构如下

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
styleDefine接收三种类型的参数，结构如下：

```
// 类与CSS混合设置
styleDefine = {
    classname: 'classname',
    css: {
        cssName: cssValue,
        ...
    }
};

// 设置类
styleDefine = 'classname';

// 设置CSS
styleDefine = {
    cssName: cssValue,
    ...
};

```

## 配置项 - 钩子

### options.onload

- 类型: `Function`
- 默认值: `null`

当实例创建完成，挂载到容器后被立即调用，默认传入参数为实例化的popo对象, onload的调用延迟由[renderDelay](/zh-cn/option_other?id=renderDelay)控制。

```js
// 加载完成后设置标题
onload: function (popo) {
    popo.each(function (elements) {
        elements.head.innerText = elements.id;
    });
}
```

### options.update

- 类型: `Function`
- 默认值: `null`

当容器尺寸变化后被立即调用，默认传入参数为实例化的popo对象，update的调用延迟由[updateInterval](/zh-cn/option_other?id=updateInterval)控制。

```js
// 刷新Echarts图表尺寸
update: function update(popo) {
    popo.each(function (elements) {
        if (elements.center) {
            var chart = echarts.getInstanceByDom(elements.center);
            chart && chart.resize();
        }
    });
}
```

## 配置项 - 调试
<hr>

### options.dev.enable

- 类型: `Boolean`
- 默认值: `false`

是否开启调试模式，默认不开启。

### options.dev.showIds

- 类型: `Array<Number>`
- 默认值: `null`

只显示某些指定面板，隐藏其余面板。

### options.dev.panel

- 类型: `Object`
- 默认值: 见下方

面板信息，包括面板的ID、宽度、高度、位置信息、背景样式。

<table>
    <tr>
        <td>值项</td>
        <td>值类型</td>
        <td>默认值</td>
        <td>说明</td>
    </tr>
    <tr>
        <td>show</td>
        <td>Boolean</td>
        <td>false</td>
        <td>是否开启面板信息显示功能</td>
    </tr>
    <tr>
        <td>id</td>
        <td>Boolean</td>
        <td>true</td>
        <td>是否显示面板ID</td>
    </tr>
    <tr>
        <td>size</td>
        <td>Boolean</td>
        <td>false</td>
        <td>是否显示面板宽度和高度</td>
    </tr>
    <tr>
        <td>position</td>
        <td>Boolean</td>
        <td>false</td>
        <td>是否显示面板位置信息</td>
    </tr>
    <tr>
        <td>background</td>
        <td>String</td>
        <td>`''`</td>
        <td>设置面板的背景样式</td>
    </tr>
    <tr>
        <td>fontSize</td>
        <td>Number</td>
        <td>14</td>
        <td>设置面板信息的字体大小</td>
    </tr>
    <tr>
        <td>fontColor</td>
        <td>String</td>
        <td>'#333333'</td>
        <td>设置面板信息的字体颜色</td>
    </tr>
</table>

### options.dev.guideline

- 类型: `Object`
- 默认值: 见下方

栅格辅助线。

<table>
    <tr>
        <td>值项</td>
        <td>值类型</td>
        <td>默认值</td>
        <td>说明</td>
    </tr>
    <tr>
        <td>show</td>
        <td>Boolean</td>
        <td>false</td>
        <td>是否开启栅格辅助线</td>
    </tr>
    <tr>
        <td>identifier</td>
        <td>Boolean</td>
        <td>true</td>
        <td>是否显示栅格标识</td>
    </tr>
    <tr>
        <td>lineSize</td>
        <td>Number</td>
        <td>1</td>
        <td>辅助线的宽度</td>
    </tr>
    <tr>
        <td>color</td>
        <td>String</td>
        <td>rgba(0,0,0,.25)</td>
        <td>辅助线颜色</td>
    </tr>
    <tr>
        <td>zIndex</td>
        <td>Number</td>
        <td>0</td>
        <td>栅格辅助线层级</td>
    </tr>
    <tr>
        <td>fontSize</td>
        <td>Number</td>
        <td>14</td>
        <td>设置栅格标识的字体大小</td>
    </tr>
    <tr>
        <td>fontColor</td>
        <td>String</td>
        <td>'#333333'</td>
        <td>设置栅格标识的字体颜色</td>
    </tr>
</table>

### options.dev.panelGuideline

- 类型: `Object`
- 默认值: 见下方

面板栅格辅助线。

<table>
    <tr>
        <td>值项</td>
        <td>值类型</td>
        <td>默认值</td>
        <td>说明</td>
    </tr>
    <tr>
        <td>show</td>
        <td>Boolean</td>
        <td>false</td>
        <td>是否开启面板栅格辅助线</td>
    </tr>
    <tr>
        <td>ids</td>
        <td>Array</td>
        <td>null</td>
        <td>需要显示栅格线的面板ID集合</td>
    </tr>
    <tr>
        <td>lineSize</td>
        <td>Number</td>
        <td>1</td>
        <td>辅助线的宽度</td>
    </tr>
    <tr>
        <td>color</td>
        <td>String</td>
        <td>rgba(0,0,0,.25)</td>
        <td>辅助线颜色</td>
    </tr>
    <tr>
        <td>zIndex</td>
        <td>Number</td>
        <td>0</td>
        <td>栅格辅助线层级</td>
    </tr>
    <tr>
        <td>size</td>
        <td>Number</td>
        <td>15</td>
        <td>单元栅格的大小</td>
    </tr>
</table>

### options.dev.splitline

- 类型: `Object`
- 默认值: 见下方

分隔辅助线。

<table>
    <tr>
        <td>值项</td>
        <td>值类型</td>
        <td>默认值</td>
        <td>说明</td>
    </tr>
    <tr>
        <td>show</td>
        <td>Boolean</td>
        <td>false</td>
        <td>是否显示分割辅助线</td>
    </tr>
    <tr>
        <td>width</td>
        <td>Number</td>
        <td>100</td>
        <td>分割单元宽度</td>
    </tr>
    <tr>
        <td>height</td>
        <td>Number</td>
        <td>100</td>
        <td>分割单元高度</td>
    </tr>
    <tr>
        <td>identifier</td>
        <td>Boolean</td>
        <td>true</td>
        <td>是否显示分割单元标识</td>
    </tr>
    <tr>
        <td>lineSize</td>
        <td>Number</td>
        <td>1</td>
        <td>辅助线的宽度</td>
    </tr>
    <tr>
        <td>color</td>
        <td>String</td>
        <td>#000</td>
        <td>辅助线颜色</td>
    </tr>
    <tr>
        <td>zIndex</td>
        <td>Number</td>
        <td>0</td>
        <td>栅格辅助线层级</td>
    </tr>
    <tr>
        <td>fontSize</td>
        <td>Number</td>
        <td>12</td>
        <td>设置栅格标识的字体大小</td>
    </tr>
    <tr>
        <td>fontColor</td>
        <td>String</td>
        <td>'#333333'</td>
        <td>设置栅格标识的字体颜色</td>
    </tr>
</table>

- [dev-splitline 示例1](../../example/dev_splitline_1.html ":ignore")
- [dev-splitline 示例2](../../example/dev_splitline_2.html ":ignore")

> 完整的 dev 默认选项

```js
// 调试工具默认选项
dev: {
    // 是否开启调试工具，默认关闭
    enable: false,
    // Panel调试信息设置
    panel: {
        enable: true, // 是否开启，调试工具开启后默认开启
        id: true, // 显示 Panel ID
        size: false, // 是否显示Panel 宽度与高度
        position: false, // 是否显示Panel 位置信息
        background: '', // 为Panel 添加背景样式
        fontSize: 14, // 信息文字大小
        fontColor: '#333', // 信息文字颜色
    },
    // 栅格辅助线设置
    guideline: {
        show: false, // 是否显示，默认不显示
        identifier: true, // 是否显示栅格ID
        lineSize: 1, // 设置辅助线宽度, 单位px
        color: 'rgba(0,0,0,.25)',  // 设置辅助线颜色
        zIndex: 0,  // 设置辅助线层级，默认最底层
        fontSize: 14, // 栅格ID文字大小
        fontColor: '#333', // 栅格ID文字颜色
    },
    // Panel 辅助线设置
    panelGuideline: {
        show: false, // 是否显示，默认不显示
        ids: [], // 需要显示Panel辅助线的ID集合
        lineSize: 0.5, // 设置辅助线宽度, 单位px
        size: 15, // 辅助线单元格大小, 默认为 15px
        zIndex: 0, // 设置辅助线层级，默认最底层
        color: '#888', // 栅格ID文字大小
    },
    // 分隔线设置
    splitline: {
        show: false, // 是否显示分隔线，默认不显示
        lineSize: 1, // 设置分隔线宽度, 单位px
        width: 100, // 分隔线单元格宽度
        height: 100, // 分隔线单元格高度
        color: '#000', // 分隔线颜色
        zIndex: 0, // 设置分隔线层级
        identifier: true, // 是否显示分隔线位置信息, 默认显示
        fontColor: '#333333', // 设置分隔线位置信息文字颜色
        fontSize: 12, // 设置分隔线位置信息文字大小
    },
    showIds: [], // 只显示某些指定Panel，隐藏其余部分
}
```

## 实例方法 / 信息
<hr>

### getOption

- `getOption()`
- 参数: 无
- 返回值: `{ Object }`

获取配置顶

### getPanelCount

- `getPanelCount()`
- 参数: 无
- 返回值: `{ Number }`

获取面板总数

### getIds

- `getIds()`
- 参数: 无
- 返回值: `{ Array<Number> }`

获取所有面板ID

```js
popo.getIds();
// return [1,2,3,4,5,6...]
```

### getAliasName

- `getAliasName()`
- 参数: 无
- 返回值: `{ Array<String> }`

获取面板别名的名字集合

```js
var popo = P.init({
    alias: [{
        name: '图表一',
        id: 1
    }, {
        name: '地图',
        id: 2
    }]
});

popo.getAliasName();
// return ['图表一', '地图']
```

### getAlias

- `getAlias()`
- 参数: 无
- 返回值: `{ Array<Object> }`

获取面板别名配置

### $top

- `$top(target)`
- 参数:
  - `{ String | Number | HTMLElement } target` 面板HTMLElement 、面板ID或别名值
- 返回值: `{Number}`

获取面板的距离容器顶部的距离，单位为`px`

!> 带`$`前辍的方法主要是获取面板的位置或宽高

### $left

- `$left(target)`
- 参数:
  - `{ String | Number | HTMLElement } target` 面板HTMLElement 、面板ID或别名值
- 返回值: `{Number}`

获取面板的距离容器最左侧的距离（left），单位为`px`

!> 带`$`前辍的方法主要是获取面板的位置或宽高

### $width

- `$width(target, type)`
- 参数:
  - `{ String | Number | HTMLElement } target` 面板HTMLElement 、面板ID或别名值
  - `type { String }` 类型，缺省为`panel`，可选值：`panel`、`head`、`foot`、`center`、`right`、`left`
- 返回值: `{Number}`

获取容器、面板或指定区域的宽度，单位为`px`

!> 带`$`前辍的方法主要是获取面板的位置或宽高

### $height

- `$height(target, type)`
- 参数:
  - `{ String | Number | HTMLElement } target` 面板HTMLElement 、面板ID或别名值
  - `type { String }` 类型，缺省为`panel`，可选值：`panel`、`head`、`foot`、`center`、`right`、`left`
- 返回值: `{Number}`

获取容器、面板或指定区域的高度，单位为`px`

!> 带`$`前辍的方法主要是获取面板的位置或宽高

## 实例方法 - 元素

<hr>

### get

- `get(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ Object }`

获取指定面板的所有内容区域容器，以及面板的位置、尺寸、层级信息、ID、别名。

```js
popo.get(2);

// return
{
  id: {Number}
  isExtend: {Boolean}
  alias: {String}
  panel: {HTMLElement}
  panelContainer: {HTMLElement}
  head: {HTMLElement}
  lcf: {HTMLElement}
  left: {HTMLElement}
  center: {HTMLElement}
  right: {HTMLElement}
  foot: {HTMLElement}
  size: {
     width: {Number}
     height: {Number}
  }
  position: {
    left: {Number}
    top: {Number}
    zIndex: {Number}
  }
}
```

### getAll

- 参数: 无
- 返回值: `{ Array<Object> }`

返回所有所有面板的元素与信息

### getContainer

- 参数: 无
- 返回值: `{ HTML Element }`

获取挂载容器

### panel

- `panel(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element | Array<HTML Element> }`

获取指定ID的面板

### center

- `center(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的中心区域容器

### head

- `head(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的顶部区域容器

### left

- `left(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的左侧区域容器

### right

- `right(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的右侧区域容器

### foot

- `foot(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的底部区域容器

## 实例方法 - 交互

<hr>

### addTo

- `addTo(container, delay)`

- 参数:
  - `{String|HTMLElement} container` HTMLElement对象的ID值、HTMLElement对象
  - `{ Number } delay` 延迟时间，单位为毫秒 `ms`
- 返回值: `{ Object }` popo实例

将实例添加到指定容器

```js
P.init(options).addTo('container');
```

### update

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

### remove

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

### restore

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

### setStyle

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

### updateStyle

- `updateStyle(style)`
- 参数:
  - `{ Object } style` 样式选项，结构同配置[`style`](/zh-cn/?id=options-style)
- 返回值: `{ Object }` popo实例

刷新样式，用于合并样式

### removeStyle

- `removeStyle()`
- 参数: 无
- 返回值: `{ Object }` popo实例

移除所有样式并清空`style`对象

### zoom

- `zoom(scale)`
- 参数: `{ Number } scale` 缩放级别
- 返回值: `{ Object }` popo实例

缩放实例容器，只有开启选项[zoom](/zh-cn/?id=options-zoom)才有效

### show

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

### hide

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

### each

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

### full

- `full(target, zIndex)`
- 参数:
  - `{ String|Number|HTMLElement } target` 面板HTMLElement 、面板ID或别名值
  - `{ Number } zInex` 全屏面板的层级
- 返回值: `{ Object }` popo实例

全屏指定的面板

### unFull

- `unFull()`
- 参数: 无
- 返回值: `{ Object }` popo实例

恢复已全屏的面板

### addPanel

- `addPanel(options)`
- 参数:
  - `{Object} options` 面板选项
- 返回值: `{Object}` 创建的面板信息

向容器中添加面板，参数结构如下, `layout`为`null`时不会创建面板布局

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

### setPanelLayout

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

### clearPanel

- `clearPanel(target, clearTpl)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
  - `{ Boolean } clearTpl ` 是否清除面板中加载的模板内容
- 返回值: `{ Object }` popo实例

清空面板

!> 如果面板中包括模板创建的内容，默认会恢复到模板位置中且不可见，不会清除模板内容

### clearAllPanel(clearTpl)

- `clearAllPanel(clearTpl)`
- 参数:
  - `{ Boolean } clearTpl ` 是否清除面板中加载的模板内容
- 返回值: `{ Object }` popo实例

清空所有面板

### setBodyScroll

- `setBodyScroll()`
- 参数: 无
- 返回值: `{ Object }` popo实例

将实例容器的滚动条样式移动到`document.body`上，此方法主要用于浏览器屏幕截图

!> 由于popo实例创建了内部容器，超过可视屏幕区域的内容所产生的滚动条并不在`document.body`上，浏览器全屏截图的功能并不能识别非`document.body`的滚动条，如果需要全尺寸的屏幕截图，请在截图前调用此方法。

### resetBodyScroll

- `resetBodyScroll()`
- 参数: 无
- 返回值: `{ Object }` popo实例

恢复实例容器的滚动条样式。