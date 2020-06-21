const path = require("path");
const edge = require("edge.js");
const mime = require("mime-types");

const config = require("./config");

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
        return path.join(config.paths.views, this.template);
    }
    contentType() {
        const parts = path.parse(this.absolutePath());
        return mime.lookup(parts.ext.slice(1));
    }
    render() {
        if (this.isEdgeTemplate()) {
            return edge.render(this.templatePath(), this.params);
        }
        return require(this.templatePath())(this.params);
    }
}

module.exports = Page;
