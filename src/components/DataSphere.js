import { OAuth2Client, OAuth2Fetch, generateCodeVerifier } from '@badgateway/oauth2-client';
let _shadowRoot;
let tmpl = document.createElement("template");
tmpl.innerHTML = `
    <style>
    </style>
    <div id="ifm_datasphere" name="ifm_datasphere">
      <slot name="content"></slot>
    </div>
    <script id="oView" name="oView" type="sapui5/xmlview">
      <mvc:View
        controllerName="ifm.datasphere.initial"
        xmlns:core="sap.ui.core"
        xmlns:m="sap.m"
        xmlns:mvc="sap.ui.core.mvc">
        <m:VBox>        
          <m:FlexBox
            height="100%">
              <m:Button text="Execute Task Chain"
                icon="sap-icon://process"
                press="onPress"
                ariaDescribedBy="defaultButtonDescription genericButtonDescription">
              </m:Button>
          </m:FlexBox>
        </m:VBox>
      </mvc:View>
    </script>
  `;

export default class IFMDataSphere extends HTMLElement {

  constructor() {
    super();

    _shadowRoot = this.attachShadow({
      mode: "open"
    });

    _shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this._export_settings = {};
    this._export_settings.DSP_serverURL = "";
    this._export_settings.DSP_clientID = "";
    this._export_settings.DSP_apiSecret = "";
    this._export_settings.DSP_oAuthURL = "";
    this._export_settings.DSP_tokenURL = "";
    this._export_settings.DSP_taskChain = "";
    this._export_settings.DSP_redirectURL = "";
    this._export_settings.DSP_OAuth2Client = null;
    this._export_settings.DSP_authorizationCode = "";
    this._export_settings.DSP_token = "";

  }

