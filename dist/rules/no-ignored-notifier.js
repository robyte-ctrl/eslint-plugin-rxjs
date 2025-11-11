"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-ignored-notifier";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids observables not composed from the `repeatWhen` or `retryWhen` notifier.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Ignoring the notifier is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeMonoTypeOperatorFunction } = (0, etc_1.getTypeServices)(context);
        const entries = [];
        function getEntry() {
            const { length, [length - 1]: entry } = entries;
            return entry;
        }
        return {
            "CallExpression[callee.name=/^(repeatWhen|retryWhen)$/]": (node) => {
                if (couldBeMonoTypeOperatorFunction(node)) {
                    const [arg] = node.arguments;
                    if ((0, etc_1.isArrowFunctionExpression)(arg) || (0, etc_1.isFunctionExpression)(arg)) {
                        const [param] = arg.params;
                        if (param) {
                            entries.push({
                                node,
                                param,
                                sightings: 0,
                            });
                        }
                        else {
                            context.report({
                                messageId: "forbidden",
                                node: node.callee,
                            });
                        }
                    }
                }
            },
            "CallExpression[callee.name=/^(repeatWhen|retryWhen)$/]:exit": (node) => {
                const entry = getEntry();
                if (!entry) {
                    return;
                }
                if (entry.node === node) {
                    if (entry.sightings < 2) {
                        context.report({
                            messageId: "forbidden",
                            node: node.callee,
                        });
                    }
                    entries.pop();
                }
            },
            Identifier: (node) => {
                const entry = getEntry();
                if (!entry) {
                    return;
                }
                if (node.name === entry.param.name) {
                    ++entry.sightings;
                }
            },
        };
    },
});
