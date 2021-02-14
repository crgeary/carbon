import path from "path";
import resolveCwd from "resolve-cwd";

const packageName = `@crgeary/carbon`;

export const resolveLocalCommandPath = (command: string) => {
    const path = resolveCwd.silent(`${packageName}/dist/commands/${command}`);
    if (!path) {
        throw new Error(`Cannot resolve local command [${command}]`);
    }
    return path;
};

interface LocalCommand {
    (args: object): void;
}

export const resolveLocalHandler = (path: string): LocalCommand => {
    return require(path).handler;
};

export const runHandler = async (handler: any, args: object) => {
    return await handler(args);
};

export const runLocalCommand = async (command: string, args: object) => {
    await resolveLocalHandler(resolveLocalCommandPath(command))(args);
};

export const hasLocalCarbon = (): boolean => {
    let hasCarbon = false;
    try {
        const { dependencies, devDependencies } = require(path.resolve(
            `package.json`
        ));
        hasCarbon =
            (dependencies && dependencies[packageName]) ||
            (devDependencies && devDependencies[packageName]);
    } catch (err) {}
    return !!hasCarbon;
};
