# Global

## init

- `init(options)`
- Parameter:
  - `{ Object } options` [Configuration](/en/configuration/layout.md)
- Return: `{ Object }` PoPo Instance

Initializing an instance of PoPo.

!> You cannot add multiple instances of PoPo on a container.

```js
// Create an instance of PoPo.
P.init({
  container: 'container',
  layout: [[6],  [6]]
});
```

## dispose

- `dispose(target)`
- Parameter:
  - `{ String | HTML Element | PoPo Instance } target` HTML Element ID, HTML Element, PoPo Instance
- Return: `undefined`

Destroy the PoPo instance, once the instance is deleted, the instance will no longer be used

```js
P.dispose('container');
```

## getInstanceByDom

- `getInstanceByDom(container)`
- Parameter:
  - `{ String | HTML Element } container` HTML Element ID, HTML Element, PoPo Instance
- Return: `{ Object }` PoPo Instance

```js
P.getInstanceByDom('container');
// return popo instance
```

## noConflict

- `noConflict()`
- Return: `{ Object } PoPo`

PoPo has two global namespaces: `window.PoPo`,`window.P`. If there is a conflict in the script library namespace, you can use this method to release the `P` variable identifier, and continue to use the `PoPo` namespace using PoPo.

```js
var $P = P.noConflict();
console.log(P);
// undefined
```

## validateLayoutExp

- `validateLayoutExp(layoutArr, rows, cols, startType)`
- Parameter:
  - `{ Array } layoutArr` free layout expression
  - `{ Number } rows` grid system rows
  - `{ Number } cols` grid system columns
  - `{ String } startType` The starting type of the layout，Optional value：`row`、`col`，default value is `row`.
- Return: `{Boolean}`

Verify the free layout expression, if you can not determine the correctness of the expression, you can call this method validation.

```js
P.validateLayoutExp([1,12], 12, 24, 'row');
// return false

P.validateLayoutExp([1,11], 12, 24, 'row');
// return true

```