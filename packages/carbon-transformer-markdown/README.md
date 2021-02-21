# Carbon Transformer Markdown

Transforms markdown to html for [Carbon](https://github.com/crgeary/carbon)

## Install

```
npm i @crgeary/carbon-transformer-markdown --save
```

## Usage

Add the following configuration to `carbon.config.js` ...

```js
const path = require('path');

module.exports = {
    plugins: [
        {
            resolve: `@crgeary/carbon-transformer-markdown`,
            options: {
                markedOptions: {},
            },
        },
    ],
};
```

### Options

The plugin supports the following configuration options:

| Key           | Type   | Default                                                      | Description                  |
| ------------- | ------ | ------------------------------------------------------------ | ---------------------------- |
| markedOptions | object | See [Defaults](https://marked.js.org/using_advanced#options) | Options passed to `marked()` |

## License

MIT
