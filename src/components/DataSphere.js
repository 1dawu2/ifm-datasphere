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
    this.getAuthorizationCode();
    this.extractAuthorizationCode();
    this.getAccessToken();
  }

  setOAuth2Client() {
    const authURL = encodeURI(`${this._export_settings.DSP_oAuthURL}?response_type=code&client_id=${this._export_settings.DSP_clientID}&redirect_uri=${this._export_settings.DSP_redirectURL}`);
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

    console.log(this._export_settings.DSP_OAuth2Client);

    // Use codeVerifier as soon as DataSphere supports PCKE Authorization
    // currently only authorization code is supported
    // const codeVerifier = await generateCodeVerifier();
    // console.log(codeVerifier)

    // start authorization process
    document.location = await this._export_settings.DSP_OAuth2Client.authorizationCode.getAuthorizeUri({
      redirectUri: this._export_settings.DSP_redirectURL
      // in case DataSphere supports PCKE remove the below comment
      // codeVerifier
    });
  }

  getAccessToken() {
    this._export_settings.DSP_OAuth2Client.authorizationCode.getToken({
      code: this._export_settings.DSP_authorizationCode,
      redirectUri: this._export_settings.DSP_redirectURL
    });

    const fetchWrapper = new OAuth2Fetch({
      client: this._export_settings.DSP_OAuth2Client
      /**
       * You are responsible for implementing this function.
       * it's purpose is to supply the 'initial' oauth2 token.
       */
      // getNewToken: async () => {

      //   return this._export_settings.DSP_OAuth2Client.authorizationCode({
      //     code: this._export_settings.DSP_authorizationCode,
      //     redirectUri: this._export_settings.DSP_redirectURL,
      //   });
      // },
      // onError: (err) => {
      //   // error handling
      //   console.log(err);
      //   sap.ui.define([
      //     "sap/ui/core/mvc/Controller",
      //     "sap/m/MessageBox",
      //     "sap/m/MessageToast"
      //   ], function (Controller, MessageBox, MessageToast) {
      //     "use strict";
      //     sap.m.MessageBox.error("Some error during token retrieval");
      //   });
      // }

    });
    console.log(fetchWrapper);
    // Fallback

    // var axios = require("axios");
    // var querystring = require("querystring");
    // const base64Token = `${this._export_settings.DSP_clientID}:${this._export_settings.DSP_apiSecret}`;
    // var encodedToken = Buffer.from(base64Token).toString('base64');
    // const authorizationURL = encodeURI(`${this._export_settings.DSP_oAuthURL}?response_type=code&client_id=${this._export_settings.DSP_clientID}&redirect_uri=${this._export_settings.DSP_redirectURL}`);

    // axios.post(
    //   'https://dwc-infomotion.authentication.eu10.hana.ondemand.com/oauth/token',
    //   querystring.stringify({
    //     'grant_type': 'authorization_code',
    //     'code': 'gIs6Qrf6N0A5pIfjGz72l67XVm08Tw4s'
    //   }),
    //   {
    //     headers: {
    //       'Authorization': 'Basic ' + encodedToken,
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'Accept': '*/*'
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
        "sap/ui/core/library",
      ],
      function (Controller) {
        "use strict";

        return Controller.extend("ifm.datasphere.initial", {

          onPress: function (oEvent) {
            that_.performOAuth2();
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

