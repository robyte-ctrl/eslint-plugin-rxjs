"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnionType = isUnionType;
const tslib_1 = require("tslib");
const tsutils = tslib_1.__importStar(require("tsutils"));
const ts = tslib_1.__importStar(require("typescript"));
function isUnionType(type) {
    return tsutils.isTypeFlagSet(type, ts.TypeFlags.Union);
}
