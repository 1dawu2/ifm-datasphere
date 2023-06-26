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
    <div id="ifm_hack_content" name="ifm_hack_content">
      <slot name="content"></slot>
    </div>
    <script id="oView" name="oView" type="sapui5/xmlview">
    <mvc:View
      controllerName="ifm.hack.initial"
      xmlns:core="sap.ui.core"
      xmlns:t="sap.ui.table"
      xmlns:m="sap.m"
      xmlns:f="sap.f"
      xmlns:card="sap.f.cards"
      xmlns:mvc="sap.ui.core.mvc"
      xmlns:tnt="sap.tnt">
      <m:content></m:content>
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

  }
  customElements.define("com-ifm-datasphere", IFMDataSphere);

})();