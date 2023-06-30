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

    // this.executeTaskChain();

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

  // _doOAuth2() {

  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer" + this._export_settings.AccessToken);
  //   // myHeaders.append("Cookie", "signature; JSESSIONID=s%3AKzDHnBXSiRSb9xTG1LiNxqlCCPkNpOWO.Mz%2BXxdbcvbGg9zjqex24%2FwopHUWuj0whIx0E1Dd2NBg; __VCAP_ID__=efeff00f-03a4-412b-4a11-649d");

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };

  //   fetch(this._export_settings.DWC_taskChain, requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));

  // }

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
      this.executeTaskChain();
    } catch (err) {
      throw err;
    }
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

    xhr.open("POST", this._export_settings.DWC_taskChain);
    xhr.setRequestHeader("Authorization", `Bearer ${this._export_settings.AccessToken}`);
    // xhr.setRequestHeader("Cookie", "JSESSIONID=s%3A_EvTAY82EYX4VjpkDv0enuqPGJ9ucLLg.ni2gKCxZCFc2GQ%2B9dOIB3EJCF%2B5q0G15gj0w8KvuT%2B4; __VCAP_ID__=eb6a6391-93e0-4a14-5225-796d");

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
            var this_ = this;

            var CLIENT_ID_str = that_._export_settings.DWC_clientID;
            var CLIENT_SECRET_str = that_._export_settings.DWC_apiSecret;
            var OAUTH_URL = that_._export_settings.DWC_oAuthURL;
            var POST_URL = that_._export_settings.DWC_taskChain;

            that_.getAccessToken();

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

