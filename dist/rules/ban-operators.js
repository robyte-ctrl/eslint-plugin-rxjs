"use strict";
const utils_1 = require("@typescript-eslint/utils");
const common_tags_1 = require("common-tags");
const utils_2 = require("../utils");
const defaultOptions = [];
const rule = (0, utils_2.ruleCreator)({
    defaultOptions,
    meta: {
        docs: {
            description: "Forbids the use of banned operators.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "RxJS operator is banned: {{name}}{{explanation}}.",
        },
        schema: [
            {
                type: "object",
                description: (0, common_tags_1.stripIndent) `
          An object containing keys that are names of operators
          and values that are either booleans or strings containing the explanation for the ban.`,
            },
        ],
        type: "problem",
    },
    name: "ban-operators",
    create: (context) => {
        const bans = [];
        const [config] = context.options;
        if (!config) {
            return {};
        }
        Object.entries(config).forEach(([key, value]) => {
            if (value !== false) {
                bans.push({
                    explanation: typeof value === "string" ? value : "",
                    regExp: new RegExp(`^${key}$`),
                });
            }
        });
        function getFailure(name) {
            for (let b = 0, length = bans.length; b < length; ++b) {
                const ban = bans[b];
                if (ban.regExp.test(name)) {
                    const explanation = ban.explanation ? `: ${ban.explanation}` : "";
                    return {
                        messageId: "forbidden",
                        data: { name, explanation },
                    };
                }
            }
            return undefined;
        }
        return {
            [String.raw `ImportDeclaration[source.value=/^rxjs\u002foperators$/] > ImportSpecifier`]: (node) => {
                const identifier = node.imported;
                const failure = getFailure(identifier.type === utils_1.AST_NODE_TYPES.Identifier
                    ? identifier.name
                    : identifier.value);
                if (failure) {
                    context.report({
                        ...failure,
                        node: identifier,
                    });
                }
            },
        };
    },
});
module.exports = rule;
