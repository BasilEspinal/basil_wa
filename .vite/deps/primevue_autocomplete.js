import {
  script as script7
} from "./chunk-WN6DXYPO.js";
import {
  script as script5
} from "./chunk-HLZIADF7.js";
import {
  script as script3
} from "./chunk-ABUQWYRJ.js";
import {
  OverlayEventBus
} from "./chunk-M46M666T.js";
import {
  script as script6
} from "./chunk-LMPXBVVT.js";
import {
  script as script2
} from "./chunk-VIXWB2UQ.js";
import {
  script as script4
} from "./chunk-HGYY2ILA.js";
import {
  Ripple
} from "./chunk-DPSQVM4P.js";
import "./chunk-GOLRNOIJ.js";
import "./chunk-OJR2HVJ6.js";
import "./chunk-NBABGO3D.js";
import {
  script
} from "./chunk-SGVQCNSW.js";
import {
  useStyle
} from "./chunk-EGWDZ2T5.js";
import {
  ConnectedOverlayScrollHandler,
  DomHandler,
  ObjectUtils,
  UniqueComponentId,
  ZIndexUtils
} from "./chunk-BW6IAHPR.js";
import {
  Fragment,
  Transition,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  mergeProps,
  normalizeClass,
  openBlock,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDirective,
  resolveDynamicComponent,
  toDisplayString,
  withCtx,
  withDirectives
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/autocomplete/autocomplete.esm.js
var styles = "\n.p-autocomplete {\n    display: inline-flex;\n}\n\n.p-autocomplete-loader {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n\n.p-autocomplete-dd .p-autocomplete-input {\n    flex: 1 1 auto;\n    width: 1%;\n}\n\n.p-autocomplete-dd .p-autocomplete-input,\n.p-autocomplete-dd .p-autocomplete-multiple-container {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n\n.p-autocomplete-dd .p-autocomplete-dropdown {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0px;\n}\n\n.p-autocomplete .p-autocomplete-panel {\n    min-width: 100%;\n}\n\n.p-autocomplete-panel {\n    position: absolute;\n    overflow: auto;\n    top: 0;\n    left: 0;\n}\n\n.p-autocomplete-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n\n.p-autocomplete-item {\n    cursor: pointer;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n\n.p-autocomplete-multiple-container {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    cursor: text;\n    overflow: hidden;\n    display: flex;\n    align-items: center;\n    flex-wrap: wrap;\n}\n\n.p-autocomplete-token {\n    cursor: default;\n    display: inline-flex;\n    align-items: center;\n    flex: 0 0 auto;\n}\n\n.p-autocomplete-token-icon {\n    cursor: pointer;\n}\n\n.p-autocomplete-input-token {\n    flex: 1 1 auto;\n    display: inline-flex;\n}\n\n.p-autocomplete-input-token input {\n    border: 0 none;\n    outline: 0 none;\n    background-color: transparent;\n    margin: 0;\n    padding: 0;\n    box-shadow: none;\n    border-radius: 0;\n    width: 100%;\n}\n\n.p-fluid .p-autocomplete {\n    display: flex;\n}\n\n.p-fluid .p-autocomplete-dd .p-autocomplete-input {\n    width: 1%;\n}\n";
var inlineStyles = {
  root: {
    position: "relative"
  }
};
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-autocomplete p-component p-inputwrapper", {
      "p-disabled": props.disabled,
      "p-focus": instance.focused,
      "p-autocomplete-dd": props.dropdown,
      "p-autocomplete-multiple": props.multiple,
      "p-inputwrapper-filled": props.modelValue || ObjectUtils.isNotEmpty(instance.inputValue),
      "p-inputwrapper-focus": instance.focused,
      "p-overlay-open": instance.overlayVisible
    }];
  },
  input: function input(_ref2) {
    var props = _ref2.props;
    return ["p-autocomplete-input p-inputtext p-component", {
      "p-autocomplete-dd-input": props.dropdown
    }];
  },
  container: "p-autocomplete-multiple-container p-component p-inputtext",
  token: function token(_ref3) {
    var instance = _ref3.instance, i = _ref3.i;
    return ["p-autocomplete-token", {
      "p-focus": instance.focusedMultipleOptionIndex === i
    }];
  },
  tokenLabel: "p-autocomplete-token-label",
  removeTokenIcon: "p-autocomplete-token-icon",
  inputToken: "p-autocomplete-input-token",
  loadingIcon: "p-autocomplete-loader",
  dropdownButton: "p-autocomplete-dropdown",
  panel: function panel(_ref4) {
    var instance = _ref4.instance;
    return ["p-autocomplete-panel p-component", {
      "p-input-filled": instance.$primevue.config.inputStyle === "filled",
      "p-ripple-disabled": instance.$primevue.config.ripple === false
    }];
  },
  list: "p-autocomplete-items",
  itemGroup: "p-autocomplete-item-group",
  item: function item(_ref5) {
    var instance = _ref5.instance, option = _ref5.option, i = _ref5.i, getItemOptions = _ref5.getItemOptions;
    return ["p-autocomplete-item", {
      "p-highlight": instance.isSelected(option),
      "p-focus": instance.focusedOptionIndex === instance.getOptionIndex(i, getItemOptions),
      "p-disabled": instance.isOptionDisabled(option)
    }];
  },
  emptyMessage: "p-autocomplete-empty-message"
};
var _useStyle = useStyle(styles, {
  name: "autocomplete",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BaseAutoComplete",
  "extends": script,
  props: {
    modelValue: null,
    suggestions: {
      type: Array,
      "default": null
    },
    field: {
      // TODO: Deprecated since v3.16.0
      type: [String, Function],
      "default": null
    },
    optionLabel: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      "default": "200px"
    },
    dropdown: {
      type: Boolean,
      "default": false
    },
    dropdownMode: {
      type: String,
      "default": "blank"
    },
    autoHighlight: {
      // TODO: Deprecated since v3.16.0. Use selectOnFocus property instead.
      type: Boolean,
      "default": false
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    placeholder: {
      type: String,
      "default": null
    },
    dataKey: {
      type: String,
      "default": null
    },
    minLength: {
      type: Number,
      "default": 1
    },
    delay: {
      type: Number,
      "default": 300
    },
    appendTo: {
      type: String,
      "default": "body"
    },
    forceSelection: {
      type: Boolean,
      "default": false
    },
    completeOnFocus: {
      type: Boolean,
      "default": false
    },
    inputId: {
      type: String,
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    panelStyle: {
      type: Object,
      "default": null
    },
    panelClass: {
      type: [String, Object],
      "default": null
    },
    panelProps: {
      type: null,
      "default": null
    },
    dropdownIcon: {
      type: String,
      "default": void 0
    },
    dropdownClass: {
      type: [String, Object],
      "default": null
    },
    loadingIcon: {
      type: String,
      "default": void 0
    },
    removeTokenIcon: {
      type: String,
      "default": void 0
    },
    virtualScrollerOptions: {
      type: Object,
      "default": null
    },
    autoOptionFocus: {
      type: Boolean,
      "default": true
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    },
    searchLocale: {
      type: String,
      "default": void 0
    },
    searchMessage: {
      type: String,
      "default": null
    },
    selectionMessage: {
      type: String,
      "default": null
    },
    emptySelectionMessage: {
      type: String,
      "default": null
    },
    emptySearchMessage: {
      type: String,
      "default": null
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    "aria-label": {
      type: String,
      "default": null
    },
    "aria-labelledby": {
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
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
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
var script8 = {
  name: "AutoComplete",
  "extends": script$1,
  emits: ["update:modelValue", "change", "focus", "blur", "item-select", "item-unselect", "dropdown-click", "clear", "complete", "before-show", "before-hide", "show", "hide"],
  outsideClickListener: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  virtualScroller: null,
  searchTimeout: null,
  focusOnHover: false,
  dirty: false,
  data: function data() {
    return {
      id: this.$attrs.id,
      focused: false,
      focusedOptionIndex: -1,
      focusedMultipleOptionIndex: -1,
      overlayVisible: false,
      searching: false
    };
  },
  watch: {
    "$attrs.id": function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    suggestions: function suggestions() {
      if (this.searching) {
        ObjectUtils.isNotEmpty(this.suggestions) ? this.show() : !!this.$slots.empty ? this.show() : this.hide();
        this.focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.searching = false;
      }
      this.autoUpdateModel();
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    this.autoUpdateModel();
  },
  updated: function updated() {
    if (this.overlayVisible) {
      this.alignOverlay();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
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
    getOptionIndex: function getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)["index"];
    },
    getOptionLabel: function getOptionLabel(option) {
      return this.field || this.optionLabel ? ObjectUtils.resolveFieldData(option, this.field || this.optionLabel) : option;
    },
    getOptionValue: function getOptionValue(option) {
      return option;
    },
    getOptionRenderKey: function getOptionRenderKey(option, index) {
      return (this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + "_" + index;
    },
    getPTOptions: function getPTOptions(option, itemOptions, index, key) {
      return this.ptm(key, {
        context: {
          selected: this.isSelected(option),
          focused: this.focusedOptionIndex === this.getOptionIndex(index, itemOptions),
          disabled: this.isOptionDisabled(option)
        }
      });
    },
    isOptionDisabled: function isOptionDisabled(option) {
      return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionGroup: function isOptionGroup(option) {
      return this.optionGroupLabel && option.optionGroup && option.group;
    },
    getOptionGroupLabel: function getOptionGroupLabel(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren: function getOptionGroupChildren(optionGroup) {
      return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset: function getAriaPosInset(index) {
      var _this = this;
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter(function(option) {
        return _this.isOptionGroup(option);
      }).length : index) + 1;
    },
    show: function show(isFocus) {
      this.$emit("before-show");
      this.dirty = true;
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      isFocus && DomHandler.focus(this.$refs.focusInput);
    },
    hide: function hide(isFocus) {
      var _this2 = this;
      var _hide = function _hide2() {
        _this2.$emit("before-hide");
        _this2.dirty = isFocus;
        _this2.overlayVisible = false;
        _this2.focusedOptionIndex = -1;
        isFocus && DomHandler.focus(_this2.$refs.focusInput);
      };
      setTimeout(function() {
        _hide();
      }, 0);
    },
    onFocus: function onFocus(event) {
      if (this.disabled) {
        return;
      }
      if (!this.dirty && this.completeOnFocus) {
        this.search(event, event.target.value, "focus");
      }
      this.dirty = true;
      this.focused = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
      this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.dirty = false;
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit("blur", event);
    },
    onKeyDown: function onKeyDown(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event);
          break;
        case "ArrowLeft":
          this.onArrowLeftKey(event);
          break;
        case "ArrowRight":
          this.onArrowRightKey(event);
          break;
        case "Home":
          this.onHomeKey(event);
          break;
        case "End":
          this.onEndKey(event);
          break;
        case "PageDown":
          this.onPageDownKey(event);
          break;
        case "PageUp":
          this.onPageUpKey(event);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(event);
          break;
        case "Escape":
          this.onEscapeKey(event);
          break;
        case "Tab":
          this.onTabKey(event);
          break;
        case "Backspace":
          this.onBackspaceKey(event);
          break;
      }
    },
    onInput: function onInput(event) {
      var _this3 = this;
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      var query = event.target.value;
      if (!this.multiple) {
        this.updateModel(event, query);
      }
      if (query.length === 0) {
        this.hide();
        this.$emit("clear");
      } else {
        if (query.length >= this.minLength) {
          this.focusedOptionIndex = -1;
          this.searchTimeout = setTimeout(function() {
            _this3.search(event, query, "input");
          }, this.delay);
        } else {
          this.hide();
        }
      }
    },
    onChange: function onChange(event) {
      var _this4 = this;
      if (this.forceSelection) {
        var valid = false;
        if (this.visibleOptions) {
          var matchedValue = this.visibleOptions.find(function(option) {
            return _this4.isOptionMatched(option, _this4.$refs.focusInput.value || "");
          });
          if (matchedValue !== void 0) {
            valid = true;
            !this.isSelected(matchedValue) && this.onOptionSelect(event, matchedValue);
          }
        }
        if (!valid) {
          this.$refs.focusInput.value = "";
          this.$emit("clear");
          !this.multiple && this.updateModel(event, null);
        }
      }
    },
    onMultipleContainerFocus: function onMultipleContainerFocus() {
      if (this.disabled) {
        return;
      }
      this.focused = true;
    },
    onMultipleContainerBlur: function onMultipleContainerBlur() {
      this.focusedMultipleOptionIndex = -1;
      this.focused = false;
    },
    onMultipleContainerKeyDown: function onMultipleContainerKeyDown(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      switch (event.code) {
        case "ArrowLeft":
          this.onArrowLeftKeyOnMultiple(event);
          break;
        case "ArrowRight":
          this.onArrowRightKeyOnMultiple(event);
          break;
        case "Backspace":
          this.onBackspaceKeyOnMultiple(event);
          break;
      }
    },
    onContainerClick: function onContainerClick(event) {
      if (this.disabled || this.searching || this.isInputClicked(event) || this.isDropdownClicked(event)) {
        return;
      }
      if (!this.overlay || !this.overlay.contains(event.target)) {
        DomHandler.focus(this.$refs.focusInput);
      }
    },
    onDropdownClick: function onDropdownClick(event) {
      var query = void 0;
      if (this.overlayVisible) {
        this.hide(true);
      } else {
        DomHandler.focus(this.$refs.focusInput);
        query = this.$refs.focusInput.value;
        if (this.dropdownMode === "blank")
          this.search(event, "", "dropdown");
        else if (this.dropdownMode === "current")
          this.search(event, query, "dropdown");
      }
      this.$emit("dropdown-click", {
        originalEvent: event,
        query
      });
    },
    onOptionSelect: function onOptionSelect(event, option) {
      var isHide = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      var value = this.getOptionValue(option);
      if (this.multiple) {
        this.$refs.focusInput.value = "";
        if (!this.isSelected(option)) {
          this.updateModel(event, [].concat(_toConsumableArray(this.modelValue || []), [value]));
        }
      } else {
        this.updateModel(event, value);
      }
      this.$emit("item-select", {
        originalEvent: event,
        value: option
      });
      isHide && this.hide(true);
    },
    onOptionMouseMove: function onOptionMouseMove(event, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event, index);
      }
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.$el
      });
    },
    onOverlayKeyDown: function onOverlayKeyDown(event) {
      switch (event.code) {
        case "Escape":
          this.onEscapeKey(event);
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      if (!this.overlayVisible) {
        return;
      }
      var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex);
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      if (!this.overlayVisible) {
        return;
      }
      if (event.altKey) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event.preventDefault();
      } else {
        var optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();
        this.changeFocusedOptionIndex(event, optionIndex);
        event.preventDefault();
      }
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var target = event.currentTarget;
      this.focusedOptionIndex = -1;
      if (this.multiple) {
        if (ObjectUtils.isEmpty(target.value) && this.hasSelectedOption) {
          DomHandler.focus(this.$refs.multiContainer);
          this.focusedMultipleOptionIndex = this.modelValue.length;
        } else {
          event.stopPropagation();
        }
      }
    },
    onArrowRightKey: function onArrowRightKey(event) {
      this.focusedOptionIndex = -1;
      this.multiple && event.stopPropagation();
    },
    onHomeKey: function onHomeKey(event) {
      var currentTarget = event.currentTarget;
      var len = currentTarget.value.length;
      currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
      this.focusedOptionIndex = -1;
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      var currentTarget = event.currentTarget;
      var len = currentTarget.value.length;
      currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
      this.focusedOptionIndex = -1;
      event.preventDefault();
    },
    onPageUpKey: function onPageUpKey(event) {
      this.scrollInView(0);
      event.preventDefault();
    },
    onPageDownKey: function onPageDownKey(event) {
      this.scrollInView(this.visibleOptions.length - 1);
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      if (!this.overlayVisible) {
        this.onArrowDownKey(event);
      } else {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.hide();
      }
      event.preventDefault();
    },
    onEscapeKey: function onEscapeKey(event) {
      this.overlayVisible && this.hide(true);
      event.preventDefault();
    },
    onTabKey: function onTabKey(event) {
      if (this.focusedOptionIndex !== -1) {
        this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
      }
      this.overlayVisible && this.hide();
    },
    onBackspaceKey: function onBackspaceKey(event) {
      if (this.multiple) {
        if (ObjectUtils.isNotEmpty(this.modelValue) && !this.$refs.focusInput.value) {
          var removedValue = this.modelValue[this.modelValue.length - 1];
          var newValue = this.modelValue.slice(0, -1);
          this.$emit("update:modelValue", newValue);
          this.$emit("item-unselect", {
            originalEvent: event,
            value: removedValue
          });
        }
        event.stopPropagation();
      }
    },
    onArrowLeftKeyOnMultiple: function onArrowLeftKeyOnMultiple() {
      this.focusedMultipleOptionIndex = this.focusedMultipleOptionIndex < 1 ? 0 : this.focusedMultipleOptionIndex - 1;
    },
    onArrowRightKeyOnMultiple: function onArrowRightKeyOnMultiple() {
      this.focusedMultipleOptionIndex++;
      if (this.focusedMultipleOptionIndex > this.modelValue.length - 1) {
        this.focusedMultipleOptionIndex = -1;
        DomHandler.focus(this.$refs.focusInput);
      }
    },
    onBackspaceKeyOnMultiple: function onBackspaceKeyOnMultiple(event) {
      if (this.focusedMultipleOptionIndex !== -1) {
        this.removeOption(event, this.focusedMultipleOptionIndex);
      }
    },
    onOverlayEnter: function onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      DomHandler.addStyles(el, {
        position: "absolute",
        top: "0",
        left: "0"
      });
      this.alignOverlay();
    },
    onOverlayAfterEnter: function onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit("show");
    },
    onOverlayLeave: function onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      this.overlay = null;
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay: function alignOverlay() {
      var target = this.multiple ? this.$refs.multiContainer : this.$refs.focusInput;
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, target);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(target) + "px";
        DomHandler.absolutePosition(this.overlay, target);
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this5 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function(event) {
          if (_this5.overlayVisible && _this5.overlay && _this5.isOutsideClicked(event)) {
            _this5.hide();
          }
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this6 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, function() {
          if (_this6.overlayVisible) {
            _this6.hide();
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
      var _this7 = this;
      if (!this.resizeListener) {
        this.resizeListener = function() {
          if (_this7.overlayVisible && !DomHandler.isTouchDevice()) {
            _this7.hide();
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
    isOutsideClicked: function isOutsideClicked(event) {
      return !this.overlay.contains(event.target) && !this.isInputClicked(event) && !this.isDropdownClicked(event);
    },
    isInputClicked: function isInputClicked(event) {
      if (this.multiple)
        return event.target === this.$refs.multiContainer || this.$refs.multiContainer.contains(event.target);
      else
        return event.target === this.$refs.focusInput;
    },
    isDropdownClicked: function isDropdownClicked(event) {
      return this.$refs.dropdownButton ? event.target === this.$refs.dropdownButton || this.$refs.dropdownButton.$el.contains(event.target) : false;
    },
    isOptionMatched: function isOptionMatched(option, value) {
      return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.searchLocale) === value.toLocaleLowerCase(this.searchLocale);
    },
    isValidOption: function isValidOption(option) {
      return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    },
    isValidSelectedOption: function isValidSelectedOption(option) {
      return this.isValidOption(option) && this.isSelected(option);
    },
    isSelected: function isSelected(option) {
      return ObjectUtils.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
    },
    findFirstOptionIndex: function findFirstOptionIndex() {
      var _this8 = this;
      return this.visibleOptions.findIndex(function(option) {
        return _this8.isValidOption(option);
      });
    },
    findLastOptionIndex: function findLastOptionIndex() {
      var _this9 = this;
      return ObjectUtils.findLastIndex(this.visibleOptions, function(option) {
        return _this9.isValidOption(option);
      });
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var _this10 = this;
      var matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function(option) {
        return _this10.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var _this11 = this;
      var matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), function(option) {
        return _this11.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex: function findSelectedOptionIndex() {
      var _this12 = this;
      return this.hasSelectedOption ? this.visibleOptions.findIndex(function(option) {
        return _this12.isValidSelectedOption(option);
      }) : -1;
    },
    findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex() {
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex: function findLastFocusedOptionIndex() {
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    search: function search(event, query, source) {
      if (query === void 0 || query === null) {
        return;
      }
      if (source === "input" && query.trim().length === 0) {
        return;
      }
      this.searching = true;
      this.$emit("complete", {
        originalEvent: event,
        query
      });
    },
    removeOption: function removeOption(event, index) {
      var _this13 = this;
      var removedOption = this.modelValue[index];
      var value = this.modelValue.filter(function(_, i) {
        return i !== index;
      }).map(function(option) {
        return _this13.getOptionValue(option);
      });
      this.updateModel(event, value);
      this.$emit("item-unselect", {
        originalEvent: event,
        value: removedOption
      });
      this.dirty = true;
      DomHandler.focus(this.$refs.focusInput);
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(event, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus || this.autoHighlight) {
          this.onOptionSelect(event, this.visibleOptions[index], false);
        }
      }
    },
    scrollInView: function scrollInView() {
      var _this14 = this;
      var index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
      var id = index !== -1 ? "".concat(this.id, "_").concat(index) : this.focusedOptionId;
      var element = DomHandler.findSingle(this.list, 'li[id="'.concat(id, '"]'));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: "nearest",
          inline: "start"
        });
      } else if (!this.virtualScrollerDisabled) {
        setTimeout(function() {
          _this14.virtualScroller && _this14.virtualScroller.scrollToIndex(index !== -1 ? index : _this14.focusedOptionIndex);
        }, 0);
      }
    },
    autoUpdateModel: function autoUpdateModel() {
      if ((this.selectOnFocus || this.autoHighlight) && this.autoOptionFocus && !this.hasSelectedOption) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
      }
    },
    updateModel: function updateModel(event, value) {
      this.$emit("update:modelValue", value);
      this.$emit("change", {
        originalEvent: event,
        value
      });
    },
    flatOptions: function flatOptions(options) {
      var _this15 = this;
      return (options || []).reduce(function(result, option, index) {
        result.push({
          optionGroup: option,
          group: true,
          index
        });
        var optionGroupChildren = _this15.getOptionGroupChildren(option);
        optionGroupChildren && optionGroupChildren.forEach(function(o) {
          return result.push(o);
        });
        return result;
      }, []);
    },
    overlayRef: function overlayRef(el) {
      this.overlay = el;
    },
    listRef: function listRef(el, contentRef) {
      this.list = el;
      contentRef && contentRef(el);
    },
    virtualScrollerRef: function virtualScrollerRef(el) {
      this.virtualScroller = el;
    }
  },
  computed: {
    visibleOptions: function visibleOptions() {
      return this.optionGroupLabel ? this.flatOptions(this.suggestions) : this.suggestions || [];
    },
    inputValue: function inputValue() {
      if (this.modelValue) {
        if (_typeof$1(this.modelValue) === "object") {
          var label = this.getOptionLabel(this.modelValue);
          return label != null ? label : this.modelValue;
        } else {
          return this.modelValue;
        }
      } else {
        return "";
      }
    },
    hasSelectedOption: function hasSelectedOption() {
      return ObjectUtils.isNotEmpty(this.modelValue);
    },
    equalityKey: function equalityKey() {
      return this.dataKey;
    },
    searchResultMessageText: function searchResultMessageText() {
      return ObjectUtils.isNotEmpty(this.visibleOptions) && this.overlayVisible ? this.searchMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptySearchMessageText;
    },
    searchMessageText: function searchMessageText() {
      return this.searchMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptySearchMessageText: function emptySearchMessageText() {
      return this.emptySearchMessage || this.$primevue.config.locale.emptySearchMessage || "";
    },
    selectionMessageText: function selectionMessageText() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText: function emptySelectionMessageText() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText: function selectedMessageText() {
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll("{0}", this.multiple ? this.modelValue.length : "1") : this.emptySelectionMessageText;
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? "".concat(this.id, "_").concat(this.focusedOptionIndex) : null;
    },
    focusedMultipleOptionId: function focusedMultipleOptionId() {
      return this.focusedMultipleOptionIndex !== -1 ? "".concat(this.id, "_multiple_option_").concat(this.focusedMultipleOptionIndex) : null;
    },
    ariaSetSize: function ariaSetSize() {
      var _this16 = this;
      return this.visibleOptions.filter(function(option) {
        return !_this16.isOptionGroup(option);
      }).length;
    },
    virtualScrollerDisabled: function virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  components: {
    Button: script3,
    VirtualScroller: script7,
    Portal: script6,
    ChevronDownIcon: script4,
    SpinnerIcon: script2,
    TimesCircleIcon: script5
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
var _hoisted_1 = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
var _hoisted_2 = ["aria-activedescendant"];
var _hoisted_3 = ["id", "aria-label", "aria-setsize", "aria-posinset"];
var _hoisted_4 = ["id", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
var _hoisted_5 = ["id"];
var _hoisted_6 = ["id"];
var _hoisted_7 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove", "data-p-highlight", "data-p-focus", "data-p-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_Button = resolveComponent("Button");
  var _component_VirtualScroller = resolveComponent("VirtualScroller");
  var _component_Portal = resolveComponent("Portal");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    "class": _ctx.cx("root"),
    style: _ctx.sx("root"),
    onClick: _cache[15] || (_cache[15] = function() {
      return $options.onContainerClick && $options.onContainerClick.apply($options, arguments);
    })
  }, _ctx.ptm("root"), {
    "data-pc-name": "autocomplete"
  }), [!_ctx.multiple ? (openBlock(), createElementBlock("input", mergeProps({
    key: 0,
    ref: "focusInput",
    id: _ctx.inputId,
    type: "text",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: $options.inputValue,
    placeholder: _ctx.placeholder,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    disabled: _ctx.disabled,
    autocomplete: "off",
    role: "combobox",
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $data.id + "_list",
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function() {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onInput: _cache[3] || (_cache[3] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    }),
    onChange: _cache[4] || (_cache[4] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm("input"))), null, 16, _hoisted_1)) : createCommentVNode("", true), _ctx.multiple ? (openBlock(), createElementBlock("ul", mergeProps({
    key: 1,
    ref: "multiContainer",
    "class": _ctx.cx("container"),
    tabindex: "-1",
    role: "listbox",
    "aria-orientation": "horizontal",
    "aria-activedescendant": $data.focused ? $options.focusedMultipleOptionId : void 0,
    onFocus: _cache[10] || (_cache[10] = function() {
      return $options.onMultipleContainerFocus && $options.onMultipleContainerFocus.apply($options, arguments);
    }),
    onBlur: _cache[11] || (_cache[11] = function() {
      return $options.onMultipleContainerBlur && $options.onMultipleContainerBlur.apply($options, arguments);
    }),
    onKeydown: _cache[12] || (_cache[12] = function() {
      return $options.onMultipleContainerKeyDown && $options.onMultipleContainerKeyDown.apply($options, arguments);
    })
  }, _ctx.ptm("container")), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelValue, function(option, i) {
    return openBlock(), createElementBlock("li", mergeProps({
      key: i,
      id: $data.id + "_multiple_option_" + i,
      "class": _ctx.cx("token", {
        i
      }),
      role: "option",
      "aria-label": $options.getOptionLabel(option),
      "aria-selected": true,
      "aria-setsize": _ctx.modelValue.length,
      "aria-posinset": i + 1
    }, _ctx.ptm("token")), [renderSlot(_ctx.$slots, "chip", {
      value: option
    }, function() {
      return [createBaseVNode("span", mergeProps({
        "class": _ctx.cx("tokenLabel")
      }, _ctx.ptm("tokenLabel")), toDisplayString($options.getOptionLabel(option)), 17)];
    }), renderSlot(_ctx.$slots, "removetokenicon", {
      "class": normalizeClass(_ctx.cx(_ctx.removeTokenIcon)),
      onClick: function onClick(event) {
        return $options.removeOption(event, i);
      }
    }, function() {
      return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.removeTokenIcon ? "span" : "TimesCircleIcon"), mergeProps({
        "class": [_ctx.cx(_ctx.removeTokenIcon), _ctx.removeTokenIcon],
        onClick: function onClick($event) {
          return $options.removeOption($event, i);
        },
        "aria-hidden": "true"
      }, _ctx.ptm("removeTokenIcon")), null, 16, ["class", "onClick"]))];
    })], 16, _hoisted_3);
  }), 128)), createBaseVNode("li", mergeProps({
    "class": _ctx.cx("inputToken"),
    role: "option"
  }, _ctx.ptm("inputToken")), [createBaseVNode("input", mergeProps({
    ref: "focusInput",
    id: _ctx.inputId,
    type: "text",
    style: _ctx.inputStyle,
    "class": _ctx.inputClass,
    placeholder: _ctx.placeholder,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    disabled: _ctx.disabled,
    autocomplete: "off",
    role: "combobox",
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $data.id + "_list",
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
    onFocus: _cache[5] || (_cache[5] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[6] || (_cache[6] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[7] || (_cache[7] = function() {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onInput: _cache[8] || (_cache[8] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    }),
    onChange: _cache[9] || (_cache[9] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm("input"))), null, 16, _hoisted_4)], 16)], 16, _hoisted_2)) : createCommentVNode("", true), $data.searching ? renderSlot(_ctx.$slots, "loadingicon", {
    key: 2,
    "class": normalizeClass(_ctx.cx("loadingIcon"))
  }, function() {
    return [_ctx.loadingIcon ? (openBlock(), createElementBlock("i", mergeProps({
      key: 0,
      "class": ["pi-spin", _ctx.cx("loadingIcon"), _ctx.loadingIcon],
      "aria-hidden": "true"
    }, _ctx.ptm("loadingIcon")), null, 16)) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
      key: 1,
      "class": [_ctx.cx("loadingIcon"), _ctx.loadingIcon],
      spin: "",
      "aria-hidden": "true"
    }, _ctx.ptm("loadingIcon")), null, 16, ["class"]))];
  }) : createCommentVNode("", true), _ctx.dropdown ? (openBlock(), createBlock(_component_Button, {
    key: 3,
    ref: "dropdownButton",
    type: "button",
    tabindex: "-1",
    "class": normalizeClass([_ctx.cx("dropdownButton"), _ctx.dropdownClass]),
    disabled: _ctx.disabled,
    "aria-hidden": "true",
    onClick: $options.onDropdownClick,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm("dropdownButton"),
    "data-pc-section": "dropdownbutton"
  }, {
    icon: withCtx(function() {
      return [renderSlot(_ctx.$slots, "dropdownicon", {
        "class": normalizeClass(_ctx.dropdownIcon)
      }, function() {
        return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.dropdownIcon ? "span" : "ChevronDownIcon"), mergeProps({
          "class": _ctx.dropdownIcon
        }, _ctx.ptm("dropdownButton")["icon"]), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 8, ["class", "disabled", "onClick", "unstyled", "pt"])) : createCommentVNode("", true), createBaseVNode("span", mergeProps({
    role: "status",
    "aria-live": "polite",
    "class": "p-hidden-accessible"
  }, _ctx.ptm("hiddenSearchResult"), {
    "data-p-hidden-accessible": true
  }), toDisplayString($options.searchResultMessageText), 17), createVNode(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function() {
      return [createVNode(Transition, {
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onAfterEnter: $options.onOverlayAfterEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, {
        "default": withCtx(function() {
          return [$data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.overlayRef,
            "class": [_ctx.cx("panel"), _ctx.panelClass],
            style: _objectSpread(_objectSpread({}, _ctx.panelStyle), {}, {
              "max-height": $options.virtualScrollerDisabled ? _ctx.scrollHeight : ""
            }),
            onClick: _cache[13] || (_cache[13] = function() {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            onKeydown: _cache[14] || (_cache[14] = function() {
              return $options.onOverlayKeyDown && $options.onOverlayKeyDown.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm("panel"))), [renderSlot(_ctx.$slots, "header", {
            value: _ctx.modelValue,
            suggestions: $options.visibleOptions
          }), createVNode(_component_VirtualScroller, mergeProps({
            ref: $options.virtualScrollerRef
          }, _ctx.virtualScrollerOptions, {
            style: {
              height: _ctx.scrollHeight
            },
            items: $options.visibleOptions,
            tabindex: -1,
            disabled: $options.virtualScrollerDisabled,
            pt: _ctx.ptm("virtualScroller")
          }), createSlots({
            content: withCtx(function(_ref) {
              var styleClass = _ref.styleClass, contentRef = _ref.contentRef, items = _ref.items, getItemOptions = _ref.getItemOptions, contentStyle = _ref.contentStyle, itemSize = _ref.itemSize;
              return [createBaseVNode("ul", mergeProps({
                ref: function ref(el) {
                  return $options.listRef(el, contentRef);
                },
                id: $data.id + "_list",
                "class": [_ctx.cx("list"), styleClass],
                style: contentStyle,
                role: "listbox"
              }, _ctx.ptm("list")), [(openBlock(true), createElementBlock(Fragment, null, renderList(items, function(option, i) {
                return openBlock(), createElementBlock(Fragment, {
                  key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                }, [$options.isOptionGroup(option) ? (openBlock(), createElementBlock("li", mergeProps({
                  key: 0,
                  id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                  style: {
                    height: itemSize ? itemSize + "px" : void 0
                  },
                  "class": _ctx.cx("itemGroup"),
                  role: "option"
                }, _ctx.ptm("itemGroup")), [renderSlot(_ctx.$slots, "optiongroup", {
                  option: option.optionGroup,
                  item: option.optionGroup,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function() {
                  return [createTextVNode(toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)];
                })], 16, _hoisted_6)) : withDirectives((openBlock(), createElementBlock("li", mergeProps({
                  key: 1,
                  id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                  style: {
                    height: itemSize ? itemSize + "px" : void 0
                  },
                  "class": _ctx.cx("item", {
                    option,
                    i,
                    getItemOptions
                  }),
                  role: "option",
                  "aria-label": $options.getOptionLabel(option),
                  "aria-selected": $options.isSelected(option),
                  "aria-disabled": $options.isOptionDisabled(option),
                  "aria-setsize": $options.ariaSetSize,
                  "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                  onClick: function onClick($event) {
                    return $options.onOptionSelect($event, option);
                  },
                  onMousemove: function onMousemove($event) {
                    return $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions));
                  },
                  "data-p-highlight": $options.isSelected(option),
                  "data-p-focus": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions),
                  "data-p-disabled": $options.isOptionDisabled(option)
                }, $options.getPTOptions(option, getItemOptions, i, "item")), [_ctx.$slots.option ? renderSlot(_ctx.$slots, "option", {
                  key: 0,
                  option,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function() {
                  return [createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)];
                }) : renderSlot(_ctx.$slots, "item", {
                  key: 1,
                  item: option,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function() {
                  return [createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)];
                })], 16, _hoisted_7)), [[_directive_ripple]])], 64);
              }), 128)), !items || items && items.length === 0 ? (openBlock(), createElementBlock("li", mergeProps({
                key: 0,
                "class": _ctx.cx("emptyMessage"),
                role: "option"
              }, _ctx.ptm("emptyMessage")), [renderSlot(_ctx.$slots, "empty", {}, function() {
                return [createTextVNode(toDisplayString($options.searchResultMessageText), 1)];
              })], 16)) : createCommentVNode("", true)], 16, _hoisted_5)];
            }),
            _: 2
          }, [_ctx.$slots.loader ? {
            name: "loader",
            fn: withCtx(function(_ref2) {
              var options = _ref2.options;
              return [renderSlot(_ctx.$slots, "loader", {
                options
              })];
            }),
            key: "0"
          } : void 0]), 1040, ["style", "items", "disabled", "pt"]), renderSlot(_ctx.$slots, "footer", {
            value: _ctx.modelValue,
            suggestions: $options.visibleOptions
          }), createBaseVNode("span", mergeProps({
            role: "status",
            "aria-live": "polite",
            "class": "p-hidden-accessible"
          }, _ctx.ptm("hiddenSelectedMessage"), {
            "data-p-hidden-accessible": true
          }), toDisplayString($options.selectedMessageText), 17)], 16)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16);
}
script8.render = render;
export {
  script8 as default
};
//# sourceMappingURL=primevue_autocomplete.js.map
