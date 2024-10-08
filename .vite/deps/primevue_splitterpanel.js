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

// node_modules/primevue/splitterpanel/splitterpanel.esm.js
var styles = "\n.p-splitter-panel {\n    flex-grow: 1;\n}\n\n.p-splitter-panel-nested {\n    display: flex;\n}\n\n.p-splitter-panel .p-splitter {\n    flex-grow: 1;\n    border: 0 none;\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ["p-splitter-panel", {
      "p-splitter-panel-nested": instance.isNested
    }];
  }
};
var _useStyle = useStyle(styles, {
  name: "splitterpanel",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BaseSplitterPanel",
  "extends": script,
  props: {
    size: {
      type: Number,
      "default": null
    },
    minSize: {
      type: Number,
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
  name: "SplitterPanel",
  "extends": script$1,
  computed: {
    isNested: function isNested() {
      return this.$slots["default"]().some(function(child) {
        return child.type.name === "Splitter";
      });
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "splitterpanel"
  }), [renderSlot(_ctx.$slots, "default")], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_splitterpanel.js.map
