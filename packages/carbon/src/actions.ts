import { v5 as uuidv5 } from 'uuid';

import { db } from './db';

import { Node, Route } from '..';

const seed = `c8256d5f-abef-4d14-ab6d-489f2819b8ce`;

export const createNodeId = (string: string, namespace: string): string => {
    return uuidv5(string, uuidv5(namespace, seed));
};

export const createNode = (node: Node): void => {
    db.get('nodes').push(node).write();
};

export const updateNode = (node: Node): void => {
    db.get('nodes').find({ id: node.id }).assign(node).write();
};

export const getNodeContent = async (node: Node): Promise<string> => {
    // todo: allow for custom loaders
    return node.__carbon.content;
};

export const createRoute = (route: Route): void => {
    db.get('routes').push(route).value();
};
