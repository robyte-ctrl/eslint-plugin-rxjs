"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-nested-subscribe";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the calling of `subscribe` within a `subscribe` callback.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Nested subscribe calls are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeObservable, couldBeType } = (0, etc_1.getTypeServices)(context);
        const argumentsMap = new WeakMap();
        return {
            [`CallExpression > MemberExpression[property.name='subscribe']`]: (node) => {
                if (!couldBeObservable(node.object) &&
                    !couldBeType(node.object, "Subscribable")) {
                    return;
                }
                const callExpression = (0, etc_1.getParent)(node);
                let parent = (0, etc_1.getParent)(callExpression);
                while (parent) {
                    if (argumentsMap.has(parent)) {
                        context.report({
                            messageId: "forbidden",
                            node: node.property,
                        });
                        return;
                    }
                    parent = (0, etc_1.getParent)(parent);
                }
                for (const arg of callExpression.arguments) {
                    argumentsMap.set(arg);
                }
            },
        };
    },
});
