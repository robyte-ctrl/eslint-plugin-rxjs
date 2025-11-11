"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-connectable";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids operators that return connectable observables.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Connectable observables are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeFunction } = (0, etc_1.getTypeServices)(context);
        return {
            "CallExpression[callee.name='multicast']": (node) => {
                if (node.arguments.length === 1) {
                    context.report({
                        messageId: "forbidden",
                        node: node.callee,
                    });
                }
            },
            "CallExpression[callee.name=/^(publish|publishBehavior|publishLast|publishReplay)$/]": (node) => {
                if (!node.arguments.some((arg) => couldBeFunction(arg))) {
                    context.report({
                        messageId: "forbidden",
                        node: node.callee,
                    });
                }
            },
        };
    },
});
