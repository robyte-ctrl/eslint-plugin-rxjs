"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couldImplement = couldImplement;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
function couldImplement(type, name, qualified) {
    const { symbol } = type;
    if (symbol) {
        const { valueDeclaration } = symbol;
        if (valueDeclaration && ts.isClassDeclaration(valueDeclaration)) {
            const { heritageClauses } = valueDeclaration;
            if (heritageClauses) {
                const implemented = heritageClauses.some(({ token, types }) => token === ts.SyntaxKind.ImplementsKeyword &&
                    types.some((node) => isMatchingNode(node, name, qualified)));
                if (implemented) {
                    return true;
                }
            }
        }
    }
    return false;
}
function isMatchingNode(node, name, qualified) {
    const { expression } = node;
    if (qualified) {
        const type = qualified.typeChecker.getTypeAtLocation(expression);
        if (type) {
            const qualifiedName = qualified.typeChecker.getFullyQualifiedName(type.symbol);
            if (!qualified.name.test(qualifiedName)) {
                return false;
            }
        }
    }
    const text = expression.getText();
    return typeof name === "string" ? text === name : Boolean(text.match(name));
}
