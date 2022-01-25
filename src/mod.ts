import type {STDN, STDNUnit, STDNUnitOptions} from 'stdn'
import type {Compiler, IndexInfo, UnitCompiler} from '@ddu6/stc'
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
interface Page {
    element: SVGSVGElement
    headingIndexEle: HTMLSpanElement
    headingContentEle: HTMLSpanElement
    main: HTMLElement
    indexEle: HTMLDivElement
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
function setSize({width, height}: Size, root: Compiler['context']['root']) {
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
function parseMargin(option: STDNUnitOptions[string]) {
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
function stdnToInlinePlainStringLine(stdn: STDN, compiler: Compiler) {
    for (const line of stdn) {
        const string = compiler.base.lineToInlinePlainString(line)
        if (string.length > 0) {
            return line
        }
    }
    return []
}
function removeBefore(node: Node, parent: Node) {
    while (true) {
        while (true) {
            if (node.previousSibling === null) {
                break
            }
            node.previousSibling.remove()
        }
        if (node.parentNode === null || node.parentNode === parent) {
            break
        }
        node = node.parentNode
    }
}
function removeAfter(node: Node, parent: Node) {
    while (true) {
        while (true) {
            if (node.nextSibling === null) {
                break
            }
            node.nextSibling.remove()
        }
        if (node.parentNode === null || node.parentNode === parent) {
            break
        }
        node = node.parentNode
    }
}
function clipLine(line: Element, start: number, end: number, breakPoints?: NodeListOf<Element>) {
    if (start === 0 && end === Infinity) {
        return
    }
    if (breakPoints === undefined) {
        breakPoints = line.querySelectorAll('.breakable>*')
    }
    const startNode = breakPoints[start - 1]
    const endNode = breakPoints[end - 1]
    if (startNode !== undefined) {
        removeBefore(startNode, line)
        startNode.remove()
    }
    if (endNode !== undefined) {
        removeAfter(endNode, line)
    }
}
async function putUnit(unit: STDNUnit, main: Page['main'], start: number, end: number, compiler: Compiler) {
    const line = (await compiler.compileSTDN([[unit]])).children[0]
    clipLine(line, start, end)
    main.append(line)
}
async function getEnd(unit: STDNUnit, line: Element, main: Page['main'], nonEmptyPage: boolean, start: number, compiler: Compiler) {
    const tmpLine = <Element>line.cloneNode(true)
    const breakPoints = tmpLine.querySelectorAll('.breakable>*')
    clipLine(tmpLine, start, Infinity, breakPoints)
    main.append(tmpLine)
    if (tmpLine.getBoundingClientRect().bottom <= main.getBoundingClientRect().bottom) {
        tmpLine.remove()
        clipLine(line, start, Infinity)
        main.append(line)
        return
    }
    for (let i = breakPoints.length; i > start; i--) {
        removeAfter(breakPoints[i - 1], tmpLine)
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
    clipLine(line, start, Infinity)
    main.append(line)
}
interface Env {
    readonly width: number
    readonly height: number
    readonly marginTop: string
    readonly marginRight: string
    readonly marginBottom: string
    readonly marginLeft: string
    readonly binging: string
    readonly leftHeaderLevel: number
    readonly rightHeaderLevel: number
    readonly rightLevel: number
    readonly breakLevel: number
    readonly headings: IndexInfo[]
    readonly idToPageIndex: {
        [key: string]: string | undefined
    }
    readonly pagedListeners: (() => Promise<void>)[]
    readonly compiler: Compiler
}
function createPage(index: number, env: Env): Page {
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
    element.setAttribute('viewBox', `0 0 ${env.width} ${env.height}`)
    fo.setAttribute('width', '100%')
    fo.setAttribute('height', '100%')
    container.style.fontSize = `${fontSize}px`
    const innerMargin = `calc(${env.marginLeft} + ${env.binging})`
    container.style.marginLeft = left ? env.marginRight : innerMargin
    container.style.marginRight = left ? innerMargin : env.marginRight
    header.style.height = env.marginTop
    main.style.display = 'flow-root'
    main.style.height = `calc(${env.height}px - ${env.marginTop} - ${env.marginBottom})`
    footer.style.height = env.marginBottom
    indexEle.textContent = index.toString()
    return {
        element,
        headingIndexEle,
        headingContentEle,
        main,
        indexEle
    }
}
async function fillHeader(index: number, currentHeadings: (IndexInfo | undefined)[], page: Page, env: Env) {
    const left = index % 2 === 0
    const heading = currentHeadings[left ? env.leftHeaderLevel : env.rightHeaderLevel]
    if (heading !== undefined) {
        if (heading.orbit === 'heading') {
            page.headingIndexEle.append(new Text(heading.index.join('.')))
        }
        const {abbr} = heading.unit.options
        if (typeof abbr === 'string') {
            page.headingContentEle.append(new Text(abbr))
        } else if (typeof abbr === 'object') {
            page.headingContentEle.append(await env.compiler.compileLine(stdnToInlinePlainStringLine(abbr, env.compiler)))
        } else {
            page.headingContentEle.append(await env.compiler.compileLine(stdnToInlinePlainStringLine(heading.unit.children, env.compiler)))
        }
    }
}
async function fillHeaders(pages: Page[], env: Env) {
    let rheadings = env.headings
    let currentHeadings: (IndexInfo | undefined)[] = []
    let index = 0
    for (const page of pages) {
        const nrheadings: IndexInfo[] = []
        for (const info of rheadings) {
            const {id, index, orbit} = info
            if (page.main.querySelector(`[id=${JSON.stringify(id)}]`) === null) {
                nrheadings.push(info)
                continue
            }
            env.idToPageIndex[id] = page.indexEle.textContent ?? undefined
            const level = orbit === 'heading' ? index.length : 0
            for (let i = level + 1; i < currentHeadings.length; i++) {
                currentHeadings[i] = undefined
            }
            currentHeadings[level] = info
        }
        rheadings = nrheadings
        await fillHeader(++index, currentHeadings, page, env)
    }
}
async function breakToPages(lines: Element[], container: HTMLElement, env: Env) {
    container.innerHTML = ''
    let rheadings = env.headings
    let index0 = 1
    let realIndex = 1
    let page = createPage(realIndex, env)
    const pages = [page]
    container.append(page.element)
    let nonEmptyPage = false
    function newPage() {
        index0++
        pages.push(page = createPage(++realIndex, env))
        container.append(page.element)
        nonEmptyPage = false
    }
    for (const line of lines) {
        const nrheadings: IndexInfo[] = []
        let lineLevel = Infinity
        for (const info of rheadings) {
            const {id, index, orbit} = info
            if (line.querySelector(`[id=${JSON.stringify(id)}]`) === null) {
                nrheadings.push(info)
                continue
            }
            const level = orbit === 'heading' ? index.length : 0
            if (lineLevel > level) {
                lineLevel = level
            }
        }
        rheadings = nrheadings
        if (line.children.length > 0) {
            const first = line.children[0]
            if (first.classList.contains('break')) {
                if ((lineLevel <= env.rightLevel || first.classList.contains('right')) && index0 % 2 === 1) {
                    newPage()
                }
                const info = env.compiler.context.idToIndexInfo[first.id]
                if (info !== undefined) {
                    if (info.unit.tag === 'break') {
                        const {index} = info.unit.options
                        if (typeof index === 'number' && isFinite(index) && index % 1 === 0 && index >= 1) {
                            realIndex = index - 1
                        }
                    }
                }
                newPage()
            } else if (lineLevel <= env.breakLevel) {
                if (nonEmptyPage) {
                    newPage()
                }
                if (lineLevel <= env.rightLevel && index0 % 2 === 0) {
                    newPage()
                }
            }
        }
        if (line.children.length === 1 && line.childNodes.length === 1) {
            const info = env.compiler.context.idToIndexInfo[line.children[0].id]
            if (info !== undefined) {
                let start = 0
                while (true) {
                    const result = await getEnd(info.unit, line, page.main, nonEmptyPage, start, env.compiler)
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
    await fillHeaders(pages, env)
}
const compilerToEnv = new Map<Compiler, Env | undefined>()
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
    const size = parseSize(unit.options.size)
    const {marginTop, marginRight, marginBottom, marginLeft} = parseMargin(unit.options.margin)
    const {leftHeaderLevel, rightHeaderLevel} = parseHeaderLevel(unit.options['header-level'])
    const {rightLevel, breakLevel} = parseBreakLevel(unit.options['right-level'], unit.options['break-level'])
    compilerToEnv.set(compiler, env = {
        width: size.width,
        height: size.height,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        binging: parseBinging(unit.options.binging),
        leftHeaderLevel,
        rightHeaderLevel,
        rightLevel,
        breakLevel,
        headings: compiler.context.indexInfoArray.filter(value => value.orbit === 'heading' || value.unit.tag === 'title'),
        idToPageIndex: {},
        pagedListeners: [],
        compiler
    })
    setSize(size, compiler.context.root)
    const staticEnv = env
    const breakDelay = parseBreakDelay(unit.options['break-delay'])
    observeFirstConnect(async () => {
        await new Promise(r => setTimeout(r, breakDelay))
        await breakToPages(Array.from(staticContainer.children), staticContainer, staticEnv)
        for (const listener of staticEnv.pagedListeners) {
            await listener()
        }
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
    const dotGap = parseDotGap(unit.options['dot-gap'] ?? compiler.extractor.extractLastGlobalOption('dot-gap', 'contents', compiler.context.tagToGlobalOptions))
    for (const {unit, orbit, index, id} of env.headings) {
        if (orbit !== 'heading' || index.length > 3) {
            continue
        }
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
        indexEle.append(new Text(index.join('.')))
        content.append(await compiler.compileLine(stdnToInlinePlainStringLine(unit.children, compiler)))
        env.pagedListeners.push(async () => {
            pageIndexEle.textContent = env.idToPageIndex[id] ?? ''
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