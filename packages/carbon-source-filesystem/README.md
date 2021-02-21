# Carbon Source Filesystem

Sources local files for [Carbon](https://github.com/crgeary/carbon)

## Install

```
npm i @crgeary/carbon-source-filesystem --save
```

## Usage

Add the following configuration to `carbon.config.js` ...

```js
const path = require('path');

module.exports = {
    plugins: [
        {
            resolve: `@crgeary/carbon-source-filesystem`,
            options: {
                path: path.resolve('content'),
                collection: 'content',
            },
        },
    ],
};
```

### Options

The plugin supports the following configuration options:

| Key        | Type   | Default   | Description                             |
| ---------- | ------ | --------- | --------------------------------------- |
| path       | string |           | An absolute path to a folder of content |
| collection | string | 'default' | A name used to categorise the content   |

## License

MIT
