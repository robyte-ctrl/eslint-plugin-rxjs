"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-ignored-takewhile-value";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids ignoring the value within `takeWhile`.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Ignoring the value within takeWhile is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        function checkNode(expression) {
            const scope = context.sourceCode.getScope(expression);
            if (!(0, etc_1.isImport)(scope, "takeWhile", /^rxjs\/?/)) {
                return;
            }
            let ignored = true;
            const [param] = expression.params;
            if (param) {
                if ((0, etc_1.isIdentifier)(param)) {
                    const variable = scope.variables.find(({ name }) => name === param.name);
                    if (variable && variable.references.length > 0) {
                        ignored = false;
                    }
                }
                else if ((0, etc_1.isArrayPattern)(param)) {
                    ignored = false;
                }
                else if ((0, etc_1.isObjectPattern)(param)) {
                    ignored = false;
                }
            }
            if (ignored) {
                context.report({
                    messageId: "forbidden",
                    node: expression,
                });
            }
        }
        return {
            "CallExpression[callee.name='takeWhile'] > ArrowFunctionExpression": (node) => checkNode(node),
            "CallExpression[callee.name='takeWhile'] > FunctionExpression": (node) => checkNode(node),
        };
    },
});
