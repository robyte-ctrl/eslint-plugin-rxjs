"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
const defaultOptions = [];
exports.name = "prefer-observer";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions,
    meta: {
        docs: {
            description: "Forbids the passing separate handlers to `subscribe` and `tap`.",
        },
        fixable: "code",
        hasSuggestions: true,
        messages: {
            forbidden: "Passing separate handlers is forbidden; pass an observer instead.",
        },
        schema: [
            {
                properties: {
                    allowNext: { type: "boolean" },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeFunction, couldBeObservable } = (0, etc_1.getTypeServices)(context);
        const [config = {}] = context.options;
        const { allowNext = true } = config;
        function checkArgs(callExpression, reportNode) {
            const { arguments: args, callee } = callExpression;
            if ((0, etc_1.isMemberExpression)(callee) && !couldBeObservable(callee.object)) {
                return;
            }
            function* fix(fixer) {
                const { sourceCode } = context;
                const [nextArg, errorArg, completeArg] = args;
                const nextArgText = nextArg ? sourceCode.getText(nextArg) : "";
                const errorArgText = errorArg ? sourceCode.getText(errorArg) : "";
                const completeArgText = completeArg
                    ? sourceCode.getText(completeArg)
                    : "";
                let observer = "{";
                if (nextArgText &&
                    nextArgText !== "undefined" &&
                    nextArgText !== "null") {
                    observer += ` next: ${nextArgText}${isValidArgText(errorArgText) || isValidArgText(completeArgText)
                        ? ","
                        : ""}`;
                }
                if (errorArgText &&
                    errorArgText !== "undefined" &&
                    errorArgText !== "null") {
                    observer += ` error: ${errorArgText}${isValidArgText(completeArgText) ? "," : ""}`;
                }
                if (completeArgText &&
                    completeArgText !== "undefined" &&
                    completeArgText !== "null") {
                    observer += ` complete: ${completeArgText}`;
                }
                observer += " }";
                yield fixer.replaceText(callExpression.arguments[0], observer);
                const [, start] = callExpression.arguments[0].range;
                const [, end] = callExpression.arguments[callExpression.arguments.length - 1].range;
                yield fixer.removeRange([start, end]);
            }
            if (args.length > 1) {
                context.report({
                    messageId: "forbidden",
                    node: reportNode,
                    fix,
                    suggest: [
                        {
                            messageId: "forbidden",
                            fix,
                        },
                    ],
                });
            }
            else if (args.length === 1 && !allowNext) {
                const [arg] = args;
                if ((0, etc_1.isArrowFunctionExpression)(arg) ||
                    (0, etc_1.isFunctionExpression)(arg) ||
                    couldBeFunction(arg)) {
                    context.report({
                        messageId: "forbidden",
                        node: reportNode,
                        fix,
                        suggest: [
                            {
                                messageId: "forbidden",
                                fix,
                            },
                        ],
                    });
                }
            }
        }
        return {
            "CallExpression[callee.property.name='pipe'] > CallExpression[callee.name='tap']": (node) => checkArgs(node, node.callee),
            "CallExpression[callee.property.name='subscribe']": (node) => checkArgs(node, node.callee.property),
        };
    },
});
function isValidArgText(argText) {
    return argText && argText !== "undefined" && argText !== "null";
}
