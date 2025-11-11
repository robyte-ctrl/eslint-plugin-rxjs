"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-async-subscribe";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids passing `async` functions to `subscribe`.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Passing async functions to subscribe is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeObservable } = (0, etc_1.getTypeServices)(context);
        function checkNode(node) {
            const parentNode = (0, etc_1.getParent)(node);
            const callee = parentNode.callee;
            if (couldBeObservable(callee.object)) {
                const { loc } = node;
                const asyncLoc = {
                    ...loc,
                    end: {
                        ...loc.start,
                        column: loc.start.column + 5,
                    },
                };
                context.report({
                    messageId: "forbidden",
                    loc: asyncLoc,
                });
            }
        }
        return {
            "CallExpression[callee.property.name='subscribe'] > FunctionExpression[async=true]": checkNode,
            "CallExpression[callee.property.name='subscribe'] > ArrowFunctionExpression[async=true]": checkNode,
        };
    },
});
