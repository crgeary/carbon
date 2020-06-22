import { v5 } from "uuid";
import { db } from "../db";

export const createNodeId = (string, namespace) => {
    return v5(string, v5(namespace, `c8256d5f-abef-4d14-ab6d-489f2819b8ce`));
};

export const createNode = (node) => {
    db.nodes.push(node);
};

export const getNodes = () => {
    return db.nodes;
};

export const updateNode = (node) => {
    const index = db.nodes.findIndex((n) => n.id === node.id);
    if (index === -1) {
        throw new Error(`Node ${node.id} was not found for update.`);
    }
    db.nodes[index] = node;
};

export const createPage = (page) => {
    db.pages.push(page);
};

export const getPages = () => {
    return db.pages;
};
