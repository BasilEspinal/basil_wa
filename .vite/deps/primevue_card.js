import {
  script
} from "./chunk-SGVQCNSW.js";
import "./chunk-EGWDZ2T5.js";
import "./chunk-BW6IAHPR.js";
import {
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/card/card.esm.js
var classes = {
  root: "p-card p-component",
  header: "p-card-header",
  body: "p-card-body",
  title: "p-card-title",
  subtitle: "p-card-subtitle",
  content: "p-card-content",
  footer: "p-card-footer"
};
var script$1 = {
  name: "BaseCard",
  "extends": script,
  css: {
    classes
  }
};
var script2 = {
  name: "Card",
  "extends": script$1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "card"
  }), [_ctx.$slots.header ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx("header")
  }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header")], 16)) : createCommentVNode("", true), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("body")
  }, _ctx.ptm("body")), [_ctx.$slots.title ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx("title")
  }, _ctx.ptm("title")), [renderSlot(_ctx.$slots, "title")], 16)) : createCommentVNode("", true), _ctx.$slots.subtitle ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": _ctx.cx("subtitle")
  }, _ctx.ptm("subtitle")), [renderSlot(_ctx.$slots, "subtitle")], 16)) : createCommentVNode("", true), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("content")
  }, _ctx.ptm("content")), [renderSlot(_ctx.$slots, "content")], 16), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
    key: 2,
    "class": _ctx.cx("footer")
  }, _ctx.ptm("footer")), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true)], 16)], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_card.js.map
