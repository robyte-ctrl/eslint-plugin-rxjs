"use strict";
const etc_1 = require("../etc");
const utils_1 = require("../utils");
const rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the use of the `toPromise` method.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "The toPromise method is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-topromise",
    create: (context) => {
        const { couldBeObservable } = (0, etc_1.getTypeServices)(context);
        return {
            [`MemberExpression[property.name="toPromise"]`]: (node) => {
                if (couldBeObservable(node.object)) {
                    context.report({
                        messageId: "forbidden",
                        node: node.property,
                    });
                }
            },
        };
    },
});
module.exports = rule;
