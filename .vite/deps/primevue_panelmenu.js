import {
  script as script3
} from "./chunk-RUHBGLZP.js";
import {
  script as script2
} from "./chunk-HGYY2ILA.js";
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
  DomHandler,
  ObjectUtils,
  UniqueComponentId
} from "./chunk-BW6IAHPR.js";
import {
  Fragment,
  Transition,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
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
  vShow,
  withCtx,
  withDirectives
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/panelmenu/panelmenu.esm.js
var styles = "\n.p-panelmenu .p-panelmenu-header-action {\n    display: flex;\n    align-items: center;\n    user-select: none;\n    cursor: pointer;\n    position: relative;\n    text-decoration: none;\n}\n\n.p-panelmenu .p-panelmenu-header-action:focus {\n    z-index: 1;\n}\n\n.p-panelmenu .p-submenu-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.p-panelmenu .p-menuitem-link {\n    display: flex;\n    align-items: center;\n    user-select: none;\n    cursor: pointer;\n    text-decoration: none;\n    position: relative;\n    overflow: hidden;\n}\n\n.p-panelmenu .p-menuitem-text {\n    line-height: 1;\n}\n";
var classes = {
  root: "p-panelmenu p-component",
  panel: "p-panelmenu-panel",
  header: function header(_ref) {
    var instance = _ref.instance, item = _ref.item;
    return ["p-panelmenu-header", {
      "p-highlight": instance.isItemActive(item),
      "p-disabled": instance.isItemDisabled(item)
    }];
  },
  headerContent: "p-panelmenu-header-content",
  headerAction: function headerAction(_ref2) {
    var instance = _ref2.instance, isActive = _ref2.isActive, isExactActive = _ref2.isExactActive;
    return ["p-panelmenu-header-action", {
      "router-link-active": isActive,
      "router-link-active-exact": instance.exact && isExactActive
    }];
  },
  headerIcon: "p-menuitem-icon",
  headerLabel: "p-menuitem-text",
  toggleableContent: "p-toggleable-content",
  menuContent: "p-panelmenu-content",
  menu: "p-panelmenu-root-list",
  menuitem: function menuitem(_ref3) {
    var instance = _ref3.instance, processedItem = _ref3.processedItem;
    return ["p-menuitem", {
      "p-focus": instance.isItemFocused(processedItem),
      "p-disabled": instance.isItemDisabled(processedItem)
    }];
  },
  content: "p-menuitem-content",
  action: function action(_ref4) {
    var props = _ref4.props, isActive = _ref4.isActive, isExactActive = _ref4.isExactActive;
    return ["p-menuitem-link", {
      "router-link-active": isActive,
      "router-link-active-exact": props.exact && isExactActive
    }];
  },
  icon: "p-menuitem-icon",
  label: "p-menuitem-text",
  submenuIcon: "p-submenu-icon",
  submenu: "p-submenu-list",
  separator: "p-menuitem-separator"
};
var _useStyle = useStyle(styles, {
  name: "panelmenu",
  manual: true
});
var loadStyle = _useStyle.load;
var script$3 = {
  name: "BasePanelMenu",
  "extends": script,
  props: {
    model: {
      type: Array,
      "default": null
    },
    expandedKeys: {
      type: Object,
      "default": null
    },
    exact: {
      type: Boolean,
      "default": true
    },
    tabindex: {
      type: Number,
      "default": 0
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
var script$2 = {
  name: "PanelMenuSub",
  hostName: "PanelMenu",
  "extends": script,
  emits: ["item-toggle"],
  props: {
    panelId: {
      type: String,
      "default": null
    },
    focusedItemId: {
      type: String,
      "default": null
    },
    items: {
      type: Array,
      "default": null
    },
    level: {
      type: Number,
      "default": 0
    },
    templates: {
      type: Object,
      "default": null
    },
    activeItemPath: {
      type: Object,
      "default": null
    },
    exact: {
      type: Boolean,
      "default": true
    },
    tabindex: {
      type: Number,
      "default": -1
    }
  },
  methods: {
    getItemId: function getItemId(processedItem) {
      return "".concat(this.panelId, "_").concat(processedItem.key);
    },
    getItemKey: function getItemKey(processedItem) {
      return this.getItemId(processedItem);
    },
    getItemProp: function getItemProp(processedItem, name, params) {
      return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : void 0;
    },
    getItemLabel: function getItemLabel(processedItem) {
      return this.getItemProp(processedItem, "label");
    },
    getPTOptions: function getPTOptions(processedItem, key) {
      return this.ptm(key, {
        context: {
          active: this.isItemActive(processedItem),
          focused: this.isItemFocused(processedItem)
        }
      });
    },
    isItemActive: function isItemActive(processedItem) {
      return this.activeItemPath.some(function(path) {
        return path.key === processedItem.key;
      });
    },
    isItemVisible: function isItemVisible(processedItem) {
      return this.getItemProp(processedItem, "visible") !== false;
    },
    isItemDisabled: function isItemDisabled(processedItem) {
      return this.getItemProp(processedItem, "disabled");
    },
    isItemFocused: function isItemFocused(processedItem) {
      return this.focusedItemId === this.getItemId(processedItem);
    },
    isItemGroup: function isItemGroup(processedItem) {
      return ObjectUtils.isNotEmpty(processedItem.items);
    },
    onItemClick: function onItemClick(event, processedItem) {
      this.getItemProp(processedItem, "command", {
        originalEvent: event,
        item: processedItem.item
      });
      this.$emit("item-toggle", {
        processedItem,
        expanded: !this.isItemActive(processedItem)
      });
    },
    onItemToggle: function onItemToggle(event) {
      this.$emit("item-toggle", event);
    },
    onItemActionClick: function onItemActionClick(event, navigate) {
      navigate && navigate(event);
    },
    getAriaSetSize: function getAriaSetSize() {
      var _this = this;
      return this.items.filter(function(processedItem) {
        return _this.isItemVisible(processedItem) && !_this.getItemProp(processedItem, "separator");
      }).length;
    },
    getAriaPosInset: function getAriaPosInset(index) {
      var _this2 = this;
      return index - this.items.slice(0, index).filter(function(processedItem) {
        return _this2.isItemVisible(processedItem) && _this2.getItemProp(processedItem, "separator");
      }).length + 1;
    }
  },
  components: {
    ChevronRightIcon: script3,
    ChevronDownIcon: script2
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1$1 = ["tabindex"];
var _hoisted_2$1 = ["id", "aria-label", "aria-expanded", "aria-level", "aria-setsize", "aria-posinset", "data-p-focused", "data-p-disabled"];
var _hoisted_3$1 = ["onClick"];
var _hoisted_4$1 = ["href", "onClick"];
var _hoisted_5$1 = ["href", "target"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");
  var _component_PanelMenuSub = resolveComponent("PanelMenuSub", true);
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("ul", {
    "class": normalizeClass(_ctx.cx("submenu")),
    tabindex: $props.tabindex
  }, [(openBlock(true), createElementBlock(Fragment, null, renderList($props.items, function(processedItem, index) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.getItemKey(processedItem)
    }, [$options.isItemVisible(processedItem) && !$options.getItemProp(processedItem, "separator") ? (openBlock(), createElementBlock("li", mergeProps({
      key: 0,
      id: $options.getItemId(processedItem),
      "class": [_ctx.cx("menuitem", {
        processedItem
      }), $options.getItemProp(processedItem, "class")],
      style: $options.getItemProp(processedItem, "style"),
      role: "treeitem",
      "aria-label": $options.getItemLabel(processedItem),
      "aria-expanded": $options.isItemGroup(processedItem) ? $options.isItemActive(processedItem) : void 0,
      "aria-level": $props.level + 1,
      "aria-setsize": $options.getAriaSetSize(),
      "aria-posinset": $options.getAriaPosInset(index)
    }, $options.getPTOptions(processedItem, "menuitem"), {
      "data-p-focused": $options.isItemFocused(processedItem),
      "data-p-disabled": $options.isItemDisabled(processedItem)
    }), [createBaseVNode("div", mergeProps({
      "class": _ctx.cx("content"),
      onClick: function onClick($event) {
        return $options.onItemClick($event, processedItem);
      }
    }, $options.getPTOptions(processedItem, "content")), [!$props.templates.item ? (openBlock(), createElementBlock(Fragment, {
      key: 0
    }, [$options.getItemProp(processedItem, "to") && !$options.isItemDisabled(processedItem) ? (openBlock(), createBlock(_component_router_link, {
      key: 0,
      to: $options.getItemProp(processedItem, "to"),
      custom: ""
    }, {
      "default": withCtx(function(_ref) {
        var navigate = _ref.navigate, href = _ref.href, isActive = _ref.isActive, isExactActive = _ref.isExactActive;
        return [withDirectives((openBlock(), createElementBlock("a", mergeProps({
          href,
          "class": _ctx.cx("action", {
            isActive,
            isExactActive
          }),
          tabindex: "-1",
          "aria-hidden": "true",
          onClick: function onClick($event) {
            return $options.onItemActionClick($event, navigate);
          }
        }, $options.getPTOptions(processedItem, "action")), [$props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
          key: 0,
          item: processedItem.item,
          "class": normalizeClass([_ctx.cx("icon"), $options.getItemProp(processedItem, "icon")])
        }, null, 8, ["item", "class"])) : $options.getItemProp(processedItem, "icon") ? (openBlock(), createElementBlock("span", mergeProps({
          key: 1,
          "class": [_ctx.cx("icon"), $options.getItemProp(processedItem, "icon")]
        }, $options.getPTOptions(processedItem, "icon")), null, 16)) : createCommentVNode("", true), createBaseVNode("span", mergeProps({
          "class": _ctx.cx("label")
        }, $options.getPTOptions(processedItem, "label")), toDisplayString($options.getItemLabel(processedItem)), 17)], 16, _hoisted_4$1)), [[_directive_ripple]])];
      }),
      _: 2
    }, 1032, ["to"])) : withDirectives((openBlock(), createElementBlock("a", mergeProps({
      key: 1,
      href: $options.getItemProp(processedItem, "url"),
      "class": _ctx.cx("action"),
      target: $options.getItemProp(processedItem, "target"),
      tabindex: "-1",
      "aria-hidden": "true"
    }, $options.getPTOptions(processedItem, "action")), [$options.isItemGroup(processedItem) ? (openBlock(), createElementBlock(Fragment, {
      key: 0
    }, [$props.templates.submenuicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.submenuicon), mergeProps({
      key: 0,
      "class": _ctx.cx("submenuIcon"),
      active: $options.isItemActive(processedItem)
    }, $options.getPTOptions(processedItem, "submenuIcon")), null, 16, ["class", "active"])) : (openBlock(), createBlock(resolveDynamicComponent($options.isItemActive(processedItem) ? "ChevronDownIcon" : "ChevronRightIcon"), mergeProps({
      key: 1,
      "class": _ctx.cx("submenuIcon")
    }, $options.getPTOptions(processedItem, "submenuIcon")), null, 16, ["class"]))], 64)) : createCommentVNode("", true), $props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
      key: 1,
      item: processedItem.item,
      "class": normalizeClass([_ctx.cx("icon"), $options.getItemProp(processedItem, "icon")])
    }, null, 8, ["item", "class"])) : $options.getItemProp(processedItem, "icon") ? (openBlock(), createElementBlock("span", mergeProps({
      key: 2,
      "class": [_ctx.cx("icon"), $options.getItemProp(processedItem, "icon")]
    }, $options.getPTOptions(processedItem, "icon")), null, 16)) : createCommentVNode("", true), createBaseVNode("span", mergeProps({
      "class": _ctx.cx("label")
    }, $options.getPTOptions(processedItem, "label")), toDisplayString($options.getItemLabel(processedItem)), 17)], 16, _hoisted_5$1)), [[_directive_ripple]])], 64)) : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
      key: 1,
      item: processedItem.item
    }, null, 8, ["item"]))], 16, _hoisted_3$1), createVNode(Transition, {
      name: "p-toggleable-content"
    }, {
      "default": withCtx(function() {
        return [withDirectives(createBaseVNode("div", mergeProps({
          "class": _ctx.cx("toggleableContent")
        }, _ctx.ptm("toggleableContent")), [$options.isItemVisible(processedItem) && $options.isItemGroup(processedItem) ? (openBlock(), createBlock(_component_PanelMenuSub, mergeProps({
          key: 0,
          id: $options.getItemId(processedItem) + "_list",
          role: "group",
          panelId: $props.panelId,
          focusedItemId: $props.focusedItemId,
          items: processedItem.items,
          level: $props.level + 1,
          templates: $props.templates,
          activeItemPath: $props.activeItemPath,
          exact: $props.exact,
          onItemToggle: $options.onItemToggle,
          pt: _ctx.pt
        }, _ctx.ptm("submenu")), null, 16, ["id", "panelId", "focusedItemId", "items", "level", "templates", "activeItemPath", "exact", "onItemToggle", "pt"])) : createCommentVNode("", true)], 16), [[vShow, $options.isItemActive(processedItem)]])];
      }),
      _: 2
    }, 1024)], 16, _hoisted_2$1)) : createCommentVNode("", true), $options.isItemVisible(processedItem) && $options.getItemProp(processedItem, "separator") ? (openBlock(), createElementBlock("li", mergeProps({
      key: 1,
      style: $options.getItemProp(processedItem, "style"),
      "class": [_ctx.cx("separator"), $options.getItemProp(processedItem, "class")],
      role: "separator"
    }, _ctx.ptm("separator")), null, 16)) : createCommentVNode("", true)], 64);
  }), 128))], 10, _hoisted_1$1);
}
script$2.render = render$2;
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
var script$1 = {
  name: "PanelMenuList",
  hostName: "PanelMenu",
  "extends": script,
  emits: ["item-toggle", "header-focus"],
  props: {
    panelId: {
      type: String,
      "default": null
    },
    items: {
      type: Array,
      "default": null
    },
    templates: {
      type: Object,
      "default": null
    },
    expandedKeys: {
      type: Object,
      "default": null
    },
    exact: {
      type: Boolean,
      "default": true
    }
  },
  searchTimeout: null,
  searchValue: null,
  data: function data() {
    return {
      focused: false,
      focusedItem: null,
      activeItemPath: []
    };
  },
  watch: {
    expandedKeys: function expandedKeys(newValue) {
      this.autoUpdateActiveItemPath(newValue);
    }
  },
  mounted: function mounted() {
    this.autoUpdateActiveItemPath(this.expandedKeys);
  },
  methods: {
    getItemProp: function getItemProp2(processedItem, name) {
      return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : void 0;
    },
    getItemLabel: function getItemLabel2(processedItem) {
      return this.getItemProp(processedItem, "label");
    },
    isItemVisible: function isItemVisible2(processedItem) {
      return this.getItemProp(processedItem, "visible") !== false;
    },
    isItemDisabled: function isItemDisabled2(processedItem) {
      return this.getItemProp(processedItem, "disabled");
    },
    isItemActive: function isItemActive2(processedItem) {
      return this.activeItemPath.some(function(path) {
        return path.key === processedItem.parentKey;
      });
    },
    isItemGroup: function isItemGroup2(processedItem) {
      return ObjectUtils.isNotEmpty(processedItem.items);
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.focusedItem = this.focusedItem || (this.isElementInPanel(event, event.relatedTarget) ? this.findFirstItem() : this.findLastItem());
    },
    onBlur: function onBlur() {
      this.focused = false;
      this.focusedItem = null;
      this.searchValue = "";
    },
    onKeyDown: function onKeyDown(event) {
      var metaKey = event.metaKey || event.ctrlKey;
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
        case "Space":
          this.onSpaceKey(event);
          break;
        case "Enter":
          this.onEnterKey(event);
          break;
        case "Escape":
        case "Tab":
        case "PageDown":
        case "PageUp":
        case "Backspace":
        case "ShiftLeft":
        case "ShiftRight":
          break;
        default:
          if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
            this.searchItems(event, event.key);
          }
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      var processedItem = ObjectUtils.isNotEmpty(this.focusedItem) ? this.findNextItem(this.focusedItem) : this.findFirstItem();
      this.changeFocusedItem({
        originalEvent: event,
        processedItem,
        focusOnNext: true
      });
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      var processedItem = ObjectUtils.isNotEmpty(this.focusedItem) ? this.findPrevItem(this.focusedItem) : this.findLastItem();
      this.changeFocusedItem({
        originalEvent: event,
        processedItem,
        selfCheck: true
      });
      event.preventDefault();
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var _this = this;
      if (ObjectUtils.isNotEmpty(this.focusedItem)) {
        var matched = this.activeItemPath.some(function(p) {
          return p.key === _this.focusedItem.key;
        });
        if (matched) {
          this.activeItemPath = this.activeItemPath.filter(function(p) {
            return p.key !== _this.focusedItem.key;
          });
        } else {
          this.focusedItem = ObjectUtils.isNotEmpty(this.focusedItem.parent) ? this.focusedItem.parent : this.focusedItem;
        }
        event.preventDefault();
      }
    },
    onArrowRightKey: function onArrowRightKey(event) {
      var _this2 = this;
      if (ObjectUtils.isNotEmpty(this.focusedItem)) {
        var grouped = this.isItemGroup(this.focusedItem);
        if (grouped) {
          var matched = this.activeItemPath.some(function(p) {
            return p.key === _this2.focusedItem.key;
          });
          if (matched) {
            this.onArrowDownKey(event);
          } else {
            this.activeItemPath = this.activeItemPath.filter(function(p) {
              return p.parentKey !== _this2.focusedItem.parentKey;
            });
            this.activeItemPath.push(this.focusedItem);
          }
        }
        event.preventDefault();
      }
    },
    onHomeKey: function onHomeKey(event) {
      this.changeFocusedItem({
        originalEvent: event,
        processedItem: this.findFirstItem(),
        allowHeaderFocus: false
      });
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      this.changeFocusedItem({
        originalEvent: event,
        processedItem: this.findLastItem(),
        focusOnNext: true,
        allowHeaderFocus: false
      });
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      if (ObjectUtils.isNotEmpty(this.focusedItem)) {
        var element = DomHandler.findSingle(this.$el, 'li[id="'.concat("".concat(this.focusedItemId), '"]'));
        var anchorElement = element && (DomHandler.findSingle(element, '[data-pc-section="action"]') || DomHandler.findSingle(element, "a,button"));
        anchorElement ? anchorElement.click() : element && element.click();
      }
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event) {
      this.onEnterKey(event);
    },
    onItemToggle: function onItemToggle2(event) {
      var processedItem = event.processedItem, expanded = event.expanded;
      if (this.expandedKeys) {
        this.$emit("item-toggle", {
          item: processedItem.item,
          expanded
        });
      } else {
        this.activeItemPath = this.activeItemPath.filter(function(p) {
          return p.parentKey !== processedItem.parentKey;
        });
        expanded && this.activeItemPath.push(processedItem);
      }
      this.focusedItem = processedItem;
      DomHandler.focus(this.$el);
    },
    isElementInPanel: function isElementInPanel(event, element) {
      var panel = event.currentTarget.closest('[data-pc-section="panel"]');
      return panel && panel.contains(element);
    },
    isItemMatched: function isItemMatched(processedItem) {
      return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale));
    },
    isVisibleItem: function isVisibleItem(processedItem) {
      return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    },
    isValidItem: function isValidItem(processedItem) {
      return !!processedItem && !this.isItemDisabled(processedItem);
    },
    findFirstItem: function findFirstItem() {
      var _this3 = this;
      return this.visibleItems.find(function(processedItem) {
        return _this3.isValidItem(processedItem);
      });
    },
    findLastItem: function findLastItem() {
      var _this4 = this;
      return ObjectUtils.findLast(this.visibleItems, function(processedItem) {
        return _this4.isValidItem(processedItem);
      });
    },
    findNextItem: function findNextItem(processedItem) {
      var _this5 = this;
      var index = this.visibleItems.findIndex(function(item) {
        return item.key === processedItem.key;
      });
      var matchedItem = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).find(function(pItem) {
        return _this5.isValidItem(pItem);
      }) : void 0;
      return matchedItem || processedItem;
    },
    findPrevItem: function findPrevItem(processedItem) {
      var _this6 = this;
      var index = this.visibleItems.findIndex(function(item) {
        return item.key === processedItem.key;
      });
      var matchedItem = index > 0 ? ObjectUtils.findLast(this.visibleItems.slice(0, index), function(pItem) {
        return _this6.isValidItem(pItem);
      }) : void 0;
      return matchedItem || processedItem;
    },
    searchItems: function searchItems(event, _char) {
      var _this7 = this;
      this.searchValue = (this.searchValue || "") + _char;
      var matchedItem = null;
      var matched = false;
      if (ObjectUtils.isNotEmpty(this.focusedItem)) {
        var focusedItemIndex = this.visibleItems.findIndex(function(processedItem) {
          return processedItem.key === _this7.focusedItem.key;
        });
        matchedItem = this.visibleItems.slice(focusedItemIndex).find(function(processedItem) {
          return _this7.isItemMatched(processedItem);
        });
        matchedItem = ObjectUtils.isEmpty(matchedItem) ? this.visibleItems.slice(0, focusedItemIndex).find(function(processedItem) {
          return _this7.isItemMatched(processedItem);
        }) : matchedItem;
      } else {
        matchedItem = this.visibleItems.find(function(processedItem) {
          return _this7.isItemMatched(processedItem);
        });
      }
      if (ObjectUtils.isNotEmpty(matchedItem)) {
        matched = true;
      }
      if (ObjectUtils.isEmpty(matchedItem) && ObjectUtils.isEmpty(this.focusedItem)) {
        matchedItem = this.findFirstItem();
      }
      if (ObjectUtils.isNotEmpty(matchedItem)) {
        this.changeFocusedItem({
          originalEvent: event,
          processedItem: matchedItem,
          allowHeaderFocus: false
        });
      }
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(function() {
        _this7.searchValue = "";
        _this7.searchTimeout = null;
      }, 500);
      return matched;
    },
    changeFocusedItem: function changeFocusedItem(event) {
      var originalEvent = event.originalEvent, processedItem = event.processedItem, focusOnNext = event.focusOnNext, selfCheck = event.selfCheck, _event$allowHeaderFoc = event.allowHeaderFocus, allowHeaderFocus = _event$allowHeaderFoc === void 0 ? true : _event$allowHeaderFoc;
      if (ObjectUtils.isNotEmpty(this.focusedItem) && this.focusedItem.key !== processedItem.key) {
        this.focusedItem = processedItem;
        this.scrollInView();
      } else if (allowHeaderFocus) {
        this.$emit("header-focus", {
          originalEvent,
          focusOnNext,
          selfCheck
        });
      }
    },
    scrollInView: function scrollInView() {
      var element = DomHandler.findSingle(this.$el, 'li[id="'.concat("".concat(this.focusedItemId), '"]'));
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: "nearest",
          inline: "start"
        });
      }
    },
    autoUpdateActiveItemPath: function autoUpdateActiveItemPath(expandedKeys2) {
      var _this8 = this;
      this.activeItemPath = Object.entries(expandedKeys2 || {}).reduce(function(acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], val = _ref2[1];
        if (val) {
          var processedItem = _this8.findProcessedItemByItemKey(key);
          processedItem && acc.push(processedItem);
        }
        return acc;
      }, []);
    },
    findProcessedItemByItemKey: function findProcessedItemByItemKey(key, processedItems2) {
      var level = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      processedItems2 = processedItems2 || level === 0 && this.processedItems;
      if (!processedItems2)
        return null;
      for (var i = 0; i < processedItems2.length; i++) {
        var processedItem = processedItems2[i];
        if (this.getItemProp(processedItem, "key") === key)
          return processedItem;
        var matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);
        if (matchedItem)
          return matchedItem;
      }
    },
    createProcessedItems: function createProcessedItems(items) {
      var _this9 = this;
      var level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var parent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var parentKey = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
      var processedItems2 = [];
      items && items.forEach(function(item, index) {
        var key = (parentKey !== "" ? parentKey + "_" : "") + index;
        var newItem = {
          item,
          index,
          level,
          key,
          parent,
          parentKey
        };
        newItem["items"] = _this9.createProcessedItems(item.items, level + 1, newItem, key);
        processedItems2.push(newItem);
      });
      return processedItems2;
    },
    flatItems: function flatItems(processedItems2) {
      var _this10 = this;
      var processedFlattenItems = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      processedItems2 && processedItems2.forEach(function(processedItem) {
        if (_this10.isVisibleItem(processedItem)) {
          processedFlattenItems.push(processedItem);
          _this10.flatItems(processedItem.items, processedFlattenItems);
        }
      });
      return processedFlattenItems;
    }
  },
  computed: {
    processedItems: function processedItems() {
      return this.createProcessedItems(this.items || []);
    },
    visibleItems: function visibleItems() {
      return this.flatItems(this.processedItems);
    },
    focusedItemId: function focusedItemId() {
      return ObjectUtils.isNotEmpty(this.focusedItem) ? "".concat(this.panelId, "_").concat(this.focusedItem.key) : null;
    }
  },
  components: {
    PanelMenuSub: script$2
  }
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PanelMenuSub = resolveComponent("PanelMenuSub");
  return openBlock(), createBlock(_component_PanelMenuSub, mergeProps({
    id: $props.panelId + "_list",
    "class": _ctx.cx("menu"),
    role: "tree",
    tabindex: -1,
    "aria-activedescendant": $data.focused ? $options.focusedItemId : void 0,
    panelId: $props.panelId,
    focusedItemId: $data.focused ? $options.focusedItemId : void 0,
    items: $options.processedItems,
    templates: $props.templates,
    activeItemPath: $data.activeItemPath,
    exact: $props.exact,
    onFocus: $options.onFocus,
    onBlur: $options.onBlur,
    onKeydown: $options.onKeyDown,
    onItemToggle: $options.onItemToggle,
    pt: _ctx.pt
  }, _ctx.ptm("menu")), null, 16, ["id", "class", "aria-activedescendant", "panelId", "focusedItemId", "items", "templates", "activeItemPath", "exact", "onFocus", "onBlur", "onKeydown", "onItemToggle", "pt"]);
}
script$1.render = render$1;
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
var script4 = {
  name: "PanelMenu",
  "extends": script$3,
  emits: ["update:expandedKeys", "panel-open", "panel-close"],
  data: function data2() {
    return {
      id: this.$attrs.id,
      activeItem: null
    };
  },
  watch: {
    "$attrs.id": function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    }
  },
  mounted: function mounted2() {
    this.id = this.id || UniqueComponentId();
  },
  methods: {
    getItemProp: function getItemProp3(item, name) {
      return item ? ObjectUtils.getItemValue(item[name]) : void 0;
    },
    getItemLabel: function getItemLabel3(item) {
      return this.getItemProp(item, "label");
    },
    getPTOptions: function getPTOptions2(item, key) {
      return this.ptm(key, {
        options: {
          active: this.isItemActive(item),
          focused: this.isItemFocused(item)
        }
      });
    },
    isItemActive: function isItemActive3(item) {
      return this.expandedKeys ? this.expandedKeys[this.getItemProp(item, "key")] : ObjectUtils.equals(item, this.activeItem);
    },
    isItemVisible: function isItemVisible3(item) {
      return this.getItemProp(item, "visible") !== false;
    },
    isItemDisabled: function isItemDisabled3(item) {
      return this.getItemProp(item, "disabled");
    },
    isItemFocused: function isItemFocused2(item) {
      return ObjectUtils.equals(item, this.activeItem);
    },
    getPanelId: function getPanelId(index) {
      return "".concat(this.id, "_").concat(index);
    },
    getPanelKey: function getPanelKey(index) {
      return this.getPanelId(index);
    },
    getHeaderId: function getHeaderId(index) {
      return "".concat(this.getPanelId(index), "_header");
    },
    getContentId: function getContentId(index) {
      return "".concat(this.getPanelId(index), "_content");
    },
    onHeaderClick: function onHeaderClick(event, item) {
      if (this.isItemDisabled(item)) {
        event.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item
        });
      }
      this.changeActiveItem(event, item);
      DomHandler.focus(event.currentTarget);
    },
    onHeaderKeyDown: function onHeaderKeyDown(event, item) {
      switch (event.code) {
        case "ArrowDown":
          this.onHeaderArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onHeaderArrowUpKey(event);
          break;
        case "Home":
          this.onHeaderHomeKey(event);
          break;
        case "End":
          this.onHeaderEndKey(event);
          break;
        case "Enter":
        case "Space":
          this.onHeaderEnterKey(event, item);
          break;
      }
    },
    onHeaderArrowDownKey: function onHeaderArrowDownKey(event) {
      var rootList = DomHandler.getAttribute(event.currentTarget, "data-p-highlight") === true ? DomHandler.findSingle(event.currentTarget.nextElementSibling, '[data-pc-section="menu"]') : null;
      rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({
        originalEvent: event,
        focusOnNext: true
      });
      event.preventDefault();
    },
    onHeaderArrowUpKey: function onHeaderArrowUpKey(event) {
      var prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
      var rootList = DomHandler.getAttribute(prevHeader, "data-p-highlight") === true ? DomHandler.findSingle(prevHeader.nextElementSibling, '[data-pc-section="menu"]') : null;
      rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({
        originalEvent: event,
        focusOnNext: false
      });
      event.preventDefault();
    },
    onHeaderHomeKey: function onHeaderHomeKey(event) {
      this.changeFocusedHeader(event, this.findFirstHeader());
      event.preventDefault();
    },
    onHeaderEndKey: function onHeaderEndKey(event) {
      this.changeFocusedHeader(event, this.findLastHeader());
      event.preventDefault();
    },
    onHeaderEnterKey: function onHeaderEnterKey(event, item) {
      var headerAction2 = DomHandler.findSingle(event.currentTarget, '[data-pc-section="headeraction"]');
      headerAction2 ? headerAction2.click() : this.onHeaderClick(event, item);
      event.preventDefault();
    },
    onHeaderActionClick: function onHeaderActionClick(event, navigate) {
      navigate && navigate(event);
    },
    findNextHeader: function findNextHeader(panelElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
      var headerElement = DomHandler.findSingle(nextPanelElement, '[data-pc-section="header"]');
      return headerElement ? DomHandler.getAttribute(headerElement, "data-p-disabled") ? this.findNextHeader(headerElement.parentElement) : headerElement : null;
    },
    findPrevHeader: function findPrevHeader(panelElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
      var headerElement = DomHandler.findSingle(prevPanelElement, '[data-pc-section="header"]');
      return headerElement ? DomHandler.getAttribute(headerElement, "data-p-disabled") ? this.findPrevHeader(headerElement.parentElement) : headerElement : null;
    },
    findFirstHeader: function findFirstHeader() {
      return this.findNextHeader(this.$el.firstElementChild, true);
    },
    findLastHeader: function findLastHeader() {
      return this.findPrevHeader(this.$el.lastElementChild, true);
    },
    updateFocusedHeader: function updateFocusedHeader(event) {
      var originalEvent = event.originalEvent, focusOnNext = event.focusOnNext, selfCheck = event.selfCheck;
      var panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
      var header2 = selfCheck ? DomHandler.findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);
      header2 ? this.changeFocusedHeader(originalEvent, header2) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
    },
    changeActiveItem: function changeActiveItem(event, item) {
      var selfActive = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (!this.isItemDisabled(item)) {
        var active = this.isItemActive(item);
        var eventName = !active ? "panel-open" : "panel-close";
        this.activeItem = selfActive ? item : this.activeItem && ObjectUtils.equals(item, this.activeItem) ? null : item;
        this.changeExpandedKeys({
          item,
          expanded: !active
        });
        this.$emit(eventName, {
          originalEvent: event,
          item
        });
      }
    },
    changeExpandedKeys: function changeExpandedKeys(_ref) {
      var item = _ref.item, _ref$expanded = _ref.expanded, expanded = _ref$expanded === void 0 ? false : _ref$expanded;
      if (this.expandedKeys) {
        var _keys = _objectSpread({}, this.expandedKeys);
        if (expanded)
          _keys[item.key] = true;
        else
          delete _keys[item.key];
        this.$emit("update:expandedKeys", _keys);
      }
    },
    changeFocusedHeader: function changeFocusedHeader(event, element) {
      element && DomHandler.focus(element);
    }
  },
  components: {
    PanelMenuList: script$1,
    ChevronRightIcon: script3,
    ChevronDownIcon: script2
  }
};
var _hoisted_1 = ["id"];
var _hoisted_2 = ["id", "tabindex", "aria-label", "aria-expanded", "aria-controls", "aria-disabled", "onClick", "onKeydown", "data-p-highlight", "data-p-disabled"];
var _hoisted_3 = ["href", "onClick"];
var _hoisted_4 = ["href"];
var _hoisted_5 = ["id", "aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");
  var _component_PanelMenuList = resolveComponent("PanelMenuList");
  return openBlock(), createElementBlock("div", mergeProps({
    id: $data.id,
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "panelmenu"
  }), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, function(item, index) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.getPanelKey(index)
    }, [$options.isItemVisible(item) ? (openBlock(), createElementBlock("div", mergeProps({
      key: 0,
      style: $options.getItemProp(item, "style"),
      "class": [_ctx.cx("panel"), $options.getItemProp(item, "class")]
    }, _ctx.ptm("panel")), [createBaseVNode("div", mergeProps({
      id: $options.getHeaderId(index),
      "class": [_ctx.cx("header", {
        item
      }), $options.getItemProp(item, "headerClass")],
      tabindex: $options.isItemDisabled(item) ? -1 : _ctx.tabindex,
      role: "button",
      "aria-label": $options.getItemLabel(item),
      "aria-expanded": $options.isItemActive(item),
      "aria-controls": $options.getContentId(index),
      "aria-disabled": $options.isItemDisabled(item),
      onClick: function onClick($event) {
        return $options.onHeaderClick($event, item);
      },
      onKeydown: function onKeydown($event) {
        return $options.onHeaderKeyDown($event, item);
      }
    }, $options.getPTOptions(item, "header"), {
      "data-p-highlight": $options.isItemActive(item),
      "data-p-disabled": $options.isItemDisabled(item)
    }), [createBaseVNode("div", mergeProps({
      "class": _ctx.cx("headerContent")
    }, $options.getPTOptions(item, "headerContent")), [!_ctx.$slots.item ? (openBlock(), createElementBlock(Fragment, {
      key: 0
    }, [$options.getItemProp(item, "to") && !$options.isItemDisabled(item) ? (openBlock(), createBlock(_component_router_link, {
      key: 0,
      to: $options.getItemProp(item, "to"),
      custom: ""
    }, {
      "default": withCtx(function(_ref) {
        var navigate = _ref.navigate, href = _ref.href, isActive = _ref.isActive, isExactActive = _ref.isExactActive;
        return [createBaseVNode("a", mergeProps({
          href,
          "class": _ctx.cx("headerAction", {
            isActive,
            isExactActive
          }),
          tabindex: -1,
          onClick: function onClick($event) {
            return $options.onHeaderActionClick($event, navigate);
          }
        }, $options.getPTOptions(item, "headerAction")), [_ctx.$slots.headericon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.headericon), {
          key: 0,
          item,
          "class": normalizeClass([_ctx.cx("headerIcon"), $options.getItemProp(item, "icon")])
        }, null, 8, ["item", "class"])) : $options.getItemProp(item, "icon") ? (openBlock(), createElementBlock("span", mergeProps({
          key: 1,
          "class": [_ctx.cx("headerIcon"), $options.getItemProp(item, "icon")]
        }, $options.getPTOptions(item, "headerIcon")), null, 16)) : createCommentVNode("", true), createBaseVNode("span", mergeProps({
          "class": _ctx.cx("headerLabel")
        }, $options.getPTOptions(item, "headerLabel")), toDisplayString($options.getItemLabel(item)), 17)], 16, _hoisted_3)];
      }),
      _: 2
    }, 1032, ["to"])) : (openBlock(), createElementBlock("a", mergeProps({
      key: 1,
      href: $options.getItemProp(item, "url"),
      "class": _ctx.cx("headerAction"),
      tabindex: -1
    }, $options.getPTOptions(item, "headerAction")), [$options.getItemProp(item, "items") ? renderSlot(_ctx.$slots, "submenuicon", {
      key: 0,
      active: $options.isItemActive(item)
    }, function() {
      return [(openBlock(), createBlock(resolveDynamicComponent($options.isItemActive(item) ? "ChevronDownIcon" : "ChevronRightIcon"), mergeProps({
        "class": _ctx.cx("submenuIcon")
      }, $options.getPTOptions(item, "submenuIcon")), null, 16, ["class"]))];
    }) : createCommentVNode("", true), _ctx.$slots.headericon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.headericon), {
      key: 1,
      item,
      "class": normalizeClass([_ctx.cx("headerIcon"), $options.getItemProp(item, "icon")])
    }, null, 8, ["item", "class"])) : $options.getItemProp(item, "icon") ? (openBlock(), createElementBlock("span", mergeProps({
      key: 2,
      "class": [_ctx.cx("headerIcon"), $options.getItemProp(item, "icon")]
    }, $options.getPTOptions(item, "headerIcon")), null, 16)) : createCommentVNode("", true), createBaseVNode("span", mergeProps({
      "class": _ctx.cx("headerLabel")
    }, $options.getPTOptions(item, "headerLabel")), toDisplayString($options.getItemLabel(item)), 17)], 16, _hoisted_4))], 64)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
      key: 1,
      item
    }, null, 8, ["item"]))], 16)], 16, _hoisted_2), createVNode(Transition, {
      name: "p-toggleable-content"
    }, {
      "default": withCtx(function() {
        return [withDirectives(createBaseVNode("div", mergeProps({
          id: $options.getContentId(index),
          "class": _ctx.cx("toggleableContent"),
          role: "region",
          "aria-labelledby": $options.getHeaderId(index)
        }, _ctx.ptm("toggleableContent")), [$options.getItemProp(item, "items") ? (openBlock(), createElementBlock("div", mergeProps({
          key: 0,
          "class": _ctx.cx("menuContent")
        }, _ctx.ptm("menuContent")), [createVNode(_component_PanelMenuList, {
          panelId: $options.getPanelId(index),
          items: $options.getItemProp(item, "items"),
          templates: _ctx.$slots,
          expandedKeys: _ctx.expandedKeys,
          onItemToggle: $options.changeExpandedKeys,
          onHeaderFocus: $options.updateFocusedHeader,
          exact: _ctx.exact,
          pt: _ctx.pt
        }, null, 8, ["panelId", "items", "templates", "expandedKeys", "onItemToggle", "onHeaderFocus", "exact", "pt"])], 16)) : createCommentVNode("", true)], 16, _hoisted_5), [[vShow, $options.isItemActive(item)]])];
      }),
      _: 2
    }, 1024)], 16)) : createCommentVNode("", true)], 64);
  }), 128))], 16, _hoisted_1);
}
script4.render = render;
export {
  script4 as default
};
//# sourceMappingURL=primevue_panelmenu.js.map
