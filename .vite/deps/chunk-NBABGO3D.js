import {
  script
} from "./chunk-SGVQCNSW.js";
import {
  useStyle
} from "./chunk-EGWDZ2T5.js";
import {
  ObjectUtils
} from "./chunk-BW6IAHPR.js";
import {
  createElementBlock,
  createTextVNode,
  mergeProps,
  openBlock,
  renderSlot,
  toDisplayString
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/badge/badge.esm.js
var styles = "\n.p-badge {\n    display: inline-block;\n    border-radius: 10px;\n    text-align: center;\n    padding: 0 .5rem;\n}\n\n.p-overlay-badge {\n    position: relative;\n}\n\n.p-overlay-badge .p-badge {\n    position: absolute;\n    top: 0;\n    right: 0;\n    transform: translate(50%,-50%);\n    transform-origin: 100% 0;\n    margin: 0;\n}\n\n.p-badge-dot {\n    width: .5rem;\n    min-width: .5rem;\n    height: .5rem;\n    border-radius: 50%;\n    padding: 0;\n}\n\n.p-badge-no-gutter {\n    padding: 0;\n    border-radius: 50%;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props, instance = _ref.instance;
    return ["p-badge p-component", {
      "p-badge-no-gutter": ObjectUtils.isNotEmpty(props.value) && String(props.value).length === 1,
      "p-badge-dot": ObjectUtils.isEmpty(props.value) && !instance.$slots["default"],
      "p-badge-lg": props.size === "large",
      "p-badge-xl": props.size === "xlarge",
      "p-badge-info": props.severity === "info",
      "p-badge-success": props.severity === "success",
      "p-badge-warning": props.severity === "warning",
      "p-badge-danger": props.severity === "danger"
    }];
  }
};
var _useStyle = useStyle(styles, {
  name: "badge",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BaseBadge",
  "extends": script,
  props: {
    value: {
      type: [String, Number],
      "default": null
    },
    severity: {
      type: String,
      "default": null
    },
    size: {
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
  name: "Badge",
  "extends": script$1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "badge"
  }), [renderSlot(_ctx.$slots, "default", {}, function() {
    return [createTextVNode(toDisplayString(_ctx.value), 1)];
  })], 16);
}
script2.render = render;

export {
  script2 as script
};
//# sourceMappingURL=chunk-NBABGO3D.js.map
