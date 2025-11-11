"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-unbound-methods";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the passing of unbound methods.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Unbound methods are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeObservable, couldBeSubscription, getType } = (0, etc_1.getTypeServices)(context);
        const nodeMap = new WeakMap();
        function mapArguments(node) {
            node.arguments.filter(etc_1.isMemberExpression).forEach((arg) => {
                const argType = getType(arg);
                if (argType.getCallSignatures().length > 0) {
                    nodeMap.set(arg);
                }
            });
        }
        function isObservableOrSubscription(node, action) {
            if (!(0, etc_1.isMemberExpression)(node.callee)) {
                return;
            }
            if (couldBeObservable(node.callee.object) ||
                couldBeSubscription(node.callee.object)) {
                action(node);
            }
        }
        return {
            "CallExpression[callee.property.name='pipe']": (node) => {
                isObservableOrSubscription(node, ({ arguments: args }) => {
                    args.filter(etc_1.isCallExpression).forEach(mapArguments);
                });
            },
            "CallExpression[callee.property.name=/^(add|subscribe)$/]": (node) => {
                isObservableOrSubscription(node, mapArguments);
            },
            "NewExpression[callee.name='Subscription']": mapArguments,
            ThisExpression: (node) => {
                let parent = (0, etc_1.getParent)(node);
                while (parent) {
                    if (nodeMap.has(parent)) {
                        context.report({
                            messageId: "forbidden",
                            node: parent,
                        });
                        return;
                    }
                    parent = (0, etc_1.getParent)(parent);
                }
            },
        };
    },
});
