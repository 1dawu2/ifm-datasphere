(function () {
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
              height="250px"
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

  class IFMDataSphere extends HTMLElement {

    constructor() {
      super();

      // const dwc = require("@sap/dwc-cli");
      // const MY_HOST = "https://dwc-infomotion.eu10.hcs.cloud.sap/";
      // console.log(commands);

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
        "DWC_taskChain"
      ];
    }

    getCSRFToken() {

      var response = null;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          var csrfToken = xhr.getResponseHeader("x-csrf-token");
          console.log(csrfToken);
        }
      });

      xhr.open("GET", "https://dwc-infomotion.eu10.hcs.cloud.sap/sap/bc/ina/service/v2/GetServerInfo", false);

      //adding request headers
      xhr.setRequestHeader("x-csrf-token", "Fetch");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      //sending request
      xhr.send();

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
      xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZHdjLWluZm9tb3Rpb24uYXV0aGVudGljYXRpb24uZXUxMC5oYW5hLm9uZGVtYW5kLmNvbS90b2tlbl9rZXlzIiwia2lkIjoiZGVmYXVsdC1qd3Qta2V5LTI4Njg5MjQxMyIsInR5cCI6IkpXVCIsImppZCI6ICJJRysyZjFVbWhtbytXNEdwRDRYWUFPME5JUnlBWEd3emdFQUZSdklaS3Y4PSJ9.eyJqdGkiOiJmYzMzNGIyMWJiZTA0MzVlODRlMTk3NDU3NTNlZmI1YSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIwN2EzMThlNS04ODdmLTRiZWUtOWY1MC0xOTg3ODg3MTE2MzgiLCJ6ZG4iOiJkd2MtaW5mb21vdGlvbiIsInNlcnZpY2VpbnN0YW5jZWlkIjoiNTc0NzcwNTItNDI0Yi00ZmZmLWFmYjctY2MwNTA4OTUzNDVjIn0sInhzLnN5c3RlbS5hdHRyaWJ1dGVzIjp7InhzLnNhbWwuZ3JvdXBzIjpbInNhYyJdLCJ4cy5yb2xlY29sbGVjdGlvbnMiOlsic2FjLnVzZXJzIl19LCJnaXZlbl9uYW1lIjoiZGF2aWQud3VybSIsInhzLnVzZXIuYXR0cmlidXRlcyI6e30sImZhbWlseV9uYW1lIjoiaW5mb21vdGlvbi5kZSIsInN1YiI6IjJlMzU0ZDU2LThhZmQtNDEwYS05Y2RlLWU2ODAyYTk5Yzc0MyIsInNjb3BlIjpbIm9wZW5pZCIsImFwcHJvdXRlci1zYWMtc2FjZXUxMCF0MzY1MC5zYXAuZnBhLnVzZXIiLCJ1YWEudXNlciJdLCJjbGllbnRfaWQiOiJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJjaWQiOiJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJhenAiOiJzYi1hNmQwOTk2OC05Y2YyLTQ5NDAtYTcyNS1iYzY5ZjNlODc1ZmYhYjEwNjM0M3xjbGllbnQhYjM2NTAiLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwidXNlcl9pZCI6IjJlMzU0ZDU2LThhZmQtNDEwYS05Y2RlLWU2ODAyYTk5Yzc0MyIsIm9yaWdpbiI6ImhhbmFjbG91ZHNlcnZpY2VzLWV1LmFjY291bnRzLm9uZGVtYSIsInVzZXJfbmFtZSI6ImRhdmlkLnd1cm1AaW5mb21vdGlvbi5kZSIsImVtYWlsIjoiZGF2aWQud3VybUBpbmZvbW90aW9uLmRlIiwiYXV0aF90aW1lIjoxNjg3ODc5NDY3LCJyZXZfc2lnIjoiMTYxMzM2ODYiLCJpYXQiOjE2ODc4Nzk2ODYsImV4cCI6MTY4Nzg4MzI4NiwiaXNzIjoiaHR0cHM6Ly9kd2MtaW5mb21vdGlvbi5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL29hdXRoL3Rva2VuIiwiemlkIjoiMDdhMzE4ZTUtODg3Zi00YmVlLTlmNTAtMTk4Nzg4NzExNjM4IiwiYXVkIjpbImFwcHJvdXRlci1zYWMtc2FjZXUxMCF0MzY1MC5zYXAuZnBhIiwic2ItYTZkMDk5NjgtOWNmMi00OTQwLWE3MjUtYmM2OWYzZTg3NWZmIWIxMDYzNDN8Y2xpZW50IWIzNjUwIiwidWFhIiwib3BlbmlkIl19.GdYP2i50VR3-KfL1tY7KZ7AlOhNB7AF_WIj8afT2JWXSrBqoQgheAHF9Wv9aw8uXjanTFO-t9W7XE3V1yC_b2Jzo0Ng8TCa-3y-7nOxQfry10lr_qAqk_nRjD9cuWlEeseYe5VhpGL1a4M3Q5bO50-hgWEEXtyjlUpXbhD8V_p1NIypn3eEGlsNZtxOGOlNWBDv9_O0_6yVRLNyk5gpLFfqq1Ddu5sp_o4nToz4VXcmpn6MvrOU449v3R9m_MMiIsq3pPjfhYb2QD2mvMcHi7jCbLXNidlHcPDC1XgH6yL6IHrNtK33seMG7XWrqK7Yw3uypxCW_mdjINCyu9uWgCg");
      xhr.setRequestHeader("Cookie", "JSESSIONID=s%3A_EvTAY82EYX4VjpkDv0enuqPGJ9ucLLg.ni2gKCxZCFc2GQ%2B9dOIB3EJCF%2B5q0G15gj0w8KvuT%2B4; __VCAP_ID__=eb6a6391-93e0-4a14-5225-796d");

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

              that_.getCSRFToken();

              // $.ajax({
              //   type: 'POST',
              //   url: OAUTH_URL,
              //   contentType: 'application/x-www-form-urlencoded; charset=utf-8',
              //   crossDomain: true,
              //   cache: true,
              //   dataType: 'json',
              //   data: {
              //     client_id: CLIENT_ID_str,
              //     client_secret: CLIENT_SECRET_str,
              //     grant_type: 'client_credentials',
              //   },

              //   success: function (data) {
              //     console.log(data);

              //     var access_token = data.access_token;

              //     $.ajax({
              //       url: POST_URL,
              //       type: 'POST',
              //       headers: {
              //         "Authorization": "Bearer " + access_token,
              //         "Content-Type": "application/x-www-form-urlencoded"
              //       },
              //       // data: $.param({
              //       //   "partnernumber": partnernumber
              //       // }),
              //       async: true,
              //       timeout: 0,
              //       contentType: 'application/x-www-form-urlencoded',
              //       success: function (data) {
              //         // this_.runNext();
              //         console.log(data);
              //         _score = data;

              //         // that._firePropertiesChanged();
              //         // this.settings = {};
              //         // this.settings.score = "";

              //         // that.dispatchEvent(new CustomEvent("onStart", {
              //         //   detail: {
              //         //     settings: this.settings
              //         //   }
              //         // }));

              //       },
              //       error: function (e) {
              //         // this_.runNext();
              //         console.log("error: " + e);
              //         console.log(e);
              //       }
              //     });

              //   },
              //   error: function (e) {
              //     // this_.runNext();
              //     console.log(e.responseText);
              //   }
              // });
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
  customElements.define("com-ifm-datasphere", IFMDataSphere);
})();