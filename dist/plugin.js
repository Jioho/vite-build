"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteBuildPlugin = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * 构建tinymce-plugin 插件
 * @author Five
 * @export
 * @return {*}
 */
const includeRegexp = new RegExp(/\.(css|js)$/i);
// Filename to exclude
const excludeRegexp = new RegExp(/vendor/);
//压缩js  
const minifyJs = (filePath, minifyPath, isCode = false) => {
    //@ts-ignore
    const result = require('esbuild').transformSync(isCode ? filePath : fs_1.default.readFileSync(filePath, "utf-8"), {
        minify: true,
    });
    fs_1.default.writeFileSync(minifyPath, result.code);
};
const viteBuildPlugin = (pluginConfig) => {
    // const root = process.cwd() 
    // const outDir = 'dist'  
    let viteConfig;
    return {
        name: 'tp-plugin-vite-build',
        configResolved(resolvedConfig) {
            viteConfig = resolvedConfig;
        },
        writeBundle(options, bundle) {
            for (const file of Object.entries(bundle)) {
                // Get the full path of file
                const root = viteConfig.root;
                const outDir = pluginConfig.outDir || 'dist';
                const content = pluginConfig.content || pluginConfig;
                const fileName = file[0].endsWith('.js-lean')
                    ? file[0].replace(/\.js-lean/, '.lean.js')
                    : file[0];
                const filePath = path_1.default.resolve(root, outDir, fileName);
                // Only handle matching files
                if (includeRegexp.test(fileName) && !excludeRegexp.test(fileName)) {
                    try {
                        // Read the content from target file
                        let data = fs_1.default.readFileSync(filePath, {
                            encoding: 'utf8',
                        });
                        data = data.replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '\n');
                        fileName == 'plugin.js' && (data = data.replace(/(.*)function\(\)/, '(function()').replace(/\}\(\)\;\n$/, '}());'));
                        // If the banner content has comment symbol, use it directly
                        if (content.includes('/*') ||
                            content.includes('*/')) {
                            data = `${content}\n\n${data}`;
                        }
                        // Otherwise add comment symbol
                        else {
                            data = `/*! ${content}*/\n\n${data}`;
                        }
                        fileName == 'plugin.js' && minifyJs(data, filePath.replace(/plugin\.js$/, 'plugin.min.js'), true);
                        // Save
                        fs_1.default.writeFileSync(filePath, data);
                        //ceate index.js
                        fs_1.default.writeFileSync(path_1.default.resolve(root, outDir, 'index.js'), `require('./${outDir}/plugin.min.js')`);
                    }
                    catch (e) {
                        // console.log(e)
                    }
                }
            }
        },
    };
};
exports.viteBuildPlugin = viteBuildPlugin;
//# sourceMappingURL=plugin.js.map