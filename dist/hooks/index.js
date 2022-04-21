"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namingFormat = void 0;
const toHump = (name) => {
    return name.replace(/[-|\_](\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
};
// 驼峰转换下划线
const toLine = (name) => {
    return name.replace(/([A-Z])/g, "_$1").toLowerCase().replace(/\-/g, "_");
};
const toHyphen = (name) => {
    return name.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/\_/g, "-");
};
exports.namingFormat = {
    toHump: toHump,
    toLine: toLine,
    toHyphen: toHyphen,
};
//# sourceMappingURL=index.js.map