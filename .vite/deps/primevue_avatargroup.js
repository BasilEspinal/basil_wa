import {
  script
} from "./chunk-SGVQCNSW.js";
import {
  useStyle
} from "./chunk-EGWDZ2T5.js";
import "./chunk-BW6IAHPR.js";
import {
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/avatargroup/avatargroup.esm.js
var styles = "\n.p-avatar-group .p-avatar + .p-avatar {\n    margin-left: -1rem;\n}\n\n.p-avatar-group {\n    display: flex;\n    align-items: center;\n}\n";
var classes = {
  root: "p-avatar-group p-component"
};
var _useStyle = useStyle(styles, {
  name: "avatargroup",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BaseAvatarGroup",
  "extends": script,
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
  name: "AvatarGroup",
  "extends": script$1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "avatargroup"
  }), [renderSlot(_ctx.$slots, "default")], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_avatargroup.js.map
