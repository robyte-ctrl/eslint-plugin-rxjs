"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoc = getLoc;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
function getLoc(node) {
    const sourceFile = node.getSourceFile();
    const start = ts.getLineAndCharacterOfPosition(sourceFile, node.getStart());
    const end = ts.getLineAndCharacterOfPosition(sourceFile, node.getEnd());
    return {
        start: {
            line: start.line + 1,
            column: start.character,
        },
        end: {
            line: end.line + 1,
            column: end.character,
        },
    };
}
