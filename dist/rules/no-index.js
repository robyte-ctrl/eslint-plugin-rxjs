"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const utils_1 = require("../utils");
exports.name = "no-index";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the importation from index modules.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "RxJS imports from index modules are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        return {
            [String.raw `ImportDeclaration Literal[value=/^rxjs(?:\u002f\w+)?\u002findex/]`]: (node) => {
                context.report({
                    messageId: "forbidden",
                    node,
                });
            },
        };
    },
});
