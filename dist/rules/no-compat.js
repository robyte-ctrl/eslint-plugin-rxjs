"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const utils_1 = require("../utils");
exports.name = "no-compat";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids importation from locations that depend upon `rxjs-compat`.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "'rxjs-compat'-dependent import locations are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        return {
            [String.raw `ImportDeclaration Literal[value=/^rxjs\u002f/]:not(Literal[value=/^rxjs\u002f(ajax|fetch|operators|testing|webSocket)/])`]: (node) => {
                context.report({
                    messageId: "forbidden",
                    node,
                });
            },
        };
    },
});
