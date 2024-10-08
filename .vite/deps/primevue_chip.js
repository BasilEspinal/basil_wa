import {
  script as script2
} from "./chunk-HLZIADF7.js";
import "./chunk-OJR2HVJ6.js";
import {
  script
} from "./chunk-SGVQCNSW.js";
import {
  useStyle
} from "./chunk-EGWDZ2T5.js";
import "./chunk-BW6IAHPR.js";
import {
  createBlock,
  createCommentVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot,
  resolveDynamicComponent,
  toDisplayString
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/chip/chip.esm.js
var styles = "\n.p-chip {\n    display: inline-flex;\n    align-items: center;\n}\n\n.p-chip-text {\n    line-height: 1.5;\n}\n\n.p-chip-icon.pi {\n    line-height: 1.5;\n}\n\n.p-chip-remove-icon {\n    line-height: 1.5;\n    cursor: pointer;\n}\n\n.p-chip img {\n    border-radius: 50%;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-chip p-component", {
      "p-chip-image": props.image != null
    }];
  },
  icon: "p-chip-icon",
  label: "p-chip-text",
  removeIcon: "p-chip-remove-icon"
};
var _useStyle = useStyle(styles, {
  name: "chip",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BaseChip",
  "extends": script,
  props: {
    label: {
      type: String,
      "default": null
    },
    icon: {
      type: String,
      "default": null
    },
    image: {
      type: String,
      "default": null
    },
    removable: {
      type: Boolean,
      "default": false
    },
    removeIcon: {
      type: String,
      "default": void 0
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
var script3 = {
  name: "Chip",
  "extends": script$1,
  emits: ["remove"],
  data: function data() {
    return {
      visible: true
    };
  },
  methods: {
    onKeydown: function onKeydown(event) {
      if (event.key === "Enter" || event.key === "Backspace") {
        this.close(event);
      }
    },
    close: function close(event) {
      this.visible = false;
      this.$emit("remove", event);
    }
  },
  components: {
    TimesCircleIcon: script2
  }
};
var _hoisted_1 = ["aria-label"];
var _hoisted_2 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.visible ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx("root"),
    "aria-label": _ctx.label
  }, _ctx.ptm("root"), {
    "data-pc-name": "chip"
  }), [renderSlot(_ctx.$slots, "default", {}, function() {
    return [_ctx.image ? (openBlock(), createElementBlock("img", mergeProps({
      key: 0,
      src: _ctx.image
    }, _ctx.ptm("image")), null, 16, _hoisted_2)) : _ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), mergeProps({
      key: 1,
      "class": _ctx.cx("icon")
    }, _ctx.ptm("icon")), null, 16, ["class"])) : _ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
      key: 2,
      "class": [_ctx.cx("icon"), _ctx.icon]
    }, _ctx.ptm("icon")), null, 16)) : createCommentVNode("", true), _ctx.label ? (openBlock(), createElementBlock("div", mergeProps({
      key: 3,
      "class": _ctx.cx("label")
    }, _ctx.ptm("label")), toDisplayString(_ctx.label), 17)) : createCommentVNode("", true)];
  }), _ctx.removable ? renderSlot(_ctx.$slots, "removeicon", {
    key: 0,
    onClick: $options.close,
    onKeydown: $options.onKeydown
  }, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.removeIcon ? "span" : "TimesCircleIcon"), mergeProps({
      tabindex: "0",
      "class": [_ctx.cx("removeIcon"), _ctx.removeIcon],
      onClick: $options.close,
      onKeydown: $options.onKeydown
    }, _ctx.ptm("removeIcon")), null, 16, ["class", "onClick", "onKeydown"]))];
  }) : createCommentVNode("", true)], 16, _hoisted_1)) : createCommentVNode("", true);
}
script3.render = render;
export {
  script3 as default
};
//# sourceMappingURL=primevue_chip.js.map
