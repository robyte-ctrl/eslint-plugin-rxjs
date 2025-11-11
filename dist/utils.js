"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleCreator = void 0;
exports.createRegExpForWords = createRegExpForWords;
exports.escapeRegExp = escapeRegExp;
const utils_1 = require("@typescript-eslint/utils");
const REPO_URL = 'https://github.com/robyte-ctrl/eslint-plugin-rxjs';
exports.ruleCreator = utils_1.ESLintUtils.RuleCreator((name) => `${REPO_URL}/tree/main/docs/rules/${name}.md`);
function createRegExpForWords(config) {
    if (!config || !config.length) {
        return undefined;
    }
    const flags = "i";
    if (typeof config === "string") {
        return new RegExp(config, flags);
    }
    const words = config;
    const joined = words.map((word) => String.raw `(\b|_)${word}(\b|_)`).join("|");
    return new RegExp(`(${joined})`, flags);
}
function escapeRegExp(text) {
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
