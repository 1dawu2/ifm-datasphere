(()=>{var n={448:()=>{document.createElement("template").innerHTML='\n    <style>\n    </style>\n    <div id="ifm_datasphere" name="ifm_datasphere">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n    <mvc:View\n      controllerName="ifm.datasphere.initial"\n      xmlns:core="sap.ui.core"\n      xmlns:t="sap.ui.table"\n      xmlns:m="sap.m"\n      xmlns:f="sap.f"\n      xmlns:card="sap.f.cards"\n      xmlns:mvc="sap.ui.core.mvc"\n      xmlns:tnt="sap.tnt">\n      <m:content></m:content>\n        <m:Page\n          title="Page"\n          class="sapUiContentPadding">\n          <m:content>\n            <m:HBox>\n              <m:Button text="Default"\n                  press="onPress"\n                  ariaDescribedBy="defaultButtonDescription genericButtonDescription">\n              </m:Button>\n            </m:HBox>\n          </m:content>\n        </m:Page>\n      </mvc:View>\n    <\/script>\n  '}},e={};function t(a){var r=e[a];if(void 0!==r)return r.exports;var s=e[a]={exports:{}};return n[a](s,s.exports,t),s.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var a in e)t.o(e,a)&&!t.o(n,a)&&Object.defineProperty(n,a,{enumerable:!0,get:e[a]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{"use strict";var n=t(448),e=t.n(n);customElements.define("com-ifm-datasphere",e())})()})();