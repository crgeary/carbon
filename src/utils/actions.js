const { v5 } = require("uuid");
const { db } = require("../db");

exports.createNodeId = (string, namespace) => {
    return v5(string, v5(namespace, `c8256d5f-abef-4d14-ab6d-489f2819b8ce`));
};

exports.createNode = (node) => {
    db.nodes.push(node);
};

exports.createPage = (page) => {
    db.pages.push(page);
};
