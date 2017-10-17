# 栅格系统

[1]: https://en.wikipedia.org/wiki/Grid_(graphic_design)

栅格系统也称网格系统，它预先定义了单元网格的尺寸，不同数量单元网格的组合可设计出不同的版面。使用栅格系统布局有很多优点，在此不做赘述，关于栅格系统详情可通过[Grid System][1]了解，目前常见的栅格系统应用如：

- 类似于 [bootstrap](https://github.com/twbs/bootstrap) 自带的栅格系统
- 借助像 [susy](https://github.com/oddbird/susy/) 、[lost](https://github.com/peterramsing/lost) 这样更专业的工具构建栅格系统
- 使用 [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) 构建栅格系统

#### PoPo 栅格系统

![grid_01](_images/grid_01.png)
- 上图是PoPo构建的一个12行 x 24列的栅格系统

PoPo栅格系统与其它栅格系统不同的是，PoPo采用行列二维式布局，栅格系统的行数与列数均可以自定义，如定义栅格系统为6行36列、12行24列、24行48列、25行17列、48行110列……