export interface Node {
    id: string;
    __carbon: {
        type: string;
    };
}

export interface Plugin {
    resolve: string;
    options?: object;
}

export interface Config {
    plugins: Plugin[];
}

export interface Route {
    path: string;
    context: object;
}

export interface NodeActions {
    createNodeId(string: string, namespace: string): string;
    createNode(node: Node): void;
    getNodes(): Node[];
    createRoute(route: Route): void;
    getRoutes(): Route[];
}

export interface NodeHookParams {
    actions?: NodeActions;
    [key: string]: unknown;
}

export interface NodeHooks {
    source(params: NodeHookParams): Promise<never>;
    transform(params: NodeHookParams): Promise<never>;
    create(params: NodeHookParams): Promise<never>;
    build(params: NodeHookParams): Promise<never>;
}

export type NodeHooksList = "source" | "transform" | "create" | "build";

export interface InternalDatabaseSchema {
    nodes: Node[];
    routes: Route[];
    config: Config;
    plugins: Plugin[];
}
