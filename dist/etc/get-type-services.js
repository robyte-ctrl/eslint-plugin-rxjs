"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeServices = getTypeServices;
const tslib_1 = require("tslib");
const utils_1 = require("@typescript-eslint/utils");
const tsutils = tslib_1.__importStar(require("../tsutils-etc"));
const ts = tslib_1.__importStar(require("typescript"));
const is_1 = require("./is");
function getTypeServices(context) {
    const services = utils_1.ESLintUtils.getParserServices(context);
    const { esTreeNodeToTSNodeMap, program } = services;
    const typeChecker = program.getTypeChecker();
    const couldBeType = (node, name, qualified) => {
        const type = getType(node);
        return tsutils.couldBeType(type, name, qualified ? { ...qualified, typeChecker } : undefined);
    };
    const couldReturnType = (node, name, qualified) => {
        var _a;
        let tsTypeNode;
        const tsNode = esTreeNodeToTSNodeMap.get(node);
        if (ts.isArrowFunction(tsNode) ||
            ts.isFunctionDeclaration(tsNode) ||
            ts.isMethodDeclaration(tsNode) ||
            ts.isFunctionExpression(tsNode)) {
            tsTypeNode = (_a = tsNode.type) !== null && _a !== void 0 ? _a : tsNode.body;
        }
        else if (ts.isCallSignatureDeclaration(tsNode) ||
            ts.isMethodSignature(tsNode)) {
            tsTypeNode = tsNode.type;
        }
        return Boolean(tsTypeNode &&
            tsutils.couldBeType(typeChecker.getTypeAtLocation(tsTypeNode), name, qualified ? { ...qualified, typeChecker } : undefined));
    };
    const getType = (node) => {
        const tsNode = esTreeNodeToTSNodeMap.get(node);
        return tsNode && typeChecker.getTypeAtLocation(tsNode);
    };
    return {
        couldBeBehaviorSubject: (node) => couldBeType(node, "BehaviorSubject"),
        couldBeError: (node) => couldBeType(node, "Error"),
        couldBeFunction: (node) => {
            if ((0, is_1.isArrowFunctionExpression)(node) || (0, is_1.isFunctionDeclaration)(node)) {
                return true;
            }
            return tsutils.couldBeFunction(getType(node));
        },
        couldBeMonoTypeOperatorFunction: (node) => couldBeType(node, "MonoTypeOperatorFunction"),
        couldBeObservable: (node) => couldBeType(node, "Observable"),
        couldBeSubject: (node) => couldBeType(node, "Subject"),
        couldBeSubscription: (node) => couldBeType(node, "Subscription"),
        couldBeType,
        couldReturnObservable: (node) => couldReturnType(node, "Observable"),
        couldReturnType,
        getType,
        isAny: (node) => tsutils.isAny(getType(node)),
        isReferenceType: (node) => tsutils.isReferenceType(getType(node)),
        isUnknown: (node) => tsutils.isUnknown(getType(node)),
        typeChecker,
    };
}
