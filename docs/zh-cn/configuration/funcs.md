# 配置项 - 功能与样式

## style

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

## drag

- 类型: `Boolean`
- 默认值: `false`

是否开启容器拖拽功能，请注意是容器拖拽而不是面板的拖拽，当内容尺寸超过容器尺寸时可开启`drag`，改变视图位置，它的实现基于`scroll`属性，如果开启`zoom`选项，`drag`默认自动开启。

## zoom

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
        <td>最大缩放比例</td>
    </tr>
    <tr>
        <td>wheelZoom</td>
        <td>Boolean</td>
        <td>true</td>
        <td>是否开启鼠标滚轮绽放，默认开启</td>
    </tr>
</table>

## focus

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

## lineHeight

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

## hideIds

- 类型: `Array`
- 默认值: `null`

设置需要隐藏的Panel，用于隐藏不需要渲染的部分，可以配合`hideType`设置隐藏的区域

## hideType

- 类型: `String`
- 默认值: `panel`

隐藏区域类型，默认为`panel`，可选值 `panel`、`wrap`、`head`、`left`、`right`、`foot`、`center`;

## trackResize

- 类型: `Boolean`
- 默认值: `true`

是否跟踪窗口变化调整尺寸，默认开启

## updateInterval

- 类型: `Number`
- 默认值: `200`

窗口变化响应时间，单位为`ms`

## renderDelay

- 类型: `Number`
- 默认值: `0`

渲染延时，单位`ms`，等待指定时间后才渲染内容，尤其适用于初始化时间较长的应用，加载欢迎屏幕或加载进度UI场景。
