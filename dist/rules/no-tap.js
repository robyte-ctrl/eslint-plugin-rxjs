"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const utils_1 = require("../utils");
exports.name = "no-tap";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        deprecated: true,
        docs: {
            description: "Forbids the use of the `tap` operator.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "The tap operator is forbidden.",
        },
        replacedBy: ["ban-operators"],
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        return {
            [String.raw `ImportDeclaration[source.value=/^rxjs(\u002foperators)?$/] > ImportSpecifier[imported.name='tap']`]: (node) => {
                const { loc } = node;
                context.report({
                    messageId: "forbidden",
                    loc: {
                        ...loc,
                        end: {
                            ...loc.start,
                            column: loc.start.column + 3,
                        },
                    },
                });
            },
        };
    },
});
