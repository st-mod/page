var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{$F:()=>r,_8:()=>o,Md:()=>u,IQ:()=>f,h0:()=>v});const n=r("210mm"),i=r("297mm");function r(e){return"string"!=typeof e?NaN:e.endsWith("px")?Number(e.slice(0,-2)):e.endsWith("cm")?96*Number(e.slice(0,-2))/2.54:e.endsWith("mm")?96*Number(e.slice(0,-2))/25.4:e.endsWith("in")?96*Number(e.slice(0,-2)):e.endsWith("pc")?16*Number(e.slice(0,-2)):e.endsWith("pt")?4*Number(e.slice(0,-2))/3:NaN}function o(e){if("string"!=typeof e)return{width:n,height:i};if(e.endsWith(" landscape")){const{width:t,height:n}=o(e.slice(0,-10).trim());return{width:n,height:t}}if(e.endsWith(" portrait"))return o(e.slice(0,-9).trim());if("A5"===e)return{width:r("148mm"),height:r("210mm")};if("A4"===e)return{width:r("210mm"),height:r("297mm")};if("A3"===e)return{width:r("297mm"),height:r("420mm")};if("B5"===e)return{width:r("176mm"),height:r("250mm")};if("B4"===e)return{width:r("250mm"),height:r("353mm")};if("JIS-B5"===e)return{width:r("182mm"),height:r("257mm")};if("JIS-B4"===e)return{width:r("257mm"),height:r("364mm")};if("letter"===e)return{width:r("8.5in"),height:r("11in")};if("legal"===e)return{width:r("8.5in"),height:r("14in")};if("ledger"===e)return{width:r("11in"),height:r("17in")};const[t,a]=e.trim().split(/\s+/,2).map(r);return isFinite(t)&&t>0?void 0===a?{width:t,height:t}:isFinite(a)&&a>0?{width:t,height:a}:{width:t,height:i}:isFinite(a)&&a>0?{width:n,height:a}:{width:n,height:i}}const a=new Map;function l(e,t){for(const n of e)if(t.base.lineToInlinePlainString(n).length>0)return n;return[]}function d(e,t){for(;;){for(;null!==e.previousSibling;)e.previousSibling.remove();if(null===e.parentNode||e.parentNode===t)break;e=e.parentNode}}function c(e,t){for(;;){for(;null!==e.nextSibling;)e.nextSibling.remove();if(null===e.parentNode||e.parentNode===t)break;e=e.parentNode}}async function s(e,t,n,i,r){if(t.append(e),e.getBoundingClientRect().bottom<=t.getBoundingClientRect().bottom)return;function o(){if(n)return e.remove(),{nline:e,breakPointOffset:i}}if(1!==e.children.length||1!==e.childNodes.length)return o();const a=r.context.idToIndexInfo[e.children[0].id];if(void 0===a)return o();const l=e.querySelectorAll(".breakable>*");if(0===l.length)return o();for(let n=l.length-1;n>=0;n--){if(c(l[n],e),e.getBoundingClientRect().bottom>t.getBoundingClientRect().bottom)continue;const o=(await r.compileSTDN([[a.unit]])).children[0],s=o.querySelectorAll(".breakable>*")[i+n];if(void 0===s)return;return d(s,o),s.remove(),{nline:o,breakPointOffset:i+n+1}}e.remove();const s=(await r.compileSTDN([[a.unit]])).children[0];if(i>0){const e=s.querySelectorAll(".breakable>*")[i-1];if(void 0===e)return;d(e,s),e.remove()}if(n)return{nline:s,breakPointOffset:i};t.append(s)}function m(e,t){const n=e%2==0,i=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),o=document.createElement("div"),a=document.createElement("header"),l=document.createElement("main"),d=document.createElement("footer"),c=document.createElement("div"),s=document.createElement("div"),m=document.createElement("span"),g=document.createElement("span");i.append(r),r.append(o),o.append(a),o.append(l),o.append(d),a.append(c),d.append(s),c.append(m),c.append(g),i.setAttribute("viewBox",`0 0 ${t.width} ${t.height}`),r.setAttribute("width","100%"),r.setAttribute("height","100%"),o.style.fontSize="16px";const h=`calc(${t.marginLeft} + ${t.binging})`;return o.style.marginLeft=n?t.marginRight:h,o.style.marginRight=n?h:t.marginRight,a.style.height=t.marginTop,l.style.display="flow-root",l.style.height=`calc(${t.height}px - ${t.marginTop} - ${t.marginBottom})`,d.style.height=t.marginBottom,s.textContent=e.toString(),{element:i,headingIndexEle:m,headingContentEle:g,main:l,indexEle:s}}async function g(e,t,n,i){const r=t[e%2==0?i.leftHeaderLevel:i.rightHeaderLevel];if(void 0!==r){"heading"===r.orbit&&n.headingIndexEle.append(new Text(r.index.join(".")));const{abbr:e}=r.unit.options;"string"==typeof e?n.headingContentEle.append(new Text(e)):"object"==typeof e?n.headingContentEle.append(await i.compiler.compileLine(l(e,i.compiler))):n.headingContentEle.append(await i.compiler.compileLine(l(r.unit.children,i.compiler)))}}async function h(e,t,n){t.innerHTML="";let i=n.headings,r=1,o=1,a=m(o,n);const l=[a];t.append(a.element);let d=!1;function c(){r++,l.push(a=m(++o,n)),t.append(a.element),d=!1}for(const t of e){const e=[];let l=1/0;for(const n of i){const{id:i,index:r,orbit:o}=n;if(null===t.querySelector(`[id=${JSON.stringify(i)}]`)){e.push(n);continue}const a="heading"===o?r.length:0;l>a&&(l=a)}if(i=e,t.children.length>0){const e=t.children[0];if(e.classList.contains("break")){(l<=n.rightLevel||e.classList.contains("right"))&&r%2==1&&c();const t=n.compiler.context.idToIndexInfo[e.id];if(void 0!==t&&"break"===t.unit.tag){const{index:e}=t.unit.options;"number"==typeof e&&isFinite(e)&&e%1==0&&e>=1&&(o=e-1)}c()}else l<=n.breakLevel&&(d&&c(),l<=n.rightLevel&&r%2==0&&c())}let m=t,g=0;for(;;){const e=await s(m,a.main,d,g,n.compiler);if(void 0===e){m.childNodes.length>0&&m.getBoundingClientRect().height>0&&(d=!0);break}m=e.nline,g=e.breakPointOffset,c()}}await async function(e,t){let n=t.headings,i=[],r=0;for(const o of e){const e=[];for(const r of n){const{id:n,index:a,orbit:l}=r;if(null===o.main.querySelector(`[id=${JSON.stringify(n)}]`)){e.push(r);continue}t.idToPageIndex[n]=o.indexEle.textContent??void 0;const d="heading"===l?a.length:0;for(let e=d+1;e<i.length;e++)i[e]=void 0;i[d]=r}n=e,await g(++r,i,o,t)}}(l,n)}const p=new Map,u=async(e,t)=>{const n=document.createElement("div");let i,r=p.get(t);if(void 0!==r)return n;if(i=t.context.root instanceof ShadowRoot?t.context.root.querySelector(":host>div"):t.context.root.document.body.querySelector("body>.lr-struct>main>article"),null===i)return n;const l=i,d=o(e.options.size),{marginTop:c,marginRight:s,marginBottom:m,marginLeft:g}=function(e){if("string"!=typeof e)return{marginTop:".4in",marginRight:".4in",marginBottom:".4in",marginLeft:".4in"};const t=e.trim().split(/\s+/,4);return 1===t.length?{marginTop:t[0],marginRight:t[0],marginBottom:t[0],marginLeft:t[0]}:2===t.length?{marginTop:t[0],marginRight:t[1],marginBottom:t[0],marginLeft:t[1]}:3===t.length?{marginTop:t[0],marginRight:t[1],marginBottom:t[2],marginLeft:t[1]}:{marginTop:t[0],marginRight:t[1],marginBottom:t[2],marginLeft:t[3]}}(e.options.margin),{leftHeaderLevel:u,rightHeaderLevel:f}=function(e){if("number"==typeof e&&isFinite(e)&&e%1==0&&e>=0)return{leftHeaderLevel:e,rightHeaderLevel:e};if("string"!=typeof e)return{leftHeaderLevel:0,rightHeaderLevel:1};const[t,n]=e.trim().split(/\s+/,2).map(Number);return isFinite(t)&&t%1==0&&t>=0?void 0===n?{leftHeaderLevel:t,rightHeaderLevel:t}:isFinite(n)&&n%1==0&&n>=0?{leftHeaderLevel:t,rightHeaderLevel:n}:{leftHeaderLevel:t,rightHeaderLevel:1}:isFinite(n)&&n%1==0&&n>=0?{leftHeaderLevel:0,rightHeaderLevel:n}:{leftHeaderLevel:0,rightHeaderLevel:1}}(e.options["header-level"]),{rightLevel:v,breakLevel:b}=function(e,t){return("number"!=typeof e||!isFinite(e)||e%1!=0||e<0)&&(e=0),("number"!=typeof t||!isFinite(t)||t%1!=0||t<e)&&(t=e),{rightLevel:e,breakLevel:t}}(e.options["right-level"],e.options["break-level"]);var w;p.set(t,r={width:d.width,height:d.height,marginTop:c,marginRight:s,marginBottom:m,marginLeft:g,binging:(w=e.options.binging,"number"==typeof w?w+"px":"string"==typeof w?w:"0px"),leftHeaderLevel:u,rightHeaderLevel:f,rightLevel:v,breakLevel:b,headings:t.context.indexInfoArray.filter((e=>"heading"===e.orbit||"title"===e.unit.tag)),idToPageIndex:{},pagedListeners:[],compiler:t}),function({width:e,height:t},n){if(n instanceof ShadowRoot||a.get(n))return;a.set(n,!0);const i=document.createElement("style");i.textContent=`@page {\n        margin: 0;\n        size: ${e}px ${t}px;\n    }\n    \n    body>.lr-struct>main>article {\n        max-width: ${e}px;\n    }`,n.document.head.append(i)}(d,t.context.root);const y=r,L=function(e){return"number"==typeof e&&isFinite(e)&&e>=0?1e3*e:1e3}(e.options["break-delay"]),x=function(e){return"number"==typeof e&&isFinite(e)&&e%1==0&&e>=1?e:1}(e.options["break-num"]);let E,N,S=!1;const T=async()=>{if(!n.isConnected||S)return;S=!0,void 0!==E&&E.disconnect(),void 0!==N&&clearInterval(N),await new Promise((e=>setTimeout(e,L)));const e=Array.from(l.children);for(let t=0;t<x;t++)await h(e,l,y),await new Promise((e=>setTimeout(e,1e3)));for(const e of y.pagedListeners)await e()};return E=new MutationObserver(T),N=window.setInterval(T,1e3),E.observe(l,{childList:!0,subtree:!0}),n},f=async(e,t)=>{const n=document.createElement("div"),i=p.get(t);if(void 0===i)return n;n.classList.add("breakable");const r="number"==typeof(o=e.options["dot-gap"]??t.extractor.extractLastGlobalOption("dot-gap","contents",t.context.tagToGlobalOptions))&&isFinite(o)&&o>0?o:16;var o;for(const{unit:e,orbit:o,index:a,id:d}of i.headings){if("heading"!==o||a.length>3)continue;const c=document.createElement("div"),s=document.createElement("span"),m=document.createElement("span"),g=document.createElement("div"),h=document.createElement("a");c.classList.add(`level${a.length}`),h.href=`#${encodeURIComponent(d)}`,n.append(c),c.append(s),c.append(m),c.append(g),g.append(h),s.append(new Text(a.join("."))),m.append(await t.compileLine(l(e.children,t))),i.pagedListeners.push((async()=>{h.textContent=i.idToPageIndex[d]??"";let{left:e}=c.getBoundingClientRect();const{top:t,left:o}=h.getBoundingClientRect();for(const{right:n,bottom:i}of m.getClientRects())i>=t&&n>e&&(e=n);if(o<=e)return;const a=n.closest("foreignObject");if(null===a)return;const{width:l}=a.getBoundingClientRect(),s=Math.floor((o-e)*a.width.animVal.value/l/r);for(let e=0;e<s;e++){const e=document.createElement("div");e.style.width=`${r}px`,h.before(e)}}))}return n},v=async(e,t)=>{const n=document.createElement("h1");return n.append(await t.compileSTDN(e.children)),n};var b=t.IQ,w=t.h0,y=t.Md,L=t.$F,x=t._8;export{b as contents,w as h0,y as page,L as parseLength,x as parseSize};