  onCustomWidgetResize(width, height) {
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  onCustomWidgetBeforeUpdate(changedProperties) {
  }

  onCustomWidgetAfterUpdate(changedProperties) {
    this.buildUI(this);
  }

  // SETTINGS
  get DSP_serverURL() {
    return this._export_settings.DSP_serverURL;
  }
  set DSP_serverURL(value) {
    this._export_settings.DSP_serverURL = value;
  }

  get DSP_redirectURL() {
    return this._export_settings.DSP_redirectURL;
  }
  set DSP_redirectURL(value) {
    this._export_settings.DSP_redirectURL = value;
  }

  get DSP_clientID() {
    return this._export_settings.DSP_clientID;
  }
  set DSP_clientID(value) {
    this._export_settings.DSP_clientID = value;
  }

  get DSP_apiSecret() {
    return this._export_settings.DSP_apiSecret;
  }
  set DSP_apiSecret(value) {
    this._export_settings.DSP_apiSecret = value;
  }

  get DSP_oAuthURL() {
    return this._export_settings.DSP_oAuthURL;
  }
  set DSP_oAuthURL(value) {
    this._export_settings.DSP_oAuthURL = value;
  }

  get DSP_tokenURL() {
    return this._export_settings.DSP_tokenURL;
  }
  set DSP_tokenURL(value) {
    this._export_settings.DSP_tokenURL = value;
  }

  get DSP_taskChain() {
    return this._export_settings.DSP_taskChain;
  }
  set DSP_taskChain(value) {
    this._export_settings.DSP_taskChain = value;
  }

  static get observedAttributes() {
    return [
      "DSP_serverURL",
      "DSP_clientID",
      "DSP_apiSecret",
      "DSP_oAuthURL",
      "DSP_tokenURL",
      "DSP_taskChain",
      "DSP_redirectURL"
    ];
  }

  performOAuth2() {
    this.setOAuth2Client();
    this.getAuthorizationCode().then((response) => {
      console.log(response);
    });
    // this.extractAuthorizationCode();
    // this.getAccessToken();
    console.log(this._export_settings.DSP_token);

  }

  setOAuth2Client() {
    // const authURL = encodeURI(`${this._export_settings.DSP_oAuthURL}?response_type=code&client_id=${this._export_settings.DSP_clientID}&redirect_uri=${this._export_settings.DSP_redirectURL}`);
    this._export_settings.DSP_OAuth2Client = new OAuth2Client({
      server: this._export_settings.DSP_serverURL,
      clientId: this._export_settings.DSP_clientID,
      clientSecret: this._export_settings.DSP_apiSecret,
      tokenEndpoint: '/oauth/token',
      authorizationEndpoint: '/oauth/authorize',
    });

  }

  extractAuthorizationCode() {
    const urlParams = new URLSearchParams(window.location.search);
    this._export_settings.DSP_authorizationCode = urlParams.get('code');
  }

  async getAuthorizationCode() {

    // Use codeVerifier as soon as DataSphere supports PCKE Authorization
    // currently only authorization code is supported
    // const codeVerifier = await generateCodeVerifier();
    // console.log(codeVerifier)

    // start authorization process
    // document.location = await this._export_settings.DSP_OAuth2Client.authorizationCode.getAuthorizeUri({
    //   redirectUri: this._export_settings.DSP_redirectURL
    //   // in case DataSphere supports PCKE remove the below comment
    //   // codeVerifier
    // });
    const authURL = encodeURI(`${this._export_settings.DSP_oAuthURL}?response_type=code&client_id=${this._export_settings.DSP_clientID}`); //&redirect_uri=${this._export_settings.DSP_redirectURL}
    document.location.href = authURL;
    window.addEventListener('load', function () {
      if (document.location.href.includes('code')) {
        this.extractAuthorizationCode();
      };
      this.window.history.back;
    })

  }

  async getAccessToken() {

    this._export_settings.DSP_token = await this._export_settings.DSP_OAuth2Client.authorizationCode.getTokenFromCodeRedirect(
      document.location,
      {
        code: this._export_settings.DSP_authorizationCode,
        redirectUri: this._export_settings.DSP_redirectURL
      }
    );
    // const tokenURL = encodeURI(`${this._export_settings.DSP_serverURL}/oauth/token`);

    // var data = 'grant_type=authorization_code'
    //   + '&code=' + this._export_settings.DSP_authorizationCode
    //   + '&client_id=' + this._export_settings.DSP_clientID
    //   + '&client_secret=' + encodeURIComponent(this._export_settings.DSP_apiSecret)
    //   + '&redirect_uri=' + encodeURIComponent(this._export_settings.DSP_redirectURL);

    // var xhr = new XMLHttpRequest()
    // xhr.open('POST', tokenURL, true);

    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // xhr.setRequestHeader('Accept', '*/*');
    // xhr.setRequestHeader('x-sap-sac-custom-auth', 'true');


    // xhr.onerror = (err) => {
    //   console.log(err);
    // }
    // xhr.onreadystatechange = (e) => {
    //   var state = e;

    //   if (xhr.readyState == 4) {
    //     if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
    //       var jsonResult = JSON.parse(xhr.responseText);
    //       var access_token = {
    //         token: jsonResult.access_token,
    //         expires_in: new Date((new Date()).getTime() +
    //           (jsonResult.expires_in - 300) * 1000)
    //       };
    //       console.log(access_token);

    //     } else {
    //       //reject(xhr);
    //     }
    //   }
    // };

    // xhr.send(data);

    // Fallback

    // var axios = require("axios");
    // var querystring = require("querystring");
    // const base64Token = `${this._export_settings.DSP_clientID}:${this._export_settings.DSP_apiSecret}`;
    // var encodedToken = Buffer.from(base64Token).toString('base64');
    // const tokenURL = encodeURI(`${this._export_settings.DSP_serverURL}/oauth/token`);


    // await axios.post(
    //   tokenURL,
    //   querystring.stringify({
    //     'grant_type': 'authorization_code',
    //     'code': this._export_settings.DSP_authorizationCode,
    //     'redirect_uri': this._export_settings.DSP_redirectURL
    //   }),
    //   {
    //     headers: {
    //       'Authorization': 'Basic ' + encodedToken,
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'Accept': '*/*',
    //       'x-sap-sac-custom-auth': true,
    //       'Connection': 'keep-alive'
    //     }
    //   }
    // ).then((response) => {
    //   console.log(response);
    // }).catch((err) => {
    //   console.log(err);
    // });

  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue != newValue) {
      this[name] = newValue;
    }
  }

  buildUI(that) {
    var that_ = that;

    let content = document.createElement('div');
    content.slot = "content";
    that_.appendChild(content);

    sap.ui.define(
      [
        "sap/ui/core/mvc/Controller",
        "sap/m/Dialog",
        "sap/m/Button",
        "sap/ui/core/library",
      ],
      function (Controller, Dialog, Button) {
        "use strict";

        return Controller.extend("ifm.datasphere.initial", {

          onPress: function (oEvent) {
            // that_.performOAuth2();
            const authURL = encodeURI(`${that_._export_settings.DSP_oAuthURL}?response_type=code&client_id=${that_._export_settings.DSP_clientID}&redirect_uri=${that_._export_settings.DSP_redirectURL}`);
            var ui5Frame = new sap.ui.core.HTML({
              content: `'<iframe id="authorizationFrame" src="${authURL}" style="width: 100 %; height: 500px;"></iframe>'`
            });
            var ui5Dialog = Dialog({
              title: "Authorization",
              content: ["test"],
              buttons: [
                new Button({
                  text: "Close",
                  press: function () {
                    ui5Dialog.close();
                  }
                })
              ],
              afterClose: function () {
                ui5Dialog.destroyContent();
              }
            });
            ui5Dialog.open();
          },

        });

      });

    //### THE APP: place the XMLView somewhere into DOM ###
    var oView = new sap.ui.core.mvc.XMLView({
      viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
    });
    oView.placeAt(content);

  }
}

