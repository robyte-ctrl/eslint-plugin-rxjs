"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-ignored-error";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the calling of `subscribe` without specifying an error handler.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Calling subscribe without an error handler is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeObservable, couldBeFunction } = (0, etc_1.getTypeServices)(context);
        return {
            "CallExpression[arguments.length > 0] > MemberExpression > Identifier[name='subscribe']": (node) => {
                const memberExpression = (0, etc_1.getParent)(node);
                const callExpression = (0, etc_1.getParent)(memberExpression);
                if (callExpression.arguments.length < 2 &&
                    couldBeObservable(memberExpression.object) &&
                    couldBeFunction(callExpression.arguments[0])) {
                    context.report({
                        messageId: "forbidden",
                        node,
                    });
                }
            },
        };
    },
});
