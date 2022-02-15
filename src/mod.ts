import type {STDNLine, STDNUnit, STDNUnitOptions} from 'stdn'
import type {Compiler, Context, IndexInfo, UnitCompiler} from '@ddu6/stc'
import {getScale} from 'st-std/dist/common'
import {observeFirstConnect} from 'st-std/dist/observe'
const fontSize = 16
const defaultWidth = parseLength('210mm')
const defaultHeight = parseLength('297mm')
const defaultMarginTop = '.4in'
const defaultMarginRight = '.4in'
const defaultMarginBottom = '.4in'
const defaultMarginLeft = '.4in'
const defaultBinging = '0px'
const defaultLeftHeaderLevel = 0
const defaultRightHeaderLevel = 1
const defaultRightLevel = 0
interface Size {
    width: number
    height: number
}
export function parseLength(option: STDNUnitOptions[string]) {
    if (typeof option !== 'string') {
        return NaN
    }
    if (option.endsWith('px')) {
        return Number(option.slice(0, -2))
    }
    if (option.endsWith('cm')) {
        return Number(option.slice(0, -2)) * 96 / 2.54
    }
    if (option.endsWith('mm')) {
        return Number(option.slice(0, -2)) * 96 / 25.4
    }
    if (option.endsWith('in')) {
        return Number(option.slice(0, -2)) * 96
    }
    if (option.endsWith('pc')) {
        return Number(option.slice(0, -2)) * 16
    }
    if (option.endsWith('pt')) {
        return Number(option.slice(0, -2)) * 4 / 3
    }
    return NaN
}
export function parseSize(option: STDNUnitOptions[string]): Size {
    if (typeof option !== 'string') {
        return {
            width: defaultWidth,
            height: defaultHeight
        }
    }
    if (option.endsWith(' landscape')) {
        const {width, height} = parseSize(option.slice(0, -10).trim())
        return {
            width: height,
            height: width
        }
    }
    if (option.endsWith(' portrait')) {
        return parseSize(option.slice(0, -9).trim())
    }
    if (option === 'A5') {
        return {
            width: parseLength('148mm'),
            height: parseLength('210mm')
        }
    }
    if (option === 'A4') {
        return {
            width: parseLength('210mm'),
            height: parseLength('297mm')
        }
    }
    if (option === 'A3') {
        return {
            width: parseLength('297mm'),
            height: parseLength('420mm')
        }
    }
    if (option === 'B5') {
        return {
            width: parseLength('176mm'),
            height: parseLength('250mm')
        }
    }
    if (option === 'B4') {
        return {
            width: parseLength('250mm'),
            height: parseLength('353mm')
        }
    }
    if (option === 'JIS-B5') {
        return {
            width: parseLength('182mm'),
            height: parseLength('257mm')
        }
    }
    if (option === 'JIS-B4') {
        return {
            width: parseLength('257mm'),
            height: parseLength('364mm')
        }
    }
    if (option === 'letter') {
        return {
            width: parseLength('8.5in'),
            height: parseLength('11in')
        }
    }
    if (option === 'legal') {
        return {
            width: parseLength('8.5in'),
            height: parseLength('14in')
        }
    }
    if (option === 'ledger') {
        return {
            width: parseLength('11in'),
            height: parseLength('17in')
        }
    }
    const [width, height] = option.trim().split(/\s+/, 2).map(parseLength)
    if (isFinite(width) && width > 0) {
        if (height === undefined) {
            return {
                width,
                height: width
            }
        }
        if (isFinite(height) && height > 0) {
            return {
                width,
                height
            }
        }
        return {
            width,
            height: defaultHeight
        }
    }
    if (isFinite(height) && height > 0) {
        return {
            width: defaultWidth,
            height
        }
    }
    return {
        width: defaultWidth,
        height: defaultHeight
    }
}
let style: HTMLStyleElement | undefined
function setSize({width, height}: Size, root: ShadowRoot | undefined) {
    if (root !== undefined) {
        return
    }
    if (style === undefined) {
        style = document.createElement('style')
    }
    const css = `@page {
    margin: 0;
    size: ${width}px ${height}px;
}

body>.lr-struct>main>article {
    max-width: ${width}px;
}`
    if (style.textContent !== css) {
        style.textContent = css
    }
    document.head.append(style)
}
interface Margin {
    marginTop: string,
    marginRight: string,
    marginBottom: string,
    marginLeft: string
}
function parseMargin(option: STDNUnitOptions[string]): Margin {
    if (typeof option !== 'string') {
        return {
            marginTop: defaultMarginTop,
            marginRight: defaultMarginRight,
            marginBottom: defaultMarginBottom,
            marginLeft: defaultMarginLeft
        }
    }
    const array = option.trim().split(/\s+/, 4)
    if (array.length === 1) {
        return {
            marginTop: array[0],
            marginRight: array[0],
            marginBottom: array[0],
            marginLeft: array[0]
        }
    }
    if (array.length === 2) {
        return {
            marginTop: array[0],
            marginRight: array[1],
            marginBottom: array[0],
            marginLeft: array[1]
        }
    }
    if (array.length === 3) {
        return {
            marginTop: array[0],
            marginRight: array[1],
            marginBottom: array[2],
            marginLeft: array[1]
        }
    }
    return {
        marginTop: array[0],
        marginRight: array[1],
        marginBottom: array[2],
        marginLeft: array[3]
    }
}
function parseBinging(option: STDNUnitOptions[string]) {
    if (typeof option === 'number') {
        return `${option}px`
    }
    if (typeof option === 'string') {
        return option
    }
    return defaultBinging
}
function parseHeaderLevel(option: STDNUnitOptions[string]) {
    if (typeof option === 'number' && isFinite(option) && option % 1 === 0 && option >= 0) {
        return {
            leftHeaderLevel: option,
            rightHeaderLevel: option
        }
    }
    if (typeof option !== 'string') {
        return {
            leftHeaderLevel: defaultLeftHeaderLevel,
            rightHeaderLevel: defaultRightHeaderLevel
        }
    }
    const [leftHeaderLevel, rightHeaderLevel] = option.trim().split(/\s+/, 2).map(Number)
    if (isFinite(leftHeaderLevel) && leftHeaderLevel % 1 === 0 && leftHeaderLevel >= 0) {
        if (rightHeaderLevel === undefined) {
            return {
                leftHeaderLevel,
                rightHeaderLevel: leftHeaderLevel
            }
        }
        if (isFinite(rightHeaderLevel) && rightHeaderLevel % 1 === 0 && rightHeaderLevel >= 0) {
            return {
                leftHeaderLevel,
                rightHeaderLevel
            }
        }
        return {
            leftHeaderLevel,
            rightHeaderLevel: defaultRightHeaderLevel
        }
    }
    if (isFinite(rightHeaderLevel) && rightHeaderLevel % 1 === 0 && rightHeaderLevel >= 0) {
        return {
            leftHeaderLevel: defaultLeftHeaderLevel,
            rightHeaderLevel
        }
    }
    return {
        leftHeaderLevel: defaultLeftHeaderLevel,
        rightHeaderLevel: defaultRightHeaderLevel
    }
}
function parseBreakLevel(rightLevel: STDNUnitOptions[string], breakLevel: STDNUnitOptions[string]) {
    if (typeof rightLevel !== 'number' || !isFinite(rightLevel) || rightLevel % 1 !== 0 || rightLevel < 0) {
        rightLevel = defaultRightLevel
    }
    if (typeof breakLevel !== 'number' || !isFinite(breakLevel) || breakLevel % 1 !== 0 || breakLevel < rightLevel) {
        breakLevel = rightLevel
    }
    return {
        rightLevel,
        breakLevel
    }
}
function parseBreakDelay(option: STDNUnitOptions[string]) {
    if (typeof option === 'number' && isFinite(option) && option >= 0) {
        return option * 1000
    }
    return 1000
}
function parseDotGap(option: STDNUnitOptions[string]) {
    if (typeof option === 'number' && isFinite(option) && option > 0) {
        return option
    }
    return 1
}
function extractLineIndexToHeadings(context: Context) {
    const out: (IndexInfo[] | undefined)[] = []
    for (const heading of context.headings) {
        const position = context.unitOrLineToPosition.get(heading.unit)
        if (position === undefined || position.length === 0) {
            continue
        }
        const lineIndex = position[0]
        if (typeof lineIndex !== 'number') {
            continue
        }
        const headings = out[lineIndex]
        if (headings === undefined) {
            out[lineIndex] = [heading]
            continue
        }
        headings.push(heading)
    }
    return out
}
function createPage(index: number, frontIndex: number, size: Size, margin: Margin, binging: string) {
    const left = index % 2 === 0
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    const container = document.createElement('div')
    const header = document.createElement('header')
    const main = document.createElement('main')
    const footer = document.createElement('footer')
    const headingEle = document.createElement('div')
    const indexEle = document.createElement('div')
    const headingIndexEle = document.createElement('span')
    const headingContentEle = document.createElement('span')
    element.append(fo)
    fo.append(container)
    container.append(header)
    container.append(main)
    container.append(footer)
    header.append(headingEle)
    footer.append(indexEle)
    headingEle.append(headingIndexEle)
    headingEle.append(headingContentEle)
    element.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`)
    fo.setAttribute('width', '100%')
    fo.setAttribute('height', '100%')
    container.style.fontSize = `${fontSize}px`
    const innerMargin = `calc(${margin.marginLeft} + ${binging})`
    container.style.marginLeft = left ? margin.marginRight : innerMargin
    container.style.marginRight = left ? innerMargin : margin.marginRight
    header.style.height = margin.marginTop
    main.style.display = 'flow-root'
    main.style.height = `calc(${size.height}px - ${margin.marginTop} - ${margin.marginBottom})`
    footer.style.height = margin.marginBottom
    indexEle.textContent = frontIndex.toString()
    return {
        element,
        headingIndexEle,
        headingContentEle,
        main,
        indexEle,
        index,
        frontIndex
    }
}
type Page = ReturnType<typeof createPage>
function createEnv(options: STDNUnitOptions, context: Context) {
    const elementToPage = new Map<Element, Page | undefined>()
    const pagedListeners: (() => Promise<void>)[] = []
    const pageIndexToHeadings: (IndexInfo[] | undefined)[] = []
    const pages: Page[] = []
    const unitOrLineToPage = new Map<STDNUnit | STDNLine, Page | undefined>()
    return {
        binging: parseBinging(options.binging),
        breakLevel: parseBreakLevel(options['right-level'], options['break-level']),
        elementToPage,
        headerLevel: parseHeaderLevel(options['header-level']),
        lineIndexToHeadings: extractLineIndexToHeadings(context),
        margin: parseMargin(options.margin),
        pagedListeners,
        pageIndexToHeadings,
        pages,
        size: parseSize(options.size),
        unitOrLineToPage
    }
}
type Env = ReturnType<typeof createEnv>
function clipLine(line: Element, start: number, end: number, compiler: Compiler, breakPoints?: NodeListOf<Element>) {
    if (start === 0 && end === Infinity) {
        return
    }
    if (breakPoints === undefined) {
        breakPoints = line.querySelectorAll('.breakable>*')
    }
    const startNode = breakPoints[start - 1]
    const endNode = breakPoints[end - 1]
    if (startNode !== undefined) {
        compiler.dom.removeBefore(startNode, line)
        startNode.remove()
    }
    if (endNode !== undefined) {
        compiler.dom.removeAfter(endNode, line)
    }
}
async function putUnit(unit: STDNUnit, main: Page['main'], start: number, end: number, compiler: Compiler) {
    const line = (await compiler.compileSTDN([[unit]])).children[0]
    clipLine(line, start, end, compiler)
    main.append(line)
}
async function getEnd(unit: STDNUnit, line: Element, main: Page['main'], nonEmptyPage: boolean, start: number, compiler: Compiler) {
    const tmpLine = <Element>line.cloneNode(true)
    const breakPoints = tmpLine.querySelectorAll('.breakable>*')
    clipLine(tmpLine, start, Infinity, compiler, breakPoints)
    main.append(tmpLine)
    if (tmpLine.getBoundingClientRect().bottom <= main.getBoundingClientRect().bottom) {
        tmpLine.remove()
        clipLine(line, start, Infinity, compiler)
        main.append(line)
        return
    }
    for (let i = breakPoints.length; i > start; i--) {
        compiler.dom.removeAfter(breakPoints[i - 1], tmpLine)
        if (tmpLine.getBoundingClientRect().bottom > main.getBoundingClientRect().bottom) {
            continue
        }
        tmpLine.remove()
        await putUnit(unit, main, start, i, compiler)
        return i
    }
    tmpLine.remove()
    if (nonEmptyPage) {
        return start
    }
    clipLine(line, start, Infinity, compiler)
    main.append(line)
}
async function breakToPages(lines: Element[], container: HTMLElement, env: Env, compiler: Compiler) {
    container.innerHTML = ''
    let currentIndex = 1
    let frontIndex = 1
    let page = createPage(currentIndex, frontIndex, env.size, env.margin, env.binging)
    env.pages.push(page)
    container.append(page.element)
    let nonEmptyPage = false
    function newPage() {
        env.pages.push(page = createPage(++currentIndex, ++frontIndex, env.size, env.margin, env.binging))
        container.append(page.element)
        nonEmptyPage = false
    }
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const headings = env.lineIndexToHeadings[i]
        let lineLevel = Infinity
        if (headings !== undefined && headings.length > 0) {
            lineLevel = Math.max(...headings.map(value => value.index.length))
        }
        if (line.children.length > 0) {
            const first = line.children[0]
            if (first.classList.contains('break')) {
                if ((lineLevel <= env.breakLevel.rightLevel || first.classList.contains('right')) && currentIndex % 2 === 1) {
                    newPage()
                }
                const info = compiler.context.idToIndexInfo[first.id]
                if (info !== undefined) {
                    if (info.unit.tag === 'break') {
                        const {index} = info.unit.options
                        if (typeof index === 'number' && isFinite(index) && index % 1 === 0 && index >= 1) {
                            frontIndex = index - 1
                        }
                    }
                }
                newPage()
            } else if (lineLevel <= env.breakLevel.breakLevel) {
                if (nonEmptyPage) {
                    newPage()
                }
                if (lineLevel <= env.breakLevel.rightLevel && currentIndex % 2 === 0) {
                    newPage()
                }
            }
        }
        if (line.children.length === 1 && line.childNodes.length === 1) {
            const info = compiler.context.idToIndexInfo[line.children[0].id]
            if (info !== undefined) {
                let start = 0
                while (true) {
                    const result = await getEnd(info.unit, line, page.main, nonEmptyPage, start, compiler)
                    if (result === undefined) {
                        if (!nonEmptyPage && line.childNodes.length > 0 && line.getBoundingClientRect().height > 0) {
                            nonEmptyPage = true
                        }
                        break
                    }
                    start = result
                    newPage()
                }
                continue
            }
        }
        page.main.append(line)
        if (!nonEmptyPage || line.getBoundingClientRect().bottom <= page.main.getBoundingClientRect().bottom) {
            continue
        }
        newPage()
        page.main.append(line)
        if (line.childNodes.length > 0 && line.getBoundingClientRect().height > 0) {
            nonEmptyPage = true
        }
    }
    setElementToPage(env)
    setUnitOrLineToPage(env, compiler)
    setPageIndexToHeadings(env, compiler.context)
    await fillHeaders(env, compiler)
}
function setElementToPage(env: Env) {
    for (const page of env.pages) {
        const walker = document.createTreeWalker(page.main, NodeFilter.SHOW_ELEMENT)
        while (true) {
            const node = walker.nextNode()
            if (!(node instanceof Element)) {
                break
            }
            env.elementToPage.set(node, page)
        }
    }
}
function setUnitOrLineToPage(env: Env, compiler: Compiler) {
    compiler.unitOrLineToElements.forEach((value, key) => {
        if (value === undefined || value.length === 0) {
            return
        }
        let minIndex = Infinity
        let minPage: Page | undefined
        for (const element of value) {
            const page = env.elementToPage.get(element)
            if (page !== undefined && page.index < minIndex) {
                minIndex = page.index
                minPage = page
            }
        }
        env.unitOrLineToPage.set(key, minPage)
    })
}
function setPageIndexToHeadings(env: Env, context: Context) {
    for (const heading of context.headings) {
        const page = env.unitOrLineToPage.get(heading.unit)
        if (page === undefined) {
            continue
        }
        const headings = env.pageIndexToHeadings[page.index]
        if (headings === undefined) {
            env.pageIndexToHeadings[page.index] = [heading]
            continue
        }
        headings.push(heading)
    }
}
async function fillHeaders(env: Env, compiler: Compiler) {
    const currentHeadings: (IndexInfo | undefined)[] = [compiler.context.titleInfo]
    for (const page of env.pages) {
        const {headingIndexEle, headingContentEle, index} = page
        const headings = env.pageIndexToHeadings[index]
        if (headings !== undefined) {
            for (const heading of headings) {
                for (let i = heading.index.length + 1; i < currentHeadings.length; i++) {
                    currentHeadings[i] = undefined
                }
                currentHeadings[heading.index.length] = heading
            }
        }
        const level = index % 2 === 0 ? env.headerLevel.leftHeaderLevel : env.headerLevel.rightHeaderLevel
        const heading = currentHeadings[level]
        if (heading === undefined) {
            continue
        }
        if (level > 0) {
            headingIndexEle.append(heading.index.join('.'))
        }
        const {abbr} = heading.unit.options
        if (typeof abbr === 'string') {
            headingContentEle.append(abbr)
        } else if (typeof abbr === 'object') {
            headingContentEle.append(await compiler.compileUnit(abbr))
        } else {
            headingContentEle.append(await compiler.compileLine(compiler.base.stdnToInlinePlainStringLine(heading.unit.children)))
        }
    }
}
export const compilerToEnv = new Map<Compiler, Env | undefined>()
export const page: UnitCompiler = async (unit, compiler) => {
    const element = document.createElement('div')
    let env = compilerToEnv.get(compiler)
    if (env !== undefined) {
        return element
    }
    let container: HTMLElement | null
    if (compiler.context.root !== undefined) {
        container = compiler.context.root.querySelector(':host>div')
    } else {
        container = document.body.querySelector(':scope>.lr-struct>main>article')
    }
    if (container === null) {
        return element
    }
    const staticContainer = container
    compilerToEnv.set(compiler, env = createEnv(unit.options, compiler.context))
    setSize(env.size, compiler.context.root)
    const staticEnv = env
    const breakDelay = parseBreakDelay(unit.options['break-delay'])
    observeFirstConnect(async () => {
        await new Promise(r => setTimeout(r, breakDelay))
        await breakToPages(Array.from(staticContainer.children), staticContainer, staticEnv, compiler)
        for (const listener of staticEnv.pagedListeners) {
            await listener()
        }
        staticEnv.pagedListeners=[]
        if (compiler.context.root !== undefined) {
            compiler.context.root.dispatchEvent(new Event('adjust', {bubbles: true, composed: true}))
        }
    }, element, staticContainer)
    return element
}
export const contents: UnitCompiler = async (unit, compiler) => {
    const element = document.createElement('div')
    const env = compilerToEnv.get(compiler)
    if (env === undefined) {
        return element
    }
    element.classList.add('breakable')
    const dotGap = parseDotGap(unit.options['dot-gap'] ?? compiler.context.extractLastGlobalOption('dot-gap', 'contents'))
    for (const {unit, index, id} of compiler.context.headings) {
        const item = document.createElement('div')
        const indexEle = document.createElement('span')
        const content = document.createElement('span')
        const tail = document.createElement('div')
        const pageIndexEle = document.createElement('a')
        item.classList.add(`level${index.length}`)
        pageIndexEle.href = `#${encodeURIComponent(id)}`
        element.append(item)
        item.append(indexEle)
        item.append(content)
        item.append(tail)
        tail.append(pageIndexEle)
        indexEle.append(index.join('.'))
        content.append(await compiler.compileLine(compiler.base.stdnToInlinePlainStringLine(unit.children)))
        env.pagedListeners.push(async () => {
            const page = env.unitOrLineToPage.get(unit)
            if (page !== undefined) {
                pageIndexEle.textContent = page.frontIndex.toString()
            }
            const {widthScale} = getScale(tail)
            if (!isFinite(widthScale)) {
                return
            }
            let {left} = item.getBoundingClientRect()
            const {top, left: right} = pageIndexEle.getBoundingClientRect()
            for (const {right, bottom} of content.getClientRects()) {
                if (bottom >= top && right > left) {
                    left = right
                }
            }
            if (right <= left) {
                return
            }
            const total = Math.floor((right - left) * widthScale / dotGap)
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('div')
                dot.style.width = `${dotGap}em`
                pageIndexEle.before(dot)
            }
        })
    }
    return element
}
export const h0: UnitCompiler = async (unit, compiler) => {
    const element = document.createElement('h1')
    element.append(await compiler.compileSTDN(unit.children))
    return element
}