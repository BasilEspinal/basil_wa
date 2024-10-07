import {
  ConfirmationEventBus
} from "./chunk-5VBM3IBD.js";
import "./chunk-BW6IAHPR.js";
import "./chunk-WD2BNHP7.js";

// node_modules/primevue/useconfirm/useconfirm.esm.js
var PrimeVueConfirmSymbol = Symbol();

// node_modules/primevue/confirmationservice/confirmationservice.esm.js
var ConfirmationService = {
  install: function install(app) {
    var ConfirmationService2 = {
      require: function require2(options) {
        ConfirmationEventBus.emit("confirm", options);
      },
      close: function close() {
        ConfirmationEventBus.emit("close");
      }
    };
    app.config.globalProperties.$confirm = ConfirmationService2;
    app.provide(PrimeVueConfirmSymbol, ConfirmationService2);
  }
};
export {
  ConfirmationService as default
};
//# sourceMappingURL=primevue_confirmationservice.js.map