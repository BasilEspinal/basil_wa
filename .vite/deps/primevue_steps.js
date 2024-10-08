import {
  script
} from "./chunk-SGVQCNSW.js";
import {
  useStyle
} from "./chunk-EGWDZ2T5.js";
import {
  DomHandler
} from "./chunk-BW6IAHPR.js";
import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderList,
  resolveComponent,
  resolveDynamicComponent,
  toDisplayString,
  withCtx
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/steps/steps.esm.js
var styles = "\n.p-steps {\n    position: relative;\n}\n\n.p-steps .p-steps-list {\n    padding: 0;\n    margin: 0;\n    list-style-type: none;\n    display: flex;\n}\n\n.p-steps-item {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    flex: 1 1 auto;\n    overflow: hidden;\n}\n\n.p-steps-item .p-menuitem-link {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    overflow: hidden;\n    text-decoration: none;\n}\n\n.p-steps.p-steps-readonly .p-steps-item {\n    cursor: auto;\n}\n\n.p-steps-item.p-steps-current .p-menuitem-link {\n    cursor: default;\n}\n\n.p-steps-title {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-width: 100%;\n}\n\n.p-steps-number {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-steps-title {\n    display: block;\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ["p-steps p-component", {
      "p-readonly": instance.readonly
    }];
  },
  menu: "p-steps-list",
  menuitem: function menuitem(_ref2) {
    var instance = _ref2.instance, item = _ref2.item;
    return ["p-steps-item", {
      "p-highlight p-steps-current": instance.isActive(item),
      "p-disabled": instance.isItemDisabled(item)
    }];
  },
  action: function action(_ref3) {
    var props = _ref3.props, isActive2 = _ref3.isActive, isExactActive = _ref3.isExactActive;
    return ["p-menuitem-link", {
      "router-link-active": isActive2,
      "router-link-active-exact": props.exact && isExactActive
    }];
  },
  step: "p-steps-number",
  label: "p-steps-title"
};
var _useStyle = useStyle(styles, {
  name: "steps",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BaseSteps",
  "extends": script,
  props: {
    id: {
      type: String
    },
    model: {
      type: Array,
      "default": null
    },
    readonly: {
      type: Boolean,
      "default": true
    },
    exact: {
      type: Boolean,
      "default": true
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
  name: "Steps",
  "extends": script$1,
  mounted: function mounted() {
    var firstItem = this.findFirstItem();
    firstItem.tabIndex = "0";
  },
  methods: {
    onItemClick: function onItemClick(event, item, navigate) {
      if (this.disabled(item) || this.readonly) {
        event.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item
        });
      }
      if (item.to && navigate) {
        navigate(event);
      }
    },
    onItemKeydown: function onItemKeydown(event, item, navigate) {
      switch (event.code) {
        case "ArrowRight": {
          this.navigateToNextItem(event.target);
          event.preventDefault();
          break;
        }
        case "ArrowLeft": {
          this.navigateToPrevItem(event.target);
          event.preventDefault();
          break;
        }
        case "Home": {
          this.navigateToFirstItem(event.target);
          event.preventDefault();
          break;
        }
        case "End": {
          this.navigateToLastItem(event.target);
          event.preventDefault();
          break;
        }
        case "Tab":
          break;
        case "Enter":
        case "Space": {
          this.onItemClick(event, item, navigate);
          event.preventDefault();
          break;
        }
      }
    },
    navigateToNextItem: function navigateToNextItem(target) {
      var nextItem = this.findNextItem(target);
      nextItem && this.setFocusToMenuitem(target, nextItem);
    },
    navigateToPrevItem: function navigateToPrevItem(target) {
      var prevItem = this.findPrevItem(target);
      prevItem && this.setFocusToMenuitem(target, prevItem);
    },
    navigateToFirstItem: function navigateToFirstItem(target) {
      var firstItem = this.findFirstItem(target);
      firstItem && this.setFocusToMenuitem(target, firstItem);
    },
    navigateToLastItem: function navigateToLastItem(target) {
      var lastItem = this.findLastItem(target);
      lastItem && this.setFocusToMenuitem(target, lastItem);
    },
    findNextItem: function findNextItem(item) {
      var nextItem = item.parentElement.nextElementSibling;
      return nextItem ? nextItem.children[0] : null;
    },
    findPrevItem: function findPrevItem(item) {
      var prevItem = item.parentElement.previousElementSibling;
      return prevItem ? prevItem.children[0] : null;
    },
    findFirstItem: function findFirstItem() {
      var firstSibling = DomHandler.findSingle(this.$refs.list, '[data-pc-section="menuitem"]');
      return firstSibling ? firstSibling.children[0] : null;
    },
    findLastItem: function findLastItem() {
      var siblings = DomHandler.find(this.$refs.list, '[data-pc-section="menuitem"]');
      return siblings ? siblings[siblings.length - 1].children[0] : null;
    },
    setFocusToMenuitem: function setFocusToMenuitem(target, focusableItem) {
      target.tabIndex = "-1";
      focusableItem.tabIndex = "0";
      focusableItem.focus();
    },
    isActive: function isActive(item) {
      return item.to ? this.$router.resolve(item.to).path === this.$route.path : false;
    },
    isItemDisabled: function isItemDisabled(item) {
      return this.disabled(item) || this.readonly && !this.isActive(item);
    },
    visible: function visible(item) {
      return typeof item.visible === "function" ? item.visible() : item.visible !== false;
    },
    disabled: function disabled(item) {
      return typeof item.disabled === "function" ? item.disabled() : item.disabled;
    },
    label: function label(item) {
      return typeof item.label === "function" ? item.label() : item.label;
    }
  }
};
var _hoisted_1 = ["id"];
var _hoisted_2 = ["data-p-highlight", "data-p-disabled"];
var _hoisted_3 = ["href", "aria-current", "onClick", "onKeydown"];
var _hoisted_4 = ["onKeydown"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("nav", mergeProps({
    id: _ctx.id,
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "steps"
  }), [createBaseVNode("ol", mergeProps({
    ref: "list",
    "class": _ctx.cx("menu")
  }, _ctx.ptm("menu")), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, function(item, index) {
    return openBlock(), createElementBlock(Fragment, {
      key: item.to
    }, [$options.visible(item) ? (openBlock(), createElementBlock("li", mergeProps({
      key: 0,
      "class": [_ctx.cx("menuitem", {
        item
      }), item["class"]],
      style: item.style
    }, _ctx.ptm("menuitem"), {
      "data-p-highlight": $options.isActive(item),
      "data-p-disabled": $options.isItemDisabled(item)
    }), [!_ctx.$slots.item ? (openBlock(), createElementBlock(Fragment, {
      key: 0
    }, [!$options.isItemDisabled(item) ? (openBlock(), createBlock(_component_router_link, {
      key: 0,
      to: item.to,
      custom: ""
    }, {
      "default": withCtx(function(_ref) {
        var navigate = _ref.navigate, href = _ref.href, isActive2 = _ref.isActive, isExactActive = _ref.isExactActive;
        return [createBaseVNode("a", mergeProps({
          href,
          "class": _ctx.cx("action", {
            isActive: isActive2,
            isExactActive
          }),
          tabindex: -1,
          "aria-current": isExactActive ? "step" : void 0,
          onClick: function onClick($event) {
            return $options.onItemClick($event, item, navigate);
          },
          onKeydown: function onKeydown($event) {
            return $options.onItemKeydown($event, item, navigate);
          }
        }, _ctx.ptm("action")), [createBaseVNode("span", mergeProps({
          "class": _ctx.cx("step")
        }, _ctx.ptm("step")), toDisplayString(index + 1), 17), createBaseVNode("span", mergeProps({
          "class": _ctx.cx("label")
        }, _ctx.ptm("label")), toDisplayString($options.label(item)), 17)], 16, _hoisted_3)];
      }),
      _: 2
    }, 1032, ["to"])) : (openBlock(), createElementBlock("span", mergeProps({
      key: 1,
      "class": _ctx.cx("action"),
      onKeydown: function onKeydown($event) {
        return $options.onItemKeydown($event, item);
      }
    }, _ctx.ptm("action")), [createBaseVNode("span", mergeProps({
      "class": _ctx.cx("step")
    }, _ctx.ptm("step")), toDisplayString(index + 1), 17), createBaseVNode("span", mergeProps({
      "class": _ctx.cx("label")
    }, _ctx.ptm("label")), toDisplayString($options.label(item)), 17)], 16, _hoisted_4))], 64)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
      key: 1,
      item
    }, null, 8, ["item"]))], 16, _hoisted_2)) : createCommentVNode("", true)], 64);
  }), 128))], 16)], 16, _hoisted_1);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_steps.js.map
