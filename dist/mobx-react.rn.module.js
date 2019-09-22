import { unstable_batchedUpdates as e } from "react-native"
import { isUsingStaticRendering as r, observer as t, Observer as n } from "mobx-react-lite"
export {
    Observer,
    useObserver,
    useAsObservableSource,
    useLocalStore,
    isUsingStaticRendering,
    useStaticRendering
} from "mobx-react-lite"
import o, {
    PureComponent as i,
    Component as a,
    forwardRef as c,
    memo as s,
    createElement as u
} from "react"
import {
    createAtom as f,
    _allowStateChanges as p,
    Reaction as l,
    $mobx as b,
    isObservableArray as y,
    isObservableObject as d,
    isObservableMap as h,
    untracked as m,
    observable as v,
    configure as O
} from "mobx"
var g = 0,
    w = {}
function j(e) {
    return (
        w[e] ||
            (w[e] = (function(e) {
                if ("function" == typeof Symbol) return Symbol(e)
                var r = "__$mobx-react " + e + " (" + g + ")"
                return g++, r
            })(e)),
        w[e]
    )
}
function x(e, r) {
    if (P(e, r)) return !0
    if ("object" != typeof e || null === e || "object" != typeof r || null === r) return !1
    var t = Object.keys(e),
        n = Object.keys(r)
    if (t.length !== n.length) return !1
    for (var o = 0; o < t.length; o++)
        if (!hasOwnProperty.call(r, t[o]) || !P(e[t[o]], r[t[o]])) return !1
    return !0
}
function P(e, r) {
    return e === r ? 0 !== e || 1 / e == 1 / r : e != e && r != r
}
var E = {
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
function S(e, r, t) {
    Object.hasOwnProperty.call(e, r)
        ? (e[r] = t)
        : Object.defineProperty(e, r, { enumerable: !1, configurable: !0, writable: !0, value: t })
}
var R = j("patchMixins"),
    k = j("patchedDefinition")
function A(e, r) {
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
function C(e, r) {
    return function() {
        for (var t = [], n = arguments.length; n--; ) t[n] = arguments[n]
        A.call.apply(A, [this, e, r].concat(t))
    }
}
function U(e, r, t) {
    var n = (function(e, r) {
        var t = (e[R] = e[R] || {}),
            n = (t[r] = t[r] || {})
        return (n.locks = n.locks || 0), (n.methods = n.methods || []), n
    })(e, r)
    n.methods.indexOf(t) < 0 && n.methods.push(t)
    var o = Object.getOwnPropertyDescriptor(e, r)
    if (!o || !o[k]) {
        var i = (function e(r, t, n, o, i) {
            var a,
                c = C(i, o)
            return (
                ((a = {})[k] = !0),
                (a.get = function() {
                    return c
                }),
                (a.set = function(i) {
                    if (this === r) c = C(i, o)
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
var M = b || "$mobx",
    $ = j("isUnmounted"),
    T = j("skipRender"),
    N = j("isForcingUpdate")
function D(e, t) {
    return (
        r() &&
            console.warn(
                "[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side."
            ),
        this.state !== t || !x(this.props, e)
    )
}
function _(e, r) {
    var t = j("reactProp_" + r + "_valueHolder"),
        n = j("reactProp_" + r + "_atomHolder")
    function o() {
        return this[n] || S(this, n, f("reactive " + r)), this[n]
    }
    Object.defineProperty(e, r, {
        configurable: !0,
        enumerable: !0,
        get: function() {
            return o.call(this).reportObserved(), this[t]
        },
        set: function(e) {
            this[N] || x(this[t], e)
                ? S(this, t, e)
                : (S(this, t, e), S(this, T, !0), o.call(this).reportChanged(), S(this, T, !1))
        }
    })
}
var I = "function" == typeof Symbol && Symbol.for,
    q = I ? Symbol.for("react.forward_ref") : "function" == typeof c && c(function() {}).$$typeof,
    F = I ? Symbol.for("react.memo") : "function" == typeof s && s(function() {}).$$typeof
function W(e) {
    if (
        (!0 === e.isMobxInjector &&
            console.warn(
                "Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'"
            ),
        F && e.$$typeof === F)
    )
        throw new Error(
            "Mobx observer: You are trying to use 'observer' on function component wrapped to either another observer or 'React.memo'. The observer already applies 'React.memo' for you."
        )
    if (q && e.$$typeof === q) {
        var s = e.render
        if ("function" != typeof s)
            throw new Error("render property of ForwardRef was not a function")
        return c(function() {
            var e = arguments
            return o.createElement(n, null, function() {
                return s.apply(void 0, e)
            })
        })
    }
    return "function" != typeof e ||
        (e.prototype && e.prototype.render) ||
        e.isReactClass ||
        Object.prototype.isPrototypeOf.call(a, e)
        ? (function(e) {
              var t = e.prototype
              if (t.componentWillReact)
                  throw new Error("The componentWillReact life-cycle event is no longer supported")
              if (!(t instanceof i))
                  if (t.shouldComponentUpdate) {
                      if (t.shouldComponentUpdate !== D)
                          throw new Error(
                              "It is not allowed to use shouldComponentUpdate in observer based components."
                          )
                  } else t.shouldComponentUpdate = D
              _(t, "props"), _(t, "state")
              var n = t.render
              return (
                  (t.render = function() {
                      return function(e) {
                          var t = this
                          if (!0 === r()) return e.call(this)
                          S(this, T, !1), S(this, N, !1)
                          var n =
                                  this.displayName ||
                                  this.name ||
                                  (this.constructor &&
                                      (this.constructor.displayName || this.constructor.name)) ||
                                  "<component>",
                              o = e.bind(this),
                              i = !1,
                              c = new l(n + ".render()", function() {
                                  if (!i && ((i = !0), !0 !== t[$])) {
                                      var e = !0
                                      try {
                                          S(t, N, !0),
                                              t[T] || a.prototype.forceUpdate.call(t),
                                              (e = !1)
                                      } finally {
                                          S(t, N, !1), e && c.dispose()
                                      }
                                  }
                              })
                          function s() {
                              i = !1
                              var e = void 0,
                                  r = void 0
                              if (
                                  (c.track(function() {
                                      try {
                                          r = p(!1, o)
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
                              (c.reactComponent = this), (s[M] = c), (this.render = s), s.call(this)
                          )
                      }.call(this, n)
                  }),
                  U(t, "componentWillUnmount", function() {
                      !0 !== r() && (this.render[M] && this.render[M].dispose(), (this[$] = !0))
                  }),
                  e
              )
          })(e)
        : t(e)
}
var L = o.createContext({})
function X(e) {
    var r = e.children,
        t = (function(e, r) {
            var t = {}
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && -1 === r.indexOf(n) && (t[n] = e[n])
            return t
        })(e, ["children"]),
        n = o.useContext(L),
        i = o.useRef(Object.assign({}, n, t)).current
    if ("production" !== process.env.NODE_ENV && !x(i, Object.assign({}, i, t)))
        throw new Error(
            "MobX Provider: The set of provided stores has changed. See: https://github.com/mobxjs/mobx-react#the-set-of-provided-stores-has-changed-error."
        )
    return o.createElement(L.Provider, { value: i }, r)
}
function H(e, r, t, n) {
    var i,
        a,
        c,
        s = o.forwardRef(function(t, n) {
            var i = Object.assign({}, t),
                a = o.useContext(L)
            return Object.assign(i, e(a || {}, i) || {}), n && (i.ref = n), u(r, i)
        })
    return (
        n && (s = W(s)),
        (s.isMobxInjector = !0),
        (i = r),
        (a = s),
        (c = Object.getOwnPropertyNames(Object.getPrototypeOf(i))),
        Object.getOwnPropertyNames(i).forEach(function(e) {
            E[e] ||
                -1 !== c.indexOf(e) ||
                Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(i, e))
        }),
        (s.wrappedComponent = r),
        (s.displayName = (function(e, r) {
            var t = e.displayName || e.name || (e.constructor && e.constructor.name) || "Component"
            return r ? "inject-with-" + r + "(" + t + ")" : "inject(" + t + ")"
        })(r, t)),
        s
    )
}
function Y() {
    for (var e, r = [], t = arguments.length; t--; ) r[t] = arguments[t]
    return "function" == typeof arguments[0]
        ? ((e = arguments[0]),
          function(r) {
              return H(e, r, e.name, !0)
          })
        : function(e) {
              return H(
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
}
X.displayName = "MobXProvider"
var V = j("disposeOnUnmountProto"),
    z = j("disposeOnUnmountInst")
function B() {
    var e = this
    ;(this[V] || []).concat(this[z] || []).forEach(function(r) {
        var t = "string" == typeof r ? e[r] : r
        null != t &&
            (Array.isArray(t)
                ? t.map(function(e) {
                      return e()
                  })
                : t())
    })
}
function G(e, r) {
    if (Array.isArray(r))
        return r.map(function(r) {
            return G(e, r)
        })
    var t = Object.getPrototypeOf(e).constructor || Object.getPrototypeOf(e.constructor),
        n = Object.getPrototypeOf(e.constructor)
    if (t !== a && t !== i && n !== a && n !== i)
        throw new Error(
            "[mobx-react] disposeOnUnmount only supports direct subclasses of React.Component or React.PureComponent."
        )
    if ("string" != typeof r && "function" != typeof r && !Array.isArray(r))
        throw new Error(
            "[mobx-react] disposeOnUnmount only works if the parameter is either a property key or a function."
        )
    var o = !!e[V] || !!e[z]
    return (
        ("string" == typeof r ? e[V] || (e[V] = []) : e[z] || (e[z] = [])).push(r),
        o || U(e, "componentWillUnmount", B),
        "string" != typeof r ? r : void 0
    )
}
function J(e) {
    function r(r, t, n, o, i, a) {
        for (var c = [], s = arguments.length - 6; s-- > 0; ) c[s] = arguments[s + 6]
        return m(function() {
            return (
                (o = o || "<<anonymous>>"),
                (a = a || n),
                null == t[n]
                    ? r
                        ? new Error(
                              "The " +
                                  i +
                                  " `" +
                                  a +
                                  "` is marked as required in `" +
                                  o +
                                  "`, but its value is `" +
                                  (null === t[n] ? "null" : "undefined") +
                                  "`."
                          )
                        : null
                    : e.apply(void 0, [t, n, o, i, a].concat(c))
            )
        })
    }
    var t = r.bind(null, !1)
    return (t.isRequired = r.bind(null, !0)), t
}
function K(e) {
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
function Q(e, r) {
    return J(function(t, n, o, i, a) {
        return m(function() {
            if (e && K(t[n]) === r.toLowerCase()) return null
            var i
            switch (r) {
                case "Array":
                    i = y
                    break
                case "Object":
                    i = d
                    break
                case "Map":
                    i = h
                    break
                default:
                    throw new Error("Unexpected mobxType: " + r)
            }
            var c = t[n]
            if (!i(c)) {
                var s = (function(e) {
                        var r = K(e)
                        if ("object" === r) {
                            if (e instanceof Date) return "date"
                            if (e instanceof RegExp) return "regexp"
                        }
                        return r
                    })(c),
                    u = e ? " or javascript `" + r.toLowerCase() + "`" : ""
                return new Error(
                    "Invalid prop `" +
                        a +
                        "` of type `" +
                        s +
                        "` supplied to `" +
                        o +
                        "`, expected `mobx.Observable" +
                        r +
                        "`" +
                        u +
                        "."
                )
            }
            return null
        })
    })
}
function Z(e, r) {
    return J(function(t, n, o, i, a) {
        for (var c = [], s = arguments.length - 5; s-- > 0; ) c[s] = arguments[s + 5]
        return m(function() {
            if ("function" != typeof r)
                return new Error(
                    "Property `" + a + "` of component `" + o + "` has invalid PropType notation."
                )
            var s = Q(e, "Array")(t, n, o)
            if (s instanceof Error) return s
            for (var u = t[n], f = 0; f < u.length; f++)
                if (
                    (s = r.apply(void 0, [u, f, o, i, a + "[" + f + "]"].concat(c))) instanceof
                    Error
                )
                    return s
            return null
        })
    })
}
var ee = {
    observableArray: Q(!1, "Array"),
    observableArrayOf: Z.bind(null, !1),
    observableMap: Q(!1, "Map"),
    observableObject: Q(!1, "Object"),
    arrayOrObservableArray: Q(!0, "Array"),
    arrayOrObservableArrayOf: Z.bind(null, !0),
    objectOrObservableObject: Q(!0, "Object")
}
if (!a) throw new Error("mobx-react requires React to be available")
if (!v) throw new Error("mobx-react requires mobx to be available")
"function" == typeof e && O({ reactionScheduler: e })
export {
    W as observer,
    X as Provider,
    L as MobXProviderContext,
    Y as inject,
    G as disposeOnUnmount,
    ee as PropTypes
}
//# sourceMappingURL=mobx-react.module.js.map
