"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couldBeFunction = couldBeFunction;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const could_be_type_1 = require("./could-be-type");
function couldBeFunction(type) {
    return (type.getCallSignatures().length > 0 ||
        (0, could_be_type_1.couldBeType)(type, "Function") ||
        (0, could_be_type_1.couldBeType)(type, "ArrowFunction") ||
        (0, could_be_type_1.couldBeType)(type, ts.InternalSymbolName.Function));
}
