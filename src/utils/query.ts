import { parse, evaluate } from "groq-js";
import { db } from "../db";

export const query = async (input: TemplateStringsArray) => {
    const value = await evaluate(parse(input), { dataset: db.nodes });
    return await value.get();
};
