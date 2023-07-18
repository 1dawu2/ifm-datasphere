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
        controllerName="ifm.datasphere"
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

    this._serviceMessage = "";

    this._export_settings = {};
    this._export_settings.DSP_status = "";
    this._export_settings.DSP_serverURL = "";
    this._export_settings.DSP_clientID = "";
    this._export_settings.DSP_apiSecret = "";
    this._export_settings.DSP_oAuthURL = "";
    this._export_settings.DSP_tokenURL = "";
    this._export_settings.DSP_taskChain = "";
    this._export_settings.DSP_redirectURL = "";
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
  getServiceMessage() {
    return this._serviceMessage;
  }

  get DSP_status() {
    return this._export_settings.DSP_status;
  }
  set DSP_status(value) {
    this._export_settings.DSP_status = value;
  }

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
      "DSP_redirectURL",
      "DSP_status"
    ];
  }

  async executeChain(that) {
    var that_ = that;
    const token = that_._export_settings.DSP_token;
    const taskChain = that_._export_settings.DSP_taskChain;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.responseText === 'Unauthorized') {
          that_._export_settings.DSP_status = 'Unauthorized';
        } else {
          that_._export_settings.DSP_status = JSON.parse(this.responseText);
        };
        if (this.status === 200 || this.status === 202) {
          var chainStatus = that_._export_settings.DSP_status;
          that_._serviceMessage = chainStatus;
          console.log(chainStatus);
          this.dispatchEvent(new CustomEvent("onSuccess", {
            detail: {
              chainStatus: chainStatus
            }
          }));
          sap.m.MessageBox.success("Log ID: " + that_._export_settings.DSP_status.logId);
        } else {
          var chainStatus = that_._export_settings.DSP_status;
          that_._serviceMessage = chainStatus;
          console.log(chainStatus);
          this.dispatchEvent(new CustomEvent("onError", {
            detail: {
              chainStatus: chainStatus
            }
          }));
          sap.m.MessageBox.error("Error: " + this.status + " Code: " + that_._export_settings.DSP_status.code);
        }
      }
    });

    xhr.open("POST", taskChain);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();
  }

  async getAccessToken() {
    var axios = require("axios");
    var querystring = require("querystring");
    const base64Token = `${this._export_settings.DSP_clientID}:${this._export_settings.DSP_apiSecret}`;
    var encodedToken = Buffer.from(base64Token).toString('base64');
    const tokenURL = encodeURI(`${this._export_settings.DSP_serverURL}/oauth/token`);

    await axios.post(
      tokenURL,
      querystring.stringify({
        'grant_type': 'authorization_code',
        'code': this._export_settings.DSP_authorizationCode
      }),
      {
        headers: {
          'Authorization': 'Basic ' + encodedToken,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    ).then((response) => {
      this._export_settings.DSP_token = response.data.access_token;
      try {
        var runChain = this.executeChain(this);
        console.log("after executing task chain");
        console.log(runChain);
      } catch (err) {
        console.log("error during executing chain:");
        console.log(err);
      }
    }).catch((err) => {
      console.log("error on retrieving token:");
      console.log(err);
    });

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

    sap.ui.getCore().attachInit(function () {
      "use strict";

      //### Controller ###
      sap.ui.define([
        "jquery.sap.global",
        "sap/f/Card",
        "sap/ui/core/mvc/Controller"
      ], function (jQuery, Controller) {
        "use strict";

        return Controller.extend("ifm.datasphere", {

          onInit: function (oEvent) {
          },

          onPress: function (oEvent) {
            const authURL = encodeURI(`${that_._export_settings.DSP_oAuthURL}?response_type=code&client_id=${that_._export_settings.DSP_clientID}`);
            var sFrame = `<iframe id='authorizationFrame' src='${authURL}' style='width: 600px; height: 600px;'></iframe>`;
            var ui5Frame = new sap.ui.core.HTML({
              content: [sFrame]
            });

            var ui5Card = new sap.f.Card({
              content: [ui5Frame]
            });

            var ui5ScrollContainer = new sap.m.ScrollContainer({
              height: "600px",
              width: "600px",
              content: [ui5Card]
            });

            var ui5Dialog = new sap.m.Dialog({
              title: "Authorization Code",
              content: [ui5ScrollContainer],
              beginButton: new sap.m.Button({
                text: "OK",
                press: function () {
                  ui5Dialog.close();
                }.bind(this)
              }),
              afterClose: function () {
                ui5Dialog.destroyContent();
              }
            });

            ui5Dialog.open();

            var checkAuthorizationCode = setInterval(function () {
              try {
                var authorizationFrame = document.getElementById("authorizationFrame");
                var frameDocument = authorizationFrame.contentDocument || authorizationFrame.contentWindow.document;
                if (frameDocument.location.href.indexOf("code") !== -1) {
                  clearInterval(checkAuthorizationCode);
                  var urlParams = new URLSearchParams(frameDocument.location.search);
                  that_._export_settings.DSP_authorizationCode = urlParams.get("code");
                  that_.getAccessToken()
                  ui5Dialog.close();
                }
              } catch (error) {
                console.log("Error on establishing connection with authorization server:")
                console.log(error);
              }
            }, 1000)
          },
        });
      });

      //### THE APP: place the XMLView somewhere into DOM ###
      var oView = sap.ui.xmlview({
        viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
      });
      oView.placeAt(content);

    });
  }
}

