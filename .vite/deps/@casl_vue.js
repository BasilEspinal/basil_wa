import {
  PureAbility
} from "./chunk-FFGRBYBY.js";
import {
  defineComponent,
  inject,
  provide,
  ref
} from "./chunk-WD2BNHP7.js";

// node_modules/@casl/vue/dist/es6m/index.mjs
function reactiveAbility(i) {
  if (i.hasOwnProperty("possibleRulesFor"))
    return i;
  const n = ref(true);
  i.on("updated", () => {
    n.value = !n.value;
  });
  const r = i.possibleRulesFor.bind(i);
  i.possibleRulesFor = (t, i2) => {
    n.value = n.value;
    return r(t, i2);
  };
  i.can = i.can.bind(i);
  i.cannot = i.cannot.bind(i);
  return i;
}
var e = Symbol("ability");
function useAbility() {
  const t = inject(e);
  if (!t)
    throw new Error("Cannot inject Ability instance because it was not provided");
  return t;
}
function provideAbility(t) {
  provide(e, reactiveAbility(t));
}
function s(t) {
  if (void 0 !== t.a)
    return "a";
  if (void 0 !== t.this)
    return "this";
  if (void 0 !== t.an)
    return "an";
  return "";
}
var u = defineComponent({ name: "Can", props: { I: String, do: String, a: [String, Function], an: [String, Function], this: [String, Function, Object], on: [String, Function, Object], not: Boolean, passThrough: Boolean, field: String }, setup(t, { slots: i }) {
  const n = t;
  let r = "do";
  let o = "on";
  if (void 0 === n[r]) {
    r = "I";
    o = s(t);
  }
  if (!n[r])
    throw new Error("Neither `I` nor `do` prop was passed in <Can>");
  if (!i.default)
    throw new Error("Expects to receive default slot");
  const e2 = useAbility();
  return () => {
    const s2 = e2.can(n[r], n[o], n.field);
    const u2 = t.not ? !s2 : s2;
    if (!t.passThrough)
      return u2 ? i.default() : null;
    return i.default({ allowed: u2, ability: e2 });
  };
} });
function l(t, i, n) {
  if (!i || !(i instanceof PureAbility))
    throw new Error("Please provide an Ability instance to abilitiesPlugin plugin");
  t.provide(e, reactiveAbility(i));
  if (n && n.useGlobalProperties) {
    t.config.globalProperties.$ability = i;
    t.config.globalProperties.$can = i.can.bind(i);
  }
}
export {
  e as ABILITY_TOKEN,
  u as Can,
  l as abilitiesPlugin,
  provideAbility,
  useAbility
};
//# sourceMappingURL=@casl_vue.js.map
