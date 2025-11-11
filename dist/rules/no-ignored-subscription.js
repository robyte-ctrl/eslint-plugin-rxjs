"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-ignored-subscription";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids ignoring the subscription returned by `subscribe`.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Ignoring returned subscriptions is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeObservable, couldBeType } = (0, etc_1.getTypeServices)(context);
        return {
            "ExpressionStatement > CallExpression > MemberExpression[property.name='subscribe']": (node) => {
                if (couldBeObservable(node.object)) {
                    const callExpression = (0, etc_1.getParent)(node);
                    if (callExpression.arguments.length === 1 &&
                        couldBeType(callExpression.arguments[0], "Subscriber")) {
                        return;
                    }
                    context.report({
                        messageId: "forbidden",
                        node: node.property,
                    });
                }
            },
        };
    },
});
