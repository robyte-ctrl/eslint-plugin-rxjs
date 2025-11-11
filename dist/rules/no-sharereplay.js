"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const utils_1 = require("../utils");
const defaultOptions = [];
exports.name = "no-sharereplay";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions,
    meta: {
        docs: {
            description: "Forbids using the `shareReplay` operator.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "shareReplay is forbidden.",
            forbiddenWithoutConfig: "shareReplay is forbidden unless a config argument is passed.",
        },
        schema: [
            {
                properties: {
                    allowConfig: { type: "boolean" },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const [config = {}] = context.options;
        const { allowConfig = true } = config;
        return {
            "CallExpression[callee.name='shareReplay']": (node) => {
                let report = true;
                if (allowConfig) {
                    report =
                        node.arguments.length !== 1 ||
                            node.arguments[0].type !== "ObjectExpression";
                }
                if (report) {
                    context.report({
                        messageId: allowConfig ? "forbiddenWithoutConfig" : "forbidden",
                        node: node.callee,
                    });
                }
            },
        };
    },
});
