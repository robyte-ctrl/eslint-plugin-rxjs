"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-ignored-replay-buffer";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids using `ReplaySubject`, `publishReplay` or `shareReplay` without specifying the buffer size.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Ignoring the buffer size is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        function checkNode(node, { arguments: args }) {
            if (!args || args.length === 0) {
                context.report({
                    messageId: "forbidden",
                    node,
                });
            }
        }
        return {
            "NewExpression > Identifier[name='ReplaySubject']": (node) => {
                const newExpression = (0, etc_1.getParent)(node);
                checkNode(node, newExpression);
            },
            "NewExpression > MemberExpression > Identifier[name='ReplaySubject']": (node) => {
                const memberExpression = (0, etc_1.getParent)(node);
                const newExpression = (0, etc_1.getParent)(memberExpression);
                checkNode(node, newExpression);
            },
            "CallExpression > Identifier[name=/^(publishReplay|shareReplay)$/]": (node) => {
                const callExpression = (0, etc_1.getParent)(node);
                checkNode(node, callExpression);
            },
        };
    },
});
