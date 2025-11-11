"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const utils_1 = require("../utils");
exports.name = "macro";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Enforces the use of the RxJS Tools Babel macro.",
        },
        fixable: "code",
        hasSuggestions: false,
        messages: {
            macro: "Use the RxJS Tools Babel macro.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        let hasFailure = false;
        let hasMacroImport = false;
        let program = undefined;
        function fix(fixer) {
            if (!program) {
                return null;
            }
            return fixer.insertTextBefore(program, `import "babel-plugin-rxjs-tools/macro";\n`);
        }
        return {
            "CallExpression[callee.property.name=/^(pipe|subscribe)$/]": (node) => {
                if (hasFailure || hasMacroImport) {
                    return;
                }
                hasFailure = true;
                context.report({
                    fix,
                    messageId: "macro",
                    node: node.callee,
                });
            },
            "ImportDeclaration[source.value='babel-plugin-rxjs-tools/macro']": () => {
                hasMacroImport = true;
            },
            [String.raw `ImportDeclaration[source.value=/^rxjs(\u002f|$)/]`]: (node) => {
                if (hasFailure || hasMacroImport) {
                    return;
                }
                hasFailure = true;
                context.report({
                    fix,
                    messageId: "macro",
                    node,
                });
            },
            Program: (node) => {
                program = node;
            },
        };
    },
});
