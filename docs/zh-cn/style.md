# 样式定义

> PoPo提供了灵活的样式定义和更新方式，可以在配置项`style`中或实例方法`setStyle`和`updateStyle`为容器、面板、内容区域添加或更新`class`和`css`。

## 配置项设置

实例初始化时在配置项中有三个样式定义项，分别为：

- `container`: 挂载容器的样式定义
- `default`: 默认面板及内容区域的样式定义
- `custom`: 自定义面板及内容区域的样式定义

!> 如果`container`和`default`缺省，实例将自动添加`popo`前辍的类名作为`class`，如`popo-panel`、`popo-head`等，配置项结构如下：

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
        panels: [], // 面板的ID 或 别名集合
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

## 实例方法设置

- setStyle

`setStyle`接收配置项中的样式结构对象，将清除所有样式并重置

- updateStyle

`updateStyle`接收配置项中的样式结构对象, 合并原样式，不会清除除参数中外的其它样式

- removeStyle

`removeStyle`将清空所有样式