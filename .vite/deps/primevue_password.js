import {
  script as script5
} from "./chunk-SQHASOQ5.js";
import {
  script as script4
} from "./chunk-XVNXA24R.js";
import {
  OverlayEventBus
} from "./chunk-M46M666T.js";
import {
  script as script3
} from "./chunk-LMPXBVVT.js";
import {
  script as script2
} from "./chunk-OJR2HVJ6.js";
import {
  script
} from "./chunk-SGVQCNSW.js";
import {
  useStyle
} from "./chunk-EGWDZ2T5.js";
import {
  ConnectedOverlayScrollHandler,
  DomHandler,
  UniqueComponentId,
  ZIndexUtils
} from "./chunk-BW6IAHPR.js";
import {
  Transition,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createVNode,
  mergeProps,
  openBlock,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  toDisplayString,
  withCtx
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/icons/eyeslash/index.esm.js
var script6 = {
  name: "EyeSlashIcon",
  "extends": script2,
  computed: {
    pathId: function pathId() {
      return "pv_icon_clip_".concat(UniqueComponentId());
    }
  }
};
var _hoisted_1 = ["clipPath"];
var _hoisted_2 = createBaseVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M13.9414 6.74792C13.9437 6.75295 13.9455 6.757 13.9469 6.76003C13.982 6.8394 14.0001 6.9252 14.0001 7.01195C14.0001 7.0987 13.982 7.1845 13.9469 7.26386C13.6004 8.00059 13.1711 8.69549 12.6674 9.33515C12.6115 9.4071 12.54 9.46538 12.4582 9.50556C12.3765 9.54574 12.2866 9.56678 12.1955 9.56707C12.0834 9.56671 11.9737 9.53496 11.8788 9.47541C11.7838 9.41586 11.7074 9.3309 11.6583 9.23015C11.6092 9.12941 11.5893 9.01691 11.6008 8.90543C11.6124 8.79394 11.6549 8.68793 11.7237 8.5994C12.1065 8.09726 12.4437 7.56199 12.7313 6.99995C12.2595 6.08027 10.3402 2.8014 6.99732 2.8014C6.63723 2.80218 6.27816 2.83969 5.92569 2.91336C5.77666 2.93304 5.62568 2.89606 5.50263 2.80972C5.37958 2.72337 5.29344 2.59398 5.26125 2.44714C5.22907 2.30031 5.2532 2.14674 5.32885 2.01685C5.40451 1.88696 5.52618 1.79021 5.66978 1.74576C6.10574 1.64961 6.55089 1.60134 6.99732 1.60181C11.5916 1.60181 13.7864 6.40856 13.9414 6.74792ZM2.20333 1.61685C2.35871 1.61411 2.5091 1.67179 2.6228 1.77774L12.2195 11.3744C12.3318 11.4869 12.3949 11.6393 12.3949 11.7983C12.3949 11.9572 12.3318 12.1097 12.2195 12.2221C12.107 12.3345 11.9546 12.3976 11.7956 12.3976C11.6367 12.3976 11.4842 12.3345 11.3718 12.2221L10.5081 11.3584C9.46549 12.0426 8.24432 12.4042 6.99729 12.3981C2.403 12.3981 0.208197 7.59135 0.0532336 7.25198C0.0509364 7.24694 0.0490875 7.2429 0.0476856 7.23986C0.0162332 7.16518 3.05176e-05 7.08497 3.05176e-05 7.00394C3.05176e-05 6.92291 0.0162332 6.8427 0.0476856 6.76802C0.631261 5.47831 1.46902 4.31959 2.51084 3.36119L1.77509 2.62545C1.66914 2.51175 1.61146 2.36136 1.61421 2.20597C1.61695 2.05059 1.6799 1.90233 1.78979 1.79244C1.89968 1.68254 2.04794 1.6196 2.20333 1.61685ZM7.45314 8.35147L5.68574 6.57609V6.5361C5.5872 6.78938 5.56498 7.06597 5.62183 7.33173C5.67868 7.59749 5.8121 7.84078 6.00563 8.03158C6.19567 8.21043 6.43052 8.33458 6.68533 8.39089C6.94014 8.44721 7.20543 8.43359 7.45314 8.35147ZM1.26327 6.99994C1.7351 7.91163 3.64645 11.1985 6.99729 11.1985C7.9267 11.2048 8.8408 10.9618 9.64438 10.4947L8.35682 9.20718C7.86027 9.51441 7.27449 9.64491 6.69448 9.57752C6.11446 9.51014 5.57421 9.24881 5.16131 8.83592C4.74842 8.42303 4.4871 7.88277 4.41971 7.30276C4.35232 6.72274 4.48282 6.13697 4.79005 5.64041L3.35855 4.2089C2.4954 5.00336 1.78523 5.94935 1.26327 6.99994Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_3 = [_hoisted_2];
var _hoisted_4 = ["id"];
var _hoisted_5 = createBaseVNode("rect", {
  width: "14",
  height: "14",
  fill: "white"
}, null, -1);
var _hoisted_6 = [_hoisted_5];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), [createBaseVNode("g", {
    clipPath: "url(#".concat($options.pathId, ")")
  }, _hoisted_3, 8, _hoisted_1), createBaseVNode("defs", null, [createBaseVNode("clipPath", {
    id: "".concat($options.pathId)
  }, _hoisted_6, 8, _hoisted_4)])], 16);
}
script6.render = render;

