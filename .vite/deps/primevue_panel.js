import {
  script as script3
} from "./chunk-B4XON7HG.js";
import {
  script as script2
} from "./chunk-B3ATMGDZ.js";
import {
  Ripple
} from "./chunk-DPSQVM4P.js";
import "./chunk-GOLRNOIJ.js";
import "./chunk-OJR2HVJ6.js";
import {
  script
} from "./chunk-SGVQCNSW.js";
import {
  useStyle
} from "./chunk-EGWDZ2T5.js";
import {
  UniqueComponentId
} from "./chunk-BW6IAHPR.js";
import {
  Transition,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createVNode,
  guardReactiveProps,
  mergeProps,
  normalizeClass,
  normalizeProps,
  openBlock,
  renderSlot,
  resolveDirective,
  resolveDynamicComponent,
  toDisplayString,
  vShow,
  withCtx,
  withDirectives
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/panel/panel.esm.js
var styles = "\n.p-panel-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.p-panel-title {\n    line-height: 1;\n}\n\n.p-panel-header-icon {\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-panel p-component", {
      "p-panel-toggleable": props.toggleable
    }];
  },
  header: "p-panel-header",
  title: "p-panel-title",
  icons: "p-panel-icons",
  toggler: "p-panel-header-icon p-panel-toggler p-link",
  toggleablecontent: "p-toggleable-content",
  content: "p-panel-content",
  footer: "p-panel-footer"
};
var _useStyle = useStyle(styles, {
  name: "panel",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BasePanel",
  "extends": script,
  props: {
    header: String,
    toggleable: Boolean,
    collapsed: Boolean,
    toggleButtonProps: {
      type: null,
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
var script4 = {
  name: "Panel",
  "extends": script$1,
  emits: ["update:collapsed", "toggle"],
  data: function data() {
    return {
      d_collapsed: this.collapsed
    };
  },
  watch: {
    collapsed: function collapsed(newValue) {
      this.d_collapsed = newValue;
    }
  },
  methods: {
    toggle: function toggle(event) {
      this.d_collapsed = !this.d_collapsed;
      this.$emit("update:collapsed", this.d_collapsed);
      this.$emit("toggle", {
        originalEvent: event,
        value: this.d_collapsed
      });
    },
    onKeyDown: function onKeyDown(event) {
      if (event.code === "Enter" || event.code === "Space") {
        this.toggle(event);
        event.preventDefault();
      }
    }
  },
  computed: {
    ariaId: function ariaId() {
      return UniqueComponentId();
    },
    buttonAriaLabel: function buttonAriaLabel() {
      return this.toggleButtonProps && this.toggleButtonProps["aria-label"] ? this.toggleButtonProps["aria-label"] : this.header;
    }
  },
  components: {
    PlusIcon: script2,
    MinusIcon: script3
  },
  directives: {
    ripple: Ripple
  }
};
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var _hoisted_1 = ["id"];
var _hoisted_2 = ["id", "aria-label", "aria-controls", "aria-expanded"];
var _hoisted_3 = ["id", "aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "panel"
  }), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("header")
  }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header", {
    id: $options.ariaId + "_header",
    "class": normalizeClass(_ctx.cx("title"))
  }, function() {
    return [_ctx.header ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      id: $options.ariaId + "_header",
      "class": _ctx.cx("title")
    }, _ctx.ptm("title")), toDisplayString(_ctx.header), 17, _hoisted_1)) : createCommentVNode("", true)];
  }), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("icons")
  }, _ctx.ptm("icons")), [renderSlot(_ctx.$slots, "icons"), _ctx.toggleable ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    id: $options.ariaId + "_header",
    type: "button",
    role: "button",
    "class": _ctx.cx("toggler"),
    "aria-label": $options.buttonAriaLabel,
    "aria-controls": $options.ariaId + "_content",
    "aria-expanded": !$data.d_collapsed,
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.toggle && $options.toggle.apply($options, arguments);
    }),
    onKeydown: _cache[1] || (_cache[1] = function() {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.toggleButtonProps), _ctx.ptm("toggler"))), [renderSlot(_ctx.$slots, "togglericon", {
    collapsed: $data.d_collapsed
  }, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent($data.d_collapsed ? "PlusIcon" : "MinusIcon"), normalizeProps(guardReactiveProps(_ctx.ptm("togglericon"))), null, 16))];
  })], 16, _hoisted_2)), [[_directive_ripple]]) : createCommentVNode("", true)], 16)], 16), createVNode(Transition, {
    name: "p-toggleable-content"
  }, {
    "default": withCtx(function() {
      return [withDirectives(createBaseVNode("div", mergeProps({
        id: $options.ariaId + "_content",
        "class": _ctx.cx("toggleablecontent"),
        role: "region",
        "aria-labelledby": $options.ariaId + "_header"
      }, _ctx.ptm("toggleablecontent")), [createBaseVNode("div", mergeProps({
        "class": _ctx.cx("content")
      }, _ctx.ptm("content")), [renderSlot(_ctx.$slots, "default")], 16), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        "class": _ctx.cx("footer")
      }, _ctx.ptm("footer")), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true)], 16, _hoisted_3), [[vShow, !$data.d_collapsed]])];
    }),
    _: 3
  })], 16);
}
script4.render = render;
export {
  script4 as default
};
//# sourceMappingURL=primevue_panel.js.map
