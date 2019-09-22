var e,
    r = require("react-dom"),
    t = require("mobx-react-lite"),
    n = require("react"),
    o = (e = n) && "object" == typeof e && "default" in e ? e.default : e,
    i = require("mobx"),
    a = 0,
    s = {}
function c(e) {
    return (
        s[e] ||
            (s[e] = (function(e) {
                if ("function" == typeof Symbol) return Symbol(e)
                var r = "__$mobx-react " + e + " (" + a + ")"
                return a++, r
            })(e)),
        s[e]
    )
}
function u(e, r) {
    if (f(e, r)) return !0
    if ("object" != typeof e || null === e || "object" != typeof r || null === r) return !1
    var t = Object.keys(e),
        n = Object.keys(r)
    if (t.length !== n.length) return !1
    for (var o = 0; o < t.length; o++)
        if (!hasOwnProperty.call(r, t[o]) || !f(e[t[o]], r[t[o]])) return !1
    return !0
}
function f(e, r) {
    return e === r ? 0 !== e || 1 / e == 1 / r : e != e && r != r
}
var p = {
    $$typeof: 1,
    render: 1,
    compare: 1,
    type: 1,
    childContextTypes: 1,
    contextType: 1,
    contextTypes: 1,
    defaultProps: 1,
    getDefaultProps: 1,
    getDerivedStateFromError: 1,
    getDerivedStateFromProps: 1,
    mixins: 1,
    propTypes: 1
}
function l(e, r, t) {
    Object.hasOwnProperty.call(e, r)
        ? (e[r] = t)
        : Object.defineProperty(e, r, { enumerable: !1, configurable: !0, writable: !0, value: t })
}
var b = c("patchMixins"),
    d = c("patchedDefinition")
function y(e, r) {
    for (var t = this, n = [], o = arguments.length - 2; o-- > 0; ) n[o] = arguments[o + 2]
    r.locks++
    try {
        var i
        return null != e && (i = e.apply(this, n)), i
    } finally {
        r.locks--,
            0 === r.locks &&
                r.methods.forEach(function(e) {
                    e.apply(t, n)
                })
    }
}
function m(e, r) {
    return function() {
        for (var t = [], n = arguments.length; n--; ) t[n] = arguments[n]
        y.call.apply(y, [this, e, r].concat(t))
    }
}
function v(e, r, t) {
    var n = (function(e, r) {
        var t = (e[b] = e[b] || {}),
            n = (t[r] = t[r] || {})
        return (n.locks = n.locks || 0), (n.methods = n.methods || []), n
    })(e, r)
    n.methods.indexOf(t) < 0 && n.methods.push(t)
    var o = Object.getOwnPropertyDescriptor(e, r)
    if (!o || !o[d]) {
        var i = (function e(r, t, n, o, i) {
            var a,
                s = m(i, o)
            return (
                ((a = {})[d] = !0),
                (a.get = function() {
                    return s
                }),
                (a.set = function(i) {
                    if (this === r) s = m(i, o)
                    else {
                        var a = e(this, t, n, o, i)
                        Object.defineProperty(this, t, a)
                    }
                }),
                (a.configurable = !0),
                (a.enumerable = n),
                a
            )
        })(e, r, o ? o.enumerable : void 0, n, e[r])
        Object.defineProperty(e, r, i)
    }
}
var h = i.$mobx || "$mobx",
    O = c("isUnmounted"),
    g = c("skipRender"),
    w = c("isForcingUpdate")
