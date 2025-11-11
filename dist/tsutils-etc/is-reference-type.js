"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReferenceType = isReferenceType;
const tslib_1 = require("tslib");
const tsutils = tslib_1.__importStar(require("tsutils"));
const ts = tslib_1.__importStar(require("typescript"));
function isReferenceType(type) {
    return (tsutils.isTypeFlagSet(type, ts.TypeFlags.Object) &&
        tsutils.isObjectFlagSet(type, ts.ObjectFlags.Reference));
}
