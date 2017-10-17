# Configuration - Hooks

## onload

- Type: `Function`
- Default: `null`

When the instance is created, it is called immediately after it is mounted to the container, and the default import parameter is the instantiated popo object

```js
// Set title after completion of loading
onload: function (popo) {
    popo.each(function (elements) {
        elements.head.innerText = elements.id;
    });
}
```

## update

- Type: `Function`
- Default: `null`

When the container size changes, it is called immediately, and the default import parameter is the instantiated popo object.

```js
// Refresh Echarts chart size.
update: function update(popo) {
    popo.each(function (elements) {
        if (elements.center) {
            var chart = echarts.getInstanceByDom(elements.center);
            chart && chart.resize();
        }
    });
}
```