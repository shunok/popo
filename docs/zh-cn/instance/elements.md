# 实例方法 - 元素

## get

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

## getAll

- 参数: 无
- 返回值: `{ Array<Object> }`

返回所有所有面板的元素与信息

## getContainer

- 参数: 无
- 返回值: `{ HTML Element }`

获取挂载容器

## panel

- `panel(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element | Array<HTML Element> }`

获取指定ID的面板

## center

- `center(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的中心区域容器

## head

- `head(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的顶部区域容器

## left

- `left(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的左侧区域容器

## right

- `right(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的右侧区域容器

## foot

- `foot(target)`
- 参数:
  - `{ String|Number|HTMLElement|Array } target` 面板HTMLElement 、面板ID或别名值，支持单个和数组集合
- 返回值: `{ HTML Element}`

获取指定面板的底部区域容器