var e={400:(e,t,n)=>{n(650)},650:(e,t)=>{function n(e,t,n=!1){let i=0,o=!1,r=!1,s=0,l=!1,a=[];const c=[];for(let d=0;d<e.length;d++){if(!0===r){r=!1;continue}const u=e[d];if("line"!==l)if("block"!==l)if("'"!==u){if(o){if("\\"===u){r=!0;continue}}else if("{"!==u&&"["!==u)if("}"!==u&&"]"!==u){if(!(i>0))if(","!==u&&"\n"!==u){if(!(s<d))if(0!==u.trimEnd().length){if("/"===u){const t=e[d+1];if("/"===t){s=d,d++,l="line";continue}if("*"===t){s=d,d++,l="block";continue}}}else s=d+1}else{const n=e.slice(s,d).trimEnd();n.length>0&&(c.push({value:n,index:t+s,comment:a.join("\n")}),a=[]),s=d+1}}else{if(i--,i<0){const n=e.slice(s,d).trimEnd();n.length>0&&(c.push({value:n,index:t+s,comment:a.join("\n")}),a=[]);break}0===i&&(c.push({value:e.slice(s,d+1),index:t+s,comment:a.join("\n")}),a=[],s=d+1)}else if(i++,1===i&&!n){const n=e.slice(s,d).trimEnd();n.length>0&&(c.push({value:n,index:t+s,comment:a.join("\n")}),a=[]),s=d}}else{if(!o){if(o=!0,0===i&&!n){const n=e.slice(s,d).trimEnd();n.length>0&&(c.push({value:n,index:t+s,comment:a.join("\n")}),a=[]),s=d}continue}o=!1,0===i&&(c.push({value:e.slice(s,d+1),index:t+s,comment:a.join("\n")}),a=[],s=d+1)}else"*"===u&&"/"===e[d+1]&&(d++,l=!1,a.push(e.slice(s,d+1).replace(/\n[ ]*/g,"\n ")),s=d+1);else"\n"===u&&(l=!1,a.push(e.slice(s,d).trimEnd()),s=d+1)}if(!o&&0===i&&!1===l){const n=e.slice(s).trimEnd();n.length>0&&c.push({value:n,index:t+s,comment:a.join("\n")})}return c}function i(e,t=!1){let n=0,i=!1,o=!1,r=0,s=!1;const l=[];for(let a=0;a<e.length;a++){if(!0===o){o=!1;continue}const c=e[a];if("line"!==s)if("block"!==s)if("'"!==c){if(i){if("\\"===c){o=!0;continue}}else if("{"!==c&&"["!==c)if("}"!==c&&"]"!==c){if(!(n>0))if(","!==c&&"\n"!==c){if(!(r<a))if(0!==c.trimEnd().length){if("/"===c){const t=e[a+1];if("/"===t){a++,s="line",r=a+1;continue}if("*"===t){a++,s="block",r=a+1;continue}}}else r=a+1}else{const t=e.slice(r,a).trimEnd();t.length>0&&l.push(t),r=a+1}}else{if(n--,n<0){const t=e.slice(r,a).trimEnd();t.length>0&&l.push(t);break}0===n&&(l.push(e.slice(r,a+1)),r=a+1)}else if(n++,1===n&&!t){const t=e.slice(r,a).trimEnd();t.length>0&&l.push(t),r=a}}else{if(!i){if(i=!0,0===n&&!t){const t=e.slice(r,a).trimEnd();t.length>0&&l.push(t),r=a}continue}i=!1,0===n&&(l.push(e.slice(r,a+1)),r=a+1)}else"*"===c&&"/"===e[a+1]&&(a++,s=!1),r=a+1;else"\n"===c&&(s=!1),r=a+1}if(!i&&0===n){const t=e.slice(r).trimEnd();t.length>0&&l.push(t)}return l}function o(e){const t=[];let n=!1;for(const i of e)if(!0!==n)if("\\"!==i){if("'"===i)break;t.push(i)}else n=!0;else n=!1,"\\"!==i&&"'"!==i&&t.push("\\"),t.push(i);return t.join("")}function r(e,t=0,i=""){t+=e.length;const s=function(e,t){if(0===e.length)return;const i=e[0];return"'"===i?o(e.slice(1)):"["===i?function(e,t){return function(e){const t=[];for(const{value:n,index:i,comment:o}of e){const e=r(n,i,o);if(void 0===e)return;t.push(e)}return t}(n(e,t))}(e.slice(1),t+1):"{"===i?function(e,t){return function(e){const t={};for(const{value:n,index:i,comment:o}of e){const e=n.match(/^\s*([\w-]+)/);if(null===e){const e=r(n,i,o);if(void 0===e)return;t.__=e;continue}const s=e[1],l=e[0].length;let a=n.slice(l).trimEnd();if(0===a.length)t[s]={value:!0,index:i+l,comment:o};else{const e=r(a,i+l,o);if(void 0===e)return;t[s]=e}}return t}(n(e,t,!0))}(e.slice(1),t+1):"true"===(e=e.trimEnd())||"false"!==e&&(/^(?:[+-]?Infinity|NaN|0x[\da-fA-F]+|0o[0-7]+|0b[01]+|[+-]?(?:\d*\.?\d+|\d+\.)(?:e[+-]?\d+)?)$/.test(e)?Number(e):/[',{}\[\]\n\r]/.test(e)?void 0:e)}(e=e.trimStart(),t-=e.length);if(void 0!==s)return{value:s,index:t,comment:i}}function s(e){if(0===(e=e.trimStart()).length)return;const t=e[0];return"'"===t?o(e.slice(1)):"["===t?function(e){return function(e){const t=[];for(const n of e){const e=s(n);if(void 0===e)return;t.push(e)}return t}(i(e))}(e.slice(1)):"{"===t?function(e){return function(e){const t={};for(const n of e){const e=n.match(/^\s*([\w-]+)/);if(null===e){const e=s(n);if(void 0===e)return;t.__=e;continue}const i=e[1],o=e[0].length;let r=n.slice(o).trimEnd();if(0===r.length)t[i]=!0;else{const e=s(r);if(void 0===e)return;t[i]=e}}return t}(i(e,!0))}(e.slice(1)):"true"===(e=e.trimEnd())||"false"!==e&&(/^(?:[+-]?Infinity|NaN|0x[\da-fA-F]+|0o[0-7]+|0b[01]+|[+-]?(?:\d*\.?\d+|\d+\.)(?:e[+-]?\d+)?)$/.test(e)?Number(e):/[',{}\[\]\n\r]/.test(e)?void 0:e)}function l(e,t){if(t&&e.length>0&&e[0].trim().length>0&&(1===e.length||e[e.length-1].trim().length>0)&&!/[',{}\[\]\n\r]/.test(e)&&"true"!==e&&"false"!==e&&!/^(?:[+-]?Infinity|NaN|0x[\da-fA-F]+|0o[0-7]+|0b[01]+|[+-]?(?:\d*\.?\d+|\d+\.)(?:e[+-]?\d+)?)$/.test(e)&&!e.startsWith("//")&&!e.startsWith("/*"))return e;const n=["'"];for(let t=0;t<e.length;t++){const i=e[t];if("\\"!==i)"'"!==i?n.push(i):n.push("\\'");else{if(t===e.length-1){n.push("\\\\");break}const o=e[t+1];if("\\"===o||"'"===o){n.push("\\\\");continue}n.push(i)}}return n.push("'"),n.join("")}Object.defineProperty(t,"__esModule",{value:!0}),t.stringify=t.stringifyWithComment=t.parse=t.parseWithIndex=void 0,t.parseWithIndex=r,t.parse=s,t.stringifyWithComment=function e(t,n={}){return void 0===t?"":"number"==typeof t?t.toString():"string"==typeof t?l(t,n.useUnquotedString):!0===t?"true":!1===t?"false":Array.isArray(t)?function(t,{indentTarget:n,indentLevel:i,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:s}){n=n??"none",i=i??0,o=o??"never";const l=[],a=t.length>1&&("all"===n||"array"===n||"arrayInObjectAndThis"===n)||void 0!==t.find((e=>e.comment.length>0)),c=i+(a?1:0);"arrayInObjectAndThis"===n&&(n="arrayInObject");const d="always"===r||"afterComma"===r?", ":",";let u;for(let i=0;i<t.length;i++){const{value:f,comment:h}=t[i];let m;m=void 0===u?e(f,{indentTarget:n,indentLevel:c,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:s}):u,i!==t.length-1&&(u=e(t[i+1].value,{indentTarget:n,indentLevel:c,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:s})),a||i===t.length-1||"always"!==o&&(m.endsWith("'")||m.endsWith("}")||m.endsWith("]")||void 0!==u&&(u.endsWith("'")||u.endsWith("}")||u.endsWith("]")))?(h.length>0&&l.push(...h.split("\n")),l.push(m)):l.push(m+d)}let f="\n";for(let e=0;e<i;e++)f+="    ";let h=f;return i>=0&&(h+="    "),a?"["+h+l.join(h)+f+"]":"["+l.join("")+"]"}(t,n):function(t,{indentTarget:n,indentLevel:i,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:s}){n=n??"none",i=i??0,o=o??"never";const l=[],a=Object.keys(t);let c=a.length>1&&("all"===n||"object"===n);if(!c)for(const e of a){const n=t[e];if(void 0!==n&&n.comment.length>0){c=!0;break}}const d=i+(c?1:0);"arrayInObject"===n&&(n="arrayInObjectAndThis");const u="always"===r||"afterComma"===r?", ":",",f="always"===r||"afterKey"===r?" ":"";for(let i=0;i<a.length;i++){const h=a[i];if(null===h.match(/^[\w-]+$/))continue;const m=t[h];if(void 0===m)continue;const{value:p,comment:g}=m,v=e(p,{indentTarget:n,indentLevel:d,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:"__"===h&&"string"==typeof p?void 0:s});g.length>0&&l.push(...g.split("\n")),v.startsWith("'")||v.startsWith("[")||v.startsWith("{")?c||i===a.length-1||"always"!==o&&"inObject"!==o?l.push(("__"===h?"":h+f)+v):l.push(("__"===h?"":h+f)+v+u):"true"===v?c||i===a.length-1?l.push(h):l.push(h+u):c||i===a.length-1?l.push(h+" "+v):l.push(h+" "+v+u)}let h="\n";for(let e=0;e<i;e++)h+="    ";let m=h;return i>=0&&(m+="    "),c?"{"+m+l.join(m)+h+"}":"{"+l.join("")+"}"}(t,n)},t.stringify=function e(t,n={}){return void 0===t?"":"number"==typeof t?t.toString():"string"==typeof t?l(t,n.useUnquotedString):!0===t?"true":!1===t?"false":Array.isArray(t)?function(t,{indentTarget:n,indentLevel:i,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:s}){n=n??"none",i=i??0,o=o??"never";const l=[],a=t.length>1&&("all"===n||"array"===n||"arrayInObjectAndThis"===n),c=i+(a?1:0);"arrayInObjectAndThis"===n&&(n="arrayInObject");const d="always"===r||"afterComma"===r?", ":",";let u;for(let i=0;i<t.length;i++){let f;f=void 0===u?e(t[i],{indentTarget:n,indentLevel:c,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:s}):u,i!==t.length-1&&(u=e(t[i+1],{indentTarget:n,indentLevel:c,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:s})),a||i===t.length-1||"always"!==o&&(f.endsWith("'")||f.endsWith("}")||f.endsWith("]")||void 0!==u&&(u.endsWith("'")||u.endsWith("}")||u.endsWith("]")))?l.push(f):l.push(f+d)}let f="\n";for(let e=0;e<i;e++)f+="    ";let h=f;return i>=0&&(h+="    "),a?"["+h+l.join(h)+f+"]":"["+l.join("")+"]"}(t,n):function(t,{indentTarget:n,indentLevel:i,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:s}){n=n??"none",i=i??0,o=o??"never";const l=[],a=Object.keys(t),c=a.length>1&&("all"===n||"object"===n),d=i+(c?1:0);"arrayInObject"===n&&(n="arrayInObjectAndThis");const u="always"===r||"afterComma"===r?", ":",",f="always"===r||"afterKey"===r?" ":"";for(let i=0;i<a.length;i++){const h=a[i];if(null===h.match(/^[\w-]+$/))continue;const m=t[h];if(void 0===m)continue;const p=e(m,{indentTarget:n,indentLevel:d,addDecorativeComma:o,addDecorativeSpace:r,useUnquotedString:"__"===h&&"string"==typeof m?void 0:s});p.startsWith("'")||p.startsWith("[")||p.startsWith("{")?c||i===a.length-1||"always"!==o&&"inObject"!==o?l.push(("__"===h?"":h+f)+p):l.push(("__"===h?"":h+f)+p+u):"true"===p?c||i===a.length-1?l.push(h):l.push(h+u):c||i===a.length-1?l.push(h+" "+p):l.push(h+" "+p+u)}let h="\n";for(let e=0;e<i;e++)h+="    ";let m=h;return i>=0&&(m+="    "),c?"{"+m+l.join(m)+h+"}":"{"+l.join("")+"}"}(t,n)}}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};(()=>{function e(e,t){try{return new URL(e,t).href}catch(t){return console.log(t),e}}function t(e,t,n){const i=n[t];return void 0===i?[]:i[e]??[]}function o(e,n,i){const o=t(e,n,i);if(0!==o.length)return o[o.length-1]}n.d(i,{I:()=>B,h0:()=>_,M:()=>$}),n(650),n(400);class r{constructor(e,t=[]){this.element=document.createElement(e),this.classList=this.element.classList,this.style=this.element.style,this.dataset=this.element.dataset,this.childNodes=this.element.childNodes,this.children=this.element.children;for(const e of t)if(e.length>0)try{this.element.classList.add(e.replace(/\s/g,"-"))}catch(e){console.log(e)}}append(...e){return this.element.append(...e.map((e=>e instanceof r?e.element:e))),this}prepend(...e){return this.element.prepend(...e.map((e=>e instanceof r?e.element:e))),this}after(...e){return this.element.after(...e.map((e=>e instanceof r?e.element:e))),this}before(...e){return this.element.before(...e.map((e=>e instanceof r?e.element:e))),this}setText(e){return this.element.textContent=e,this}setHTML(e){return this.element.innerHTML=e,this}scrollBy(e){return this.element.scrollBy(e),this}scrollIntoView(e){return this.element.scrollIntoView(e),this}getBoundingClientRect(){return this.element.getBoundingClientRect()}getClientRects(){return this.element.getClientRects()}setAttribute(e,t){try{this.element.setAttribute(e,t)}catch(e){console.log(e)}return this}removeAttribute(e){return this.element.removeAttribute(e),this}getAttribute(e){return this.element.getAttribute(e)}hasAttribute(e){return this.element.hasAttribute(e)}}class s extends r{constructor(e=[]){super("div",e)}addEventListener(e,t,n){return this.element.addEventListener(e,t,n),this}}class l extends r{constructor(e=[]){super("span",e)}addEventListener(e,t,n){return this.element.addEventListener(e,t,n),this}}class a{constructor(e){this.context=e,this.unitToCompiling=new Map}async compileUnit(n){if(!0===this.unitToCompiling.get(n))return a.createErrorElement("Loop");if("global"===n.tag||!0===n.options.global)return new s(["unit","global"]).element;this.unitToCompiling.set(n,!0);let i=n.options["compile-with"]??o("compile-with",n.tag,this.context.tagToGlobalOptions);"string"==typeof i&&0!==i.length||(i=n.tag);const r=this.context.tagToUnitCompiler[i];let l;if(void 0!==r){try{l=await r(n,this)}catch(e){console.log(e),l=a.createErrorElement("Broken")}if(l.classList.contains("warn"))return l.classList.add("unit"),this.unitToCompiling.set(n,!1),l}else{let e;a.supportedHTMLTags.includes(i)?(l=document.createElement(i),e=a.supportedHTMLTagsWithInlineChildren.includes(i)?await this.compileInlineSTDN(n.children):await this.compileSTDN(n.children)):a.supportedSVGTags.includes(i)?(l=document.createElementNS("http://www.w3.org/2000/svg",i),e=await this.compileInlineSTDN(n.children)):(l=document.createElement("div"),e=await this.compileSTDN(n.children)),l.append(e)}l.classList.add("unit");try{l.classList.add(i),"string"==typeof n.options.class&&l.classList.add(...n.options.class.trim().split(/\s+/));for(const e of t("class",n.tag,this.context.tagToGlobalOptions))"string"==typeof e&&l.classList.add(...e.trim().split(/\s+/))}catch(e){console.log(e)}const c=this.context.unitToId.get(n);void 0!==c&&(l.id=c);for(const t of Object.keys(n.options)){if("id"===t||"class"===t)continue;let i=t;if(t.startsWith("data-")||a.supportedHTMLAttributes.includes(t)||(i=`data-${t}`),l.hasAttribute(i))continue;let o=n.options[t];if(!0===o?o="":"number"==typeof o&&(o=o.toString()),"string"==typeof o){this.context.dir.length>0&&("src"===i||"href"===i)&&(!(d=o).startsWith("#")&&!/^[a-z][a-z0-9+.-]*:/i.test(d))&&(o=e(o,this.context.dir));try{l.setAttribute(i,o)}catch(e){console.log(e)}}}var d;return this.unitToCompiling.set(n,!1),l}async compileInline(e){return"string"!=typeof e?await this.compileUnit(e):new Text(e)}async compileLine(e){const t=new DocumentFragment;for(const n of e)t.append(await this.compileInline(n));return t}async compileInlineSTDN(e){const t=new DocumentFragment;for(let n=0;n<e.length;n++)t.append(await this.compileLine(e[n])),n!==e.length-1&&t.append(new Text("\n"));return t}async compileSTDN(e){const t=new DocumentFragment;for(const n of e)t.append(new s(["st-line"]).append(await this.compileLine(n)).element);return t}static createErrorElement(e){return new l(["unit","warn"]).setText(e).element}}function c(e){let t="";for(const n of e)t+="string"!=typeof n?function(e){for(const t of e){const e=c(t);if(e.length>0)return e}return""}(n.children):n;return t}a.supportedHTMLTags=["address","article","aside","footer","header","h1","h2","h3","h4","h5","h6","main","nav","section","blockquote","dd","div","dl","dt","figcaption","figure","hr","li","ol","p","pre","ul","a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","img","map","track","video","iframe","del","ins","caption","col","colgroup","table","tbody","td","tfoot","th","thead","tr"],a.supportedHTMLTagsWithInlineChildren=["a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","audio","img","track","video","iframe","del","ins","col","colgroup","table","tbody","tfoot","thead","tr"],a.supportedSVGTags=["animate","animateMotion","circle","clipPath","ellipse","foreignObject","g","image","mask","path","pattern","rect","svg","text","textPath","tspan","use"],a.supportedHTMLAttributes=["accesskey","align","allow","alt","autoplay","cite","class","cols","colspan","controls","coords","crossorigin","datetime","decoding","default","dir","download","draggable","for","headers","href","hreflang","id","kind","label","lang","loop","muted","name","open","ping","poster","preload","referrerpolicy","rel","reversed","rows","rowspan","sandbox","scope","span","spellcheck","src","srcdoc","srclang","srcset","start","style","tabindex","target","title","translate","usemap","value","attributeName","begin","d","dur","fill","keyPoints","keyTimes","path","preserveAspectRatio","repeatCount","rotate","textLength","values","viewBox","x","y","width","height"];let d,u=I("210mm"),f=I("297mm"),h=".4in",m=".4in",p=".4in",g=".4in",v="0px",b=0,y=1,w=0,x=0,T=[];const E={};function S(e){for(const t of e)if(c(t).length>0)return t;return[]}function C(e){const t=e%2==0,n=document.createElementNS("http://www.w3.org/2000/svg","svg"),i=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),o=document.createElement("div"),r=document.createElement("header"),s=document.createElement("main"),l=document.createElement("footer"),a=document.createElement("div"),c=document.createElement("div"),d=document.createElement("span"),b=document.createElement("span");n.append(i),i.append(o),o.append(r),o.append(s),o.append(l),r.append(a),l.append(c),a.append(d),a.append(b),n.setAttribute("viewBox",`0 0 ${u} ${f}`),i.setAttribute("width","100%"),i.setAttribute("height","100%"),o.style.fontSize="16px";const y=`calc(${g} + ${v})`;return o.style.marginLeft=t?m:y,o.style.marginRight=t?y:m,r.style.height=h,s.style.display="flow-root",s.style.height=`calc(${f}px - ${h} - ${p})`,l.style.height=p,c.textContent=e.toString(),{element:n,headingIndexEle:d,headingContentEle:b,main:s,indexEle:c}}async function L(e,t,n){const i=t[e%2==0?b:y];if(void 0!==i&&void 0!==d){n.headingIndexEle.append(new Text(i.index.join(".")));const{abbr:e}=i.unit.options;"string"==typeof e?n.headingContentEle.append(new Text(e)):"object"==typeof e?n.headingContentEle.append(await d.compileLine(S(e))):n.headingContentEle.append(await d.compileLine(S(i.unit.children)))}}function k(e,t){for(;;){for(;null!==e.previousSibling;)e.previousSibling.remove();if(null===e.parentNode||e.parentNode===t)break;e=e.parentNode}}function j(e,t){for(;;){for(;null!==e.nextSibling;)e.nextSibling.remove();if(null===e.parentNode||e.parentNode===t)break;e=e.parentNode}}async function N(e,t,n,i){if(t.append(e),e.getBoundingClientRect().bottom<=t.getBoundingClientRect().bottom)return;function o(){if(n)return e.remove(),{nline:e,breakPointOffset:i}}if(void 0===d||1!==e.children.length||1!==e.childNodes.length)return o();const r=d.context.idToIndexInfo[e.children[0].id];if(void 0===r)return o();const s=e.querySelectorAll(".breakable>*");if(0===s.length)return o();for(let n=s.length-1;n>=0;n--){if(j(s[n],e),e.getBoundingClientRect().bottom>t.getBoundingClientRect().bottom)continue;const o=(await d.compileSTDN([[r.unit]])).children[0],l=o.querySelectorAll(".breakable>*")[i+n];if(void 0===l)return;return k(l,o),l.remove(),{nline:o,breakPointOffset:i+n+1}}e.remove();const l=(await d.compileSTDN([[r.unit]])).children[0];if(i>0){const e=l.querySelectorAll(".breakable>*")[i-1];if(void 0===e)return;k(e,l),e.remove()}if(n)return{nline:l,breakPointOffset:i};t.append(l)}async function A(e,t){t.innerHTML="";let n=0,i=1,o=1,r=C(o);const s=[r];t.append(r.element);let l=!1;function a(){i++,s.push(r=C(++o)),t.append(r.element),l=!1}for(const t of e){let e=1/0;for(;n<T.length;n++){const i=T[n],{id:o,index:r,orbit:s}=i;if(null===t.querySelector(`[id=${JSON.stringify(o)}]`))break;const l="heading"===s?r.length:0;e>l&&(e=l)}if(void 0!==d&&t.children.length>0){const n=t.children[0];if(n.classList.contains("break")){(e<=w||n.classList.contains("right"))&&i%2==1&&a();const t=d.context.idToIndexInfo[n.id];if(void 0!==t&&"break"===t.unit.tag){const{index:e}=t.unit.options;"number"==typeof e&&isFinite(e)&&e%1==0&&e>=1&&(o=e-1)}a()}else e<=x&&(l&&a(),e<=w&&i%2==0&&a())}let s=t,c=0;for(;;){const e=await N(s,r.main,l,c);if(void 0===e){s.childNodes.length>0&&s.getBoundingClientRect().height>0&&(l=!0);break}s=e.nline,c=e.breakPointOffset,a()}}await async function(e){let t=0,n=[],i=0;for(const o of e){for(;t<T.length;t++){const e=T[t],{id:i,index:r,orbit:s}=e;if(null===o.main.querySelector(`[id=${JSON.stringify(i)}]`))break;E[i]=o.indexEle.textContent??void 0;const l="heading"===s?r.length:0;for(let e=l+1;e<n.length;e++)n[e]=void 0;n[l]=e}await L(++i,n,o)}}(s)}function I(e){return e.endsWith("px")?Number(e.slice(0,-2)):e.endsWith("cm")?96*Number(e.slice(0,-2))/2.54:e.endsWith("mm")?96*Number(e.slice(0,-2))/25.4:e.endsWith("in")?96*Number(e.slice(0,-2)):e.endsWith("pc")?16*Number(e.slice(0,-2)):e.endsWith("pt")?4*Number(e.slice(0,-2))/3:NaN}function W(e){if(e.endsWith(" landscape")){W(e.slice(0,-10).trim());const t=u;return u=f,void(f=t)}if(e.endsWith(" portrait"))return void W(e.slice(0,-9).trim());if("A5"===e)return u=I("148mm"),void(f=I("210mm"));if("A4"===e)return u=I("210mm"),void(f=I("297mm"));if("A3"===e)return u=I("297mm"),void(f=I("420mm"));if("B5"===e)return u=I("176mm"),void(f=I("250mm"));if("B4"===e)return u=I("250mm"),void(f=I("353mm"));if("JIS-B5"===e)return u=I("182mm"),void(f=I("257mm"));if("JIS-B4"===e)return u=I("257mm"),void(f=I("364mm"));if("letter"===e)return u=I("8.5in"),void(f=I("11in"));if("legal"===e)return u=I("8.5in"),void(f=I("14in"));if("ledger"===e)return u=I("11in"),void(f=I("17in"));const[t,n]=e.trim().split(/\s+/,2).map(I);if(isFinite(t)&&t>0){if(u=t,void 0===n)return void(f=t);isFinite(n)&&n>0&&(f=n)}}function D(e){if("string"!=typeof e)return;const t=document.createElement("style");document.head.append(t),W(e),t.textContent=`@page{size:${u}px ${f}px}body>.lr-struct>main>article{max-width:${u}px}`}let O=!1;const q=[],$=async(e,t)=>{const n=document.createElement("div");if(O)return n;O=!0;const i=document.body.querySelector("article");if(null===i)return n;var o;d=t,T=t.context.indexInfoArray.filter((e=>"heading"===e.orbit||"title"===e.unit.tag)),D(e.options.size),function(e){if("string"!=typeof e)return;const t=e.split(/\s+/,4);1===t.length?(h=t[0],m=t[0],p=t[0],g=t[0]):2===t.length?(h=t[0],m=t[1],p=t[0],g=t[1]):3===t.length?(h=t[0],m=t[1],p=t[2],g=t[1]):(h=t[0],m=t[1],p=t[2],g=t[3])}(e.options.margin),"number"!=typeof(o=e.options.binging)?"string"==typeof o&&(v=o):v=o+"px",function(e){if("number"==typeof e&&isFinite(e)&&e%1==0&&e>=0)return b=e,void(y=e);if("string"!=typeof e)return;let[t,n]=e.split(/\s+/,2).map(Number);isFinite(t)&&t%1==0&&t>=0&&(b=t),isFinite(n)&&n%1==0&&n>=0&&(y=n)}(e.options["header-level"]),function(e){"number"==typeof e&&isFinite(e)&&e%1==0&&e>=0&&(w=e,x<w&&(x=e))}(e.options["right-level"]),function(e){"number"==typeof e&&isFinite(e)&&e%1==0&&e>=w&&(x=e)}(e.options["break-level"]);const r=function(e){return"number"==typeof e&&isFinite(e)&&e>=0?1e3*e:1e3}(e.options["break-delay"]),s=function(e){return"number"==typeof e&&isFinite(e)&&e%1==0&&e>=1?e:1}(e.options["break-num"]),l=new MutationObserver((async()=>{if(!n.isConnected)return;l.disconnect(),await new Promise((e=>setTimeout(e,r)));const e=Array.from(i.children);for(let t=0;t<s;t++)await A(e,i),await new Promise((e=>setTimeout(e,1e3)));for(const e of q)await e()}));return l.observe(document.body,{childList:!0,subtree:!0}),n},B=async(e,t)=>{const n=document.createElement("div");n.classList.add("breakable");const i="number"==typeof(r=e.options["dot-gap"]??o("dot-gap","contents",t.context.tagToGlobalOptions))&&isFinite(r)&&r>0?r:16;var r;for(const{unit:e,orbit:o,index:r,id:s}of T){if("heading"!==o||r.length>3)continue;const l=document.createElement("div"),a=document.createElement("span"),c=document.createElement("span"),d=document.createElement("div"),u=document.createElement("a");l.classList.add(`level${r.length}`),u.href=`#${encodeURIComponent(s)}`,n.append(l),l.append(a),l.append(c),l.append(d),d.append(u),a.append(new Text(r.join("."))),c.append(await t.compileLine(S(e.children))),q.push((async()=>{u.textContent=E[s]??"";let{left:e}=l.getBoundingClientRect();const{top:t,left:o}=u.getBoundingClientRect();for(const{right:n,bottom:i}of c.getClientRects())i>=t&&n>e&&(e=n);if(o<=e)return;const r=n.closest("foreignObject");if(null===r)return;const{width:a}=r.getBoundingClientRect(),d=Math.floor((o-e)*r.width.animVal.value/a/i);for(let e=0;e<d;e++){const e=document.createElement("div");e.style.width=`${i}px`,u.before(e)}}))}return n},_=async(e,t)=>{const n=document.createElement("h1");return n.append(await t.compileSTDN(e.children)),n}})();var o=i.I,r=i.h0,s=i.M;export{o as contents,r as h0,s as page};