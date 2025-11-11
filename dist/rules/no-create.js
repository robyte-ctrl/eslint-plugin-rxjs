"use strict";
const etc_1 = require("../etc");
const utils_1 = require("../utils");
const rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the calling of `Observable.create`.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Observable.create is forbidden; use new Observable.",
        },
        schema: [],
        type: "problem",
    },
    name: "no-create",
    create: (context) => {
        const { couldBeObservable } = (0, etc_1.getTypeServices)(context);
        return {
            "CallExpression > MemberExpression[object.name='Observable'] > Identifier[name='create']": (node) => {
                const memberExpression = (0, etc_1.getParent)(node);
                if (couldBeObservable(memberExpression.object)) {
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
