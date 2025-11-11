"use strict";
const etc_1 = require("../etc");
const utils_1 = require("../utils");
const rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids explicit generic type arguments.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Explicit generic type arguments are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-explicit-generics",
    create: (context) => {
        function report(node) {
            context.report({
                messageId: "forbidden",
                node,
            });
        }
        function checkBehaviorSubjects(node) {
            const parent = (0, etc_1.getParent)(node);
            const { arguments: [value], } = parent;
            if ((0, etc_1.isArrayExpression)(value) || (0, etc_1.isObjectExpression)(value)) {
                return;
            }
            report(node);
        }
        function checkNotifications(node) {
            const parent = (0, etc_1.getParent)(node);
            const { arguments: [, value], } = parent;
            if ((0, etc_1.isArrayExpression)(value) || (0, etc_1.isObjectExpression)(value)) {
                return;
            }
            report(node);
        }
        return {
            "CallExpression[callee.property.name='pipe'] > CallExpression[typeArguments.params.length > 0] > Identifier": report,
            "NewExpression[typeArguments.params.length > 0] > Identifier[name='BehaviorSubject']": checkBehaviorSubjects,
            "CallExpression[typeArguments.params.length > 0] > Identifier[name=/^(from|of)$/]": report,
            "NewExpression[typeArguments.params.length > 0][arguments.0.value='N'] > Identifier[name='Notification']": checkNotifications,
        };
    },
});
module.exports = rule;
