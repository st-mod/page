import type { STDNUnitOptions } from 'stdn';
import type { UnitCompiler } from '@ddu6/stc';
interface Size {
    width: number;
    height: number;
}
export declare function parseLength(option: STDNUnitOptions[string]): number;
export declare function parseSize(option: STDNUnitOptions[string]): Size;
export declare const page: UnitCompiler;
export declare const contents: UnitCompiler;
export declare const h0: UnitCompiler;
export {};
