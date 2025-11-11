"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-topromise";
exports.rule = (0, utils_1.ruleCreator)({
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
    name: exports.name,
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
