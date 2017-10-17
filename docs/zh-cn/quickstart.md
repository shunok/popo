# 快速开始

先准备一个具备宽度和高度的DIV。

```html
<body>
   <div id='container' style="width: 100%; height: 100%;"></div>
</body>
```

然后就可以通过 [P.init](/zh-cn/global?id=init) 方法初始化一个 PoPo 实例并生成对应的布局，接下来我们分别创建两个相对简单的布局。

## 创建一个均匀布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PoPo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="popo.min.js"></script>
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        /* 为面板添加可见样式 */
        .popo-panel {
            background: #e2e2e2;
        }
    </style>
</head>
<body>
    <!-- 为PoPo准备一个具备宽高的DOM容器 -->
    <div id='container' style="width: 100%; height: 100%;"></div>
    <script type="text/javascript">
        // PoPo 初始化
        var po = P.init({
            container: 'container', // 容器ID
            layout: {
                cols: 4, // 水平方向的面板数量
                rows: 3  // 垂直方向的面板数量
            }
        });
    </script>
</body>
</html>
```

这样我们就创建了一个共有12个均匀面板的布局：

<iframe width="100%" height="400" src="https://shunok.github.io/popo-example/examples/layout_avg_5.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 创建一个自由布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PoPo</title>
    <script src="popo.min.js"></script>
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        /* 为面板添加可见样式 */
        .popo-panel {
            background: #e2e2e2;
        }
    </style>
</head>
<body>
    <!-- 为PoPo准备一个具备宽高的DOM容器 -->
    <div id='container' style="width: 100%; width: 100%;"></div>
    <script type="text/javascript">
        // PoPo 初始化
        var po = P.init({
            container: 'container', // 容器ID
            layout: [2, [7, [6, 8, 10]], 3],
        });
    </script>
</body>
</html>
```

这样我们就创建了一个共有5个不同宽高面板的栅格布局：

<iframe width="100%" height="400" src="https://shunok.github.io/popo-example/examples/layout_free_4.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 添加面板布局

我们在上面的自由布局基础上为中间的三个面板添加[面板布局](/zh-cn/panel.md)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PoPo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="popo.min.js"></script>
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        /* 为面板添加可见样式 */
        .popo-center {background: #e2e2e2;}
        .popo-head,.popo-left {background-color: rgba(0, 0, 0, .3);}
    </style>
</head>
<body>
    <!-- 为PoPo准备一个具备宽高的DOM容器 -->
    <div id='container' style="width: 100%;height:100%;"></div>
    <script type="text/javascript">
        // PoPo 初始化
        var po = P.init({
            container: 'container', // 容器ID
            layout: [2, [7, [6, 8, 10]], 3], //布局表达式
            dev: { // 开启调试模式，显示面板信息
                enable: true,
            },
            panel: { // 开启面板布局
                enable: true,
                custom: [{ // 自定义面板布局
                    panels: [2, 3, 4], // 需要设置的面板ID集合
                    headHeight: 40,  // 顶部高度，单位为px
                    leftWidth: "30%", // 左侧宽度为面板宽度的30%
                    gutter: "10 0 0 10"  // 间隔宽度 px
                }]
            }
        });
    </script>
</body>
</html>
```

<iframe width="100%" height="400" src="https://shunok.github.io/popo-example/examples/layout_free_4_panel.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>