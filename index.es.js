import { jsx as a, Fragment as $, jsxs as y } from "react/jsx-runtime";
import {
  useDispatch as ue,
  useSelector as X,
  Provider as Ee
} from "react-redux";
import * as h from "react";
import { useState as Ce, useRef as re, useEffect as Ne } from "react";
import { createSlice as xe, configureStore as Me } from "@reduxjs/toolkit";
import { createPortal as Se } from "react-dom";
import De from "classnames";
class je {
  static s() {
    return Math.floor((1 + Math.random()) * 65536)
      .toString(16)
      .substring(1);
  }
  static uuid() {
    return this.s() + this.s() + this.s();
  }
  static guid() {
    return (
      this.s() +
      this.s() +
      "-" +
      this.s() +
      "-" +
      this.s() +
      "-" +
      this.s() +
      "-" +
      this.s() +
      this.s() +
      this.s()
    );
  }
}
const Te = (e) =>
  /* @__PURE__ */ h.createElement(
    "svg",
    { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e },
    /* @__PURE__ */ h.createElement("path", {
      d: "M36 19L24 31L12 19H36Z",
      fill: "#969696",
      stroke: "#969696",
      strokeWidth: 4,
      strokeLinejoin: "miter"
    })
  );
var pe = /* @__PURE__ */ ((e) => (
    (e.dragging = "dragging"), (e.stop = "stop"), e
  ))(pe || {}),
  G = /* @__PURE__ */ ((e) => ((e.always = "always"), (e.hover = "hover"), e))(
    G || {}
  );
const Ae = {
    name: "name",
    key: "id",
    children: "children",
    slot: "slot"
  },
  Ie = (e) => {
    if (e === "downone") return /* @__PURE__ */ a(Te, {});
  },
  $e = {
    fieldNames: Ae,
    reverse: !1,
    contextMenu: !1,
    switcherIcon: () => Ie("downone"),
    selectable: !0
  },
  We = {
    default: {
      theme: "default"
    },
    figma: {
      theme: "figma",
      foldIconDisplay: G.hover,
      draggable: !0,
      contextMenu: !0
    }
  },
  He = ".node-name",
  Z = "tree:copy:node",
  qe = (e) => Number(e.getAttribute("data-index")),
  Pe = (e) => {
    var n;
    return (n = e.getAttribute("data-anchor")) == null ? void 0 : n.split(",");
  },
  Be = (e) => e.getAttribute("data-id"),
  Oe = (e) => e.querySelector(He),
  Ve = (e) => {
    let n = e.target;
    for (; n !== null; ) {
      if (n.getAttribute("data-anchor")) return n;
      n = n.parentNode;
    }
  },
  Ze = () => localStorage.getItem(Z),
  ze = () => {
    localStorage.removeItem(Z);
  },
  Fe = (e) => {
    localStorage.setItem(Z, e);
  },
  Je = () => !!localStorage.getItem(Z),
  Ke = (e) => {
    const n = Pe(e),
      t = Be(e),
      o = qe(e);
    return { id: t, anchor: n, index: o };
  },
  L = (e, n) => {
    const { children: t } = q(),
      o = [];
    return (
      e.forEach((r) => {
        if (r.length === 0) return o;
        let s;
        r.forEach((l, c) => {
          c === 0 ? (s = n[l]) : c !== r.length && s && s[t] && (s = s[t][l]);
        }),
          s && o.push(s);
      }),
      o
    );
  },
  Ue = (e, n) => {
    const t = e.length;
    for (let o = 0; o < t - 1; o++)
      for (let r = 0; r < t - o - 1; r++) {
        const s = e[r],
          l = e[r + 1];
        let c = 0;
        for (; c < s.length || c < l.length; ) {
          if (l[c] > s[c] || s[c] === void 0) {
            [e[r], e[r + 1]] = [e[r + 1], e[r]][(n[r], n[r + 1])] = [
              n[r + 1],
              n[r]
            ];
            break;
          }
          if (s[c] > l[c]) break;
          c++;
        }
      }
    return [e, n];
  },
  se = (e) => JSON.parse(JSON.stringify(e)),
  fe = (e, n) => {
    const { children: t } = q();
    return (
      e.forEach((o, r) => {
        const s = n.slice();
        s.push(r), (o.anchor = s.slice()), o[t] && fe(o[t], s);
      }),
      e
    );
  },
  Ye = (e, n) => {
    const t = [];
    let o = !1;
    return (
      e.forEach((r) => {
        const s = n.length > r.length ? r.length : n.length,
          l = [];
        let c = 0,
          u = 0;
        for (; c < r.length && u < n.length && r[c] === n[u]; )
          l.push(r[c]), c++, u++;
        l.length === s
          ? ((o = !0),
            t.findIndex((E) => E.toString() === l.toString()) === -1 &&
              t.push(l))
          : t.findIndex((E) => E.toString() === r.toString()) === -1 &&
            t.push(r);
      }),
      o || t.push(n),
      t
    );
  },
  Xe = () => je.guid(),
  Ge = () => {
    let e;
    return function () {
      return e || ((e = document.querySelector(".tree-context-menu")), e);
    };
  },
  Qe = (e) => {
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
      menu: Ge()
    };
  },
  T = () => window.$tree,
  q = () => {
    const { fieldNames: e } = T();
    return e;
  },
  _e = (e) => e.preventDefault(),
  B = (e) => e.stopPropagation();
