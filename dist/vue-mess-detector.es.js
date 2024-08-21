import ae from "node:fs/promises";
import oe from "node:path";
import yn from "yargs";
import { format as Dt, inspect as En } from "util";
import { normalize as wn, resolve as le, dirname as We, basename as vn, extname as On, relative as An } from "path";
import { readFileSync as Et, statSync as Ut, readdirSync as xn, writeFile as Cn } from "fs";
import { notStrictEqual as Sn, strictEqual as _n } from "assert";
import { fileURLToPath as Nn } from "url";
import { parse as Rn } from "@vue/compiler-sfc";
class pe extends Error {
  constructor(t) {
    super(t || "yargs error"), this.name = "YError", Error.captureStackTrace && Error.captureStackTrace(this, pe);
  }
}
function Ht() {
  return jn() ? 0 : 1;
}
function jn() {
  return Ln() && !process.defaultApp;
}
function Ln() {
  return !!process.versions.electron;
}
function Pn(e) {
  return e.slice(Ht() + 1);
}
function Tn() {
  return process.argv[Ht()];
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function he(e) {
  if (e !== e.toLowerCase() && e !== e.toUpperCase() || (e = e.toLowerCase()), e.indexOf("-") === -1 && e.indexOf("_") === -1)
    return e;
  {
    let n = "", s = !1;
    const o = e.match(/^-+/);
    for (let i = o ? o[0].length : 0; i < e.length; i++) {
      let l = e.charAt(i);
      s && (s = !1, l = l.toUpperCase()), i !== 0 && (l === "-" || l === "_") ? s = !0 : l !== "-" && l !== "_" && (n += l);
    }
    return n;
  }
}
function Vt(e, t) {
  const n = e.toLowerCase();
  t = t || "-";
  let s = "";
  for (let o = 0; o < e.length; o++) {
    const i = n.charAt(o), l = e.charAt(o);
    i !== l && o > 0 ? s += `${t}${n.charAt(o)}` : s += l;
  }
  return s;
}
function Gt(e) {
  return e == null ? !1 : typeof e == "number" || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^0[^.]/.test(e) ? !1 : /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e);
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
function Fn(e) {
  if (Array.isArray(e))
    return e.map((l) => typeof l != "string" ? l + "" : l);
  e = e.trim();
  let t = 0, n = null, s = null, o = null;
  const i = [];
  for (let l = 0; l < e.length; l++) {
    if (n = s, s = e.charAt(l), s === " " && !o) {
      n !== " " && t++;
      continue;
    }
    s === o ? o = null : (s === "'" || s === '"') && !o && (o = s), i[t] || (i[t] = ""), i[t] += s;
  }
  return i;
}
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var K;
(function(e) {
  e.BOOLEAN = "boolean", e.STRING = "string", e.NUMBER = "number", e.ARRAY = "array";
})(K || (K = {}));
/**
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
let J;
class Wn {
  constructor(t) {
    J = t;
  }
  parse(t, n) {
    const s = Object.assign({
      alias: void 0,
      array: void 0,
      boolean: void 0,
      config: void 0,
      configObjects: void 0,
      configuration: void 0,
      coerce: void 0,
      count: void 0,
      default: void 0,
      envPrefix: void 0,
      narg: void 0,
      normalize: void 0,
      string: void 0,
      number: void 0,
      __: void 0,
      key: void 0
    }, n), o = Fn(t), i = typeof t == "string", l = In(Object.assign(/* @__PURE__ */ Object.create(null), s.alias)), h = Object.assign({
      "boolean-negation": !0,
      "camel-case-expansion": !0,
      "combine-arrays": !1,
      "dot-notation": !0,
      "duplicate-arguments-array": !0,
      "flatten-duplicate-arrays": !0,
      "greedy-arrays": !0,
      "halt-at-non-option": !1,
      "nargs-eats-options": !1,
      "negation-prefix": "no-",
      "parse-numbers": !0,
      "parse-positional-numbers": !0,
      "populate--": !1,
      "set-placeholder-key": !1,
      "short-option-groups": !0,
      "strip-aliased": !1,
      "strip-dashed": !1,
      "unknown-options-as-args": !1
    }, s.configuration), b = Object.assign(/* @__PURE__ */ Object.create(null), s.default), O = s.configObjects || [], v = s.envPrefix, _ = h["populate--"], N = _ ? "--" : "_", Z = /* @__PURE__ */ Object.create(null), re = /* @__PURE__ */ Object.create(null), ne = s.__ || J.format, f = {
      aliases: /* @__PURE__ */ Object.create(null),
      arrays: /* @__PURE__ */ Object.create(null),
      bools: /* @__PURE__ */ Object.create(null),
      strings: /* @__PURE__ */ Object.create(null),
      numbers: /* @__PURE__ */ Object.create(null),
      counts: /* @__PURE__ */ Object.create(null),
      normalize: /* @__PURE__ */ Object.create(null),
      configs: /* @__PURE__ */ Object.create(null),
      nargs: /* @__PURE__ */ Object.create(null),
      coercions: /* @__PURE__ */ Object.create(null),
      keys: []
    }, Q = /^-([0-9]+(\.[0-9]+)?|\.[0-9]+)$/, Se = new RegExp("^--" + h["negation-prefix"] + "(.+)");
    [].concat(s.array || []).filter(Boolean).forEach(function(r) {
      const a = typeof r == "object" ? r.key : r, p = Object.keys(r).map(function(u) {
        return {
          boolean: "bools",
          string: "strings",
          number: "numbers"
        }[u];
      }).filter(Boolean).pop();
      p && (f[p][a] = !0), f.arrays[a] = !0, f.keys.push(a);
    }), [].concat(s.boolean || []).filter(Boolean).forEach(function(r) {
      f.bools[r] = !0, f.keys.push(r);
    }), [].concat(s.string || []).filter(Boolean).forEach(function(r) {
      f.strings[r] = !0, f.keys.push(r);
    }), [].concat(s.number || []).filter(Boolean).forEach(function(r) {
      f.numbers[r] = !0, f.keys.push(r);
    }), [].concat(s.count || []).filter(Boolean).forEach(function(r) {
      f.counts[r] = !0, f.keys.push(r);
    }), [].concat(s.normalize || []).filter(Boolean).forEach(function(r) {
      f.normalize[r] = !0, f.keys.push(r);
    }), typeof s.narg == "object" && Object.entries(s.narg).forEach(([r, a]) => {
      typeof a == "number" && (f.nargs[r] = a, f.keys.push(r));
    }), typeof s.coerce == "object" && Object.entries(s.coerce).forEach(([r, a]) => {
      typeof a == "function" && (f.coercions[r] = a, f.keys.push(r));
    }), typeof s.config < "u" && (Array.isArray(s.config) || typeof s.config == "string" ? [].concat(s.config).filter(Boolean).forEach(function(r) {
      f.configs[r] = !0;
    }) : typeof s.config == "object" && Object.entries(s.config).forEach(([r, a]) => {
      (typeof a == "boolean" || typeof a == "function") && (f.configs[r] = a);
    })), hn(s.key, l, s.default, f.arrays), Object.keys(b).forEach(function(r) {
      (f.aliases[r] || []).forEach(function(a) {
        b[a] = b[r];
      });
    });
    let V = null;
    bn();
    let $e = [];
    const P = Object.assign(/* @__PURE__ */ Object.create(null), { _: [] }), wt = {};
    for (let r = 0; r < o.length; r++) {
      const a = o[r], p = a.replace(/^-{3,}/, "---");
      let u, c, g, d, y, F;
      if (a !== "--" && /^-/.test(a) && we(a))
        _e(a);
      else if (p.match(/^---+(=|$)/)) {
        _e(a);
        continue;
      } else if (a.match(/^--.+=/) || !h["short-option-groups"] && a.match(/^-.+=/))
        d = a.match(/^--?([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && (w(d[1], f.arrays) ? r = ye(r, d[1], o, d[2]) : w(d[1], f.nargs) !== !1 ? r = be(r, d[1], o, d[2]) : j(d[1], d[2], !0));
      else if (a.match(Se) && h["boolean-negation"])
        d = a.match(Se), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], j(c, w(c, f.arrays) ? [!1] : !1));
      else if (a.match(/^--.+/) || !h["short-option-groups"] && a.match(/^-[^-]+/))
        d = a.match(/^--?(.+)/), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], w(c, f.arrays) ? r = ye(r, c, o) : w(c, f.nargs) !== !1 ? r = be(r, c, o) : (y = o[r + 1], y !== void 0 && (!y.match(/^-/) || y.match(Q)) && !w(c, f.bools) && !w(c, f.counts) || /^(true|false)$/.test(y) ? (j(c, y), r++) : j(c, ie(c))));
      else if (a.match(/^-.\..+=/))
        d = a.match(/^-([^=]+)=([\s\S]*)$/), d !== null && Array.isArray(d) && d.length >= 3 && j(d[1], d[2]);
      else if (a.match(/^-.\..+/) && !a.match(Q))
        y = o[r + 1], d = a.match(/^-(.\..+)/), d !== null && Array.isArray(d) && d.length >= 2 && (c = d[1], y !== void 0 && !y.match(/^-/) && !w(c, f.bools) && !w(c, f.counts) ? (j(c, y), r++) : j(c, ie(c)));
      else if (a.match(/^-[^-]+/) && !a.match(Q)) {
        g = a.slice(1, -1).split(""), u = !1;
        for (let W = 0; W < g.length; W++) {
          if (y = a.slice(W + 2), g[W + 1] && g[W + 1] === "=") {
            F = a.slice(W + 3), c = g[W], w(c, f.arrays) ? r = ye(r, c, o, F) : w(c, f.nargs) !== !1 ? r = be(r, c, o, F) : j(c, F), u = !0;
            break;
          }
          if (y === "-") {
            j(g[W], y);
            continue;
          }
          if (/[A-Za-z]/.test(g[W]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(y) && w(y, f.bools) === !1) {
            j(g[W], y), u = !0;
            break;
          }
          if (g[W + 1] && g[W + 1].match(/\W/)) {
            j(g[W], y), u = !0;
            break;
          } else
            j(g[W], ie(g[W]));
        }
        c = a.slice(-1)[0], !u && c !== "-" && (w(c, f.arrays) ? r = ye(r, c, o) : w(c, f.nargs) !== !1 ? r = be(r, c, o) : (y = o[r + 1], y !== void 0 && (!/^(-|--)[^-]/.test(y) || y.match(Q)) && !w(c, f.bools) && !w(c, f.counts) || /^(true|false)$/.test(y) ? (j(c, y), r++) : j(c, ie(c))));
      } else if (a.match(/^-[0-9]$/) && a.match(Q) && w(a.slice(1), f.bools))
        c = a.slice(1), j(c, ie(c));
      else if (a === "--") {
        $e = o.slice(r + 1);
        break;
      } else if (h["halt-at-non-option"]) {
        $e = o.slice(r);
        break;
      } else
        _e(a);
    }
    Ot(P, !0), Ot(P, !1), an(P), ln(), At(P, f.aliases, b, !0), un(P), h["set-placeholder-key"] && fn(P), Object.keys(f.counts).forEach(function(r) {
      ue(P, r.split(".")) || j(r, 0);
    }), _ && $e.length && (P[N] = []), $e.forEach(function(r) {
      P[N].push(r);
    }), h["camel-case-expansion"] && h["strip-dashed"] && Object.keys(P).filter((r) => r !== "--" && r.includes("-")).forEach((r) => {
      delete P[r];
    }), h["strip-aliased"] && [].concat(...Object.keys(l).map((r) => l[r])).forEach((r) => {
      h["camel-case-expansion"] && r.includes("-") && delete P[r.split(".").map((a) => he(a)).join(".")], delete P[r];
    });
    function _e(r) {
      const a = Ee("_", r);
      (typeof a == "string" || typeof a == "number") && P._.push(a);
    }
    function be(r, a, p, u) {
      let c, g = w(a, f.nargs);
      if (g = typeof g != "number" || isNaN(g) ? 1 : g, g === 0)
        return X(u) || (V = Error(ne("Argument unexpected for: %s", a))), j(a, ie(a)), r;
      let d = X(u) ? 0 : 1;
      if (h["nargs-eats-options"])
        p.length - (r + 1) + d < g && (V = Error(ne("Not enough arguments following: %s", a))), d = g;
      else {
        for (c = r + 1; c < p.length && (!p[c].match(/^-[^0-9]/) || p[c].match(Q) || we(p[c])); c++)
          d++;
        d < g && (V = Error(ne("Not enough arguments following: %s", a)));
      }
      let y = Math.min(d, g);
      for (!X(u) && y > 0 && (j(a, u), y--), c = r + 1; c < y + r + 1; c++)
        j(a, p[c]);
      return r + y;
    }
    function ye(r, a, p, u) {
      let c = [], g = u || p[r + 1];
      const d = w(a, f.nargs);
      if (w(a, f.bools) && !/^(true|false)$/.test(g))
        c.push(!0);
      else if (X(g) || X(u) && /^-/.test(g) && !Q.test(g) && !we(g)) {
        if (b[a] !== void 0) {
          const y = b[a];
          c = Array.isArray(y) ? y : [y];
        }
      } else {
        X(u) || c.push(Ne(a, u, !0));
        for (let y = r + 1; y < p.length && !(!h["greedy-arrays"] && c.length > 0 || d && typeof d == "number" && c.length >= d || (g = p[y], /^-/.test(g) && !Q.test(g) && !we(g))); y++)
          r = y, c.push(Ne(a, g, i));
      }
      return typeof d == "number" && (d && c.length < d || isNaN(d) && c.length === 0) && (V = Error(ne("Not enough arguments following: %s", a))), j(a, c), r;
    }
    function j(r, a, p = i) {
      if (/-/.test(r) && h["camel-case-expansion"]) {
        const g = r.split(".").map(function(d) {
          return he(d);
        }).join(".");
        vt(r, g);
      }
      const u = Ne(r, a, p), c = r.split(".");
      fe(P, c, u), f.aliases[r] && f.aliases[r].forEach(function(g) {
        const d = g.split(".");
        fe(P, d, u);
      }), c.length > 1 && h["dot-notation"] && (f.aliases[c[0]] || []).forEach(function(g) {
        let d = g.split(".");
        const y = [].concat(c);
        y.shift(), d = d.concat(y), (f.aliases[r] || []).includes(d.join(".")) || fe(P, d, u);
      }), w(r, f.normalize) && !w(r, f.arrays) && [r].concat(f.aliases[r] || []).forEach(function(d) {
        Object.defineProperty(wt, d, {
          enumerable: !0,
          get() {
            return a;
          },
          set(y) {
            a = typeof y == "string" ? J.normalize(y) : y;
          }
        });
      });
    }
    function vt(r, a) {
      f.aliases[r] && f.aliases[r].length || (f.aliases[r] = [a], Z[a] = !0), f.aliases[a] && f.aliases[a].length || vt(a, r);
    }
    function Ne(r, a, p) {
      p && (a = Bn(a)), (w(r, f.bools) || w(r, f.counts)) && typeof a == "string" && (a = a === "true");
      let u = Array.isArray(a) ? a.map(function(c) {
        return Ee(r, c);
      }) : Ee(r, a);
      return w(r, f.counts) && (X(u) || typeof u == "boolean") && (u = je()), w(r, f.normalize) && w(r, f.arrays) && (Array.isArray(a) ? u = a.map((c) => J.normalize(c)) : u = J.normalize(a)), u;
    }
    function Ee(r, a) {
      return !h["parse-positional-numbers"] && r === "_" || !w(r, f.strings) && !w(r, f.bools) && !Array.isArray(a) && (Gt(a) && h["parse-numbers"] && Number.isSafeInteger(Math.floor(parseFloat(`${a}`))) || !X(a) && w(r, f.numbers)) && (a = Number(a)), a;
    }
    function an(r) {
      const a = /* @__PURE__ */ Object.create(null);
      At(a, f.aliases, b), Object.keys(f.configs).forEach(function(p) {
        const u = r[p] || a[p];
        if (u)
          try {
            let c = null;
            const g = J.resolve(J.cwd(), u), d = f.configs[p];
            if (typeof d == "function") {
              try {
                c = d(g);
              } catch (y) {
                c = y;
              }
              if (c instanceof Error) {
                V = c;
                return;
              }
            } else
              c = J.require(g);
            Re(c);
          } catch (c) {
            c.name === "PermissionDenied" ? V = c : r[p] && (V = Error(ne("Invalid JSON config file: %s", u)));
          }
      });
    }
    function Re(r, a) {
      Object.keys(r).forEach(function(p) {
        const u = r[p], c = a ? a + "." + p : p;
        typeof u == "object" && u !== null && !Array.isArray(u) && h["dot-notation"] ? Re(u, c) : (!ue(P, c.split(".")) || w(c, f.arrays) && h["combine-arrays"]) && j(c, u);
      });
    }
    function ln() {
      typeof O < "u" && O.forEach(function(r) {
        Re(r);
      });
    }
    function Ot(r, a) {
      if (typeof v > "u")
        return;
      const p = typeof v == "string" ? v : "", u = J.env();
      Object.keys(u).forEach(function(c) {
        if (p === "" || c.lastIndexOf(p, 0) === 0) {
          const g = c.split("__").map(function(d, y) {
            return y === 0 && (d = d.substring(p.length)), he(d);
          });
          (a && f.configs[g.join(".")] || !a) && !ue(r, g) && j(g.join("."), u[c]);
        }
      });
    }
    function un(r) {
      let a;
      const p = /* @__PURE__ */ new Set();
      Object.keys(r).forEach(function(u) {
        if (!p.has(u) && (a = w(u, f.coercions), typeof a == "function"))
          try {
            const c = Ee(u, a(r[u]));
            [].concat(f.aliases[u] || [], u).forEach((g) => {
              p.add(g), r[g] = c;
            });
          } catch (c) {
            V = c;
          }
      });
    }
    function fn(r) {
      return f.keys.forEach((a) => {
        ~a.indexOf(".") || typeof r[a] > "u" && (r[a] = void 0);
      }), r;
    }
    function At(r, a, p, u = !1) {
      Object.keys(p).forEach(function(c) {
        ue(r, c.split(".")) || (fe(r, c.split("."), p[c]), u && (re[c] = !0), (a[c] || []).forEach(function(g) {
          ue(r, g.split(".")) || fe(r, g.split("."), p[c]);
        }));
      });
    }
    function ue(r, a) {
      let p = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(c) {
        p = p[c] || {};
      });
      const u = a[a.length - 1];
      return typeof p != "object" ? !1 : u in p;
    }
    function fe(r, a, p) {
      let u = r;
      h["dot-notation"] || (a = [a.join(".")]), a.slice(0, -1).forEach(function(F) {
        F = Ct(F), typeof u == "object" && u[F] === void 0 && (u[F] = {}), typeof u[F] != "object" || Array.isArray(u[F]) ? (Array.isArray(u[F]) ? u[F].push({}) : u[F] = [u[F], {}], u = u[F][u[F].length - 1]) : u = u[F];
      });
      const c = Ct(a[a.length - 1]), g = w(a.join("."), f.arrays), d = Array.isArray(p);
      let y = h["duplicate-arguments-array"];
      !y && w(c, f.nargs) && (y = !0, (!X(u[c]) && f.nargs[c] === 1 || Array.isArray(u[c]) && u[c].length === f.nargs[c]) && (u[c] = void 0)), p === je() ? u[c] = je(u[c]) : Array.isArray(u[c]) ? y && g && d ? u[c] = h["flatten-duplicate-arrays"] ? u[c].concat(p) : (Array.isArray(u[c][0]) ? u[c] : [u[c]]).concat([p]) : !y && !!g == !!d ? u[c] = p : u[c] = u[c].concat([p]) : u[c] === void 0 && g ? u[c] = d ? p : [p] : y && !(u[c] === void 0 || w(c, f.counts) || w(c, f.bools)) ? u[c] = [u[c], p] : u[c] = p;
    }
    function hn(...r) {
      r.forEach(function(a) {
        Object.keys(a || {}).forEach(function(p) {
          f.aliases[p] || (f.aliases[p] = [].concat(l[p] || []), f.aliases[p].concat(p).forEach(function(u) {
            if (/-/.test(u) && h["camel-case-expansion"]) {
              const c = he(u);
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), Z[c] = !0);
            }
          }), f.aliases[p].concat(p).forEach(function(u) {
            if (u.length > 1 && /[A-Z]/.test(u) && h["camel-case-expansion"]) {
              const c = Vt(u, "-");
              c !== p && f.aliases[p].indexOf(c) === -1 && (f.aliases[p].push(c), Z[c] = !0);
            }
          }), f.aliases[p].forEach(function(u) {
            f.aliases[u] = [p].concat(f.aliases[p].filter(function(c) {
              return u !== c;
            }));
          }));
        });
      });
    }
    function w(r, a) {
      const p = [].concat(f.aliases[r] || [], r), u = Object.keys(a), c = p.find((g) => u.includes(g));
      return c ? a[c] : !1;
    }
    function xt(r) {
      const a = Object.keys(f);
      return [].concat(a.map((u) => f[u])).some(function(u) {
        return Array.isArray(u) ? u.includes(r) : u[r];
      });
    }
    function pn(r, ...a) {
      return [].concat(...a).some(function(u) {
        const c = r.match(u);
        return c && xt(c[1]);
      });
    }
    function mn(r) {
      if (r.match(Q) || !r.match(/^-[^-]+/))
        return !1;
      let a = !0, p;
      const u = r.slice(1).split("");
      for (let c = 0; c < u.length; c++) {
        if (p = r.slice(c + 2), !xt(u[c])) {
          a = !1;
          break;
        }
        if (u[c + 1] && u[c + 1] === "=" || p === "-" || /[A-Za-z]/.test(u[c]) && /^-?\d+(\.\d*)?(e-?\d+)?$/.test(p) || u[c + 1] && u[c + 1].match(/\W/))
          break;
      }
      return a;
    }
    function we(r) {
      return h["unknown-options-as-args"] && dn(r);
    }
    function dn(r) {
      return r = r.replace(/^-{3,}/, "--"), r.match(Q) || mn(r) ? !1 : !pn(r, /^-+([^=]+?)=[\s\S]*$/, Se, /^-+([^=]+?)$/, /^-+([^=]+?)-$/, /^-+([^=]+?\d+)$/, /^-+([^=]+?)\W+.*$/);
    }
    function ie(r) {
      return !w(r, f.bools) && !w(r, f.counts) && `${r}` in b ? b[r] : gn($n(r));
    }
    function gn(r) {
      return {
        [K.BOOLEAN]: !0,
        [K.STRING]: "",
        [K.NUMBER]: void 0,
        [K.ARRAY]: []
      }[r];
    }
    function $n(r) {
      let a = K.BOOLEAN;
      return w(r, f.strings) ? a = K.STRING : w(r, f.numbers) ? a = K.NUMBER : w(r, f.bools) ? a = K.BOOLEAN : w(r, f.arrays) && (a = K.ARRAY), a;
    }
    function X(r) {
      return r === void 0;
    }
    function bn() {
      Object.keys(f.counts).find((r) => w(r, f.arrays) ? (V = Error(ne("Invalid configuration: %s, opts.count excludes opts.array.", r)), !0) : w(r, f.nargs) ? (V = Error(ne("Invalid configuration: %s, opts.count excludes opts.narg.", r)), !0) : !1);
    }
    return {
      aliases: Object.assign({}, f.aliases),
      argv: Object.assign(wt, P),
      configuration: h,
      defaulted: Object.assign({}, re),
      error: V,
      newAliases: Object.assign({}, Z)
    };
  }
}
function In(e) {
  const t = [], n = /* @__PURE__ */ Object.create(null);
  let s = !0;
  for (Object.keys(e).forEach(function(o) {
    t.push([].concat(e[o], o));
  }); s; ) {
    s = !1;
    for (let o = 0; o < t.length; o++)
      for (let i = o + 1; i < t.length; i++)
        if (t[o].filter(function(h) {
          return t[i].indexOf(h) !== -1;
        }).length) {
          t[o] = t[o].concat(t[i]), t.splice(i, 1), s = !0;
          break;
        }
  }
  return t.forEach(function(o) {
    o = o.filter(function(l, h, b) {
      return b.indexOf(l) === h;
    });
    const i = o.pop();
    i !== void 0 && typeof i == "string" && (n[i] = o);
  }), n;
}
function je(e) {
  return e !== void 0 ? e + 1 : 1;
}
function Ct(e) {
  return e === "__proto__" ? "___proto___" : e;
}
function Bn(e) {
  return typeof e == "string" && (e[0] === "'" || e[0] === '"') && e[e.length - 1] === e[0] ? e.substring(1, e.length - 1) : e;
}
/**
 * @fileoverview Main entrypoint for libraries using yargs-parser in Node.js
 * CJS and ESM environments.
 *
 * @license
 * Copyright (c) 2016, Contributors
 * SPDX-License-Identifier: ISC
 */
