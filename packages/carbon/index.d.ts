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
    __carbon: {
        type: string;
        mediaType?: string | null;
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
    getNodes(): Node[];
    createRoute(route: Route): void;
    getRoutes(): Route[];
}

export interface HookParamsWithoutPlugin {
    actions: Actions;
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

export type HooksList = "source" | "transform" | "create" | "build";

export interface InternalDatabaseSchema {
    nodes: Node[];
    routes: Route[];
    config: Config;
    plugins: Plugin[];
}
