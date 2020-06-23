export type Node = {
    id: string;
    __carbon: {
        type: string;
    };
};

export type Page = {
    path: string;
    template: string;
    params?: object;
    isRawPath?: boolean;
};

export type Plugin = {
    resolve: string;
    options?: object;
};

export type Config = {
    site?: object;
    paths?: {
        views?: string;
        presenters?: string;
    };
    plugins?: Plugin[];
};
