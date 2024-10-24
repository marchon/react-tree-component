import { jsx as a, Fragment as H, jsxs as y } from "react/jsx-runtime";
import { useDispatch as fe, useSelector as Q, Provider as Ee } from "react-redux";
import * as u from "react";
import { useRef as G, useEffect as pe, useState as xe } from "react";
import { createSlice as Ne, configureStore as Me } from "@reduxjs/toolkit";
import { createPortal as Se } from "react-dom";
import De from "classnames";
let ge = class $ extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }
  constructor() {
    super(), arguments.length && $.custom.apply(this, arguments);
  }
  get type() {
    return this.getAttribute("type");
  }
  get time() {
    let n = this.getAttribute("time");
    return !isNaN(n) && !isNaN(parseFloat(n)) ? Number(n) : 3e3;
  }
  set type(n) {
    this.setAttribute("type", n);
  }
  set time(n) {
    this.setAttribute("time", n);
  }
  get open() {
    return this.hasAttribute("open");
  }
  set open(n) {
    this.toggleAttribute("open", n);
  }
  connectedCallback() {
    this.setAttribute("tabIndex", 0), this.setAttribute("role", "tooltip"), this.closeMode || (this.closeMode = "hide"), this.addEventListener("click", () => {
      this[this.closeMode]();
    }), this.dispatchEvent(new CustomEvent("connected", {
      detail: {
        type: "ui-lighttip"
      }
    })), this.isConnectedCallback = !0;
  }
  attributeChangedCallback(n, t, o) {
    n == "open" && typeof t != typeof o && (typeof o == "string" ? (clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.isTimeHide = !0, this[this.closeMode](), this.position();
    }, this.time), this.setAttribute("data-tid", this.timer), this.classList.add("ESC"), this.zIndex(), this.position()) : this.classList.remove("ESC"), this.tabIndex(), this.isTimeHide = null);
  }
  zIndex() {
    var n = 19;
    this.parentElement && [...this.parentElement.childNodes].forEach(function(t) {
      if (t.nodeType == 1) {
        var o = window.getComputedStyle(t), r = o.zIndex * 1;
        r && o.display != "none" && (n = Math.max(r + 1, n));
      }
    }), this.style.zIndex = n;
  }
  // 定位处理
  position() {
    var n = [...document.querySelectorAll('ui-lighttip[open]:not([type="loading"])')], t = n.sort(function(s, c) {
      return (s.getAttribute("data-tid") || 0) - (c.getAttribute("data-tid") || 0);
    }), o = {}, r = -1;
    t.forEach((s) => {
      let c = s.textContent;
      typeof o[c] > "u" && (r++, o[c] = r), s.style.setProperty("--ui-sort-index", o[c]);
    });
  }
  // 新的元素层级总是最高
  tabIndex() {
    var n = this, t = $.lastActiveElement;
    if (this.open == !0) {
      var o = document.activeElement;
      o && !o.closest("[keepfocus]") && (n !== o && ($.lastActiveElement = o), n.focus());
    } else
      t && !t.matches("body") && (t.focus({
        preventScroll: !0
      }), !window.isKeyEvent && !this.isTimeHide && t.blur(), $.lastActiveElement = null);
    return this;
  }
  // success
  static success(n, t = 3e3) {
    return this.custom(n, "success", t);
  }
  // error
  static error(n, t = 3e3) {
    return this.custom(n, "error", t);
  }
  // normal
  static normal(n, t = 3e3) {
    return this.custom(n, "normal", t);
  }
  // loading
  static loading(n) {
    return n = n || "正在加载中...", this.custom(n, "loading");
  }
  // 调用方法处理
  static custom(n = "", t, o) {
    if (!this.matches || !this.matches("ui-lighttip"))
      return $.custom.apply(document.createElement("ui-lighttip"), arguments);
    if (typeof n == "object" && (t = n, n = ""), typeof n != "string")
      return this;
    if (this.closeMode = "remove", t && typeof t == "object") {
      $.custom.call(this, n, t.type, t.time);
      return;
    }
    if (typeof t == "number") {
      $.custom.call(this, n, o, t);
      return;
    }
    return t == "loading" && (n || (n = "正在加载中..."), o = 999999), o && (this.time = o), t && (this.type = t), this.innerHTML = n, t == "success" ? this.setAttribute("aria-lable", "操作成功") : t == "error" && this.setAttribute("aria-lable", "操作失败"), this.parentElement || (document.body.appendChild(this), this.dispatchEvent(new CustomEvent("DOMContentLoaded"))), this.show(), this;
  }
  remove() {
    this.parentElement && this.parentElement.removeChild(this), this.open = !1;
  }
  show() {
    this.time > 0 && (this.open = !0);
  }
  hide() {
    this.open = !1;
  }
};
customElements.get("ui-lighttip") || customElements.define("ui-lighttip", ge);
window.LightTip = ge;
class je {
  static s() {
    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
  }
  static uuid() {
    return this.s() + this.s() + this.s();
  }
  static guid() {
    return this.s() + this.s() + "-" + this.s() + "-" + this.s() + "-" + this.s() + "-" + this.s() + this.s() + this.s();
  }
}
const Ie = (e) => /* @__PURE__ */ u.createElement("svg", { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e }, /* @__PURE__ */ u.createElement("path", { d: "M36 19L24 31L12 19H36Z", fill: "#969696", stroke: "#969696", strokeWidth: 4, strokeLinejoin: "miter" }));
var me = /* @__PURE__ */ ((e) => (e.dragging = "dragging", e.stop = "stop", e))(me || {}), R = /* @__PURE__ */ ((e) => (e.always = "always", e.hover = "hover", e))(R || {});
const Te = {
  name: "name",
  key: "id",
  children: "children",
  slot: "slot"
}, Ae = (e) => {
  if (e === "downone")
    return /* @__PURE__ */ a(Ie, {});
}, $e = {
  fieldNames: Te,
  reverse: !1,
  contextMenu: !1,
  switcherIcon: () => Ae("downone"),
  checkable: !1,
  selectable: !0
}, We = {
  default: {
    theme: "default"
  },
  figma: {
    theme: "figma",
    foldIconDisplay: R.hover,
    draggable: !0,
    contextMenu: !0
  },
  file: {
    theme: "file",
    showLine: !0
  }
}, He = ".node-name", Z = "tree:copy:node", Pe = (e) => Number(e.getAttribute("data-index")), qe = (e) => {
  var n;
  return (n = e.getAttribute("data-anchor")) == null ? void 0 : n.split(",");
}, Be = (e) => e.getAttribute("data-id"), Oe = (e) => e.querySelector(He), Ve = (e) => {
  let n = e.target;
  for (; n !== null; ) {
    if (n.getAttribute("data-anchor"))
      return n;
    n = n.parentNode;
  }
}, Ze = () => localStorage.getItem(Z), ze = () => {
  localStorage.removeItem(Z);
}, Je = (e) => {
  localStorage.setItem(Z, e);
}, Ke = () => !!localStorage.getItem(Z), Ue = (e) => {
  const n = qe(e), t = Be(e), o = Pe(e);
  return { id: t, anchor: n, index: o };
}, b = (e, n) => {
  const { children: t } = W(), o = [];
  return e.forEach((r) => {
    if (r.length === 0)
      return o;
    let s;
    r.forEach((c, l) => {
      l === 0 ? s = n[c] : l !== r.length && s && s[t] && (s = s[t][c]);
    }), s && o.push(s);
  }), o;
}, Fe = (e, n) => {
  const t = e.length;
  for (let o = 0; o < t - 1; o++)
    for (let r = 0; r < t - o - 1; r++) {
      const s = e[r], c = e[r + 1];
      let l = 0;
      for (; l < s.length || l < c.length; ) {
        if (c[l] > s[l] || s[l] === void 0) {
          [e[r], e[r + 1]] = [e[r + 1], e[r]][n[r], n[r + 1]] = [
            n[r + 1],
            n[r]
          ];
          break;
        }
        if (s[l] > c[l])
          break;
        l++;
      }
    }
  return [e, n];
}, Ye = (e) => JSON.parse(JSON.stringify(e)), ke = (e, n) => {
  const { children: t } = W();
  return e.forEach((o, r) => {
    const s = n.slice();
    s.push(r), o.anchor = s.slice(), o[t] && ke(o[t], s);
  }), e;
}, Xe = (e, n) => {
  const t = [];
  let o = !1;
  return e.forEach((r) => {
    const s = n.length > r.length ? r.length : n.length, c = [];
    let l = 0, d = 0;
    for (; l < r.length && d < n.length && r[l] === n[d]; )
      c.push(r[l]), l++, d++;
    c.length === s ? (o = !0, t.findIndex((k) => k.toString() === c.toString()) === -1 && t.push(c)) : t.findIndex((k) => k.toString() === r.toString()) === -1 && t.push(r);
  }), o || t.push(n), t;
}, Ge = () => je.guid(), Qe = () => {
  let e;
  return function() {
    return e || (e = document.querySelector(".tree-context-menu"), e);
  };
}, Re = (e) => {
  const n = e.theme ?? "default";
  window.$tree = {
    ...$e,
    ...We[n],
    ...e,
    dragNode: null,
    throttleTimer: 0,
    throttleDelay: 200,
    drag: {
      start: {
        id: "",
        index: 0
      },
      over: !1
      // identify can drop
    },
    style: {
      "--node-indent": (e.indentSize ?? 15) + "px",
      "--parent-bg-color": e.parentBgColor ?? "#e9e9e9",
      "--parent-color": e.parentColor ?? "#000",
      "--children-bg-color": e.childrenBgColor ?? "#f6f4f4",
      "--children-color": e.childrenColor ?? "#000"
    },
    menu: Qe()
  };
}, T = () => window.$tree, W = () => {
  const { fieldNames: e } = T();
  return e;
}, _e = (e) => e.preventDefault(), B = (e) => e.stopPropagation(), et = {
  treeData: [],
  status: me.stop,
  start: {
    ids: [],
    anchors: [],
    indexes: [],
    from: ""
  },
  over: {
    id: "",
    anchor: [],
    index: -1
  }
}, ve = Ne({
  name: "tree",
  initialState: et,
  reducers: {
    initTreeData: (e, n) => {
      e.treeData = Ye(n.payload);
    },
    setStart: (e, { payload: n }) => {
      const [t, o, r] = n;
      e.start.ids = t;
      const [s, c] = Fe(o, r);
      e.start.anchors = s, e.start.indexes = c, b(s, e.treeData).forEach((d) => {
        d.selected = !0;
      });
    },
    clearSelected: (e) => {
      const n = b(e.start.anchors, e.treeData);
      n.length && n.forEach((t) => {
        t.selected = !1;
      });
    },
    setOver: (e, { payload: n }) => {
      const [t, o] = n;
      t !== "" && (e.over.anchor = t), o !== void 0 && (e.over.index = o);
    },
    setStatus: (e, { payload: n }) => {
      e.status = n;
    },
    updateNode: (e, { payload: n }) => {
      const [t, o, r] = n;
      b(t, e.treeData).forEach((c) => {
        c[o] = r;
      });
    },
    updateChecked: (e, { payload: n }) => {
      const { children: t } = W(), [o, r] = n, s = b([o], e.treeData)[0];
      s.checked = r;
      const c = (d) => {
        const f = d[t];
        f && (d.halfChecked = !1, f.forEach((k) => {
          k.checked = r, c(k);
        }));
      }, l = (d) => {
        const f = d;
        f.pop();
        let k;
        for (; f.length; ) {
          const g = b([f], e.treeData)[0], N = g[t];
          k ? (g.checked = !1, g.halfChecked = !0) : r ? N.find((L) => !L.checked) ? (g.halfChecked = !0, k = !0) : (g.halfChecked = !1, g.checked = !0) : N.find((L) => L.checked || L.halfChecked) ? (k = !0, g.halfChecked = !0) : (g.checked = !1, g.halfChecked = !1), f.pop();
        }
      };
      c(s), l(o);
    },
    refresh: (e) => {
      const { key: n } = W();
      function t(o, r) {
        o == null || o.forEach((s, c) => {
          const l = [...r];
          l.push(c), s.anchor = l.slice();
          const d = e.start.ids.indexOf(s[n]), f = e.over.id === s[n];
          d !== -1 && (e.start.anchors[d] = s.anchor), f && (e.over.anchor = s.anchor), s.children && t(s.children, s.anchor);
        });
      }
      e.treeData.forEach((o, r) => {
        o.anchor = [r];
        const s = e.start.ids.indexOf(o[n]), c = e.over.id === o[n];
        s !== -1 && (e.start.anchors[s] = o.anchor), c && (e.over.anchor = o.anchor), o.children && t(o.children, o.anchor);
      });
    },
    moveNode: (e) => {
      const n = e.start, t = e.over, o = t.anchor.length === 0;
      n.anchors.forEach((r, s) => {
        var N, M, L;
        const c = r.length === 1, l = b([r], e.treeData)[0], d = b([t.anchor], e.treeData)[0];
        let f = e.start.indexes[s];
        if (!d && !o)
          return;
        const k = r.slice();
        k.pop();
        const g = b([k], e.treeData)[0];
        o ? (e.treeData.splice(t.index, 0, l), c ? (f >= t.index && (f += 1), e.treeData.splice(f, 1)) : (N = g.children) == null || N.splice(f, 1)) : ((M = d.children) == null || M.splice(t.index, 0, l), d && (g == null ? void 0 : g.id) === d.id && f >= t.index && (f += 1), c ? e.treeData.splice(f, 1) : (L = g.children) == null || L.splice(f, 1));
      });
    },
    removeNode: (e) => {
      const { children: n } = W();
      e.start.anchors.forEach((t, o) => {
        var r;
        if (t.length === 1)
          e.treeData.splice(e.start.indexes[o], 1);
        else {
          const s = t.slice();
          s.pop(), (r = b([s], e.treeData)[0][n]) == null || r.splice(e.start.indexes[o], 1);
        }
      });
    },
    copyNode: (e) => {
      const n = b(e.start.anchors, e.treeData);
      Je(JSON.stringify(n));
    },
    pasteNode: (e) => {
      const { key: n, children: t, name: o, slot: r } = W(), s = e.start.anchors[0].slice();
      s.pop();
      const c = Ze();
      if (c) {
        const l = JSON.parse(c);
        if (l.forEach((d) => {
          d[n] = Ge(), d[o] = `${d[o]}_Copy`, l.length === 1 && (d.selected = !1);
        }), s.length === 0)
          e.treeData.splice(e.start.indexes[0], 0, l);
        else {
          const d = b([e.start.anchors[0]], e.treeData)[0];
          d[r] === !0 ? d[t].unshift(...l) : b([s], e.treeData)[0][t].splice(e.start.indexes[0], 0, ...l);
        }
        ze();
      }
    }
  }
}), {
  clearSelected: ce,
  updateChecked: tt,
  initTreeData: nt,
  updateNode: ae,
  removeNode: le,
  pasteNode: ot,
  setStatus: rt,
  copyNode: de,
  moveNode: st,
  setStart: he,
  setOver: it,
  refresh: V
} = ve.actions, ct = ve.reducer, _ = () => {
  const e = fe(), n = Q((p) => p.tree.start), t = (p) => {
    o();
  }, o = () => {
    const { menu: p, contextMenu: v } = T();
    v !== !1 && (p().style.visibility = "hidden");
  }, r = (p, v, D) => {
    const { selectable: I } = T();
    I !== !1 && (e(ce()), e(he([p, v, D])));
  }, s = (p, v) => {
    e(it([p, v]));
  }, c = (p, v) => {
    e(ae([[p], "lock", v]));
  }, l = (p, v) => {
    e(ae([[p], "hidden", v]));
  }, d = () => {
    e(de()), o(), new LightTip("复制成功", "success");
  }, f = () => {
    e(de()), e(le()), e(V()), o(), new LightTip("剪切成功", "success");
  }, k = () => {
    e(ot()), e(V()), o(), new LightTip("粘贴成功", "success");
  }, g = () => {
    e(le()), e(V()), o(), new LightTip("删除成功", "success");
  }, N = () => {
    e(st()), e(V());
  }, M = (p) => {
    e(rt(p));
  }, L = (p) => {
    const { foldIconDisplay: v } = T();
    v === "hover" && p.currentTarget.classList.add("tree-mouse-in");
  }, E = (p) => {
    const { foldIconDisplay: v } = T();
    v === "hover" && p.currentTarget.classList.remove("tree-mouse-in");
  }, S = () => {
    const { menu: p } = T();
    p().setAttribute("data-paste", String(Ke()));
  }, j = (p, v) => {
    const { menu: D } = T(), I = D().clientHeight, O = document.documentElement.clientHeight;
    let P = v;
    v + I > O && (P = P - I), D().style.left = `${p}px`, D().style.top = `${P}px`, D().style.visibility = "visible";
  };
  return {
    select: r,
    over: s,
    dragStatus: M,
    lock: c,
    hidden: l,
    copy: d,
    cut: f,
    paste: k,
    remove: g,
    move: N,
    mouseEnter: L,
    mouseLeave: E,
    rightClick: (p) => {
      const { contextMenu: v } = T();
      if (v === !1)
        return;
      p.stopPropagation(), p.preventDefault();
      const D = Ve(p);
      if (D) {
        const { id: I, anchor: O, index: P } = Ue(D);
        n.ids.indexOf(I) === -1 && (e(ce()), e(he([[I], [O], [P]]))), S(), j(p.clientX, p.clientY);
      }
    },
    hideMenu: o,
    handleTreeMouseDown: t,
    checked: (p, v) => {
      e(tt([p, v]));
    }
  };
}, at = (e) => /* @__PURE__ */ u.createElement("svg", { width: 14, height: 14, viewBox: "0 0 48 48", fill: "none", ...e }, /* @__PURE__ */ u.createElement("path", { d: "M14 11L4 24L14 37H44V11H14Z", fill: "none", stroke: "var(--icon)", strokeWidth: 3, strokeLinecap: "square", strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("path", { d: "M21 19L31 29", stroke: "var(--icon)", strokeWidth: 3, strokeLinecap: "square", strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("path", { d: "M31 19L21 29", stroke: "var(--icon)", strokeWidth: 3, strokeLinecap: "square", strokeLinejoin: "miter" })), lt = (e) => /* @__PURE__ */ u.createElement("svg", { width: 14, height: 14, viewBox: "0 0 48 48", fill: "none", ...e }, /* @__PURE__ */ u.createElement("path", { d: "M17 7H16H10C8.89543 7 8 7.89543 8 9L8 42C8 43.1046 8.89543 44 10 44H38C39.1046 44 40 43.1046 40 42V9C40 7.89543 39.1046 7 38 7H33.0499H31", stroke: "var(--icon)", strokeWidth: 3, strokeLinecap: "square", strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("rect", { x: 17, y: 4, width: 14, height: 6, fill: "none", stroke: "var(--icon)", strokeWidth: 3, strokeLinejoin: "miter" })), dt = (e) => /* @__PURE__ */ u.createElement("svg", { width: 14, height: 14, viewBox: "0 0 48 48", fill: "none", ...e }, /* @__PURE__ */ u.createElement("path", { d: "M11 42C13.7614 42 16 39.7614 16 37C16 34.2386 13.7614 32 11 32C8.23858 32 6 34.2386 6 37C6 39.7614 8.23858 42 11 42Z", fill: "none", stroke: "var(--icon)", strokeWidth: 3, strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("path", { d: "M37 42C39.7614 42 42 39.7614 42 37C42 34.2386 39.7614 32 37 32C34.2386 32 32 34.2386 32 37C32 39.7614 34.2386 42 37 42Z", fill: "none", stroke: "var(--icon)", strokeWidth: 3, strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("path", { d: "M15.3774 39.4131L17.5 35.8162L34.5 6.37138", stroke: "var(--icon)", strokeWidth: 3, strokeLinecap: "square" }), /* @__PURE__ */ u.createElement("path", { d: "M13.4957 6.17518L30.4957 35.62L32.6265 39.4131", stroke: "var(--icon)", strokeWidth: 3, strokeLinecap: "square" })), ht = (e) => /* @__PURE__ */ u.createElement("svg", { width: 14, height: 14, viewBox: "0 0 48 48", fill: "none", ...e }, /* @__PURE__ */ u.createElement("path", { d: "M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163", stroke: "var(--icon)", strokeWidth: 3, strokeLinecap: "square", strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("path", { d: "M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z", fill: "none", stroke: "var(--icon)", strokeWidth: 3, strokeLinejoin: "miter" }));
const ut = (e) => {
  const { copy: n, paste: t, cut: o, remove: r, contextMenu: s } = e;
  return s ? Se(
    /* @__PURE__ */ y(
      "ul",
      {
        onMouseUp: B,
        onMouseDown: B,
        onMouseMove: B,
        onContextMenu: B,
        className: "tree-context-menu",
        "data-paste": "false",
        children: [
          /* @__PURE__ */ y("li", { onClick: () => n == null ? void 0 : n(), children: [
            /* @__PURE__ */ y("span", { className: "menu-item", children: [
              /* @__PURE__ */ a(ht, { className: "i-icon" }),
              "复制"
            ] }),
            /* @__PURE__ */ a("span", { children: "⌘C" })
          ] }),
          /* @__PURE__ */ y("li", { onClick: () => t == null ? void 0 : t(), children: [
            /* @__PURE__ */ y("span", { className: "menu-item", children: [
              /* @__PURE__ */ a(lt, { className: "i-icon" }),
              "粘贴"
            ] }),
            /* @__PURE__ */ a("span", { children: "⌘V" })
          ] }),
          /* @__PURE__ */ y("li", { onClick: () => o == null ? void 0 : o(), children: [
            /* @__PURE__ */ y("span", { className: "menu-item", children: [
              /* @__PURE__ */ a(dt, { className: "i-icon" }),
              "剪切"
            ] }),
            /* @__PURE__ */ a("span", { children: "⌘X" })
          ] }),
          /* @__PURE__ */ y("li", { onClick: () => r == null ? void 0 : r(), children: [
            /* @__PURE__ */ y("span", { className: "menu-item", children: [
              /* @__PURE__ */ a(at, { className: "i-icon" }),
              "删除"
            ] }),
            /* @__PURE__ */ a("span", { children: "Del" })
          ] })
        ]
      }
    ),
    document.body
  ) : /* @__PURE__ */ a(H, {});
}, ft = ({ name: e, node: n }) => {
  const t = G(null), o = _(), r = (s, c) => {
    const l = c.split(",").map(Number);
    o.checked(l, s);
  };
  return pe(() => {
    t.current.indeterminate = n.halfChecked;
  }, [n.halfChecked]), /* @__PURE__ */ a(
    "input",
    {
      name: e,
      ref: t,
      type: "checkbox",
      is: "ui-checkbox",
      checked: n.checked,
      onMouseDown: B,
      onClick: (s) => r(s.target.checked, e),
      onChange: () => {
      }
    }
  );
}, pt = (e) => /* @__PURE__ */ u.createElement("svg", { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e }, /* @__PURE__ */ u.createElement("path", { d: "M6 16C6.63472 17.2193 7.59646 18.3504 8.82276 19.3554C12.261 22.1733 17.779 24 24 24C30.221 24 35.739 22.1733 39.1772 19.3554C40.4035 18.3504 41.3653 17.2193 42 16", stroke: "#969696", strokeWidth: 4, strokeLinecap: "square", strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("path", { d: "M28.9775 24L31.048 31.7274", stroke: "#969696", strokeWidth: 4, strokeLinecap: "square", strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("path", { d: "M37.3535 21.3536L43.0103 27.0104", stroke: "#969696", strokeWidth: 4, strokeLinecap: "square", strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("path", { d: "M5.00004 27.0103L10.6569 21.3534", stroke: "#969696", strokeWidth: 4, strokeLinecap: "square", strokeLinejoin: "miter" }), /* @__PURE__ */ u.createElement("path", { d: "M16.9278 31.7276L18.9983 24.0001", stroke: "#969696", strokeWidth: 4, strokeLinecap: "square", strokeLinejoin: "miter" })), gt = (e) => /* @__PURE__ */ u.createElement("svg", { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e }, /* @__PURE__ */ u.createElement("path", { d: "M24 36C35.0457 36 44 24 44 24C44 24 35.0457 12 24 12C12.9543 12 4 24 4 24C4 24 12.9543 36 24 36Z", fill: "none", stroke: "#969696", strokeWidth: 4, strokeLinejoin: "round" }), /* @__PURE__ */ u.createElement("path", { d: "M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z", fill: "none", stroke: "#969696", strokeWidth: 4, strokeLinejoin: "round" })), mt = (e) => /* @__PURE__ */ u.createElement("svg", { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e }, /* @__PURE__ */ u.createElement("rect", { x: 7, y: 22.0476, width: 34, height: 22, rx: 2, fill: "none", stroke: "#969696", strokeWidth: 4, strokeLinejoin: "round" }), /* @__PURE__ */ u.createElement("path", { d: "M14 22V14.0047C13.9948 8.87022 17.9227 4.56718 23.0859 4.05117C28.249 3.53516 32.9673 6.97408 34 12.0059", stroke: "#969696", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ u.createElement("path", { d: "M24 30V36", stroke: "#969696", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" })), kt = (e) => /* @__PURE__ */ u.createElement("svg", { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e }, /* @__PURE__ */ u.createElement("rect", { x: 6, y: 22, width: 36, height: 22, rx: 2, fill: "none", stroke: "#969696", strokeWidth: 4, strokeLinejoin: "round" }), /* @__PURE__ */ u.createElement("path", { d: "M14 22V14C14 8.47715 18.4772 4 24 4C29.5228 4 34 8.47715 34 14V22", stroke: "#969696", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ u.createElement("path", { d: "M24 30V36", stroke: "#969696", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" })), vt = (e) => {
  const { node: n, lock: t, hidden: o } = e;
  return n ? /* @__PURE__ */ y("div", { className: "action", children: [
    /* @__PURE__ */ y(
      "div",
      {
        onMouseDown: (r) => t == null ? void 0 : t(r, n),
        onMouseUp: B,
        className: "lock-wrap",
        children: [
          n.lock ? /* @__PURE__ */ a(kt, { className: `i-lock ${n.lock && "show"}` }) : /* @__PURE__ */ a(mt, { className: "i-unlock" }),
          /* @__PURE__ */ a("span", { className: "lock-dot", children: "·" })
        ]
      }
    ),
    /* @__PURE__ */ y(
      "div",
      {
        onMouseDown: (r) => o == null ? void 0 : o(r, n),
        onMouseUp: B,
        className: "hidden-wrap",
        children: [
          n.hidden ? /* @__PURE__ */ a(pt, { className: `i-invisible ${n.hidden ? "show" : ""}` }) : /* @__PURE__ */ a(gt, { className: "i-visible" }),
          /* @__PURE__ */ a("span", { className: "visible-dot", children: "·" })
        ]
      }
    )
  ] }) : /* @__PURE__ */ a(H, {});
}, ue = (e) => {
  const { indent: n, node: t, virtual: o, switcherIcon: r } = e, { slot: s } = W();
  return t ? /* @__PURE__ */ a("div", { className: "node-indent", children: n == null ? void 0 : n.map((c, l) => /* @__PURE__ */ a("span", { children: !o && l === n.length - 1 && t[s] && /* @__PURE__ */ a(
    "label",
    {
      className: "label-fold",
      htmlFor: `fold-${t.id}`,
      children: r == null ? void 0 : r()
    }
  ) }, l)) }) : /* @__PURE__ */ a(H, {});
}, we = ({ Icom: e, node: n }) => {
  if (!e)
    return /* @__PURE__ */ a(H, {});
  if (typeof e == "string")
    return /* @__PURE__ */ a("i", { className: "icon", children: /* @__PURE__ */ a("img", { src: e }) });
  if (typeof e == "object")
    return /* @__PURE__ */ a(H, { children: e });
  if (typeof we == "function")
    return /* @__PURE__ */ a(e, { ...n });
}, wt = (e) => {
  var te;
  const {
    data: n,
    lineRef: t,
    containerRef: o,
    defaultSelectMulti: r,
    draggable: s,
    checkable: c,
    icon: l,
    switcherIcon: d,
    onDragEnter: f,
    onDragLeave: k,
    onDragOver: g,
    onDrop: N,
    onDragEnd: M,
    onDragStart: L
  } = e, E = n, S = _(), j = Q((h) => h.tree.start), z = (te = o == null ? void 0 : o.current) == null ? void 0 : te.getBoundingClientRect().top, { key: J } = W(), p = (h, m) => {
    h.stopPropagation(), S.lock(m.anchor, !m.lock);
  }, v = (h, m) => {
    h.stopPropagation(), S.hidden(m.anchor, !m.hidden);
  }, D = (h, m, C, i) => {
    h.stopPropagation(), S.select([m], [C], [i]), window.$tree.drag.start.id = m, window.$tree.dragNode = h.currentTarget;
    const x = b([C], E)[0];
    L == null || L({ event: h, node: x });
  }, I = (h, m) => {
    h.stopPropagation(), h.preventDefault();
    const C = b([m], E)[0];
    f == null || f({ event: h, node: C });
  }, O = (h, m, C, i, x, w, q) => {
    var ne, oe, re, se, ie;
    h.stopPropagation(), h.preventDefault();
    const K = b([x], E)[0];
    g == null || g({ event: h, node: K });
    const A = h.currentTarget, U = x.slice();
    if (U.pop(), A.style.boxShadow = "none", window.$tree.drag.over = !0, m || window.$tree.drag.start.id === i) {
      window.$tree.drag.over = !1;
      return;
    }
    if ((re = (oe = (ne = window.$tree.dragNode) == null ? void 0 : ne.parentNode) == null ? void 0 : oe.nextSibling) == null ? void 0 : re.contains(A)) {
      t != null && t.current && (t.current.style.opacity = "0"), window.$tree.drag.over = !1;
      return;
    }
    const F = h.pageY, Y = A.getBoundingClientRect().top, X = Y + 30 / 2;
    if (C && i !== window.$tree.drag.start.id && F > X - 7 && F < X + 7) {
      t != null && t.current && (t.current.style.opacity = "0"), A.style.boxShadow = "inset 0 0 0px 1px blue", S.over(x, q);
      return;
    }
    if (t != null && t.current && (t.current.style.opacity = "1"), F > X) {
      const Le = ((ie = (se = A == null ? void 0 : A.nextSibling) == null ? void 0 : se.querySelector("label")) == null ? void 0 : ie.control.checked) === !1;
      if (C && Le && q > 0) {
        t != null && t.current && (t.current.style.opacity = "0"), window.$tree.drag.over = !1;
        return;
      }
      t != null && t.current && (t.current.style.top = `${Y - (z || 0) + 30}px`), S.over(U, w);
    } else
      t != null && t.current && (t.current.style.top = `${Y - (z || 0)}px`), S.over(U, w + 1);
    t != null && t.current && (t.current.style.left = `${Oe(A).offsetLeft - 10}px`);
  }, P = (h, m) => {
    h.stopPropagation();
    const C = h.currentTarget;
    C.style.boxShadow = "none";
    const i = b([m], E)[0];
    k == null || k({ event: h, node: i });
  }, Ce = (h, m) => {
    const C = b([m], E)[0];
    M == null || M({ event: h, node: C });
  }, be = (h, m, C) => {
    h.stopPropagation();
    const i = h.currentTarget;
    if (t != null && t.current && (t.current.style.opacity = "0"), i.style.boxShadow = "none", m || !window.$tree.drag.over)
      return;
    const x = b([C], E)[0], w = b(j.anchors, E);
    N == null || N({ event: h, node: x, dragNodes: w, dragNodesKeys: j.anchors }), S.move();
  }, ye = (h, m, C, i) => {
    if (!(j.ids.includes(m) || h.button === 2)) {
      if (h.metaKey && r) {
        const x = [...j.ids, m], w = Xe(j.anchors, C), q = w.map((K) => K.slice().pop());
        S.select(x, w, q);
        return;
      }
      S.select([m], [C], [i]);
    }
  };
  if (!(E != null && E.length))
    return /* @__PURE__ */ a(H, {});
  const ee = (h, m, C) => h.map((i, x) => /* @__PURE__ */ y(
    "div",
    {
      className: "node-item",
      children: [
        /* @__PURE__ */ a(
          "input",
          {
            className: "tree-hidden",
            type: "checkbox",
            id: `fold-${i.id}`,
            name: "node-fold"
          }
        ),
        /* @__PURE__ */ y(
          "div",
          {
            className: "node-info",
            "data-root": i.root,
            "data-lock": i.lock,
            "data-hidden": i.hidden,
            "data-anchor": i.anchor,
            "data-id": i[J],
            "data-index": C - x,
            children: [
              /* @__PURE__ */ y(
                "div",
                {
                  className: `node-label ${i != null && i.selected ? "selected" : ""} ${i != null && i.edit ? "edit" : ""}`,
                  style: { color: i.hidden ? "#bebebe" : "inherit" },
                  draggable: !i.root && !i.lock && s,
                  onDragStart: (w) => D(w, i.id, i.anchor, C - x),
                  onDragEnter: (w) => I(w, i.anchor),
                  onDragOver: (w) => {
                    var q;
                    return O(w, i.root, i.slot, i.id, i.anchor, C - x, ((q = i == null ? void 0 : i.children) == null ? void 0 : q.length) || 0);
                  },
                  onDragLeave: (w) => P(w, i.anchor),
                  onDragEnd: (w) => Ce(w, i.anchor),
                  onDrop: (w) => be(w, i.root, i.anchor),
                  onMouseDown: (w) => ye(w, i.id, i.anchor, x),
                  children: [
                    /* @__PURE__ */ a(
                      ue,
                      {
                        node: i,
                        virtual: !0,
                        indent: m,
                        switcherIcon: d
                      }
                    ),
                    c && /* @__PURE__ */ a(
                      ft,
                      {
                        name: i.anchor.join(),
                        node: i
                      }
                    ),
                    /* @__PURE__ */ y("div", { className: "node-name", children: [
                      /* @__PURE__ */ a(
                        we,
                        {
                          Icom: l || i.icon,
                          node: i
                        }
                      ),
                      /* @__PURE__ */ a("span", { children: i.name })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ a("div", { className: "fold-wrap", children: /* @__PURE__ */ a(
                ue,
                {
                  node: i,
                  virtual: !1,
                  indent: m,
                  switcherIcon: d
                }
              ) }),
              !i.root && /* @__PURE__ */ a(
                vt,
                {
                  node: i,
                  lock: p,
                  hidden: v,
                  prevent: _e
                }
              )
            ]
          }
        ),
        i.children && /* @__PURE__ */ a(
          "div",
          {
            className: "node-children",
            style: {
              color: i.hidden ? "#bebebe" : "inherit"
            },
            children: ee(i.children.slice().reverse(), m.concat([0]), i.children.length - 1)
          }
        )
      ]
    },
    i[J]
  ));
  return /* @__PURE__ */ a(H, { children: ee(E.slice().reverse(), [0], E.length - 1) });
}, Ct = (e) => {
  const { mouseEnter: n, mouseLeave: t, copy: o, cut: r, paste: s, remove: c, rightClick: l, handleTreeMouseDown: d } = _(), { data: f, theme: k } = e, [g, N] = xe(), M = G(null), L = G(null), E = Q((j) => j.tree.treeData), S = fe();
  return pe(() => {
    if (!(!f || f.length === 0))
      return Re(e), N(T()), S(nt(ke(f, []))), document.documentElement.addEventListener("mousedown", d), () => {
        document.documentElement.removeEventListener("mousedown", d);
      };
  }, [f]), g ? /* @__PURE__ */ y(
    "section",
    {
      className: De(
        g.foldIconDisplay === R.always ? "tree-fold-show" : "",
        k ? `theme-${k}-tree` : "theme-default-tree"
      ),
      ref: L,
      style: g.style,
      onMouseEnter: n,
      onMouseLeave: t,
      onContextMenu: l,
      children: [
        /* @__PURE__ */ y("div", { className: "tree-container", children: [
          /* @__PURE__ */ a(
            wt,
            {
              ...g,
              data: E,
              lineRef: M,
              containerRef: L
            }
          ),
          /* @__PURE__ */ a(
            "div",
            {
              ref: M,
              className: "tree-drop-line"
            }
          )
        ] }),
        /* @__PURE__ */ a(
          ut,
          {
            ...g,
            copy: o,
            cut: r,
            paste: s,
            remove: c
          }
        )
      ]
    }
  ) : /* @__PURE__ */ a(H, {});
}, bt = Me({
  reducer: {
    tree: ct
  }
});
const Dt = (e) => /* @__PURE__ */ a(Ee, { store: bt, children: /* @__PURE__ */ a(Ct, { ...e }) });
export {
  Dt as default
};
