"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteBuildConfig = exports.buildFormatMap = exports.setBuildBanner = exports.viteBuildPlugin = void 0;
const path_1 = __importDefault(require("path"));
const Banner_1 = require("./Banner");
Object.defineProperty(exports, "setBuildBanner", { enumerable: true, get: function () { return Banner_1.setBuildBanner; } });
const hooks_1 = require("./hooks");
const plugin_1 = require("./plugin");
Object.defineProperty(exports, "viteBuildPlugin", { enumerable: true, get: function () { return plugin_1.viteBuildPlugin; } });
//@ts-ignore
const plugin_typescript_1 = __importDefault(require("@rollup/plugin-typescript"));
const buildFormatMap = { 'umd': 'plugin.umd.js', 'es': 'index.js', 'iife': 'plugin.js' };
exports.buildFormatMap = buildFormatMap;
const viteBuildConfig = (options = {}) => {
    const root = process.cwd();
    if (!(options === null || options === void 0 ? void 0 : options.pkg)) {
        options.pkg = require(path_1.default.resolve(root, 'package.json'));
    }
    return {
        server: {
            host: '0.0.0.0',
            port: 9855,
            // 是否开启 https
            https: false,
        },
        plugins: [(0, plugin_typescript_1.default)({ compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" } }), (0, plugin_1.viteBuildPlugin)((0, Banner_1.setBuildBanner)(options.pkg))],
        build: {
            lib: {
                entry: path_1.default.resolve(root, 'src/main.ts'),
                // name: namingFormat.toHump(pkg.name.replace(/\@tinymce-plugin\//,'')),
                name: hooks_1.namingFormat.toHump(options.pkg.name.replace(/\@tinymce-plugin\//, '')),
                formats: ['iife'],
                fileName: (format) => 'plugin.js',
            },
            minify: false,
            outDir: path_1.default.resolve(root, 'dist'),
        }
    };
};
exports.viteBuildConfig = viteBuildConfig;
//# sourceMappingURL=index.js.map