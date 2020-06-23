import { v5 as uuidv5 } from "uuid";
import { db } from "../db";

import { Node, Page } from "../interfaces";

const seed = `c8256d5f-abef-4d14-ab6d-489f2819b8ce`;

export const createNodeId = (string: string, namespace: string): string => {
    return uuidv5(string, uuidv5(namespace, seed));
};

export const createNode = (node: Node): void => {
    db.nodes.push(node);
};

export const getNodes = (): Node[] => {
    return db.nodes;
};

export const updateNode = (node: Node): void => {
    const index = db.nodes.findIndex((n) => n.id === node.id);
    if (index === -1) {
        throw new Error(`Node ${node.id} was not found for update.`);
    }
    db.nodes[index] = node;
};

export const createPage = (page: Page) => {
    db.pages.push(page);
};

export const getPages = (): Page[] => {
    return db.pages;
};
