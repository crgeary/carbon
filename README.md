# Carbon

A static site generator.

---

Built as an educational project, not intended for production use. This has been heavily inspired by [Gatsby](https://www.gatsbyjs.org/), and honestly, you should probably use that instead.

## Features

-   🔌&nbsp; Pluggable
-   📄&nbsp; Multiple content sources
-   🔎&nbsp; Queries via [GROQ](https://sanity-io.github.io/GROQ/)
-   🏗&nbsp; Templates via [Edge.js](https://edge.adonisjs.com/)

## Installation

```
npm i https://github.com/crgeary/carbon.git
```

Check out the [example website](https://github.com/crgeary/carbon-www) for usage.

## APIs

### Nodes

To be valid, a node must contain an `id` and `__carbon.type`. Where `id` is a unique UUID, and `__carbon.type` is string unique to your content source/plugin.

```js
createNode({
    id: createNodeId(`unique string`, `namespace`),
    __carbon: {
        type: `YourType`,
    },
});
```

For example, if sourcing markdown files, it might make sense to use `Markdown` as your `__carbon.type`. Or, if sourcing from WordPress, then perhaps `WordPress__Post`, `WordPress__Page` etc would be appropriate.

### Pages

To be valid, a page must contain an output `path` and a `template`. All fields, including optional fields, are shown below:

```js
createPage({
    path: `about`,
    template: `page.edge`,
    params: {
        title: `About`,
        content: `... html content ...`,
    },
    isRawPath: false,
});
```

Carbon will automatically create "pretty" URLs from your `path`. If you supply `about`, it will create `/about/index.html`. If you need a path to remain untouched, such as `robots.txt`, `rss.xml` or `manifest.webmanifest` then set `isRawPath: false`.

## Templates

Templates can be written with [Edge.js](https://edge.adonisjs.com/), or CommonJS. They exists at `/resources/views` from the root of your project.

### Edge.js

Edge.js templates are as documented in the [Edge.js documentation](https://edge.adonisjs.com/). The file name for these templates must use the `.edge` extension in order for Carbon to treat them as Edge.js templates. Any other extensions will be treated as CommonJS.

#### Presenters

@todo

### CommonJS

If you need more flexibility, then you can use plan old JavaScript for a template. This can be handy when you need to create non HTML pages, such as a `robots.txt` file, or `manifest.webmanifest`. You must export a function that will contain your page parameters (if any), and you must return a string.

```js
module.exports => (params) => {
    return JSON.stringify({
        name: params.name,
        short_name: params.name,
    });
}
```

## Support

I don't plan to support this, but [create an issue](https://github.com/crgeary/carbon/issues) if you're using it, and need help!

## License

[MIT](LICENSE)
