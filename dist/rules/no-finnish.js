"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-finnish";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids the use of Finnish notation.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Finnish notation is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { esTreeNodeToTSNodeMap } = (0, etc_1.getParserServices)(context);
        const { couldBeObservable, couldReturnObservable } = (0, etc_1.getTypeServices)(context);
        function checkNode(nameNode, typeNode) {
            if (couldBeObservable(typeNode || nameNode) ||
                couldReturnObservable(typeNode || nameNode)) {
                const tsNode = esTreeNodeToTSNodeMap.get(nameNode);
                if (/[$]+$/.test(tsNode.getText())) {
                    context.report({
                        loc: (0, etc_1.getLoc)(tsNode),
                        messageId: "forbidden",
                    });
                }
            }
        }
        return {
            "ArrayPattern > Identifier[name=/[$]+$/]": (node) => checkNode(node),
            "ArrowFunctionExpression > Identifier[name=/[$]+$/]": (node) => {
                const parent = (0, etc_1.getParent)(node);
                if (node !== parent.body) {
                    checkNode(node);
                }
            },
            "PropertyDefinition[key.name=/[$]+$/] > Identifier": (node) => checkNode(node, (0, etc_1.getParent)(node)),
            "FunctionDeclaration > Identifier[name=/[$]+$/]": (node) => {
                const parent = (0, etc_1.getParent)(node);
                if (node === parent.id) {
                    checkNode(node, parent);
                }
                else {
                    checkNode(node);
                }
            },
            "FunctionExpression > Identifier[name=/[$]+$/]": (node) => {
                const parent = (0, etc_1.getParent)(node);
                if (node === parent.id) {
                    checkNode(node, parent);
                }
                else {
                    checkNode(node);
                }
            },
            "MethodDefinition[key.name=/[$]+$/]": (node) => checkNode(node.key, node),
            "ObjectExpression > Property[computed=false][key.name=/[$]+$/]": (node) => checkNode(node.key),
            "ObjectPattern > Property[value.name=/[$]+$/]": (node) => checkNode(node.value),
            "TSCallSignatureDeclaration > Identifier[name=/[$]+$/]": (node) => checkNode(node),
            "TSConstructSignatureDeclaration > Identifier[name=/[$]+$/]": (node) => checkNode(node),
            "TSParameterProperty > Identifier[name=/[$]+$/]": (node) => checkNode(node),
            "TSPropertySignature > Identifier[name=/[$]+$/]": (node) => checkNode(node, (0, etc_1.getParent)(node)),
            "TSMethodSignature > Identifier[name=/[$]+$/]": (node) => {
                const parent = (0, etc_1.getParent)(node);
                if (node === parent.key) {
                    checkNode(node, parent);
                }
                else {
                    checkNode(node);
                }
            },
            "VariableDeclarator[id.name=/[$]+$/]": (node) => { var _a; return checkNode(node.id, (_a = node.init) !== null && _a !== void 0 ? _a : node); },
        };
    },
});