var Le, Pe, Te;
const St = process && process.env && process.env.YARGS_MIN_NODE_VERSION ? Number(process.env.YARGS_MIN_NODE_VERSION) : 12, _t = (Pe = (Le = process == null ? void 0 : process.versions) === null || Le === void 0 ? void 0 : Le.node) !== null && Pe !== void 0 ? Pe : (Te = process == null ? void 0 : process.version) === null || Te === void 0 ? void 0 : Te.slice(1);
if (_t && Number(_t.match(/^([^.]+)/)[1]) < St)
  throw Error(`yargs parser supports a minimum Node.js version of ${St}. Read our version support policy: https://github.com/yargs/yargs-parser#supported-nodejs-versions`);
const Mn = process ? process.env : {}, Kt = new Wn({
  cwd: process.cwd,
  env: () => Mn,
  format: Dt,
  normalize: wn,
  resolve: le,
  // TODO: figure  out a  way to combine ESM and CJS coverage, such  that
  // we can exercise all the lines below:
  require: (e) => {
    if (typeof require < "u")
      return require(e);
    if (e.match(/\.json$/))
      return JSON.parse(Et(e, "utf8"));
    throw Error("only .json config files are supported in ESM");
  }
}), ge = function(t, n) {
  return Kt.parse(t.slice(), n).argv;
};
ge.detailed = function(e, t) {
  return Kt.parse(e.slice(), t);
};
ge.camelCase = he;
ge.decamelize = Vt;
ge.looksLikeNumber = Gt;
const kn = {
  right: Gn,
  center: Kn
}, zn = 0, ve = 1, Dn = 2, Oe = 3;
class Un {
  constructor(t) {
    var n;
    this.width = t.width, this.wrap = (n = t.wrap) !== null && n !== void 0 ? n : !0, this.rows = [];
  }
  span(...t) {
    const n = this.div(...t);
    n.span = !0;
  }
  resetOutput() {
    this.rows = [];
  }
  div(...t) {
    if (t.length === 0 && this.div(""), this.wrap && this.shouldApplyLayoutDSL(...t) && typeof t[0] == "string")
      return this.applyLayoutDSL(t[0]);
    const n = t.map((s) => typeof s == "string" ? this.colFromString(s) : s);
    return this.rows.push(n), n;
  }
  shouldApplyLayoutDSL(...t) {
    return t.length === 1 && typeof t[0] == "string" && /[\t\n]/.test(t[0]);
  }
  applyLayoutDSL(t) {
    const n = t.split(`
`).map((o) => o.split("	"));
    let s = 0;
    return n.forEach((o) => {
      o.length > 1 && M.stringWidth(o[0]) > s && (s = Math.min(Math.floor(this.width * 0.5), M.stringWidth(o[0])));
    }), n.forEach((o) => {
      this.div(...o.map((i, l) => ({
        text: i.trim(),
        padding: this.measurePadding(i),
        width: l === 0 && o.length > 1 ? s : void 0
      })));
    }), this.rows[this.rows.length - 1];
  }
  colFromString(t) {
    return {
      text: t,
      padding: this.measurePadding(t)
    };
  }
  measurePadding(t) {
    const n = M.stripAnsi(t);
    return [0, n.match(/\s*$/)[0].length, 0, n.match(/^\s*/)[0].length];
  }
  toString() {
    const t = [];
    return this.rows.forEach((n) => {
      this.rowToString(n, t);
    }), t.filter((n) => !n.hidden).map((n) => n.text).join(`
`);
  }
  rowToString(t, n) {
    return this.rasterize(t).forEach((s, o) => {
      let i = "";
      s.forEach((l, h) => {
        const { width: b } = t[h], O = this.negatePadding(t[h]);
        let v = l;
        if (O > M.stringWidth(l) && (v += " ".repeat(O - M.stringWidth(l))), t[h].align && t[h].align !== "left" && this.wrap) {
          const N = kn[t[h].align];
          v = N(v, O), M.stringWidth(v) < O && (v += " ".repeat((b || 0) - M.stringWidth(v) - 1));
        }
        const _ = t[h].padding || [0, 0, 0, 0];
        _[Oe] && (i += " ".repeat(_[Oe])), i += Nt(t[h], v, "| "), i += v, i += Nt(t[h], v, " |"), _[ve] && (i += " ".repeat(_[ve])), o === 0 && n.length > 0 && (i = this.renderInline(i, n[n.length - 1]));
      }), n.push({
        text: i.replace(/ +$/, ""),
        span: t.span
      });
    }), n;
  }
  // if the full 'source' can render in
  // the target line, do so.
  renderInline(t, n) {
    const s = t.match(/^ */), o = s ? s[0].length : 0, i = n.text, l = M.stringWidth(i.trimRight());
    return n.span ? this.wrap ? o < l ? t : (n.hidden = !0, i.trimRight() + " ".repeat(o - l) + t.trimLeft()) : (n.hidden = !0, i + t) : t;
  }
  rasterize(t) {
    const n = [], s = this.columnWidths(t);
    let o;
    return t.forEach((i, l) => {
      i.width = s[l], this.wrap ? o = M.wrap(i.text, this.negatePadding(i), { hard: !0 }).split(`
`) : o = i.text.split(`
`), i.border && (o.unshift("." + "-".repeat(this.negatePadding(i) + 2) + "."), o.push("'" + "-".repeat(this.negatePadding(i) + 2) + "'")), i.padding && (o.unshift(...new Array(i.padding[zn] || 0).fill("")), o.push(...new Array(i.padding[Dn] || 0).fill(""))), o.forEach((h, b) => {
        n[b] || n.push([]);
        const O = n[b];
        for (let v = 0; v < l; v++)
          O[v] === void 0 && O.push("");
        O.push(h);
      });
    }), n;
  }
  negatePadding(t) {
    let n = t.width || 0;
    return t.padding && (n -= (t.padding[Oe] || 0) + (t.padding[ve] || 0)), t.border && (n -= 4), n;
  }
  columnWidths(t) {
    if (!this.wrap)
      return t.map((l) => l.width || M.stringWidth(l.text));
    let n = t.length, s = this.width;
    const o = t.map((l) => {
      if (l.width)
        return n--, s -= l.width, l.width;
    }), i = n ? Math.floor(s / n) : 0;
    return o.map((l, h) => l === void 0 ? Math.max(i, Hn(t[h])) : l);
  }
}
function Nt(e, t, n) {
  return e.border ? /[.']-+[.']/.test(t) ? "" : t.trim().length !== 0 ? n : "  " : "";
}
function Hn(e) {
  const t = e.padding || [], n = 1 + (t[Oe] || 0) + (t[ve] || 0);
  return e.border ? n + 4 : n;
}
function Vn() {
  return typeof process == "object" && process.stdout && process.stdout.columns ? process.stdout.columns : 80;
}
function Gn(e, t) {
  e = e.trim();
  const n = M.stringWidth(e);
  return n < t ? " ".repeat(t - n) + e : e;
}
function Kn(e, t) {
  e = e.trim();
  const n = M.stringWidth(e);
  return n >= t ? e : " ".repeat(t - n >> 1) + e;
}
let M;
function qn(e, t) {
  return M = t, new Un({
    width: e?.width || Vn(),
    wrap: e?.wrap
  });
}
const qt = new RegExp("\x1B(?:\\[(?:\\d+[ABCDEFGJKSTm]|\\d+;\\d+[Hfm]|\\d+;\\d+;\\d+m|6n|s|u|\\?25[lh])|\\w)", "g");
function Zt(e) {
  return e.replace(qt, "");
}
function Zn(e, t) {
  const [n, s] = e.match(qt) || ["", ""];
  e = Zt(e);
  let o = "";
  for (let i = 0; i < e.length; i++)
    i !== 0 && i % t === 0 && (o += `
`), o += e.charAt(i);
  return n && s && (o = `${n}${o}${s}`), o;
}
function Qn(e) {
  return qn(e, {
    stringWidth: (t) => [...t].length,
    stripAnsi: Zt,
    wrap: Zn
  });
}
function Yn(e, t) {
  let n = le(".", e), s;
  for (Ut(n).isDirectory() || (n = We(n)); ; ) {
    if (s = t(n, xn(n)), s)
      return le(n, s);
    if (n = We(s = n), s === n)
      break;
  }
}
const Xn = {
  fs: {
    readFileSync: Et,
    writeFile: Cn
  },
  format: Dt,
  resolve: le,
  exists: (e) => {
    try {
      return Ut(e).isFile();
    } catch {
      return !1;
    }
  }
};
let G;
class Jn {
  constructor(t) {
    t = t || {}, this.directory = t.directory || "./locales", this.updateFiles = typeof t.updateFiles == "boolean" ? t.updateFiles : !0, this.locale = t.locale || "en", this.fallbackToLanguage = typeof t.fallbackToLanguage == "boolean" ? t.fallbackToLanguage : !0, this.cache = /* @__PURE__ */ Object.create(null), this.writeQueue = [];
  }
  __(...t) {
    if (typeof arguments[0] != "string")
      return this._taggedLiteral(arguments[0], ...arguments);
    const n = t.shift();
    let s = function() {
    };
    return typeof t[t.length - 1] == "function" && (s = t.pop()), s = s || function() {
    }, this.cache[this.locale] || this._readLocaleFile(), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = n, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: s
    })) : s(), G.format.apply(G.format, [this.cache[this.locale][n] || n].concat(t));
  }
  __n() {
    const t = Array.prototype.slice.call(arguments), n = t.shift(), s = t.shift(), o = t.shift();
    let i = function() {
    };
    typeof t[t.length - 1] == "function" && (i = t.pop()), this.cache[this.locale] || this._readLocaleFile();
    let l = o === 1 ? n : s;
    this.cache[this.locale][n] && (l = this.cache[this.locale][n][o === 1 ? "one" : "other"]), !this.cache[this.locale][n] && this.updateFiles ? (this.cache[this.locale][n] = {
      one: n,
      other: s
    }, this._enqueueWrite({
      directory: this.directory,
      locale: this.locale,
      cb: i
    })) : i();
    const h = [l];
    return ~l.indexOf("%d") && h.push(o), G.format.apply(G.format, h.concat(t));
  }
  setLocale(t) {
    this.locale = t;
  }
  getLocale() {
    return this.locale;
  }
  updateLocale(t) {
    this.cache[this.locale] || this._readLocaleFile();
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (this.cache[this.locale][n] = t[n]);
  }
  _taggedLiteral(t, ...n) {
    let s = "";
    return t.forEach(function(o, i) {
      const l = n[i + 1];
      s += o, typeof l < "u" && (s += "%s");
    }), this.__.apply(this, [s].concat([].slice.call(n, 1)));
  }
  _enqueueWrite(t) {
    this.writeQueue.push(t), this.writeQueue.length === 1 && this._processWriteQueue();
  }
  _processWriteQueue() {
    const t = this, n = this.writeQueue[0], s = n.directory, o = n.locale, i = n.cb, l = this._resolveLocaleFile(s, o), h = JSON.stringify(this.cache[o], null, 2);
    G.fs.writeFile(l, h, "utf-8", function(b) {
      t.writeQueue.shift(), t.writeQueue.length > 0 && t._processWriteQueue(), i(b);
    });
  }
  _readLocaleFile() {
    let t = {};
    const n = this._resolveLocaleFile(this.directory, this.locale);
    try {
      G.fs.readFileSync && (t = JSON.parse(G.fs.readFileSync(n, "utf-8")));
    } catch (s) {
      if (s instanceof SyntaxError && (s.message = "syntax error in " + n), s.code === "ENOENT")
        t = {};
      else
        throw s;
    }
    this.cache[this.locale] = t;
  }
  _resolveLocaleFile(t, n) {
    let s = G.resolve(t, "./", n + ".json");
    if (this.fallbackToLanguage && !this._fileExistsSync(s) && ~n.lastIndexOf("_")) {
      const o = G.resolve(t, "./", n.split("_")[0] + ".json");
      this._fileExistsSync(o) && (s = o);
    }
    return s;
  }
  _fileExistsSync(t) {
    return G.exists(t);
  }
}
function es(e, t) {
  G = t;
  const n = new Jn(e);
  return {
    __: n.__.bind(n),
    __n: n.__n.bind(n),
    setLocale: n.setLocale.bind(n),
    getLocale: n.getLocale.bind(n),
    updateLocale: n.updateLocale.bind(n),
    locale: n.locale
  };
}
const ts = (e) => es(e, Xn), ns = "require is not supported by ESM", Rt = "loading a directory of commands is not supported yet for ESM";
let me;
try {
  me = Nn(import.meta.url);
} catch {
  me = process.cwd();
}
const ss = me.substring(0, me.lastIndexOf("node_modules"));
Sn, _n, En, ss || process.cwd(), vn, We, On, An, le, process.cwd, process.exit, process.nextTick, typeof process.stdout.columns < "u" && process.stdout.columns, Et, ts({
  directory: le(me, "../../../locales"),
  updateFiles: !1
});
const q = "\x1B[44m", x = "\x1B[43m", B = "\x1B[41m", os = "\x1B[42m", $ = "\x1B[0m", A = "\x1B[33m", C = "\x1B[36m", m = "\x1B[0m", rs = {
  "vue-caution": ["elementSelectorsWithScoped", "implicitParentChildCommunication"],
  "vue-essential": ["globalStyle", "simpleProp", "singleNameComponent", "vforNoKey", "vifWithVfor"],
  "vue-recommended": ["elementAttributeOrder", "topLevelElementOrder"],
  "vue-strong": [
    "componentFilenameCasing",
    "componentFiles",
    "directiveShorthands",
    "fullWordComponentName",
    "multiAttributeElements",
    "propNameCasing",
    "quotedAttributeValues",
    "selfClosingComponents",
    "simpleComputed",
    "templateSimpleExpression"
  ],
  rrd: [
    "cyclomaticComplexity",
    "deepIndentation",
    "elseCondition",
    "functionSize",
    "htmlLink",
    "ifWithoutCurlyBraces",
    "magicNumbers",
    "nestedTernary",
    "noPropDestructure",
    "parameterCount",
    "plainScript",
    "propsDrilling",
    "scriptLength",
    "shortVariableName",
    "tooManyProps",
    "vForWithIndexKey",
    "zeroLengthComparison"
  ]
}, se = Object.keys(rs), Ie = [], Be = 100, is = (e, t) => {
  if (!e)
    return;
  const n = e.content.split(`
`);
  n.length > Be && Ie.push({ filePath: t, message: `${n.length > Be * 2 ? B : x}(${n.length} lines)${$}` });
}, cs = () => {
  const e = [];
  return Ie.length > 0 && Ie.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Long <script> blocks${m}`,
      description: `👉 ${A}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${Be} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Me = [], as = (e, t) => {
  !e || e.setup || Me.push({ filePath: t, message: `${x}Plain <script> block${$} found` });
}, ls = () => {
  const e = [];
  return Me.length > 0 && Me.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Plain <script> blocks${m}`,
      description: `👉 ${A} Consider using <script setup> to leverage the new SFC <script> syntax.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, us = /^(\(.*\)|\\?.)$/;
function te(e) {
  const t = e.toString();
  return us.test(t) ? t : `(?:${t})`;
}
const fs = /^(?:\(\?:(.+)\)|(\(?.+\)?))$/, hs = /^(?:\(\?:(.+)\)([?+*]|{[\d,]+})?|(.+))$/;
function E(e) {
  const t = (n) => E(`(?<${n}>${`${e}`.replace(fs, "$1$2")})`);
  return {
    toString: () => e.toString(),
    and: Object.assign((...n) => E(`${e}${D(...n)}`), {
      referenceTo: (n) => E(`${e}\\k<${n}>`)
    }),
    or: (...n) => E(`(?:${e}|${D(...n)})`),
    after: (...n) => E(`(?<=${D(...n)})${e}`),
    before: (...n) => E(`${e}(?=${D(...n)})`),
    notAfter: (...n) => E(`(?<!${D(...n)})${e}`),
    notBefore: (...n) => E(`${e}(?!${D(...n)})`),
    times: Object.assign((n) => E(`${te(e)}{${n}}`), {
      any: () => E(`${te(e)}*`),
      atLeast: (n) => E(`${te(e)}{${n},}`),
      atMost: (n) => E(`${te(e)}{0,${n}}`),
      between: (n, s) => E(`${te(e)}{${n},${s}}`)
    }),
    optionally: () => E(`${te(e)}?`),
    as: t,
    groupedAs: t,
    grouped: () => E(`${e}`.replace(hs, "($1$3)$2")),
    at: {
      lineStart: () => E(`^${e}`),
      lineEnd: () => E(`${e}$`)
    }
  };
}
const ps = /[.*+?^${}()|[\]\\/]/g;
function de(e) {
  return E(`[${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function z(e) {
  return E(`[^${e.replace(/[-\\^\]]/g, "\\$&")}]`);
}
function ms(...e) {
  return E(`(?:${e.map((t) => D(t)).join("|")})`);
}
const Ae = E(".");
E("\\b\\w+\\b");
const H = E("\\w"), k = E("\\b"), ds = E("\\d"), L = E("\\s"), Qt = Object.assign(E("[a-zA-Z]"), {
  lowercase: E("[a-z]"),
  uppercase: E("[A-Z]")
}), Yt = E("\\t"), Xt = E("\\n");
E("\\r");
E("\\W+"), E("\\W"), E("\\B"), E("\\D"), E("\\S"), Object.assign(E("[^a-zA-Z]"), {
  lowercase: E("[^a-z]"),
  uppercase: E("[^A-Z]")
}), E("[^\\t]"), E("[^\\n]"), E("[^\\r]");
function Y(...e) {
  return E(`${te(D(...e))}?`);
}
function D(...e) {
  return E(
    e.map((t) => typeof t == "string" ? t.replace(ps, "\\$&") : t).join("")
  );
}
function S(...e) {
  return E(`${te(D(...e))}+`);
}
const U = "i", T = "g", R = (...e) => {
  const t = e.length > 1 && (Array.isArray(e[e.length - 1]) || e[e.length - 1] instanceof Set) ? e.pop() : void 0;
  return new RegExp(D(...e).toString(), [...t || ""].join(""));
}, ke = [], gs = (e, t) => {
  if (!e)
    return;
  const n = R(k, "else", k, [T, U]), s = e.content.match(n);
  s?.length && ke.push({ filePath: t, message: `else clauses found ${B}(${s.length})${$}` });
}, $s = () => {
  const e = [];
  return ke.length > 0 && ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ else conditions${m}`,
      description: `👉 ${A}Try to rewrite the conditions in a way that the else clause is not necessary.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ze = [], bs = 5, ys = 10, Es = (e, t) => {
  if (!e)
    return;
  const n = R(k, "if", k, [T, U]), s = R(k, "else", k, [T, U]), o = R(k, "for", k, [T, U]), i = R(k, "while", k, [T, U]), l = R(k, "case", k, [T, U]), h = e.content.match(n), b = e.content.match(s), O = e.content.match(o), v = e.content.match(i), _ = e.content.match(l), N = (h?.length || 0) + (b?.length || 0) + (O?.length || 0) + (v?.length || 0) + (_?.length || 0);
  N > bs && ze.push({ filePath: t, message: `${N > ys ? B : x}(${N})${$}` });
}, ws = () => {
  const e = [];
  return ze.length > 0 && ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ cyclomatic complexity${m}`,
      description: `👉 ${A}Try to reduce complexity.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, De = [], vs = (e) => {
  if (e.includes("pages"))
    return;
  const t = oe.basename(e);
  if (t === "App.vue")
    return;
  const n = R(Qt.uppercase);
  t.slice(1).match(n)?.length || De.push({ filePath: e, message: `Component name is ${x}single word${$}` });
}, Os = () => {
  const e = [];
  return De.length > 0 && De.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ single name component${m}`,
      description: `👉 ${A}Rename the component to use multi-word name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/single-name-component.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ue = [], As = (e, t) => {
  e && e.forEach((n) => {
    n.scoped || Ue.push({
      filePath: t,
      message: `${x}global style${$} used`
    });
  });
}, xs = () => {
  const e = [];
  return Ue.length > 0 && Ue.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ global style${m}`,
      description: `👉 ${A}Use <style scoped>.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, He = [], Cs = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps([", [T, U]);
  e.content.match(n)?.length && He.push({ filePath: t, message: `${x}Props type${$} not defined` });
}, Ss = () => {
  const e = [];
  return He.length > 0 && He.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ simple prop${m}`,
      description: `👉 ${A}Add at least type definition.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, I = (e, t, n = 0) => {
  if (!t.includes(`
`))
    return e.split(`
`).findIndex((h, b) => b >= n && h.includes(t)) + 1;
  const s = e.split(`
`).slice(0, n).reduce((l, h) => l + h.length, 0), o = e.indexOf(t, s);
  return e.slice(0, o).split(`
`).length;
}, Ve = [], _s = (e, t) => {
  if (!e)
    return;
  const n = R(
    "<",
    S(z(">")),
    " v-if",
    S(z(">")),
    " v-for",
    S(z(">")),
    ">",
    [T, U]
  ), s = R(
    "<",
    S(z(">")),
    " v-for",
    S(z(">")),
    " v-if",
    S(z(">")),
    ">",
    [T, U]
  ), o = e.content.match(n), i = e.content.match(s);
  if (o?.length || i?.length) {
    const l = o?.length ? o[0] : i?.length ? i[0] : "", h = I(e.content, l);
    Ve.push({ filePath: t, message: `line #${h} ${x}v-if used with v-for${$}` });
  }
}, Ns = () => {
  const e = [];
  return Ve.length > 0 && Ve.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-if used with v-for${m}`,
      description: `👉 ${A}Move out the v-if to a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ge = [], Rs = (e, t) => {
  if (!e)
    return;
  const n = R("<", S(z(">")), " v-for", S(z(">")), ">", [
    T,
    U
  ]), s = e.content.match(n);
  s?.length && (s.some((i) => i.includes(":key")) || Ge.push({ filePath: t, message: `v-for used ${x}without a key${$}` }));
}, js = () => {
  const e = [];
  return Ge.length > 0 && Ge.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-essential ~ v-for has no key${m}`,
      description: `👉 ${A}Add a \`:key\` property to all v-for.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ke = [], Ls = (e) => {
  if (e.includes("pages") || e.includes("layouts"))
    return;
  const t = oe.basename(e), n = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/, s = t.match(n), o = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/, i = t.match(o);
  !s?.length && !i?.length && Ke.push({ filePath: e, message: `component name is ${x}not PascalCase, nor kebab-case.${$}` });
}, Ps = () => {
  const e = [];
  return Ke.length > 0 && Ke.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component name is not PascalCase and not kebab-case${m}`,
      description: `👉 ${A}Rename the component to use PascalCase or kebab-case file name.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, qe = [], Ts = /^[a-z]+([A-Z][a-z]*)*$/, Fs = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\({([^}]+)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1].replace(/\s+/g, "").replace(/["']/g, "").split(",").map((i) => i.split(":")[0]).filter((i) => i.length).filter((i) => !Ts.test(i)).length && qe.push({ filePath: t, message: `prop names are ${x}not camelCased${$}` });
}, Ws = () => {
  const e = [];
  return qe.length > 0 && qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ prop names are not camelCased${m}`,
      description: `👉 ${A}Rename the props to camelCase.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ze = [], Is = 40, Bs = (e, t) => {
  if (!e)
    return;
  const n = /{{\s*([\s\S]*?)\s*}}/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    if (o.length > Is) {
      const i = I(e.content, o), l = o.split(`
`).at(0)?.trim() || "";
      Ze.push({
        filePath: t,
        message: `line #${i} ${x}${l}${$}`
      });
    }
  });
}, Ms = () => {
  const e = [];
  return Ze.length > 0 && Ze.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ lengthy template expression${m}`,
      description: `👉 ${A}Refactor the expression into a computed property.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Qe = [], ks = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = R(
    "<",
    S(H),
    Y(S(de(` 	
\r`))),
    S(z("/>")),
    Y(S(de(` 	
\r`))),
    Y("/"),
    ">",
    ["g"]
  ), o = n?.content.match(s);
  if (o === null)
    return;
  const i = R(":", S(H), Y(" "), "=", Y(" "), z(`'"`), [
    "g"
  ]);
  o?.forEach((l) => {
    if (!l.includes(":"))
      return;
    const h = l.match(i);
    if (h?.length) {
      const b = I(e.source, l);
      Qe.push({ filePath: t, message: `line #${b} ${x}${h}${$}` });
    }
  });
}, zs = () => {
  const e = [];
  return Qe.length > 0 && Qe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ attribute value is not quoted${m}`,
      description: `👉 ${A}Use quotes for attribute values.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ye = [], Ds = (e, t) => {
  if (!e)
    return;
  const n = e.template, s = R(
    "<",
    S(Qt.uppercase, H),
    Y(Xt, Yt),
    Y(S(z(">"))),
    "></",
    S(H),
    ">",
    ["g"]
  ), o = n?.content?.match(s);
  o !== null && o?.forEach((i) => {
    const l = I(e.source, i), h = i.split(`
`).at(-1)?.trim() || "";
    Ye.push({ filePath: t, message: `line #${l} ${x}${h}${$}` });
  });
}, Us = () => {
  const e = [];
  return Ye.length > 0 && Ye.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component is not self closing${m}`,
      description: `👉 ${A}Components with no content should be self-closing.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Xe = [], jt = [], Hs = ["v-slot", "v-bind", "v-on"], Vs = (e, t) => {
  if (!e)
    return;
  const n = e.template;
  Hs.forEach((s) => {
    if (n?.content.includes(`${s}:`)) {
      const o = I(e.source, s);
      Xe.push({ filePath: t, message: `line #${o} ${x}${s}${$}` }), jt.some((i) => i.filePath === t) || jt.push({ filePath: t });
    }
  });
}, Gs = () => {
  const e = [];
  return Xe.length > 0 && Xe.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ directive shorthands not used${m}`,
      description: `👉 ${A}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Je = [], Ks = 3, qs = (e) => {
  const t = R(
    S(z("/")).grouped(),
    D(".vue").at.lineEnd()
  ), n = e.match(t);
  if (n) {
    const s = n[0]?.split(".vue")[0], o = R(
      de("bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ"),
      [T]
    ), i = s.match(o);
    (!i || i.length < Ks) && Je.push({ filePath: e, message: `${s} is not a ${x}full word.${$}` });
  }
}, Zs = () => {
  const e = [];
  return Je.length > 0 && Je.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ full-word component names${m}`,
      description: `👉 ${A}Component names should prefer full words over abbreviations.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/full-word-component-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, et = [], Qs = (e, t) => {
  const n = e.toString(), s = n.indexOf("<script setup>"), o = n.indexOf("<template>"), i = n.indexOf("<style>"), l = [
    { name: "script", index: s },
    { name: "template", index: o },
    { name: "style", index: i }
  ].filter((b) => b.index !== -1);
  l.every((b, O) => O === 0 ? !0 : l[O - 1].index < b.index) || et.push({ filePath: t, message: `Top level elements are ${x}not following the correct order.${$}` });
}, Ys = () => {
  const e = [];
  return et.length > 0 && et.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ top level element order${m}`,
      description: `👉 ${A}Single-File Components should always order <script>, <template>, and <style> tags consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, tt = [], Lt = [
  "is",
  "v-for",
  "v-if",
  "v-else-if",
  "v-else",
  "v-show",
  "v-cloak",
  "v-pre",
  "v-once",
  "id",
  "ref",
  "key",
  "v-model",
  "v-on",
  "v-html",
  "v-text"
], Xs = (e, t) => {
  if (!e)
    return;
  const n = e.content.replace(/<\/?template>/g, ""), s = /<(\w+)(\s[^>]+)?>/g, o = /(\w+(?:-\w+)*)(?:="[^"]*")?/g;
  let i;
  for (; (i = s.exec(n)) !== null; ) {
    const l = i[1], h = i[2];
    if (h) {
      const O = Array.from(h.matchAll(o), (_) => _[1]).filter((_) => Lt.includes(_));
      let v = -1;
      for (const _ of O) {
        const N = Lt.indexOf(_);
        if (N !== -1 && N < v) {
          tt.push({
            filePath: t,
            message: `tag has attributes out of order ${x}(${l})${$}`
          });
          break;
        }
        v = N;
      }
    }
  }
}, Js = () => {
  const e = [];
  return tt.length > 0 && tt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-recommended ~ element attribute order${m}`,
      description: `👉 ${A}The attributes of elements (including components) should be ordered consistently.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nt = [], eo = 5, to = (e, t) => {
  if (!e)
    return;
  const n = R("defineProps", Y("<"), Y("("), "{", S(Ae), "}", ["g", "s"]), s = e.content.match(n);
  if (s?.length) {
    const o = s[0].split(",").length;
    o > eo && nt.push({ filePath: t, message: `props found ${B}(${o})${$}` });
  }
}, no = () => {
  const e = [];
  return nt.length > 0 && nt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ too many props${m}`,
      description: `👉 ${A}Try to refactor your code to use less properties.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, st = [], Jt = 20, ot = 5, Pt = 8;
function so(e, t, n) {
  t.split(`
`).length > Jt && st.push({ filePath: n, message: `function ${B}(${ao(e)})${$} is too long` });
}
function oo(e, t) {
  let n = "", s = t;
  for (; s < e.length && /\s/.test(e[s]); )
    s++;
  if (e.slice(s, s + ot) === "const")
    for (s += ot; s < e.length && /\s/.test(e[s]); )
      s++;
  for (; s < e.length && /[\w$]/.test(e[s]); )
    n += e[s], s++;
  return n.trim();
}
function ro(e, t) {
  let n = t;
  for (; n < e.length && e[n] !== "{"; )
    n++;
  return n + 1;
}
function io(e, t) {
  let n = "", s = -1;
  for (; t < e.length && e[t] !== "="; )
    /\w/.test(e[t]) && (n += e[t]), t++;
  return t = e.indexOf("=>", t), t === -1 ? null : (s = t + 2, { name: n, bodyStart: s });
}
function co(e, t) {
  let n = 1, s = "", o = t;
  for (; o < e.length && n > 0; ) {
    const i = e[o];
    i === "{" && n++, i === "}" && n--, s += i, o++;
  }
  return { body: s, end: o };
}
function ao(e) {
  return e.replace(/^const\s*/, "");
}
const lo = (e, t) => {
  if (!e)
    return;
  const n = e.content, s = n.length;
  let o = 0;
  for (; o < s; ) {
    let i = "", l = "", h = !1;
    if (n.slice(o, o + Pt) === "function" && (o += Pt, h = !0, i = oo(n, o), o = ro(n, o)), n.slice(o, o + ot) === "const") {
      const b = io(n, o);
      b && (h = !0, i = b.name, o = b.bodyStart);
    }
    if (h) {
      const { body: b, end: O } = co(n, o);
      l = b, o = O, so(i, l, t);
    }
    h || o++;
  }
}, uo = () => {
  const e = [];
  return st.length > 0 && st.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ function size${m}`,
      description: `👉 ${A}Functions must be shorter than ${Jt} lines.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, rt = [], en = 3, Tt = (e, t, n) => {
  const s = t.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
  s.length > en && rt.push({ filePath: n, message: `function ${x}${e}${$} has ${x}${s.length}${$} parameters` });
}, fo = (e, t) => {
  if (!e)
    return;
  const n = /function\s+([\w$]+)\s*\(([^)]*)\)\s*\{|const\s+([\w$]+)\s*=\s*\(([^)]*)\)\s*=>\s*\{/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; )
    s[1] ? Tt(s[1], s[2], t) : s[3] && Tt(s[3], s[4], t);
}, ho = () => {
  const e = [];
  return rt.length > 0 && rt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ parameter count${m}`,
      description: `👉 ${A}Max number of function parameters should be ${en}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, it = [], po = (e, t) => {
  if (!e)
    return;
  const n = R(
    "defineProps(",
    L.times.any(),
    "[",
    L.times.any(),
    S(de(`'"`), S(H), de(`'"`), L.times.any(), Y(",", L.times.any())),
    "]",
    L.times.any(),
    ")",
    [T]
  ), s = R(
    "<",
    S(H).grouped(),
    L,
    z(">").times.any(),
    ":",
    S(H).grouped(),
    L.times.any(),
    "=",
    L.times.any(),
    '"props.',
    S(H).grouped(),
    '"',
    [T]
  );
  let o;
  const i = /* @__PURE__ */ new Set();
  for (; (o = n.exec(e.content)) !== null; )
    o[0].replace(/defineProps\(|[)[\]'"\s]/g, "").split(",").forEach((b) => i.add(b));
  let l;
  for (; (l = s.exec(e.content)) !== null; ) {
    const h = l[1], b = l[2], O = l[3];
    i.has(O) && b === O && it.push({
      filePath: t,
      message: `Prop ${x}(${O})${$} is being drilled through ${x}${h}${$} component unmodified.`
    });
  }
}, mo = () => {
  const e = [];
  return it.length > 0 && it.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ props drilling${m}`,
      description: `👉 ${A}Props should not be forwarded unmodified. Consider refactoring.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ct = [], tn = 4, go = (e, t) => {
  if (!e)
    return;
  const n = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1];
    o.length < tn && ct.push({ filePath: t, message: `${B}(${o})${$}` });
  }
}, $o = () => {
  const e = [];
  return ct.length > 0 && ct.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ short variable names${m}`,
      description: `👉 ${A}Variable names must have a minimum length of ${tn}.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, nn = [], xe = [], bo = 5, yo = (e, t) => {
  if (!e)
    return;
  const n = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs, s = e.content.match(n);
  s?.length && s.forEach((o) => {
    if (o.split(`
`).length > bo) {
      const i = o.split(`
`)[0], l = I(e.content, i);
      nn.push({ filePath: t, message: `line #${l} ${x}computed${$}` }), xe.push({ filePath: t }), xe.some((h) => h.filePath === t) || xe.push({ filePath: t });
    }
  });
}, Eo = () => {
  const e = [];
  return xe.length > 0 && nn.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ complicated computed property${m}`,
      description: `👉 ${A}Refactor the computed properties to smaller ones.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, at = [], wo = (e, t) => {
  if (!e)
    return;
  const n = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g;
  [...e.content.matchAll(n)].map((o) => o[1].trim()).forEach((o) => {
    const i = I(e.content.trim(), o), l = o.split(`
`).at(0)?.trim() || "";
    at.push({ filePath: t, message: `line #${i} ${x}(${l})${$}` });
  });
}, vo = () => {
  const e = [];
  return at.length > 0 && at.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ component files${m}`,
      description: `👉 ${A}Whenever a build system is available to concatenate files, each component should be in its own file.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ce = [], Oo = (e, t) => {
  if (!e)
    return;
  const n = /defineProps\(([^)]+)\)/, s = /v-model\s*=\s*"([^"]+)"/, o = R(D("$parent").or("getCurrentInstance"), [T]), i = e.content.match(n), l = e.content.match(s);
  if (l) {
    const b = l[1].split(".")[0];
    if ((i ? i[1] : "").includes(b)) {
      const v = I(e.content.trim(), b);
      Ce.push({
        filePath: t,
        message: `line #${v} ${x}(${b})${$}`
      });
    }
  }
  const h = e.content.match(o);
  if (h) {
    const b = I(e.content.trim(), h[0]);
    Ce.push({
      filePath: t,
      message: `line #${b} ${x}(${h[0]})${$}`
    });
  }
}, Ao = () => {
  const e = [];
  return Ce.length > 0 && Ce.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ implicit parent-child communication${m}`,
      description: `👉 ${A}Avoid implicit parent-child communication to maintain clear and predictable component behavior.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/implicit-parent-child-communication.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, lt = [], Ft = 5, xo = 3, Co = (e, t) => {
  if (!e)
    return;
  const n = R(Yt.times.atLeast(Ft).or(L.times.atLeast(xo * Ft)), [
    T,
    U
  ]);
  e.content.match(n)?.forEach((o) => {
    const i = I(e.content, o);
    lt.push({
      filePath: t,
      message: `line #${i} ${x}indentation: ${o.length}${$}`
    });
  });
}, So = () => {
  const e = [];
  return lt.length > 0 && lt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ deep indentation${m}`,
      description: `👉 ${A}Try to refactor your component to child components, to avoid deep indentations.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ut = [], _o = (e, t) => {
  if (!e)
    return;
  const n = R("<a", k, [T, U]), s = e.content.match(n);
  s?.length && ut.push({ filePath: t, message: `${s?.length} ${x}html link found${$}` });
}, No = () => {
  const e = [];
  return ut.length > 0 && ut.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ html link${m}`,
      description: `👉 ${A}Use router-link or NuxtLink.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ft = [], Ro = (e, t) => {
  if (!e)
    return;
  const s = e.content.split(`
`);
  s.forEach((o, i) => {
    const l = o.trim();
    if (l.startsWith("if (") && !l.includes("{")) {
      const h = s[i + 1]?.trim();
      (!h || !h.startsWith("{") && !l.endsWith("{")) && ft.push({
        filePath: t,
        message: `line #${i} if statement without curly braces: ${B}${l}${$}`
      });
    }
  });
}, jo = () => {
  const e = [];
  return ft.length > 0 && ft.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ if without curly braces${m}`,
      description: `👉 ${A}All if statements must be enclosed in curly braces for better readability and maintainability.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, ht = [], Lo = (e, t) => {
  if (!e)
    return;
  const n = R(S(ds).as("magicNumber"), ms(")", Xt), [T]);
  let s, o = 0;
  for (; (s = n.exec(e.content)) !== null; ) {
    const i = s.groups?.magicNumber;
    if (i) {
      const l = I(e.content, i, o);
      ht.push({
        filePath: t,
        message: `line #${l} ${x}magic number: ${i}${$}`
      }), o = l;
    }
  }
}, Po = () => {
  const e = [];
  return ht.length && ht.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ magic numbers${m}`,
      description: `👉 ${A}Extract magic numbers to a constant.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (${t.message}) 🚨`
    });
  }), e;
}, pt = [], To = (e, t) => {
  if (!e)
    return;
  const n = /<(\w+)([^>]*)>/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[1], i = s[2];
    i.split(/\s+/).filter((h) => h.trim() !== "").length > 1 && i.split(`
`).length === 1 && pt.push({ filePath: t, message: `Element ${x}<${o}>${$} should have its attributes on separate lines` });
  }
}, Fo = () => {
  const e = [];
  return pt.length > 0 && pt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-strong ~ multi-attribute elements${m}`,
      description: `👉 ${A}Elements with multiple attributes should span multiple lines, with one attribute per line.${m}`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Wo = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "search",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
], mt = [], Io = (e, t) => {
  if (!e)
    return;
  const n = /([a-z]+)\s*\{[^}]*\}/gi;
  e.forEach((s) => {
    let o;
    for (; (o = n.exec(s.content)) !== null; ) {
      const i = o[1];
      Wo.includes(i) && mt.push({ filePath: t, message: `${x}(${i})${$}` });
    }
  });
}, Bo = () => {
  const e = [];
  return mt.length > 0 && mt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}vue-caution ~ element selectors with scoped${m}`,
      description: `👉 ${A}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${m} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, dt = [], Mo = (e, t) => {
  if (!e)
    return;
  const n = R(S(Ae), L, "?", L, S(Ae), L, ":", L, S(Ae));
  e.content.match(n)?.forEach((o) => {
    if (o.split("?").length - 1 > 1) {
      const i = I(e.content, o);
      dt.push({
        filePath: t,
        message: `line #${i} has ${x}nested ternary${$}`
      });
    }
  });
}, ko = () => {
  const e = [];
  return dt.length > 0 && dt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ nested Ternary${m}`,
      description: `👉 ${A}/* TODO tip to fix this issue */.${m} See: https:///* TODO doc link */`,
      message: `${t.message} 🚨`
    });
  }), e;
}, gt = [], zo = (e, t) => {
  if (!e)
    return;
  const n = R('v-for="(', L.times.any(), S(H).grouped(), L.times.any(), ",", L.times.any(), S(H).grouped(), L.times.any(), ")", S(L), "in", S(L), S(H).grouped(), [T]), s = R(':key="', L.times.any(), S(H).grouped(), L.times.any(), '"', [T]), o = [...e.content.matchAll(n)], i = [...e.content.matchAll(s)];
  o.forEach((l) => {
    const [h, b, O, v] = l;
    i.forEach((_) => {
      const N = _[1];
      if (N === O) {
        const Z = I(e.content.trim(), N);
        gt.push({
          filePath: t,
          message: `line #${Z} ${x}index is being used as :key in v-for${$}`
        });
      }
    });
  });
}, Do = () => {
  const e = [];
  return gt.length > 0 && gt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ VFor With Index Key${m}`,
      description: `👉 ${A}Avoid using index as key in v-for loops.${m} See: https://`,
      message: `${t.message} 🚨`
    });
  }), e;
}, $t = [], Uo = (e, t) => {
  if (!e)
    return;
  const n = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g;
  let s;
  for (; (s = n.exec(e.content)) !== null; ) {
    const o = s[0], i = s[1], l = I(e.content.trim(), o);
    $t.push({
      filePath: t,
      message: `line #${l} zero length comparison found ${x}(${i})${$}`
    });
  }
}, Ho = () => {
  const e = [];
  return $t.length > 0 && $t.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ Zero Length Comparison${m}`,
      description: `👉 ${A}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, bt = [], Vo = (e, t) => {
  if (!e)
    return;
  const n = /(?:const|let)\s*\{\s*([^\}]+?)\s*\}\s*=\s*(?:defineProps|props)\s*\(\s*(?:\[[^\]]*\]|\{[^\}]*\})?\s*\)/g;
  e.content.match(n)?.forEach((o) => {
    const i = I(e.content, o);
    bt.push({
      filePath: t,
      message: `line #${i} ${x}props destructuring found: ${o}${$}`
    });
  });
}, Go = () => {
  const e = [];
  return bt.length > 0 && bt.forEach((t) => {
    e.push({
      file: t.filePath,
      rule: `${C}rrd ~ no Prop Destructure${m}`,
      description: `👉 ${A}Avoid destructuring props in the setup function. Use \`props.propName\` instead of \`const { propName } = defineProps()\`.${m} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
      message: `${t.message} 🚨`
    });
  }), e;
}, Ko = (e, t, n) => {
  const s = {}, o = ({ file: O, rule: v, title: _, description: N, message: Z }) => {
    const re = e === "rule" ? v : O;
    s[re] || (s[re] = []), s[re].push({ file: O, rule: v, title: _, description: N, message: Z });
  }, i = (O) => {
    O().forEach((_) => {
      o(_);
    });
  };
  i(Os), i(Ss), i(js), i(Ns), i(xs), i(Ps), i(vo), i(Gs), i(Zs), i(Fo), i(Ws), i(zs), i(Us), i(Eo), i(Ms), i(Ys), i(Js), i(Ao), i(Bo), i(ws), i(So), i($s), i(uo), i(No), i(jo), i(Po), i(ko), i(Go), i(ho), i(ls), i(mo), i(cs), i($o), i(no), i(Do), i(Ho);
  const l = [], h = Object.keys(s).sort((O, v) => {
    const _ = s[O].length, N = s[v].length;
    return t === "desc" ? N - _ : _ - N;
  }), b = [];
  return h.forEach((O) => {
    b.push(`
 - ${O}`), s[O].forEach((v) => {
      const _ = v.message.includes(B);
      if (l.some((N) => N.file === v.file)) {
        const N = l.find((Z) => Z.file === v.file);
        N && (_ ? N.errors++ : N.warnings++);
      } else
        l.push({ file: v.file, errors: _ ? 1 : 0, warnings: _ ? 0 : 1 });
      n === "error" && !_ || (e === "file" ? b.push(`   Rule: ${v.rule}`) : b.push(`   File: ${v.file}`), b.push(`   Description: ${v.description}`), b.push(`   Message: ${v.message || "🚨"}
`));
    });
  }), { output: b, health: l };
}, qo = (e, t, n) => {
  const s = e.scriptSetup || e.script, o = t.endsWith(".vue");
  n.includes("vue-essential") && (Cs(s, t), o && (vs(t), As(e.styles, t), Rs(e.template, t), _s(e.template, t))), n.includes("vue-strong") && (yo(s, t), o && (wo(s, t), Fs(s, t), Ls(t), Ds(e, t), Bs(e.template, t), ks(e, t), Vs(e, t), qs(t), To(e.template, t))), n.includes("vue-recommended") && o && (Qs(e.source, t), Xs(e.template, t)), n.includes("vue-caution") && o && (Oo(s, t), Io(e.styles, t)), n.includes("rrd") && (Es(s, t), Co(s, t), gs(s, t), lo(s, t), Ro(s, t), Lo(s, t), Mo(s, t), fo(s, t), po(s, t), is(s, t), go(s, t), to(s, t), Vo(s, t), Uo(s, t), o && (_o(e.template, t), as(e.script, t), zo(e.template, t)));
}, Zo = 1.5, Wt = 75, It = 85, Bt = 95, Qo = ["rule", "file"], Yo = ["asc", "desc"], Xo = ["all", "error"], Jo = {
  groupBy: Qo,
  orderBy: Yo,
  outputLevel: Xo
};
function Fe(e, t) {
  const n = Jo[t];
  return n.includes(e) || (console.error(
    `
Invalid option "${e}" provided for flag "${t}". Valid options are: ${n.join(", ")}.
`
  ), process.exit(1)), e;
}
function er(e, t, n) {
  const { errors: s, warnings: o } = e.reduce((h, { errors: b, warnings: O }) => ({ errors: h.errors + b, warnings: h.warnings + O }), { errors: 0, warnings: 0 }), i = [];
  i.push(`Found ${B}${Intl.NumberFormat("en-US").format(s)} errors${$}, and ${x}${Intl.NumberFormat("en-US").format(o)} warnings${$}, ${q}${Intl.NumberFormat("en-US").format(t)} lines${$} of code in ${q}${Intl.NumberFormat("en-US").format(n)} files${$}`);
  const l = Math.ceil((1 - (s * Zo + o) / t) * 100);
  return l < Wt && i.push(`${B}Code health is LOW: ${l}%${$}`), l >= Wt && l < It && i.push(`${x}Code health is MEDIUM ${l}%${$}`), l >= It && l < Bt && i.push(`${q}Code health is OK: ${l}%${$}`), l >= Bt && i.push(`${os}Code health is GOOD: ${l}%${$}`), { errors: s, warnings: o, output: i };
}
let yt = 0, sn = 0, on = [];
const tr = ["cache", "coverage", "dist", ".git", "node_modules", ".nuxt", ".output", "vendor"], ce = [], rn = async (e) => {
  if (!(await ae.stat(e)).isDirectory()) {
    await Mt(e, e);
    return;
  }
  const n = await ae.readdir(e);
  for (const s of n) {
    const o = oe.join(e, s);
    (await ae.stat(o)).isDirectory() && (tr.some((l) => o.includes(l)) || await rn(o)), await Mt(o, o);
  }
}, Mt = async (e, t) => {
  if (e.endsWith(".vue") || e.endsWith(".ts") || e.endsWith(".js")) {
    yt++;
    const n = await ae.readFile(t, "utf-8");
    sn += n.split(/\r\n|\r|\n/).length;
    const { descriptor: s } = Rn(n);
    (e.endsWith(".ts") || e.endsWith(".js")) && (s.script = { content: n }), ce.push({ info: `Analyzing ${t}...` }), qo(s, t, on);
  }
}, nr = async ({ dir: e, level: t, apply: n = [], groupBy: s, orderBy: o }) => {
  const i = se.filter((_) => !n.includes(_));
  ce.push({ info: `👉 Analyzing Vue, TS and JS files in ${e}` }), ce.push({
    info: `Applying ${q}${n.length}${$} rulesets ${q}${n}${$}
      Ignoring ${q}${i.length}${$} rulesets ${q}${i}${$}
      Output level ${q}${t}${$}
      Grouping by ${q}${s}${$}
      Ordering ${q}${o}${$}`
  }), on = n, await rn(e), ce.push({ info: `Found ${q}${yt}${$} files` });
  const { health: l, output: h } = Ko(s, o, t), { errors: b, warnings: O, output: v } = er(l, sn, yt);
  return !b && !O && ce.push({ info: "No code smells detected!" }), { output: ce, codeHealthOutput: v, reportOutput: h };
}, sr = async () => {
  let e = process.cwd();
  for (; e !== oe.parse(e).root; ) {
    const t = oe.join(e, "package.json");
    return await ae.access(t), e;
  }
  e = oe.dirname(e);
}, kt = (e) => (t) => {
  const n = t?.split(",");
  if (!n)
    return;
  const s = n.filter((o) => !se.includes(o));
  return s.length > 0 && (console.error(
    `
${B}Invalid ${e} values: ${s.join(
      ", "
    )}${$}. 
${A}Allowed values are: ${[...se].join(", ")}${m}

`
  ), process.exit(1)), n;
}, cn = await sr();
cn || (console.error(`
${B}Cannot find project root.${$}

`), process.exit(1));
const zt = [];
let ee = {
  path: "./src",
  apply: void 0,
  // RULESETS.join(','),
  ignore: void 0,
  group: "rule",
  level: "all",
  order: "desc"
};
try {
  const e = oe.join(cn, "vue-mess-detector.json"), t = JSON.parse(await ae.readFile(e, "utf-8"));
  ee = { ...ee, ...t }, zt.push({ info: `👉 Using configuration from ${e}` });
} catch {
  zt.push({ info: "👉 Using default configuration" });
}
yn(Pn(process.argv)).command(
  "analyze [path]",
  "Analyze Vue files for code smells and best practices",
  (e) => e.config(ee).positional("path", {
    describe: "path to the Vue files",
    default: ee.path
  }).option("apply", {
    alias: "a",
    describe: "Comma-separated list of rulesets to apply.",
    choices: se,
    coerce: kt("apply"),
    group: "Filter Rulesets:",
    default: ee.apply
  }).option("group", {
    alias: "g",
    describe: "Group results at the output",
    choices: ["rule", "file"],
    coerce: (t) => Fe(t, "groupBy"),
    default: ee.group,
    group: "Group Results:"
  }).option("level", {
    alias: "l",
    describe: "Output level",
    choices: ["all", "error"],
    coerce: (t) => Fe(t, "outputLevel"),
    default: ee.level,
    group: "Output:"
  }).option("ignore", {
    alias: "i",
    describe: "Comma-separated list of rulesets to ignore.",
    choices: se,
    coerce: kt("ignore"),
    default: ee.ignore,
    group: "Filter Rulesets:"
  }).option("order", {
    alias: "o",
    describe: "Order results at the output",
    choices: ["asc", "desc"],
    coerce: (t) => Fe(t, "orderBy"),
    default: ee.order,
    group: "Order Results:"
  }).check((t) => (t.ignore && t.apply && (console.error(
    `
${B}Cannot use both --ignore and --apply options together.${$}

`
  ), process.exit(1)), !0)),
  (e) => {
    let t = [...se];
    e.apply && (t = e.apply), e.ignore && (t = se.filter((n) => !e.ignore.includes(n))), nr({ dir: e.path, level: e.level, apply: t, groupBy: e.group, orderBy: e.order }).then((n) => {
      n.output.forEach((s) => {
        console.log(s.info);
      }), n.reportOutput?.forEach((s) => {
        console.log(s);
      }), n.codeHealthOutput?.forEach((s) => {
        console.log(s);
      });
    }).catch((n) => {
      console.error(`${B}${n}${$}`);
    });
  }
).help().argv;
