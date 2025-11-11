"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTypeAnnotation = hasTypeAnnotation;
exports.isArrayExpression = isArrayExpression;
exports.isArrayPattern = isArrayPattern;
exports.isArrowFunctionExpression = isArrowFunctionExpression;
exports.isAssignmentExpression = isAssignmentExpression;
exports.isBlockStatement = isBlockStatement;
exports.isCallExpression = isCallExpression;
exports.isExportNamedDeclaration = isExportNamedDeclaration;
exports.isExpressionStatement = isExpressionStatement;
exports.isFunctionDeclaration = isFunctionDeclaration;
exports.isFunctionExpression = isFunctionExpression;
exports.isIdentifier = isIdentifier;
exports.isLiteral = isLiteral;
exports.isMemberExpression = isMemberExpression;
exports.isNewExpression = isNewExpression;
exports.isObjectExpression = isObjectExpression;
exports.isObjectPattern = isObjectPattern;
exports.isProgram = isProgram;
exports.isProperty = isProperty;
exports.isPrivateIdentifier = isPrivateIdentifier;
exports.isRestElement = isRestElement;
exports.isThisExpression = isThisExpression;
exports.isTSTypeLiteral = isTSTypeLiteral;
exports.isTSTypeReference = isTSTypeReference;
exports.isVariableDeclarator = isVariableDeclarator;
const utils_1 = require("@typescript-eslint/utils");
function hasTypeAnnotation(node) {
    return "typeAnnotation" in node && !!node.typeAnnotation;
}
function isArrayExpression(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.ArrayExpression;
}
function isArrayPattern(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.ArrayPattern;
}
function isArrowFunctionExpression(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.ArrowFunctionExpression;
}
function isAssignmentExpression(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.AssignmentExpression;
}
function isBlockStatement(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.BlockStatement;
}
function isCallExpression(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.CallExpression;
}
function isExportNamedDeclaration(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.ExportNamedDeclaration;
}
function isExpressionStatement(node) {
    return node && node.type === utils_1.TSESTree.AST_NODE_TYPES.ExpressionStatement;
}
function isFunctionDeclaration(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.FunctionDeclaration;
}
function isFunctionExpression(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.FunctionExpression;
}
function isIdentifier(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.Identifier;
}
function isLiteral(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.Literal;
}
function isMemberExpression(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.MemberExpression;
}
function isNewExpression(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.NewExpression;
}
function isObjectExpression(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.ObjectExpression;
}
function isObjectPattern(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.ObjectPattern;
}
function isProgram(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.Program;
}
function isProperty(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.Property;
}
function isPrivateIdentifier(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.PrivateIdentifier;
}
function isRestElement(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.RestElement;
}
function isThisExpression(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.ThisExpression;
}
function isTSTypeLiteral(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.TSTypeLiteral;
}
function isTSTypeReference(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.TSTypeReference;
}
function isVariableDeclarator(node) {
    return node.type === utils_1.TSESTree.AST_NODE_TYPES.VariableDeclarator;
}