function x(e, r) {
    return (
        t.isUsingStaticRendering() &&
            console.warn(
                "[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side."
            ),
        this.state !== r || !u(this.props, e)
    )
}
function j(e, r) {
    var t = c("reactProp_" + r + "_valueHolder"),
        n = c("reactProp_" + r + "_atomHolder")
    function o() {
        return this[n] || l(this, n, i.createAtom("reactive " + r)), this[n]
    }
    Object.defineProperty(e, r, {
        configurable: !0,
        enumerable: !0,
        get: function() {
            return o.call(this).reportObserved(), this[t]
        },
        set: function(e) {
            this[w] || u(this[t], e)
                ? l(this, t, e)
                : (l(this, t, e), l(this, g, !0), o.call(this).reportChanged(), l(this, g, !1))
        }
    })
}
var P = "function" == typeof Symbol && Symbol.for,
    E = P
        ? Symbol.for("react.forward_ref")
        : "function" == typeof n.forwardRef && n.forwardRef(function() {}).$$typeof,
    C = P ? Symbol.for("react.memo") : "function" == typeof n.memo && n.memo(function() {}).$$typeof
function R(e) {
    if (
        (!0 === e.isMobxInjector &&
            console.warn(
                "Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'"
            ),
        C && e.$$typeof === C)
    )
        throw new Error(
            "Mobx observer: You are trying to use 'observer' on function component wrapped to either another observer or 'React.memo'. The observer already applies 'React.memo' for you."
        )
    if (E && e.$$typeof === E) {
        var r = e.render
        if ("function" != typeof r)
            throw new Error("render property of ForwardRef was not a function")
        return n.forwardRef(function() {
            var e = arguments
            return o.createElement(t.Observer, null, function() {
                return r.apply(void 0, e)
            })
        })
    }
    return "function" != typeof e ||
        (e.prototype && e.prototype.render) ||
        e.isReactClass ||
        Object.prototype.isPrototypeOf.call(n.Component, e)
        ? (function(e) {
              var r = e.prototype
              if (r.componentWillReact)
                  throw new Error("The componentWillReact life-cycle event is no longer supported")
              if (!(r instanceof n.PureComponent))
                  if (r.shouldComponentUpdate) {
                      if (r.shouldComponentUpdate !== x)
                          throw new Error(
                              "It is not allowed to use shouldComponentUpdate in observer based components."
                          )
                  } else r.shouldComponentUpdate = x
              j(r, "props"), j(r, "state")
              var o = r.render
              return (
                  (r.render = function() {
                      return function(e) {
                          var r = this
                          if (!0 === t.isUsingStaticRendering()) return e.call(this)
                          l(this, g, !1), l(this, w, !1)
                          var o =
                                  this.displayName ||
                                  this.name ||
                                  (this.constructor &&
                                      (this.constructor.displayName || this.constructor.name)) ||
                                  "<component>",
                              a = e.bind(this),
                              s = !1,
                              c = new i.Reaction(o + ".render()", function() {
                                  if (!s && ((s = !0), !0 !== r[O])) {
                                      var e = !0
                                      try {
                                          l(r, w, !0),
                                              r[g] || n.Component.prototype.forceUpdate.call(r),
                                              (e = !1)
                                      } finally {
                                          l(r, w, !1), e && c.dispose()
                                      }
                                  }
                              })
                          function u() {
                              s = !1
                              var e = void 0,
                                  r = void 0
                              if (
                                  (c.track(function() {
                                      try {
                                          r = i._allowStateChanges(!1, a)
                                      } catch (r) {
                                          e = r
                                      }
                                  }),
                                  e)
                              )
                                  throw e
                              return r
                          }
                          return (
                              (c.reactComponent = this), (u[h] = c), (this.render = u), u.call(this)
                          )
                      }.call(this, o)
                  }),
                  v(r, "componentWillUnmount", function() {
                      !0 !== t.isUsingStaticRendering() &&
                          (this.render[h] && this.render[h].dispose(), (this[O] = !0))
                  }),
                  e
              )
          })(e)
        : t.observer(e)
}
var S = o.createContext({})
function U(e) {
    var r = e.children,
        t = (function(e, r) {
            var t = {}
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && -1 === r.indexOf(n) && (t[n] = e[n])
            return t
        })(e, ["children"]),
        n = o.useContext(S),
        i = o.useRef(Object.assign({}, n, t)).current
    if ("production" !== process.env.NODE_ENV && !u(i, Object.assign({}, i, t)))
        throw new Error(
            "MobX Provider: The set of provided stores has changed. See: https://github.com/mobxjs/mobx-react#the-set-of-provided-stores-has-changed-error."
        )
    return o.createElement(S.Provider, { value: i }, r)
}
function k(e, r, t, i) {
    var a,
        s,
        c,
        u = o.forwardRef(function(t, i) {
            var a = Object.assign({}, t),
                s = o.useContext(S)
            return Object.assign(a, e(s || {}, a) || {}), i && (a.ref = i), n.createElement(r, a)
        })
    return (
        i && (u = R(u)),
        (u.isMobxInjector = !0),
        (a = r),
        (s = u),
        (c = Object.getOwnPropertyNames(Object.getPrototypeOf(a))),
        Object.getOwnPropertyNames(a).forEach(function(e) {
            p[e] ||
                -1 !== c.indexOf(e) ||
                Object.defineProperty(s, e, Object.getOwnPropertyDescriptor(a, e))
        }),
        (u.wrappedComponent = r),
        (u.displayName = (function(e, r) {
            var t = e.displayName || e.name || (e.constructor && e.constructor.name) || "Component"
            return r ? "inject-with-" + r + "(" + t + ")" : "inject(" + t + ")"
        })(r, t)),
        u
    )
}
U.displayName = "MobXProvider"
var A = c("disposeOnUnmountProto"),
    M = c("disposeOnUnmountInst")
