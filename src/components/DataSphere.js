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
    this._export_settings.AccessToken = "";
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

  _doOAuth2() {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZHdjLWluZm9tb3Rpb24uYXV0aGVudGljYXRpb24uZXUxMC5oYW5hLm9uZGVtYW5kLmNvbS90b2tlbl9rZXlzIiwia2lkIjoiZGVmYXVsdC1qd3Qta2V5LTI4Njg5MjQxMyIsInR5cCI6IkpXVCIsImppZCI6ICJVSmk3LzJYSFNLaThCY2ZmYUpHQnFOeWFOSFNZWGwxa2E3OENQK2pPa1NBPSJ9.eyJqdGkiOiJiYWZmOGExZTNlMzY0ZmE3ODM3ZTI3ZTk3ZDFkYTgzNSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIwN2EzMThlNS04ODdmLTRiZWUtOWY1MC0xOTg3ODg3MTE2MzgiLCJ6ZG4iOiJkd2MtaW5mb21vdGlvbiIsInNlcnZpY2VpbnN0YW5jZWlkIjoiNTc0NzcwNTItNDI0Yi00ZmZmLWFmYjctY2MwNTA4OTUzNDVjIn0sInN1YiI6InNiLWE2ZDA5OTY4LTljZjItNDk0MC1hNzI1LWJjNjlmM2U4NzVmZiFiMTA2MzQzfGNsaWVudCFiMzY1MCIsImF1dGhvcml0aWVzIjpbInVhYS5yZXNvdXJjZSIsInB1YmxpY2FwaXNlcnZpY2Utc2FjLXNhY2V1MTAhdDM2NTAuYXBpYWNjZXNzIiwiYXBwcm91dGVyLXNhYy1zYWNldTEwIXQzNjUwLnNhcC5mcGEudXNlciJdLCJzY29wZSI6WyJ1YWEucmVzb3VyY2UiLCJwdWJsaWNhcGlzZXJ2aWNlLXNhYy1zYWNldTEwIXQzNjUwLmFwaWFjY2VzcyIsImFwcHJvdXRlci1zYWMtc2FjZXUxMCF0MzY1MC5zYXAuZnBhLnVzZXIiXSwiY2xpZW50X2lkIjoic2ItYTZkMDk5NjgtOWNmMi00OTQwLWE3MjUtYmM2OWYzZTg3NWZmIWIxMDYzNDN8Y2xpZW50IWIzNjUwIiwiY2lkIjoic2ItYTZkMDk5NjgtOWNmMi00OTQwLWE3MjUtYmM2OWYzZTg3NWZmIWIxMDYzNDN8Y2xpZW50IWIzNjUwIiwiYXpwIjoic2ItYTZkMDk5NjgtOWNmMi00OTQwLWE3MjUtYmM2OWYzZTg3NWZmIWIxMDYzNDN8Y2xpZW50IWIzNjUwIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiI5NjFlMDNkMCIsImlhdCI6MTY4ODE0MDQ0MywiZXhwIjoxNjg4MTQ0MDQzLCJpc3MiOiJodHRwczovL2R3Yy1pbmZvbW90aW9uLmF1dGhlbnRpY2F0aW9uLmV1MTAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIwN2EzMThlNS04ODdmLTRiZWUtOWY1MC0xOTg3ODg3MTE2MzgiLCJhdWQiOlsiYXBwcm91dGVyLXNhYy1zYWNldTEwIXQzNjUwLnNhcC5mcGEiLCJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJ1YWEiLCJwdWJsaWNhcGlzZXJ2aWNlLXNhYy1zYWNldTEwIXQzNjUwIl19.M-o4NMsxr-_DhGJAqvMCWZ-PSS5AJw1z3U9ygMcI35o05w-e54RAf5h1Z4Aml2jcQ562x9hBefLkNvWym6Js8pv-ttK1DeG4AeXwmOfbZc2_Mc9Yu-tKAQLYez6vXvQUxV7Im2nSrm9nCUQRHhf4bd22hDkgjAddV4kdo9b2wXq5vXopQKblT1-SuYKqMi_kV4tQBQXfMTzj628j-NTP75rzhnkS10Qi7BMBAyS-QdbrXqpGKUEPeR3F3gKywf9MQWfGz9zKi1upCKWpSZ7rkMrfUTaXiQuZCKk3G7uUro8ULmJPBwkHJJQJMJQF-Bm4kGw7BGnXJK6cn419CuIejw");
    // myHeaders.append("Cookie", "signature; JSESSIONID=s%3AKzDHnBXSiRSb9xTG1LiNxqlCCPkNpOWO.Mz%2BXxdbcvbGg9zjqex24%2FwopHUWuj0whIx0E1Dd2NBg; __VCAP_ID__=efeff00f-03a4-412b-4a11-649d");

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

    this.intiAuth();
    // this.getAuthUrl();

  }

  intiAuth() {

    var ClientOAuth2 = require('client-oauth2');
    var DataSphereAuth = new ClientOAuth2({
      clientId: this._export_settings.DWC_clientID,
      clientSecret: this._export_settings.DWC_apiSecret,
      accessTokenUri: this._export_settings.DWC_tokenURL,
      authorizationUri: this._export_settings.DWC_oAuthURL,
      redirectUri: this._export_settings.DWC_redirectURL,
      scopes: []
    })

    DataSphereAuth.credentials.getToken()
      .then(function (token) {
        this._export_settings.AccessToken = token.accessToken;
        console.log(token.accessToken) //=> { accessToken: '...', tokenType: 'bearer', ... }
      });
    this._export_settings.OAuthClient = DataSphereAuth;
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

    const body = {
      grant_type: "client_credentials",
      client_id: this._export_settings.DWC_clientID,
      client_secret: this._export_settings.DWC_apiSecret,
    };

    const myHeaders = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
    }

    try {
      const response = await axios.post(
        this._export_settings.DWC_tokenURL,
        body,
        { headers: myHeaders }
      );
      console.log("Response data");
      console.log(response.data.access_token);
      this._export_settings.AccessToken = response.data.access_token;
      this._doOAuth2();
    } catch (err) {
      throw err;
    }

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

