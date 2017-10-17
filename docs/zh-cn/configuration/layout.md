# 配置项 - 布局

## container

- 类型: `String | HTML Element`
- 默认值: `''`

PoPo实例化的挂载容器，可以是HTML Element对象，或者HTML Element对象的`id`属性值。初始化时如果为空值则不会挂载，后面可调用`addTo(container)`方法加载到容器对象中。

## rows

- 类型: `Number`
- 默认值: `12`

栅格总行数，将容器高度划分成对应数量的等比例，每行高度为容器总高度的`100 / rows`%，最小值为1(100%高度)。

## cols

- 类型: `Number`
- 默认值: `24`

栅格总列数，将容器宽度划分成对应数量的等比例，每列宽度为容器总宽的`100 / cols`%，最小值为1(100%宽度)。

## width

- 类型: `Number`
- 默认值: `0`

指定容器宽度，单位为`px`，为0时将自动获取挂载的容器宽度。

## height

- 类型: `Number`
- 默认值: `0`

指定容器高度，单位为`px`，为0时将自动获取挂载的容器高度。

## gutter

- 类型: `Number`
- 默认值: `10`

栅格间隙，单位为`px`。容器四周会留 `gutter / 2`的间隙。

## layout

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

## layoutStartType

- 类型: `String`
- 默认值: `'row'`
- 可取值: `'row', 'col'`

** 自由布局 **起始类型，`'row'`布局表达式的第一个数字类型为行，`'col'`布局表达式的第一个数字类型为列。

## fontScale

- 类型: `Number`
- 默认值: `1`

字体比例，PoPo实例化会自动为内部创建的容器添加CSS样式`fontSize`，单位为`em`，并更新面板`Panel`选项中单位为`px`的项目，如`head`、`foot`等。`fontScale`适用于配置不同屏幕的字体大小与内容布局宽高。

## fullId

- 类型: `Number | String`
- 默认值: `0`

设置某个Panel为全屏状态，其值为Panel `id` 或 `alias`，全屏尺寸等于容器尺寸减去`padding`;

## fullZIndex

- 类型: `Number`
- 默认值: `0`

设置全屏Panel的zIndex值，默认为`0`时将位于所有Panel最底层，Panel创建时`zIndex`的默认值为`1`。

## scroll

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

## panel

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

## panelOverflow

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

## alias

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

## extends

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

`style`的定义与结构详见 [styleDefine](/zh-cn/configuration/funcs#style) 