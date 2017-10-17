# 实例方法 / 信息

## getOption

- `getOption()`
- 参数: 无
- 返回值: `{ Object }`

获取配置项

## getPanelCount

- `getPanelCount()`
- 参数: 无
- 返回值: `{ Number }`

获取面板总数

## getIds

- `getIds()`
- 参数: 无
- 返回值: `{ Array<Number> }`

获取所有面板ID

```js
popo.getIds();
// return [1,2,3,4,5,6...]
```

## getAliasName

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

## getAlias

- `getAlias()`
- 参数: 无
- 返回值: `{ Array<Object> }`

获取面板别名配置

## $top

- `$top(target)`
- 参数:
  - `{ String | Number | HTMLElement } target` 面板HTMLElement 、面板ID或别名值
- 返回值: `{Number}`

获取面板的距离容器顶部的距离，单位为`px`

!> 带`$`前辍的方法主要是获取面板的位置或宽高

## $left

- `$left(target)`
- 参数:
  - `{ String | Number | HTMLElement } target` 面板HTMLElement 、面板ID或别名值
- 返回值: `{Number}`

获取面板的距离容器最左侧的距离（left），单位为`px`

!> 带`$`前辍的方法主要是获取面板的位置或宽高

## $width

- `$width(target, type)`
- 参数:
  - `{ String | Number | HTMLElement } target` 面板HTMLElement 、面板ID或别名值
  - `type { String }` 类型，缺省为`panel`，可选值：`panel`、`head`、`foot`、`center`、`right`、`left`
- 返回值: `{Number}`

获取容器、面板或指定区域的宽度，单位为`px`

!> 带`$`前辍的方法主要是获取面板的位置或宽高

## $height

- `$height(target, type)`
- 参数:
  - `{ String | Number | HTMLElement } target` 面板HTMLElement 、面板ID或别名值
  - `type { String }` 类型，缺省为`panel`，可选值：`panel`、`head`、`foot`、`center`、`right`、`left`
- 返回值: `{Number}`

获取容器、面板或指定区域的高度，单位为`px`

!> 带`$`前辍的方法主要是获取面板的位置或宽高