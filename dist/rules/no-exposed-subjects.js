"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
const defaultAllowedTypesRegExp = /^EventEmitter$/;
const defaultOptions = [];
exports.name = "no-exposed-subjects";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions,
    meta: {
        docs: {
            description: "Forbids exposing subjects.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Subject '{{subject}}' must be private.",
            forbiddenAllowProtected: "Subject '{{subject}}' must be private or protected.",
        },
        schema: [
            {
                properties: {
                    allowProtected: { type: "boolean" },
                },
                type: "object",
            },
        ],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const [config = {}] = context.options;
        const { allowProtected = false } = config;
        const { couldBeSubject, couldBeType } = (0, etc_1.getTypeServices)(context);
        const messageId = allowProtected ? "forbiddenAllowProtected" : "forbidden";
        const accessibilityRexExp = allowProtected
            ? /^(private|protected)$/
            : /^private$/;
        function isSubject(node) {
            return (couldBeSubject(node) && !couldBeType(node, defaultAllowedTypesRegExp));
        }
        return {
            [`PropertyDefinition[accessibility!=${accessibilityRexExp}]`]: (node) => {
                if (isSubject(node)) {
                    const { key } = node;
                    if ((0, etc_1.isIdentifier)(key)) {
                        context.report({
                            messageId,
                            node: key,
                            data: {
                                subject: key.name,
                            },
                        });
                    }
                }
            },
            [`MethodDefinition[kind='constructor'] > FunctionExpression > TSParameterProperty[accessibility!=${accessibilityRexExp}] > Identifier`]: (node) => {
                if (isSubject(node)) {
                    const { loc } = node;
                    context.report({
                        messageId,
                        loc: {
                            ...loc,
                            end: {
                                ...loc.start,
                                column: loc.start.column + node.name.length,
                            },
                        },
                        data: {
                            subject: node.name,
                        },
                    });
                }
            },
            [`MethodDefinition[accessibility!=${accessibilityRexExp}][kind=/^(get|set)$/]`]: (node) => {
                if (isSubject(node)) {
                    const key = node.key;
                    context.report({
                        messageId,
                        node: key,
                        data: {
                            subject: key.name,
                        },
                    });
                }
            },
            [`MethodDefinition[accessibility!=${accessibilityRexExp}][kind='method']`]: (node) => {
                const functionExpression = node.value;
                const returnType = functionExpression.returnType;
                if (!returnType) {
                    return;
                }
                const typeAnnotation = returnType.typeAnnotation;
                if (!typeAnnotation) {
                    return;
                }
                if (isSubject(typeAnnotation)) {
                    const key = node.key;
                    context.report({
                        messageId,
                        node: key,
                        data: {
                            subject: key.name,
                        },
                    });
                }
            },
        };
    },
});
