const { parse, evaluate } = require("groq-js");
const { db } = require("../db");

exports.query = async (input) => {
    const value = await evaluate(parse(input), { dataset: db.nodes });
    return await value.get();
};
