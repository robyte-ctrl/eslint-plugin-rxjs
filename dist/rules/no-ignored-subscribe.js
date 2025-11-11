"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-ignored-subscribe";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the calling of `subscribe` without specifying arguments.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Calling subscribe without arguments is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeObservable, couldBeType } = (0, etc_1.getTypeServices)(context);
        return {
            "CallExpression[arguments.length = 0][callee.property.name='subscribe']": (node) => {
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
