import { ResolvedConfig } from "vite";
import type { NormalizedOutputOptions, OutputBundle } from 'rollup';
export declare const viteBuildPlugin: (pluginConfig?: any) => {
    name: string;
    configResolved(resolvedConfig: ResolvedConfig): void;
    writeBundle(options: NormalizedOutputOptions, bundle: OutputBundle): void;
};
