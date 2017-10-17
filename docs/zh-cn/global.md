# 全局方法

## init

- `init(options)`
- 参数:
  - `{ Object } options` [配置项](/zh-cn/configuration/layout.md)
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

## dispose

- `dispose(target)`
- 参数:
  - `{ String | HTML Element | PoPo Instance } target` HTML Element 对象的ID值,  HTML Element对象、 PoPo 实例
- 返回值: 无

销毁 PoPo 实例，一旦删除实例，实例将不能再使用。

```js
// 销毁实例
P.dispose('container');
```

## getInstanceByDom

- `getInstanceByDom(container)`
- 参数:
  - `{ String | HTML Element } container` HTML Element 对象的ID值或HTML Element 对象
- 返回：`{ Object }` PoPo 实例

```js
// 根据容器获取PoPo实例
P.getInstanceByDom('container');
// return popo instance

```

## noConflict

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

## validateLayoutExp

- `validateLayoutExp(layoutArr, rows, cols, startType)`
- 参数:
  - `{ Array } layoutArr` 自由布局表达式
  - `{ Number } rows` 栅格系统行数
  - `{ Number } cols` 栅格系统列数
  - `{ String } startType` 布局最开始的起始类型，可选值：`row`、`col`，缺省值`row`
- 返回值: `{Boolean}` 是否为正确的自由布局表达式

检验自由布局表达式，如果不能确定表达式的正确性，可调用此方法校验。

```js
P.validateLayoutExp([1,12], 12, 24, 'row');
// return false

P.validateLayoutExp([1,11], 12, 24, 'row');
// return true

```