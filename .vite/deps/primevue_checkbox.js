import {
  script as script2
} from "./chunk-TMZXCM4M.js";
import "./chunk-OJR2HVJ6.js";
import {
  script
} from "./chunk-SGVQCNSW.js";
import "./chunk-EGWDZ2T5.js";
import {
  ObjectUtils
} from "./chunk-BW6IAHPR.js";
import {
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  mergeProps,
  normalizeClass,
  openBlock,
  renderSlot,
  resolveComponent
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/checkbox/checkbox.esm.js
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-checkbox p-component", {
      "p-checkbox-checked": instance.checked,
      "p-checkbox-disabled": props.disabled,
      "p-checkbox-focused": instance.focused
    }];
  },
  input: function input(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-checkbox-box", {
      "p-highlight": instance.checked,
      "p-disabled": props.disabled,
      "p-focus": instance.focused
    }];
  },
  icon: "p-checkbox-icon"
};
var script$1 = {
  name: "BaseCheckbox",
  "extends": script,
  props: {
    value: null,
    modelValue: null,
    binary: Boolean,
    name: {
      type: String,
      "default": null
    },
    trueValue: {
      type: null,
      "default": true
    },
    falseValue: {
      type: null,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    required: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
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
    classes
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var script3 = {
  name: "Checkbox",
  "extends": script$1,
  emits: ["click", "update:modelValue", "change", "input", "focus", "blur"],
  data: function data() {
    return {
      focused: false
    };
  },
  methods: {
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        context: {
          checked: this.checked,
          focused: this.focused,
          disabled: this.disabled
        }
      });
    },
    onClick: function onClick(event) {
      var _this = this;
      if (!this.disabled && !this.readonly) {
        var newModelValue;
        if (this.binary) {
          newModelValue = this.checked ? this.falseValue : this.trueValue;
        } else {
          if (this.checked)
            newModelValue = this.modelValue.filter(function(val) {
              return !ObjectUtils.equals(val, _this.value);
            });
          else
            newModelValue = this.modelValue ? [].concat(_toConsumableArray(this.modelValue), [this.value]) : [this.value];
        }
        this.$emit("click", event);
        this.$emit("update:modelValue", newModelValue);
        this.$emit("change", event);
        this.$emit("input", newModelValue);
        this.$refs.input.focus();
      }
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
    }
  },
  computed: {
    checked: function checked() {
      return this.binary ? this.modelValue === this.trueValue : ObjectUtils.contains(this.value, this.modelValue);
    }
  },
  components: {
    CheckIcon: script2
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
var _hoisted_1 = ["id", "value", "name", "checked", "tabindex", "disabled", "readonly", "required", "aria-labelledby", "aria-label"];
var _hoisted_2 = ["data-p-highlight", "data-p-disabled", "data-p-focused"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = resolveComponent("CheckIcon");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    onClick: _cache[2] || (_cache[2] = function($event) {
      return $options.onClick($event);
    })
  }, $options.getPTOptions("root"), {
    "data-pc-name": "checkbox"
  }), [createBaseVNode("div", mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm("hiddenInputWrapper"), {
    "data-p-hidden-accessible": true
  }), [createBaseVNode("input", mergeProps({
    ref: "input",
    id: _ctx.inputId,
    type: "checkbox",
    value: _ctx.value,
    name: _ctx.name,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    required: _ctx.required,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    onFocus: _cache[0] || (_cache[0] = function($event) {
      return $options.onFocus($event);
    }),
    onBlur: _cache[1] || (_cache[1] = function($event) {
      return $options.onBlur($event);
    })
  }, _ctx.ptm("hiddenInput")), null, 16, _hoisted_1)], 16), createBaseVNode("div", mergeProps({
    ref: "box",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), $options.getPTOptions("input")), {
    "data-p-highlight": $options.checked,
    "data-p-disabled": _ctx.disabled,
    "data-p-focused": $data.focused
  }), [renderSlot(_ctx.$slots, "icon", {
    checked: $options.checked,
    "class": normalizeClass(_ctx.cx("icon"))
  }, function() {
    return [$options.checked ? (openBlock(), createBlock(_component_CheckIcon, mergeProps({
      key: 0,
      "class": _ctx.cx("icon")
    }, $options.getPTOptions("icon")), null, 16, ["class"])) : createCommentVNode("", true)];
  })], 16, _hoisted_2)], 16);
}
script3.render = render;
export {
  script3 as default
};
//# sourceMappingURL=primevue_checkbox.js.map
