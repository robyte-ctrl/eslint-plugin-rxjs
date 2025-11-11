"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.name = void 0;
const etc_1 = require("../etc");
const utils_1 = require("../utils");
exports.name = "no-subclass";
exports.rule = (0, utils_1.ruleCreator)({
    defaultOptions: [],
    meta: {
        docs: {
            description: "Forbids subclassing RxJS classes.",
        },
        fixable: undefined,
        hasSuggestions: false,
        messages: {
            forbidden: "Subclassing RxJS classes is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    name: exports.name,
    create: (context) => {
        const { couldBeType } = (0, etc_1.getTypeServices)(context);
        const queryNames = [
            "AsyncSubject",
            "BehaviorSubject",
            "Observable",
            "ReplaySubject",
            "Scheduler",
            "Subject",
            "Subscriber",
        ];
        return {
            [`ClassDeclaration[superClass.name=/^(${queryNames.join("|")})$/] > Identifier.superClass`]: (node) => {
                if (queryNames.some((name) => couldBeType(node, name, { name: /[/\\]rxjs[/\\]/ }))) {
                    context.report({
                        messageId: "forbidden",
                        node,
                    });
                }
            },
        };
    },
});
