import path from "path";
import { UserConfig } from "vite";
import { setBuildBanner } from "./Banner";
import { namingFormat } from "./hooks";
import { viteBuildPlugin } from "./plugin";
//@ts-ignore
import typescript from '@rollup/plugin-typescript';
const buildFormatMap = {'umd':'plugin.umd.js','es':'index.js','iife':'plugin.js'};

const viteBuildConfig = (options:any={}):UserConfig=>{
  const root = process.cwd()
  if(!options?.pkg){
    options.pkg = require(path.resolve(root,'package.json'))
  }
 
  return {
    server: {
      host: '0.0.0.0',
      port: 9855,
      // 是否开启 https
      https: false,
    },
    plugins:[typescript({ compilerOptions: {lib: ["es5", "es6", "dom"], target: "es5"}}),viteBuildPlugin(setBuildBanner(options.pkg))],
    build: {
      lib:{
        entry: path.resolve(root, 'src/main.ts'),
        // name: namingFormat.toHump(pkg.name.replace(/\@tinymce-plugin\//,'')),
        name: namingFormat.toHump(options.pkg.name.replace(/\@tinymce-plugin\//,'')),
        formats: ['iife'],
        fileName: (format) => 'plugin.js',
       },
       minify: false,
       outDir: path.resolve(root, 'dist'),
    }
  }
}

export {
viteBuildPlugin,
setBuildBanner,
buildFormatMap,
viteBuildConfig
}