function $() {
    var e = this
    ;(this[A] || []).concat(this[M] || []).forEach(function(r) {
        var t = "string" == typeof r ? e[r] : r
        null != t &&
            (Array.isArray(t)
                ? t.map(function(e) {
                      return e()
                  })
                : t())
    })
}
function T(e) {
    function r(r, t, n, o, a, s) {
        for (var c = [], u = arguments.length - 6; u-- > 0; ) c[u] = arguments[u + 6]
        return i.untracked(function() {
            return (
                (o = o || "<<anonymous>>"),
                (s = s || n),
                null == t[n]
                    ? r
                        ? new Error(
                              "The " +
                                  a +
                                  " `" +
                                  s +
                                  "` is marked as required in `" +
                                  o +
                                  "`, but its value is `" +
                                  (null === t[n] ? "null" : "undefined") +
                                  "`."
                          )
                        : null
                    : e.apply(void 0, [t, n, o, a, s].concat(c))
            )
        })
    }
    var t = r.bind(null, !1)
    return (t.isRequired = r.bind(null, !0)), t
}
function _(e) {
    var r = typeof e
    return Array.isArray(e)
        ? "array"
        : e instanceof RegExp
            ? "object"
            : (function(e, r) {
                  return (
                      "symbol" === e ||
                      "Symbol" === r["@@toStringTag"] ||
                      ("function" == typeof Symbol && r instanceof Symbol)
                  )
              })(r, e)
                ? "symbol"
                : r
}
function N(e, r) {
    return T(function(t, n, o, a, s) {
        return i.untracked(function() {
            if (e && _(t[n]) === r.toLowerCase()) return null
            var a
            switch (r) {
                case "Array":
                    a = i.isObservableArray
                    break
                case "Object":
                    a = i.isObservableObject
                    break
                case "Map":
                    a = i.isObservableMap
                    break
                default:
                    throw new Error("Unexpected mobxType: " + r)
            }
            var c = t[n]
            if (!a(c)) {
                var u = (function(e) {
                        var r = _(e)
                        if ("object" === r) {
                            if (e instanceof Date) return "date"
                            if (e instanceof RegExp) return "regexp"
                        }
                        return r
                    })(c),
                    f = e ? " or javascript `" + r.toLowerCase() + "`" : ""
                return new Error(
                    "Invalid prop `" +
                        s +
                        "` of type `" +
                        u +
                        "` supplied to `" +
                        o +
                        "`, expected `mobx.Observable" +
                        r +
                        "`" +
                        f +
                        "."
                )
            }
            return null
        })
    })
}
function q(e, r) {
    return T(function(t, n, o, a, s) {
        for (var c = [], u = arguments.length - 5; u-- > 0; ) c[u] = arguments[u + 5]
        return i.untracked(function() {
            if ("function" != typeof r)
                return new Error(
                    "Property `" + s + "` of component `" + o + "` has invalid PropType notation."
                )
            var i = N(e, "Array")(t, n, o)
            if (i instanceof Error) return i
            for (var u = t[n], f = 0; f < u.length; f++)
                if (
                    (i = r.apply(void 0, [u, f, o, a, s + "[" + f + "]"].concat(c))) instanceof
                    Error
                )
                    return i
            return null
        })
    })
}
var D = {
    observableArray: N(!1, "Array"),
    observableArrayOf: q.bind(null, !1),
    observableMap: N(!1, "Map"),
    observableObject: N(!1, "Object"),
    arrayOrObservableArray: N(!0, "Array"),
    arrayOrObservableArrayOf: q.bind(null, !0),
    objectOrObservableObject: N(!0, "Object")
}
if (!n.Component) throw new Error("mobx-react requires React to be available")
if (!i.observable) throw new Error("mobx-react requires mobx to be available")
"function" == typeof r.unstable_batchedUpdates &&
    i.configure({ reactionScheduler: r.unstable_batchedUpdates }),
    (exports.Observer = t.Observer),
    (exports.useObserver = t.useObserver),
    (exports.useAsObservableSource = t.useAsObservableSource),
    (exports.useLocalStore = t.useLocalStore),
    (exports.isUsingStaticRendering = t.isUsingStaticRendering),
    (exports.useStaticRendering = t.useStaticRendering),
    (exports.observer = R),
    (exports.Provider = U),
    (exports.MobXProviderContext = S),
    (exports.inject = function() {
        for (var e, r = [], t = arguments.length; t--; ) r[t] = arguments[t]
        return "function" == typeof arguments[0]
            ? ((e = arguments[0]),
              function(r) {
                  return k(e, r, e.name, !0)
              })
            : function(e) {
                  return k(
                      (function(e) {
                          return function(r, t) {
                              return (
                                  e.forEach(function(e) {
                                      if (!(e in t)) {
                                          if (!(e in r))
                                              throw new Error(
                                                  "MobX injector: Store '" +
                                                      e +
                                                      "' is not available! Make sure it is provided by some Provider"
                                              )
                                          t[e] = r[e]
                                      }
                                  }),
                                  t
                              )
                          }
                      })(r),
                      e,
                      r.join("-"),
                      !1
                  )
              }
    }),
    (exports.disposeOnUnmount = function e(r, t) {
        if (Array.isArray(t))
            return t.map(function(t) {
                return e(r, t)
            })
        var o = Object.getPrototypeOf(r).constructor || Object.getPrototypeOf(r.constructor),
            i = Object.getPrototypeOf(r.constructor)
        if (
            o !== n.Component &&
            o !== n.PureComponent &&
            i !== n.Component &&
            i !== n.PureComponent
        )
            throw new Error(
                "[mobx-react] disposeOnUnmount only supports direct subclasses of React.Component or React.PureComponent."
            )
        if ("string" != typeof t && "function" != typeof t && !Array.isArray(t))
            throw new Error(
                "[mobx-react] disposeOnUnmount only works if the parameter is either a property key or a function."
            )
        var a = !!r[A] || !!r[M]
        return (
            ("string" == typeof t ? r[A] || (r[A] = []) : r[M] || (r[M] = [])).push(t),
            a || v(r, "componentWillUnmount", $),
            "string" != typeof t ? t : void 0
        )
    }),
    (exports.PropTypes = D)
//# sourceMappingURL=mobx-react.js.map
