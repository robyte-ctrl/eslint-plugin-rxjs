"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-subscribe-handlers";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the passing of handlers to `subscribe`.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Passing handlers to subscribe is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeObservable, couldBeType } = (0, etc_1.getTypeServices)(context);
        return {
            "CallExpression[arguments.length > 0][callee.property.name='subscribe']": (node) => {
                const callee = node.callee;
                if (couldBeObservable(callee.object) ||
                    couldBeType(callee.object, "Subscribable")) {
                    context.report({
                        messageId: "forbidden",
                        node: callee.property,
                    });
                }
            },
        };
    },
});
