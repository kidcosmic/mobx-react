!(function(e, r) {
    "object" == typeof exports && "undefined" != typeof module
        ? r(
              exports,
              require("react-dom"),
              require("mobx-react-lite"),
              require("react"),
              require("mobx")
          )
        : "function" == typeof define && define.amd
            ? define(["exports", "react-dom", "mobx-react-lite", "react", "mobx"], r)
            : r((e.mobxReact = {}), e.ReactDOM, e.mobxReactLite, e.React, e.mobx)
})(this, function(e, r, t, n, o) {
    var i = "default" in n ? n.default : n,
        a = 0,
        c = {}
    function s(e) {
        return (
            c[e] ||
                (c[e] = (function(e) {
                    if ("function" == typeof Symbol) return Symbol(e)
                    var r = "__$mobx-react " + e + " (" + a + ")"
                    return a++, r
                })(e)),
            c[e]
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
            : Object.defineProperty(e, r, {
                  enumerable: !1,
                  configurable: !0,
                  writable: !0,
                  value: t
              })
    }
    var b = s("patchMixins"),
        d = s("patchedDefinition")
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
    function h(e, r, t) {
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
                    c = m(i, o)
                return (
                    ((a = {})[d] = !0),
                    (a.get = function() {
                        return c
                    }),
                    (a.set = function(i) {
                        if (this === r) c = m(i, o)
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
    var v = o.$mobx || "$mobx",
        O = s("isUnmounted"),
        g = s("skipRender"),
        w = s("isForcingUpdate")
    function j(e, r) {
        return (
            t.isUsingStaticRendering() &&
                console.warn(
                    "[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side."
                ),
            this.state !== r || !u(this.props, e)
        )
    }
    function x(e, r) {
        var t = s("reactProp_" + r + "_valueHolder"),
            n = s("reactProp_" + r + "_atomHolder")
        function i() {
            return this[n] || l(this, n, o.createAtom("reactive " + r)), this[n]
        }
        Object.defineProperty(e, r, {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return i.call(this).reportObserved(), this[t]
            },
            set: function(e) {
                this[w] || u(this[t], e)
                    ? l(this, t, e)
                    : (l(this, t, e), l(this, g, !0), i.call(this).reportChanged(), l(this, g, !1))
            }
        })
    }
    var P = "function" == typeof Symbol && Symbol.for,
        R = P
            ? Symbol.for("react.forward_ref")
            : "function" == typeof n.forwardRef && n.forwardRef(function() {}).$$typeof,
        E = P
            ? Symbol.for("react.memo")
            : "function" == typeof n.memo && n.memo(function() {}).$$typeof
    function C(e) {
        if (
            (!0 === e.isMobxInjector &&
                console.warn(
                    "Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'"
                ),
            E && e.$$typeof === E)
        )
            throw new Error(
                "Mobx observer: You are trying to use 'observer' on function component wrapped to either another observer or 'React.memo'. The observer already applies 'React.memo' for you."
            )
        if (R && e.$$typeof === R) {
            var r = e.render
            if ("function" != typeof r)
                throw new Error("render property of ForwardRef was not a function")
            return n.forwardRef(function() {
                var e = arguments
                return i.createElement(t.Observer, null, function() {
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
                      throw new Error(
                          "The componentWillReact life-cycle event is no longer supported"
                      )
                  if (!(r instanceof n.PureComponent))
                      if (r.shouldComponentUpdate) {
                          if (r.shouldComponentUpdate !== j)
                              throw new Error(
                                  "It is not allowed to use shouldComponentUpdate in observer based components."
                              )
                      } else r.shouldComponentUpdate = j
                  x(r, "props"), x(r, "state")
                  var i = r.render
                  return (
                      (r.render = function() {
                          return function(e) {
                              var r = this
                              if (!0 === t.isUsingStaticRendering()) return e.call(this)
                              l(this, g, !1), l(this, w, !1)
                              var i =
                                      this.displayName ||
                                      this.name ||
                                      (this.constructor &&
                                          (this.constructor.displayName ||
                                              this.constructor.name)) ||
                                      "<component>",
                                  a = e.bind(this),
                                  c = !1,
                                  s = new o.Reaction(i + ".render()", function() {
                                      if (!c && ((c = !0), !0 !== r[O])) {
                                          var e = !0
                                          try {
                                              l(r, w, !0),
                                                  r[g] || n.Component.prototype.forceUpdate.call(r),
                                                  (e = !1)
                                          } finally {
                                              l(r, w, !1), e && s.dispose()
                                          }
                                      }
                                  })
                              function u() {
                                  c = !1
                                  var e = void 0,
                                      r = void 0
                                  if (
                                      (s.track(function() {
                                          try {
                                              r = o._allowStateChanges(!1, a)
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
                                  (s.reactComponent = this),
                                  (u[v] = s),
                                  (this.render = u),
                                  u.call(this)
                              )
                          }.call(this, i)
                      }),
                      h(r, "componentWillUnmount", function() {
                          !0 !== t.isUsingStaticRendering() &&
                              (this.render[v] && this.render[v].dispose(), (this[O] = !0))
                      }),
                      e
                  )
              })(e)
            : t.observer(e)
    }
    var S = i.createContext({})
    function U(e) {
        var r = e.children,
            t = (function(e, r) {
                var t = {}
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) &&
                        -1 === r.indexOf(n) &&
                        (t[n] = e[n])
                return t
            })(e, ["children"]),
            n = i.useContext(S),
            o = i.useRef(Object.assign({}, n, t)).current
        if ("production" !== process.env.NODE_ENV && !u(o, Object.assign({}, o, t)))
            throw new Error(
                "MobX Provider: The set of provided stores has changed. See: https://github.com/mobxjs/mobx-react#the-set-of-provided-stores-has-changed-error."
            )
        return i.createElement(S.Provider, { value: o }, r)
    }
    function k(e, r, t, o) {
        var a,
            c,
            s,
            u = i.forwardRef(function(t, o) {
                var a = Object.assign({}, t),
                    c = i.useContext(S)
                return (
                    Object.assign(a, e(c || {}, a) || {}), o && (a.ref = o), n.createElement(r, a)
                )
            })
        return (
            o && (u = C(u)),
            (u.isMobxInjector = !0),
            (a = r),
            (c = u),
            (s = Object.getOwnPropertyNames(Object.getPrototypeOf(a))),
            Object.getOwnPropertyNames(a).forEach(function(e) {
                p[e] ||
                    -1 !== s.indexOf(e) ||
                    Object.defineProperty(c, e, Object.getOwnPropertyDescriptor(a, e))
            }),
            (u.wrappedComponent = r),
            (u.displayName = (function(e, r) {
                var t =
                    e.displayName || e.name || (e.constructor && e.constructor.name) || "Component"
                return r ? "inject-with-" + r + "(" + t + ")" : "inject(" + t + ")"
            })(r, t)),
            u
        )
    }
    U.displayName = "MobXProvider"
    var A = s("disposeOnUnmountProto"),
        M = s("disposeOnUnmountInst")
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
        function r(r, t, n, i, a, c) {
            for (var s = [], u = arguments.length - 6; u-- > 0; ) s[u] = arguments[u + 6]
            return o.untracked(function() {
                return (
                    (i = i || "<<anonymous>>"),
                    (c = c || n),
                    null == t[n]
                        ? r
                            ? new Error(
                                  "The " +
                                      a +
                                      " `" +
                                      c +
                                      "` is marked as required in `" +
                                      i +
                                      "`, but its value is `" +
                                      (null === t[n] ? "null" : "undefined") +
                                      "`."
                              )
                            : null
                        : e.apply(void 0, [t, n, i, a, c].concat(s))
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
    function D(e, r) {
        return T(function(t, n, i, a, c) {
            return o.untracked(function() {
                if (e && _(t[n]) === r.toLowerCase()) return null
                var a
                switch (r) {
                    case "Array":
                        a = o.isObservableArray
                        break
                    case "Object":
                        a = o.isObservableObject
                        break
                    case "Map":
                        a = o.isObservableMap
                        break
                    default:
                        throw new Error("Unexpected mobxType: " + r)
                }
                var s = t[n]
                if (!a(s)) {
                    var u = (function(e) {
                            var r = _(e)
                            if ("object" === r) {
                                if (e instanceof Date) return "date"
                                if (e instanceof RegExp) return "regexp"
                            }
                            return r
                        })(s),
                        f = e ? " or javascript `" + r.toLowerCase() + "`" : ""
                    return new Error(
                        "Invalid prop `" +
                            c +
                            "` of type `" +
                            u +
                            "` supplied to `" +
                            i +
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
    function N(e, r) {
        return T(function(t, n, i, a, c) {
            for (var s = [], u = arguments.length - 5; u-- > 0; ) s[u] = arguments[u + 5]
            return o.untracked(function() {
                if ("function" != typeof r)
                    return new Error(
                        "Property `" +
                            c +
                            "` of component `" +
                            i +
                            "` has invalid PropType notation."
                    )
                var o = D(e, "Array")(t, n, i)
                if (o instanceof Error) return o
                for (var u = t[n], f = 0; f < u.length; f++)
                    if (
                        (o = r.apply(void 0, [u, f, i, a, c + "[" + f + "]"].concat(s))) instanceof
                        Error
                    )
                        return o
                return null
            })
        })
    }
    var q = {
        observableArray: D(!1, "Array"),
        observableArrayOf: N.bind(null, !1),
        observableMap: D(!1, "Map"),
        observableObject: D(!1, "Object"),
        arrayOrObservableArray: D(!0, "Array"),
        arrayOrObservableArrayOf: N.bind(null, !0),
        objectOrObservableObject: D(!0, "Object")
    }
    if (!n.Component) throw new Error("mobx-react requires React to be available")
    if (!o.observable) throw new Error("mobx-react requires mobx to be available")
    "function" == typeof r.unstable_batchedUpdates &&
        o.configure({ reactionScheduler: r.unstable_batchedUpdates }),
        (e.Observer = t.Observer),
        (e.useObserver = t.useObserver),
        (e.useAsObservableSource = t.useAsObservableSource),
        (e.useLocalStore = t.useLocalStore),
        (e.isUsingStaticRendering = t.isUsingStaticRendering),
        (e.useStaticRendering = t.useStaticRendering),
        (e.observer = C),
        (e.Provider = U),
        (e.MobXProviderContext = S),
        (e.inject = function() {
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
        (e.disposeOnUnmount = function e(r, t) {
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
                a || h(r, "componentWillUnmount", $),
                "string" != typeof t ? t : void 0
            )
        }),
        (e.PropTypes = q)
})
//# sourceMappingURL=mobx-react.umd.js.map
