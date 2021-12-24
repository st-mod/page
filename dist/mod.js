import { getLastGlobalOption, lineToInlinePlainString } from '@ddu6/stc';
const fontSize = 16;
let width = parseLength('210mm');
let height = parseLength('297mm');
let marginTop = '.4in';
let marginRight = '.4in';
let marginBottom = '.4in';
let marginLeft = '.4in';
let binging = '0px';
let leftHeaderLevel = 0;
let rightHeaderLevel = 1;
let rightLevel = 0;
let breakLevel = 0;
let headings = [];
let compiler0;
const idToPageIndex = {};
function stdnToInlinePlainStringLine(stdn) {
    for (const line of stdn) {
        const string = lineToInlinePlainString(line);
        if (string.length > 0) {
            return line;
        }
    }
    return [];
}
function createPage(index) {
    const left = index % 2 === 0;
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    const container = document.createElement('div');
    const header = document.createElement('header');
    const main = document.createElement('main');
    const footer = document.createElement('footer');
    const headingEle = document.createElement('div');
    const indexEle = document.createElement('div');
    const headingIndexEle = document.createElement('span');
    const headingContentEle = document.createElement('span');
    element.append(fo);
    fo.append(container);
    container.append(header);
    container.append(main);
    container.append(footer);
    header.append(headingEle);
    footer.append(indexEle);
    headingEle.append(headingIndexEle);
    headingEle.append(headingContentEle);
    element.setAttribute('viewBox', `0 0 ${width} ${height}`);
    fo.setAttribute('width', '100%');
    fo.setAttribute('height', '100%');
    container.style.fontSize = `${fontSize}px`;
    const innerMargin = `calc(${marginLeft} + ${binging})`;
    container.style.marginLeft = left ? marginRight : innerMargin;
    container.style.marginRight = left ? innerMargin : marginRight;
    header.style.height = marginTop;
    main.style.display = 'flow-root';
    main.style.height = `calc(${height}px - ${marginTop} - ${marginBottom})`;
    footer.style.height = marginBottom;
    indexEle.textContent = index.toString();
    return {
        element,
        headingIndexEle,
        headingContentEle,
        main,
        indexEle
    };
}
async function fillHeader(index, currentHeadings, page) {
    const left = index % 2 === 0;
    const heading = currentHeadings[left ? leftHeaderLevel : rightHeaderLevel];
    if (heading !== undefined && compiler0 !== undefined) {
        if (heading.orbit === 'heading') {
            page.headingIndexEle.append(new Text(heading.index.join('.')));
        }
        const { abbr } = heading.unit.options;
        if (typeof abbr === 'string') {
            page.headingContentEle.append(new Text(abbr));
        }
        else if (typeof abbr === 'object') {
            page.headingContentEle.append(await compiler0.compileLine(stdnToInlinePlainStringLine(abbr)));
        }
        else {
            page.headingContentEle.append(await compiler0.compileLine(stdnToInlinePlainStringLine(heading.unit.children)));
        }
    }
}
async function fillHeaders(pages) {
    let headingIndex = 0;
    let currentHeadings = [];
    let index = 0;
    for (const page of pages) {
        for (; headingIndex < headings.length; headingIndex++) {
            const info = headings[headingIndex];
            const { id, index, orbit } = info;
            if (page.main.querySelector(`[id=${JSON.stringify(id)}]`) === null) {
                break;
            }
            idToPageIndex[id] = page.indexEle.textContent ?? undefined;
            const level = orbit === 'heading' ? index.length : 0;
            for (let i = level + 1; i < currentHeadings.length; i++) {
                currentHeadings[i] = undefined;
            }
            currentHeadings[level] = info;
        }
        await fillHeader(++index, currentHeadings, page);
    }
}
function removeBefore(node, parent) {
    while (true) {
        while (true) {
            if (node.previousSibling === null) {
                break;
            }
            node.previousSibling.remove();
        }
        if (node.parentNode === null || node.parentNode === parent) {
            break;
        }
        node = node.parentNode;
    }
}
function removeAfter(node, parent) {
    while (true) {
        while (true) {
            if (node.nextSibling === null) {
                break;
            }
            node.nextSibling.remove();
        }
        if (node.parentNode === null || node.parentNode === parent) {
            break;
        }
        node = node.parentNode;
    }
}
async function putLine(line, main, nonEmptyPage, breakPointOffset) {
    main.append(line);
    if (line.getBoundingClientRect().bottom <= main.getBoundingClientRect().bottom) {
        return;
    }
    function noBreak() {
        if (nonEmptyPage) {
            line.remove();
            return {
                nline: line,
                breakPointOffset
            };
        }
    }
    if (compiler0 === undefined || line.children.length !== 1 || line.childNodes.length !== 1) {
        return noBreak();
    }
    const info = compiler0.context.idToIndexInfo[line.children[0].id];
    if (info === undefined) {
        return noBreak();
    }
    const breakPoints = line.querySelectorAll('.breakable>*');
    if (breakPoints.length === 0) {
        return noBreak();
    }
    for (let i = breakPoints.length - 1; i >= 0; i--) {
        removeAfter(breakPoints[i], line);
        if (line.getBoundingClientRect().bottom > main.getBoundingClientRect().bottom) {
            continue;
        }
        const nline = (await compiler0.compileSTDN([[info.unit]])).children[0];
        const node = nline.querySelectorAll('.breakable>*')[breakPointOffset + i];
        if (node === undefined) {
            return;
        }
        removeBefore(node, nline);
        node.remove();
        return {
            nline,
            breakPointOffset: breakPointOffset + i + 1
        };
    }
    line.remove();
    const nline = (await compiler0.compileSTDN([[info.unit]])).children[0];
    if (breakPointOffset > 0) {
        const node = nline.querySelectorAll('.breakable>*')[breakPointOffset - 1];
        if (node === undefined) {
            return;
        }
        removeBefore(node, nline);
        node.remove();
    }
    if (nonEmptyPage) {
        return {
            nline,
            breakPointOffset
        };
    }
    main.append(nline);
}
async function breakToPages(lines, article) {
    article.innerHTML = '';
    let headingIndex = 0;
    let index0 = 1;
    let realIndex = 1;
    let page = createPage(realIndex);
    const pages = [page];
    article.append(page.element);
    let nonEmptyPage = false;
    function newPage() {
        index0++;
        pages.push(page = createPage(++realIndex));
        article.append(page.element);
        nonEmptyPage = false;
    }
    for (const line of lines) {
        let lineLevel = Infinity;
        for (; headingIndex < headings.length; headingIndex++) {
            const info = headings[headingIndex];
            const { id, index, orbit } = info;
            if (line.querySelector(`[id=${JSON.stringify(id)}]`) === null) {
                break;
            }
            const level = orbit === 'heading' ? index.length : 0;
            if (lineLevel > level) {
                lineLevel = level;
            }
        }
        if (compiler0 !== undefined && line.children.length > 0) {
            const first = line.children[0];
            if (first.classList.contains('break')) {
                if ((lineLevel <= rightLevel || first.classList.contains('right')) && index0 % 2 === 1) {
                    newPage();
                }
                const info = compiler0.context.idToIndexInfo[first.id];
                if (info !== undefined) {
                    if (info.unit.tag === 'break') {
                        const { index } = info.unit.options;
                        if (typeof index === 'number' && isFinite(index) && index % 1 === 0 && index >= 1) {
                            realIndex = index - 1;
                        }
                    }
                }
                newPage();
            }
            else if (lineLevel <= breakLevel) {
                if (nonEmptyPage) {
                    newPage();
                }
                if (lineLevel <= rightLevel && index0 % 2 === 0) {
                    newPage();
                }
            }
        }
        let cline = line;
        let breakPointOffset = 0;
        while (true) {
            const result = await putLine(cline, page.main, nonEmptyPage, breakPointOffset);
            if (result === undefined) {
                if (cline.childNodes.length > 0 && cline.getBoundingClientRect().height > 0) {
                    nonEmptyPage = true;
                }
                break;
            }
            cline = result.nline;
            breakPointOffset = result.breakPointOffset;
            newPage();
        }
    }
    await fillHeaders(pages);
}
function parseBreakDelay(option) {
    if (typeof option === 'number' && isFinite(option) && option >= 0) {
        return option * 1000;
    }
    return 1000;
}
function parseBreakNum(option) {
    if (typeof option === 'number' && isFinite(option) && option % 1 === 0 && option >= 1) {
        return option;
    }
    return 1;
}
function parseLength(string) {
    if (string.endsWith('px')) {
        return Number(string.slice(0, -2));
    }
    if (string.endsWith('cm')) {
        return Number(string.slice(0, -2)) * 96 / 2.54;
    }
    if (string.endsWith('mm')) {
        return Number(string.slice(0, -2)) * 96 / 25.4;
    }
    if (string.endsWith('in')) {
        return Number(string.slice(0, -2)) * 96;
    }
    if (string.endsWith('pc')) {
        return Number(string.slice(0, -2)) * 16;
    }
    if (string.endsWith('pt')) {
        return Number(string.slice(0, -2)) * 4 / 3;
    }
    return NaN;
}
function setWidthAndHeight(string) {
    if (string.endsWith(' landscape')) {
        setWidthAndHeight(string.slice(0, -10).trim());
        const tmp = width;
        width = height;
        height = tmp;
        return;
    }
    if (string.endsWith(' portrait')) {
        setWidthAndHeight(string.slice(0, -9).trim());
        return;
    }
    if (string === 'A5') {
        width = parseLength('148mm');
        height = parseLength('210mm');
        return;
    }
    if (string === 'A4') {
        width = parseLength('210mm');
        height = parseLength('297mm');
        return;
    }
    if (string === 'A3') {
        width = parseLength('297mm');
        height = parseLength('420mm');
        return;
    }
    if (string === 'B5') {
        width = parseLength('176mm');
        height = parseLength('250mm');
        return;
    }
    if (string === 'B4') {
        width = parseLength('250mm');
        height = parseLength('353mm');
        return;
    }
    if (string === 'JIS-B5') {
        width = parseLength('182mm');
        height = parseLength('257mm');
        return;
    }
    if (string === 'JIS-B4') {
        width = parseLength('257mm');
        height = parseLength('364mm');
        return;
    }
    if (string === 'letter') {
        width = parseLength('8.5in');
        height = parseLength('11in');
        return;
    }
    if (string === 'legal') {
        width = parseLength('8.5in');
        height = parseLength('14in');
        return;
    }
    if (string === 'ledger') {
        width = parseLength('11in');
        height = parseLength('17in');
        return;
    }
    const [width0, height0] = string.trim().split(/\s+/, 2).map(parseLength);
    if (isFinite(width0) && width0 > 0) {
        width = width0;
        if (height0 === undefined) {
            height = width0;
            return;
        }
        if (isFinite(height0) && height0 > 0) {
            height = height0;
        }
    }
}
function setSize(option) {
    if (typeof option !== 'string') {
        return;
    }
    const style = document.createElement('style');
    document.head.append(style);
    setWidthAndHeight(option);
    style.textContent = `@page{size:${width}px ${height}px}body>.lr-struct>main>article{max-width:${width}px}`;
}
function setMargin(option) {
    if (typeof option !== 'string') {
        return;
    }
    const array = option.split(/\s+/, 4);
    if (array.length === 1) {
        marginTop = array[0];
        marginRight = array[0];
        marginBottom = array[0];
        marginLeft = array[0];
        return;
    }
    if (array.length === 2) {
        marginTop = array[0];
        marginRight = array[1];
        marginBottom = array[0];
        marginLeft = array[1];
        return;
    }
    if (array.length === 3) {
        marginTop = array[0];
        marginRight = array[1];
        marginBottom = array[2];
        marginLeft = array[1];
        return;
    }
    marginTop = array[0];
    marginRight = array[1];
    marginBottom = array[2];
    marginLeft = array[3];
}
function setBinging(option) {
    if (typeof option === 'number') {
        binging = option + 'px';
        return;
    }
    if (typeof option === 'string') {
        binging = option;
    }
}
function setHeaderLevel(option) {
    if (typeof option === 'number' && isFinite(option) && option % 1 === 0 && option >= 0) {
        leftHeaderLevel = option;
        rightHeaderLevel = option;
        return;
    }
    if (typeof option !== 'string') {
        return;
    }
    let [left, right] = option.split(/\s+/, 2).map(Number);
    if (isFinite(left) && left % 1 === 0 && left >= 0) {
        leftHeaderLevel = left;
    }
    if (isFinite(right) && right % 1 === 0 && right >= 0) {
        rightHeaderLevel = right;
    }
}
function setRightLevel(option) {
    if (typeof option === 'number' && isFinite(option) && option % 1 === 0 && option >= 0) {
        rightLevel = option;
        if (breakLevel < rightLevel) {
            breakLevel = option;
        }
    }
}
function setBreakLevel(option) {
    if (typeof option === 'number' && isFinite(option) && option % 1 === 0 && option >= rightLevel) {
        breakLevel = option;
    }
}
let paged = false;
const pagedListeners = [];
export const page = async (unit, compiler) => {
    const element = document.createElement('div');
    if (paged) {
        return element;
    }
    paged = true;
    const article = document.body.querySelector('article');
    if (article === null) {
        return element;
    }
    compiler0 = compiler;
    headings = compiler.context.indexInfoArray.filter(val => val.orbit === 'heading' || val.unit.tag === 'title');
    setSize(unit.options.size);
    setMargin(unit.options.margin);
    setBinging(unit.options.binging);
    setHeaderLevel(unit.options['header-level']);
    setRightLevel(unit.options['right-level']);
    setBreakLevel(unit.options['break-level']);
    const breakDelay = parseBreakDelay(unit.options['break-delay']);
    const breakNum = parseBreakNum(unit.options['break-num']);
    const observer = new MutationObserver(async () => {
        if (!element.isConnected) {
            return;
        }
        observer.disconnect();
        await new Promise(r => setTimeout(r, breakDelay));
        const lines = Array.from(article.children);
        for (let i = 0; i < breakNum; i++) {
            await breakToPages(lines, article);
            await new Promise(r => setTimeout(r, 1000));
        }
        for (const listener of pagedListeners) {
            await listener();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return element;
};
function parseDotGap(option) {
    if (typeof option === 'number' && isFinite(option) && option > 0) {
        return option;
    }
    return fontSize;
}
export const contents = async (unit, compiler) => {
    const element = document.createElement('div');
    element.classList.add('breakable');
    const dotGap = parseDotGap(unit.options['dot-gap'] ?? getLastGlobalOption('dot-gap', 'contents', compiler.context.tagToGlobalOptions));
    for (const { unit, orbit, index, id } of headings) {
        if (orbit !== 'heading' || index.length > 3) {
            continue;
        }
        const item = document.createElement('div');
        const indexEle = document.createElement('span');
        const content = document.createElement('span');
        const tail = document.createElement('div');
        const pageIndexEle = document.createElement('a');
        item.classList.add(`level${index.length}`);
        pageIndexEle.href = `#${encodeURIComponent(id)}`;
        element.append(item);
        item.append(indexEle);
        item.append(content);
        item.append(tail);
        tail.append(pageIndexEle);
        indexEle.append(new Text(index.join('.')));
        content.append(await compiler.compileLine(stdnToInlinePlainStringLine(unit.children)));
        pagedListeners.push(async () => {
            pageIndexEle.textContent = idToPageIndex[id] ?? '';
            let { left } = item.getBoundingClientRect();
            const { top, left: right } = pageIndexEle.getBoundingClientRect();
            for (const { right, bottom } of content.getClientRects()) {
                if (bottom >= top && right > left) {
                    left = right;
                }
            }
            if (right <= left) {
                return;
            }
            const fo = element.closest('foreignObject');
            if (fo === null) {
                return;
            }
            const { width } = fo.getBoundingClientRect();
            const total = Math.floor((right - left) * fo.width.animVal.value / width / dotGap);
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('div');
                dot.style.width = `${dotGap}px`;
                pageIndexEle.before(dot);
            }
        });
    }
    return element;
};
export const h0 = async (unit, compiler) => {
    const element = document.createElement('h1');
    element.append(await compiler.compileSTDN(unit.children));
    return element;
};
