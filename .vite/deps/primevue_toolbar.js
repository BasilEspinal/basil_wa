import {
  script
} from "./chunk-SGVQCNSW.js";
import {
  useStyle
} from "./chunk-EGWDZ2T5.js";
import "./chunk-BW6IAHPR.js";
import {
  createBaseVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/toolbar/toolbar.esm.js
var styles = "\n.p-toolbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n}\n\n.p-toolbar-group-start,\n.p-toolbar-group-center,\n.p-toolbar-group-end {\n    display: flex;\n    align-items: center;\n}\n\n.p-toolbar-group-left,\n.p-toolbar-group-right {\n    display: flex;\n    align-items: center;\n}\n";
var classes = {
  root: "p-toolbar p-component",
  start: "p-toolbar-group-start p-toolbar-group-left",
  center: "p-toolbar-group-center",
  end: "p-toolbar-group-end p-toolbar-group-right"
};
var _useStyle = useStyle(styles, {
  name: "toolbar",
  manual: true
});
var loadStyle = _useStyle.load;
_useStyle.unload;
var script$1 = {
  name: "BaseToolbar",
  "extends": script,
  props: {
    "aria-labelledby": {
      type: String,
      "default": null
    }
  },
  css: {
    classes,
    loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "Toolbar",
  "extends": script$1
};
var _hoisted_1 = ["aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    role: "toolbar",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptm("root"), {
    "data-pc-name": "toolbar"
  }), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("start"),
    "data-pc-section": "start"
  }, _ctx.ptm("start")), [renderSlot(_ctx.$slots, "start")], 16), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("center"),
    "data-pc-section": "center"
  }, _ctx.ptm("center")), [renderSlot(_ctx.$slots, "center")], 16), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("end"),
    "data-pc-section": "end"
  }, _ctx.ptm("end")), [renderSlot(_ctx.$slots, "end")], 16)], 16, _hoisted_1);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_toolbar.js.map