// node_modules/primevue/password/password.esm.js
var styles = "\n.p-password {\n    display: inline-flex;\n}\n\n.p-password .p-password-panel {\n    min-width: 100%;\n}\n\n.p-password-meter {\n    height: 10px;\n}\n\n.p-password-strength {\n    height: 100%;\n    width: 0;\n    transition: width 1s ease-in-out;\n}\n\n.p-fluid .p-password {\n    display: flex;\n}\n\n.p-password-input::-ms-reveal,\n.p-password-input::-ms-clear {\n    display: none;\n}\n";
var inlineStyles = {
  root: function root(_ref) {
    var props = _ref.props;
    return {
      position: props.appendTo === "self" ? "relative" : void 0
    };
  }
};
var classes = {
  root: function root2(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-password p-component p-inputwrapper", {
      "p-inputwrapper-filled": instance.filled,
      "p-inputwrapper-focus": instance.focused,
      "p-input-icon-right": props.toggleMask
    }];
  },
  input: function input(_ref3) {
    var props = _ref3.props;
    return ["p-password-input", {
      "p-disabled": props.disabled
    }];
  },
  panel: function panel(_ref4) {
    var instance = _ref4.instance;
    return ["p-password-panel p-component", {
      "p-input-filled": instance.$primevue.config.inputStyle === "filled",
      "p-ripple-disabled": instance.$primevue.config.ripple === false
    }];
  },
  meter: "p-password-meter",
  meterLabel: function meterLabel(_ref5) {
    var instance = _ref5.instance;
    return "p-password-strength ".concat(instance.meter ? instance.meter.strength : "");
  },
  info: "p-password-info"
};
var _useStyle = useStyle(styles, {
  name: "password",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BasePassword",
  "extends": script,
  props: {
    modelValue: String,
    promptLabel: {
      type: String,
      "default": null
    },
    mediumRegex: {
      type: String,
      "default": "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
      // eslint-disable-line
    },
    strongRegex: {
      type: String,
      "default": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
      // eslint-disable-line
    },
    weakLabel: {
      type: String,
      "default": null
    },
    mediumLabel: {
      type: String,
      "default": null
    },
    strongLabel: {
      type: String,
      "default": null
    },
    feedback: {
      type: Boolean,
      "default": true
    },
    appendTo: {
      type: String,
      "default": "body"
    },
    toggleMask: {
      type: Boolean,
      "default": false
    },
    hideIcon: {
      type: String,
      "default": void 0
    },
    showIcon: {
      type: String,
      "default": void 0
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    placeholder: {
      type: String,
      "default": null
    },
    required: {
      type: Boolean,
      "default": false
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    panelId: {
      type: String,
      "default": null
    },
    panelClass: {
      type: [String, Object],
      "default": null
    },
    panelStyle: {
      type: Object,
      "default": null
    },
    panelProps: {
      type: null,
      "default": null
    },
    "aria-labelledby": {
      type: String,
      "default": null
    },
    "aria-label": {
      type: String,
      "default": null
    }
  },
  css: {
    classes,
    inlineStyles,
    loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script7 = {
  name: "Password",
  "extends": script$1,
  emits: ["update:modelValue", "change", "focus", "blur", "invalid"],
  data: function data() {
    return {
      overlayVisible: false,
      meter: null,
      infoText: null,
      focused: false,
      unmasked: false
    };
  },
  mediumCheckRegExp: null,
  strongCheckRegExp: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  mounted: function mounted() {
    this.infoText = this.promptText;
    this.mediumCheckRegExp = new RegExp(this.mediumRegex);
    this.strongCheckRegExp = new RegExp(this.strongRegex);
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    onOverlayEnter: function onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      DomHandler.addStyles(el, {
        position: "absolute",
        top: "0",
        left: "0"
      });
      this.alignOverlay();
      this.bindScrollListener();
      this.bindResizeListener();
    },
    onOverlayLeave: function onOverlayLeave() {
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.overlay = null;
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay: function alignOverlay() {
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, this.$refs.input.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$refs.input.$el) + "px";
        DomHandler.absolutePosition(this.overlay, this.$refs.input.$el);
      }
    },
    testStrength: function testStrength(str) {
      var level = 0;
      if (this.strongCheckRegExp.test(str))
        level = 3;
      else if (this.mediumCheckRegExp.test(str))
        level = 2;
      else if (str.length)
        level = 1;
      return level;
    },
    onInput: function onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      if (this.feedback) {
        this.setPasswordMeter(this.modelValue);
        this.overlayVisible = true;
      }
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      if (this.feedback) {
        this.overlayVisible = false;
      }
      this.$emit("blur", event);
    },
    onKeyUp: function onKeyUp(event) {
      if (this.feedback) {
        var value = event.target.value;
        var _this$checkPasswordSt = this.checkPasswordStrength(value), meter = _this$checkPasswordSt.meter, label = _this$checkPasswordSt.label;
        this.meter = meter;
        this.infoText = label;
        if (event.code === "Escape") {
          this.overlayVisible && (this.overlayVisible = false);
          return;
        }
        if (!this.overlayVisible) {
          this.overlayVisible = true;
        }
      }
    },
    setPasswordMeter: function setPasswordMeter() {
      if (!this.modelValue)
        return;
      var _this$checkPasswordSt2 = this.checkPasswordStrength(this.modelValue), meter = _this$checkPasswordSt2.meter, label = _this$checkPasswordSt2.label;
      this.meter = meter;
      this.infoText = label;
      if (!this.overlayVisible) {
        this.overlayVisible = true;
      }
    },
    checkPasswordStrength: function checkPasswordStrength(value) {
      var label = null;
      var meter = null;
      switch (this.testStrength(value)) {
        case 1:
          label = this.weakText;
          meter = {
            strength: "weak",
            width: "33.33%"
          };
          break;
        case 2:
          label = this.mediumText;
          meter = {
            strength: "medium",
            width: "66.66%"
          };
          break;
        case 3:
          label = this.strongText;
          meter = {
            strength: "strong",
            width: "100%"
          };
          break;
        default:
          label = this.promptText;
          meter = null;
          break;
      }
      return {
        label,
        meter
      };
    },
    onInvalid: function onInvalid(event) {
      this.$emit("invalid", event);
    },
    bindScrollListener: function bindScrollListener() {
      var _this = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.input.$el, function() {
          if (_this.overlayVisible) {
            _this.overlayVisible = false;
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener() {
      var _this2 = this;
      if (!this.resizeListener) {
        this.resizeListener = function() {
          if (_this2.overlayVisible && !DomHandler.isTouchDevice()) {
            _this2.overlayVisible = false;
          }
        };
        window.addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    overlayRef: function overlayRef(el) {
      this.overlay = el;
    },
    onMaskToggle: function onMaskToggle() {
      this.unmasked = !this.unmasked;
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.$el
      });
    }
  },
  computed: {
    inputType: function inputType() {
      return this.unmasked ? "text" : "password";
    },
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    weakText: function weakText() {
      return this.weakLabel || this.$primevue.config.locale.weak;
    },
    mediumText: function mediumText() {
      return this.mediumLabel || this.$primevue.config.locale.medium;
    },
    strongText: function strongText() {
      return this.strongLabel || this.$primevue.config.locale.strong;
    },
    promptText: function promptText() {
      return this.promptLabel || this.$primevue.config.locale.passwordPrompt;
    },
    panelUniqueId: function panelUniqueId() {
      return UniqueComponentId() + "_panel";
    }
  },
  components: {
    PInputText: script4,
    Portal: script3,
    EyeSlashIcon: script6,
    EyeIcon: script5
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
function _toPrimitive(input2, hint) {
  if (_typeof(input2) !== "object" || input2 === null)
    return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
var _hoisted_12 = ["id"];
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PInputText = resolveComponent("PInputText");
  var _component_Portal = resolveComponent("Portal");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    style: _ctx.sx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "password"
  }), [createVNode(_component_PInputText, mergeProps({
    ref: "input",
    id: _ctx.inputId,
    type: $options.inputType,
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: _ctx.modelValue,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-controls": _ctx.panelProps && _ctx.panelProps.id || _ctx.panelId || $options.panelUniqueId,
    "aria-expanded": $data.overlayVisible,
    "aria-haspopup": true,
    placeholder: _ctx.placeholder,
    required: _ctx.required,
    onInput: $options.onInput,
    onFocus: $options.onFocus,
    onBlur: $options.onBlur,
    onKeyup: $options.onKeyUp,
    onInvalid: $options.onInvalid
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm("input")), {
    unstyled: _ctx.unstyled
  }), null, 16, ["id", "type", "class", "style", "value", "aria-labelledby", "aria-label", "aria-controls", "aria-expanded", "placeholder", "required", "onInput", "onFocus", "onBlur", "onKeyup", "onInvalid", "unstyled"]), _ctx.toggleMask && $data.unmasked ? renderSlot(_ctx.$slots, "hideicon", {
    key: 0,
    onClick: $options.onMaskToggle
  }, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.hideIcon ? "i" : "EyeSlashIcon"), mergeProps({
      "class": _ctx.hideIcon,
      onClick: $options.onMaskToggle
    }, _ctx.ptm("hideIcon")), null, 16, ["class", "onClick"]))];
  }) : createCommentVNode("", true), _ctx.toggleMask && !$data.unmasked ? renderSlot(_ctx.$slots, "showicon", {
    key: 1,
    onClick: $options.onMaskToggle
  }, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.showIcon ? "i" : "EyeIcon"), mergeProps({
      "class": _ctx.showIcon,
      onClick: $options.onMaskToggle
    }, _ctx.ptm("showIcon")), null, 16, ["class", "onClick"]))];
  }) : createCommentVNode("", true), createBaseVNode("span", mergeProps({
    "class": "p-hidden-accessible",
    "aria-live": "polite"
  }, _ctx.ptm("hiddenAccesible"), {
    "data-p-hidden-accessible": true
  }), toDisplayString($data.infoText), 17), createVNode(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function() {
      return [createVNode(Transition, {
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, {
        "default": withCtx(function() {
          return [$data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.overlayRef,
            id: _ctx.panelId || $options.panelUniqueId,
            "class": [_ctx.cx("panel"), _ctx.panelClass],
            style: _ctx.panelStyle,
            onClick: _cache[0] || (_cache[0] = function() {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm("panel"))), [renderSlot(_ctx.$slots, "header"), renderSlot(_ctx.$slots, "content", {}, function() {
            return [createBaseVNode("div", mergeProps({
              "class": _ctx.cx("meter")
            }, _ctx.ptm("meter")), [createBaseVNode("div", mergeProps({
              "class": _ctx.cx("meterLabel"),
              style: {
                width: $data.meter ? $data.meter.width : ""
              }
            }, _ctx.ptm("meterLabel")), null, 16)], 16), createBaseVNode("div", mergeProps({
              "class": _ctx.cx("info")
            }, _ctx.ptm("info")), toDisplayString($data.infoText), 17)];
          }), renderSlot(_ctx.$slots, "footer")], 16, _hoisted_12)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 8, ["onEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16);
}
script7.render = render2;
export {
  script7 as default
};
//# sourceMappingURL=primevue_password.js.map
