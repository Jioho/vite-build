import { UserConfig } from "vite";
import { setBuildBanner } from "./Banner";
import { viteBuildPlugin } from "./plugin";
declare const buildFormatMap: {
    umd: string;
    es: string;
    iife: string;
};
declare const viteBuildConfig: (options?: any) => UserConfig;
export { viteBuildPlugin, setBuildBanner, buildFormatMap, viteBuildConfig };
