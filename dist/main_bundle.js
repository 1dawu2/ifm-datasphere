(()=>{var e={336:e=>{var t;self,t=()=>(()=>{var e={934:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.generateQueryString=t.tokenResponseToOAuth2Token=t.OAuth2Client=void 0;const r=n(443),i=n(618);function o(e,t){return new URL(e,t).toString()}function s(e){return e.then((e=>{var t;return{accessToken:e.access_token,expiresAt:e.expires_in?Date.now()+1e3*e.expires_in:null,refreshToken:null!==(t=e.refresh_token)&&void 0!==t?t:null}}))}function a(e){return new URLSearchParams(Object.fromEntries(Object.entries(e).filter((([e,t])=>void 0!==t)))).toString()}t.OAuth2Client=class{constructor(e){this.discoveryDone=!1,this.serverMetadata=null,(null==e?void 0:e.fetch)||(e.fetch=fetch),this.settings=e}async refreshToken(e){if(!e.refreshToken)throw new Error("This token didn't have a refreshToken. It's not possible to refresh this");const t={grant_type:"refresh_token",refresh_token:e.refreshToken};return this.settings.clientSecret||(t.client_id=this.settings.clientId),s(this.request("tokenEndpoint",t))}async clientCredentials(e){var t;const n=["client_id","client_secret","grant_type","scope"];if((null==e?void 0:e.extraParams)&&Object.keys(e.extraParams).filter((e=>n.includes(e))).length>0)throw new Error(`The following extraParams are disallowed: '${n.join("', '")}'`);const r={grant_type:"client_credentials",scope:null===(t=null==e?void 0:e.scope)||void 0===t?void 0:t.join(" "),...null==e?void 0:e.extraParams};if(!this.settings.clientSecret)throw new Error("A clientSecret must be provided to use client_credentials");return s(this.request("tokenEndpoint",r))}async password(e){var t;const n={grant_type:"password",...e,scope:null===(t=e.scope)||void 0===t?void 0:t.join(" ")};return s(this.request("tokenEndpoint",n))}get authorizationCode(){return new i.OAuth2AuthorizationCodeClient(this)}async introspect(e){const t={token:e.accessToken,token_type_hint:"access_token"};return this.request("introspectionEndpoint",t)}async getEndpoint(e){if(void 0!==this.settings[e])return o(this.settings[e],this.settings.server);if("discoveryEndpoint"!==e&&(await this.discover(),void 0!==this.settings[e]))return o(this.settings[e],this.settings.server);if(!this.settings.server)throw new Error(`Could not determine the location of ${e}. Either specify ${e} in the settings, or the "server" endpoint to let the client discover it.`);switch(e){case"authorizationEndpoint":return o("/authorize",this.settings.server);case"tokenEndpoint":return o("/token",this.settings.server);case"discoveryEndpoint":return o("/.well-known/oauth-authorization-server",this.settings.server);case"introspectionEndpoint":return o("/introspect",this.settings.server)}}async discover(){var e;if(this.discoveryDone)return;let t;this.discoveryDone=!0;try{t=await this.getEndpoint("discoveryEndpoint")}catch(e){return void console.warn('[oauth2] OAuth2 discovery endpoint could not be determined. Either specify the "server" or "discoveryEndpoint')}const n=await this.settings.fetch(t,{headers:{Accept:"application/json"}});if(!n.ok)return;if(!(null===(e=n.headers.get("Content-Type"))||void 0===e?void 0:e.startsWith("application/json")))return void console.warn("[oauth2] OAuth2 discovery endpoint was not a JSON response. Response is ignored");this.serverMetadata=await n.json();const r=[["authorization_endpoint","authorizationEndpoint"],["token_endpoint","tokenEndpoint"],["introspection_endpoint","introspectionEndpoint"]];if(null!==this.serverMetadata){for(const[e,n]of r)this.serverMetadata[e]&&(this.settings[n]=o(this.serverMetadata[e],t));this.serverMetadata.token_endpoint_auth_methods_supported&&!this.settings.authenticationMethod&&(this.settings.authenticationMethod=this.serverMetadata.token_endpoint_auth_methods_supported[0])}}async request(e,t){const n=await this.getEndpoint(e),i={"Content-Type":"application/x-www-form-urlencoded"};let o=this.settings.authenticationMethod;switch(o||(o=this.settings.clientSecret?"client_secret_basic":"client_secret_post"),o){case"client_secret_basic":i.Authorization="Basic "+btoa(this.settings.clientId+":"+this.settings.clientSecret);break;case"client_secret_post":t.client_id=this.settings.clientId,this.settings.clientSecret&&(t.client_secret=this.settings.clientSecret);break;default:throw new Error("Authentication method not yet supported:"+o+". Open a feature request if you want this!")}const s=await this.settings.fetch(n,{method:"POST",body:a(t),headers:i});if(s.ok)return await s.json();let c,h,u;throw s.headers.has("Content-Type")&&s.headers.get("Content-Type").startsWith("application/json")&&(c=await s.json()),(null==c?void 0:c.error)?(h="OAuth2 error "+c.error+".",c.error_description&&(h+=" "+c.error_description),u=c.error):(h="HTTP Error "+s.status+" "+s.statusText,401===s.status&&this.settings.clientSecret&&(h+=". It's likely that the clientId and/or clientSecret was incorrect"),u=null),new r.OAuth2Error(h,u,s.status)}},t.tokenResponseToOAuth2Token=s,t.generateQueryString=a},618:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCodeChallenge=t.generateCodeVerifier=t.OAuth2AuthorizationCodeClient=void 0;const r=n(934),i=n(443);async function o(e){const t=s();if(null==t?void 0:t.subtle)return["S256",c(await t.subtle.digest("SHA-256",a(e)))];{const t=n(212).createHash("sha256");return t.update(a(e)),["S256",t.digest("base64url")]}}function s(){if("undefined"!=typeof window&&window.crypto)return window.crypto;if("undefined"!=typeof self&&self.crypto)return self.crypto;const e=n(212);return e.webcrypto?e.webcrypto:null}function a(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=255&e.charCodeAt(n);return t}function c(e){return btoa(String.fromCharCode(...new Uint8Array(e))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}t.OAuth2AuthorizationCodeClient=class{constructor(e){this.client=e}async getAuthorizeUri(e){const[t,n]=await Promise.all([e.codeVerifier?o(e.codeVerifier):void 0,this.client.getEndpoint("authorizationEndpoint")]),i={client_id:this.client.settings.clientId,response_type:"code",redirect_uri:e.redirectUri,code_challenge_method:null==t?void 0:t[0],code_challenge:null==t?void 0:t[1]};return e.state&&(i.state=e.state),e.scope&&(i.scope=e.scope.join(" ")),n+"?"+(0,r.generateQueryString)(i)}async getTokenFromCodeRedirect(e,t){const{code:n}=await this.validateResponse(e,{state:t.state});return this.getToken({code:n,redirectUri:t.redirectUri,codeVerifier:t.codeVerifier})}async validateResponse(e,t){var n;const r=new URL(e).searchParams;if(r.has("error"))throw new i.OAuth2Error(null!==(n=r.get("error_description"))&&void 0!==n?n:"OAuth2 error",r.get("error"),0);if(!r.has("code"))throw new Error(`The url did not contain a code parameter ${e}`);if(t.state&&t.state!==r.get("state"))throw new Error(`The "state" parameter in the url did not match the expected value of ${t.state}`);return{code:r.get("code"),scope:r.has("scope")?r.get("scope").split(" "):void 0}}async getToken(e){const t={grant_type:"authorization_code",code:e.code,redirect_uri:e.redirectUri,code_verifier:e.codeVerifier};return(0,r.tokenResponseToOAuth2Token)(this.client.request("tokenEndpoint",t))}},t.generateCodeVerifier=async function(){const e=s();if(e){const t=new Uint8Array(32);return e.getRandomValues(t),c(t)}{const e=n(212);return new Promise(((t,n)=>{e.randomBytes(32,((e,r)=>{e&&n(e),t(r.toString("base64url"))}))}))}},t.getCodeChallenge=o},443:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.OAuth2Error=void 0;class n extends Error{constructor(e,t,n){super(e),this.oauth2Code=t,this.httpCode=n}}t.OAuth2Error=n},13:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.OAuth2Fetch=void 0,t.OAuth2Fetch=class{constructor(e){this.token=null,this.activeRefresh=null,this.refreshTimer=null,void 0===(null==e?void 0:e.scheduleRefresh)&&(e.scheduleRefresh=!0),this.options=e,e.getStoredToken&&(async()=>{this.token=await e.getStoredToken()})(),this.scheduleRefresh()}async fetch(e,t){const n=new Request(e,t);return this.mw()(n,(e=>fetch(e)))}mw(){return async(e,t)=>{const n=await this.getAccessToken();let r=e.clone();r.headers.set("Authorization","Bearer "+n);let i=await t(r);if(!i.ok&&401===i.status){const n=await this.refreshToken();r=e.clone(),r.headers.set("Authorization","Bearer "+n.accessToken),i=await t(r)}return i}}async getToken(){return this.token&&(null===this.token.expiresAt||this.token.expiresAt>Date.now())?this.token:this.refreshToken()}async getAccessToken(){return(await this.getToken()).accessToken}async refreshToken(){var e,t;if(this.activeRefresh)return this.activeRefresh;const n=this.token;this.activeRefresh=(async()=>{var e,t;let r=null;try{(null==n?void 0:n.refreshToken)&&(r=await this.options.client.refreshToken(n))}catch(e){console.warn("[oauth2] refresh token not accepted, we'll try reauthenticating")}if(r||(r=await this.options.getNewToken()),!r){const n=new Error("Unableto obtain OAuth2 tokens, a full reauth may be needed");throw null===(t=(e=this.options).onError)||void 0===t||t.call(e,n),n}return r})();try{const n=await this.activeRefresh;return this.token=n,null===(t=(e=this.options).storeToken)||void 0===t||t.call(e,n),this.scheduleRefresh(),n}catch(e){throw this.options.onError&&this.options.onError(e),e}finally{this.activeRefresh=null}}scheduleRefresh(){var e;if(!this.options.scheduleRefresh)return;if(this.refreshTimer&&(clearTimeout(this.refreshTimer),this.refreshTimer=null),!(null===(e=this.token)||void 0===e?void 0:e.expiresAt)||!this.token.refreshToken)return;const t=this.token.expiresAt-Date.now();t<12e4||(this.refreshTimer=setTimeout((async()=>{try{await this.refreshToken()}catch(e){console.error("[fetch-mw-oauth2] error while doing a background OAuth2 auto-refresh",e)}}),t-6e4))}}},212:()=>{}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}var r={};return(()=>{"use strict";var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.OAuth2Error=e.OAuth2Fetch=e.generateCodeVerifier=e.OAuth2AuthorizationCodeClient=e.OAuth2Client=void 0;var t=n(934);Object.defineProperty(e,"OAuth2Client",{enumerable:!0,get:function(){return t.OAuth2Client}});var i=n(618);Object.defineProperty(e,"OAuth2AuthorizationCodeClient",{enumerable:!0,get:function(){return i.OAuth2AuthorizationCodeClient}}),Object.defineProperty(e,"generateCodeVerifier",{enumerable:!0,get:function(){return i.generateCodeVerifier}});var o=n(13);Object.defineProperty(e,"OAuth2Fetch",{enumerable:!0,get:function(){return o.OAuth2Fetch}});var s=n(443);Object.defineProperty(e,"OAuth2Error",{enumerable:!0,get:function(){return s.OAuth2Error}})})(),r})(),e.exports=t()}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}(()=>{"use strict";var e=n(336);let t,r=document.createElement("template");r.innerHTML='\n    <style>\n    </style>\n    <div id="ifm_datasphere" name="ifm_datasphere">\n      <slot name="content"></slot>\n    </div>\n    <script id="oView" name="oView" type="sapui5/xmlview">\n      <mvc:View\n        controllerName="ifm.datasphere"\n        xmlns:core="sap.ui.core"\n        xmlns:m="sap.m"\n        xmlns:mvc="sap.ui.core.mvc">\n        <m:VBox>        \n          <m:FlexBox\n            height="100%">\n              <m:Button text="Execute Task Chain"\n                icon="sap-icon://process"\n                press="onPress"\n                ariaDescribedBy="defaultButtonDescription genericButtonDescription">\n              </m:Button>\n          </m:FlexBox>\n        </m:VBox>\n      </mvc:View>\n    <\/script>\n  ';class i extends HTMLElement{constructor(){super(),t=this.attachShadow({mode:"open"}),t.appendChild(r.content.cloneNode(!0)),this._export_settings={},this._export_settings.DSP_serverURL="",this._export_settings.DSP_clientID="",this._export_settings.DSP_apiSecret="",this._export_settings.DSP_oAuthURL="",this._export_settings.DSP_tokenURL="",this._export_settings.DSP_taskChain="",this._export_settings.DSP_redirectURL="",this._export_settings.DSP_OAuth2Client=null,this._export_settings.DSP_authorizationCode="",this._export_settings.DSP_token=""}onCustomWidgetResize(e,t){}connectedCallback(){}disconnectedCallback(){}onCustomWidgetBeforeUpdate(e){}onCustomWidgetAfterUpdate(e){this.buildUI(this)}get DSP_serverURL(){return this._export_settings.DSP_serverURL}set DSP_serverURL(e){this._export_settings.DSP_serverURL=e}get DSP_redirectURL(){return this._export_settings.DSP_redirectURL}set DSP_redirectURL(e){this._export_settings.DSP_redirectURL=e}get DSP_clientID(){return this._export_settings.DSP_clientID}set DSP_clientID(e){this._export_settings.DSP_clientID=e}get DSP_apiSecret(){return this._export_settings.DSP_apiSecret}set DSP_apiSecret(e){this._export_settings.DSP_apiSecret=e}get DSP_oAuthURL(){return this._export_settings.DSP_oAuthURL}set DSP_oAuthURL(e){this._export_settings.DSP_oAuthURL=e}get DSP_tokenURL(){return this._export_settings.DSP_tokenURL}set DSP_tokenURL(e){this._export_settings.DSP_tokenURL=e}get DSP_taskChain(){return this._export_settings.DSP_taskChain}set DSP_taskChain(e){this._export_settings.DSP_taskChain=e}static get observedAttributes(){return["DSP_serverURL","DSP_clientID","DSP_apiSecret","DSP_oAuthURL","DSP_tokenURL","DSP_taskChain","DSP_redirectURL"]}performOAuth2(){this.setOAuth2Client(),this.getAuthorizationCode().then((e=>{console.log(e)})),console.log(this._export_settings.DSP_token)}setOAuth2Client(){this._export_settings.DSP_OAuth2Client=new e.OAuth2Client({server:this._export_settings.DSP_serverURL,clientId:this._export_settings.DSP_clientID,clientSecret:this._export_settings.DSP_apiSecret,tokenEndpoint:"/oauth/token",authorizationEndpoint:"/oauth/authorize"})}extractAuthorizationCode(){const e=new URLSearchParams(window.location.search);this._export_settings.DSP_authorizationCode=e.get("code")}async getAuthorizationCode(){const e=encodeURI(`${this._export_settings.DSP_oAuthURL}?response_type=code&client_id=${this._export_settings.DSP_clientID}`);document.location.href=e,window.addEventListener("load",(function(){document.location.href.includes("code")&&this.extractAuthorizationCode(),this.window.history.back}))}async getAccessToken(){this._export_settings.DSP_token=await this._export_settings.DSP_OAuth2Client.authorizationCode.getTokenFromCodeRedirect(document.location,{code:this._export_settings.DSP_authorizationCode,redirectUri:this._export_settings.DSP_redirectURL})}attributeChangedCallback(e,t,n){t!=n&&(this[e]=n)}buildUI(e){var n=e;console.log("properties start loadthis");let r=document.createElement("div");r.slot="content",n.appendChild(r),sap.ui.getCore().attachInit((function(){sap.ui.define(["jquery.sap.global","sap/f/Card","sap/ui/core/mvc/Controller"],(function(e,t){return t.extend("ifm.datasphere",{onInit:function(e){},onPress:function(e){var t=`<iframe id='authorizationFrame' src='${encodeURI(`${n._export_settings.DSP_oAuthURL}?response_type=code&client_id=${n._export_settings.DSP_clientID}`)}' style='width: 500px; height: 500px;'></iframe>`;console.log(t);var r=new sap.ui.core.HTML({content:[t]});if(!this.oDefaultDialog){var i=new sap.f.Card({content:[r]}),o=new sap.m.ScrollContainer({height:"500px",width:"500px",content:[i]});this.oDefaultDialog=new sap.m.Dialog({title:"Authorization Code",content:[o],beginButton:new sap.m.Button({text:"OK",press:function(){this.oDefaultDialog.close()}.bind(this)})})}this.oDefaultDialog.open();var s=setInterval((function(){try{var e=document.getElementById("authorizationFrame"),t=e.contentDocument||e.contentWindow.document;-1!==t.location.href.indexOf("code")&&(clearInterval(s),new URLSearchParams(t.location.search).get("code"),this.oDefaultDialog.close())}catch(e){console.log(e)}}),1e3)}})})),sap.ui.xmlview({viewContent:jQuery(t.getElementById("oView")).html()}).placeAt(r)}))}}customElements.define("com-ifm-datasphere",i)})()})();