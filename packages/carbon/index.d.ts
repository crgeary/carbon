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
    context: object;
}

export interface Actions {
    createNodeId(string: string, namespace: string): string;
    createNode(node: Node): void;
    updateNode(node: Node): void;
    createRoute(route: Route): void;
    getNodeContent(node: Node): Promise<string>;
}

export interface QueryHandler {
    (input: string, params?: { [key: string]: any }, store?: string): unknown;
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

export type HooksList = 'source' | 'transform' | 'create' | 'build';

export interface InternalDatabaseSchema {
    nodes: Node[];
    routes: Route[];
    config: Config;
    plugins: Plugin[];
}
