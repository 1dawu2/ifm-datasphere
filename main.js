const dwc = require("@sap/dwc-cli");
const MY_HOST = "https://roechling-q-1.eu10.hcs.cloud.sap/";
const commands = await dwc.getCommands(MY_HOST);
(function () {
  let _shadowRoot;
  let _oAuthURL;
  let _clientID;
  let _apiSecret;

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
      xmlns:t="sap.ui.table"
      xmlns:m="sap.m"
      xmlns:f="sap.f"
      xmlns:card="sap.f.cards"
      xmlns:mvc="sap.ui.core.mvc"
      xmlns:tnt="sap.tnt">
      <m:content></m:content>
        <m:Page
          title="Page"
          class="sapUiContentPadding">
          <m:content>
            <m:HBox>
              <m:Button text="Default"
                  press="onPress"
                  ariaDescribedBy="defaultButtonDescription genericButtonDescription">
                <layoutData>
                  <FlexItemData growFactor="1" />
                </layoutData>
              </m:Button>
            </m:HBox>
          </m:content>
        </m:Page>
      </mvc:View>
    </script>
  `;

  class IFMDataSphere extends HTMLElement {

    constructor() {
      super();

      console.log(commands);

      _shadowRoot = this.attachShadow({
        mode: "open"
      });

      _shadowRoot.appendChild(tmpl.content.cloneNode(true));

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

    static get observedAttributes() {
      return [
        "restapiurl",
      ];
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

          return Controller.extend("ifm.hack.initial", {

            onInit: function (oEvent) {

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
  customElements.define("com-ifm-datasphere", IFMDataSphere);

})();