import type { STDNUnitOptions } from 'stdn';
import type { Compiler, IndexInfo, UnitCompiler } from '@ddu6/stc';
interface Size {
    width: number;
    height: number;
}
export declare function parseLength(option: STDNUnitOptions[string]): number;
export declare function parseSize(option: STDNUnitOptions[string]): Size;
interface Env {
    readonly width: number;
    readonly height: number;
    readonly marginTop: string;
    readonly marginRight: string;
    readonly marginBottom: string;
    readonly marginLeft: string;
    readonly binging: string;
    readonly leftHeaderLevel: number;
    readonly rightHeaderLevel: number;
    readonly rightLevel: number;
    readonly breakLevel: number;
    readonly headings: IndexInfo[];
    readonly idToPageIndex: {
        [key: string]: string | undefined;
    };
    readonly pagedListeners: (() => Promise<void>)[];
    readonly compiler: Compiler;
}
export declare const compilerToEnv: Map<Compiler, Env | undefined>;
export declare const page: UnitCompiler;
export declare const contents: UnitCompiler;
export declare const h0: UnitCompiler;
export {};
