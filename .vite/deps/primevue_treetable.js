import {
  script as script10
} from "./chunk-B4XON7HG.js";
import {
  script as script7,
  script2 as script8,
  script3 as script9
} from "./chunk-FARMCVHH.js";
import {
  script as script6
} from "./chunk-526FI73T.js";
import "./chunk-7GKR6WS6.js";
import "./chunk-J7V22D7R.js";
import "./chunk-KZCCVRBO.js";
import "./chunk-XYV5CWUE.js";
import "./chunk-XVNXA24R.js";
import "./chunk-BYF5P2EV.js";
import {
  script as script5
} from "./chunk-TMZXCM4M.js";
import "./chunk-UZ2LBG6P.js";
import "./chunk-RX6FLNRT.js";
import {
  FilterService
} from "./chunk-KBUEQ7WV.js";
import "./chunk-WN6DXYPO.js";
import "./chunk-ABUQWYRJ.js";
import "./chunk-M46M666T.js";
import "./chunk-LMPXBVVT.js";
import {
  script as script2
} from "./chunk-VIXWB2UQ.js";
import {
  script as script4
} from "./chunk-RUHBGLZP.js";
import {
  script as script3
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
  DomHandler,
  ObjectUtils
} from "./chunk-BW6IAHPR.js";
import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  mergeProps,
  normalizeClass,
  normalizeProps,
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

