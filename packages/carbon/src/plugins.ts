import path from "path";

import { NodeHooks } from "./types";

export const loadPlugin = (resolvable: string): NodeHooks => {
    return require(path.join(resolvable, "carbon.server"));
};
