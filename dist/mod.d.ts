import type { STDNLine, STDNUnit, STDNUnitOptions } from 'stdn';
import type { Compiler, IndexInfo, UnitCompiler } from '@ddu6/stc';
interface Size {
    width: number;
    height: number;
}
export declare function parseLength(option: STDNUnitOptions[string]): number;
export declare function parseSize(option: STDNUnitOptions[string]): Size;
interface Margin {
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    marginLeft: string;
}
export declare const compilerToEnv: Map<Compiler, {
    binging: string;
    breakLevel: {
        rightLevel: number;
        breakLevel: number;
    };
    elementToPage: Map<Element, {
        element: SVGSVGElement;
        headingIndexEle: HTMLSpanElement;
        headingContentEle: HTMLSpanElement;
        main: HTMLElement;
        indexEle: HTMLDivElement;
        index: number;
        frontIndex: number;
    } | undefined>;
    headerLevel: {
        leftHeaderLevel: number;
        rightHeaderLevel: number;
    };
    lineIndexToHeadings: (IndexInfo[] | undefined)[];
    margin: Margin;
    pagedListeners: (() => Promise<void>)[];
    pageIndexToHeadings: (IndexInfo[] | undefined)[];
    pages: {
        element: SVGSVGElement;
        headingIndexEle: HTMLSpanElement;
        headingContentEle: HTMLSpanElement;
        main: HTMLElement;
        indexEle: HTMLDivElement;
        index: number;
        frontIndex: number;
    }[];
    size: Size;
    unitOrLineToPage: Map<STDNUnit | STDNLine, {
        element: SVGSVGElement;
        headingIndexEle: HTMLSpanElement;
        headingContentEle: HTMLSpanElement;
        main: HTMLElement;
        indexEle: HTMLDivElement;
        index: number;
        frontIndex: number;
    } | undefined>;
} | undefined>;
export declare const page: UnitCompiler;
export declare const contents: UnitCompiler;
export declare const h0: UnitCompiler;
export {};
