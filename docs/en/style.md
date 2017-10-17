# Style

> PoPo provides a flexible style definition and update method that can be used to add or update `class` and` css` in the container, panel, content area in the configuration`style` or instance methods `setStyle` and` updateStyle`.

## Configuration

When the PoPo instance is initialized, there are three style definitions in the Configuration,

- `container`: Mount the container's style definition
- `default`: Default panel and content area definition
- `custom`: Customize the definition of the panel and content area

!> If `container` and `default` default, the instance will automatically add `popo` stop class names as `class`, such as `popo-panel`, `popo-head`, etc., and the Configuration structure is as follows:

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
        panels: [],  // Panel ID or alias collection
        panel: styleDefine, 
        head: styleDefine, 
        center: styleDefine, 
        foot: styleDefine, 
        left: styleDefine, 
        right: styleDefine
    }]
}
```

styleDefine receives three types of parameters, the structure is as follows:

```
// Class and CSS mixed settings
styleDefine = {
    classname: 'classname', 
    css: {
        cssName: cssValue, 
        ...
    }
};

// Set the class
styleDefine = 'classname';

// Set the CSS
styleDefine = {
    cssName: cssValue, 
    ...
};

```

## Instance method setting

- setStyle

`setStyle` receives the style structure object in the Configuration, which clears all the styles and resets them

- updateStyle

`updateStyle` receives the style structure object in the Configuration, merges the original style, does not clear the other styles except the parameter

- removeStyle

`removeStyle` will empty all styles