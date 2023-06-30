(()=>{"use strict";var e={218:(e,t,n)=>{function r(e,t){return function(){return e.apply(t,arguments)}}const{toString:o}=Object.prototype,{getPrototypeOf:i}=Object,s=(a=Object.create(null),e=>{const t=o.call(e);return a[t]||(a[t]=t.slice(8,-1).toLowerCase())});var a;const c=e=>(e=e.toLowerCase(),t=>s(t)===e),u=e=>t=>typeof t===e,{isArray:l}=Array,d=u("undefined"),f=c("ArrayBuffer"),p=u("string"),h=u("function"),m=u("number"),g=e=>null!==e&&"object"==typeof e,y=e=>{if("object"!==s(e))return!1;const t=i(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},w=c("Date"),b=c("File"),E=c("Blob"),_=c("FileList"),O=c("URLSearchParams");function C(e,t,{allOwnKeys:n=!1}={}){if(null==e)return;let r,o;if("object"!=typeof e&&(e=[e]),l(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let s;for(r=0;r<i;r++)s=o[r],t.call(null,e[s],s,e)}}function N(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const S="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:n.g,T=e=>!d(e)&&e!==S,R=(x="undefined"!=typeof Uint8Array&&i(Uint8Array),e=>x&&e instanceof x);var x;const A=c("HTMLFormElement"),j=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),D=c("RegExp"),v=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};C(n,((n,o)=>{!1!==t(n,o,e)&&(r[o]=n)})),Object.defineProperties(e,r)},W="abcdefghijklmnopqrstuvwxyz",I="0123456789",L={DIGIT:I,ALPHA:W,ALPHA_DIGIT:W+W.toUpperCase()+I},U=c("AsyncFunction");var k={isArray:l,isArrayBuffer:f,isBuffer:function(e){return null!==e&&!d(e)&&null!==e.constructor&&!d(e.constructor)&&h(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||h(e.append)&&("formdata"===(t=s(e))||"object"===t&&h(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&f(e.buffer),t},isString:p,isNumber:m,isBoolean:e=>!0===e||!1===e,isObject:g,isPlainObject:y,isUndefined:d,isDate:w,isFile:b,isBlob:E,isRegExp:D,isFunction:h,isStream:e=>g(e)&&h(e.pipe),isURLSearchParams:O,isTypedArray:R,isFileList:_,forEach:C,merge:function e(){const{caseless:t}=T(this)&&this||{},n={},r=(r,o)=>{const i=t&&N(n,o)||o;y(n[i])&&y(r)?n[i]=e(n[i],r):y(r)?n[i]=e({},r):l(r)?n[i]=r.slice():n[i]=r};for(let e=0,t=arguments.length;e<t;e++)arguments[e]&&C(arguments[e],r);return n},extend:(e,t,n,{allOwnKeys:o}={})=>(C(t,((t,o)=>{n&&h(t)?e[o]=r(t,n):e[o]=t}),{allOwnKeys:o}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let o,s,a;const c={};if(t=t||{},null==e)return t;do{for(o=Object.getOwnPropertyNames(e),s=o.length;s-- >0;)a=o[s],r&&!r(a,e,t)||c[a]||(t[a]=e[a],c[a]=!0);e=!1!==n&&i(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:s,kindOfTest:c,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(l(e))return e;let t=e.length;if(!m(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:A,hasOwnProperty:j,hasOwnProp:j,reduceDescriptors:v,freezeMethods:e=>{v(e,((t,n)=>{if(h(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];h(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))}))},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0}))};return l(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t),findKey:N,global:S,isContextDefined:T,ALPHABET:L,generateString:(e=16,t=L.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n},isSpecCompliantForm:function(e){return!!(e&&h(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(g(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=l(e)?[]:{};return C(e,((e,t)=>{const i=n(e,r+1);!d(i)&&(o[t]=i)})),t[r]=void 0,o}}return e};return n(e,0)},isAsyncFn:U,isThenable:e=>e&&(g(e)||h(e))&&h(e.then)&&h(e.catch)};function F(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}k.inherits(F,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:k.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const M=F.prototype,P={};function B(e){return k.isPlainObject(e)||k.isArray(e)}function z(e){return k.endsWith(e,"[]")?e.slice(0,-2):e}function Y(e,t,n){return e?e.concat(t).map((function(e,t){return e=z(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{P[e]={value:e}})),Object.defineProperties(F,P),Object.defineProperty(M,"isAxiosError",{value:!0}),F.from=(e,t,n,r,o,i)=>{const s=Object.create(M);return k.toFlatObject(e,s,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),F.call(s,e.message,t,n,r,o),s.cause=e,s.name=e.name,i&&Object.assign(s,i),s};const Z=k.toFlatObject(k,{},null,(function(e){return/^is[A-Z]/.test(e)}));function J(e,t,n){if(!k.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(n=k.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!k.isUndefined(t[e])}))).metaTokens,o=n.visitor||u,i=n.dots,s=n.indexes,a=(n.Blob||"undefined"!=typeof Blob&&Blob)&&k.isSpecCompliantForm(t);if(!k.isFunction(o))throw new TypeError("visitor must be a function");function c(e){if(null===e)return"";if(k.isDate(e))return e.toISOString();if(!a&&k.isBlob(e))throw new F("Blob is not supported. Use a Buffer instead.");return k.isArrayBuffer(e)||k.isTypedArray(e)?a&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}function u(e,n,o){let a=e;if(e&&!o&&"object"==typeof e)if(k.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(k.isArray(e)&&function(e){return k.isArray(e)&&!e.some(B)}(e)||(k.isFileList(e)||k.endsWith(n,"[]"))&&(a=k.toArray(e)))return n=z(n),a.forEach((function(e,r){!k.isUndefined(e)&&null!==e&&t.append(!0===s?Y([n],r,i):null===s?n:n+"[]",c(e))})),!1;return!!B(e)||(t.append(Y(o,n,i),c(e)),!1)}const l=[],d=Object.assign(Z,{defaultVisitor:u,convertValue:c,isVisitable:B});if(!k.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!k.isUndefined(n)){if(-1!==l.indexOf(n))throw Error("Circular reference detected in "+r.join("."));l.push(n),k.forEach(n,(function(n,i){!0===(!(k.isUndefined(n)||null===n)&&o.call(t,n,k.isString(i)?i.trim():i,r,d))&&e(n,r?r.concat(i):[i])})),l.pop()}}(e),t}function V(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function X(e,t){this._pairs=[],e&&J(e,this,t)}const q=X.prototype;function G(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function H(e,t,n){if(!t)return e;const r=n&&n.encode||G,o=n&&n.serialize;let i;if(i=o?o(t,n):k.isURLSearchParams(t)?t.toString():new X(t,n).toString(r),i){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}q.append=function(e,t){this._pairs.push([e,t])},q.toString=function(e){const t=e?function(t){return e.call(this,t,V)}:V;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};var Q=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){k.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},K={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},$={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:X,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},isStandardBrowserEnv:(()=>{let e;return("undefined"==typeof navigator||"ReactNative"!==(e=navigator.product)&&"NativeScript"!==e&&"NS"!==e)&&"undefined"!=typeof window&&"undefined"!=typeof document})(),isStandardBrowserWebWorkerEnv:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,protocols:["http","https","file","blob","url","data"]};function ee(e){function t(e,n,r,o){let i=e[o++];const s=Number.isFinite(+i),a=o>=e.length;return i=!i&&k.isArray(r)?r.length:i,a?(k.hasOwnProp(r,i)?r[i]=[r[i],n]:r[i]=n,!s):(r[i]&&k.isObject(r[i])||(r[i]=[]),t(e,n,r[i],o)&&k.isArray(r[i])&&(r[i]=function(e){const t={},n=Object.keys(e);let r;const o=n.length;let i;for(r=0;r<o;r++)i=n[r],t[i]=e[i];return t}(r[i])),!s)}if(k.isFormData(e)&&k.isFunction(e.entries)){const n={};return k.forEachEntry(e,((e,r)=>{t(function(e){return k.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0)})),n}return null}const te={"Content-Type":void 0},ne={transitional:K,adapter:["xhr","http"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,o=k.isObject(e);if(o&&k.isHTMLForm(e)&&(e=new FormData(e)),k.isFormData(e))return r&&r?JSON.stringify(ee(e)):e;if(k.isArrayBuffer(e)||k.isBuffer(e)||k.isStream(e)||k.isFile(e)||k.isBlob(e))return e;if(k.isArrayBufferView(e))return e.buffer;if(k.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let i;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return J(e,new $.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return $.isNode&&k.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((i=k.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return J(i?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||r?(t.setContentType("application/json",!1),function(e,t,n){if(k.isString(e))try{return(0,JSON.parse)(e),k.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||ne.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(e&&k.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(e){if(n){if("SyntaxError"===e.name)throw F.from(e,F.ERR_BAD_RESPONSE,this,null,this.response);throw e}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:$.classes.FormData,Blob:$.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};k.forEach(["delete","get","head"],(function(e){ne.headers[e]={}})),k.forEach(["post","put","patch"],(function(e){ne.headers[e]=k.merge(te)}));var re=ne;const oe=k.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),ie=Symbol("internals");function se(e){return e&&String(e).trim().toLowerCase()}function ae(e){return!1===e||null==e?e:k.isArray(e)?e.map(ae):String(e)}function ce(e,t,n,r,o){return k.isFunction(r)?r.call(this,t,n):(o&&(t=n),k.isString(t)?k.isString(r)?-1!==t.indexOf(r):k.isRegExp(r)?r.test(t):void 0:void 0)}class ue{constructor(e){e&&this.set(e)}set(e,t,n){const r=this;function o(e,t,n){const o=se(t);if(!o)throw new Error("header name must be a non-empty string");const i=k.findKey(r,o);(!i||void 0===r[i]||!0===n||void 0===n&&!1!==r[i])&&(r[i||t]=ae(e))}const i=(e,t)=>k.forEach(e,((e,n)=>o(e,n,t)));return k.isPlainObject(e)||e instanceof this.constructor?i(e,t):k.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())?i((e=>{const t={};let n,r,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),n=e.substring(0,o).trim().toLowerCase(),r=e.substring(o+1).trim(),!n||t[n]&&oe[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)})),t})(e),t):null!=e&&o(t,e,n),this}get(e,t){if(e=se(e)){const n=k.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(k.isFunction(t))return t.call(this,e,n);if(k.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=se(e)){const n=k.findKey(this,e);return!(!n||void 0===this[n]||t&&!ce(0,this[n],n,t))}return!1}delete(e,t){const n=this;let r=!1;function o(e){if(e=se(e)){const o=k.findKey(n,e);!o||t&&!ce(0,n[o],o,t)||(delete n[o],r=!0)}}return k.isArray(e)?e.forEach(o):o(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const o=t[n];e&&!ce(0,this[o],o,e,!0)||(delete this[o],r=!0)}return r}normalize(e){const t=this,n={};return k.forEach(this,((r,o)=>{const i=k.findKey(n,o);if(i)return t[i]=ae(r),void delete t[o];const s=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(o):String(o).trim();s!==o&&delete t[o],t[s]=ae(r),n[s]=!0})),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return k.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&k.isArray(n)?n.join(", "):n)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([e,t])=>e+": "+t)).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const n=new this(e);return t.forEach((e=>n.set(e))),n}static accessor(e){const t=(this[ie]=this[ie]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=se(e);t[r]||(function(e,t){const n=k.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,o){return this[r].call(this,t,e,n,o)},configurable:!0})}))}(n,e),t[r]=!0)}return k.isArray(e)?e.forEach(r):r(e),this}}ue.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),k.freezeMethods(ue.prototype),k.freezeMethods(ue);var le=ue;function de(e,t){const n=this||re,r=t||n,o=le.from(r.headers);let i=r.data;return k.forEach(e,(function(e){i=e.call(n,i,o.normalize(),t?t.status:void 0)})),o.normalize(),i}function fe(e){return!(!e||!e.__CANCEL__)}function pe(e,t,n){F.call(this,null==e?"canceled":e,F.ERR_CANCELED,t,n),this.name="CanceledError"}k.inherits(pe,F,{__CANCEL__:!0});var he=$.isStandardBrowserEnv?{write:function(e,t,n,r,o,i){const s=[];s.push(e+"="+encodeURIComponent(t)),k.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),k.isString(r)&&s.push("path="+r),k.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function me(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}var ge=$.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let n;function r(n){let r=n;return e&&(t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return n=r(window.location.href),function(e){const t=k.isString(e)?r(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return!0};function ye(e,t){let n=0;const r=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,i=0,s=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=r[s];o||(o=c),n[i]=a,r[i]=c;let l=s,d=0;for(;l!==i;)d+=n[l++],l%=e;if(i=(i+1)%e,i===s&&(s=(s+1)%e),c-o<t)return;const f=u&&c-u;return f?Math.round(1e3*d/f):void 0}}(50,250);return o=>{const i=o.loaded,s=o.lengthComputable?o.total:void 0,a=i-n,c=r(a);n=i;const u={loaded:i,total:s,progress:s?i/s:void 0,bytes:a,rate:c||void 0,estimated:c&&s&&i<=s?(s-i)/c:void 0,event:o};u[t?"download":"upload"]=!0,e(u)}}const we={http:null,xhr:"undefined"!=typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){let r=e.data;const o=le.from(e.headers).normalize(),i=e.responseType;let s;function a(){e.cancelToken&&e.cancelToken.unsubscribe(s),e.signal&&e.signal.removeEventListener("abort",s)}k.isFormData(r)&&($.isStandardBrowserEnv||$.isStandardBrowserWebWorkerEnv?o.setContentType(!1):o.setContentType("multipart/form-data;",!1));let c=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",n=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(t+":"+n))}const u=me(e.baseURL,e.url);function l(){if(!c)return;const r=le.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders());!function(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new F("Request failed with status code "+n.status,[F.ERR_BAD_REQUEST,F.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}((function(e){t(e),a()}),(function(e){n(e),a()}),{data:i&&"text"!==i&&"json"!==i?c.response:c.responseText,status:c.status,statusText:c.statusText,headers:r,config:e,request:c}),c=null}if(c.open(e.method.toUpperCase(),H(u,e.params,e.paramsSerializer),!0),c.timeout=e.timeout,"onloadend"in c?c.onloadend=l:c.onreadystatechange=function(){c&&4===c.readyState&&(0!==c.status||c.responseURL&&0===c.responseURL.indexOf("file:"))&&setTimeout(l)},c.onabort=function(){c&&(n(new F("Request aborted",F.ECONNABORTED,e,c)),c=null)},c.onerror=function(){n(new F("Network Error",F.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const r=e.transitional||K;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new F(t,r.clarifyTimeoutError?F.ETIMEDOUT:F.ECONNABORTED,e,c)),c=null},$.isStandardBrowserEnv){const t=(e.withCredentials||ge(u))&&e.xsrfCookieName&&he.read(e.xsrfCookieName);t&&o.set(e.xsrfHeaderName,t)}void 0===r&&o.setContentType(null),"setRequestHeader"in c&&k.forEach(o.toJSON(),(function(e,t){c.setRequestHeader(t,e)})),k.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),i&&"json"!==i&&(c.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&c.addEventListener("progress",ye(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&c.upload&&c.upload.addEventListener("progress",ye(e.onUploadProgress)),(e.cancelToken||e.signal)&&(s=t=>{c&&(n(!t||t.type?new pe(null,e,c):t),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(s),e.signal&&(e.signal.aborted?s():e.signal.addEventListener("abort",s)));const d=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(u);d&&-1===$.protocols.indexOf(d)?n(new F("Unsupported protocol "+d+":",F.ERR_BAD_REQUEST,e)):c.send(r||null)}))}};k.forEach(we,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(e){}Object.defineProperty(e,"adapterName",{value:t})}}));function be(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new pe(null,e)}function Ee(e){return be(e),e.headers=le.from(e.headers),e.data=de.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1),(e=>{e=k.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let o=0;o<t&&(n=e[o],!(r=k.isString(n)?we[n.toLowerCase()]:n));o++);if(!r){if(!1===r)throw new F(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT");throw new Error(k.hasOwnProp(we,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`)}if(!k.isFunction(r))throw new TypeError("adapter is not a function");return r})(e.adapter||re.adapter)(e).then((function(t){return be(e),t.data=de.call(e,e.transformResponse,t),t.headers=le.from(t.headers),t}),(function(t){return fe(t)||(be(e),t&&t.response&&(t.response.data=de.call(e,e.transformResponse,t.response),t.response.headers=le.from(t.response.headers))),Promise.reject(t)}))}const _e=e=>e instanceof le?e.toJSON():e;function Oe(e,t){t=t||{};const n={};function r(e,t,n){return k.isPlainObject(e)&&k.isPlainObject(t)?k.merge.call({caseless:n},e,t):k.isPlainObject(t)?k.merge({},t):k.isArray(t)?t.slice():t}function o(e,t,n){return k.isUndefined(t)?k.isUndefined(e)?void 0:r(void 0,e,n):r(e,t,n)}function i(e,t){if(!k.isUndefined(t))return r(void 0,t)}function s(e,t){return k.isUndefined(t)?k.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function a(n,o,i){return i in t?r(n,o):i in e?r(void 0,n):void 0}const c={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a,headers:(e,t)=>o(_e(e),_e(t),!0)};return k.forEach(Object.keys(Object.assign({},e,t)),(function(r){const i=c[r]||o,s=i(e[r],t[r],r);k.isUndefined(s)&&i!==a||(n[r]=s)})),n}const Ce={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Ce[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const Ne={};Ce.transitional=function(e,t,n){function r(e,t){return"[Axios v1.4.0] Transitional option '"+e+"'"+t+(n?". "+n:"")}return(n,o,i)=>{if(!1===e)throw new F(r(o," has been removed"+(t?" in "+t:"")),F.ERR_DEPRECATED);return t&&!Ne[o]&&(Ne[o]=!0,console.warn(r(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,o,i)}};var Se={assertOptions:function(e,t,n){if("object"!=typeof e)throw new F("options must be an object",F.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const i=r[o],s=t[i];if(s){const t=e[i],n=void 0===t||s(t,i,e);if(!0!==n)throw new F("option "+i+" must be "+n,F.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new F("Unknown option "+i,F.ERR_BAD_OPTION)}},validators:Ce};const Te=Se.validators;class Re{constructor(e){this.defaults=e,this.interceptors={request:new Q,response:new Q}}request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},t=Oe(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:o}=t;let i;void 0!==n&&Se.assertOptions(n,{silentJSONParsing:Te.transitional(Te.boolean),forcedJSONParsing:Te.transitional(Te.boolean),clarifyTimeoutError:Te.transitional(Te.boolean)},!1),null!=r&&(k.isFunction(r)?t.paramsSerializer={serialize:r}:Se.assertOptions(r,{encode:Te.function,serialize:Te.function},!0)),t.method=(t.method||this.defaults.method||"get").toLowerCase(),i=o&&k.merge(o.common,o[t.method]),i&&k.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e]})),t.headers=le.concat(i,o);const s=[];let a=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,s.unshift(e.fulfilled,e.rejected))}));const c=[];let u;this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)}));let l,d=0;if(!a){const e=[Ee.bind(this),void 0];for(e.unshift.apply(e,s),e.push.apply(e,c),l=e.length,u=Promise.resolve(t);d<l;)u=u.then(e[d++],e[d++]);return u}l=s.length;let f=t;for(d=0;d<l;){const e=s[d++],t=s[d++];try{f=e(f)}catch(e){t.call(this,e);break}}try{u=Ee.call(this,f)}catch(e){return Promise.reject(e)}for(d=0,l=c.length;d<l;)u=u.then(c[d++],c[d++]);return u}getUri(e){return H(me((e=Oe(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}k.forEach(["delete","get","head","options"],(function(e){Re.prototype[e]=function(t,n){return this.request(Oe(n||{},{method:e,url:t,data:(n||{}).data}))}})),k.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,o){return this.request(Oe(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Re.prototype[e]=t(),Re.prototype[e+"Form"]=t(!0)}));var xe=Re;class Ae{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null})),this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e,r,o){n.reason||(n.reason=new pe(e,r,o),t(n.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}static source(){let e;return{token:new Ae((function(t){e=t})),cancel:e}}}var je=Ae;const De={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(De).forEach((([e,t])=>{De[t]=e}));var ve=De;const We=function e(t){const n=new xe(t),o=r(xe.prototype.request,n);return k.extend(o,xe.prototype,n,{allOwnKeys:!0}),k.extend(o,n,null,{allOwnKeys:!0}),o.create=function(n){return e(Oe(t,n))},o}(re);We.Axios=xe,We.CanceledError=pe,We.CancelToken=je,We.isCancel=fe,We.VERSION="1.4.0",We.toFormData=J,We.AxiosError=F,We.Cancel=We.CanceledError,We.all=function(e){return Promise.all(e)},We.spread=function(e){return function(t){return e.apply(null,t)}},We.isAxiosError=function(e){return k.isObject(e)&&!0===e.isAxiosError},We.mergeConfig=Oe,We.AxiosHeaders=le,We.formToJSON=e=>ee(k.isHTMLForm(e)?new FormData(e):e),We.HttpStatusCode=ve,We.default=We,e.exports=We}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{let e,t=document.createElement("template");t.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_datasphere" name="ifm_datasphere">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n      <mvc:View\n        controllerName="ifm.datasphere.initial"\n        xmlns:core="sap.ui.core"\n        xmlns:m="sap.m"\n        xmlns:mvc="sap.ui.core.mvc">\n        <m:VBox>\n          <m:Panel headerText="Trigger DataSphere Task Chain">            \n            <m:FlexBox\n              height="100%"\n              alignItems="Start"\n              justifyContent="Center">\n                <m:Button text="Execute Task Chain"\n                    press="onPress"\n                    ariaDescribedBy="defaultButtonDescription genericButtonDescription">\n                </m:Button>\n            </m:FlexBox>\n          </m:Panel>\n        </m:VBox>\n      </mvc:View>\n    <\/script>\n  ';class r extends HTMLElement{constructor(){super(),e=this.attachShadow({mode:"open"}),e.appendChild(t.content.cloneNode(!0)),this._export_settings={},this._export_settings.restapiurl="",this._export_settings.DWC_clientID="",this._export_settings.DWC_apiSecret="",this._export_settings.DWC_oAuthURL="",this._export_settings.DWC_tokenURL="",this._export_settings.DWC_taskChain="",this._export_settings.DWC_redirectURL="",this._export_settings.CSRFToken="",this._export_settings.AccessToken=""}onCustomWidgetResize(e,t){}connectedCallback(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(e){"designMode"in e&&(this._designMode=e.designMode)}onCustomWidgetAfterUpdate(e){this.buildUI(e,this)}get restapiurl(){return this._export_settings.restapiurl}set restapiurl(e){this._export_settings.restapiurl=e}get DWC_clientID(){return this._export_settings.DWC_clientID}set DWC_clientID(e){this._export_settings.DWC_clientID=e}get DWC_apiSecret(){return this._export_settings.DWC_apiSecret}set DWC_apiSecret(e){this._export_settings.DWC_apiSecret=e}get DWC_oAuthURL(){return this._export_settings.DWC_oAuthURL}set DWC_oAuthURL(e){this._export_settings.DWC_oAuthURL=e}get DWC_tokenURL(){return this._export_settings.DWC_tokenURL}set DWC_tokenURL(e){this._export_settings.DWC_tokenURL=e}get DWC_taskChain(){return this._export_settings.DWC_taskChain}set DWC_taskChain(e){this._export_settings.DWC_taskChain=e}static get observedAttributes(){return["restapiurl","DWC_clientID","DWC_apiSecret","DWC_oAuthURL","DWC_tokenURL","DWC_taskChain","DWC_redirectURL"]}_doOAuth2(){var e=new Headers;e.append("Authorization","Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZHdjLWluZm9tb3Rpb24uYXV0aGVudGljYXRpb24uZXUxMC5oYW5hLm9uZGVtYW5kLmNvbS90b2tlbl9rZXlzIiwia2lkIjoiZGVmYXVsdC1qd3Qta2V5LTI4Njg5MjQxMyIsInR5cCI6IkpXVCIsImppZCI6ICJVSmk3LzJYSFNLaThCY2ZmYUpHQnFOeWFOSFNZWGwxa2E3OENQK2pPa1NBPSJ9.eyJqdGkiOiJiYWZmOGExZTNlMzY0ZmE3ODM3ZTI3ZTk3ZDFkYTgzNSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIwN2EzMThlNS04ODdmLTRiZWUtOWY1MC0xOTg3ODg3MTE2MzgiLCJ6ZG4iOiJkd2MtaW5mb21vdGlvbiIsInNlcnZpY2VpbnN0YW5jZWlkIjoiNTc0NzcwNTItNDI0Yi00ZmZmLWFmYjctY2MwNTA4OTUzNDVjIn0sInN1YiI6InNiLWE2ZDA5OTY4LTljZjItNDk0MC1hNzI1LWJjNjlmM2U4NzVmZiFiMTA2MzQzfGNsaWVudCFiMzY1MCIsImF1dGhvcml0aWVzIjpbInVhYS5yZXNvdXJjZSIsInB1YmxpY2FwaXNlcnZpY2Utc2FjLXNhY2V1MTAhdDM2NTAuYXBpYWNjZXNzIiwiYXBwcm91dGVyLXNhYy1zYWNldTEwIXQzNjUwLnNhcC5mcGEudXNlciJdLCJzY29wZSI6WyJ1YWEucmVzb3VyY2UiLCJwdWJsaWNhcGlzZXJ2aWNlLXNhYy1zYWNldTEwIXQzNjUwLmFwaWFjY2VzcyIsImFwcHJvdXRlci1zYWMtc2FjZXUxMCF0MzY1MC5zYXAuZnBhLnVzZXIiXSwiY2xpZW50X2lkIjoic2ItYTZkMDk5NjgtOWNmMi00OTQwLWE3MjUtYmM2OWYzZTg3NWZmIWIxMDYzNDN8Y2xpZW50IWIzNjUwIiwiY2lkIjoic2ItYTZkMDk5NjgtOWNmMi00OTQwLWE3MjUtYmM2OWYzZTg3NWZmIWIxMDYzNDN8Y2xpZW50IWIzNjUwIiwiYXpwIjoic2ItYTZkMDk5NjgtOWNmMi00OTQwLWE3MjUtYmM2OWYzZTg3NWZmIWIxMDYzNDN8Y2xpZW50IWIzNjUwIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiI5NjFlMDNkMCIsImlhdCI6MTY4ODE0MDQ0MywiZXhwIjoxNjg4MTQ0MDQzLCJpc3MiOiJodHRwczovL2R3Yy1pbmZvbW90aW9uLmF1dGhlbnRpY2F0aW9uLmV1MTAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIwN2EzMThlNS04ODdmLTRiZWUtOWY1MC0xOTg3ODg3MTE2MzgiLCJhdWQiOlsiYXBwcm91dGVyLXNhYy1zYWNldTEwIXQzNjUwLnNhcC5mcGEiLCJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJ1YWEiLCJwdWJsaWNhcGlzZXJ2aWNlLXNhYy1zYWNldTEwIXQzNjUwIl19.M-o4NMsxr-_DhGJAqvMCWZ-PSS5AJw1z3U9ygMcI35o05w-e54RAf5h1Z4Aml2jcQ562x9hBefLkNvWym6Js8pv-ttK1DeG4AeXwmOfbZc2_Mc9Yu-tKAQLYez6vXvQUxV7Im2nSrm9nCUQRHhf4bd22hDkgjAddV4kdo9b2wXq5vXopQKblT1-SuYKqMi_kV4tQBQXfMTzj628j-NTP75rzhnkS10Qi7BMBAyS-QdbrXqpGKUEPeR3F3gKywf9MQWfGz9zKi1upCKWpSZ7rkMrfUTaXiQuZCKk3G7uUro8ULmJPBwkHJJQJMJQF-Bm4kGw7BGnXJK6cn419CuIejw");var t={method:"POST",headers:e,redirect:"follow"};fetch(this._export_settings.DWC_taskChain,t).then((e=>e.text())).then((e=>console.log(e))).catch((e=>console.log("error",e)))}async getAccessToken(){var e=n(218);const t={grant_type:"client_credentials",client_id:this._export_settings.DWC_clientID,client_secret:this._export_settings.DWC_apiSecret},r={"Content-Type":"application/x-www-form-urlencoded",Accept:"*/*"};try{const n=await e.post(this._export_settings.DWC_tokenURL,t,{headers:r});console.log("Response data"),console.log(n.data.access_token),this._export_settings.AccessToken=n.data.access_token,this._doOAuth2()}catch(e){throw e}}getCSRFToken(){var e=null,t=new XMLHttpRequest;t.withCredentials=!0,t.addEventListener("readystatechange",(function(){4===this.readyState&&(e=t.getResponseHeader("x-csrf-token"),console.log(e))})),t.open("GET",this._export_settings.restapiurl+"sap/bc/ina/service/v2/GetServerInfo"),t.setRequestHeader("x-csrf-token","Fetch"),t.setRequestHeader("Accept","application/json"),t.setRequestHeader("Content-Type","application/json; charset=utf-8"),t.send(),this._export_settings.CSRFToken=e}executeTaskChain(){var e=new Headers;e.append("Authorization",`Bearer ${this._export_settings.AccessToken}`);var t={method:"POST",headers:e,redirect:"follow"};fetch(this._export_settings.DWC_taskChain,t).then((e=>e.text())).then((e=>console.log(e))).catch((e=>console.log("error",e)))}attributeChangedCallback(e,t,n){t!=n&&(this[e]=n)}buildUI(t,n){var r=n;let o=document.createElement("div");o.slot="content",r.appendChild(o),sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/library"],(function(e){return e.extend("ifm.datasphere.initial",{onPress:function(e){r._export_settings.DWC_clientID,r._export_settings.DWC_apiSecret,r._export_settings.DWC_oAuthURL,r._export_settings.DWC_taskChain,r._doOAuth2()}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(e.getElementById("oView")).html()}).placeAt(o)}}customElements.define("com-ifm-datasphere",r)})()})();