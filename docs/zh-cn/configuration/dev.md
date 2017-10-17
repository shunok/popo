# 配置项 - 调试

## dev.enable

- 类型: `Boolean`
- 默认值: `false`

是否开启调试模式，默认不开启。

## dev.showIds

- 类型: `Array<Number>`
- 默认值: `null`

只显示某些指定面板，隐藏其余面板。

## dev.panel

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

## dev.guideline

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

## dev.panelGuideline

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

## dev.splitline

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