import {
  script as script5,
  script2 as script6
} from "./chunk-4HJHLBXD.js";
import {
  script as script4
} from "./chunk-KZCCVRBO.js";
import {
  script as script3
} from "./chunk-XYV5CWUE.js";
import {
  script as script2
} from "./chunk-ABUQWYRJ.js";
import "./chunk-VIXWB2UQ.js";
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
  DomHandler,
  ObjectUtils,
  UniqueComponentId
} from "./chunk-BW6IAHPR.js";
import {
  Fragment,
  TransitionGroup,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  createVNode,
  guardReactiveProps,
  mergeProps,
  normalizeProps,
  openBlock,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDirective,
  withCtx,
  withDirectives
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/orderlist/orderlist.esm.js
var styles = "\n.p-orderlist {\n    display: flex;\n}\n\n.p-orderlist-controls {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n}\n\n.p-orderlist-list-container {\n    flex: 1 1 auto;\n}\n\n.p-orderlist-list {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    overflow: auto;\n    min-height: 12rem;\n    max-height: 24rem;\n}\n\n.p-orderlist-item {\n    cursor: pointer;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-orderlist.p-state-disabled .p-orderlist-item,\n.p-orderlist.p-state-disabled .p-button {\n    cursor: default;\n}\n\n.p-orderlist.p-state-disabled .p-orderlist-list {\n    overflow: hidden;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-orderlist p-component", {
      "p-orderlist-striped": props.stripedRows
    }];
  },
  controls: "p-orderlist-controls",
  header: "p-orderlist-header",
  container: "p-orderlist-list-container",
  list: "p-orderlist-list",
  item: function item(_ref2) {
    var instance = _ref2.instance, _item = _ref2.item, id = _ref2.id;
    return ["p-orderlist-item", {
      "p-highlight": instance.isSelected(_item),
      "p-focus": id === instance.focusedOptionId
    }];
  }
};
var _useStyle = useStyle(styles, {
  name: "orderlist",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BaseOrderList",
  "extends": script,
  props: {
    modelValue: {
      type: Array,
      "default": null
    },
    selection: {
      type: Array,
      "default": null
    },
    dataKey: {
      type: String,
      "default": null
    },
    listStyle: {
      type: null,
      "default": null
    },
    metaKeySelection: {
      type: Boolean,
      "default": true
    },
    responsive: {
      type: Boolean,
      "default": true
    },
    breakpoint: {
      type: String,
      "default": "960px"
    },
    stripedRows: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    listProps: {
      type: null,
      "default": null
    },
    moveUpButtonProps: {
      type: null,
      "default": null
    },
    moveTopButtonProps: {
      type: null,
      "default": null
    },
    moveDownButtonProps: {
      type: null,
      "default": null
    },
    moveBottomButtonProps: {
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
    loadStyle
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
var script7 = {
  name: "OrderList",
  "extends": script$1,
  emits: ["update:modelValue", "reorder", "update:selection", "selection-change", "focus", "blur"],
  itemTouched: false,
  reorderDirection: null,
  styleElement: null,
  list: null,
  data: function data() {
    return {
      id: this.$attrs.id,
      d_selection: this.selection,
      focused: false,
      focusedOptionIndex: -1
    };
  },
  watch: {
    "$attrs.id": function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.destroyStyle();
  },
  updated: function updated() {
    if (this.reorderDirection) {
      this.updateListScroll();
      this.reorderDirection = null;
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    if (this.responsive) {
      this.createStyle();
    }
  },
  methods: {
    getItemKey: function getItemKey(item2, index) {
      return this.dataKey ? ObjectUtils.resolveFieldData(item2, this.dataKey) : index;
    },
    getPTOptions: function getPTOptions(item2, key, index) {
      return this.ptm(key, {
        context: {
          active: this.isSelected(item2),
          focused: "".concat(this.id, "_").concat(index) === this.focusedOptionId
        }
      });
    },
    isSelected: function isSelected(item2) {
      return ObjectUtils.findIndexInList(item2, this.d_selection) != -1;
    },
    onListFocus: function onListFocus(event) {
      var selectedFirstItem = DomHandler.findSingle(this.list, '[data-p-highlight="true"]');
      var findIndex = ObjectUtils.findIndexInList(selectedFirstItem, this.list.children);
      this.focused = true;
      var index = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : selectedFirstItem ? findIndex : -1;
      this.changeFocusedOptionIndex(index);
      this.$emit("focus", event);
    },
    onListBlur: function onListBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit("blur", event);
    },
    onListKeyDown: function onListKeyDown(event) {
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event);
          break;
        case "Home":
          this.onHomeKey(event);
          break;
        case "End":
          this.onEndKey(event);
          break;
        case "Enter":
          this.onEnterKey(event);
          break;
        case "Space":
          this.onSpaceKey(event);
          break;
        case "KeyA":
          if (event.ctrlKey) {
            this.d_selection = _toConsumableArray(this.modelValue);
            this.$emit("update:selection", this.d_selection);
          }
      }
    },
    onOptionMouseDown: function onOptionMouseDown(index) {
      this.focused = true;
      this.focusedOptionIndex = index;
    },
    onArrowDownKey: function onArrowDownKey(event) {
      var optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);
      this.changeFocusedOptionIndex(optionIndex);
      if (event.shiftKey) {
        this.onEnterKey(event);
      }
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      var optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);
      this.changeFocusedOptionIndex(optionIndex);
      if (event.shiftKey) {
        this.onEnterKey(event);
      }
      event.preventDefault();
    },
    onHomeKey: function onHomeKey(event) {
      if (event.ctrlKey && event.shiftKey) {
        var items = DomHandler.find(this.list, '[data-pc-section="item"]');
        var focusedItem = DomHandler.findSingle(this.list, '[data-pc-section="item"][id='.concat(this.focusedOptionIndex, "]"));
        var matchedOptionIndex = _toConsumableArray(items).findIndex(function(item2) {
          return item2 === focusedItem;
        });
        this.d_selection = _toConsumableArray(this.modelValue).slice(0, matchedOptionIndex + 1);
        this.$emit("update:selection", this.d_selection);
      } else {
        this.changeFocusedOptionIndex(0);
      }
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      if (event.ctrlKey && event.shiftKey) {
        var items = DomHandler.find(this.list, '[data-pc-section="item"]');
        var focusedItem = DomHandler.findSingle(this.list, '[data-pc-section="item"][id='.concat(this.focusedOptionIndex, "]"));
        var matchedOptionIndex = _toConsumableArray(items).findIndex(function(item2) {
          return item2 === focusedItem;
        });
        this.d_selection = _toConsumableArray(this.modelValue).slice(matchedOptionIndex, items.length);
        this.$emit("update:selection", this.d_selection);
      } else {
        this.changeFocusedOptionIndex(DomHandler.find(this.list, '[data-pc-section="item"]').length - 1);
      }
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      var items = DomHandler.find(this.list, '[data-pc-section="item"]');
      var focusedItem = DomHandler.findSingle(this.list, '[data-pc-section="item"][id='.concat(this.focusedOptionIndex, "]"));
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function(item2) {
        return item2 === focusedItem;
      });
      this.onItemClick(event, this.modelValue[matchedOptionIndex], matchedOptionIndex);
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event) {
      if (event.shiftKey) {
        var items = DomHandler.find(this.list, '[data-pc-section="item"]');
        var selectedItemIndex = ObjectUtils.findIndexInList(this.d_selection[0], _toConsumableArray(this.modelValue));
        var focusedItem = DomHandler.findSingle(this.list, '[data-pc-section="item"][id='.concat(this.focusedOptionIndex, "]"));
        var matchedOptionIndex = _toConsumableArray(items).findIndex(function(item2) {
          return item2 === focusedItem;
        });
        this.d_selection = _toConsumableArray(this.modelValue).slice(Math.min(selectedItemIndex, matchedOptionIndex), Math.max(selectedItemIndex, matchedOptionIndex) + 1);
        this.$emit("update:selection", this.d_selection);
      } else {
        this.onEnterKey(event);
      }
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var items = DomHandler.find(this.list, '[data-pc-section="item"]');
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function(link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var items = DomHandler.find(this.list, '[data-pc-section="item"]');
      var matchedOptionIndex = _toConsumableArray(items).findIndex(function(link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(index) {
      var items = DomHandler.find(this.list, '[data-pc-section="item"]');
      var order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;
      this.focusedOptionIndex = items[order] ? items[order].getAttribute("id") : -1;
      this.scrollInView(this.focusedOptionIndex);
    },
    scrollInView: function scrollInView(id) {
      var element = DomHandler.findSingle(this.list, '[data-pc-section="item"][id="'.concat(id, '"]'));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: "nearest",
          inline: "start"
        });
      }
    },
    moveUp: function moveUp(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = 0; i < this.d_selection.length; i++) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== 0) {
            var movedItem = value[selectedItemIndex];
            var temp = value[selectedItemIndex - 1];
            value[selectedItemIndex - 1] = movedItem;
            value[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        this.reorderDirection = "up";
        this.$emit("update:modelValue", value);
        this.$emit("reorder", {
          originalEvent: event,
          value,
          direction: this.reorderDirection
        });
      }
    },
    moveTop: function moveTop(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = 0; i < this.d_selection.length; i++) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== 0) {
            var movedItem = value.splice(selectedItemIndex, 1)[0];
            value.unshift(movedItem);
          } else {
            break;
          }
        }
        this.reorderDirection = "top";
        this.$emit("update:modelValue", value);
        this.$emit("reorder", {
          originalEvent: event,
          value,
          direction: this.reorderDirection
        });
      }
    },
    moveDown: function moveDown(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = this.d_selection.length - 1; i >= 0; i--) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== value.length - 1) {
            var movedItem = value[selectedItemIndex];
            var temp = value[selectedItemIndex + 1];
            value[selectedItemIndex + 1] = movedItem;
            value[selectedItemIndex] = temp;
          } else {
            break;
          }
        }
        this.reorderDirection = "down";
        this.$emit("update:modelValue", value);
        this.$emit("reorder", {
          originalEvent: event,
          value,
          direction: this.reorderDirection
        });
      }
    },
    moveBottom: function moveBottom(event) {
      if (this.d_selection) {
        var value = _toConsumableArray(this.modelValue);
        for (var i = this.d_selection.length - 1; i >= 0; i--) {
          var selectedItem = this.d_selection[i];
          var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value);
          if (selectedItemIndex !== value.length - 1) {
            var movedItem = value.splice(selectedItemIndex, 1)[0];
            value.push(movedItem);
          } else {
            break;
          }
        }
        this.reorderDirection = "bottom";
        this.$emit("update:modelValue", value);
        this.$emit("reorder", {
          originalEvent: event,
          value,
          direction: this.reorderDirection
        });
      }
    },
    onItemClick: function onItemClick(event, item2, index) {
      this.itemTouched = false;
      var selectedIndex = ObjectUtils.findIndexInList(item2, this.d_selection);
      var selected = selectedIndex != -1;
      var metaSelection = this.itemTouched ? false : this.metaKeySelection;
      var selectedId = DomHandler.find(this.list, '[data-pc-section="item"]')[index].getAttribute("id");
      this.focusedOptionIndex = selectedId;
      if (metaSelection) {
        var metaKey = event.metaKey || event.ctrlKey;
        if (selected && metaKey) {
          this.d_selection = this.d_selection.filter(function(val, index2) {
            return index2 !== selectedIndex;
          });
        } else {
          this.d_selection = metaKey ? this.d_selection ? _toConsumableArray(this.d_selection) : [] : [];
          ObjectUtils.insertIntoOrderedArray(item2, index, this.d_selection, this.modelValue);
        }
      } else {
        if (selected) {
          this.d_selection = this.d_selection.filter(function(val, index2) {
            return index2 !== selectedIndex;
          });
        } else {
          this.d_selection = this.d_selection ? _toConsumableArray(this.d_selection) : [];
          ObjectUtils.insertIntoOrderedArray(item2, index, this.d_selection, this.modelValue);
        }
      }
      this.$emit("update:selection", this.d_selection);
      this.$emit("selection-change", {
        originalEvent: event,
        value: this.d_selection
      });
    },
    onItemTouchEnd: function onItemTouchEnd() {
      this.itemTouched = true;
    },
    findNextItem: function findNextItem(item2) {
      var nextItem2 = item2.nextElementSibling;
      if (nextItem2)
        return !(DomHandler.getAttribute(nextItem2, "data-pc-section") === "item") ? this.findNextItem(nextItem2) : nextItem2;
      else
        return null;
    },
    findPrevItem: function findPrevItem(item2) {
      var prevItem = item2.previousElementSibling;
      if (prevItem)
        return !(DomHandler.getAttribute(nextItem, "data-pc-section") === "item") ? this.findPrevItem(prevItem) : prevItem;
      else
        return null;
    },
    updateListScroll: function updateListScroll() {
      var listItems = DomHandler.find(this.list, '[data-pc-section="item"][data-p-highlight="true"]');
      if (listItems && listItems.length) {
        switch (this.reorderDirection) {
          case "up":
            DomHandler.scrollInView(this.list, listItems[0]);
            break;
          case "top":
            this.list.scrollTop = 0;
            break;
          case "down":
            DomHandler.scrollInView(this.list, listItems[listItems.length - 1]);
            break;
          case "bottom":
            this.list.scrollTop = this.list.scrollHeight;
            break;
        }
      }
    },
    createStyle: function createStyle() {
      if (!this.styleElement && !this.isUnstyled) {
        this.$el.setAttribute(this.attributeSelector, "");
        this.styleElement = document.createElement("style");
        this.styleElement.type = "text/css";
        document.head.appendChild(this.styleElement);
        var innerHTML = "\n@media screen and (max-width: ".concat(this.breakpoint, ") {\n    .p-orderlist[").concat(this.attributeSelector, "] {\n        flex-direction: column;\n    }\n\n    .p-orderlist[").concat(this.attributeSelector, "] .p-orderlist-controls {\n        padding: var(--content-padding);\n        flex-direction: row;\n    }\n\n    .p-orderlist[").concat(this.attributeSelector, "] .p-orderlist-controls .p-button {\n        margin-right: var(--inline-spacing);\n        margin-bottom: 0;\n    }\n\n    .p-orderlist[").concat(this.attributeSelector, "] .p-orderlist-controls .p-button:last-child {\n        margin-right: 0;\n    }\n}\n");
        this.styleElement.innerHTML = innerHTML;
      }
    },
    destroyStyle: function destroyStyle() {
      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    },
    moveDisabled: function moveDisabled() {
      if (!this.d_selection || !this.d_selection.length) {
        return true;
      }
    },
    listRef: function listRef(el) {
      this.list = el ? el.$el : void 0;
    }
  },
  computed: {
    attributeSelector: function attributeSelector() {
      return UniqueComponentId();
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    },
    moveUpAriaLabel: function moveUpAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveUp : void 0;
    },
    moveTopAriaLabel: function moveTopAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveTop : void 0;
    },
    moveDownAriaLabel: function moveDownAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveDown : void 0;
    },
    moveBottomAriaLabel: function moveBottomAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.moveBottom : void 0;
    }
  },
  components: {
    OLButton: script2,
    AngleUpIcon: script4,
    AngleDownIcon: script3,
    AngleDoubleUpIcon: script6,
    AngleDoubleDownIcon: script5
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
var _hoisted_1 = ["id", "onClick", "aria-selected", "onMousedown", "data-p-highlight", "data-p-focused"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_AngleUpIcon = resolveComponent("AngleUpIcon");
  var _component_OLButton = resolveComponent("OLButton");
  var _component_AngleDoubleUpIcon = resolveComponent("AngleDoubleUpIcon");
  var _component_AngleDownIcon = resolveComponent("AngleDownIcon");
  var _component_AngleDoubleDownIcon = resolveComponent("AngleDoubleDownIcon");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root")), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("controls")
  }, _ctx.ptm("controls")), [renderSlot(_ctx.$slots, "controlsstart"), createVNode(_component_OLButton, mergeProps({
    type: "button",
    onClick: $options.moveUp,
    "aria-label": $options.moveUpAriaLabel,
    disabled: $options.moveDisabled(),
    pt: _ctx.ptm("moveUpButton")
  }, _ctx.moveUpButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function() {
      return [renderSlot(_ctx.$slots, "moveupicon", {}, function() {
        return [createVNode(_component_AngleUpIcon, normalizeProps(guardReactiveProps(_ctx.ptm("moveUpButton")["icon"])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_OLButton, mergeProps({
    type: "button",
    onClick: $options.moveTop,
    "aria-label": $options.moveTopAriaLabel,
    disabled: $options.moveDisabled(),
    pt: _ctx.ptm("moveTopButton")
  }, _ctx.ptm("moveTopButton"), {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function() {
      return [renderSlot(_ctx.$slots, "movetopicon", {}, function() {
        return [createVNode(_component_AngleDoubleUpIcon, normalizeProps(guardReactiveProps(_ctx.ptm("moveTopButton")["icon"])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_OLButton, mergeProps({
    type: "button",
    onClick: $options.moveDown,
    "aria-label": $options.moveDownAriaLabel,
    disabled: $options.moveDisabled(),
    pt: _ctx.ptm("moveDownButton")
  }, _ctx.moveDownButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function() {
      return [renderSlot(_ctx.$slots, "movedownicon", {}, function() {
        return [createVNode(_component_AngleDownIcon, normalizeProps(guardReactiveProps(_ctx.ptm("moveDownButton")["icon"])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), createVNode(_component_OLButton, mergeProps({
    type: "button",
    onClick: $options.moveBottom,
    "aria-label": $options.moveBottomAriaLabel,
    disabled: $options.moveDisabled(),
    pt: _ctx.ptm("moveBottomButton")
  }, _ctx.moveBottomButtonProps, {
    unstyled: _ctx.unstyled
  }), {
    icon: withCtx(function() {
      return [renderSlot(_ctx.$slots, "movebottomicon", {}, function() {
        return [createVNode(_component_AngleDoubleDownIcon, normalizeProps(guardReactiveProps(_ctx.ptm("moveBottomButton")["icon"])), null, 16)];
      })];
    }),
    _: 3
  }, 16, ["onClick", "aria-label", "disabled", "pt", "unstyled"]), renderSlot(_ctx.$slots, "controlsend")], 16), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("container")
  }, _ctx.ptm("container")), [_ctx.$slots.header ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx("header")
  }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header")], 16)) : createCommentVNode("", true), createVNode(TransitionGroup, mergeProps({
    ref: $options.listRef,
    id: $data.id + "_list",
    name: "p-orderlist-flip",
    tag: "ul",
    "class": _ctx.cx("list"),
    style: _ctx.listStyle,
    role: "listbox",
    "aria-multiselectable": "true",
    tabindex: _ctx.tabindex,
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    onFocus: $options.onListFocus,
    onBlur: $options.onListBlur,
    onKeydown: $options.onListKeyDown
  }, _objectSpread(_objectSpread({}, _ctx.listProps), _ctx.ptm("list"))), {
    "default": withCtx(function() {
      return [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelValue, function(item2, i) {
        return withDirectives((openBlock(), createElementBlock("li", mergeProps({
          key: $options.getItemKey(item2, i),
          id: $data.id + "_" + i,
          role: "option",
          "class": _ctx.cx("item", {
            item: item2,
            id: "".concat($data.id, "_").concat(i)
          }),
          onClick: function onClick($event) {
            return $options.onItemClick($event, item2, i);
          },
          onTouchend: _cache[0] || (_cache[0] = function() {
            return $options.onItemTouchEnd && $options.onItemTouchEnd.apply($options, arguments);
          }),
          "aria-selected": $options.isSelected(item2),
          onMousedown: function onMousedown($event) {
            return $options.onOptionMouseDown(i);
          }
        }, $options.getPTOptions(item2, "item", i), {
          "data-p-highlight": $options.isSelected(item2),
          "data-p-focused": "".concat($data.id, "_").concat(i) === $options.focusedOptionId
        }), [renderSlot(_ctx.$slots, "item", {
          item: item2,
          index: i
        })], 16, _hoisted_1)), [[_directive_ripple]]);
      }), 128))];
    }),
    _: 3
  }, 16, ["id", "class", "style", "tabindex", "aria-activedescendant", "aria-label", "aria-labelledby", "onFocus", "onBlur", "onKeydown"])], 16)], 16);
}
script7.render = render;
export {
  script7 as default
};
//# sourceMappingURL=primevue_orderlist.js.map
