# Carbon Plugin Edge

Adds edge.js template support to [Carbon](https://github.com/crgeary/carbon)

## Install

```
npm i @crgeary/carbon-plugin-edge --save
```

## Usage

Add the following configuration to `carbon.config.js` ...

```js
const path = require('path');

module.exports = {
    plugins: [
        {
            resolve: `@crgeary/carbon-plugin-edge`,
            options: {
                viewPath: path.resolve('templates'),
            },
        },
    ],
};
```

### Options

The plugin supports the following configuration options:

| Key      | Type   | Default       | Description                                            |
| -------- | ------ | ------------- | ------------------------------------------------------ |
| viewPath | string |               | An absolute path to a folder containing edge templates |
| match    | array  | ['**/*.edge'] | An array of glob patterns that should use Edge.js      |

## License

MIT
