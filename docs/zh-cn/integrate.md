# 面板内容渲染

PoPo的布局结构非常适合组件化开发，并为[面板布局](/zh-cn/panel)提供了渲染装载机制，组件模板按如下结构定义即可：

- 为模板最外层的`div`添加一个`data-popo`属性，属性值为面板的`id`或配置项`alias`中自定义的别名

- 第二层使用`data-popo-target`定义，第二层的内容包括`div`本身都会被渲染到面板对应的区域

```html
<div data-popo="1">
    <div data-popo-target="head">
        <!-- head content render result -->
    </div>
    <div data-popo-target="left">
        <!-- left content render result -->
    </div>
    <div data-popo-target="center">
        <!-- center content render result -->
    </div>
    <div data-popo-target="right">
        <!-- rignt content render result -->
    </div>
    <div data-popo-target="foot">
        <!-- foot content render result -->
    </div>
</div>
```

!> 1. 内容必须渲染在PoPo实例挂载的容器内

!> 2. 在PoPo实例加载与渲染完成前，任何包括在`data-popo`中的内容都会被设置为不可见，`data-popo`下除了含有`data-popo-target`属性以外的其它内容均不会被实例加载且不可见。

!> 3. `data-popo`是按照面板的顺序加载的，所以定义的模板上下顺序不会影响最终渲染结果。

面板内容渲染示例

- [Handlebars](../examples/bootstrap.html ":ignore")

```html
<script id="entry-template" type="text/x-handlebars-template">
    {{#each data}}
    <div data-popo="{{id}}">
        <div data-popo-target="center">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">{{title}}-Bootstrap Panel {{id}}</h3>
                </div>
                <div class="panel-body">
                    <div class="btn-group" role="group" aria-label="...">
                        <button type="button" class="btn btn-default">Left</button>
                        <button type="button" class="btn btn-default">Middle</button>
                        <button type="button" class="btn btn-default">Right</button>
                    </div>
                    <br><br>
                    <p>{{body}}</p>
                    <p>
                        <a class="btn btn-primary btn-mg" href="#" role="button">Primary Button</a>
                        <a class="btn btn-success btn-mg" href="#" role="button">Success Button</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    {{/each}}
</script>
```

渲染效果部分截图：

![Handlebars](_images/integrate.png)