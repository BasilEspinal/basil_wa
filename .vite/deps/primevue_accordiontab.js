import {
  script
} from "./chunk-SGVQCNSW.js";
import "./chunk-EGWDZ2T5.js";
import "./chunk-BW6IAHPR.js";
import {
  renderSlot
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/accordiontab/accordiontab.esm.js
var script$1 = {
  name: "BaseAccordionTab",
  "extends": script,
  props: {
    header: null,
    headerStyle: null,
    headerClass: null,
    headerProps: null,
    headerActionProps: null,
    contentStyle: null,
    contentClass: null,
    contentProps: null,
    disabled: Boolean
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "AccordionTab",
  "extends": script$1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_accordiontab.js.map
