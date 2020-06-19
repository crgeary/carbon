const path = require("path");
const edge = require("edge.js");

class Page {
    constructor(page) {
        this.path = page.path;
        this.template = page.template;
        this.params = page.context;
        this.isRawPath = !!page.isRawPath;
    }
    isEdgeTemplate() {
        return this.template.endsWith(".edge");
    }
    isRawTemplate() {
        return !this.isEdgeTemplate();
    }
    relativePath() {
        if (this.isRawPath) {
            return this.path;
        }
        return path.join(this.path === "/" ? `` : this.path, "index.html");
    }
    absolutePath() {
        return path.resolve(process.cwd(), "public", this.relativePath());
    }
    templatePath() {
        if (this.isEdgeTemplate()) {
            return this.template;
        }
        return path.join(process.cwd(), "resources/views", this.template);
    }
    render() {
        if (this.isEdgeTemplate()) {
            return edge.render(this.templatePath(), this.params);
        }
        return require(this.templatePath())(this.params);
    }
}

module.exports = Page;
