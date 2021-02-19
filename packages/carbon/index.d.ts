export interface Config {
    plugins: Plugin[];
}

export interface Plugin {
    resolve: string;
    options: {
        [key: string]: any;
    };
}

export interface Node {
    id: string;
    internal: {
        type: string;
        mediaType?: string | null;
        content: string;
        contentDigest: string;
    };
    [key: string]: unknown;
}

export interface Route {
    path: string;
    template?: string;
    context: {
        [key: string]: unknown;
    };
}

export interface TemplateHandler {
    (templatePath: string, params: { [key: string]: unknown }): string;
}

export interface TemplateHandlerParams {
    match: string[];
}

export interface Actions {
    createNodeId(string: string, namespace: string): string;
    createNode(node: Node): void;
    updateNode(node: Node): void;
    createRoute(route: Route): void;
    setTemplateHandler(handler: TemplateHandler, params: TemplateHandlerParams): void;
    getNodeContent(node: Node): Promise<string>;
}

export interface QueryHandler {
    (input: string, params?: { [key: string]: unknown }, store?: string): unknown;
}

export interface HookParamsWithoutPlugin {
    actions: Actions;
    node?: Node;
    query?: QueryHandler;
    [key: string]: unknown;
}

export interface HookParams extends HookParamsWithoutPlugin {
    plugin: Plugin;
}

export interface Hooks {
    source(params: HookParams): Promise<never>;
    transform(params: HookParams): Promise<never>;
    create(params: HookParams): Promise<never>;
    build(params: HookParams): Promise<never>;
}

export type HooksList = 'bootstrap' | 'source' | 'transform' | 'create' | 'build';

export interface TemplateHandlerMatch {
    match: string;
    handler: TemplateHandler;
}

export interface InternalDatabaseSchema {
    nodes: Node[];
    routes: Route[];
    config: Config;
    plugins: Plugin[];
    templateHandlers: TemplateHandlerMatch[];
}
