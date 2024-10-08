import {
  script
} from "./chunk-SGVQCNSW.js";
import {
  useStyle
} from "./chunk-EGWDZ2T5.js";
import "./chunk-BW6IAHPR.js";
import {
  createBaseVNode,
  createElementBlock,
  mergeProps,
  openBlock
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/chart/chart.esm.js
var styles = "\n.p-chart {\n    position: relative;\n}\n";
var classes = {
  root: "p-chart"
};
var _useStyle = useStyle(styles, {
  name: "chart",
  manual: true
});
var loadStyle = _useStyle.load;
var script$1 = {
  name: "BaseChart",
  "extends": script,
  props: {
    type: String,
    data: null,
    options: null,
    plugins: null,
    width: {
      type: Number,
      "default": 300
    },
    height: {
      type: Number,
      "default": 150
    },
    canvasProps: {
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
var script2 = {
  name: "Chart",
  "extends": script$1,
  emits: ["select", "loaded"],
  chart: null,
  watch: {
    /*
     * Use deep watch to enable triggering watch for changes within structure
     * otherwise the entire data object needs to be replaced to trigger watch
     */
    data: {
      handler: function handler() {
        this.reinit();
      },
      deep: true
    },
    type: function type() {
      this.reinit();
    },
    options: function options() {
      this.reinit();
    }
  },
  mounted: function mounted() {
    this.initChart();
  },
  beforeUnmount: function beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  },
  methods: {
    initChart: function initChart() {
      var _this = this;
      import("./auto.esm-G4NV36OF.js").then(function(module) {
        if (_this.chart) {
          _this.chart.destroy();
          _this.chart = null;
        }
        if (module && module["default"]) {
          _this.chart = new module["default"](_this.$refs.canvas, {
            type: _this.type,
            data: _this.data,
            options: _this.options,
            plugins: _this.plugins
          });
        }
        _this.$emit("loaded", _this.chart);
      });
    },
    getCanvas: function getCanvas() {
      return this.$canvas;
    },
    getChart: function getChart() {
      return this.chart;
    },
    getBase64Image: function getBase64Image() {
      return this.chart.toBase64Image();
    },
    refresh: function refresh() {
      if (this.chart) {
        this.chart.update();
      }
    },
    reinit: function reinit() {
      this.initChart();
    },
    onCanvasClick: function onCanvasClick(event) {
      if (this.chart) {
        var element = this.chart.getElementsAtEventForMode(event, "nearest", {
          intersect: true
        }, false);
        var dataset = this.chart.getElementsAtEventForMode(event, "dataset", {
          intersect: true
        }, false);
        if (element && element[0] && dataset) {
          this.$emit("select", {
            originalEvent: event,
            element: element[0],
            dataset
          });
        }
      }
    },
    generateLegend: function generateLegend() {
      if (this.chart) {
        return this.chart.generateLegend();
      }
    }
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
var _hoisted_1 = ["width", "height"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "chart"
  }), [createBaseVNode("canvas", mergeProps({
    ref: "canvas",
    width: _ctx.width,
    height: _ctx.height,
    onClick: _cache[0] || (_cache[0] = function($event) {
      return $options.onCanvasClick($event);
    })
  }, _objectSpread(_objectSpread({}, _ctx.canvasProps), _ctx.ptm("canvas"))), null, 16, _hoisted_1)], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_chart.js.map
