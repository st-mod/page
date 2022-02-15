import type { STDNLine, STDNUnit, STDNUnitOptions } from 'stdn';
import type { Compiler, IndexInfo, UnitCompiler } from '@ddu6/stc';
interface Size {
    width: number;
    height: number;
}
export declare function parseLength(option: STDNUnitOptions[string]): number;
export declare function parseSize(option: STDNUnitOptions[string]): Size;
interface Page {
    element: SVGSVGElement;
    headingIndexEle: HTMLSpanElement;
    headingContentEle: HTMLSpanElement;
    main: HTMLElement;
    indexEle: HTMLDivElement;
    index: number;
    frontIndex: number;
}
export declare const compilerToEnv: Map<Compiler, {
    binging: string;
    breakLevel: number;
    elementToPage: Map<Element, Page | undefined>;
    leftHeaderLevel: number;
    lineIndexToHeadings: (IndexInfo[] | undefined)[];
    marginBottom: string;
    marginLeft: string;
    marginRight: string;
    marginTop: string;
    pagedListeners: (() => Promise<void>)[];
    pageIndexToHeadings: (IndexInfo[] | undefined)[];
    pages: Page[];
    rightHeaderLevel: number;
    rightLevel: number;
    size: Size;
    unitOrLineToPage: Map<STDNUnit | STDNLine, Page | undefined>;
} | undefined>;
export declare const page: UnitCompiler;
export declare const contents: UnitCompiler;
export declare const h0: UnitCompiler;
export {};