// node_modules/primevue/treetable/treetable.esm.js
var styles = "\n.p-treetable {\n    position: relative;\n}\n\n.p-treetable table {\n    border-collapse: collapse;\n    width: 100%;\n    table-layout: fixed;\n}\n\n.p-treetable .p-sortable-column {\n    cursor: pointer;\n    user-select: none;\n}\n\n.p-treetable-responsive-scroll > .p-treetable-wrapper {\n    overflow-x: auto;\n}\n\n.p-treetable-responsive-scroll > .p-treetable-wrapper > table,\n.p-treetable-auto-layout > .p-treetable-wrapper > table {\n    table-layout: auto;\n}\n\n.p-treetable-hoverable-rows .p-treetable-tbody > tr {\n    cursor: pointer;\n}\n\n.p-treetable-toggler {\n    cursor: pointer;\n    user-select: none;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    vertical-align: middle;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-treetable-toggler + .p-checkbox {\n    vertical-align: middle;\n}\n\n.p-treetable-toggler + .p-checkbox + span {\n    vertical-align: middle;\n}\n\n/* Resizable */\n.p-treetable-resizable > .p-treetable-wrapper {\n    overflow-x: auto;\n}\n\n.p-treetable-resizable .p-treetable-thead > tr > th,\n.p-treetable-resizable .p-treetable-tfoot > tr > td,\n.p-treetable-resizable .p-treetable-tbody > tr > td {\n    overflow: hidden;\n}\n\n.p-treetable-resizable .p-resizable-column:not(.p-frozen-column) {\n    background-clip: padding-box;\n    position: relative;\n}\n\n.p-treetable-resizable-fit .p-resizable-column:last-child .p-column-resizer {\n    display: none;\n}\n\n.p-treetable .p-column-resizer {\n    display: block;\n    position: absolute !important;\n    top: 0;\n    right: 0;\n    margin: 0;\n    width: 0.5rem;\n    height: 100%;\n    padding: 0px;\n    cursor: col-resize;\n    border: 1px solid transparent;\n}\n\n.p-treetable .p-column-resizer-helper {\n    width: 1px;\n    position: absolute;\n    z-index: 10;\n    display: none;\n}\n\n.p-treetable .p-treetable-loading-overlay {\n    position: absolute;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 2;\n}\n\n/* Scrollable */\n.p-treetable-scrollable .p-treetable-wrapper {\n    position: relative;\n    overflow: auto;\n}\n\n.p-treetable-scrollable .p-treetable-table {\n    display: block;\n}\n\n.p-treetable-scrollable .p-treetable-thead,\n.p-treetable-scrollable .p-treetable-tbody,\n.p-treetable-scrollable .p-treetable-tfoot {\n    display: block;\n}\n\n.p-treetable-scrollable .p-treetable-thead > tr,\n.p-treetable-scrollable .p-treetable-tbody > tr,\n.p-treetable-scrollable .p-treetable-tfoot > tr {\n    display: flex;\n    flex-wrap: nowrap;\n    width: 100%;\n}\n\n.p-treetable-scrollable .p-treetable-thead > tr > th,\n.p-treetable-scrollable .p-treetable-tbody > tr > td,\n.p-treetable-scrollable .p-treetable-tfoot > tr > td {\n    display: flex;\n    flex: 1 1 0;\n    align-items: center;\n}\n\n.p-treetable-scrollable .p-treetable-thead {\n    position: sticky;\n    top: 0;\n    z-index: 1;\n}\n\n.p-treetable-scrollable .p-treetable-tfoot {\n    position: sticky;\n    bottom: 0;\n    z-index: 1;\n}\n\n.p-treetable-scrollable .p-frozen-column {\n    position: sticky;\n    background: inherit;\n}\n\n.p-treetable-scrollable th.p-frozen-column {\n    z-index: 1;\n}\n\n.p-treetable-scrollable-both .p-treetable-thead > tr > th,\n.p-treetable-scrollable-both .p-treetable-tbody > tr > td,\n.p-treetable-scrollable-both .p-treetable-tfoot > tr > td,\n.p-treetable-scrollable-horizontal .p-treetable-thead > tr > th .p-treetable-scrollable-horizontal .p-treetable-tbody > tr > td,\n.p-treetable-scrollable-horizontal .p-treetable-tfoot > tr > td {\n    flex: 0 0 auto;\n}\n\n.p-treetable-flex-scrollable {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n}\n\n.p-treetable-flex-scrollable .p-treetable-wrapper {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    height: 100%;\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-treetable p-component", {
      "p-treetable-hoverable-rows": props.rowHover || instance.rowSelectionMode,
      "p-treetable-auto-layout": props.autoLayout,
      "p-treetable-resizable": props.resizableColumns,
      "p-treetable-resizable-fit": props.resizableColumns && props.columnResizeMode === "fit",
      "p-treetable-gridlines": props.showGridlines,
      "p-treetable-scrollable": props.scrollable,
      "p-treetable-scrollable-vertical": props.scrollable && props.scrollDirection === "vertical",
      "p-treetable-scrollable-horizontal": props.scrollable && props.scrollDirection === "horizontal",
      "p-treetable-scrollable-both": props.scrollable && props.scrollDirection === "both",
      "p-treetable-flex-scrollable": props.scrollable && props.scrollHeight === "flex",
      "p-treetable-responsive-scroll": props.responsiveLayout === "scroll",
      "p-treetable-sm": props.size === "small",
      "p-treetable-lg": props.size === "large"
    }];
  },
  loadingWrapper: "p-treetable-loading",
  loadingOverlay: "p-treetable-loading-overlay p-component-overlay",
  loadingIcon: "p-treetable-loading-icon",
  header: "p-treetable-header",
  paginator: function paginator(_ref2) {
    var instance = _ref2.instance;
    return instance.paginatorTop ? "p-paginator-top" : instance.paginatorBottom ? "p-paginator-bottom" : "";
  },
  wrapper: "p-treetable-wrapper",
  thead: "p-treetable-thead",
  //headercell
  headerCell: function headerCell(_ref3) {
    var instance = _ref3.instance, props = _ref3.props, column = _ref3.column;
    return column && instance.hasColumnFilter() ? ["p-filter-column", {
      "p-frozen-column": instance.columnProp(column, "frozen")
    }] : [{
      "p-sortable-column": instance.columnProp("sortable"),
      "p-resizable-column": props.resizableColumns,
      "p-highlight": instance.isColumnSorted(),
      "p-frozen-column": instance.columnProp("frozen")
    }];
  },
  columnResizer: "p-column-resizer",
  headerTitle: "p-column-title",
  sortIcon: "p-sortable-column-icon",
  sortBadge: "p-sortable-column-badge",
  tbody: "p-treetable-tbody",
  //ttrow
  row: function row(_ref4) {
    var instance = _ref4.instance;
    return [{
      "p-highlight": instance.selected
    }];
  },
  //bodycell
  bodyCell: function bodyCell(_ref5) {
    var instance = _ref5.instance;
    return [{
      "p-frozen-column": instance.columnProp("frozen")
    }];
  },
  rowToggler: "p-treetable-toggler p-link",
  rowTogglerIcon: "p-tree-toggler-icon",
  checkboxWrapper: function checkboxWrapper(_ref6) {
    var instance = _ref6.instance;
    return ["p-checkbox p-treetable-checkbox p-component", {
      "p-checkbox-focused": instance.checkboxFocused
    }];
  },
  checkbox: function checkbox(_ref7) {
    var instance = _ref7.instance;
    return ["p-checkbox-box", {
      "p-highlight": instance.checked,
      "p-focus": instance.checkboxFocused,
      "p-indeterminate": instance.partialChecked
    }];
  },
  checkboxicon: "p-checkbox-icon",
  //treetable
  emptyMessage: "p-treetable-emptymessage",
  tfoot: "p-treetable-tfoot",
  //footercell
  footerCell: function footerCell(_ref8) {
    var instance = _ref8.instance;
    return [{
      "p-frozen-column": instance.columnProp("frozen")
    }];
  },
  //treetable
  footer: "p-treetable-footer",
  resizeHelper: "p-column-resizer-helper p-highlight"
};
var _useStyle = useStyle(styles, {
  name: "treetable",
  manual: true
});
var loadStyle = _useStyle.load;
var script$5 = {
  name: "BaseTreeTable",
  "extends": script,
  props: {
    value: {
      type: null,
      "default": null
    },
    expandedKeys: {
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
    metaKeySelection: {
      type: Boolean,
      "default": true
    },
    rows: {
      type: Number,
      "default": 0
    },
    first: {
      type: Number,
      "default": 0
    },
    totalRecords: {
      type: Number,
      "default": 0
    },
    paginator: {
      type: Boolean,
      "default": false
    },
    paginatorPosition: {
      type: String,
      "default": "bottom"
    },
    alwaysShowPaginator: {
      type: Boolean,
      "default": true
    },
    paginatorTemplate: {
      type: String,
      "default": "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    },
    pageLinkSize: {
      type: Number,
      "default": 5
    },
    rowsPerPageOptions: {
      type: Array,
      "default": null
    },
    currentPageReportTemplate: {
      type: String,
      "default": "({currentPage} of {totalPages})"
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    loading: {
      type: Boolean,
      "default": false
    },
    loadingIcon: {
      type: String,
      "default": void 0
    },
    rowHover: {
      type: Boolean,
      "default": false
    },
    autoLayout: {
      type: Boolean,
      "default": false
    },
    sortField: {
      type: [String, Function],
      "default": null
    },
    sortOrder: {
      type: Number,
      "default": null
    },
    defaultSortOrder: {
      type: Number,
      "default": 1
    },
    multiSortMeta: {
      type: Array,
      "default": null
    },
    sortMode: {
      type: String,
      "default": "single"
    },
    removableSort: {
      type: Boolean,
      "default": false
    },
    filters: {
      type: Object,
      "default": null
    },
    filterMode: {
      type: String,
      "default": "lenient"
    },
    filterLocale: {
      type: String,
      "default": void 0
    },
    resizableColumns: {
      type: Boolean,
      "default": false
    },
    columnResizeMode: {
      type: String,
      "default": "fit"
    },
    indentation: {
      type: Number,
      "default": 1
    },
    showGridlines: {
      type: Boolean,
      "default": false
    },
    scrollable: {
      type: Boolean,
      "default": false
    },
    scrollDirection: {
      type: String,
      "default": "vertical"
    },
    scrollHeight: {
      type: String,
      "default": null
    },
    responsiveLayout: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": null
    },
    tableProps: {
      type: Object,
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
var script$4 = {
  name: "FooterCell",
  hostName: "TreeTable",
  "extends": script,
  props: {
    column: {
      type: Object,
      "default": null
    },
    index: {
      type: Number,
      "default": null
    }
  },
  data: function data() {
    return {
      styleObject: {}
    };
  },
  mounted: function mounted() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  updated: function updated() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  methods: {
    columnProp: function columnProp(prop) {
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT(key) {
      var _this$$parentInstance;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          frozen: this.columnProp("frozen"),
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : void 0;
    },
    updateStickyPosition: function updateStickyPosition() {
      if (this.columnProp("frozen")) {
        var align = this.columnProp("alignFrozen");
        if (align === "right") {
          var right = 0;
          var next = this.$el.nextElementSibling;
          if (next) {
            right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + "px";
        } else {
          var left = 0;
          var prev = this.$el.previousElementSibling;
          if (prev) {
            left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + "px";
        }
      }
    }
  },
  computed: {
    containerClass: function containerClass() {
      return [this.columnProp("footerClass"), this.columnProp("class"), this.cx("footerCell")];
    },
    containerStyle: function containerStyle() {
      var bodyStyle = this.columnProp("footerStyle");
      var columnStyle = this.columnProp("style");
      return this.columnProp("frozen") ? [columnStyle, bodyStyle, this.styleObject] : [columnStyle, bodyStyle];
    }
  }
};
function _typeof$5(obj) {
  "@babel/helpers - typeof";
  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$5(obj);
}
function ownKeys$5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$5(Object(source), true).forEach(function(key) {
      _defineProperty$5(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$5(obj, key, value) {
  key = _toPropertyKey$5(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$5(arg) {
  var key = _toPrimitive$5(arg, "string");
  return _typeof$5(key) === "symbol" ? key : String(key);
}
function _toPrimitive$5(input, hint) {
  if (_typeof$5(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof$5(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("td", mergeProps({
    style: $options.containerStyle,
    "class": $options.containerClass,
    role: "cell"
  }, _objectSpread$5(_objectSpread$5({}, $options.getColumnPT("root")), $options.getColumnPT("footerCell"))), [$props.column.children && $props.column.children.footer ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.footer), {
    key: 0,
    column: $props.column
  }, null, 8, ["column"])) : createCommentVNode("", true), createTextVNode(" " + toDisplayString($options.columnProp("footer")), 1)], 16);
}
script$4.render = render$4;
var script$3 = {
  name: "HeaderCell",
  hostName: "TreeTable",
  "extends": script,
  emits: ["column-click", "column-resizestart"],
  props: {
    column: {
      type: Object,
      "default": null
    },
    resizableColumns: {
      type: Boolean,
      "default": false
    },
    sortField: {
      type: [String, Function],
      "default": null
    },
    sortOrder: {
      type: Number,
      "default": null
    },
    multiSortMeta: {
      type: Array,
      "default": null
    },
    sortMode: {
      type: String,
      "default": "single"
    },
    index: {
      type: Number,
      "default": null
    }
  },
  data: function data2() {
    return {
      styleObject: {}
    };
  },
  mounted: function mounted2() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  updated: function updated2() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  methods: {
    columnProp: function columnProp2(prop) {
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT2(key) {
      var _this$$parentInstance;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          sorted: this.isColumnSorted(),
          frozen: this.$parentInstance.scrollable && this.columnProp("frozen"),
          resizable: this.resizableColumns,
          scrollable: this.$parentInstance.scrollable,
          scrollDirection: this.$parentInstance.scrollDirection,
          showGridlines: this.$parentInstance.showGridlines,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp2() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : void 0;
    },
    updateStickyPosition: function updateStickyPosition2() {
      if (this.columnProp("frozen")) {
        var align = this.columnProp("alignFrozen");
        if (align === "right") {
          var right = 0;
          var next = this.$el.nextElementSibling;
          if (next) {
            right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + "px";
        } else {
          var left = 0;
          var prev = this.$el.previousElementSibling;
          if (prev) {
            left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + "px";
        }
        var filterRow = this.$el.parentElement.nextElementSibling;
        if (filterRow) {
          var index = DomHandler.index(this.$el);
          filterRow.children[index].style.left = this.styleObject.left;
          filterRow.children[index].style.right = this.styleObject.right;
        }
      }
    },
    onClick: function onClick(event2) {
      this.$emit("column-click", {
        originalEvent: event2,
        column: this.column
      });
    },
    onKeyDown: function onKeyDown(event2) {
      if ((event2.code === "Enter" || event2.code === "Space") && event2.currentTarget.nodeName === "TH" && DomHandler.getAttribute(event2.currentTarget, "data-p-sortable-column")) {
        this.$emit("column-click", {
          originalEvent: event2,
          column: this.column
        });
        event2.preventDefault();
      }
    },
    onResizeStart: function onResizeStart(event2) {
      this.$emit("column-resizestart", event2);
    },
    getMultiSortMetaIndex: function getMultiSortMetaIndex() {
      var index = -1;
      for (var i = 0; i < this.multiSortMeta.length; i++) {
        var meta = this.multiSortMeta[i];
        if (meta.field === this.columnProp("field") || meta.field === this.columnProp("sortField")) {
          index = i;
          break;
        }
      }
      return index;
    },
    isMultiSorted: function isMultiSorted() {
      return this.columnProp("sortable") && this.getMultiSortMetaIndex() > -1;
    },
    isColumnSorted: function isColumnSorted() {
      return this.sortMode === "single" ? this.sortField && (this.sortField === this.columnProp("field") || this.sortField === this.columnProp("sortField")) : this.isMultiSorted();
    }
  },
  computed: {
    containerClass: function containerClass2() {
      return [this.columnProp("headerClass"), this.columnProp("class"), this.cx("headerCell")];
    },
    containerStyle: function containerStyle2() {
      var headerStyle = this.columnProp("headerStyle");
      var columnStyle = this.columnProp("style");
      return this.columnProp("frozen") ? [columnStyle, headerStyle, this.styleObject] : [columnStyle, headerStyle];
    },
    sortState: function sortState() {
      var sorted2 = false;
      var sortOrder2 = null;
      if (this.sortMode === "single") {
        sorted2 = this.sortField && (this.sortField === this.columnProp("field") || this.sortField === this.columnProp("sortField"));
        sortOrder2 = sorted2 ? this.sortOrder : 0;
      } else if (this.sortMode === "multiple") {
        var metaIndex = this.getMultiSortMetaIndex();
        if (metaIndex > -1) {
          sorted2 = true;
          sortOrder2 = this.multiSortMeta[metaIndex].order;
        }
      }
      return {
        sorted: sorted2,
        sortOrder: sortOrder2
      };
    },
    sortableColumnIcon: function sortableColumnIcon() {
      var _this$sortState = this.sortState, sorted2 = _this$sortState.sorted, sortOrder2 = _this$sortState.sortOrder;
      if (!sorted2)
        return script7;
      else if (sorted2 && sortOrder2 > 0)
        return script9;
      else if (sorted2 && sortOrder2 < 0)
        return script8;
      return null;
    },
    ariaSort: function ariaSort() {
      if (this.columnProp("sortable")) {
        var _this$sortState2 = this.sortState, sorted2 = _this$sortState2.sorted, sortOrder2 = _this$sortState2.sortOrder;
        if (sorted2 && sortOrder2 < 0)
          return "descending";
        else if (sorted2 && sortOrder2 > 0)
          return "ascending";
        else
          return "none";
      } else {
        return null;
      }
    }
  },
  components: {
    SortAltIcon: script7,
    SortAmountUpAltIcon: script9,
    SortAmountDownIcon: script8
  }
};
function _typeof$4(obj) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$4(obj);
}
function ownKeys$4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$4(Object(source), true).forEach(function(key) {
      _defineProperty$4(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$4(obj, key, value) {
  key = _toPropertyKey$4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$4(arg) {
  var key = _toPrimitive$4(arg, "string");
  return _typeof$4(key) === "symbol" ? key : String(key);
}
function _toPrimitive$4(input, hint) {
  if (_typeof$4(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof$4(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var _hoisted_1$2 = ["tabindex", "aria-sort", "data-p-sortable-column", "data-p-resizable-column", "data-p-highlight", "data-p-frozen-column"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("th", mergeProps({
    "class": $options.containerClass,
    style: [$options.containerStyle],
    onClick: _cache[1] || (_cache[1] = function() {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function() {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    tabindex: $options.columnProp("sortable") ? "0" : null,
    "aria-sort": $options.ariaSort,
    role: "columnheader"
  }, _objectSpread$4(_objectSpread$4({}, $options.getColumnPT("root")), $options.getColumnPT("headerCell")), {
    "data-p-sortable-column": $options.columnProp("sortable"),
    "data-p-resizable-column": $props.resizableColumns,
    "data-p-highlight": $options.isColumnSorted(),
    "data-p-frozen-column": $options.columnProp("frozen")
  }), [$props.resizableColumns && !$options.columnProp("frozen") ? (openBlock(), createElementBlock("span", mergeProps({
    key: 0,
    "class": _ctx.cx("columnResizer"),
    onMousedown: _cache[0] || (_cache[0] = function() {
      return $options.onResizeStart && $options.onResizeStart.apply($options, arguments);
    })
  }, $options.getColumnPT("columnResizer")), null, 16)) : createCommentVNode("", true), $props.column.children && $props.column.children.header ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.header), {
    key: 1,
    column: $props.column
  }, null, 8, ["column"])) : createCommentVNode("", true), $options.columnProp("header") ? (openBlock(), createElementBlock("span", mergeProps({
    key: 2,
    "class": _ctx.cx("headerTitle")
  }, $options.getColumnPT("headerTitle")), toDisplayString($options.columnProp("header")), 17)) : createCommentVNode("", true), $options.columnProp("sortable") ? (openBlock(), createElementBlock("span", normalizeProps(mergeProps({
    key: 3
  }, $options.getColumnPT("sort"))), [(openBlock(), createBlock(resolveDynamicComponent($props.column.children && $props.column.children.sorticon || $options.sortableColumnIcon), mergeProps({
    sorted: $options.sortState.sorted,
    sortOrder: $options.sortState.sortOrder,
    "data-pc-section": "sorticon",
    "class": _ctx.cx("sortIcon")
  }, $options.getColumnPT("sortIcon")), null, 16, ["sorted", "sortOrder", "class"]))], 16)) : createCommentVNode("", true), $options.isMultiSorted() ? (openBlock(), createElementBlock("span", mergeProps({
    key: 4,
    "class": _ctx.cx("sortBadge")
  }, $options.getColumnPT("sortBadge")), toDisplayString($options.getMultiSortMetaIndex() + 1), 17)) : createCommentVNode("", true)], 16, _hoisted_1$2);
}
script$3.render = render$3;
var script$2 = {
  name: "BodyCell",
  hostName: "TreeTable",
  "extends": script,
  emits: ["node-toggle", "checkbox-toggle"],
  props: {
    node: {
      type: Object,
      "default": null
    },
    column: {
      type: Object,
      "default": null
    },
    level: {
      type: Number,
      "default": 0
    },
    indentation: {
      type: Number,
      "default": 1
    },
    leaf: {
      type: Boolean,
      "default": false
    },
    expanded: {
      type: Boolean,
      "default": false
    },
    selectionMode: {
      type: String,
      "default": null
    },
    checked: {
      type: Boolean,
      "default": false
    },
    partialChecked: {
      type: Boolean,
      "default": false
    },
    templates: {
      type: Object,
      "default": null
    },
    index: {
      type: Number,
      "default": null
    }
  },
  data: function data3() {
    return {
      styleObject: {},
      checkboxFocused: false
    };
  },
  mounted: function mounted3() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  updated: function updated3() {
    if (this.columnProp("frozen")) {
      this.updateStickyPosition();
    }
  },
  methods: {
    toggle: function toggle() {
      this.$emit("node-toggle", this.node);
    },
    columnProp: function columnProp3(prop) {
      return ObjectUtils.getVNodeProp(this.column, prop);
    },
    getColumnPT: function getColumnPT3(key) {
      var _this$$parentInstance;
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          index: this.index,
          focused: this.checkboxFocused,
          selectable: this.$parentInstance.rowHover || this.$parentInstance.rowSelectionMode,
          selected: this.$parent.selected,
          frozen: this.columnProp("frozen"),
          scrollable: this.$parentInstance.scrollable,
          scrollDirection: this.$parentInstance.scrollDirection,
          showGridlines: this.$parentInstance.showGridlines,
          size: (_this$$parentInstance = this.$parentInstance) === null || _this$$parentInstance === void 0 ? void 0 : _this$$parentInstance.size
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    getColumnProp: function getColumnProp3() {
      return this.column.props && this.column.props.pt ? this.column.props.pt : void 0;
    },
    getColumnCheckboxPT: function getColumnCheckboxPT(key) {
      var columnMetaData = {
        props: this.column.props,
        parent: {
          props: this.$props,
          state: this.$data
        },
        context: {
          checked: this.checked,
          focused: this.checkboxFocused,
          partialChecked: this.partialChecked
        }
      };
      return mergeProps(this.ptm("column.".concat(key), {
        column: columnMetaData
      }), this.ptm("column.".concat(key), columnMetaData), this.ptmo(this.getColumnProp(), key, columnMetaData));
    },
    updateStickyPosition: function updateStickyPosition3() {
      if (this.columnProp("frozen")) {
        var align = this.columnProp("alignFrozen");
        if (align === "right") {
          var right = 0;
          var next = this.$el.nextElementSibling;
          if (next) {
            right = DomHandler.getOuterWidth(next) + parseFloat(next.style.right || 0);
          }
          this.styleObject.right = right + "px";
        } else {
          var left = 0;
          var prev = this.$el.previousElementSibling;
          if (prev) {
            left = DomHandler.getOuterWidth(prev) + parseFloat(prev.style.left || 0);
          }
          this.styleObject.left = left + "px";
        }
      }
    },
    resolveFieldData: function resolveFieldData(rowData, field) {
      return ObjectUtils.resolveFieldData(rowData, field);
    },
    toggleCheckbox: function toggleCheckbox() {
      this.$emit("checkbox-toggle");
    },
    onCheckboxFocus: function onCheckboxFocus() {
      this.checkboxFocused = true;
    },
    onCheckboxBlur: function onCheckboxBlur() {
      this.checkboxFocused = false;
    }
  },
  computed: {
    containerClass: function containerClass3() {
      return [this.columnProp("bodyClass"), this.columnProp("class"), this.cx("bodyCell")];
    },
    containerStyle: function containerStyle3() {
      var bodyStyle = this.columnProp("bodyStyle");
      var columnStyle = this.columnProp("style");
      return this.columnProp("frozen") ? [columnStyle, bodyStyle, this.styleObject] : [columnStyle, bodyStyle];
    },
    togglerStyle: function togglerStyle() {
      return {
        marginLeft: this.level * this.indentation + "rem",
        visibility: this.leaf ? "hidden" : "visible"
      };
    },
    checkboxSelectionMode: function checkboxSelectionMode() {
      return this.selectionMode === "checkbox";
    }
  },
  components: {
    ChevronRightIcon: script4,
    ChevronDownIcon: script3,
    CheckIcon: script5,
    MinusIcon: script10
  },
  directives: {
    ripple: Ripple
  }
};
function _typeof$3(obj) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$3(obj);
}
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$3(Object(source), true).forEach(function(key) {
      _defineProperty$3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(arg) {
  var key = _toPrimitive$3(arg, "string");
  return _typeof$3(key) === "symbol" ? key : String(key);
}
function _toPrimitive$3(input, hint) {
  if (_typeof$3(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof$3(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("td", mergeProps({
    style: $options.containerStyle,
    "class": $options.containerClass,
    role: "cell"
  }, _objectSpread$3(_objectSpread$3({}, $options.getColumnPT("root")), $options.getColumnPT("bodyCell"))), [$options.columnProp("expander") ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
    key: 0,
    type: "button",
    "class": _ctx.cx("rowToggler"),
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.toggle && $options.toggle.apply($options, arguments);
    }),
    style: $options.togglerStyle,
    tabindex: "-1"
  }, $options.getColumnPT("rowToggler")), [$props.templates["togglericon"] ? (openBlock(), createBlock(resolveDynamicComponent($props.templates["togglericon"]), {
    key: 0,
    node: $props.node,
    expanded: $props.expanded,
    "class": normalizeClass(_ctx.cx("rowTogglerIcon"))
  }, null, 8, ["node", "expanded", "class"])) : $props.expanded ? (openBlock(), createBlock(resolveDynamicComponent($props.node.expandedIcon ? "span" : "ChevronDownIcon"), mergeProps({
    key: 1,
    "class": _ctx.cx("rowTogglerIcon")
  }, $options.getColumnPT("rowTogglerIcon")), null, 16, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent($props.node.collapsedIcon ? "span" : "ChevronRightIcon"), mergeProps({
    key: 2,
    "class": _ctx.cx("rowTogglerIcon")
  }, $options.getColumnPT("rowTogglerIcon")), null, 16, ["class"]))], 16)), [[_directive_ripple]]) : createCommentVNode("", true), $options.checkboxSelectionMode && $options.columnProp("expander") ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx("checkboxWrapper"),
    onClick: _cache[3] || (_cache[3] = function() {
      return $options.toggleCheckbox && $options.toggleCheckbox.apply($options, arguments);
    })
  }, $options.getColumnCheckboxPT("checkboxWrapper")), [createBaseVNode("div", mergeProps({
    "class": "p-hidden-accessible"
  }, $options.getColumnPT("hiddenInputWrapper"), {
    "data-p-hidden-accessible": true
  }), [createBaseVNode("input", mergeProps({
    type: "checkbox",
    onFocus: _cache[1] || (_cache[1] = function() {
      return $options.onCheckboxFocus && $options.onCheckboxFocus.apply($options, arguments);
    }),
    onBlur: _cache[2] || (_cache[2] = function() {
      return $options.onCheckboxBlur && $options.onCheckboxBlur.apply($options, arguments);
    }),
    tabindex: "-1"
  }, $options.getColumnPT("hiddenInput")), null, 16)], 16), createBaseVNode("div", mergeProps({
    ref: "checkboxEl",
    "class": _ctx.cx("checkbox")
  }, $options.getColumnCheckboxPT("checkbox")), [$props.templates["checkboxicon"] ? (openBlock(), createBlock(resolveDynamicComponent($props.templates["checkboxicon"]), {
    key: 0,
    checked: $props.checked,
    partialChecked: $props.partialChecked,
    "class": normalizeClass(_ctx.cx("checkboxicon"))
  }, null, 8, ["checked", "partialChecked", "class"])) : (openBlock(), createBlock(resolveDynamicComponent($props.checked ? "CheckIcon" : $props.partialChecked ? "MinusIcon" : null), mergeProps({
    key: 1,
    "class": _ctx.cx("checkboxicon")
  }, $options.getColumnCheckboxPT("checkboxIcon")), null, 16, ["class"]))], 16)], 16)) : createCommentVNode("", true), $props.column.children && $props.column.children.body ? (openBlock(), createBlock(resolveDynamicComponent($props.column.children.body), {
    key: 2,
    node: $props.node,
    column: $props.column
  }, null, 8, ["node", "column"])) : (openBlock(), createElementBlock("span", normalizeProps(mergeProps({
    key: 3
  }, $options.getColumnPT("bodyCellContent"))), toDisplayString($options.resolveFieldData($props.node.data, $options.columnProp("field"))), 17))], 16);
}
script$2.render = render$2;
function _typeof$2(obj) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$2(obj);
}
function _createForOfIteratorHelper$1(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), true).forEach(function(key) {
      _defineProperty$2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(arg) {
  var key = _toPrimitive$2(arg, "string");
  return _typeof$2(key) === "symbol" ? key : String(key);
}
function _toPrimitive$2(input, hint) {
  if (_typeof$2(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof$2(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$1(arr);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var script$1 = {
  name: "TreeTableRow",
  hostName: "TreeTable",
  "extends": script,
  emits: ["node-click", "node-toggle", "checkbox-change", "nodeClick", "nodeToggle", "checkboxChange"],
  props: {
    node: {
      type: null,
      "default": null
    },
    parentNode: {
      type: null,
      "default": null
    },
    columns: {
      type: null,
      "default": null
    },
    expandedKeys: {
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
    level: {
      type: Number,
      "default": 0
    },
    indentation: {
      type: Number,
      "default": 1
    },
    tabindex: {
      type: Number,
      "default": -1
    },
    ariaSetSize: {
      type: Number,
      "default": null
    },
    ariaPosInset: {
      type: Number,
      "default": null
    },
    templates: {
      type: Object,
      "default": null
    }
  },
  nodeTouched: false,
  methods: {
    columnProp: function columnProp4(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    toggle: function toggle2() {
      this.$emit("node-toggle", this.node);
    },
    onClick: function onClick2(event2) {
      if (DomHandler.isClickable(event2.target) || DomHandler.getAttribute(event2.target, "data-pc-section") === "rowtoggler" || DomHandler.getAttribute(event2.target, "data-pc-section") === "rowtogglericon" || event2.target.tagName === "path") {
        return;
      }
      this.setTabIndexForSelectionMode(event2, this.nodeTouched);
      this.$emit("node-click", {
        originalEvent: event2,
        nodeTouched: this.nodeTouched,
        node: this.node
      });
      this.nodeTouched = false;
    },
    onTouchEnd: function onTouchEnd() {
      this.nodeTouched = true;
    },
    onKeyDown: function onKeyDown2(event2, item) {
      switch (event2.code) {
        case "ArrowDown":
          this.onArrowDownKey(event2);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event2);
          break;
        case "ArrowLeft":
          this.onArrowLeftKey(event2);
          break;
        case "ArrowRight":
          this.onArrowRightKey(event2);
          break;
        case "Home":
          this.onHomeKey(event2);
          break;
        case "End":
          this.onEndKey(event2);
          break;
        case "Enter":
        case "Space":
          this.onEnterKey(event2, item);
          break;
        case "Tab":
          this.onTabKey(event2);
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event2) {
      var nextElementSibling = event2.currentTarget.nextElementSibling;
      nextElementSibling && this.focusRowChange(event2.currentTarget, nextElementSibling);
      event2.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event2) {
      var previousElementSibling = event2.currentTarget.previousElementSibling;
      previousElementSibling && this.focusRowChange(event2.currentTarget, previousElementSibling);
      event2.preventDefault();
    },
    onArrowRightKey: function onArrowRightKey(event2) {
      var _this = this;
      var ishiddenIcon = DomHandler.findSingle(event2.currentTarget, "button").style.visibility === "hidden";
      var togglerElement = DomHandler.findSingle(this.$refs.node, '[data-pc-section="rowtoggler"]');
      if (ishiddenIcon)
        return;
      !this.expanded && togglerElement.click();
      this.$nextTick(function() {
        _this.onArrowDownKey(event2);
      });
      event2.preventDefault();
    },
    onArrowLeftKey: function onArrowLeftKey(event2) {
      if (this.level === 0 && !this.expanded) {
        return;
      }
      var currentTarget = event2.currentTarget;
      var ishiddenIcon = DomHandler.findSingle(currentTarget, "button").style.visibility === "hidden";
      var togglerElement = DomHandler.findSingle(currentTarget, '[data-pc-section="rowtoggler"]');
      if (this.expanded && !ishiddenIcon) {
        togglerElement.click();
        return;
      }
      var target = this.findBeforeClickableNode(currentTarget);
      target && this.focusRowChange(currentTarget, target);
    },
    onHomeKey: function onHomeKey(event2) {
      var findFirstElement = DomHandler.findSingle(event2.currentTarget.parentElement, 'tr[aria-level="'.concat(this.level + 1, '"]'));
      findFirstElement && DomHandler.focus(findFirstElement);
      event2.preventDefault();
    },
    onEndKey: function onEndKey(event2) {
      var nodes = DomHandler.find(event2.currentTarget.parentElement, 'tr[aria-level="'.concat(this.level + 1, '"]'));
      var findFirstElement = nodes[nodes.length - 1];
      DomHandler.focus(findFirstElement);
      event2.preventDefault();
    },
    onEnterKey: function onEnterKey(event2) {
      event2.preventDefault();
      this.setTabIndexForSelectionMode(event2, this.nodeTouched);
      if (this.selectionMode === "checkbox") {
        this.toggleCheckbox();
        return;
      }
      this.$emit("node-click", {
        originalEvent: event2,
        nodeTouched: this.nodeTouched,
        node: this.node
      });
      this.nodeTouched = false;
    },
    onTabKey: function onTabKey() {
      var rows2 = _toConsumableArray$1(DomHandler.find(this.$refs.node.parentElement, "tr"));
      var hasSelectedRow = rows2.some(function(row2) {
        return DomHandler.getAttribute(row2, "data-p-highlight") || row2.getAttribute("aria-checked") === "true";
      });
      rows2.forEach(function(row2) {
        row2.tabIndex = -1;
      });
      if (hasSelectedRow) {
        var selectedNodes = rows2.filter(function(node) {
          return DomHandler.getAttribute(node, "data-p-highlight") || node.getAttribute("aria-checked") === "true";
        });
        selectedNodes[0].tabIndex = 0;
        return;
      }
      rows2[0].tabIndex = 0;
    },
    focusRowChange: function focusRowChange(firstFocusableRow, currentFocusedRow) {
      firstFocusableRow.tabIndex = "-1";
      currentFocusedRow.tabIndex = "0";
      DomHandler.focus(currentFocusedRow);
    },
    findBeforeClickableNode: function findBeforeClickableNode(node) {
      var prevNode = node.previousElementSibling;
      if (prevNode) {
        var prevNodeButton = prevNode.querySelector("button");
        if (prevNodeButton && prevNodeButton.style.visibility !== "hidden") {
          return prevNode;
        }
        return this.findBeforeClickableNode(prevNode);
      }
      return null;
    },
    toggleCheckbox: function toggleCheckbox2() {
      var _selectionKeys = this.selectionKeys ? _objectSpread$2({}, this.selectionKeys) : {};
      var _check = !this.checked;
      this.propagateDown(this.node, _check, _selectionKeys);
      this.$emit("checkbox-change", {
        node: this.node,
        check: _check,
        selectionKeys: _selectionKeys
      });
    },
    propagateDown: function propagateDown(node, check, selectionKeys) {
      if (check)
        selectionKeys[node.key] = {
          checked: true,
          partialChecked: false
        };
      else
        delete selectionKeys[node.key];
      if (node.children && node.children.length) {
        var _iterator = _createForOfIteratorHelper$1(node.children), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var child = _step.value;
            this.propagateDown(child, check, selectionKeys);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    },
    propagateUp: function propagateUp(event2) {
      var check = event2.check;
      var _selectionKeys = _objectSpread$2({}, event2.selectionKeys);
      var checkedChildCount = 0;
      var childPartialSelected = false;
      var _iterator2 = _createForOfIteratorHelper$1(this.node.children), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var child = _step2.value;
          if (_selectionKeys[child.key] && _selectionKeys[child.key].checked)
            checkedChildCount++;
          else if (_selectionKeys[child.key] && _selectionKeys[child.key].partialChecked)
            childPartialSelected = true;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (check && checkedChildCount === this.node.children.length) {
        _selectionKeys[this.node.key] = {
          checked: true,
          partialChecked: false
        };
      } else {
        if (!check) {
          delete _selectionKeys[this.node.key];
        }
        if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.node.children.length)
          _selectionKeys[this.node.key] = {
            checked: false,
            partialChecked: true
          };
        else
          _selectionKeys[this.node.key] = {
            checked: false,
            partialChecked: false
          };
      }
      this.$emit("checkbox-change", {
        node: event2.node,
        check: event2.check,
        selectionKeys: _selectionKeys
      });
    },
    onCheckboxChange: function onCheckboxChange(event2) {
      var check = event2.check;
      var _selectionKeys = _objectSpread$2({}, event2.selectionKeys);
      var checkedChildCount = 0;
      var childPartialSelected = false;
      var _iterator3 = _createForOfIteratorHelper$1(this.node.children), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var child = _step3.value;
          if (_selectionKeys[child.key] && _selectionKeys[child.key].checked)
            checkedChildCount++;
          else if (_selectionKeys[child.key] && _selectionKeys[child.key].partialChecked)
            childPartialSelected = true;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      if (check && checkedChildCount === this.node.children.length) {
        _selectionKeys[this.node.key] = {
          checked: true,
          partialChecked: false
        };
      } else {
        if (!check) {
          delete _selectionKeys[this.node.key];
        }
        if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.node.children.length)
          _selectionKeys[this.node.key] = {
            checked: false,
            partialChecked: true
          };
        else
          _selectionKeys[this.node.key] = {
            checked: false,
            partialChecked: false
          };
      }
      this.$emit("checkbox-change", {
        node: event2.node,
        check: event2.check,
        selectionKeys: _selectionKeys
      });
    },
    setTabIndexForSelectionMode: function setTabIndexForSelectionMode(event2, nodeTouched) {
      if (this.selectionMode !== null) {
        var elements = _toConsumableArray$1(DomHandler.find(this.$refs.node.parentElement, "tr"));
        event2.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;
        if (elements.every(function(element) {
          return element.tabIndex === -1;
        })) {
          elements[0].tabIndex = 0;
        }
      }
    }
  },
  computed: {
    containerClass: function containerClass4() {
      return [this.node.styleClass, this.cx("row")];
    },
    expanded: function expanded() {
      return this.expandedKeys && this.expandedKeys[this.node.key] === true;
    },
    leaf: function leaf() {
      return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
    },
    selected: function selected() {
      return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.node.key] === true : false;
    },
    checked: function checked() {
      return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].checked : false;
    },
    partialChecked: function partialChecked() {
      return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].partialChecked : false;
    },
    getAriaSelected: function getAriaSelected() {
      return this.selectionMode === "single" || this.selectionMode === "multiple" ? this.selected : null;
    },
    ptmOptions: function ptmOptions() {
      return {
        context: {
          selectable: this.$parentInstance.rowHover || this.$parentInstance.rowSelectionMode,
          selected: this.selected,
          scrollable: this.$parentInstance.scrollable
        }
      };
    }
  },
  components: {
    TTBodyCell: script$2
  }
};
var _hoisted_1$1 = ["tabindex", "aria-expanded", "aria-level", "aria-setsize", "aria-posinset", "aria-selected", "aria-checked", "data-p-highlight"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TTBodyCell = resolveComponent("TTBodyCell");
  var _component_TreeTableRow = resolveComponent("TreeTableRow", true);
  return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("tr", mergeProps({
    ref: "node",
    "class": $options.containerClass,
    style: $props.node.style,
    tabindex: $props.tabindex,
    role: "row",
    "aria-expanded": $options.expanded,
    "aria-level": $props.level + 1,
    "aria-setsize": $props.ariaSetSize,
    "aria-posinset": $props.ariaPosInset,
    "aria-selected": $options.getAriaSelected,
    "aria-checked": $options.checked || void 0,
    onClick: _cache[1] || (_cache[1] = function() {
      return $options.onClick && $options.onClick.apply($options, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function() {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onTouchend: _cache[3] || (_cache[3] = function() {
      return $options.onTouchEnd && $options.onTouchEnd.apply($options, arguments);
    })
  }, _ctx.ptm("row", $options.ptmOptions), {
    "data-p-highlight": $options.selected
  }), [(openBlock(true), createElementBlock(Fragment, null, renderList($props.columns, function(col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || i
    }, [!$options.columnProp(col, "hidden") ? (openBlock(), createBlock(_component_TTBodyCell, {
      key: 0,
      column: col,
      node: $props.node,
      level: $props.level,
      leaf: $options.leaf,
      indentation: $props.indentation,
      expanded: $options.expanded,
      selectionMode: $props.selectionMode,
      checked: $options.checked,
      partialChecked: $options.partialChecked,
      templates: $props.templates,
      onNodeToggle: _cache[0] || (_cache[0] = function($event) {
        return _ctx.$emit("node-toggle", $event);
      }),
      onCheckboxToggle: $options.toggleCheckbox,
      index: i,
      pt: _ctx.pt
    }, null, 8, ["column", "node", "level", "leaf", "indentation", "expanded", "selectionMode", "checked", "partialChecked", "templates", "onCheckboxToggle", "index", "pt"])) : createCommentVNode("", true)], 64);
  }), 128))], 16, _hoisted_1$1), $options.expanded && $props.node.children && $props.node.children.length ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList($props.node.children, function(childNode) {
    return openBlock(), createBlock(_component_TreeTableRow, {
      key: childNode.key,
      columns: $props.columns,
      node: childNode,
      parentNode: $props.node,
      level: $props.level + 1,
      expandedKeys: $props.expandedKeys,
      selectionMode: $props.selectionMode,
      selectionKeys: $props.selectionKeys,
      indentation: $props.indentation,
      ariaPosInset: $props.node.children.indexOf(childNode) + 1,
      ariaSetSize: $props.node.children.length,
      templates: $props.templates,
      onNodeToggle: _cache[4] || (_cache[4] = function($event) {
        return _ctx.$emit("node-toggle", $event);
      }),
      onNodeClick: _cache[5] || (_cache[5] = function($event) {
        return _ctx.$emit("node-click", $event);
      }),
      onCheckboxChange: $options.onCheckboxChange,
      pt: _ctx.pt
    }, null, 8, ["columns", "node", "parentNode", "level", "expandedKeys", "selectionMode", "selectionKeys", "indentation", "ariaPosInset", "ariaSetSize", "templates", "onCheckboxChange", "pt"]);
  }), 128)) : createCommentVNode("", true)], 64);
}
script$1.render = render$1;
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
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
var script11 = {
  name: "TreeTable",
  "extends": script$5,
  emits: ["node-expand", "node-collapse", "update:expandedKeys", "update:selectionKeys", "node-select", "node-unselect", "update:first", "update:rows", "page", "update:sortField", "update:sortOrder", "update:multiSortMeta", "sort", "filter", "column-resize-end"],
  documentColumnResizeListener: null,
  documentColumnResizeEndListener: null,
  lastResizeHelperX: null,
  resizeColumnElement: null,
  data: function data4() {
    return {
      d_expandedKeys: this.expandedKeys || {},
      d_first: this.first,
      d_rows: this.rows,
      d_sortField: this.sortField,
      d_sortOrder: this.sortOrder,
      d_multiSortMeta: this.multiSortMeta ? _toConsumableArray(this.multiSortMeta) : [],
      hasASelectedNode: false
    };
  },
  watch: {
    expandedKeys: function expandedKeys(newValue) {
      this.d_expandedKeys = newValue;
    },
    first: function first(newValue) {
      this.d_first = newValue;
    },
    rows: function rows(newValue) {
      this.d_rows = newValue;
    },
    sortField: function sortField(newValue) {
      this.d_sortField = newValue;
    },
    sortOrder: function sortOrder(newValue) {
      this.d_sortOrder = newValue;
    },
    multiSortMeta: function multiSortMeta(newValue) {
      this.d_multiSortMeta = newValue;
    }
  },
  mounted: function mounted4() {
    if (this.scrollable && this.scrollDirection !== "vertical") {
      this.updateScrollWidth();
    }
  },
  updated: function updated4() {
    if (this.scrollable && this.scrollDirection !== "vertical") {
      this.updateScrollWidth();
    }
  },
  methods: {
    columnProp: function columnProp5(col, prop) {
      return ObjectUtils.getVNodeProp(col, prop);
    },
    ptHeaderCellOptions: function ptHeaderCellOptions(column) {
      return {
        context: {
          frozen: this.columnProp(column, "frozen")
        }
      };
    },
    onNodeToggle: function onNodeToggle(node) {
      var key = node.key;
      if (this.d_expandedKeys[key]) {
        delete this.d_expandedKeys[key];
        this.$emit("node-collapse", node);
      } else {
        this.d_expandedKeys[key] = true;
        this.$emit("node-expand", node);
      }
      this.d_expandedKeys = _objectSpread$1({}, this.d_expandedKeys);
      this.$emit("update:expandedKeys", this.d_expandedKeys);
    },
    onNodeClick: function onNodeClick(event2) {
      if (this.rowSelectionMode && event2.node.selectable !== false) {
        var metaSelection = event2.nodeTouched ? false : this.metaKeySelection;
        var _selectionKeys = metaSelection ? this.handleSelectionWithMetaKey(event2) : this.handleSelectionWithoutMetaKey(event2);
        this.$emit("update:selectionKeys", _selectionKeys);
      }
    },
    handleSelectionWithMetaKey: function handleSelectionWithMetaKey(event2) {
      var originalEvent = event2.originalEvent;
      var node = event2.node;
      var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
      var selected2 = this.isNodeSelected(node);
      var _selectionKeys;
      if (selected2 && metaKey) {
        if (this.isSingleSelectionMode()) {
          _selectionKeys = {};
        } else {
          _selectionKeys = _objectSpread$1({}, this.selectionKeys);
          delete _selectionKeys[node.key];
        }
        this.$emit("node-unselect", node);
      } else {
        if (this.isSingleSelectionMode()) {
          _selectionKeys = {};
        } else if (this.isMultipleSelectionMode()) {
          _selectionKeys = !metaKey ? {} : this.selectionKeys ? _objectSpread$1({}, this.selectionKeys) : {};
        }
        _selectionKeys[node.key] = true;
        this.$emit("node-select", node);
      }
      return _selectionKeys;
    },
    handleSelectionWithoutMetaKey: function handleSelectionWithoutMetaKey(event2) {
      var node = event2.node;
      var selected2 = this.isNodeSelected(node);
      var _selectionKeys;
      if (this.isSingleSelectionMode()) {
        if (selected2) {
          _selectionKeys = {};
          this.$emit("node-unselect", node);
        } else {
          _selectionKeys = {};
          _selectionKeys[node.key] = true;
          this.$emit("node-select", node);
        }
      } else {
        if (selected2) {
          _selectionKeys = _objectSpread$1({}, this.selectionKeys);
          delete _selectionKeys[node.key];
          this.$emit("node-unselect", node);
        } else {
          _selectionKeys = this.selectionKeys ? _objectSpread$1({}, this.selectionKeys) : {};
          _selectionKeys[node.key] = true;
          this.$emit("node-select", node);
        }
      }
      return _selectionKeys;
    },
    onCheckboxChange: function onCheckboxChange2(event2) {
      this.$emit("update:selectionKeys", event2.selectionKeys);
      if (event2.check)
        this.$emit("node-select", event2.node);
      else
        this.$emit("node-unselect", event2.node);
    },
    isSingleSelectionMode: function isSingleSelectionMode() {
      return this.selectionMode === "single";
    },
    isMultipleSelectionMode: function isMultipleSelectionMode() {
      return this.selectionMode === "multiple";
    },
    onPage: function onPage(event2) {
      this.d_first = event2.first;
      this.d_rows = event2.rows;
      var pageEvent = this.createLazyLoadEvent(event2);
      pageEvent.pageCount = event2.pageCount;
      pageEvent.page = event2.page;
      this.$emit("update:first", this.d_first);
      this.$emit("update:rows", this.d_rows);
      this.$emit("page", pageEvent);
    },
    resetPage: function resetPage() {
      this.d_first = 0;
      this.$emit("update:first", this.d_first);
    },
    getFilterColumnHeaderClass: function getFilterColumnHeaderClass(column) {
      return [this.cx("headerCell", {
        column
      }), this.columnProp(column, "filterHeaderClass")];
    },
    onColumnHeaderClick: function onColumnHeaderClick(e) {
      var event2 = e.originalEvent;
      var column = e.column;
      if (this.columnProp(column, "sortable")) {
        var targetNode = event2.target;
        var columnField = this.columnProp(column, "sortField") || this.columnProp(column, "field");
        if (DomHandler.getAttribute(targetNode, "data-p-sortable-column") === true || DomHandler.getAttribute(targetNode, "data-pc-section") === "headertitle" || DomHandler.getAttribute(targetNode, "data-pc-section") === "sorticon" || DomHandler.getAttribute(targetNode.parentElement, "data-pc-section") === "sorticon" || DomHandler.getAttribute(targetNode.parentElement.parentElement, "data-pc-section") === "sorticon") {
          DomHandler.clearSelection();
          if (this.sortMode === "single") {
            if (this.d_sortField === columnField) {
              if (this.removableSort && this.d_sortOrder * -1 === this.defaultSortOrder) {
                this.d_sortOrder = null;
                this.d_sortField = null;
              } else {
                this.d_sortOrder = this.d_sortOrder * -1;
              }
            } else {
              this.d_sortOrder = this.defaultSortOrder;
              this.d_sortField = columnField;
            }
            this.$emit("update:sortField", this.d_sortField);
            this.$emit("update:sortOrder", this.d_sortOrder);
            this.resetPage();
          } else if (this.sortMode === "multiple") {
            var metaKey = event2.metaKey || event2.ctrlKey;
            if (!metaKey) {
              this.d_multiSortMeta = this.d_multiSortMeta.filter(function(meta) {
                return meta.field === columnField;
              });
            }
            this.addMultiSortField(columnField);
            this.$emit("update:multiSortMeta", this.d_multiSortMeta);
          }
          this.$emit("sort", this.createLazyLoadEvent(event2));
        }
      }
    },
    addMultiSortField: function addMultiSortField(field) {
      var index = this.d_multiSortMeta.findIndex(function(meta) {
        return meta.field === field;
      });
      if (index >= 0) {
        if (this.removableSort && this.d_multiSortMeta[index].order * -1 === this.defaultSortOrder)
          this.d_multiSortMeta.splice(index, 1);
        else
          this.d_multiSortMeta[index] = {
            field,
            order: this.d_multiSortMeta[index].order * -1
          };
      } else {
        this.d_multiSortMeta.push({
          field,
          order: this.defaultSortOrder
        });
      }
      this.d_multiSortMeta = _toConsumableArray(this.d_multiSortMeta);
    },
    sortSingle: function sortSingle(nodes) {
      return this.sortNodesSingle(nodes);
    },
    sortNodesSingle: function sortNodesSingle(nodes) {
      var _this = this;
      var _nodes = _toConsumableArray(nodes);
      _nodes.sort(function(node1, node2) {
        var value1 = ObjectUtils.resolveFieldData(node1.data, _this.d_sortField);
        var value2 = ObjectUtils.resolveFieldData(node2.data, _this.d_sortField);
        var result = null;
        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else if (typeof value1 === "string" && typeof value2 === "string")
          result = value1.localeCompare(value2, void 0, {
            numeric: true
          });
        else
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return _this.d_sortOrder * result;
      });
      return _nodes;
    },
    sortMultiple: function sortMultiple(nodes) {
      return this.sortNodesMultiple(nodes);
    },
    sortNodesMultiple: function sortNodesMultiple(nodes) {
      var _this2 = this;
      var _nodes = _toConsumableArray(nodes);
      _nodes.sort(function(node1, node2) {
        return _this2.multisortField(node1, node2, 0);
      });
      return _nodes;
    },
    multisortField: function multisortField(node1, node2, index) {
      var value1 = ObjectUtils.resolveFieldData(node1.data, this.d_multiSortMeta[index].field);
      var value2 = ObjectUtils.resolveFieldData(node2.data, this.d_multiSortMeta[index].field);
      var result = null;
      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else {
        if (value1 === value2) {
          return this.d_multiSortMeta.length - 1 > index ? this.multisortField(node1, node2, index + 1) : 0;
        } else {
          if ((typeof value1 === "string" || value1 instanceof String) && (typeof value2 === "string" || value2 instanceof String))
            return this.d_multiSortMeta[index].order * value1.localeCompare(value2, void 0, {
              numeric: true
            });
          else
            result = value1 < value2 ? -1 : 1;
        }
      }
      return this.d_multiSortMeta[index].order * result;
    },
    filter: function filter(value) {
      var filteredNodes = [];
      var strict = this.filterMode === "strict";
      var _iterator = _createForOfIteratorHelper(value), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var node = _step.value;
          var copyNode = _objectSpread$1({}, node);
          var localMatch = true;
          var globalMatch = false;
          for (var j = 0; j < this.columns.length; j++) {
            var col = this.columns[j];
            var filterField = this.columnProp(col, "field");
            if (Object.prototype.hasOwnProperty.call(this.filters, this.columnProp(col, "field"))) {
              var filterMatchMode = this.columnProp(col, "filterMatchMode") || "startsWith";
              var filterValue = this.filters[this.columnProp(col, "field")];
              var filterConstraint = FilterService.filters[filterMatchMode];
              var paramsWithoutNode = {
                filterField,
                filterValue,
                filterConstraint,
                strict
              };
              if (strict && !(this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode)) || !strict && !(this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode))) {
                localMatch = false;
              }
              if (!localMatch) {
                break;
              }
            }
            if (this.hasGlobalFilter() && !globalMatch) {
              var copyNodeForGlobal = _objectSpread$1({}, copyNode);
              var _filterValue = this.filters["global"];
              var _filterConstraint = FilterService.filters["contains"];
              var globalFilterParamsWithoutNode = {
                filterField,
                filterValue: _filterValue,
                filterConstraint: _filterConstraint,
                strict
              };
              if (strict && (this.findFilteredNodes(copyNodeForGlobal, globalFilterParamsWithoutNode) || this.isFilterMatched(copyNodeForGlobal, globalFilterParamsWithoutNode)) || !strict && (this.isFilterMatched(copyNodeForGlobal, globalFilterParamsWithoutNode) || this.findFilteredNodes(copyNodeForGlobal, globalFilterParamsWithoutNode))) {
                globalMatch = true;
                copyNode = copyNodeForGlobal;
              }
            }
          }
          var matches = localMatch;
          if (this.hasGlobalFilter()) {
            matches = localMatch && globalMatch;
          }
          if (matches) {
            filteredNodes.push(copyNode);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var filterEvent = this.createLazyLoadEvent(event);
      filterEvent.filteredValue = filteredNodes;
      this.$emit("filter", filterEvent);
      return filteredNodes;
    },
    findFilteredNodes: function findFilteredNodes(node, paramsWithoutNode) {
      if (node) {
        var matched = false;
        if (node.children) {
          var childNodes = _toConsumableArray(node.children);
          node.children = [];
          var _iterator2 = _createForOfIteratorHelper(childNodes), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var childNode = _step2.value;
              var copyChildNode = _objectSpread$1({}, childNode);
              if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                matched = true;
                node.children.push(copyChildNode);
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        if (matched) {
          return true;
        }
      }
    },
    isFilterMatched: function isFilterMatched(node, _ref) {
      var filterField = _ref.filterField, filterValue = _ref.filterValue, filterConstraint = _ref.filterConstraint, strict = _ref.strict;
      var matched = false;
      var dataFieldValue = ObjectUtils.resolveFieldData(node.data, filterField);
      if (filterConstraint(dataFieldValue, filterValue, this.filterLocale)) {
        matched = true;
      }
      if (!matched || strict && !this.isNodeLeaf(node)) {
        matched = this.findFilteredNodes(node, {
          filterField,
          filterValue,
          filterConstraint,
          strict
        }) || matched;
      }
      return matched;
    },
    isNodeSelected: function isNodeSelected(node) {
      return this.selectionMode && this.selectionKeys ? this.selectionKeys[node.key] === true : false;
    },
    isNodeLeaf: function isNodeLeaf(node) {
      return node.leaf === false ? false : !(node.children && node.children.length);
    },
    createLazyLoadEvent: function createLazyLoadEvent(event2) {
      var _this3 = this;
      var filterMatchModes;
      if (this.hasFilters()) {
        filterMatchModes = {};
        this.columns.forEach(function(col) {
          if (_this3.columnProp(col, "field")) {
            filterMatchModes[col.props.field] = _this3.columnProp(col, "filterMatchMode");
          }
        });
      }
      return {
        originalEvent: event2,
        first: this.d_first,
        rows: this.d_rows,
        sortField: this.d_sortField,
        sortOrder: this.d_sortOrder,
        multiSortMeta: this.d_multiSortMeta,
        filters: this.filters,
        filterMatchModes
      };
    },
    onColumnResizeStart: function onColumnResizeStart(event2) {
      var containerLeft = DomHandler.getOffset(this.$el).left;
      this.resizeColumnElement = event2.target.parentElement;
      this.columnResizing = true;
      this.lastResizeHelperX = event2.pageX - containerLeft + this.$el.scrollLeft;
      this.bindColumnResizeEvents();
    },
    onColumnResize: function onColumnResize(event2) {
      var containerLeft = DomHandler.getOffset(this.$el).left;
      this.$el.setAttribute("data-p-unselectable-text", "true");
      !this.isUnstyled && DomHandler.addClass(this.$el, "p-unselectable-text");
      this.$refs.resizeHelper.style.height = this.$el.offsetHeight + "px";
      this.$refs.resizeHelper.style.top = "0px";
      this.$refs.resizeHelper.style.left = event2.pageX - containerLeft + this.$el.scrollLeft + "px";
      this.$refs.resizeHelper.style.display = "block";
    },
    onColumnResizeEnd: function onColumnResizeEnd() {
      var delta = this.$refs.resizeHelper.offsetLeft - this.lastResizeHelperX;
      var columnWidth = this.resizeColumnElement.offsetWidth;
      var newColumnWidth = columnWidth + delta;
      var minWidth = this.resizeColumnElement.style.minWidth || 15;
      if (columnWidth + delta > parseInt(minWidth, 10)) {
        if (this.columnResizeMode === "fit") {
          var nextColumn = this.resizeColumnElement.nextElementSibling;
          var nextColumnWidth = nextColumn.offsetWidth - delta;
          if (newColumnWidth > 15 && nextColumnWidth > 15) {
            if (!this.scrollable) {
              this.resizeColumnElement.style.width = newColumnWidth + "px";
              if (nextColumn) {
                nextColumn.style.width = nextColumnWidth + "px";
              }
            } else {
              this.resizeTableCells(newColumnWidth, nextColumnWidth);
            }
          }
        } else if (this.columnResizeMode === "expand") {
          this.$refs.table.style.width = this.$refs.table.offsetWidth + delta + "px";
          if (!this.scrollable)
            this.resizeColumnElement.style.width = newColumnWidth + "px";
          else
            this.resizeTableCells(newColumnWidth);
        }
        this.$emit("column-resize-end", {
          element: this.resizeColumnElement,
          delta
        });
      }
      this.$refs.resizeHelper.style.display = "none";
      this.resizeColumn = null;
      this.$el.setAttribute("data-p-unselectable-text", "false");
      !this.isUnstyled && DomHandler.removeClass(this.$el, "p-unselectable-text");
      this.unbindColumnResizeEvents();
    },
    resizeTableCells: function resizeTableCells(newColumnWidth, nextColumnWidth) {
      var colIndex = DomHandler.index(this.resizeColumnElement);
      var children = this.$refs.table.children;
      var _iterator3 = _createForOfIteratorHelper(children), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var child = _step3.value;
          var _iterator4 = _createForOfIteratorHelper(child.children), _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
              var row2 = _step4.value;
              var resizeCell = row2.children[colIndex];
              resizeCell.style.flex = "0 0 " + newColumnWidth + "px";
              if (this.columnResizeMode === "fit") {
                var nextCell = resizeCell.nextElementSibling;
                if (nextCell) {
                  nextCell.style.flex = "0 0 " + nextColumnWidth + "px";
                }
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    bindColumnResizeEvents: function bindColumnResizeEvents() {
      var _this4 = this;
      if (!this.documentColumnResizeListener) {
        this.documentColumnResizeListener = document.addEventListener("mousemove", function(event2) {
          if (_this4.columnResizing) {
            _this4.onColumnResize(event2);
          }
        });
      }
      if (!this.documentColumnResizeEndListener) {
        this.documentColumnResizeEndListener = document.addEventListener("mouseup", function() {
          if (_this4.columnResizing) {
            _this4.columnResizing = false;
            _this4.onColumnResizeEnd();
          }
        });
      }
    },
    unbindColumnResizeEvents: function unbindColumnResizeEvents() {
      if (this.documentColumnResizeListener) {
        document.removeEventListener("document", this.documentColumnResizeListener);
        this.documentColumnResizeListener = null;
      }
      if (this.documentColumnResizeEndListener) {
        document.removeEventListener("document", this.documentColumnResizeEndListener);
        this.documentColumnResizeEndListener = null;
      }
    },
    onColumnKeyDown: function onColumnKeyDown(event2, col) {
      if (event2.code === "Enter" && event2.currentTarget.nodeName === "TH" && DomHandler.getAttribute(event2.currentTarget, "data-p-sortable-column")) {
        this.onColumnHeaderClick(event2, col);
      }
    },
    hasColumnFilter: function hasColumnFilter() {
      if (this.columns) {
        var _iterator5 = _createForOfIteratorHelper(this.columns), _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
            var col = _step5.value;
            if (col.children && col.children.filter) {
              return true;
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
      return false;
    },
    hasFilters: function hasFilters() {
      return this.filters && Object.keys(this.filters).length > 0 && this.filters.constructor === Object;
    },
    hasGlobalFilter: function hasGlobalFilter() {
      return this.filters && Object.prototype.hasOwnProperty.call(this.filters, "global");
    },
    updateScrollWidth: function updateScrollWidth() {
      this.$refs.table.style.width = this.$refs.table.scrollWidth + "px";
    },
    getItemLabel: function getItemLabel(node) {
      return node.data.name;
    },
    setTabindex: function setTabindex(node, index) {
      if (this.isNodeSelected(node)) {
        this.hasASelectedNode = true;
        return 0;
      }
      if (this.selectionMode) {
        if (!this.isNodeSelected(node) && index === 0 && !this.hasASelectedNode)
          return 0;
      } else if (!this.selectionMode && index === 0) {
        return 0;
      }
      return -1;
    }
  },
  computed: {
    columns: function columns() {
      var cols = [];
      var children = this.$slots["default"]();
      children.forEach(function(child) {
        if (child.children && child.children instanceof Array)
          cols = [].concat(_toConsumableArray(cols), _toConsumableArray(child.children));
        else if (child.type.name === "Column")
          cols.push(child);
      });
      return cols;
    },
    processedData: function processedData() {
      if (this.lazy) {
        return this.value;
      } else {
        if (this.value && this.value.length) {
          var data5 = this.value;
          if (this.sorted) {
            if (this.sortMode === "single")
              data5 = this.sortSingle(data5);
            else if (this.sortMode === "multiple")
              data5 = this.sortMultiple(data5);
          }
          if (this.hasFilters()) {
            data5 = this.filter(data5);
          }
          return data5;
        } else {
          return null;
        }
      }
    },
    dataToRender: function dataToRender() {
      var data5 = this.processedData;
      if (this.paginator) {
        var first2 = this.lazy ? 0 : this.d_first;
        return data5.slice(first2, first2 + this.d_rows);
      } else {
        return data5;
      }
    },
    empty: function empty() {
      var data5 = this.processedData;
      return !data5 || data5.length === 0;
    },
    sorted: function sorted() {
      return this.d_sortField || this.d_multiSortMeta && this.d_multiSortMeta.length > 0;
    },
    hasFooter: function hasFooter() {
      var hasFooter2 = false;
      var _iterator6 = _createForOfIteratorHelper(this.columns), _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
          var col = _step6.value;
          if (this.columnProp(col, "footer") || col.children && col.children.footer) {
            hasFooter2 = true;
            break;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return hasFooter2;
    },
    paginatorTop: function paginatorTop() {
      return this.paginator && (this.paginatorPosition !== "bottom" || this.paginatorPosition === "both");
    },
    paginatorBottom: function paginatorBottom() {
      return this.paginator && (this.paginatorPosition !== "top" || this.paginatorPosition === "both");
    },
    singleSelectionMode: function singleSelectionMode() {
      return this.selectionMode && this.selectionMode === "single";
    },
    multipleSelectionMode: function multipleSelectionMode() {
      return this.selectionMode && this.selectionMode === "multiple";
    },
    rowSelectionMode: function rowSelectionMode() {
      return this.singleSelectionMode || this.multipleSelectionMode;
    },
    totalRecordsLength: function totalRecordsLength() {
      if (this.lazy) {
        return this.totalRecords;
      } else {
        var data5 = this.processedData;
        return data5 ? data5.length : 0;
      }
    }
  },
  components: {
    TTRow: script$1,
    TTPaginator: script6,
    TTHeaderCell: script$3,
    TTFooterCell: script$4,
    SpinnerIcon: script2
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
var _hoisted_1 = ["colspan"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TTPaginator = resolveComponent("TTPaginator");
  var _component_TTHeaderCell = resolveComponent("TTHeaderCell");
  var _component_TTRow = resolveComponent("TTRow");
  var _component_TTFooterCell = resolveComponent("TTFooterCell");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    "data-scrollselectors": ".p-treetable-scrollable-body",
    role: "table"
  }, _ctx.ptm("root"), {
    "data-pc-name": "treetable"
  }), [_ctx.loading ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx("loadingWrapper")
  }, _ctx.ptm("loadingWrapper")), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("loadingOverlay")
  }, _ctx.ptm("loadingOverlay")), [renderSlot(_ctx.$slots, "loadingicon", {
    "class": normalizeClass(_ctx.cx("loadingIcon"))
  }, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.loadingIcon ? "span" : "SpinnerIcon"), mergeProps({
      spin: "",
      "class": [_ctx.cx("loadingIcon"), _ctx.loadingIcon]
    }, _ctx.ptm("loadingIcon")), null, 16, ["class"]))];
  })], 16)], 16)) : createCommentVNode("", true), _ctx.$slots.header ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx("header")
  }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header")], 16)) : createCommentVNode("", true), $options.paginatorTop ? (openBlock(), createBlock(_component_TTPaginator, {
    key: 2,
    rows: $data.d_rows,
    first: $data.d_first,
    totalRecords: $options.totalRecordsLength,
    pageLinkSize: _ctx.pageLinkSize,
    template: _ctx.paginatorTemplate,
    rowsPerPageOptions: _ctx.rowsPerPageOptions,
    currentPageReportTemplate: _ctx.currentPageReportTemplate,
    "class": normalizeClass(_ctx.cx("paginator")),
    onPage: _cache[0] || (_cache[0] = function($event) {
      return $options.onPage($event);
    }),
    alwaysShow: _ctx.alwaysShowPaginator,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm("paginator"),
    "data-pc-section": "paginator"
  }, createSlots({
    _: 2
  }, [_ctx.$slots.paginatorstart ? {
    name: "start",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorstart")];
    }),
    key: "0"
  } : void 0, _ctx.$slots.paginatorend ? {
    name: "end",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorend")];
    }),
    key: "1"
  } : void 0, _ctx.$slots.paginatorfirstpagelinkicon ? {
    name: "firstpagelinkicon",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorfirstpagelinkicon")];
    }),
    key: "2"
  } : void 0, _ctx.$slots.paginatorprevpagelinkicon ? {
    name: "prevpagelinkicon",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorprevpagelinkicon")];
    }),
    key: "3"
  } : void 0, _ctx.$slots.paginatornextpagelinkicon ? {
    name: "nextpagelinkicon",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatornextpagelinkicon")];
    }),
    key: "4"
  } : void 0, _ctx.$slots.paginatorlastpagelinkicon ? {
    name: "lastpagelinkicon",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorlastpagelinkicon")];
    }),
    key: "5"
  } : void 0]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : createCommentVNode("", true), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("wrapper"),
    style: {
      maxHeight: _ctx.scrollHeight
    }
  }, _ctx.ptm("wrapper")), [createBaseVNode("table", mergeProps({
    ref: "table",
    role: "table"
  }, _objectSpread(_objectSpread({}, _ctx.tableProps), _ctx.ptm("table"))), [createBaseVNode("thead", mergeProps({
    "class": _ctx.cx("thead"),
    role: "rowgroup"
  }, _ctx.ptm("thead")), [createBaseVNode("tr", mergeProps({
    role: "row"
  }, _ctx.ptm("headerRow")), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.columns, function(col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || i
    }, [!$options.columnProp(col, "hidden") ? (openBlock(), createBlock(_component_TTHeaderCell, {
      key: 0,
      column: col,
      resizableColumns: _ctx.resizableColumns,
      sortField: $data.d_sortField,
      sortOrder: $data.d_sortOrder,
      multiSortMeta: $data.d_multiSortMeta,
      sortMode: _ctx.sortMode,
      onColumnClick: $options.onColumnHeaderClick,
      onColumnResizestart: $options.onColumnResizeStart,
      index: i,
      pt: _ctx.pt
    }, null, 8, ["column", "resizableColumns", "sortField", "sortOrder", "multiSortMeta", "sortMode", "onColumnClick", "onColumnResizestart", "index", "pt"])) : createCommentVNode("", true)], 64);
  }), 128))], 16), $options.hasColumnFilter() ? (openBlock(), createElementBlock("tr", normalizeProps(mergeProps({
    key: 0
  }, _ctx.ptm("headerRow"))), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.columns, function(col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || i
    }, [!$options.columnProp(col, "hidden") ? (openBlock(), createElementBlock("th", mergeProps({
      key: 0,
      "class": $options.getFilterColumnHeaderClass(col),
      style: [$options.columnProp(col, "style"), $options.columnProp(col, "filterHeaderStyle")]
    }, _ctx.ptm("headerCell", $options.ptHeaderCellOptions(col))), [col.children && col.children.filter ? (openBlock(), createBlock(resolveDynamicComponent(col.children.filter), {
      key: 0,
      column: col,
      index: i
    }, null, 8, ["column", "index"])) : createCommentVNode("", true)], 16)) : createCommentVNode("", true)], 64);
  }), 128))], 16)) : createCommentVNode("", true)], 16), createBaseVNode("tbody", mergeProps({
    "class": _ctx.cx("tbody"),
    role: "rowgroup"
  }, _ctx.ptm("tbody")), [!$options.empty ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList($options.dataToRender, function(node, index) {
    return openBlock(), createBlock(_component_TTRow, {
      key: node.key,
      columns: $options.columns,
      node,
      level: 0,
      expandedKeys: $data.d_expandedKeys,
      indentation: _ctx.indentation,
      selectionMode: _ctx.selectionMode,
      selectionKeys: _ctx.selectionKeys,
      ariaSetSize: $options.dataToRender.length,
      ariaPosInset: index + 1,
      tabindex: $options.setTabindex(node, index),
      templates: _ctx.$slots,
      onNodeToggle: $options.onNodeToggle,
      onNodeClick: $options.onNodeClick,
      onCheckboxChange: $options.onCheckboxChange,
      pt: _ctx.pt
    }, null, 8, ["columns", "node", "expandedKeys", "indentation", "selectionMode", "selectionKeys", "ariaSetSize", "ariaPosInset", "tabindex", "templates", "onNodeToggle", "onNodeClick", "onCheckboxChange", "pt"]);
  }), 128)) : (openBlock(), createElementBlock("tr", mergeProps({
    key: 1,
    "class": _ctx.cx("emptyMessage")
  }, _ctx.ptm("emptyMessage")), [createBaseVNode("td", mergeProps({
    colspan: $options.columns.length
  }, _ctx.ptm("emptyMessageCell")), [renderSlot(_ctx.$slots, "empty")], 16, _hoisted_1)], 16))], 16), $options.hasFooter ? (openBlock(), createElementBlock("tfoot", mergeProps({
    key: 0,
    "class": _ctx.cx("tfoot"),
    role: "rowgroup"
  }, _ctx.ptm("tfoot")), [createBaseVNode("tr", mergeProps({
    role: "row"
  }, _ctx.ptm("footerRow")), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.columns, function(col, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.columnProp(col, "columnKey") || $options.columnProp(col, "field") || i
    }, [!$options.columnProp(col, "hidden") ? (openBlock(), createBlock(_component_TTFooterCell, {
      key: 0,
      column: col,
      index: i,
      pt: _ctx.pt
    }, null, 8, ["column", "index", "pt"])) : createCommentVNode("", true)], 64);
  }), 128))], 16)], 16)) : createCommentVNode("", true)], 16)], 16), $options.paginatorBottom ? (openBlock(), createBlock(_component_TTPaginator, {
    key: 3,
    rows: $data.d_rows,
    first: $data.d_first,
    totalRecords: $options.totalRecordsLength,
    pageLinkSize: _ctx.pageLinkSize,
    template: _ctx.paginatorTemplate,
    rowsPerPageOptions: _ctx.rowsPerPageOptions,
    currentPageReportTemplate: _ctx.currentPageReportTemplate,
    "class": normalizeClass(_ctx.cx("paginator")),
    onPage: _cache[1] || (_cache[1] = function($event) {
      return $options.onPage($event);
    }),
    alwaysShow: _ctx.alwaysShowPaginator,
    unstyled: _ctx.unstyled,
    pt: _ctx.pt,
    "data-pc-section": "paginator"
  }, createSlots({
    _: 2
  }, [_ctx.$slots.paginatorstart ? {
    name: "start",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorstart")];
    }),
    key: "0"
  } : void 0, _ctx.$slots.paginatorend ? {
    name: "end",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorend")];
    }),
    key: "1"
  } : void 0, _ctx.$slots.paginatorfirstpagelinkicon ? {
    name: "firstpagelinkicon",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorfirstpagelinkicon")];
    }),
    key: "2"
  } : void 0, _ctx.$slots.paginatorprevpagelinkicon ? {
    name: "prevpagelinkicon",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorprevpagelinkicon")];
    }),
    key: "3"
  } : void 0, _ctx.$slots.paginatornextpagelinkicon ? {
    name: "nextpagelinkicon",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatornextpagelinkicon")];
    }),
    key: "4"
  } : void 0, _ctx.$slots.paginatorlastpagelinkicon ? {
    name: "lastpagelinkicon",
    fn: withCtx(function() {
      return [renderSlot(_ctx.$slots, "paginatorlastpagelinkicon")];
    }),
    key: "5"
  } : void 0]), 1032, ["rows", "first", "totalRecords", "pageLinkSize", "template", "rowsPerPageOptions", "currentPageReportTemplate", "class", "alwaysShow", "unstyled", "pt"])) : createCommentVNode("", true), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
    key: 4,
    "class": _ctx.cx("footer")
  }, _ctx.ptm("footer")), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true), createBaseVNode("div", mergeProps({
    ref: "resizeHelper",
    "class": _ctx.cx("resizeHelper"),
    style: {
      "display": "none"
    }
  }, _ctx.ptm("resizeHelper")), null, 16)], 16);
}
script11.render = render;
export {
  script11 as default
};
//# sourceMappingURL=primevue_treetable.js.map
