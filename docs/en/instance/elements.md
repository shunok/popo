# PoPo Instance Method - Elements

## get

- `get(target)`
- Parameter:
  - `{ String|Number|HTMLElement|Array } target` Panel HTMLElement, panel ID, or alias values support individual and array collections
- Return: `{ Object }`

Gets all the content area containers of the specified panel, as well as the location, size, level information, ID, alias of the panel

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

- `getAll()`
- Return: `{ Array<Object> }`

Get all the elements and information of the panel。

## getContainer

- `getContainer()`
- Return: `{ HTML Element }`

Get mount container

## panel

- `panel(target)`
- Parameter:
  - `{ String|Number|HTMLElement|Array } target` Panel HTMLElement, panel ID, or alias values support individual and array collections
- Return: `{ HTML Element | Array<HTML Element> }`

Gets the specified panel。

## center

- `center(target)`
- Parameter:
  - `{ String|Number|HTMLElement|Array } target` Panel HTMLElement, panel ID, or alias values support individual and array collections
- Return: `{ HTML Element}`

Gets the central area container for the specified panel.

## head

- `head(target)`
- Parameter:
  - `{ String|Number|HTMLElement|Array } target` Panel HTMLElement, panel ID, or alias values support individual and array collections
- Return: `{ HTML Element}`

Gets the top area container of the specified panel

## left

- `left(target)`
- Parameter:
  - `{ String|Number|HTMLElement|Array } target` Panel HTMLElement, panel ID, or alias values support individual and array collections
- Return: `{ HTML Element}`

Gets the left area container of the specified panel.

## right

- `right(target)`
- Parameter:
  - `{ String|Number|HTMLElement|Array } target` Panel HTMLElement, panel ID, or alias values support individual and array collections
- Return: `{ HTML Element}`

Gets the right area container of the specified panel.

## foot

- `foot(target)`
- Parameter:
  - `{ String|Number|HTMLElement|Array } target` Panel HTMLElement, panel ID, or alias values support individual and array collections
- Return: `{ HTML Element}`

Gets the bottom area container of the specified panel.