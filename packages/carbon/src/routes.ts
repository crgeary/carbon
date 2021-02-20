import path from 'path';

export const normalizePath = (input: string): string => {
    input = input.replace(/^[/]+|index\.html$/, '');
    if (!input.endsWith('/') && path.extname(path.basename(input)) !== '') {
        return input;
    }
    return path.join(input.replace(/[/]+$/, ''), 'index.html');
};
