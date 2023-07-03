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
          <m:Panel headerText="Trigger DataSphere Task Chain">            
            <m:FlexBox
              height="100%"
              alignItems="Start"
              justifyContent="Center">
                <m:Button text="Execute Task Chain"
                    press="onPress"
                    ariaDescribedBy="defaultButtonDescription genericButtonDescription">
                </m:Button>
            </m:FlexBox>
          </m:Panel>
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
    this._export_settings.restapiurl = "";
    this._export_settings.DWC_clientID = "";
    this._export_settings.DWC_apiSecret = "";
    this._export_settings.DWC_oAuthURL = "";
    this._export_settings.DWC_tokenURL = "";
    this._export_settings.DWC_taskChain = "";
    this._export_settings.DWC_redirectURL = "";
    this._export_settings.CSRFToken = "";
    this._export_settings.Token = null;
    this._export_settings.credentials = {};
    this._export_settings.OAuthClient = null;

  }

  onCustomWidgetResize(width, height) {
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  onCustomWidgetBeforeUpdate(changedProperties) {
    if ("designMode" in changedProperties) {
      this._designMode = changedProperties["designMode"];
    }
  }

  onCustomWidgetAfterUpdate(changedProperties) {
    this.buildUI(changedProperties, this);
  }

  // SETTINGS
  get restapiurl() {
    return this._export_settings.restapiurl;
  }
  set restapiurl(value) {
    this._export_settings.restapiurl = value;
  }

  get DWC_redirectURL() {
    return this._export_settings.DWC_redirectURL;
  }
  set DWC_redirectURL(value) {
    this._export_settings.DWC_redirectURL = value;
  }

  get DWC_clientID() {
    return this._export_settings.DWC_clientID;
  }
  set DWC_clientID(value) {
    this._export_settings.DWC_clientID = value;
  }

  get DWC_apiSecret() {
    return this._export_settings.DWC_apiSecret;
  }
  set DWC_apiSecret(value) {
    this._export_settings.DWC_apiSecret = value;
  }

  get DWC_oAuthURL() {
    return this._export_settings.DWC_oAuthURL;
  }
  set DWC_oAuthURL(value) {
    this._export_settings.DWC_oAuthURL = value;
  }

  get DWC_tokenURL() {
    return this._export_settings.DWC_tokenURL;
  }
  set DWC_tokenURL(value) {
    this._export_settings.DWC_tokenURL = value;
  }

  get DWC_taskChain() {
    return this._export_settings.DWC_taskChain;
  }
  set DWC_taskChain(value) {
    this._export_settings.DWC_taskChain = value;
  }

  static get observedAttributes() {
    return [
      "restapiurl",
      "DWC_clientID",
      "DWC_apiSecret",
      "DWC_oAuthURL",
      "DWC_tokenURL",
      "DWC_taskChain",
      "DWC_redirectURL"
    ];
  }

  _doOAuth2(token) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this._export_settings.Token.accessToken);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(this._export_settings.DWC_taskChain, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }

  performAuth() {
    this.getAccessToken();
    // this.intiAuth();
    // console.log(this._export_settings.Token);
    // this._doOAuth2();

    // this.getAuthUrl();

  }

  async intiAuth() {
    const client = new OAuth2Client({
      // OAuth2 config
      // The base URI of your OAuth2 server
      server: 'https://dwc-infomotion.authentication.eu10.hana.ondemand.com',
      clientId: this._export_settings.DWC_clientID,
      // clientSecret: this._export_settings.DWC_apiSecret,
      tokenEndpoint: '/oauth/token',
      authorizationEndpoint: '/oauth/authorize'

    });

    const codeVerifier = await generateCodeVerifier();
    // In a browser this might work as follows:
    // document.location = await client.authorizationCode.getAuthorizeUri({
    //   redirectUri: 'https://bocauth.us1.sapbusinessobjects.cloud:443',
    //   // state: 'some-string',
    //   codeVerifier
    //   // scope: ['scope1', 'scope2'],
    // });

    const oauth2Token = await client.authorizationCode.getTokenFromCodeRedirect(
      document.location,
      {
        redirectUri: 'https://bocauth.us1.sapbusinessobjects.cloud:443',
        // state: 'some-string',
        codeVerifier,
      }
    );

    // const fetchWrapper = new OAuth2Fetch({
    //   client: clientOAuth2,
    //   getNewToken: async () => {
    //     return clientOAuth2.clientCredentials
    //   },
    //   onError: (err) => {
    //     throw (err);
    //   }
    // });

    // console.log(fetchWrapper);

    // const response = fetchWrapper.fetch(this._export_settings.DWC_taskChain, {
    //   method: 'POST',
    // });
    // console.log(response);
    // var ClientOAuth2 = require('client-oauth2');
    // var DataSphereAuth = new ClientOAuth2({
    //   clientId: this._export_settings.DWC_clientID,
    //   clientSecret: this._export_settings.DWC_apiSecret,
    //   accessTokenUri: this._export_settings.DWC_tokenURL,
    //   authorizationUri: this._export_settings.DWC_oAuthURL,
    //   redirectUri: this._export_settings.DWC_redirectURL
    //   // scopes: []
    // })
    // this._export_settings.OAuthClient = DataSphereAuth;
    // DataSphereAuth.credentials.getToken()
    //   .then(function (user) {
    //     console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
    //     this._export_settings.Token = user;
    //   });
  }

  getAuthUrl() {
    var returnVal = this._export_settings.OAuthClient.authorizationCode.authorizeURL({
      redirect_uri: this._export_settings.DWC_redirectURL,
      scope: scopes.join(' ')
    });
    console.log('Generated auth url: ' + returnVal);

    return returnVal;
  }

  getTokenFromCode(auth_code, callback, response) {
    var token;
    this._export_settings.OAuthClient.authorizationCode.getToken({
      code: auth_code,
      redirect_uri: this._export_settings.DWC_redirectURL,
      scope: scopes.join(' ')
    }, function (error, result) {
      if (error) {
        console.log('Access token error: ', error.message);
        callback(response, error, null);
      } else {
        token = this._export_settings.OAuthClient.accessToken.create(result);
        console.log('Token created: ', token.token);
        callback(response, null, token);
      }
    });
  }

  refreshAccessToken(refreshToken, callback) {
    var tokenObj = this._export_settings.OAuthClient.accessToken.create({ refresh_token: refreshToken });
    tokenObj.refresh(callback);
  }

  async getAccessToken() {

    var axios = require("axios");
    var querystring = require("querystring");
    const base64Token = `${this._export_settings.DWC_clientID}:${this._export_settings.DWC_apiSecret}`;
    var encodedToken = 'Basic ' + Buffer.from(base64Token).toString('base64');

    const body = {
      grant_type: "client_credentials",
      client_id: this._export_settings.DWC_clientID,
      client_secret: this._export_settings.DWC_apiSecret,
    };

    axios.post(
      'https://dwc-infomotion.authentication.eu10.hana.ondemand.com/oauth/token',
      querystring.stringify({
        'grant_type': 'authorization_code',
        'code': 'gIs6Qrf6N0A5pIfjGz72l67XVm08Tw4s'
      }),
      {
        headers: {
          'Authorization': 'Basic ' + encodedToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': '*/*'
        }
      }
    ).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });
    // try {
    //   const response = await axios.post(
    //     this._export_settings.DWC_tokenURL,
    //     body,
    //     { headers: myHeaders }
    //   );
    //   console.log("Response data");
    //   console.log(response.data.access_token);
    //   this._export_settings.AccessToken = response.data.access_token;
    //   this._doOAuth2();
    // } catch (err) {
    //   throw err;
    // }

    // var oauth = require('axios-oauth-client')
    // const getAuthorizationCode = oauth.authorizationCode(
    //   axios.create(),
    //   this._export_settings.DWC_oAuthURL, // OAuth 2.0 token endpoint
    //   this._export_settings.DWC_clientID,
    //   this._export_settings.DWC_apiSecret,
    //   "https://bocauth.us1.sapbusinessobjects.cloud" // Redirect URL for your app
    // )
    // const auth = await getAuthorizationCode('AUTHORIZATION_CODE', 'uaa.resource publicapiservice-sac-saceu10!t3650.apiaccess approuter-sac-saceu10!t3650.sap.fpa.user')
    // console.log(auth);

  }

  getCSRFToken() {
    var response = null;
    var csrfToken = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        csrfToken = xhr.getResponseHeader("x-csrf-token");
        console.log(csrfToken);
      }
    });

    xhr.open("GET", this._export_settings.restapiurl + "sap/bc/ina/service/v2/GetServerInfo");

    //adding request headers
    xhr.setRequestHeader("x-csrf-token", "Fetch");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //sending request
    xhr.send();

    this._export_settings.CSRFToken = csrfToken;
  }

  executeTaskChain() {

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://dwc-infomotion.eu10.hcs.cloud.sap/dwaas-core/tf/BU_SINGER/taskchains/Task_Chain_1/start");
    // WARNING: Cookies will be stripped away by the browser before sending the request.
    // xhr.setRequestHeader("Cookie", "signature; JSESSIONID=s%3AX9hp-kceB-ckWitOCZzwyPOoPMDSYhwz.d4B%2BEhNaoy2F9Hnvk9t4tBww0hoIg%2F0hcBBzQ1pDous; __VCAP_ID__=f12a3f39-96c8-4b24-7813-fdd8");

    xhr.send();

  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue != newValue) {
      this[name] = newValue;
    }
  }

  buildUI(changedProperties, that) {
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
            that_.performAuth();
          }

        });

      });

    //### THE APP: place the XMLView somewhere into DOM ###
    var oView = new sap.ui.core.mvc.XMLView({
      viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
    });
    oView.placeAt(content);

  }
}

