import path from "path";
import edge from "edge.js";
import mime from "mime-types";

import { Page as IPage } from "./interfaces";

import config from "./config";

class Page {
    path: string;
    template: string;
    params: object = {};
    isRawPath: boolean = false;
    constructor(page: IPage) {
        this.path = page.path;
        this.template = page.template;
        this.params = page.params;
        this.isRawPath = !!page.isRawPath;
    }
    isEdgeTemplate(): boolean {
        return this.template.endsWith(".edge");
    }
    isRawTemplate(): boolean {
        return !this.isEdgeTemplate();
    }
    relativePath(): string {
        if (this.isRawPath) {
            return this.path;
        }
        return path.join(this.path === "/" ? `` : this.path, "index.html");
    }
    absolutePath(): string {
        return path.resolve(process.cwd(), "public", this.relativePath());
    }
    templatePath(): string {
        if (this.isEdgeTemplate()) {
            return this.template;
        }
        return path.join(config.paths.views, this.template);
    }
    contentType(): string | false {
        const parts = path.parse(this.absolutePath());
        return mime.lookup(parts.ext.slice(1));
    }
    render(): string {
        if (this.isEdgeTemplate()) {
            return edge.render(this.templatePath(), this.params);
        }
        return require(this.templatePath())(this.params);
    }
}

export default Page;
