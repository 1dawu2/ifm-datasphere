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
                <m:Button text="Get Authorization Code"
                    press="getAuthorizationCode"
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

  async authCallback() {
    const puppeteer = require('puppeteer-core');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const authorizationURL = encodeURI(`${this._export_settings.DWC_oAuthURL}?response_type=code&client_id=${this._export_settings.DWC_clientID}&redirect_uri=${this._export_settings.DWC_redirectURL}`);
    await page.goto(authorizationURL);
    const redirectURI = await page.waitForNavigation();
    const authorizationCode = new URL(redirectURI).searchParams.get('code');
    await browser.close();
    console.log(authorizationCode)
  }

  getAccessToken() {
    // var axiosOAuth2 = require("axios-oauth-client");
    var axios = require("axios");
    var querystring = require("querystring");
    const base64Token = `${this._export_settings.DWC_clientID}:${this._export_settings.DWC_apiSecret}`;
    var encodedToken = Buffer.from(base64Token).toString('base64');
    const authorizationURL = encodeURI(`${this._export_settings.DWC_oAuthURL}?response_type=code&client_id=${this._export_settings.DWC_clientID}`);
    //'https://dwc-infomotion.authentication.eu10.hana.ondemand.com/oauth/authorize?response_type=code&client_id=sb-a6d09968-9cf2-4940-a725-bc69f3e875ff!b106343%7Cclient!b3650&redirect_uri=https%3A%2F%2Fbocauth.us1.sapbusinessobjects.cloud%3A443'
    //'https://dwc-infomotion.authentication.eu10.hana.ondemand.com/oauth/authorize?response_type=code&client_id=sb-a6d09968-9cf2-4940-a725-bc69f3e875ff!b106343%7Cclient!b3650&redirect_uri=https://www.getpostman.com/oauth2/callback'

    // const getAuthorizationCode = axiosOAuth2.authorizationCode(
    //   axios.create(),
    //   this._export_settings.DWC_tokenURL,
    //   this._export_settings.DWC_clientID,
    //   this._export_settings.DWC_apiSecret,
    //   'https://www.getpostman.com/oauth2/callback'
    // )
    // console.log(getAuthorizationCode);

    axios.get(
      authorizationURL,
      {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
        }
      }
    ).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });

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
            /* In the code, `that_` is a reference to the current instance of the class
            `IFMDataSphere`. It is used to access the instance properties and methods within the
            inner function of `sap.ui.define`. This is necessary because the inner function has its
            own scope and `this` refers to the inner function itself, not the instance of the class.
            By assigning `that_ = that`, the inner function can access the instance properties and
            methods using `that_` instead of `this`. */
            that_.performAuth();
          },

          getAuthorizationCode: function (oEvent) {
            // const authorizationURL = encodeURI(`${that_._export_settings.DWC_oAuthURL}?response_type=code&client_id=${that_._export_settings.DWC_clientID}`);//&redirect_uri=${that_._export_settings.DWC_redirectURL}
            // //'https://dwc-infomotion.authentication.eu10.hana.ondemand.com/oauth/authorize?response_type=code&client_id=sb-a6d09968-9cf2-4940-a725-bc69f3e875ff!b106343%7Cclient!b3650&redirect_uri=https%3A%2F%2Fbocauth.us1.sapbusinessobjects.cloud%3A443'
            // window.location.href = authorizationURL;

            // const urlParams = new URLSearchParams(window.location.search);
            // const authorizationCode = urlParams.get('code');
            // console.log('Authorization Code');
            // console.log(authorizationCode);
            that_.authCallback();
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

