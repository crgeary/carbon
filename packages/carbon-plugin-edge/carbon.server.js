"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const edge_js_1 = __importDefault(require("edge.js"));
const renderEdge = async (templatePath, params) => {
    return edge_js_1.default.render(templatePath, params);
};
exports.bootstrap = async ({ actions, plugin }) => {
    const { options } = plugin;
    edge_js_1.default.registerViews(options.viewPath);
    actions.setTemplateHandler(renderEdge, {
        match: options.match || ['**/*.edge'],
    });
};
