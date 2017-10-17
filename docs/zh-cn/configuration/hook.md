# 配置项 - 钩子

## onload

- 类型: `Function`
- 默认值: `null`

当实例创建完成，挂载到容器后被立即调用，默认传入参数为实例化的popo对象。

```js
// 加载完成后设置标题
onload: function (popo) {
    popo.each(function (elements) {
        elements.head.innerText = elements.id;
    });
}
```

## update

- 类型: `Function`
- 默认值: `null`

当容器尺寸变化后被立即调用，默认传入参数为实例化的popo对象。

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