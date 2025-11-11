"use strict";
const etc_1 = require("../etc");
const utils_1 = require("../utils");
const rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the ignoring of observables returned by functions.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Ignoring a returned Observable is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-ignored-observable",
    create: (context) => {
        const { couldBeObservable } = (0, etc_1.getTypeServices)(context);
        return {
            "ExpressionStatement > CallExpression": (node) => {
                if (couldBeObservable(node)) {
                    context.report({
                        messageId: "forbidden",
                        node,
                    });
                }
            },
        };
    },
});
module.exports = rule;
