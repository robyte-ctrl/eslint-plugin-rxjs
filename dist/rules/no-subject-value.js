"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-subject-value";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids accessing the `value` property of a `BehaviorSubject` instance.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Accessing the value property of a BehaviorSubject is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeBehaviorSubject } = (0, etc_1.getTypeServices)(context);
        return {
            "Identifier[name=/^(value|getValue)$/]": (node) => {
                const parent = (0, etc_1.getParent)(node);
                if (!parent || !("object" in parent)) {
                    return;
                }
                if (couldBeBehaviorSubject(parent.object)) {
                    context.report({
                        messageId: "forbidden",
                        node,
                    });
                }
            },
        };
    },
});
