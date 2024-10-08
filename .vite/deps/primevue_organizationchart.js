import {
  script as script3
} from "./chunk-4G24WGGK.js";
import {
  script as script2
} from "./chunk-HGYY2ILA.js";
import "./chunk-OJR2HVJ6.js";
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
  createVNode,
  guardReactiveProps,
  mergeProps,
  normalizeProps,
  openBlock,
  renderList,
  resolveComponent,
  resolveDynamicComponent
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/organizationchart/organizationchart.esm.js
var _classes;
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(arg) {
  var key = _toPrimitive$1(arg, "string");
  return _typeof$1(key) === "symbol" ? key : String(key);
}
function _toPrimitive$1(input, hint) {
  if (_typeof$1(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof$1(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var styles = "\n.p-organizationchart-table {\n    border-spacing: 0;\n    border-collapse: separate;\n    margin: 0 auto;\n}\n\n.p-organizationchart-table > tbody > tr > td {\n    text-align: center;\n    vertical-align: top;\n    padding: 0 0.75rem;\n}\n\n.p-organizationchart-node-content {\n    display: inline-block;\n    position: relative;\n}\n\n.p-organizationchart-node-content .p-node-toggler {\n    position: absolute;\n    bottom: -0.75rem;\n    margin-left: -0.75rem;\n    z-index: 2;\n    left: 50%;\n    user-select: none;\n    cursor: pointer;\n    width: 1.5rem;\n    height: 1.5rem;\n    text-decoration: none;\n}\n\n.p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon {\n    position: relative;\n    top: 0.25rem;\n}\n\n.p-organizationchart-line-down {\n    margin: 0 auto;\n    height: 20px;\n    width: 1px;\n}\n\n.p-organizationchart-line-right {\n    border-radius: 0px;\n}\n\n.p-organizationchart-line-left {\n    border-radius: 0;\n}\n\n.p-organizationchart-selectable-node {\n    cursor: pointer;\n}\n";
var classes = (_classes = {
  root: "p-organizationchart p-component",
  table: "p-organizationchart-table",
  node: function node(_ref) {
    var instance = _ref.instance;
    return ["p-organizationchart-node-content", {
      "p-organizationchart-selectable-node": instance.selectable,
      "p-highlight": instance.selected
    }];
  },
  nodeToggler: "p-node-toggler",
  nodeTogglerIcon: "p-node-toggler-icon",
  lines: "p-organizationchart-lines",
  lineDown: "p-organizationchart-line-down"
}, _defineProperty$1(_classes, "lines", "p-organizationchart-lines"), _defineProperty$1(_classes, "lineLeft", function lineLeft(_ref2) {
  var index = _ref2.index;
  return ["p-organizationchart-line-left", {
    "p-organizationchart-line-top": !(index === 0)
  }];
}), _defineProperty$1(_classes, "lineRight", function lineRight(_ref3) {
  var props = _ref3.props, index = _ref3.index;
  return ["p-organizationchart-line-right", {
    "p-organizationchart-line-top": !(index === props.node.children.length - 1)
  }];
}), _defineProperty$1(_classes, "nodes", "p-organizationchart-nodes"), _classes);
var _useStyle = useStyle(styles, {
  name: "organizationchart",
  manual: true
});
var loadStyle = _useStyle.load;
var script$2 = {
  name: "BaseOrganizationChart",
  "extends": script,
  props: {
    value: {
      type: null,
      "default": null
    },
    selectionKeys: {
      type: null,
      "default": null
    },
    selectionMode: {
      type: String,
      "default": null
    },
    collapsible: {
      type: Boolean,
      "default": false
    },
    collapsedKeys: {
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
var script$1 = {
  name: "OrganizationChartNode",
  hostName: "OrganizationChart",
  "extends": script,
  emits: ["node-click", "node-toggle"],
  props: {
    node: {
      type: null,
      "default": null
    },
    templates: {
      type: null,
      "default": null
    },
    collapsible: {
      type: Boolean,
      "default": false
    },
    collapsedKeys: {
      type: null,
      "default": null
    },
    selectionKeys: {
      type: null,
      "default": null
    },
    selectionMode: {
      type: String,
      "default": null
    }
  },
  methods: {
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        context: {
          expanded: this.expanded,
          selectable: this.selectable,
          selected: this.selected,
          toggleable: this.toggleable,
          active: this.selected
        }
      });
    },
    getNodeOptions: function getNodeOptions(lineTop, key) {
      return this.ptm(key, {
        context: {
          lineTop
        }
      });
    },
    onNodeClick: function onNodeClick(event) {
      if (DomHandler.getAttribute(event.target, "nodeToggler") || DomHandler.getAttribute(event.target, "nodeTogglerIcon")) {
        return;
      }
      if (this.selectionMode) {
        this.$emit("node-click", this.node);
      }
    },
    onChildNodeClick: function onChildNodeClick(node2) {
      this.$emit("node-click", node2);
    },
    toggleNode: function toggleNode() {
      this.$emit("node-toggle", this.node);
    },
    onChildNodeToggle: function onChildNodeToggle(node2) {
      this.$emit("node-toggle", node2);
    },
    onKeydown: function onKeydown(event) {
      if (event.code === "Enter" || event.code === "Space") {
        this.toggleNode();
        event.preventDefault();
      }
    }
  },
  computed: {
    leaf: function leaf() {
      return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
    },
    colspan: function colspan() {
      return this.node.children && this.node.children.length ? this.node.children.length * 2 : null;
    },
    childStyle: function childStyle() {
      return {
        visibility: !this.leaf && this.expanded ? "inherit" : "hidden"
      };
    },
    expanded: function expanded() {
      return this.collapsedKeys[this.node.key] === void 0;
    },
    selectable: function selectable() {
      return this.selectionMode && this.node.selectable !== false;
    },
    selected: function selected() {
      return this.selectable && this.selectionKeys && this.selectionKeys[this.node.key] === true;
    },
    toggleable: function toggleable() {
      return this.collapsible && this.node.collapsible !== false && !this.leaf;
    }
  },
  components: {
    ChevronDownIcon: script2,
    ChevronUpIcon: script3
  }
};
var _hoisted_1 = ["colspan"];
var _hoisted_2 = ["colspan"];
var _hoisted_3 = ["colspan"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_OrganizationChartNode = resolveComponent("OrganizationChartNode", true);
  return openBlock(), createElementBlock("table", mergeProps({
    "class": _ctx.cx("table")
  }, _ctx.ptm("table")), [createBaseVNode("tbody", normalizeProps(guardReactiveProps(_ctx.ptm("body"))), [$props.node ? (openBlock(), createElementBlock("tr", normalizeProps(mergeProps({
    key: 0
  }, _ctx.ptm("row"))), [createBaseVNode("td", mergeProps({
    colspan: $options.colspan
  }, _ctx.ptm("cell")), [createBaseVNode("div", mergeProps({
    "class": [_ctx.cx("node"), $props.node.styleClass],
    onClick: _cache[2] || (_cache[2] = function() {
      return $options.onNodeClick && $options.onNodeClick.apply($options, arguments);
    })
  }, $options.getPTOptions("node")), [(openBlock(), createBlock(resolveDynamicComponent($props.templates[$props.node.type] || $props.templates["default"]), {
    node: $props.node
  }, null, 8, ["node"])), $options.toggleable ? (openBlock(), createElementBlock("a", mergeProps({
    key: 0,
    tabindex: "0",
    "class": _ctx.cx("nodeToggler"),
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.toggleNode && $options.toggleNode.apply($options, arguments);
    }),
    onKeydown: _cache[1] || (_cache[1] = function() {
      return $options.onKeydown && $options.onKeydown.apply($options, arguments);
    })
  }, $options.getPTOptions("nodeToggler")), [$props.templates.togglericon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.togglericon), {
    key: 0,
    expanded: $options.expanded,
    "class": "p-node-toggler-icon"
  }, null, 8, ["expanded"])) : (openBlock(), createBlock(resolveDynamicComponent($options.expanded ? "ChevronDownIcon" : "ChevronUpIcon"), mergeProps({
    key: 1,
    "class": _ctx.cx("nodeTogglerIcon")
  }, $options.getPTOptions("nodeTogglerIcon")), null, 16, ["class"]))], 16)) : createCommentVNode("", true)], 16)], 16, _hoisted_1)], 16)) : createCommentVNode("", true), createBaseVNode("tr", mergeProps({
    style: $options.childStyle,
    "class": _ctx.cx("lines")
  }, _ctx.ptm("lines")), [createBaseVNode("td", mergeProps({
    colspan: $options.colspan
  }, _ctx.ptm("lineCell")), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("lineDown")
  }, _ctx.ptm("lineDown")), null, 16)], 16, _hoisted_2)], 16), createBaseVNode("tr", mergeProps({
    style: $options.childStyle,
    "class": _ctx.cx("lines")
  }, _ctx.ptm("lines")), [$props.node.children && $props.node.children.length === 1 ? (openBlock(), createElementBlock("td", mergeProps({
    key: 0,
    colspan: $options.colspan
  }, _ctx.ptm("lineCell")), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("lineDown")
  }, _ctx.ptm("lineDown")), null, 16)], 16, _hoisted_3)) : createCommentVNode("", true), $props.node.children && $props.node.children.length > 1 ? (openBlock(true), createElementBlock(Fragment, {
    key: 1
  }, renderList($props.node.children, function(child, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: child.key
    }, [createBaseVNode("td", mergeProps({
      "class": _ctx.cx("lineLeft", {
        index: i
      })
    }, $options.getNodeOptions(!(i === 0), "lineLeft")), " ", 16), createBaseVNode("td", mergeProps({
      "class": _ctx.cx("lineRight", {
        index: i
      })
    }, $options.getNodeOptions(!(i === $props.node.children.length - 1), "lineRight")), " ", 16)], 64);
  }), 128)) : createCommentVNode("", true)], 16), createBaseVNode("tr", mergeProps({
    style: $options.childStyle,
    "class": _ctx.cx("nodes")
  }, _ctx.ptm("nodes")), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.node.children, function(child) {
    return openBlock(), createElementBlock("td", mergeProps({
      key: child.key,
      colspan: "2"
    }, _ctx.ptm("nodeCell")), [createVNode(_component_OrganizationChartNode, {
      node: child,
      templates: $props.templates,
      collapsedKeys: $props.collapsedKeys,
      onNodeToggle: $options.onChildNodeToggle,
      collapsible: $props.collapsible,
      selectionMode: $props.selectionMode,
      selectionKeys: $props.selectionKeys,
      onNodeClick: $options.onChildNodeClick,
      pt: _ctx.pt,
      unstyled: _ctx.unstyled
    }, null, 8, ["node", "templates", "collapsedKeys", "onNodeToggle", "collapsible", "selectionMode", "selectionKeys", "onNodeClick", "pt", "unstyled"])], 16);
  }), 128))], 16)], 16)], 16);
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
  name: "OrganizationChart",
  "extends": script$2,
  emits: ["node-unselect", "node-select", "update:selectionKeys", "node-expand", "node-collapse", "update:collapsedKeys"],
  data: function data() {
    return {
      d_collapsedKeys: this.collapsedKeys || {}
    };
  },
  watch: {
    collapsedKeys: function collapsedKeys(newValue) {
      this.d_collapsedKeys = newValue;
    }
  },
  methods: {
    onNodeClick: function onNodeClick2(node2) {
      var key = node2.key;
      if (this.selectionMode) {
        var _selectionKeys = this.selectionKeys ? _objectSpread({}, this.selectionKeys) : {};
        if (_selectionKeys[key]) {
          delete _selectionKeys[key];
          this.$emit("node-unselect", node2);
        } else {
          if (this.selectionMode === "single") {
            _selectionKeys = {};
          }
          _selectionKeys[key] = true;
          this.$emit("node-select", node2);
        }
        this.$emit("update:selectionKeys", _selectionKeys);
      }
    },
    onNodeToggle: function onNodeToggle(node2) {
      var key = node2.key;
      if (this.d_collapsedKeys[key]) {
        delete this.d_collapsedKeys[key];
        this.$emit("node-expand", node2);
      } else {
        this.d_collapsedKeys[key] = true;
        this.$emit("node-collapse", node2);
      }
      this.d_collapsedKeys = _objectSpread({}, this.d_collapsedKeys);
      this.$emit("update:collapsedKeys", this.d_collapsedKeys);
    }
  },
  components: {
    OrganizationChartNode: script$1
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_OrganizationChartNode = resolveComponent("OrganizationChartNode");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root")), [createVNode(_component_OrganizationChartNode, {
    node: _ctx.value,
    templates: _ctx.$slots,
    onNodeToggle: $options.onNodeToggle,
    collapsedKeys: $data.d_collapsedKeys,
    collapsible: _ctx.collapsible,
    onNodeClick: $options.onNodeClick,
    selectionMode: _ctx.selectionMode,
    selectionKeys: _ctx.selectionKeys,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, null, 8, ["node", "templates", "onNodeToggle", "collapsedKeys", "collapsible", "onNodeClick", "selectionMode", "selectionKeys", "pt", "unstyled"])], 16);
}
script4.render = render;
export {
  script4 as default
};
//# sourceMappingURL=primevue_organizationchart.js.map
