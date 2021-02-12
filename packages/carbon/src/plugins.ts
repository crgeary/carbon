import path from "path";

import { Hooks } from "..";

export const loadPlugin = (resolvable: string): Hooks => {
    return require(path.join(resolvable, "carbon.server"));
};
