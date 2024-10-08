import {
  DomHandler
} from "./chunk-BW6IAHPR.js";
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  readonly,
  ref,
  watch
} from "./chunk-WD2BNHP7.js";

// node_modules/primevue/usestyle/usestyle.esm.js
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
var _id = 0;
function useStyle(css) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css);
  var styleRef = ref(null);
  var defaultDocument = DomHandler.isClient() ? window.document : void 0;
  var _options$document = options.document, document = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media;
  var stop = function stop2() {
  };
  var load = function load2() {
    if (!document)
      return;
    styleRef.value = document.querySelector('style[data-primevue-style-id="'.concat(name, '"]')) || document.getElementById(id) || document.createElement("style");
    if (!styleRef.value.isConnected) {
      styleRef.value.type = "text/css";
      id && (styleRef.value.id = id);
      media && (styleRef.value.media = media);
      document.head.appendChild(styleRef.value);
      name && styleRef.value.setAttribute("data-primevue-style-id", name);
    }
    if (isLoaded.value)
      return;
    stop = watch(cssRef, function(value) {
      styleRef.value.textContent = value;
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload2() {
    if (!document || !isLoaded.value)
      return;
    stop();
    DomHandler.isExist(styleRef.value) && document.head.removeChild(styleRef.value);
    isLoaded.value = false;
  };
  if (immediate && !manual)
    tryOnMounted(load);
  return {
    id,
    name,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}

// node_modules/primevue/base/base.esm.js
var styles = "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n}\n";
var _useStyle = useStyle(styles, {
  name: "base",
  manual: true
});
var loadBaseStyle = _useStyle.load;

export {
  useStyle,
  loadBaseStyle
};
//# sourceMappingURL=chunk-EGWDZ2T5.js.map
