var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};function n(e){const t=Number(getComputedStyle(e).fontSize.slice(0,-2));let n=1/t,i=1/t;const o=e.closest("foreignObject");if(null!==o){const{height:e,width:t}=o.getBoundingClientRect();n*=o.height.animVal.value/e,i*=o.width.animVal.value/t}return{heightScale:n,widthScale:i}}e.d(t,{i0:()=>h,IQ:()=>p,h0:()=>f,Md:()=>u,$F:()=>r,_8:()=>a});const i=r("210mm"),o=r("297mm");function r(e){return"string"!=typeof e?NaN:e.endsWith("px")?Number(e.slice(0,-2)):e.endsWith("cm")?96*Number(e.slice(0,-2))/2.54:e.endsWith("mm")?96*Number(e.slice(0,-2))/25.4:e.endsWith("in")?96*Number(e.slice(0,-2)):e.endsWith("pc")?16*Number(e.slice(0,-2)):e.endsWith("pt")?4*Number(e.slice(0,-2))/3:NaN}function a(e){if("string"!=typeof e)return{width:i,height:o};if(e.endsWith(" landscape")){const{width:t,height:n}=a(e.slice(0,-10).trim());return{width:n,height:t}}if(e.endsWith(" portrait"))return a(e.slice(0,-9).trim());if("A5"===e)return{width:r("148mm"),height:r("210mm")};if("A4"===e)return{width:r("210mm"),height:r("297mm")};if("A3"===e)return{width:r("297mm"),height:r("420mm")};if("B5"===e)return{width:r("176mm"),height:r("250mm")};if("B4"===e)return{width:r("250mm"),height:r("353mm")};if("JIS-B5"===e)return{width:r("182mm"),height:r("257mm")};if("JIS-B4"===e)return{width:r("257mm"),height:r("364mm")};if("letter"===e)return{width:r("8.5in"),height:r("11in")};if("legal"===e)return{width:r("8.5in"),height:r("14in")};if("ledger"===e)return{width:r("11in"),height:r("17in")};const[t,n]=e.trim().split(/\s+/,2).map(r);return isFinite(t)&&t>0?void 0===n?{width:t,height:t}:isFinite(n)&&n>0?{width:t,height:n}:{width:t,height:o}:isFinite(n)&&n>0?{width:i,height:n}:{width:i,height:o}}let d;function c(e){const t=[];for(const n of e.headings){const i=e.unitOrLineToPosition.get(n.unit);if(void 0===i||0===i.length)continue;const o=i[0];if("number"!=typeof o)continue;const r=t[o];void 0!==r?r.push(n):t[o]=[n]}return t}function l(e,t,n){const i=e%2==0,o=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),a=document.createElement("div"),d=document.createElement("header"),c=document.createElement("main"),l=document.createElement("footer"),s=document.createElement("div"),g=document.createElement("div"),m=document.createElement("span"),h=document.createElement("span");o.append(r),r.append(a),a.append(d),a.append(c),a.append(l),d.append(s),l.append(g),s.append(m),s.append(h),o.setAttribute("viewBox",`0 0 ${n.size.width} ${n.size.height}`),r.setAttribute("width","100%"),r.setAttribute("height","100%"),a.style.fontSize="16px";const u=`calc(${n.marginLeft} + ${n.binging})`;return a.style.marginLeft=i?n.marginRight:u,a.style.marginRight=i?u:n.marginRight,d.style.height=n.marginTop,c.style.display="flow-root",c.style.height=`calc(${n.size.height}px - ${n.marginTop} - ${n.marginBottom})`,l.style.height=n.marginBottom,g.textContent=t.toString(),{element:o,headingIndexEle:m,headingContentEle:h,main:c,indexEle:g,index:e,frontIndex:t}}function s(e,t,n,i,o){if(0===t&&n===1/0)return;void 0===o&&(o=e.querySelectorAll(".breakable>*"));const r=o[t-1],a=o[n-1];void 0!==r&&(i.dom.removeBefore(r,e),r.remove()),void 0!==a&&i.dom.removeAfter(a,e)}async function g(e,t,n,i,o){const r=(await o.compileSTDN([[e]])).children[0];s(r,n,i,o),t.append(r)}async function m(e,t,n,i,o,r){const a=t.cloneNode(!0),d=a.querySelectorAll(".breakable>*");if(s(a,o,1/0,r,d),n.append(a),a.getBoundingClientRect().bottom<=n.getBoundingClientRect().bottom)return a.remove(),s(t,o,1/0,r),void n.append(t);for(let t=d.length;t>o;t--)if(r.dom.removeAfter(d[t-1],a),!(a.getBoundingClientRect().bottom>n.getBoundingClientRect().bottom))return a.remove(),await g(e,n,o,t,r),t;if(a.remove(),i)return o;s(t,o,1/0,r),n.append(t)}const h=new Map,u=async(e,t)=>{const n=document.createElement("div");let i,o=h.get(t);if(void 0!==o)return n;if(i=void 0!==t.context.root?t.context.root.querySelector(":host>div"):document.body.querySelector(":scope>.lr-struct>main>article"),null===i)return n;const r=i;h.set(t,o=function(e,t){const{marginTop:n,marginRight:i,marginBottom:o,marginLeft:r}=function(e){if("string"!=typeof e)return{marginTop:".4in",marginRight:".4in",marginBottom:".4in",marginLeft:".4in"};const t=e.trim().split(/\s+/,4);return 1===t.length?{marginTop:t[0],marginRight:t[0],marginBottom:t[0],marginLeft:t[0]}:2===t.length?{marginTop:t[0],marginRight:t[1],marginBottom:t[0],marginLeft:t[1]}:3===t.length?{marginTop:t[0],marginRight:t[1],marginBottom:t[2],marginLeft:t[1]}:{marginTop:t[0],marginRight:t[1],marginBottom:t[2],marginLeft:t[3]}}(e.margin),{leftHeaderLevel:d,rightHeaderLevel:l}=function(e){if("number"==typeof e&&isFinite(e)&&e%1==0&&e>=0)return{leftHeaderLevel:e,rightHeaderLevel:e};if("string"!=typeof e)return{leftHeaderLevel:0,rightHeaderLevel:1};const[t,n]=e.trim().split(/\s+/,2).map(Number);return isFinite(t)&&t%1==0&&t>=0?void 0===n?{leftHeaderLevel:t,rightHeaderLevel:t}:isFinite(n)&&n%1==0&&n>=0?{leftHeaderLevel:t,rightHeaderLevel:n}:{leftHeaderLevel:t,rightHeaderLevel:1}:isFinite(n)&&n%1==0&&n>=0?{leftHeaderLevel:0,rightHeaderLevel:n}:{leftHeaderLevel:0,rightHeaderLevel:1}}(e["header-level"]),{rightLevel:s,breakLevel:g}=function(e,t){return("number"!=typeof e||!isFinite(e)||e%1!=0||e<0)&&(e=0),("number"!=typeof t||!isFinite(t)||t%1!=0||t<e)&&(t=e),{rightLevel:e,breakLevel:t}}(e["right-level"],e["break-level"]),m=new Map,h=new Map;return{binging:(u=e.binging,"number"==typeof u?`${u}px`:"string"==typeof u?u:"0px"),breakLevel:g,elementToPage:m,leftHeaderLevel:d,lineIndexToHeadings:c(t),marginBottom:o,marginLeft:r,marginRight:i,marginTop:n,pagedListeners:[],pageIndexToHeadings:[],pages:[],rightHeaderLevel:l,rightLevel:s,size:a(e.size),unitOrLineToPage:h};var u}(e.options,t.context)),function({width:e,height:t},n){if(void 0!==n)return;void 0===d&&(d=document.createElement("style"));const i=`@page {\n    margin: 0;\n    size: ${e}px ${t}px;\n}\n\nbody>.lr-struct>main>article {\n    max-width: ${e}px;\n}`;d.textContent!==i&&(d.textContent=i),document.head.append(d)}(o.size,t.context.root);const s=o,g="number"==typeof(u=e.options["break-delay"])&&isFinite(u)&&u>=0?1e3*u:1e3;var u;return function(e,t,n){const i=new MutationObserver(d),o=window.setInterval(d,1e3);let r,a=!1;async function d(){t.isConnected&&!a&&(a=!0,i.disconnect(),clearInterval(o),await e())}r=void 0===n?document.body.querySelector(":scope>.lr-struct>main>article"):n instanceof ShadowRoot?n.querySelector(":host>div"):n,null===r&&(r=document.body),i.observe(r,{childList:!0,subtree:!0})}((async()=>{await new Promise((e=>setTimeout(e,g))),await async function(e,t,n,i){t.innerHTML="";let o=1,r=1,a=l(o,r,n);n.pages.push(a),t.append(a.element);let d=!1;function c(){n.pages.push(a=l(++o,++r,n)),t.append(a.element),d=!1}for(let t=0;t<e.length;t++){const l=e[t],s=n.lineIndexToHeadings[t];let g=1/0;if(void 0!==s&&s.length>0&&(g=Math.max(...s.map((e=>e.index.length)))),l.children.length>0){const e=l.children[0];if(e.classList.contains("break")){(g<=n.rightLevel||e.classList.contains("right"))&&o%2==1&&c();const t=i.context.idToIndexInfo[e.id];if(void 0!==t&&"break"===t.unit.tag){const{index:e}=t.unit.options;"number"==typeof e&&isFinite(e)&&e%1==0&&e>=1&&(r=e-1)}c()}else g<=n.breakLevel&&(d&&c(),g<=n.rightLevel&&o%2==0&&c())}if(1===l.children.length&&1===l.childNodes.length){const e=i.context.idToIndexInfo[l.children[0].id];if(void 0!==e){let t=0;for(;;){const n=await m(e.unit,l,a.main,d,t,i);if(void 0===n){!d&&l.childNodes.length>0&&l.getBoundingClientRect().height>0&&(d=!0);break}t=n,c()}continue}}a.main.append(l),!d||l.getBoundingClientRect().bottom<=a.main.getBoundingClientRect().bottom||(c(),a.main.append(l),l.childNodes.length>0&&l.getBoundingClientRect().height>0&&(d=!0))}!function(e){for(const t of e.pages){const n=document.createTreeWalker(t.main,NodeFilter.SHOW_ELEMENT);for(;;){const i=n.nextNode();if(!(i instanceof Element))break;e.elementToPage.set(i,t)}}}(n),function(e,t){t.unitOrLineToElements.forEach(((t,n)=>{void 0!==t&&t.length>0&&e.unitOrLineToPage.set(n,e.elementToPage.get(t[0]))}))}(n,i),function(e,t){for(const n of t.headings){const t=e.unitOrLineToPage.get(n.unit);if(void 0===t)continue;const i=e.pageIndexToHeadings[t.index];void 0!==i?i.push(n):e.pageIndexToHeadings[t.index]=[n]}}(n,i.context),await async function(e,t){for(const n of e.pages){const{headingIndexEle:i,headingContentEle:o,index:r}=n,a=e.pageIndexToHeadings[r];if(void 0===a)continue;const d=r%2==0?e.leftHeaderLevel:e.rightHeaderLevel;let c=t.context.titleInfo;if(d>0&&(c=a.find((e=>e.index.length===d))),void 0===c)continue;d>0&&i.append(new Text(c.index.join(".")));const{abbr:l}=c.unit.options;"string"==typeof l?o.append(new Text(l)):"object"==typeof l?o.append(await t.compileUnit(l)):o.append(await t.compileLine(t.base.stdnToInlinePlainStringLine(c.unit.children)))}}(n,i)}(Array.from(r.children),r,s,t);for(const e of s.pagedListeners)await e();void 0!==t.context.root&&t.context.root.dispatchEvent(new Event("adjust",{bubbles:!0,composed:!0}))}),n,r),n},p=async(e,t)=>{const i=document.createElement("div"),o=h.get(t);if(void 0===o)return i;i.classList.add("breakable");const r="number"==typeof(a=e.options["dot-gap"]??t.context.extractLastGlobalOption("dot-gap","contents"))&&isFinite(a)&&a>0?a:1;var a;for(const{unit:e,index:a,id:d}of t.context.headings){const c=document.createElement("div"),l=document.createElement("span"),s=document.createElement("span"),g=document.createElement("div"),m=document.createElement("a");c.classList.add(`level${a.length}`),m.href=`#${encodeURIComponent(d)}`,i.append(c),c.append(l),c.append(s),c.append(g),g.append(m),l.append(new Text(a.join("."))),s.append(await t.compileLine(t.base.stdnToInlinePlainStringLine(e.children))),o.pagedListeners.push((async()=>{const t=o.unitOrLineToPage.get(e);void 0!==t&&(m.textContent=t.frontIndex.toString());const{widthScale:i}=n(g);if(!isFinite(i))return;let{left:a}=c.getBoundingClientRect();const{top:d,left:l}=m.getBoundingClientRect();for(const{right:e,bottom:t}of s.getClientRects())t>=d&&e>a&&(a=e);if(l<=a)return;const h=Math.floor((l-a)*i/r);for(let e=0;e<h;e++){const e=document.createElement("div");e.style.width=`${r}em`,m.before(e)}}))}return i},f=async(e,t)=>{const n=document.createElement("h1");return n.append(await t.compileSTDN(e.children)),n};var v=t.i0,b=t.IQ,w=t.h0,L=t.Md,x=t.$F,y=t._8;export{v as compilerToEnv,b as contents,w as h0,L as page,x as parseLength,y as parseSize};