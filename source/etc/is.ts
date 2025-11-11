/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import { TSESTree as es } from "@typescript-eslint/utils";

export function hasTypeAnnotation<T extends es.Node>(
  node: T,
): node is T & { typeAnnotation: es.TSTypeAnnotation } {
  return "typeAnnotation" in node && !!node.typeAnnotation;
}

export function isArrayExpression(node: es.Node): node is es.ArrayExpression {
  return node.type === es.AST_NODE_TYPES.ArrayExpression;
}

export function isArrayPattern(node: es.Node): node is es.ArrayPattern {
  return node.type === es.AST_NODE_TYPES.ArrayPattern;
}

export function isArrowFunctionExpression(
  node: es.Node,
): node is es.ArrowFunctionExpression {
  return node.type === es.AST_NODE_TYPES.ArrowFunctionExpression;
}

export function isAssignmentExpression(
  node: es.Node,
): node is es.AssignmentExpression {
  return node.type === es.AST_NODE_TYPES.AssignmentExpression;
}

export function isBlockStatement(node: es.Node): node is es.BlockStatement {
  return node.type === es.AST_NODE_TYPES.BlockStatement;
}

export function isCallExpression(node: es.Node): node is es.CallExpression {
  return node.type === es.AST_NODE_TYPES.CallExpression;
}

export function isExportNamedDeclaration(
  node: es.Node,
): node is es.ExportNamedDeclaration {
  return node.type === es.AST_NODE_TYPES.ExportNamedDeclaration;
}

export function isExpressionStatement(
  node: es.Node,
): node is es.ExpressionStatement {
  return node && node.type === es.AST_NODE_TYPES.ExpressionStatement;
}

export function isFunctionDeclaration(
  node: es.Node,
): node is es.FunctionDeclaration {
  return node.type === es.AST_NODE_TYPES.FunctionDeclaration;
}

export function isFunctionExpression(
  node: es.Node,
): node is es.FunctionExpression {
  return node.type === es.AST_NODE_TYPES.FunctionExpression;
}

export function isIdentifier(node: es.Node): node is es.Identifier {
  return node.type === es.AST_NODE_TYPES.Identifier;
}

export function isLiteral(node: es.Node): node is es.Literal {
  return node.type === es.AST_NODE_TYPES.Literal;
}

export function isMemberExpression(node: es.Node): node is es.MemberExpression {
  return node.type === es.AST_NODE_TYPES.MemberExpression;
}

export function isNewExpression(node: es.Node): node is es.NewExpression {
  return node.type === es.AST_NODE_TYPES.NewExpression;
}

export function isObjectExpression(node: es.Node): node is es.ObjectExpression {
  return node.type === es.AST_NODE_TYPES.ObjectExpression;
}

export function isObjectPattern(node: es.Node): node is es.ObjectPattern {
  return node.type === es.AST_NODE_TYPES.ObjectPattern;
}

export function isProgram(node: es.Node): node is es.Program {
  return node.type === es.AST_NODE_TYPES.Program;
}

export function isProperty(node: es.Node): node is es.Property {
  return node.type === es.AST_NODE_TYPES.Property;
}

export function isPrivateIdentifier(
  node: es.Node,
): node is es.PrivateIdentifier {
  return node.type === es.AST_NODE_TYPES.PrivateIdentifier;
}

export function isRestElement(node: es.Node): node is es.RestElement {
  return node.type === es.AST_NODE_TYPES.RestElement;
}

export function isThisExpression(node: es.Node): node is es.ThisExpression {
  return node.type === es.AST_NODE_TYPES.ThisExpression;
}

export function isTSTypeLiteral(node: es.Node): node is es.TSTypeLiteral {
  return node.type === es.AST_NODE_TYPES.TSTypeLiteral;
}

export function isTSTypeReference(node: es.Node): node is es.TSTypeReference {
  return node.type === es.AST_NODE_TYPES.TSTypeReference;
}

export function isVariableDeclarator(
  node: es.Node,
): node is es.VariableDeclarator {
  return node.type === es.AST_NODE_TYPES.VariableDeclarator;
}
