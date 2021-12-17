import { lineToInlinePlainString } from '@ddu6/stc';
let width = parseLength('210mm');
let height = parseLength('297mm');
let marginTop = '.4in';
let marginRight = '.4in';
let marginBottom = '.4in';
let marginLeft = '.4in';
let leftHeaderLevel = 0;
let rightHeaderLevel = 1;
let breakLevel = 0;
let headings = [];
let compiler0;
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
    const section = document.createElement('div');
    const page = document.createElement('div');
    element.append(fo);
    fo.append(container);
    container.append(header);
    container.append(main);
    container.append(footer);
    header.append(section);
    footer.append(page);
    element.setAttribute('viewBox', `0 0 ${width} ${height}`);
    element.style.fontSize = '16px';
    fo.setAttribute('width', '100%');
    fo.setAttribute('height', '100%');
    container.style.marginLeft = left ? marginRight : marginLeft;
    container.style.marginRight = left ? marginLeft : marginRight;
    header.style.height = marginTop;
    main.style.height = `calc(${height}px - ${marginTop} - ${marginBottom})`;
    footer.style.height = marginBottom;
    page.textContent = index.toString();
    return {
        element,
        section,
        main,
        page
    };
}
async function fillHeader(index, currentHeadings, page) {
    const left = index % 2 === 0;
    const heading = currentHeadings[left ? leftHeaderLevel : rightHeaderLevel];
    if (heading !== undefined && compiler0 !== undefined) {
        let df;
        const { abbr } = heading.unit.options;
        if (typeof abbr === 'object') {
            df = await compiler0.compileLine(stdnToInlinePlainStringLine(abbr));
        }
        else if (typeof abbr === 'string') {
            df = new Text(abbr);
        }
        else {
            df = await compiler0.compileLine(stdnToInlinePlainStringLine(heading.unit.children));
        }
        page.section.append(df);
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
            const level = orbit === 'heading' ? index.length : 0;
            for (let i = level + 1; i < currentHeadings.length; i++) {
                currentHeadings[i] = undefined;
            }
            currentHeadings[level] = info;
        }
        await fillHeader(++index, currentHeadings, page);
    }
}
async function breakToPages(lines, article) {
    article.innerHTML = '';
    let headingIndex = 0;
    let index = 0;
    let page = createPage(++index);
    const pages = [page];
    article.append(page.element);
    let lastHeadingLines = [];
    let nonEmptyPage = false;
    for (const line of lines) {
        let hasHeading = false;
        let lineLevel = Infinity;
        for (; headingIndex < headings.length; headingIndex++) {
            const info = headings[headingIndex];
            const { id, index, orbit } = info;
            if (line.querySelector(`[id=${JSON.stringify(id)}]`) === null) {
                break;
            }
            hasHeading = true;
            const level = orbit === 'heading' ? index.length : 0;
            if (lineLevel > level) {
                lineLevel = level;
            }
        }
        main: {
            normal: {
                if (nonEmptyPage) {
                    if (lineLevel <= breakLevel || line.children.length === 1 && line.children[0].classList.contains('break')) {
                        lastHeadingLines = [];
                        break normal;
                    }
                }
                page.main.append(line);
                if (nonEmptyPage) {
                    if (line.getBoundingClientRect().bottom > page.main.getBoundingClientRect().bottom) {
                        break normal;
                    }
                }
                break main;
            }
            pages.push(page = createPage(++index));
            article.append(page.element);
            if (lastHeadingLines.length > 0) {
                page.main.append(...lastHeadingLines);
                nonEmptyPage = true;
                lastHeadingLines = [];
            }
            else {
                nonEmptyPage = false;
            }
            if (line.childNodes.length > 0) {
                page.main.append(line);
            }
        }
        if (line.childNodes.length > 0 && line.getBoundingClientRect().height > 0) {
            if (hasHeading && nonEmptyPage) {
                lastHeadingLines = [line];
            }
            else {
                lastHeadingLines = [];
            }
            nonEmptyPage = true;
        }
        else if (lastHeadingLines.length > 0) {
            lastHeadingLines.push(line);
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
    if (typeof option === 'number' && isFinite(option) && option >= 1 && option % 1 === 0) {
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
    width = Math.ceil(width);
    height = Math.floor(height);
    style.textContent = `@page{size:${option}}body>.lr-struct>main>article{max-width:${width}px}`;
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
function setHeaderLevel(option) {
    if (typeof option === 'number' && isFinite(option) && option >= 0 && option % 1 === 0) {
        leftHeaderLevel = option;
        rightHeaderLevel = option;
        return;
    }
    if (typeof option !== 'string') {
        return;
    }
    let [left, right] = option.split(/\s+/, 2).map(Number);
    if (isFinite(left) && left >= 0 && left % 1 === 0) {
        leftHeaderLevel = left;
    }
    if (isFinite(right) && right >= 0 && right % 1 === 0) {
        rightHeaderLevel = right;
    }
}
function setBreakLevel(option) {
    if (typeof option === 'number' && isFinite(option) && option >= 0 && option % 1 === 0) {
        breakLevel = option;
    }
}
export const page = async (unit, compiler) => {
    compiler0 = compiler;
    headings = compiler.context.indexInfoArray.filter(val => val.orbit === 'heading' || val.unit.tag === 'title');
    const article = document.body.querySelector('article');
    const breakDelay = parseBreakDelay(unit.options['break-delay']);
    const breakNum = parseBreakNum(unit.options['break-num']);
    setSize(unit.options.size);
    setMargin(unit.options.margin);
    setHeaderLevel(unit.options['header-level']);
    setBreakLevel(unit.options['break-level']);
    const element = document.createElement('div');
    if (article === null) {
        return element;
    }
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
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return element;
};
