(()=>{var e={63:(e,t,n)=>{e.exports=n(414)},784:(e,t,n)=>{"use strict";var r=n(214),i=n(795),o=n(634),s=n(923),a=n(249),c=n(694),u=n(629),l=n(70),p=n(857),d=n(762),f=n(222);e.exports=function(e){return new Promise((function(t,n){var h,m=e.data,b=e.headers,I=e.responseType;function N(){e.cancelToken&&e.cancelToken.unsubscribe(h),e.signal&&e.signal.removeEventListener("abort",h)}r.isFormData(m)&&r.isStandardBrowserEnv()&&delete b["Content-Type"];var g=new XMLHttpRequest;if(e.auth){var v=e.auth.username||"",y=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";b.Authorization="Basic "+btoa(v+":"+y)}var C=a(e.baseURL,e.url);function j(){if(g){var r="getAllResponseHeaders"in g?c(g.getAllResponseHeaders()):null,o={data:I&&"text"!==I&&"json"!==I?g.response:g.responseText,status:g.status,statusText:g.statusText,headers:r,config:e,request:g};i((function(e){t(e),N()}),(function(e){n(e),N()}),o),g=null}}if(g.open(e.method.toUpperCase(),s(C,e.params,e.paramsSerializer),!0),g.timeout=e.timeout,"onloadend"in g?g.onloadend=j:g.onreadystatechange=function(){g&&4===g.readyState&&(0!==g.status||g.responseURL&&0===g.responseURL.indexOf("file:"))&&setTimeout(j)},g.onabort=function(){g&&(n(new p("Request aborted",p.ECONNABORTED,e,g)),g=null)},g.onerror=function(){n(new p("Network Error",p.ERR_NETWORK,e,g,g)),g=null},g.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",r=e.transitional||l;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new p(t,r.clarifyTimeoutError?p.ETIMEDOUT:p.ECONNABORTED,e,g)),g=null},r.isStandardBrowserEnv()){var Y=(e.withCredentials||u(C))&&e.xsrfCookieName?o.read(e.xsrfCookieName):void 0;Y&&(b[e.xsrfHeaderName]=Y)}"setRequestHeader"in g&&r.forEach(b,(function(e,t){void 0===m&&"content-type"===t.toLowerCase()?delete b[t]:g.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(g.withCredentials=!!e.withCredentials),I&&"json"!==I&&(g.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&g.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&g.upload&&g.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(h=function(e){g&&(n(!e||e&&e.type?new d:e),g.abort(),g=null)},e.cancelToken&&e.cancelToken.subscribe(h),e.signal&&(e.signal.aborted?h():e.signal.addEventListener("abort",h))),m||(m=null);var _=f(C);_&&-1===["http","https","file"].indexOf(_)?n(new p("Unsupported protocol "+_+":",p.ERR_BAD_REQUEST,e)):g.send(m)}))}},414:(e,t,n)=>{"use strict";var r=n(214),i=n(633),o=n(579),s=n(275),a=function e(t){var n=new o(t),a=i(o.prototype.request,n);return r.extend(a,o.prototype,n),r.extend(a,n),a.create=function(n){return e(s(t,n))},a}(n(852));a.Axios=o,a.CanceledError=n(762),a.CancelToken=n(462),a.isCancel=n(530),a.VERSION=n(538).version,a.toFormData=n(247),a.AxiosError=n(857),a.Cancel=a.CanceledError,a.all=function(e){return Promise.all(e)},a.spread=n(684),a.isAxiosError=n(608),e.exports=a,e.exports.default=a},462:(e,t,n)=>{"use strict";var r=n(762);function i(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,r=n._listeners.length;for(t=0;t<r;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,r=new Promise((function(e){n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}i.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},i.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},i.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},i.source=function(){var e;return{token:new i((function(t){e=t})),cancel:e}},e.exports=i},762:(e,t,n)=>{"use strict";var r=n(857);function i(e){r.call(this,null==e?"canceled":e,r.ERR_CANCELED),this.name="CanceledError"}n(214).inherits(i,r,{__CANCEL__:!0}),e.exports=i},530:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},579:(e,t,n)=>{"use strict";var r=n(214),i=n(923),o=n(203),s=n(786),a=n(275),c=n(249),u=n(218),l=u.validators;function p(e){this.defaults=e,this.interceptors={request:new o,response:new o}}p.prototype.request=function(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},(t=a(this.defaults,t)).method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var n=t.transitional;void 0!==n&&u.assertOptions(n,{silentJSONParsing:l.transitional(l.boolean),forcedJSONParsing:l.transitional(l.boolean),clarifyTimeoutError:l.transitional(l.boolean)},!1);var r=[],i=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(i=i&&e.synchronous,r.unshift(e.fulfilled,e.rejected))}));var o,c=[];if(this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)})),!i){var p=[s,void 0];for(Array.prototype.unshift.apply(p,r),p=p.concat(c),o=Promise.resolve(t);p.length;)o=o.then(p.shift(),p.shift());return o}for(var d=t;r.length;){var f=r.shift(),h=r.shift();try{d=f(d)}catch(e){h(e);break}}try{o=s(d)}catch(e){return Promise.reject(e)}for(;c.length;)o=o.then(c.shift(),c.shift());return o},p.prototype.getUri=function(e){e=a(this.defaults,e);var t=c(e.baseURL,e.url);return i(t,e.params,e.paramsSerializer)},r.forEach(["delete","get","head","options"],(function(e){p.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,i){return this.request(a(i||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}p.prototype[e]=t(),p.prototype[e+"Form"]=t(!0)})),e.exports=p},857:(e,t,n)=>{"use strict";var r=n(214);function i(e,t,n,r,i){Error.call(this),this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i)}r.inherits(i,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var o=i.prototype,s={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach((function(e){s[e]={value:e}})),Object.defineProperties(i,s),Object.defineProperty(o,"isAxiosError",{value:!0}),i.from=function(e,t,n,s,a,c){var u=Object.create(o);return r.toFlatObject(e,u,(function(e){return e!==Error.prototype})),i.call(u,e.message,t,n,s,a),u.name=e.name,c&&Object.assign(u,c),u},e.exports=i},203:(e,t,n)=>{"use strict";var r=n(214);function i(){this.handlers=[]}i.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},i.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},i.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=i},249:(e,t,n)=>{"use strict";var r=n(522),i=n(906);e.exports=function(e,t){return e&&!r(t)?i(e,t):t}},786:(e,t,n)=>{"use strict";var r=n(214),i=n(385),o=n(530),s=n(852),a=n(762);function c(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new a}e.exports=function(e){return c(e),e.headers=e.headers||{},e.data=i.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return c(e),t.data=i.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return o(t)||(c(e),t&&t.response&&(t.response.data=i.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},275:(e,t,n)=>{"use strict";var r=n(214);e.exports=function(e,t){t=t||{};var n={};function i(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function o(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:i(void 0,e[n]):i(e[n],t[n])}function s(e){if(!r.isUndefined(t[e]))return i(void 0,t[e])}function a(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:i(void 0,e[n]):i(void 0,t[n])}function c(n){return n in t?i(e[n],t[n]):n in e?i(void 0,e[n]):void 0}var u={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c};return r.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=u[e]||o,i=t(e);r.isUndefined(i)&&t!==c||(n[e]=i)})),n}},795:(e,t,n)=>{"use strict";var r=n(857);e.exports=function(e,t,n){var i=n.config.validateStatus;n.status&&i&&!i(n.status)?t(new r("Request failed with status code "+n.status,[r.ERR_BAD_REQUEST,r.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}},385:(e,t,n)=>{"use strict";var r=n(214),i=n(852);e.exports=function(e,t,n){var o=this||i;return r.forEach(n,(function(n){e=n.call(o,e,t)})),e}},852:(e,t,n)=>{"use strict";var r=n(214),i=n(559),o=n(857),s=n(70),a=n(247),c={"Content-Type":"application/x-www-form-urlencoded"};function u(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var l,p={transitional:s,adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(l=n(784)),l),transformRequest:[function(e,t){if(i(t,"Accept"),i(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e))return e;if(r.isArrayBufferView(e))return e.buffer;if(r.isURLSearchParams(e))return u(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var n,o=r.isObject(e),s=t&&t["Content-Type"];if((n=r.isFileList(e))||o&&"multipart/form-data"===s){var c=this.env&&this.env.FormData;return a(n?{"files[]":e}:e,c&&new c)}return o||"application/json"===s?(u(t,"application/json"),function(e,t,n){if(r.isString(e))try{return(0,JSON.parse)(e),r.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||p.transitional,n=t&&t.silentJSONParsing,i=t&&t.forcedJSONParsing,s=!n&&"json"===this.responseType;if(s||i&&r.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(s){if("SyntaxError"===e.name)throw o.from(e,o.ERR_BAD_RESPONSE,this,null,this.response);throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:n(245)},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){p.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){p.headers[e]=r.merge(c)})),e.exports=p},70:e=>{"use strict";e.exports={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},538:e=>{e.exports={version:"0.27.2"}},633:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},923:(e,t,n)=>{"use strict";var r=n(214);function i(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var o;if(n)o=n(t);else if(r.isURLSearchParams(t))o=t.toString();else{var s=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(i(t)+"="+i(e))})))})),o=s.join("&")}if(o){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},906:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},634:(e,t,n)=>{"use strict";var r=n(214);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,i,o,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(i)&&a.push("path="+i),r.isString(o)&&a.push("domain="+o),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},522:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}},608:(e,t,n)=>{"use strict";var r=n(214);e.exports=function(e){return r.isObject(e)&&!0===e.isAxiosError}},629:(e,t,n)=>{"use strict";var r=n(214);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function i(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=i(window.location.href),function(t){var n=r.isString(t)?i(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},559:(e,t,n)=>{"use strict";var r=n(214);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},245:e=>{e.exports=null},694:(e,t,n)=>{"use strict";var r=n(214),i=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,o,s={};return e?(r.forEach(e.split("\n"),(function(e){if(o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t){if(s[t]&&i.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}})),s):s}},222:e=>{"use strict";e.exports=function(e){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}},684:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},247:(e,t,n)=>{"use strict";var r=n(214);e.exports=function(e,t){t=t||new FormData;var n=[];function i(e){return null===e?"":r.isDate(e)?e.toISOString():r.isArrayBuffer(e)||r.isTypedArray(e)?"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}return function e(o,s){if(r.isPlainObject(o)||r.isArray(o)){if(-1!==n.indexOf(o))throw Error("Circular reference detected in "+s);n.push(o),r.forEach(o,(function(n,o){if(!r.isUndefined(n)){var a,c=s?s+"."+o:o;if(n&&!s&&"object"==typeof n)if(r.endsWith(o,"{}"))n=JSON.stringify(n);else if(r.endsWith(o,"[]")&&(a=r.toArray(n)))return void a.forEach((function(e){!r.isUndefined(e)&&t.append(c,i(e))}));e(n,c)}})),n.pop()}else t.append(s,i(o))}(e),t}},218:(e,t,n)=>{"use strict";var r=n(538).version,i=n(857),o={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){o[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var s={};o.transitional=function(e,t,n){function o(e,t){return"[Axios v"+r+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(n,r,a){if(!1===e)throw new i(o(r," has been removed"+(t?" in "+t:"")),i.ERR_DEPRECATED);return t&&!s[r]&&(s[r]=!0,console.warn(o(r," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,r,a)}},e.exports={assertOptions:function(e,t,n){if("object"!=typeof e)throw new i("options must be an object",i.ERR_BAD_OPTION_VALUE);for(var r=Object.keys(e),o=r.length;o-- >0;){var s=r[o],a=t[s];if(a){var c=e[s],u=void 0===c||a(c,s,e);if(!0!==u)throw new i("option "+s+" must be "+u,i.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new i("Unknown option "+s,i.ERR_BAD_OPTION)}},validators:o}},214:(e,t,n)=>{"use strict";var r,i=n(633),o=Object.prototype.toString,s=(r=Object.create(null),function(e){var t=o.call(e);return r[t]||(r[t]=t.slice(8,-1).toLowerCase())});function a(e){return e=e.toLowerCase(),function(t){return s(t)===e}}function c(e){return Array.isArray(e)}function u(e){return void 0===e}var l=a("ArrayBuffer");function p(e){return null!==e&&"object"==typeof e}function d(e){if("object"!==s(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}var f=a("Date"),h=a("File"),m=a("Blob"),b=a("FileList");function I(e){return"[object Function]"===o.call(e)}var N=a("URLSearchParams");function g(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),c(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}var v,y=(v="undefined"!=typeof Uint8Array&&Object.getPrototypeOf(Uint8Array),function(e){return v&&e instanceof v});e.exports={isArray:c,isArrayBuffer:l,isBuffer:function(e){return null!==e&&!u(e)&&null!==e.constructor&&!u(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){var t="[object FormData]";return e&&("function"==typeof FormData&&e instanceof FormData||o.call(e)===t||I(e.toString)&&e.toString()===t)},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&l(e.buffer)},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:p,isPlainObject:d,isUndefined:u,isDate:f,isFile:h,isBlob:m,isFunction:I,isStream:function(e){return p(e)&&I(e.pipe)},isURLSearchParams:N,isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:g,merge:function e(){var t={};function n(n,r){d(t[r])&&d(n)?t[r]=e(t[r],n):d(n)?t[r]=e({},n):c(n)?t[r]=n.slice():t[r]=n}for(var r=0,i=arguments.length;r<i;r++)g(arguments[r],n);return t},extend:function(e,t,n){return g(t,(function(t,r){e[r]=n&&"function"==typeof t?i(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e},inherits:function(e,t,n,r){e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,n&&Object.assign(e.prototype,n)},toFlatObject:function(e,t,n){var r,i,o,s={};t=t||{};do{for(i=(r=Object.getOwnPropertyNames(e)).length;i-- >0;)s[o=r[i]]||(t[o]=e[o],s[o]=!0);e=Object.getPrototypeOf(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:s,kindOfTest:a,endsWith:function(e,t,n){e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;var r=e.indexOf(t,n);return-1!==r&&r===n},toArray:function(e){if(!e)return null;var t=e.length;if(u(t))return null;for(var n=new Array(t);t-- >0;)n[t]=e[t];return n},isTypedArray:y,isFileList:b}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}(()=>{"use strict";let e,t=document.createElement("template");t.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_datasphere" name="ifm_datasphere">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n      <mvc:View\n        controllerName="ifm.datasphere.initial"\n        xmlns:core="sap.ui.core"\n        xmlns:m="sap.m"\n        xmlns:mvc="sap.ui.core.mvc">\n        <m:VBox>\n          <m:Panel headerText="Trigger DataSphere Task Chain">            \n            <m:FlexBox\n              height="100%"\n              alignItems="Start"\n              justifyContent="Center">\n                <m:Button text="Execute Task Chain"\n                    press="onPress"\n                    ariaDescribedBy="defaultButtonDescription genericButtonDescription">\n                </m:Button>\n            </m:FlexBox>\n          </m:Panel>\n        </m:VBox>\n      </mvc:View>\n    <\/script>\n  ';class r extends HTMLElement{constructor(){super(),e=this.attachShadow({mode:"open"}),e.appendChild(t.content.cloneNode(!0)),this._export_settings={},this._export_settings.restapiurl="",this._export_settings.DWC_clientID="",this._export_settings.DWC_apiSecret="",this._export_settings.DWC_oAuthURL="",this._export_settings.DWC_tokenURL="",this._export_settings.DWC_taskChain="",this._export_settings.DWC_redirectURL=""}onCustomWidgetResize(e,t){}connectedCallback(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(e){"designMode"in e&&(this._designMode=e.designMode)}onCustomWidgetAfterUpdate(e){this.buildUI(e,this)}get restapiurl(){return this._export_settings.restapiurl}set restapiurl(e){this._export_settings.restapiurl=e}get DWC_clientID(){return this._export_settings.DWC_clientID}set DWC_clientID(e){this._export_settings.DWC_clientID=e}get DWC_apiSecret(){return this._export_settings.DWC_apiSecret}set DWC_apiSecret(e){this._export_settings.DWC_apiSecret=e}get DWC_oAuthURL(){return this._export_settings.DWC_oAuthURL}set DWC_oAuthURL(e){this._export_settings.DWC_oAuthURL=e}get DWC_tokenURL(){return this._export_settings.DWC_tokenURL}set DWC_tokenURL(e){this._export_settings.DWC_tokenURL=e}get DWC_taskChain(){return this._export_settings.DWC_taskChain}set DWC_taskChain(e){this._export_settings.DWC_taskChain=e}static get observedAttributes(){return["restapiurl","DWC_clientID","DWC_apiSecret","DWC_oAuthURL","DWC_tokenURL","DWC_taskChain"]}_doOAuth2(e){var t=new Headers;t.append("Authorization","Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZHdjLWluZm9tb3Rpb24uYXV0aGVudGljYXRpb24uZXUxMC5oYW5hLm9uZGVtYW5kLmNvbS90b2tlbl9rZXlzIiwia2lkIjoiZGVmYXVsdC1qd3Qta2V5LTI4Njg5MjQxMyIsInR5cCI6IkpXVCIsImppZCI6ICIrYzl4NXV0YzZObHRmWFpHVDZic2M0Y2RMR2kvTlpnRVJzVnFYNGczMk13PSJ9.eyJqdGkiOiJkYmM5ODIzNzNhNGY0NWQ0YmZkY2U0ZDNkY2U2NTFkZSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIwN2EzMThlNS04ODdmLTRiZWUtOWY1MC0xOTg3ODg3MTE2MzgiLCJ6ZG4iOiJkd2MtaW5mb21vdGlvbiIsInNlcnZpY2VpbnN0YW5jZWlkIjoiNTc0NzcwNTItNDI0Yi00ZmZmLWFmYjctY2MwNTA4OTUzNDVjIn0sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnNhbWwuZ3JvdXBzIjpbInNhYyJdLCJ4cy5yb2xlY29sbGVjdGlvbnMiOlsic2FjLnVzZXJzIl19LCJnaXZlbl9uYW1lIjoibmh1LWN1b25nLm5nbyIsInhzLnVzZXIuYXR0cmlidXRlcyI6e30sImZhbWlseV9uYW1lIjoiaW5mb21vdGlvbi5kZSIsInN1YiI6Ijg0NmI0MTk4LTY2Y2MtNGY3MC04MWQwLTJhNDFlMzExNWY3OCIsInNjb3BlIjpbIm9wZW5pZCIsImFwcHJvdXRlci1zYWMtc2FjZXUxMCF0MzY1MC5zYXAuZnBhLnVzZXIiLCJ1YWEudXNlciJdLCJjbGllbnRfaWQiOiJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJjaWQiOiJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJhenAiOiJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwidXNlcl9pZCI6Ijg0NmI0MTk4LTY2Y2MtNGY3MC04MWQwLTJhNDFlMzExNWY3OCIsIm9yaWdpbiI6ImhhbmFjbG91ZHNlcnZpY2VzLWV1LmFjY291bnRzLm9uZGVtYSIsInVzZXJfbmFtZSI6Im5odS1jdW9uZy5uZ29AaW5mb21vdGlvbi5kZSIsImVtYWlsIjoibmh1LWN1b25nLm5nb0BpbmZvbW90aW9uLmRlIiwiYXV0aF90aW1lIjoxNjg3OTgwNTU5LCJyZXZfc2lnIjoiMzM4ODg1NzIiLCJpYXQiOjE2ODc5ODA1NjAsImV4cCI6MTY4Nzk4NDE2MCwiaXNzIjoiaHR0cHM6Ly9kd2MtaW5mb21vdGlvbi5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiMDdhMzE4ZTUtODg3Zi00YmVlLTlmNTAtMTk4Nzg4NzExNjM4IiwiYXVkIjpbImFwcHJvdXRlci1zYWMtc2FjZXUxMCF0MzY1MC5zYXAuZnBhIiwic2ItYTZkMDk5NjgtOWNmMi00OTQwLWE3MjUtYmM2OWYzZTg3NWZmIWIxMDYzNDN8Y2xpZW50IWIzNjUwIiwidWFhIiwib3BlbmlkIl19.gssmp3h0FbrXxjtvrBm-n9IWetGeVmMQSvAspOOAwMrOfsZu6XgJICMD2vcTDuarZR2e4hQdNrd6QHAF7NtzqxollmUa7NLZNwFzVmGUPeDYzdXB6yujOJX2cCKdzq9k_aJlyysFAA4ZarV5YqtJ_lb1abekWikWHzycZVlgw0qBPqBcDlMiCZlNTm6djvTNxh87-9H6MsFeMxnr1Ba8qu5YclWrza6Mc_CauzxxkBUMZ_1JHM0Y180YLlXkDF1cIjWs48_-Ef01M8m3qqmsrxhH8gb26kNKP2bJu91JI302ArttCV6SHFcAqVkKf5WRK2lcuxaAOnA7CthCNyrYRQ"),t.append("Cookie","signature; JSESSIONID=s%3AKzDHnBXSiRSb9xTG1LiNxqlCCPkNpOWO.Mz%2BXxdbcvbGg9zjqex24%2FwopHUWuj0whIx0E1Dd2NBg; __VCAP_ID__=efeff00f-03a4-412b-4a11-649d"),fetch("https://dwc-infomotion.eu10.hcs.cloud.sap/dwaas-core/tf/BU_SINGER/taskchains/Task_Chain_1/start",{method:"POST",headers:t,redirect:"follow"}).then((e=>e.text())).then((e=>console.log(e))).catch((e=>console.log("error",e)))}getAccessToken(){var e=n(63).default,t={method:"GET",url:this._export_settings.DWC_oAuthURL,headers:{"content-type":"application/x-www-form-urlencoded"},data:new URLSearchParams({grant_type:"client_credentials",client_id:this._export_settings.DWC_clientID,client_secret:this._export_settings.DWC_apiSecret})};e.request(t).then((function(e){console.log(e.data)})).catch((function(e){console.error(e)}))}getCSRFToken(){var e=null,t=new XMLHttpRequest;return t.withCredentials=!0,t.addEventListener("readystatechange",(function(){4===this.readyState&&(e=t.getResponseHeader("x-csrf-token"),console.log(e))})),t.open("GET","https://dwc-infomotion.eu10.hcs.cloud.sap/api/v1/dwc/catalog/spaces",!1),t.setRequestHeader("x-csrf-token","Fetch"),t.setRequestHeader("Accept","application/json"),t.setRequestHeader("Content-Type","application/json; charset=utf-8"),t.send(),e}executeTaskChain(){var e=new XMLHttpRequest;e.withCredentials=!0,e.addEventListener("readystatechange",(function(){4===this.readyState&&console.log(this.responseText)})),e.open("POST","https://dwc-infomotion.eu10.hcs.cloud.sap/dwaas-core/tf/BU_SINGER/taskchains/Task_Chain_1/start"),e.setRequestHeader("Authorization","Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZHdjLWluZm9tb3Rpb24uYXV0aGVudGljYXRpb24uZXUxMC5oYW5hLm9uZGVtYW5kLmNvbS90b2tlbl9rZXlzIiwia2lkIjoiZGVmYXVsdC1qd3Qta2V5LTI4Njg5MjQxMyIsInR5cCI6IkpXVCIsImppZCI6ICJJRysyZjFVbWhtbytXNEdwRDRYWUFPME5JUnlBWEd3emdFQUZSdklaS3Y4PSJ9.eyJqdGkiOiJmYzMzNGIyMWJiZTA0MzVlODRlMTk3NDU3NTNlZmI1YSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIwN2EzMThlNS04ODdmLTRiZWUtOWY1MC0xOTg3ODg3MTE2MzgiLCJ6ZG4iOiJkd2MtaW5mb21vdGlvbiIsInNlcnZpY2VpbnN0YW5jZWlkIjoiNTc0NzcwNTItNDI0Yi00ZmZmLWFmYjctY2MwNTA4OTUzNDVjIn0sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnNhbWwuZ3JvdXBzIjpbInNhYyJdLCJ4cy5yb2xlY29sbGVjdGlvbnMiOlsic2FjLnVzZXJzIl19LCJnaXZlbl9uYW1lIjoiZGF2aWQud3VybSIsInhzLnVzZXIuYXR0cmlidXRlcyI6e30sImZhbWlseV9uYW1lIjoiaW5mb21vdGlvbi5kZSIsInN1YiI6IjJlMzU0ZDU2LThhZmQtNDEwYS05Y2RlLWU2ODAyYTk5Yzc0MyIsInNjb3BlIjpbIm9wZW5pZCIsImFwcHJvdXRlci1zYWMtc2FjZXUxMCF0MzY1MC5zYXAuZnBhLnVzZXIiLCJ1YWEudXNlciJdLCJjbGllbnRfaWQiOiJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJjaWQiOiJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJhenAiOiJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwidXNlcl9pZCI6IjJlMzU0ZDU2LThhZmQtNDEwYS05Y2RlLWU2ODAyYTk5Yzc0MyIsIm9yaWdpbiI6ImhhbmFjbG91ZHNlcnZpY2VzLWV1LmFjY291bnRzLm9uZGVtYSIsInVzZXJfbmFtZSI6ImRhdmlkLnd1cm1AaW5mb21vdGlvbi5kZSIsImVtYWlsIjoiZGF2aWQud3VybUBpbmZvbW90aW9uLmRlIiwiYXV0aF90aW1lIjoxNjg3ODc5NDY3LCJyZXZfc2lnIjoiMTYxMzM2ODYiLCJpYXQiOjE2ODc4Nzk2ODYsImV4cCI6MTY4Nzg4MzI4NiwiaXNzIjoiaHR0cHM6Ly9kd2MtaW5mb21vdGlvbi5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiMDdhMzE4ZTUtODg3Zi00YmVlLTlmNTAtMTk4Nzg4NzExNjM4IiwiYXVkIjpbImFwcHJvdXRlci1zYWMtc2FjZXUxMCF0MzY1MC5zYXAuZnBhIiwic2ItYTZkMDk5NjgtOWNmMi00OTQwLWE3MjUtYmM2OWYzZTg3NWZmIWIxMDYzNDN8Y2xpZW50IWIzNjUwIiwidWFhIiwib3BlbmlkIl19.GdYP2i50VR3-KfL1tY7KZ7AlOhNB7AF_WIj8afT2JWXSrBqoQgheAHF9Wv9aw8uXjanTFO-t9W7XE3V1yC_b2Jzo0Ng8TCa-3y-7nOxQfry10lr_qAqk_nRjD9cuWlEeseYe5VhpGL1a4M3Q5bO50-hgWEEXtyjlUpXbhD8V_p1NIypn3eEGlsNZtxOGOlNWBDv9_O0_6yVRLNyk5gpLFfqq1Ddu5sp_o4nToz4VXcmpn6MvrOU449v3R9m_MMiIsq3pPjfhYb2QD2mvMcHi7jCbLXNidlHcPDC1XgH6yL6IHrNtK33seMG7XWrqK7Yw3uypxCW_mdjINCyu9uWgCg"),e.setRequestHeader("Cookie","JSESSIONID=s%3A_EvTAY82EYX4VjpkDv0enuqPGJ9ucLLg.ni2gKCxZCFc2GQ%2B9dOIB3EJCF%2B5q0G15gj0w8KvuT%2B4; __VCAP_ID__=eb6a6391-93e0-4a14-5225-796d"),e.send()}attributeChangedCallback(e,t,n){t!=n&&(this[e]=n)}buildUI(t,n){var r=n;let i=document.createElement("div");i.slot="content",r.appendChild(i),sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/library"],(function(e){return e.extend("ifm.datasphere.initial",{onPress:function(e){r._export_settings.DWC_clientID,r._export_settings.DWC_apiSecret,r._export_settings.DWC_oAuthURL,r._export_settings.DWC_taskChain,r.getAccessToken()}})})),new sap.ui.core.mvc.XMLView({viewContent:jQuery(e.getElementById("oView")).html()}).placeAt(i)}}customElements.define("com-ifm-datasphere",r)})()})();