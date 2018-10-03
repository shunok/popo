# Quick start

Prepare a DIV with width and height.

```html
<body>
   <div id='container' style="width: 100%; height: 100%;"></div>
</body>
```

Then you can initialize a PoPo instance with the [P.init](/en/global#init)  method and generate the corresponding layout. Next, we create two relatively simple layouts.

## Create a uniform layout

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PoPo</title>
    <meta name="viewport" content="width=device-width,  initial-scale=1.0">
    <script src="popo.min.js"></script>
    <style>
        html, 
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        /* Add a visible style to the panel */
        .popo-panel {
            background: #e2e2e2;
        }
    </style>
</head>
<body>
    <!-- Prepare a DOM container with high width for PoPo -->
    <div id='container' style="width: 100%; height: 100%;"></div>
    <script type="text/javascript">
        // PoPo initialize
        var po = P.init({
            container: 'container',  // Container ID
            layout: {
                cols: 4,  // The number of panels in the horizontal direction
                rows: 3  // The number of panels in the vertical direction
            }
        });
    </script>
</body>
</html>
```

So we created a total of 12 uniform panel layout:

<iframe width="100%" height="400" src="https://shunok.github.io/popo/examples/layout_avg_5.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Create a free layout

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,  initial-scale=1.0">
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

        /* Add a visible style to the panel */
        .popo-panel {
            background: #e2e2e2;
        }
    </style>
</head>
<body>
    <div id='container' style="width: 100%; width: 100%;"></div>
    <script type="text/javascript">
        var po = P.init({
            container: 'container',
            layout: [2,  [7,  [6,  8,  10]],  3],
        });
    </script>
</body>
</html>
```

So we created a total of five different width of the panel layout of the grid：

<iframe width="100%" height="400" src="https://shunok.github.io/popo/examples/layout_free_4.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Add panel layout

We are in the above free layout based on the middle of the three panels to add [panel layout](/en/panel.md)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PoPo</title>
    <meta name="viewport" content="width=device-width,  initial-scale=1.0">
    <script src="popo.min.js"></script>
    <style>
        html, 
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        /* Add a visible style to the panel */
        .popo-center {background: #e2e2e2;}
        .popo-head, .popo-left {background-color: rgba(0,  0,  0,  .3);}
    </style>
</head>
<body>
    <!-- Prepare a DOM container with high width for PoPo -->
    <div id='container' style="width: 100%;height:100%;"></div>
    <script type="text/javascript">
        var po = P.init({
            container: 'container',  // Container ID
            layout: [2,  [7,  [6,  8,  10]],  3],  //Layout expression
            dev: { // Enable the development mode, display panel information
                enable: true,
            }, 
            panel: { // Enable panel layout
                enable: true, 
                custom: [{ // Custom panel layout
                    panels: [2,  3,  4],  // Need to set the panel ID set
                    headHeight: 40,   // Top height in px
                    leftWidth: "30%",  // The width of the left side is 30% of the panel width
                    gutter: "10 0 0 10" 
                }]
            }
        });
    </script>
</body>
</html>
```

<iframe width="100%" height="400" src="https://shunok.github.io/popo/examples/layout_free_4_panel.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>