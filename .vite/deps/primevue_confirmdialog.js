import {
  ConfirmationEventBus
} from "./chunk-5VBM3IBD.js";
import {
  script as script3
} from "./chunk-MD77P2Z2.js";
import "./chunk-7TCJUKDS.js";
import "./chunk-UZ2LBG6P.js";
import {
  script as script2
} from "./chunk-ABUQWYRJ.js";
import "./chunk-LMPXBVVT.js";
import "./chunk-VIXWB2UQ.js";
import "./chunk-DPSQVM4P.js";
import "./chunk-GOLRNOIJ.js";
import "./chunk-OJR2HVJ6.js";
import "./chunk-NBABGO3D.js";
import {
  script
} from "./chunk-SGVQCNSW.js";
import "./chunk-EGWDZ2T5.js";
import "./chunk-BW6IAHPR.js";
import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createVNode,
  mergeProps,
  normalizeClass,
  openBlock,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  toDisplayString,
  withCtx
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/confirmdialog/confirmdialog.esm.js
var classes = {
  root: "p-confirm-dialog",
  icon: function icon(_ref) {
    var instance = _ref.instance;
    return ["p-confirm-dialog-icon", instance.confirmation ? instance.confirmation.icon : null];
  },
  message: "p-confirm-dialog-message",
  rejectButton: function rejectButton(_ref2) {
    var instance = _ref2.instance;
    return ["p-confirm-dialog-reject", instance.confirmation ? instance.confirmation.rejectClass || "p-button-text" : null];
  },
  acceptButton: function acceptButton(_ref3) {
    var instance = _ref3.instance;
    return ["p-confirm-dialog-accept", instance.confirmation ? instance.confirmation.acceptClass : null];
  }
};
var script$1 = {
  name: "BaseConfirmDialog",
  "extends": script,
  props: {
    group: String,
    breakpoints: {
      type: Object,
      "default": null
    },
    draggable: {
      type: Boolean,
      "default": true
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
var script4 = {
  name: "ConfirmDialog",
  "extends": script$1,
  confirmListener: null,
  closeListener: null,
  data: function data() {
    return {
      visible: false,
      confirmation: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    this.confirmListener = function(options) {
      if (!options) {
        return;
      }
      if (options.group === _this.group) {
        _this.confirmation = options;
        if (_this.confirmation.onShow) {
          _this.confirmation.onShow();
        }
        _this.visible = true;
      }
    };
    this.closeListener = function() {
      _this.visible = false;
      _this.confirmation = null;
    };
    ConfirmationEventBus.on("confirm", this.confirmListener);
    ConfirmationEventBus.on("close", this.closeListener);
  },
  beforeUnmount: function beforeUnmount() {
    ConfirmationEventBus.off("confirm", this.confirmListener);
    ConfirmationEventBus.off("close", this.closeListener);
  },
  methods: {
    accept: function accept() {
      if (this.confirmation.accept) {
        this.confirmation.accept();
      }
      this.visible = false;
    },
    reject: function reject() {
      if (this.confirmation.reject) {
        this.confirmation.reject();
      }
      this.visible = false;
    },
    onHide: function onHide() {
      if (this.confirmation.onHide) {
        this.confirmation.onHide();
      }
      this.visible = false;
    },
    getCXOptions: function getCXOptions(icon2, iconProps) {
      return {
        contenxt: {
          icon: icon2,
          iconClass: iconProps["class"]
        }
      };
    }
  },
  computed: {
    header: function header() {
      return this.confirmation ? this.confirmation.header : null;
    },
    message: function message() {
      return this.confirmation ? this.confirmation.message : null;
    },
    blockScroll: function blockScroll() {
      return this.confirmation ? this.confirmation.blockScroll : true;
    },
    position: function position() {
      return this.confirmation ? this.confirmation.position : null;
    },
    acceptLabel: function acceptLabel() {
      return this.confirmation ? this.confirmation.acceptLabel || this.$primevue.config.locale.accept : null;
    },
    rejectLabel: function rejectLabel() {
      return this.confirmation ? this.confirmation.rejectLabel || this.$primevue.config.locale.reject : null;
    },
    acceptIcon: function acceptIcon() {
      return this.confirmation ? this.confirmation.acceptIcon : null;
    },
    rejectIcon: function rejectIcon() {
      return this.confirmation ? this.confirmation.rejectIcon : null;
    },
    autoFocusAccept: function autoFocusAccept() {
      return this.confirmation.defaultFocus === void 0 || this.confirmation.defaultFocus === "accept" ? true : false;
    },
    autoFocusReject: function autoFocusReject() {
      return this.confirmation.defaultFocus === "reject" ? true : false;
    },
    closeOnEscape: function closeOnEscape() {
      return this.confirmation ? this.confirmation.closeOnEscape : true;
    }
  },
  components: {
    CDialog: script3,
    CDButton: script2
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CDButton = resolveComponent("CDButton");
  var _component_CDialog = resolveComponent("CDialog");
  return openBlock(), createBlock(_component_CDialog, {
    visible: $data.visible,
    "onUpdate:visible": [_cache[2] || (_cache[2] = function($event) {
      return $data.visible = $event;
    }), $options.onHide],
    role: "alertdialog",
    "class": normalizeClass(_ctx.cx("root")),
    modal: true,
    header: $options.header,
    blockScroll: $options.blockScroll,
    position: $options.position,
    breakpoints: _ctx.breakpoints,
    closeOnEscape: $options.closeOnEscape,
    draggable: _ctx.draggable,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, {
    footer: withCtx(function() {
      return [createVNode(_component_CDButton, {
        label: $options.rejectLabel,
        "class": normalizeClass(_ctx.cx("rejectButton")),
        onClick: _cache[0] || (_cache[0] = function($event) {
          return $options.reject();
        }),
        autofocus: $options.autoFocusReject,
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm("rejectButton"),
        "data-pc-name": "rejectbutton"
      }, createSlots({
        _: 2
      }, [$options.rejectIcon || _ctx.$slots.rejecticon ? {
        name: "icon",
        fn: withCtx(function(iconProps) {
          return [renderSlot(_ctx.$slots, "rejecticon", {}, function() {
            return [createBaseVNode("span", mergeProps({
              "class": [$options.rejectIcon, iconProps["class"]]
            }, _ctx.ptm("rejectButton")["icon"], {
              "data-pc-name": "rejectbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : void 0]), 1032, ["label", "class", "autofocus", "unstyled", "pt"]), createVNode(_component_CDButton, {
        label: $options.acceptLabel,
        "class": normalizeClass(_ctx.cx("acceptButton")),
        onClick: _cache[1] || (_cache[1] = function($event) {
          return $options.accept();
        }),
        autofocus: $options.autoFocusAccept,
        unstyled: _ctx.unstyled,
        pt: _ctx.ptm("acceptButton"),
        "data-pc-name": "acceptbutton"
      }, createSlots({
        _: 2
      }, [$options.acceptIcon || _ctx.$slots.accepticon ? {
        name: "icon",
        fn: withCtx(function(iconProps) {
          return [renderSlot(_ctx.$slots, "accepticon", {}, function() {
            return [createBaseVNode("span", mergeProps({
              "class": [$options.acceptIcon, iconProps["class"]]
            }, _ctx.ptm("acceptButton")["icon"], {
              "data-pc-name": "acceptbuttonicon"
            }), null, 16)];
          })];
        }),
        key: "0"
      } : void 0]), 1032, ["label", "class", "autofocus", "unstyled", "pt"])];
    }),
    "default": withCtx(function() {
      return [!_ctx.$slots.message ? (openBlock(), createElementBlock(Fragment, {
        key: 0
      }, [renderSlot(_ctx.$slots, "icon", {}, function() {
        return [_ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), {
          key: 0,
          "class": normalizeClass(_ctx.cx("icon"))
        }, null, 8, ["class"])) : $data.confirmation.icon ? (openBlock(), createElementBlock("span", mergeProps({
          key: 1,
          "class": _ctx.cx("icon")
        }, _ctx.ptm("icon")), null, 16)) : createCommentVNode("", true)];
      }), createBaseVNode("span", mergeProps({
        "class": _ctx.cx("message")
      }, _ctx.ptm("message")), toDisplayString($options.message), 17)], 64)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.message), {
        key: 1,
        message: $data.confirmation
      }, null, 8, ["message"]))];
    }),
    _: 3
  }, 8, ["visible", "class", "header", "blockScroll", "position", "breakpoints", "closeOnEscape", "draggable", "onUpdate:visible", "pt", "unstyled"]);
}
script4.render = render;
export {
  script4 as default
};
//# sourceMappingURL=primevue_confirmdialog.js.map