let ge = class I extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }
  constructor() {
    super(), arguments.length && I.custom.apply(this, arguments);
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
    this.setAttribute("tabIndex", 0),
      this.setAttribute("role", "tooltip"),
      this.closeMode || (this.closeMode = "hide"),
      this.addEventListener("click", () => {
        this[this.closeMode]();
      }),
      this.dispatchEvent(
        new CustomEvent("connected", {
          detail: {
            type: "ui-lighttip"
          }
        })
      ),
      (this.isConnectedCallback = !0);
  }
  attributeChangedCallback(n, t, o) {
    n == "open" &&
      typeof t != typeof o &&
      (typeof o == "string"
        ? (clearTimeout(this.timer),
          (this.timer = setTimeout(() => {
            (this.isTimeHide = !0), this[this.closeMode](), this.position();
          }, this.time)),
          this.setAttribute("data-tid", this.timer),
          this.classList.add("ESC"),
          this.zIndex(),
          this.position())
        : this.classList.remove("ESC"),
      this.tabIndex(),
      (this.isTimeHide = null));
  }
  zIndex() {
    var n = 19;
    this.parentElement &&
      [...this.parentElement.childNodes].forEach(function (t) {
        if (t.nodeType == 1) {
          var o = window.getComputedStyle(t),
            r = o.zIndex * 1;
          r && o.display != "none" && (n = Math.max(r + 1, n));
        }
      }),
      (this.style.zIndex = n);
  }
  // 定位处理
  position() {
    var n = [
        ...document.querySelectorAll('ui-lighttip[open]:not([type="loading"])')
      ],
      t = n.sort(function (s, l) {
        return (
          (s.getAttribute("data-tid") || 0) - (l.getAttribute("data-tid") || 0)
        );
      }),
      o = {},
      r = -1;
    t.forEach((s) => {
      let l = s.textContent;
      typeof o[l] > "u" && (r++, (o[l] = r)),
        s.style.setProperty("--ui-sort-index", o[l]);
    });
  }
  // 新的元素层级总是最高
  tabIndex() {
    var n = this,
      t = I.lastActiveElement;
    if (this.open == !0) {
      var o = document.activeElement;
      o &&
        !o.closest("[keepfocus]") &&
        (n !== o && (I.lastActiveElement = o), n.focus());
    } else
      t &&
        !t.matches("body") &&
        (t.focus({
          preventScroll: !0
        }),
        !window.isKeyEvent && !this.isTimeHide && t.blur(),
        (I.lastActiveElement = null));
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
    return (n = n || "正在加载中..."), this.custom(n, "loading");
  }
  // 调用方法处理
  static custom(n = "", t, o) {
    if (!this.matches || !this.matches("ui-lighttip"))
      return I.custom.apply(document.createElement("ui-lighttip"), arguments);
    if ((typeof n == "object" && ((t = n), (n = "")), typeof n != "string"))
      return this;
    if (((this.closeMode = "remove"), t && typeof t == "object")) {
      I.custom.call(this, n, t.type, t.time);
      return;
    }
    if (typeof t == "number") {
      I.custom.call(this, n, o, t);
      return;
    }
    return (
      t == "loading" && (n || (n = "正在加载中..."), (o = 999999)),
      o && (this.time = o),
      t && (this.type = t),
      (this.innerHTML = n),
      t == "success"
        ? this.setAttribute("aria-lable", "操作成功")
        : t == "error" && this.setAttribute("aria-lable", "操作失败"),
      this.parentElement ||
        (document.body.appendChild(this),
        this.dispatchEvent(new CustomEvent("DOMContentLoaded"))),
      this.show(),
      this
    );
  }
  remove() {
    this.parentElement && this.parentElement.removeChild(this),
      (this.open = !1);
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
const Re = {
    treeData: [],
    flattenData: {},
    status: pe.stop,
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
  },
  me = xe({
    name: "tree",
    initialState: Re,
    reducers: {
      initTreeData: (e, n) => {
        e.treeData = se(n.payload);
      },
      initFlattenData: (e, n) => {
        e.flattenData = se(n.payload);
      },
      setStart: (e, { payload: n }) => {
        const [t, o, r] = n;
        e.start.ids = t;
        const [s, l] = Ue(o, r);
        (e.start.anchors = s),
          (e.start.indexes = l),
          L(s, e.treeData).forEach((u) => {
            u.selected = !0;
          });
      },
      clearSelected: (e) => {
        const n = L(e.start.anchors, e.treeData);
        n.length &&
          n.forEach((t) => {
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
        const [t, o, r] = n,
          s = L([t], e.treeData)[0];
        s[o] = r;
      },
      refresh: (e) => {
        const { key: n } = q();
        function t(o, r) {
          o == null ||
            o.forEach((s, l) => {
              const c = [...r];
              c.push(l), (s.anchor = c.slice());
              const u = e.start.ids.indexOf(s[n]),
                g = e.over.id === s[n];
              u !== -1 && (e.start.anchors[u] = s.anchor),
                g && (e.over.anchor = s.anchor),
                s.children && t(s.children, s.anchor);
            });
        }
        e.treeData.forEach((o, r) => {
          o.anchor = [r];
          const s = e.start.ids.indexOf(o[n]),
            l = e.over.id === o[n];
          s !== -1 && (e.start.anchors[s] = o.anchor),
            l && (e.over.anchor = o.anchor),
            o.children && t(o.children, o.anchor);
        });
      },
      moveNode: (e) => {
        const n = e.start,
          t = e.over,
          o = t.anchor.length === 0;
        n.anchors.forEach((r, s) => {
          var S, x, v;
          const l = r.length === 1,
            c = L([r], e.treeData)[0],
            u = L([t.anchor], e.treeData)[0];
          let g = e.start.indexes[s];
          if (!u && !o) return;
          const E = r.slice();
          E.pop();
          const b = L([E], e.treeData)[0];
          o
            ? (e.treeData.splice(t.index, 0, c),
              l
                ? (g >= t.index && (g += 1), e.treeData.splice(g, 1))
                : (S = b.children) == null || S.splice(g, 1))
            : ((x = u.children) == null || x.splice(t.index, 0, c),
              u &&
                (b == null ? void 0 : b.id) === u.id &&
                g >= t.index &&
                (g += 1),
              l
                ? e.treeData.splice(g, 1)
                : (v = b.children) == null || v.splice(g, 1));
        });
      },
      removeNode: (e) => {
        const { children: n } = q();
        e.start.anchors.forEach((t, o) => {
          var r;
          if (t.length === 1) e.treeData.splice(e.start.indexes[o], 1);
          else {
            const s = t.slice();
            s.pop(),
              (r = L([s], e.treeData)[0][n]) == null ||
                r.splice(e.start.indexes[o], 1);
          }
        });
      },
      copyNode: (e) => {
        const n = L(e.start.anchors, e.treeData);
        Fe(JSON.stringify(n));
      },
      pasteNode: (e) => {
        const { key: n, children: t, name: o, slot: r } = q(),
          s = e.start.anchors[0].slice();
        s.pop();
        const l = Ze();
        if (l) {
          const c = JSON.parse(l);
          if (
            (c.forEach((u) => {
              (u[n] = Xe()),
                (u[o] = `${u[o]}_Copy`),
                c.length === 1 && (u.selected = !1);
            }),
            s.length === 0)
          )
            e.treeData.splice(e.start.indexes[0], 0, c);
          else {
            const u = L([e.start.anchors[0]], e.treeData)[0];
            u[r] === !0
              ? u[t].unshift(...c)
              : L([s], e.treeData)[0][t].splice(e.start.indexes[0], 0, ...c);
          }
          ze();
        }
      }
    }
  }),
  {
    initFlattenData: xt,
    clearSelected: ie,
    initTreeData: et,
    updateNode: ae,
    removeNode: ce,
    pasteNode: tt,
    setStatus: nt,
    copyNode: le,
    moveNode: ot,
    setStart: de,
    setOver: rt,
    refresh: V
  } = me.actions,
  st = me.reducer,
  ve = () => {
    const e = ue(),
      n = X((p) => p.tree.start),
      t = (p) => {
        o();
      },
      o = () => {
        const { menu: p, contextMenu: k } = T();
        k !== !1 && (p().style.visibility = "hidden");
      },
      r = (p, k, M) => {
        const { selectable: j } = T();
        j !== !1 && (e(ie()), e(de([p, k, M])));
      },
      s = (p, k) => {
        e(rt([p, k]));
      },
      l = (p, k) => {
        e(ae([p, "lock", k]));
      },
      c = (p, k) => {
        e(ae([p, "hidden", k]));
      },
      u = () => {
        e(le()), o(), new LightTip("复制成功", "success");
      },
      g = () => {
        e(le()), e(ce()), e(V()), o(), new LightTip("剪切成功", "success");
      },
      E = () => {
        e(tt()), e(V()), o(), new LightTip("粘贴成功", "success");
      },
      b = () => {
        e(ce()), e(V()), o(), new LightTip("删除成功", "success");
      },
      S = () => {
        e(ot()), e(V());
      },
      x = (p) => {
        e(nt(p));
      },
      v = (p) => {
        const { foldIconDisplay: k } = T();
        k === "hover" && p.currentTarget.classList.add("tree-mouse-in");
      },
      N = (p) => {
        const { foldIconDisplay: k } = T();
        k === "hover" && p.currentTarget.classList.remove("tree-mouse-in");
      },
      D = () => {
        const { menu: p } = T();
        p().setAttribute("data-paste", String(Je()));
      },
      P = (p, k) => {
        const { menu: M } = T(),
          j = M().clientHeight,
          O = document.documentElement.clientHeight;
        let W = k;
        k + j > O && (W = W - j),
          (M().style.left = `${p}px`),
          (M().style.top = `${W}px`),
          (M().style.visibility = "visible");
      };
    return {
      select: r,
      over: s,
      dragStatus: x,
      lock: l,
      hidden: c,
      copy: u,
      cut: g,
      paste: E,
      remove: b,
      move: S,
      mouseEnter: v,
      mouseLeave: N,
      rightClick: (p) => {
        const { contextMenu: k } = T();
        if (k === !1) return;
        p.stopPropagation(), p.preventDefault();
        const M = Ve(p);
        if (M) {
          const { id: j, anchor: O, index: W } = Ke(M);
          n.ids.indexOf(j) === -1 && (e(ie()), e(de([[j], [O], [W]]))),
            D(),
            P(p.clientX, p.clientY);
        }
      },
      hideMenu: o,
      handleTreeMouseDown: t
    };
  },
  it = (e) =>
    /* @__PURE__ */ h.createElement(
      "svg",
      { width: 14, height: 14, viewBox: "0 0 48 48", fill: "none", ...e },
      /* @__PURE__ */ h.createElement("path", {
        d: "M14 11L4 24L14 37H44V11H14Z",
        fill: "none",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M21 19L31 29",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M31 19L21 29",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      })
    ),
  at = (e) =>
    /* @__PURE__ */ h.createElement(
      "svg",
      { width: 14, height: 14, viewBox: "0 0 48 48", fill: "none", ...e },
      /* @__PURE__ */ h.createElement("path", {
        d:
          "M17 7H16H10C8.89543 7 8 7.89543 8 9L8 42C8 43.1046 8.89543 44 10 44H38C39.1046 44 40 43.1046 40 42V9C40 7.89543 39.1046 7 38 7H33.0499H31",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("rect", {
        x: 17,
        y: 4,
        width: 14,
        height: 6,
        fill: "none",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinejoin: "miter"
      })
    ),
  ct = (e) =>
    /* @__PURE__ */ h.createElement(
      "svg",
      { width: 14, height: 14, viewBox: "0 0 48 48", fill: "none", ...e },
      /* @__PURE__ */ h.createElement("path", {
        d:
          "M11 42C13.7614 42 16 39.7614 16 37C16 34.2386 13.7614 32 11 32C8.23858 32 6 34.2386 6 37C6 39.7614 8.23858 42 11 42Z",
        fill: "none",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d:
          "M37 42C39.7614 42 42 39.7614 42 37C42 34.2386 39.7614 32 37 32C34.2386 32 32 34.2386 32 37C32 39.7614 34.2386 42 37 42Z",
        fill: "none",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M15.3774 39.4131L17.5 35.8162L34.5 6.37138",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinecap: "square"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M13.4957 6.17518L30.4957 35.62L32.6265 39.4131",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinecap: "square"
      })
    ),
  lt = (e) =>
    /* @__PURE__ */ h.createElement(
      "svg",
      { width: 14, height: 14, viewBox: "0 0 48 48", fill: "none", ...e },
      /* @__PURE__ */ h.createElement("path", {
        d:
          "M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d:
          "M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z",
        fill: "none",
        stroke: "var(--icon)",
        strokeWidth: 3,
        strokeLinejoin: "miter"
      })
    );
const dt = (e) => {
    const { copy: n, paste: t, cut: o, remove: r, contextMenu: s } = e;
    return s
      ? Se(
          /* @__PURE__ */ y("ul", {
            onMouseUp: B,
            onMouseDown: B,
            onMouseMove: B,
            onContextMenu: B,
            className: "tree-context-menu",
            "data-paste": "false",
            children: [
              /* @__PURE__ */ y("li", {
                onClick: () => (n == null ? void 0 : n()),
                children: [
                  /* @__PURE__ */ y("span", {
                    className: "menu-item",
                    children: [
                      /* @__PURE__ */ a(lt, { className: "i-icon" }),
                      "复制"
                    ]
                  }),
                  /* @__PURE__ */ a("span", { children: "⌘C" })
                ]
              }),
              /* @__PURE__ */ y("li", {
                onClick: () => (t == null ? void 0 : t()),
                children: [
                  /* @__PURE__ */ y("span", {
                    className: "menu-item",
                    children: [
                      /* @__PURE__ */ a(at, { className: "i-icon" }),
                      "粘贴"
                    ]
                  }),
                  /* @__PURE__ */ a("span", { children: "⌘V" })
                ]
              }),
              /* @__PURE__ */ y("li", {
                onClick: () => (o == null ? void 0 : o()),
                children: [
                  /* @__PURE__ */ y("span", {
                    className: "menu-item",
                    children: [
                      /* @__PURE__ */ a(ct, { className: "i-icon" }),
                      "剪切"
                    ]
                  }),
                  /* @__PURE__ */ a("span", { children: "⌘X" })
                ]
              }),
              /* @__PURE__ */ y("li", {
                onClick: () => (r == null ? void 0 : r()),
                children: [
                  /* @__PURE__ */ y("span", {
                    className: "menu-item",
                    children: [
                      /* @__PURE__ */ a(it, { className: "i-icon" }),
                      "删除"
                    ]
                  }),
                  /* @__PURE__ */ a("span", { children: "Del" })
                ]
              })
            ]
          }),
          document.body
        )
      : /* @__PURE__ */ a($, {});
  },
  ht = (e) =>
    /* @__PURE__ */ h.createElement(
      "svg",
      { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e },
      /* @__PURE__ */ h.createElement("path", {
        d:
          "M6 16C6.63472 17.2193 7.59646 18.3504 8.82276 19.3554C12.261 22.1733 17.779 24 24 24C30.221 24 35.739 22.1733 39.1772 19.3554C40.4035 18.3504 41.3653 17.2193 42 16",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M28.9775 24L31.048 31.7274",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M37.3535 21.3536L43.0103 27.0104",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M5.00004 27.0103L10.6569 21.3534",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M16.9278 31.7276L18.9983 24.0001",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinecap: "square",
        strokeLinejoin: "miter"
      })
    ),
  ut = (e) =>
    /* @__PURE__ */ h.createElement(
      "svg",
      { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e },
      /* @__PURE__ */ h.createElement("path", {
        d:
          "M24 36C35.0457 36 44 24 44 24C44 24 35.0457 12 24 12C12.9543 12 4 24 4 24C4 24 12.9543 36 24 36Z",
        fill: "none",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinejoin: "round"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d:
          "M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z",
        fill: "none",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinejoin: "round"
      })
    ),
  pt = (e) =>
    /* @__PURE__ */ h.createElement(
      "svg",
      { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e },
      /* @__PURE__ */ h.createElement("rect", {
        x: 7,
        y: 22.0476,
        width: 34,
        height: 22,
        rx: 2,
        fill: "none",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinejoin: "round"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d:
          "M14 22V14.0047C13.9948 8.87022 17.9227 4.56718 23.0859 4.05117C28.249 3.53516 32.9673 6.97408 34 12.0059",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M24 30V36",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })
    ),
  ft = (e) =>
    /* @__PURE__ */ h.createElement(
      "svg",
      { width: 12, height: 12, viewBox: "0 0 48 48", fill: "none", ...e },
      /* @__PURE__ */ h.createElement("rect", {
        x: 6,
        y: 22,
        width: 36,
        height: 22,
        rx: 2,
        fill: "none",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinejoin: "round"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M14 22V14C14 8.47715 18.4772 4 24 4C29.5228 4 34 8.47715 34 14V22",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }),
      /* @__PURE__ */ h.createElement("path", {
        d: "M24 30V36",
        stroke: "#969696",
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })
    ),
  gt = (e) => {
    const { node: n, lock: t, hidden: o } = e;
    return n
      ? /* @__PURE__ */ y("div", {
          className: "action",
          children: [
            /* @__PURE__ */ y("div", {
              onMouseDown: (r) => (t == null ? void 0 : t(r, n)),
              onMouseUp: B,
              className: "lock-wrap",
              children: [
                n.lock
                  ? /* @__PURE__ */ a(ft, {
                      className: `i-lock ${n.lock && "show"}`
                    })
                  : /* @__PURE__ */ a(pt, { className: "i-unlock" }),
                /* @__PURE__ */ a("span", {
                  className: "lock-dot",
                  children: "·"
                })
              ]
            }),
            /* @__PURE__ */ y("div", {
              onMouseDown: (r) => (o == null ? void 0 : o(r, n)),
              onMouseUp: B,
              className: "hidden-wrap",
              children: [
                n.hidden
                  ? /* @__PURE__ */ a(ht, {
                      className: `i-invisible ${n.hidden ? "show" : ""}`
                    })
                  : /* @__PURE__ */ a(ut, { className: "i-visible" }),
                /* @__PURE__ */ a("span", {
                  className: "visible-dot",
                  children: "·"
                })
              ]
            })
          ]
        })
      : /* @__PURE__ */ a($, {});
  },
  he = (e) => {
    const { indent: n, node: t, virtual: o, switcherIcon: r } = e,
      { slot: s } = q();
    return t
      ? /* @__PURE__ */ a("div", {
          className: "node-indent",
          children:
            n == null
              ? void 0
              : n.map((l, c) =>
                  /* @__PURE__ */ a(
                    "span",
                    {
                      children:
                        !o &&
                        c === n.length - 1 &&
                        t[s] &&
                        /* @__PURE__ */ a("label", {
                          className: "label-fold",
                          htmlFor: `fold-${t.id}`,
                          children: r == null ? void 0 : r()
                        })
                    },
                    c
                  )
                )
        })
      : /* @__PURE__ */ a($, {});
  },
  ke = ({ Icom: e, node: n }) => {
    if (!e) return /* @__PURE__ */ a($, {});
    if (typeof e == "string")
      return /* @__PURE__ */ a("i", {
        className: "icon",
        children: /* @__PURE__ */ a("img", { src: e })
      });
    if (typeof e == "object") return /* @__PURE__ */ a($, { children: e });
    if (typeof ke == "function") return /* @__PURE__ */ a(e, { ...n });
  },
  mt = (e) => {
    var _;
    const {
        data: n,
        lineRef: t,
        containerRef: o,
        defaultSelectMulti: r,
        draggable: s,
        icon: l,
        switcherIcon: c,
        onDragEnter: u,
        onDragLeave: g,
        onDragOver: E,
        onDrop: b,
        onDragEnd: S,
        onDragStart: x
      } = e,
      v = n,
      N = ve(),
      D = X((d) => d.tree.start),
      P =
        (_ = o == null ? void 0 : o.current) == null
          ? void 0
          : _.getBoundingClientRect().top,
      { key: z } = q(),
      p = (d, f) => {
        d.stopPropagation(), N.lock(f.anchor, !f.lock);
      },
      k = (d, f) => {
        d.stopPropagation(), N.hidden(f.anchor, !f.hidden);
      },
      M = (d, f, w, i) => {
        d.stopPropagation(),
          N.select([f], [w], [i]),
          (window.$tree.drag.start.id = f),
          (window.$tree.dragNode = d.currentTarget);
        const C = L([w], v)[0];
        x == null || x({ event: d, node: C });
      },
      j = (d, f) => {
        d.stopPropagation(), d.preventDefault();
        const w = L([f], v)[0];
        u == null || u({ event: d, node: w });
      },
      O = (d, f, w, i, C, m, H) => {
        var R, ee, te, ne, oe;
        d.stopPropagation(), d.preventDefault();
        const F = L([C], v)[0];
        E == null || E({ event: d, node: F });
        const A = d.currentTarget,
          J = C.slice();
        if (
          (J.pop(),
          (A.style.boxShadow = "none"),
          (window.$tree.drag.over = !0),
          f || window.$tree.drag.start.id === i)
        ) {
          window.$tree.drag.over = !1;
          return;
        }
        if (
          (te =
            (ee =
              (R = window.$tree.dragNode) == null ? void 0 : R.parentNode) ==
            null
              ? void 0
              : ee.nextSibling) == null
            ? void 0
            : te.contains(A)
        ) {
          t != null && t.current && (t.current.style.opacity = "0"),
            (window.$tree.drag.over = !1);
          return;
        }
        const K = d.pageY,
          U = A.getBoundingClientRect().top,
          Y = U + 30 / 2;
        if (w && i !== window.$tree.drag.start.id && K > Y - 7 && K < Y + 7) {
          t != null && t.current && (t.current.style.opacity = "0"),
            (A.style.boxShadow = "inset 0 0 0px 1px blue"),
            N.over(C, H);
          return;
        }
        if (
          (t != null && t.current && (t.current.style.opacity = "1"), K > Y)
        ) {
          const Le =
            ((oe =
              (ne = A == null ? void 0 : A.nextSibling) == null
                ? void 0
                : ne.querySelector("label")) == null
              ? void 0
              : oe.control.checked) === !1;
          if (w && Le && H > 0) {
            t != null && t.current && (t.current.style.opacity = "0"),
              (window.$tree.drag.over = !1);
            return;
          }
          t != null &&
            t.current &&
            (t.current.style.top = `${U - (P || 0) + 30}px`),
            N.over(J, m);
        } else
          t != null && t.current && (t.current.style.top = `${U - (P || 0)}px`),
            N.over(J, m + 1);
        t != null &&
          t.current &&
          (t.current.style.left = `${Oe(A).offsetLeft - 10}px`);
      },
      W = (d, f) => {
        d.stopPropagation();
        const w = d.currentTarget;
        w.style.boxShadow = "none";
        const i = L([f], v)[0];
        g == null || g({ event: d, node: i });
      },
      we = (d, f) => {
        const w = L([f], v)[0];
        S == null || S({ event: d, node: w });
      },
      ye = (d, f, w) => {
        d.stopPropagation();
        const i = d.currentTarget;
        if (
          (t != null && t.current && (t.current.style.opacity = "0"),
          (i.style.boxShadow = "none"),
          f || !window.$tree.drag.over)
        )
          return;
        const C = L([w], v)[0],
          m = L(D.anchors, v);
        b == null ||
          b({ event: d, node: C, dragNodes: m, dragNodesKeys: D.anchors }),
          N.move();
      },
      be = (d, f, w, i) => {
        if (!(D.ids.includes(f) || d.button === 2)) {
          if (d.metaKey && r) {
            const C = [...D.ids, f],
              m = Ye(D.anchors, w),
              H = m.map((F) => F.slice().pop());
            N.select(C, m, H);
            return;
          }
          N.select([f], [w], [i]);
        }
      };
    if (!(v != null && v.length)) return /* @__PURE__ */ a($, {});
    const Q = (d, f, w) =>
      d.map((i, C) =>
        /* @__PURE__ */ y(
          "div",
          {
            className: "node-item",
            children: [
              /* @__PURE__ */ a("input", {
                className: "tree-hidden",
                type: "checkbox",
                id: `fold-${i.id}`,
                name: "node-fold"
              }),
              /* @__PURE__ */ y("div", {
                className: "node-info",
                "data-root": i.root,
                "data-lock": i.lock,
                "data-hidden": i.hidden,
                "data-anchor": i.anchor,
                "data-id": i[z],
                "data-index": w - C,
                children: [
                  /* @__PURE__ */ y("div", {
                    className: `node-label ${
                      i != null && i.selected ? "selected" : ""
                    } ${i != null && i.edit ? "edit" : ""}`,
                    style: { color: i.hidden ? "#bebebe" : "inherit" },
                    draggable: !i.root && !i.lock && s,
                    onDragStart: (m) => M(m, i.id, i.anchor, w - C),
                    onDragEnter: (m) => j(m, i.anchor),
                    onDragOver: (m) => {
                      var H;
                      return O(
                        m,
                        i.root,
                        i.slot,
                        i.id,
                        i.anchor,
                        w - C,
                        ((H = i == null ? void 0 : i.children) == null
                          ? void 0
                          : H.length) || 0
                      );
                    },
                    onDragLeave: (m) => W(m, i.anchor),
                    onDragEnd: (m) => we(m, i.anchor),
                    onDrop: (m) => ye(m, i.root, i.anchor),
                    onMouseDown: (m) => be(m, i.id, i.anchor, C),
                    children: [
                      /* @__PURE__ */ a(he, {
                        node: i,
                        virtual: !0,
                        indent: f,
                        switcherIcon: c
                      }),
                      /* @__PURE__ */ y("div", {
                        className: "node-name",
                        children: [
                          /* @__PURE__ */ a(ke, {
                            Icom: l || i.icon,
                            node: i
                          }),
                          /* @__PURE__ */ a("span", { children: i.name })
                        ]
                      })
                    ]
                  }),
                  /* @__PURE__ */ a("div", {
                    className: "fold-wrap",
                    children: /* @__PURE__ */ a(he, {
                      node: i,
                      virtual: !1,
                      indent: f,
                      switcherIcon: c
                    })
                  }),
                  !i.root &&
                    /* @__PURE__ */ a(gt, {
                      node: i,
                      lock: p,
                      hidden: k,
                      prevent: _e
                    })
                ]
              }),
              i.children &&
                /* @__PURE__ */ a("div", {
                  className: "node-children",
                  style: {
                    color: i.hidden ? "#bebebe" : "inherit"
                  },
                  children: Q(
                    i.children.slice().reverse(),
                    f.concat([0]),
                    i.children.length - 1
                  )
                })
            ]
          },
          i[z]
        )
      );
    return /* @__PURE__ */ a($, {
      children: Q(v.slice().reverse(), [0], v.length - 1)
    });
  },
  vt = (e) => {
    const {
        mouseEnter: n,
        mouseLeave: t,
        copy: o,
        cut: r,
        paste: s,
        remove: l,
        rightClick: c,
        handleTreeMouseDown: u
      } = ve(),
      { data: g, theme: E } = e,
      [b, S] = Ce(),
      x = re(null),
      v = re(null),
      N = X((P) => P.tree.treeData),
      D = ue();
    return (
      Ne(() => {
        if (!(!g || g.length === 0))
          return (
            Qe(e),
            S(T()),
            D(et(fe(g, []))),
            document.documentElement.addEventListener("mousedown", u),
            () => {
              document.documentElement.removeEventListener("mousedown", u);
            }
          );
      }, [g]),
      b
        ? /* @__PURE__ */ y("section", {
            className: De(
              b.foldIconDisplay === G.always ? "tree-fold-show" : "",
              E ? `theme-${E}-tree` : "theme-default-tree"
            ),
            ref: v,
            style: b.style,
            onMouseEnter: n,
            onMouseLeave: t,
            onContextMenu: c,
            children: [
              /* @__PURE__ */ y("div", {
                className: "tree-container",
                children: [
                  /* @__PURE__ */ a(mt, {
                    ...b,
                    data: N,
                    lineRef: x,
                    containerRef: v
                  }),
                  /* @__PURE__ */ a("div", {
                    ref: x,
                    className: "tree-drop-line"
                  })
                ]
              }),
              /* @__PURE__ */ a(dt, {
                ...b,
                copy: o,
                cut: r,
                paste: s,
                remove: l
              })
            ]
          })
        : /* @__PURE__ */ a($, {})
    );
  },
  kt = Me({
    reducer: {
      tree: st
    }
  });
const Mt = (e) =>
  /* @__PURE__ */ a(Ee, {
    store: kt,
    children: /* @__PURE__ */ a(vt, { ...e })
  });
export { Mt as default };
