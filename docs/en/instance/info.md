# PoPo Instance Method - Infomation

## getOption

- `getOption()`
- Return: `{ Object }`

Get configuration.

## getPanelCount

- `getPanelCount()`
- Return: `{ Number }`

Get the total number of panels.

## getIds

- `getIds()`
- Return: `{ Array<Number> }`

Get all panel ID.

```js
popo.getIds();
// return [1, 2, 3, 4, 5, 6...]
```

## getAliasName

- `getAliasName()`
- Parameter: undefined
- Return: `{ Array<String> }`

Gets the name collection of the panel alias.

```js
var popo = P.init({
    alias: [{
        name: 'chart A', 
        id: 1
    },  {
        name: 'map', 
        id: 2
    }]
});

popo.getAliasName();
// return ['chart A',  'map']
```

## getAlias

- `getAlias()`
- Parameter: undefined
- Return: `{ Array<Object> }`

Get the panel alias configuration.

## $top

- `$top(target)`
- Parameter:
  - `{ String | Number | HTMLElement } target` Panel HTMLElement, Panel ID or alias
- Return: `{Number}`

Gets the distance from the top of the container to the panel, The unit is `px`.

!> With the method of `$` prefix is to obtain the position of the panel or the width and height

## $left

- `$left(target)`
- Parameter:
  - `{ String | Number | HTMLElement } target` Panel HTMLElement, Panel ID or alias
- Return: `{Number}`

Gets the distance from the leftmost distance of the container to the panel（left）, The unit is `px`.

!> With the method of `$` prefix is to obtain the position of the panel or the width and height

## $width

- `$width(target,  type)`
- Parameter:
  - `{ String | Number | HTMLElement } target` Panel HTMLElement, Panel ID or alias
  - `{ String } type` type, default value is `panel`, Optional value: `panel`,`head`,`foot`,`center`,`right`,`left`.
- Return: `{Number}`

Gets the width of container, panel or specified area. The unit is `px`

!> With the method of `$` prefix is to obtain the position of the panel or the width and height

## $height

- `$height(target,  type)`
- Parameter:
  - `{ String | Number | HTMLElement } target` Panel HTMLElement, Panel ID or alias
  - `type { String }` 类型, 缺省为`panel`, 可选值：`panel`,`head`,`foot`,`center`,`right`,`left`
- Return: `{Number}`

Gets the height of container, panel or specified area.  The unit is `px`

!> With the method of `$` prefix is to obtain the position of the panel or the width and height