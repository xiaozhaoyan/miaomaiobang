/*!
 * =====================================================
 * Mui v3.7.2 (http://dev.dcloud.net.cn/mui)
 * =====================================================
 */
var mui = function (a, b) {
    var k, c = /complete|loaded|interactive/,
        d = /^#([\w-]+)$/,
        e = /^\.([\w-]+)$/,
        f = /^[\w-]+$/,
        g = /translate(?:3d)?\((.+?)\)/,
        h = /matrix(3d)?\((.+?)\)/,
        i = function (b, c) {
            if (c = c || a, !b) return j();
            if ("object" == typeof b) return i.isArrayLike(b) ? j(i.slice.call(b), null) : j([b], null);
            if ("function" == typeof b) return i.ready(b);
            if ("string" == typeof b) try {
                if (b = b.trim(), d.test(b)) {
                    var e = a.getElementById(RegExp.$1);
                    return j(e ? [e] : [])
                }
                return j(i.qsa(b, c), b)
            } catch (f) { }
            return j()
        },
        j = function (a, b) {
            return a = a || [], Object.setPrototypeOf(a, i.fn), a.selector = b || "", a
        };
    return i.uuid = 0, i.data = {}, i.extend = function () {
        var a, c, d, e, f, g, h = arguments[0] || {},
            j = 1,
            k = arguments.length,
            l = !1;
        for ("boolean" == typeof h && (l = h, h = arguments[j] || {}, j++), "object" == typeof h || i.isFunction(h) || (h = {}), j === k && (h = this, j--) ; k > j; j++) if (null != (a = arguments[j])) for (c in a) d = h[c], e = a[c], h !== e && (l && e && (i.isPlainObject(e) || (f = i.isArray(e))) ? (f ? (f = !1, g = d && i.isArray(d) ? d : []) : g = d && i.isPlainObject(d) ? d : {}, h[c] = i.extend(l, g, e)) : e !== b && (h[c] = e));
        return h
    }, i.noop = function () { }, i.slice = [].slice, i.filter = [].filter, i.type = function (a) {
        return null == a ? String(a) : k[{}.toString.call(a)] || "object"
    }, i.isArray = Array.isArray ||
    function (a) {
        return a instanceof Array
    }, i.isArrayLike = function (a) {
        var b = !!a && "length" in a && a.length,
            c = i.type(a);
        return "function" === c || i.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }, i.isWindow = function (a) {
        return null != a && a === a.window
    }, i.isObject = function (a) {
        return "object" === i.type(a)
    }, i.isPlainObject = function (a) {
        return i.isObject(a) && !i.isWindow(a) && Object.getPrototypeOf(a) === Object.prototype
    }, i.isEmptyObject = function (a) {
        for (var c in a) if (c !== b) return !1;
        return !0
    }, i.isFunction = function (a) {
        return "function" === i.type(a)
    }, i.qsa = function (b, c) {
        return c = c || a, i.slice.call(e.test(b) ? c.getElementsByClassName(RegExp.$1) : f.test(b) ? c.getElementsByTagName(b) : c.querySelectorAll(b))
    }, i.ready = function (b) {
        return c.test(a.readyState) ? b(i) : a.addEventListener("DOMContentLoaded", function () {
            b(i)
        }, !1), this
    }, i.buffer = function (a, b, c) {
        function g() {
            d && (d.cancel(), d = 0), e = i.now(), a.apply(c || this, arguments), f = i.now()
        }
        var d, e = 0,
            f = 0;
        return b = b || 150, i.extend(function () {
            !e || f >= e && i.now() - f > b || e > f && i.now() - e > 8 * b ? g.apply(this, arguments) : (d && d.cancel(), d = i.later(g, b, null, i.slice.call(arguments)))
        }, {
            stop: function () {
                d && (d.cancel(), d = 0)
            }
        })
    }, i.each = function (a, b, c) {
        if (!a) return this;
        if ("number" == typeof a.length)[].every.call(a, function (a, c) {
            return b.call(a, c, a) !== !1
        });
        else for (var d in a) if (c) {
            if (a.hasOwnProperty(d) && b.call(a[d], d, a[d]) === !1) return a
        } else if (b.call(a[d], d, a[d]) === !1) return a;
        return this
    }, i.focus = function (a) {
        i.os.ios ? setTimeout(function () {
            a.focus()
        }, 10) : a.focus()
    }, i.trigger = function (a, b, c) {
        return a.dispatchEvent(new CustomEvent(b, {
            detail: c,
            bubbles: !0,
            cancelable: !0
        })), this
    }, i.getStyles = function (a, b) {
        var c = a.ownerDocument.defaultView.getComputedStyle(a, null);
        return b ? c.getPropertyValue(b) || c[b] : c
    }, i.parseTranslate = function (a, b) {
        var c = a.match(g || "");
        return c && c[1] || (c = ["", "0,0,0"]), c = c[1].split(","), c = {
            x: parseFloat(c[0]),
            y: parseFloat(c[1]),
            z: parseFloat(c[2])
        }, b && c.hasOwnProperty(b) ? c[b] : c
    }, i.parseTranslateMatrix = function (a, b) {
        var e, c = a.match(h),
            d = c && c[1];
        return c ? (c = c[2].split(","), "3d" === d ? c = c.slice(12, 15) : (c.push(0), c = c.slice(4, 7))) : c = [0, 0, 0], e = {
            x: parseFloat(c[0]),
            y: parseFloat(c[1]),
            z: parseFloat(c[2])
        }, b && e.hasOwnProperty(b) ? e[b] : e
    }, i.hooks = {}, i.addAction = function (a, b) {
        var c = i.hooks[a];
        return c || (c = []), b.index = b.index || 1e3, c.push(b), c.sort(function (a, b) {
            return a.index - b.index
        }), i.hooks[a] = c, i.hooks[a]
    }, i.doAction = function (a, b) {
        i.isFunction(b) ? i.each(i.hooks[a], b) : i.each(i.hooks[a], function (a, b) {
            return !b.handle()
        })
    }, i.later = function (a, b, c, d) {
        var e, f, g, h;
        return b = b || 0, e = a, f = d, "string" == typeof a && (e = c[a]), g = function () {
            e.apply(c, i.isArray(f) ? f : [f])
        }, h = setTimeout(g, b), {
            id: h,
            cancel: function () {
                clearTimeout(h)
            }
        }
    }, i.now = Date.now ||
    function () {
        return +new Date
    }, k = {}, i.each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error"], function (a, b) {
        k["[object " + b + "]"] = b.toLowerCase()
    }), window.JSON && (i.parseJSON = JSON.parse), i.fn = {
        each: function (a) {
            return [].every.call(this, function (b, c) {
                return a.call(b, c, b) !== !1
            }), this
        }
    }, "function" == typeof define && define.amd && define("mui", [], function () {
        return i
    }), i
}(document);
!
function (a, b) {
    function c(c) {
        this.os = {};
        var d = [function () {
            var a = c.match(/(MicroMessenger)\/([\d\.]+)/i);
            return a && (this.os.wechat = {
                version: a[2].replace(/_/g, ".")
            }), !1
        }, function () {
            var a = c.match(/(Android);?[\s\/]+([\d.]+)?/);
            return a && (this.os.android = !0, this.os.version = a[2], this.os.isBadAndroid = !/Chrome\/\d/.test(b.navigator.appVersion)), this.os.android === !0
        }, function () {
            var b, a = c.match(/(iPhone\sOS)\s([\d_]+)/);
            return a ? (this.os.ios = this.os.iphone = !0, this.os.version = a[2].replace(/_/g, ".")) : (b = c.match(/(iPad).*OS\s([\d_]+)/), b && (this.os.ios = this.os.ipad = !0, this.os.version = b[2].replace(/_/g, "."))), this.os.ios === !0
        }];
        [].every.call(d, function (b) {
            return !b.call(a)
        })
    }
    c.call(a, navigator.userAgent)
}(mui, window), function (a, b) {
    function c(c) {
        this.os = this.os || {};
        var d = c.match(/Html5Plus/i);
        d && (this.os.plus = !0, a(function () {
            b.body.classList.add("mui-plus")
        }), c.match(/StreamApp/i) && (this.os.stream = !0, a(function () {
            b.body.classList.add("mui-plus-stream")
        })))
    }
    c.call(a, navigator.userAgent)
}(mui, document), function (a) {
    var b, c, d, e, f, g, h, i, j, k, l;
    "ontouchstart" in window ? (a.isTouchable = !0, a.EVENT_START = "touchstart", a.EVENT_MOVE = "touchmove", a.EVENT_END = "touchend") : (a.isTouchable = !1, a.EVENT_START = "mousedown", a.EVENT_MOVE = "mousemove", a.EVENT_END = "mouseup"), a.EVENT_CANCEL = "touchcancel", a.EVENT_CLICK = "click", b = 1, c = {}, d = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    }, e = function () {
        return !0
    }, f = function () {
        return !1
    }, g = function (b, c) {
        return b.detail ? b.detail.currentTarget = c : b.detail = {
            currentTarget: c
        }, a.each(d, function (a, c) {
            var d = b[a];
            b[a] = function () {
                return this[c] = e, d && d.apply(b, arguments)
            }, b[c] = f
        }, !0), b
    }, h = function (a) {
        return a && (a._mid || (a._mid = b++))
    }, i = {}, j = function (b, d) {
        return function (e) {
            for (var k, f = c[b._mid][d], h = [], i = e.target, j = {}; i && i !== document && i !== b && (!~["click", "tap", "doubletap", "longtap", "hold"].indexOf(d) || !i.disabled && !i.classList.contains("mui-disabled")) ; i = i.parentNode) k = {}, a.each(f, function (c, d) {
                j[c] || (j[c] = a.qsa(c, b)), j[c] && ~j[c].indexOf(i) && (k[c] || (k[c] = d))
            }, !0), a.isEmptyObject(k) || h.push({
                element: i,
                handlers: k
            });
            j = null, e = g(e), a.each(h, function (b, c) {
                i = c.element;
                var f = i.tagName;
                return "tap" === d && "INPUT" !== f && "TEXTAREA" !== f && "SELECT" !== f && (e.preventDefault(), e.detail && e.detail.gesture && e.detail.gesture.preventDefault()), a.each(c.handlers, function (b, c) {
                    a.each(c, function (a, b) {
                        b.call(i, e) === !1 && (e.preventDefault(), e.stopPropagation())
                    }, !0)
                }, !0), e.isPropagationStopped() ? !1 : void 0
            }, !0)
        }
    }, k = function (a, b) {
        var e, c = i[h(a)],
			d = [];
        if (c) {
            if (d = [], b) return e = function (a) {
                return a.type === b
            }, c.filter(e);
            d = c
        }
        return d
    }, l = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/, a.fn.on = function (b, d, e) {
        return this.each(function () {
            var g, k, m, n, o, p, f = this;
            h(f), h(e), g = !1, k = c[f._mid] || (c[f._mid] = {}), m = k[b] || (k[b] = {}), a.isEmptyObject(m) && (g = !0), n = m[d] || (m[d] = []), n.push(e), g && (o = i[h(f)], o || (o = []), p = j(f, b, d, e), o.push(p), p.i = o.length - 1, p.type = b, i[h(f)] = o, f.addEventListener(b, p), "tap" === b && f.addEventListener("click", function (a) {
                var b, c;
                a.target && (b = a.target.tagName, l.test(b) || ("A" === b ? (c = a.target.href, c && ~c.indexOf("tel:") || a.preventDefault()) : a.preventDefault()))
            }))
        })
    }, a.fn.off = function (b, d, e) {
        return this.each(function () {
            var g, f = h(this);
            b ? d ? e ? (g = c[f] && c[f][b] && c[f][b][d], a.each(g, function (a, b) {
                return h(b) === h(e) ? (g.splice(a, 1), !1) : void 0
            }, !0)) : c[f] && c[f][b] && delete c[f][b][d] : c[f] && delete c[f][b] : c[f] && delete c[f], c[f] ? (!c[f][b] || a.isEmptyObject(c[f][b])) && k(this, b).forEach(function (a) {
                this.removeEventListener(a.type, a), delete i[f][a.i]
            }.bind(this)) : k(this).forEach(function (a) {
                this.removeEventListener(a.type, a), delete i[f][a.i]
            }.bind(this))
        })
    }
}(mui), function (a, b, c) {
    a.targets = {}, a.targetHandles = [], a.registerTarget = function (b) {
        return b.index = b.index || 1e3, a.targetHandles.push(b), a.targetHandles.sort(function (a, b) {
            return a.index - b.index
        }), a.targetHandles
    }, b.addEventListener(a.EVENT_START, function (b) {
        for (var f, d = b.target, e = {}; d && d !== c && (f = !1, a.each(a.targetHandles, function (c, g) {
			var h = g.name;
			f || e[h] || !g.hasOwnProperty("handle") ? e[h] || g.isReset !== !1 && (a.targets[h] = !1) : (a.targets[h] = g.handle(b, d), a.targets[h] && (e[h] = !0, g.isContinue !== !0 && (f = !0)))
        }), !f) ; d = d.parentNode);
    }), b.addEventListener("click", function (b) {
        for (var d = b.target, e = !1; d && d !== c && ("A" !== d.tagName || (a.each(a.targetHandles, function (a, c) {
			return c.name, c.hasOwnProperty("handle") && c.handle(b, d) ? (e = !0, b.preventDefault(), !1) : void 0
        }), !e)) ; d = d.parentNode);
    })
}(mui, window, document), function (a) {
    String.prototype.trim === a && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }), Object.setPrototypeOf = Object.setPrototypeOf ||
	function (a, b) {
	    return a["__proto__"] = b, a
	}
}(), Function.prototype.bind = Function.prototype.bind ||
function (a) {
    var b = Array.prototype.splice.call(arguments, 1),
		c = this,
		d = function () {
		    var e = b.concat(Array.prototype.splice.call(arguments, 0));
		    return this instanceof d ? (c.apply(this, e), void 0) : c.apply(a, e)
		};
    return d.prototype = c.prototype, d
}, function (a) {
    "classList" in a.documentElement || !Object.defineProperty || "undefined" == typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", {
        get: function () {
            function b(b) {
                return function (c) {
                    var d = a.className.split(/\s+/),
						e = d.indexOf(c);
                    b(d, e, c), a.className = d.join(" ")
                }
            }
            var a = this,
				c = {
				    add: b(function (a, b, c) {
				        ~b || a.push(c)
				    }),
				    remove: b(function (a, b) {
				        ~b && a.splice(b, 1)
				    }),
				    toggle: b(function (a, b, c) {
				        ~b ? a.splice(b, 1) : a.push(c)
				    }),
				    contains: function (b) {
				        return !!~a.className.split(/\s+/).indexOf(b)
				    },
				    item: function (b) {
				        return a.className.split(/\s+/)[b] || null
				    }
				};
            return Object.defineProperty(c, "length", {
                get: function () {
                    return a.className.split(/\s+/).length
                }
            }), c
        }
    })
}(document), function (a) {
    if (!a.requestAnimationFrame) {
        var b = 0;
        a.requestAnimationFrame = a.webkitRequestAnimationFrame ||
		function (c) {
		    var e = (new Date).getTime(),
				f = Math.max(0, 16.7 - (e - b)),
				g = a.setTimeout(function () {
				    c(e + f)
				}, f);
		    return b = e + f, g
		}, a.cancelAnimationFrame = a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame ||
		function (a) {
		    clearTimeout(a)
		}
    }
}(window), function (a, b, c) {
    var d, e;
    (a.os.android || a.os.ios) && (b.FastClick || (d = function (a, b) {
        return "LABEL" === b.tagName && b.parentNode && (b = b.parentNode.querySelector("input")), !b || "radio" !== b.type && "checkbox" !== b.type || b.disabled ? !1 : b
    }, a.registerTarget({
        name: c,
        index: 40,
        handle: d,
        target: !1
    }), e = function (c) {
        var e, f, d = a.targets.click;
        d && (document.activeElement && document.activeElement !== d && document.activeElement.blur(), f = c.detail.gesture.changedTouches[0], e = document.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, b, 1, f.screenX, f.screenY, f.clientX, f.clientY, !1, !1, !1, !1, 0, null), e.forwardedTouchEvent = !0, d.dispatchEvent(e), c.detail && c.detail.gesture.preventDefault())
    }, b.addEventListener("tap", e), b.addEventListener("doubletap", e), b.addEventListener("click", function (b) {
        return a.targets.click && !b.forwardedTouchEvent ? (b.stopImmediatePropagation ? b.stopImmediatePropagation() : b.propagationStopped = !0, b.stopPropagation(), b.preventDefault(), !1) : void 0
    }, !0)))
}(mui, window, "click"), function (a, b) {
    a(function () {
        var c, d, e, f, g;
        a.os.ios && (c = "mui-focusin", d = "mui-bar-tab", e = "mui-bar-footer", f = "mui-bar-footer-secondary", g = "mui-bar-footer-secondary-tab", b.addEventListener("focusin", function (h) {
            var i, j, k, l, m;
            if (!(a.os.plus && window.plus && plus.webview.currentWebview().children().length > 0 || (i = h.target, !i.tagName || "TEXTAREA" !== i.tagName && ("INPUT" !== i.tagName || "text" !== i.type && "search" !== i.type && "number" !== i.type)))) {
                if (i.disabled || i.readOnly) return;
                for (b.body.classList.add(c), j = !1; i && i !== b; i = i.parentNode) if (k = i.classList, k && k.contains(d) || k.contains(e) || k.contains(f) || k.contains(g)) {
                    j = !0;
                    break
                }
                j && (l = b.body.scrollHeight, m = b.body.scrollLeft, setTimeout(function () {
                    window.scrollTo(m, l)
                }, 20))
            }
        }), b.addEventListener("focusout", function () {
            var d = b.body.classList;
            d.contains(c) && (d.remove(c), setTimeout(function () {
                window.scrollTo(b.body.scrollLeft, b.body.scrollTop)
            }, 20))
        }))
    })
}(mui, document), function (a) {
    a.namespace = "mui", a.classNamePrefix = a.namespace + "-", a.classSelectorPrefix = "." + a.classNamePrefix, a.className = function (b) {
        return a.classNamePrefix + b
    }, a.classSelector = function (b) {
        return b.replace(/\./g, a.classSelectorPrefix)
    }, a.eventName = function (b, c) {
        return b + (a.namespace ? "." + a.namespace : "") + (c ? "." + c : "")
    }
}(mui), function (a, b) {
    var c, d, e, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
    a.gestures = {
        session: {}
    }, a.preventDefault = function (a) {
        a.preventDefault()
    }, a.stopPropagation = function (a) {
        a.stopPropagation()
    }, a.addGesture = function (b) {
        return a.addAction("gestures", b)
    }, c = Math.round, d = Math.abs, e = Math.sqrt, Math.atan, g = Math.atan2, h = function (a, b, c) {
        var d, f;
        return c || (c = ["x", "y"]), d = b[c[0]] - a[c[0]], f = b[c[1]] - a[c[1]], e(d * d + f * f)
    }, i = function (a, b) {
        if (a.length >= 2 && b.length >= 2) {
            var c = ["pageX", "pageY"];
            return h(b[1], b[0], c) / h(a[1], a[0], c)
        }
        return 1
    }, j = function (a, b, c) {
        var d, e;
        return c || (c = ["x", "y"]), d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]], 180 * g(e, d) / Math.PI
    }, k = function (a, b) {
        return a === b ? "" : d(a) >= d(b) ? a > 0 ? "left" : "right" : b > 0 ? "up" : "down"
    }, l = function (a, b) {
        var c = ["pageX", "pageY"];
        return j(b[1], b[0], c) - j(a[1], a[0], c)
    }, m = function (a, b, c) {
        return {
            x: b / a || 0,
            y: c / a || 0
        }
    }, n = function (b, c) {
        a.gestures.stoped || a.doAction("gestures", function (d, e) {
            a.gestures.stoped || a.options.gestureConfig[e.name] !== !1 && e.handle(b, c)
        })
    }, o = function (a, b) {
        for (; a;) {
            if (a == b) return !0;
            a = a.parentNode
        }
        return !1
    }, p = function (a, b, c) {
        for (var g, d = [], e = [], f = 0; f < a.length;) g = b ? a[f][b] : a[f], e.indexOf(g) < 0 && d.push(a[f]), e[f] = g, f++;
        return c && (d = b ? d.sort(function (a, c) {
            return a[b] > c[b]
        }) : d.sort()), d
    }, q = function (a) {
        var d, e, f, b = a.length;
        if (1 === b) return {
            x: c(a[0].pageX),
            y: c(a[0].pageY)
        };
        for (d = 0, e = 0, f = 0; b > f;) d += a[f].pageX, e += a[f].pageY, f++;
        return {
            x: c(d / b),
            y: c(e / b)
        }
    }, r = function () {
        return a.options.gestureConfig.pinch
    }, s = function (b) {
        for (var d = [], e = 0; e < b.touches.length;) d[e] = {
            pageX: c(b.touches[e].pageX),
            pageY: c(b.touches[e].pageY)
        }, e++;
        return {
            timestamp: a.now(),
            gesture: b.gesture,
            touches: d,
            center: q(b.touches),
            deltaX: b.deltaX,
            deltaY: b.deltaY
        }
    }, t = function (b) {
        var c = a.gestures.session,
			d = b.center,
			e = c.offsetDelta || {},
			f = c.prevDelta || {},
			g = c.prevTouch || {};
        (b.gesture.type === a.EVENT_START || b.gesture.type === a.EVENT_END) && (f = c.prevDelta = {
            x: g.deltaX || 0,
            y: g.deltaY || 0
        }, e = c.offsetDelta = {
            x: d.x,
            y: d.y
        }), b.deltaX = f.x + (d.x - e.x), b.deltaY = f.y + (d.y - e.y)
    }, u = function (b) {
        var f, g, m, n, c = a.gestures.session,
			d = b.touches,
			e = d.length;
        c.firstTouch || (c.firstTouch = s(b)), r() && e > 1 && !c.firstMultiTouch ? c.firstMultiTouch = s(b) : 1 === e && (c.firstMultiTouch = !1), f = c.firstTouch, g = c.firstMultiTouch, m = g ? g.center : f.center, n = b.center = q(d), b.timestamp = a.now(), b.deltaTime = b.timestamp - f.timestamp, b.angle = j(m, n), b.distance = h(m, n), t(b), b.offsetDirection = k(b.deltaX, b.deltaY), b.scale = g ? i(g.touches, d) : 1, b.rotation = g ? l(g.touches, d) : 0, w(b)
    }, v = 25, w = function (b) {
        var g, h, i, j, l, n, o, c = a.gestures.session,
			e = c.lastInterval || b,
			f = b.timestamp - e.timestamp;
        b.gesture.type != a.EVENT_CANCEL && (f > v || void 0 === e.velocity) ? (l = e.deltaX - b.deltaX, n = e.deltaY - b.deltaY, o = m(f, l, n), h = o.x, i = o.y, g = d(o.x) > d(o.y) ? o.x : o.y, j = k(l, n) || e.direction, c.lastInterval = b) : (g = e.velocity, h = e.velocityX, i = e.velocityY, j = e.direction), b.velocity = g, b.velocityX = h, b.velocityY = i, b.direction = j
    }, x = {}, y = function (a) {
        for (var b = 0; b < a.length; b++) !a["identifier"] && (a["identifier"] = 0);
        return a
    }, z = function (b, c) {
        var h, i, j, k, l, d = y(a.slice.call(b.touches || [b])),
			e = b.type,
			f = [],
			g = [];
        if (e !== a.EVENT_START && e !== a.EVENT_MOVE || 1 !== d.length) {
            if (h = 0, f = [], g = [], i = y(a.slice.call(b.changedTouches || [b])), c.target = b.target, j = a.gestures.session.target || b.target, f = d.filter(function (a) {
				return o(a.target, j)
            }), e === a.EVENT_START) for (h = 0; h < f.length;) x[f[h].identifier] = !0, h++;
            for (h = 0; h < i.length;) x[i[h].identifier] && g.push(i[h]), (e === a.EVENT_END || e === a.EVENT_CANCEL) && delete x[i[h].identifier], h++;
            if (!g.length) return !1
        } else x[d[0].identifier] = !0, f = d, g = d, c.target = b.target;
        return f = p(f.concat(g), "identifier", !0), k = f.length, l = g.length, e === a.EVENT_START && 0 === k - l && (c.isFirst = !0, a.gestures.touch = a.gestures.session = {
            target: b.target
        }), c.isFinal = (e === a.EVENT_END || e === a.EVENT_CANCEL) && 0 === k - l, c.touches = f, c.changedTouches = g, !0
    }, A = function (b) {
        var c = {
            gesture: b
        },
			d = z(b, c);
        d && (u(c), n(b, c), a.gestures.session.prevTouch = c, b.type !== a.EVENT_END || a.isTouchable || (a.gestures.touch = a.gestures.session = {}))
    }, B = function () {
        var c, a = !1;
        try {
            c = Object.defineProperty({}, "passive", {
                get: function () {
                    a = !0
                }
            }), b.addEventListener("testPassiveListener", null, c)
        } catch (d) { }
        return a
    }(), b.addEventListener(a.EVENT_START, A), b.addEventListener(a.EVENT_MOVE, A, B ? {
        passive: !1,
        capture: !1
    } : !1), b.addEventListener(a.EVENT_END, A), b.addEventListener(a.EVENT_CANCEL, A), b.addEventListener(a.EVENT_CLICK, function (b) {
        (a.os.android || a.os.ios) && (a.targets.popover && b.target === a.targets.popover || a.targets.tab || a.targets.offcanvas || a.targets.modal) && b.preventDefault()
    }, !0), a.isScrolling = !1, C = null, b.addEventListener("scroll", function () {
        a.isScrolling = !0, C && clearTimeout(C), C = setTimeout(function () {
            a.isScrolling = !1
        }, 250)
    })
}(mui, window), function (a, b) {
    var c = 0,
		d = function (d, e) {
		    var f = a.gestures.session,
				g = this.options,
				h = a.now();
		    switch (d.type) {
		        case a.EVENT_MOVE:
		            h - c > 300 && (c = h, f.flickStart = e.center);
		            break;
		        case a.EVENT_END:
		        case a.EVENT_CANCEL:
		            e.flick = !1, f.flickStart && g.flickMaxTime > h - c && e.distance > g.flickMinDistince && (e.flick = !0, e.flickTime = h - c, e.flickDistanceX = e.center.x - f.flickStart.x, e.flickDistanceY = e.center.y - f.flickStart.y, a.trigger(f.target, b, e), a.trigger(f.target, b + e.direction, e))
		    }
		};
    a.addGesture({
        name: b,
        index: 5,
        handle: d,
        options: {
            flickMaxTime: 200,
            flickMinDistince: 10
        }
    })
}(mui, "flick"), function (a, b) {
    var c = function (c, d) {
        var f, e = a.gestures.session;
        (c.type === a.EVENT_END || c.type === a.EVENT_CANCEL) && (f = this.options, d.swipe = !1, d.direction && f.swipeMaxTime > d.deltaTime && d.distance > f.swipeMinDistince && (d.swipe = !0, a.trigger(e.target, b, d), a.trigger(e.target, b + d.direction, d)))
    };
    a.addGesture({
        name: b,
        index: 10,
        handle: c,
        options: {
            swipeMaxTime: 300,
            swipeMinDistince: 18
        }
    })
}(mui, "swipe"), function (a, b) {
    var c = function (c, d) {
        var e = a.gestures.session;
        switch (c.type) {
            case a.EVENT_START:
                break;
            case a.EVENT_MOVE:
                if (!d.direction || !e.target) return;
                e.lockDirection && e.startDirection && e.startDirection && e.startDirection !== d.direction && (d.direction = "up" === e.startDirection || "down" === e.startDirection ? d.deltaY < 0 ? "up" : "down" : d.deltaX < 0 ? "left" : "right"), e.drag || (e.drag = !0, a.trigger(e.target, b + "start", d)), a.trigger(e.target, b, d), a.trigger(e.target, b + d.direction, d);
                break;
            case a.EVENT_END:
            case a.EVENT_CANCEL:
                e.drag && d.isFinal && a.trigger(e.target, b + "end", d)
        }
    };
    a.addGesture({
        name: b,
        index: 20,
        handle: c,
        options: {
            fingers: 1
        }
    })
}(mui, "drag"), function (a, b) {
    var c, d, e = function (e, f) {
        var i, g = a.gestures.session,
            h = this.options;
        switch (e.type) {
            case a.EVENT_END:
                if (!f.isFinal) return;
                if (i = g.target, !i || i.disabled || i.classList && i.classList.contains("mui-disabled")) return;
                if (f.distance < h.tapMaxDistance && f.deltaTime < h.tapMaxTime) {
                    if (a.options.gestureConfig.doubletap && c && c === i && d && f.timestamp - d < h.tapMaxInterval) return a.trigger(i, "doubletap", f), d = a.now(), c = i, void 0;
                    a.trigger(i, b, f), d = a.now(), c = i
                }
        }
    };
    a.addGesture({
        name: b,
        index: 30,
        handle: e,
        options: {
            fingers: 1,
            tapMaxInterval: 300,
            tapMaxDistance: 5,
            tapMaxTime: 250
        }
    })
}(mui, "tap"), function (a, b) {
    var c, d = function (d, e) {
        var f = a.gestures.session,
            g = this.options;
        switch (d.type) {
            case a.EVENT_START:
                clearTimeout(c), c = setTimeout(function () {
                    a.trigger(f.target, b, e)
                }, g.holdTimeout);
                break;
            case a.EVENT_MOVE:
                e.distance > g.holdThreshold && clearTimeout(c);
                break;
            case a.EVENT_END:
            case a.EVENT_CANCEL:
                clearTimeout(c)
        }
    };
    a.addGesture({
        name: b,
        index: 10,
        handle: d,
        options: {
            fingers: 1,
            holdTimeout: 500,
            holdThreshold: 2
        }
    })
}(mui, "longtap"), function (a, b) {
    var c, d = function (d, e) {
        var f = a.gestures.session,
            g = this.options;
        switch (d.type) {
            case a.EVENT_START:
                a.options.gestureConfig.hold && (c && clearTimeout(c), c = setTimeout(function () {
                    e.hold = !0, a.trigger(f.target, b, e)
                }, g.holdTimeout));
                break;
            case a.EVENT_MOVE:
                break;
            case a.EVENT_END:
            case a.EVENT_CANCEL:
                c && (clearTimeout(c) && (c = null), a.trigger(f.target, "release", e))
        }
    };
    a.addGesture({
        name: b,
        index: 10,
        handle: d,
        options: {
            fingers: 1,
            holdTimeout: 0
        }
    })
}(mui, "hold"), function (a, b) {
    var c = function (c, d) {
        var g, h, i, j, e = this.options,
            f = a.gestures.session;
        switch (c.type) {
            case a.EVENT_START:
                break;
            case a.EVENT_MOVE:
                if (a.options.gestureConfig.pinch) {
                    if (d.touches.length < 2) return;
                    f.pinch || (f.pinch = !0, a.trigger(f.target, b + "start", d)), a.trigger(f.target, b, d), g = d.scale, h = d.rotation, i = "undefined" == typeof d.lastScale ? 1 : d.lastScale, j = 1e-12, g > i ? (i = g - j, a.trigger(f.target, b + "out", d)) : i > g && (i = g + j, a.trigger(f.target, b + "in", d)), Math.abs(h) > e.minRotationAngle && a.trigger(f.target, "rotate", d)
                }
                break;
            case a.EVENT_END:
            case a.EVENT_CANCEL:
                a.options.gestureConfig.pinch && f.pinch && 2 === d.touches.length && (f.pinch = !1, a.trigger(f.target, b + "end", d))
        }
    };
    a.addGesture({
        name: b,
        index: 10,
        handle: c,
        options: {
            minRotationAngle: 0
        }
    })
}(mui, "pinch"), function (a) {
    function d(a, b) {
        var c = "MUI_SCROLL_POSITION_" + document.location.href + "_" + b.src,
			d = parseFloat(localStorage.getItem(c)) || 0;
        d &&
		function (a) {
		    b.onload = function () {
		        window.scrollTo(0, a)
		    }
		}(d), setInterval(function () {
		    var a = window.scrollY;
		    d !== a && (localStorage.setItem(c, a + ""), d = a)
		}, 100)
    }
    var b, c;
    a.global = a.options = {
        gestureConfig: {
            tap: !0,
            doubletap: !1,
            longtap: !1,
            hold: !1,
            flick: !0,
            swipe: !0,
            drag: !0,
            pinch: !1
        }
    }, a.initGlobal = function (b) {
        return a.options = a.extend(!0, a.global, b), this
    }, b = {}, a.init = function (c) {
        return a.options = a.extend(!0, a.global, c || {}), a.ready(function () {
            a.doAction("inits", function (c, d) {
                var e = !(b[d.name] && !d.repeat);
                e && (d.handle.call(a), b[d.name] = !0)
            })
        }), this
    }, a.addInit = function (b) {
        return a.addAction("inits", b)
    }, a.addInit({
        name: "iframe",
        index: 100,
        handle: function () {
            var b = a.options,
				d = b.subpages || [];
            !a.os.plus && d.length && c(d[0])
        }
    }), c = function (b) {
        var e, f, c = document.createElement("div");
        c.className = "mui-iframe-wrapper", e = b.styles || {}, "string" != typeof e.top && (e.top = "0px"), "string" != typeof e.bottom && (e.bottom = "0px"), c.style.top = e.top, c.style.bottom = e.bottom, f = document.createElement("iframe"), f.src = b.url, f.id = b.id || b.url, f.name = f.id, c.appendChild(f), document.body.appendChild(c), a.os.wechat && d(c, f)
    }, a(function () {
        var b = document.body.classList,
			c = [];
        a.os.ios ? (c.push({
            os: "ios",
            version: a.os.version
        }), b.add("mui-ios")) : a.os.android && (c.push({
            os: "android",
            version: a.os.version
        }), b.add("mui-android")), a.os.wechat && (c.push({
            os: "wechat",
            version: a.os.wechat.version
        }), b.add("mui-wechat")), c.length && a.each(c, function (c, d) {
            var e = "";
            d.version && a.each(d.version.split("."), function (c, f) {
                e = e + (e ? "-" : "") + f, b.add(a.className(d.os + "-" + e))
            })
        })
    })
}(mui), function (a, b) {
    a.scrollTo = function (a, c, d) {
        c = c || 1e3;
        var e = function (c) {
            if (0 >= c) return b.scrollTo(0, a), d && d(), void 0;
            var f = a - b.scrollY;
            setTimeout(function () {
                b.scrollTo(0, b.scrollY + 10 * (f / c)), e(c - 10)
            }, 16.7)
        };
        e(c)
    }, a.animationFrame = function (a) {
        var b, c, d;
        return function () {
            b = arguments, d = this, c || (c = !0, requestAnimationFrame(function () {
                a.apply(d, b), c = !1
            }))
        }
    }
}(mui, window), function (a) {
    var b = !1,
		c = /xyz/.test(function () { }) ? /\b_super\b/ : /.*/,
		d = function () { };
    d.extend = function (a) {
        function g() {
            !b && this.init && this.init.apply(this, arguments)
        }
        var e, f, d = this.prototype;
        b = !0, e = new this, b = !1;
        for (f in a) e[f] = "function" == typeof a[f] && "function" == typeof d[f] && c.test(a[f]) ?
		function (a, b) {
		    return function () {
		        var e, c = this._super;
		        return this._super = d[a], e = b.apply(this, arguments), this._super = c, e
		    }
		}(f, a[f]) : a[f];
        return g.prototype = e, g.prototype.constructor = g, g.extend = arguments.callee, g
    }, a.Class = d
}(mui), function (a, b, c, d) {
    var o, p, q, r, s, t, u, v, e = "mui-popover",
		f = "mui-popover-arrow",
		g = "mui-popover-action",
		h = "mui-backdrop",
		i = "mui-bar-popover",
		j = "mui-bar-backdrop",
		k = "mui-backdrop-action",
		l = "mui-active",
		m = "mui-bottom",
		n = function (b, d) {
		    if ("A" === d.tagName && d.hash) {
		        if (a.targets._popover = c.getElementById(d.hash.replace("#", "")), a.targets._popover && a.targets._popover.classList.contains(e)) return d;
		        a.targets._popover = null
		    }
		    return !1
		};
    a.registerTarget({
        name: d,
        index: 60,
        handle: n,
        target: !1,
        isReset: !1,
        isContinue: !0
    }), o = function () {
        this.removeEventListener("webkitTransitionEnd", o), this.addEventListener(a.EVENT_MOVE, a.preventDefault), a.trigger(this, "shown", this)
    }, p = function () {
        u(this, "none"), this.removeEventListener("webkitTransitionEnd", p), this.removeEventListener(a.EVENT_MOVE, a.preventDefault), a.trigger(this, "hidden", this)
    }, q = function () {
        var b = c.createElement("div");
        return b.classList.add(h), b.addEventListener(a.EVENT_MOVE, a.preventDefault), b.addEventListener("tap", function () {
            var c = a.targets._popover;
            c && (c.addEventListener("webkitTransitionEnd", p), c.classList.remove(l), s(c))
        }), b
    }(), s = function (b) {
        q.setAttribute("style", "opacity:0"), a.targets.popover = a.targets._popover = null, r = a.later(function () {
            !b.classList.contains(l) && q.parentNode && q.parentNode === c.body && c.body.removeChild(q)
        }, 350)
    }, b.addEventListener("tap", function (b) {
        var d, e;
        if (a.targets.popover) {
            for (d = !1, e = b.target; e && e !== c; e = e.parentNode) e === a.targets.popover && (d = !0);
            d && (b.detail.gesture.preventDefault(), t(a.targets._popover, a.targets.popover))
        }
    }), t = function (a, b, d) {
        var e, f;
        if (!("show" === d && a.classList.contains(l) || "hide" === d && !a.classList.contains(l))) {
            if (r && r.cancel(), a.removeEventListener("webkitTransitionEnd", o), a.removeEventListener("webkitTransitionEnd", p), q.classList.remove(j), q.classList.remove(k), e = c.querySelector(".mui-popover.mui-active"), e && (e.addEventListener("webkitTransitionEnd", p), e.classList.remove(l), a === e)) return s(e), void 0;
            f = !1, (a.classList.contains(i) || a.classList.contains(g)) && (a.classList.contains(g) ? (f = !0, q.classList.add(k)) : q.classList.add(j)), u(a, "block"), a.offsetHeight, a.classList.add(l), q.setAttribute("style", ""), c.body.appendChild(q), v(a, b, f), q.classList.add(l), a.addEventListener("webkitTransitionEnd", o)
        }
    }, u = function (a, b, c, d) {
        var e = a.style;
        "undefined" != typeof b && (e.display = b), "undefined" != typeof c && (e.top = c + "px"), "undefined" != typeof d && (e.left = d + "px")
    }, v = function (d, e, h) {
        var i, j, k, l, n, o, p, q, r, s, t, v, w, x, y;
        if (d && e) {
            if (h) return u(d, "block"), void 0;
            i = b.innerWidth, j = b.innerHeight, k = d.offsetWidth, l = d.offsetHeight, n = e.offsetWidth, o = e.offsetHeight, p = a.offset(e), q = d.querySelector("." + f), q || (q = c.createElement("div"), q.className = f, d.appendChild(q)), r = q && q.offsetWidth / 2 || 0, s = 0, t = 0, v = 0, w = 0, x = d.classList.contains(g) ? 0 : 5, y = "top", l + r < p.top - b.pageYOffset ? s = p.top - l - r : l + r < j - (p.top - b.pageYOffset) - o ? (y = "bottom", s = p.top + o + r) : (y = "middle", s = Math.max((j - l) / 2 + b.pageYOffset, 0), t = Math.max((i - k) / 2 + b.pageXOffset, 0)), "top" === y || "bottom" === y ? (t = n / 2 + p.left - k / 2, v = t, x > t && (t = x), t + k > i && (t = i - k - x), q && ("top" === y ? q.classList.add(m) : q.classList.remove(m), v -= t, w = k / 2 - r / 2 + v, w = Math.max(Math.min(w, k - 2 * r - 6), 6), q.setAttribute("style", "left:" + w + "px"))) : "middle" === y && q.setAttribute("style", "display:none"), u(d, "block", s, t)
        }
    }, a.createMask = function (b) {
        var e, d = c.createElement("div");
        return d.classList.add(h), d.addEventListener(a.EVENT_MOVE, a.preventDefault), d.addEventListener("tap", function () {
            e.close()
        }), e = [d], e._show = !1, e.show = function () {
            return e._show = !0, d.setAttribute("style", "opacity:1"), c.body.appendChild(d), e
        }, e._remove = function () {
            return e._show && (e._show = !1, d.setAttribute("style", "opacity:0"), a.later(function () {
                var a = c.body;
                d.parentNode === a && a.removeChild(d)
            }, 350)), e
        }, e.close = function () {
            b ? b() !== !1 && e._remove() : e._remove()
        }, e
    }, a.fn.popover = function () {
        var b = arguments;
        this.each(function () {
            a.targets._popover = this, ("show" === b[0] || "hide" === b[0] || "toggle" === b[0]) && t(this, b[1], b[0])
        })
    }
}(mui, window, document, "popover");
/**
 * 选择列表插件
 * varstion 2.0.0
 * by Houfeng
 * Houfeng@DCloud.io
 **/
!
function (e, t, i, n) {
    var r = e.rad2deg = function (e) {
        return e / (Math.PI / 180)
    },
		a = (e.deg2rad = function (e) {
		    return e * (Math.PI / 180)
		}, navigator.platform.toLowerCase()),
		s = navigator.userAgent.toLowerCase(),
		l = (s.indexOf("iphone") > -1 || s.indexOf("ipad") > -1 || s.indexOf("ipod") > -1) && (a.indexOf("iphone") > -1 || a.indexOf("ipad") > -1 || a.indexOf("ipod") > -1),
		o = e.Picker = function (e, t) {
		    var i = this;
		    i.holder = e, i.options = t || {}, i.init(), i.initInertiaParams(), i.calcElementItemPostion(!0), i.bindEvent()
		};
    o.prototype.findElementItems = function () {
        var e = this;
        return e.elementItems = [].slice.call(e.holder.querySelectorAll("li")), e.elementItems
    }, o.prototype.init = function () {
        var e = this;
        e.list = e.holder.querySelector("ul"), e.findElementItems(), e.height = e.holder.offsetHeight, e.r = e.height / 2 - 10, e.d = 2 * e.r, e.itemHeight = e.elementItems.length > 0 ? e.elementItems[0].offsetHeight : 40, e.itemAngle = parseInt(e.calcAngle(.8 * e.itemHeight)), e.hightlightRange = e.itemAngle / 2, e.visibleRange = 90, e.beginAngle = 0, e.beginExceed = e.beginAngle - 30, e.list.angle = e.beginAngle, l && (e.list.style.webkitTransformOrigin = "center center " + e.r + "px")
    }, o.prototype.calcElementItemPostion = function (e) {
        var t = this;
        e && (t.items = []), t.elementItems.forEach(function (i) {
            var n = t.elementItems.indexOf(i);
            if (t.endAngle = t.itemAngle * n, i.angle = t.endAngle, i.style.webkitTransformOrigin = "center center -" + t.r + "px", i.style.webkitTransform = "translateZ(" + t.r + "px) rotateX(" + -t.endAngle + "deg)", e) {
                var r = {};
                r.text = i.innerHTML || "", r.value = i.getAttribute("data-value") || r.text, t.items.push(r)
            }
        }), t.endExceed = t.endAngle + 30, t.calcElementItemVisibility(t.beginAngle)
    }, o.prototype.calcAngle = function (e) {
        var t = this,
			i = b = parseFloat(t.r);
        e = Math.abs(e);
        var n = 180 * parseInt(e / t.d);
        e %= t.d;
        var a = (i * i + b * b - e * e) / (2 * i * b);
        return n + r(Math.acos(a))
    }, o.prototype.calcElementItemVisibility = function (e) {
        var t = this;
        t.elementItems.forEach(function (i) {
            var n = Math.abs(i.angle - e);
            n < t.hightlightRange ? i.classList.add("highlight") : n < t.visibleRange ? (i.classList.add("visible"), i.classList.remove("highlight")) : (i.classList.remove("highlight"), i.classList.remove("visible"))
        })
    }, o.prototype.setAngle = function (e) {
        var t = this;
        t.list.angle = e, t.list.style.webkitTransform = "perspective(1000px) rotateY(0deg) rotateX(" + e + "deg)", t.calcElementItemVisibility(e)
    }, o.prototype.bindEvent = function () {
        var t = this,
			i = 0,
			n = null,
			r = !1;
        t.holder.addEventListener(e.EVENT_START, function (e) {
            r = !0, e.preventDefault(), t.list.style.webkitTransition = "", n = (e.changedTouches ? e.changedTouches[0] : e).pageY, i = t.list.angle, t.updateInertiaParams(e, !0)
        }, !1), t.holder.addEventListener(e.EVENT_END, function (e) {
            r = !1, e.preventDefault(), t.startInertiaScroll(e)
        }, !1), t.holder.addEventListener(e.EVENT_CANCEL, function (e) {
            r = !1, e.preventDefault(), t.startInertiaScroll(e)
        }, !1), t.holder.addEventListener(e.EVENT_MOVE, function (e) {
            if (r) {
                e.preventDefault();
                var a = (e.changedTouches ? e.changedTouches[0] : e).pageY - n,
					s = t.calcAngle(a),
					l = a > 0 ? i - s : i + s;
                l > t.endExceed && (l = t.endExceed), l < t.beginExceed && (l = t.beginExceed), t.setAngle(l), t.updateInertiaParams(e)
            }
        }, !1), t.list.addEventListener("tap", function (e) {
            elementItem = e.target, "LI" == elementItem.tagName && t.setSelectedIndex(t.elementItems.indexOf(elementItem), 200)
        }, !1)
    }, o.prototype.initInertiaParams = function () {
        var e = this;
        e.lastMoveTime = 0, e.lastMoveStart = 0, e.stopInertiaMove = !1
    }, o.prototype.updateInertiaParams = function (e, t) {
        var i = this,
			n = e.changedTouches ? e.changedTouches[0] : e;
        if (t) i.lastMoveStart = n.pageY, i.lastMoveTime = e.timeStamp || Date.now(), i.startAngle = i.list.angle;
        else {
            var r = e.timeStamp || Date.now();
            r - i.lastMoveTime > 300 && (i.lastMoveTime = r, i.lastMoveStart = n.pageY)
        }
        i.stopInertiaMove = !0
    }, o.prototype.startInertiaScroll = function (e) {
        this.find(e.changedTouches[0].target) ? mui.signFir = !0 : mui.signSec = !0;
        var t = this,
			i = e.changedTouches ? e.changedTouches[0] : e,
			n = e.timeStamp || Date.now(),
			r = (i.pageY - t.lastMoveStart) / (n - t.lastMoveTime),
			a = r > 0 ? -1 : 1,
			s = 6e-4 * a * -1,
			l = Math.abs(r / s),
			o = r * l / 2,
			c = t.list.angle,
			d = t.calcAngle(o) * a,
			p = d;
        return c + d < t.beginExceed && (l = l * ((d = t.beginExceed - c) / p) * .6), c + d > t.endExceed && (l = l * ((d = t.endExceed - c) / p) * .6), 0 == d ? void t.endScroll() : void t.scrollDistAngle(n, c, d, l)
    }, o.prototype.find = function (e) {
        return -1 !== e.className.indexOf("mui-picker-inner") ? -1 !== e.className.indexOf("fir") : !!e.parentNode && this.find(e.parentNode)
    }, o.prototype.scrollDistAngle = function (e, t, i, n) {
        var r = this;
        r.stopInertiaMove = !1, function (e, t, i, n) {
            var a = n / 13,
				s = 0;
            !
			function e() {
			    if (!r.stopInertiaMove) {
			        var n = r.quartEaseOut(s, t, i, a);
			        return r.setAngle(n), ++s > a - 1 || n < r.beginExceed || n > r.endExceed ? void r.endScroll() : void setTimeout(e, 13)
			    }
			}()
        }(0, t, i, n)
    }, o.prototype.quartEaseOut = function (e, t, i, n) {
        return -i * ((e = e / n - 1) * e * e * e - 1) + t
    }, o.prototype.endScroll = function () {
        var e = this;
        if (e.list.angle < e.beginAngle) e.list.style.webkitTransition = "150ms ease-out", e.setAngle(e.beginAngle);
        else if (e.list.angle > e.endAngle) e.list.style.webkitTransition = "150ms ease-out", e.setAngle(e.endAngle);
        else {
            var t = parseInt((e.list.angle / e.itemAngle).toFixed(0));
            e.list.style.webkitTransition = "100ms ease-out", e.setAngle(e.itemAngle * t)
        }
        e.triggerChange()
    }, o.prototype.triggerChange = function (t) {
        var i = this,
			n = i.getSelectedIndex(),
			r = i.items[n];
        r && (!e.trigger || n == i.lastIndex && !0 !== t || e.trigger(i.holder, "change", {
            index: n,
            item: r
        }), i.lastIndex = n, "function" == typeof t && t(), t || (-1 !== i.holder.querySelector(".mui-picker-inner").className.indexOf("fir") ? delete mui.signFir : delete mui.signSec)), setTimeout(function () {
            delete mui.signFir;
            delete mui.signSec;
        }, 1000)
    }, o.prototype.correctAngle = function (e) {
        var t = this;
        return e < t.beginAngle ? t.beginAngle : e > t.endAngle ? t.endAngle : e
    }, o.prototype.setItems = function (e) {
        var t = this;
        t.items = e || [];
        var i = [];
        t.items.forEach(function (e) {
            null != e && i.push("<li param='" + (e.id || e) + "'>" + (e.text || e) + "</li>")
        }), t.list.innerHTML = i.join(""), t.findElementItems(), t.calcElementItemPostion(), t.setAngle(t.correctAngle(t.list.angle)), t.triggerChange(!0)
    }, o.prototype.getItems = function () {
        return this.items
    }, o.prototype.getSelectedIndex = function () {
        return parseInt((this.list.angle / this.itemAngle).toFixed(0))
    }, o.prototype.setSelectedIndex = function (e, t, i) {
        var n = this;
        n.list.style.webkitTransition = "";
        var r = n.correctAngle(n.itemAngle * e);
        if (t && t > 0) {
            var a = r - n.list.angle;
            n.scrollDistAngle(Date.now(), n.list.angle, a, t)
        } else n.setAngle(r);
        n.triggerChange(i)
    }, o.prototype.getSelectedItem = function () {
        return this.items[this.getSelectedIndex()]
    }, o.prototype.getSelectedValue = function () {
        return (this.items[this.getSelectedIndex()] || {}).value
    }, o.prototype.getSelectedText = function () {
        return (this.items[this.getSelectedIndex()] || {}).text
    }, o.prototype.setSelectedValue = function (e, t, i) {
        var n = this;
        for (var r in n.items) if (n.items[r].value == e) return void n.setSelectedIndex(r, t, i)
    }, e.fn && (e.fn.picker = function (e) {
        return this.each(function (t, i) {
            if (!i.picker) if (e) i.picker = new o(i, e);
            else {
                var n = i.getAttribute("data-picker-options"),
					r = n ? JSON.parse(n) : {};
                i.picker = new o(i, r)
            }
        }), this[0] ? this[0].picker : null
    }, e.ready(function () {
        e(".mui-picker").picker()
    }))
}(window.mui || window, window, document), function (e, t) {
    e.dom = function (i) {
        return "string" != typeof i ? i instanceof Array || i[0] && i.length ? [].slice.call(i) : [i] : (e.__create_dom_div__ || (e.__create_dom_div__ = t.createElement("div")), e.__create_dom_div__.innerHTML = i, [].slice.call(e.__create_dom_div__.childNodes))
    };
    var i = '<div class="mui-picker">\t\t<div class="mui-picker-inner">\t\t\t<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\t\t\t<ul class="mui-pciker-list">\t\t\t</ul>\t\t\t<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\t\t</div>\t</div>';
    e.PopPicker = e.Class.extend({
        init: function (i) {
            var n = this;
            n.options = i || {}, n.options.buttons = n.options.buttons || ["取消", "确定"], n.panel = e.dom('<div class="mui-poppicker">\t\t<div class="mui-poppicker-header">\t\t\t<button class="mui-btn mui-poppicker-btn-cancel">取消</button>\t\t\t<button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button>\t\t\t<div class="mui-poppicker-clear"></div>\t\t</div>\t\t<div class="mui-poppicker-body">\t\t</div>\t</div>')[0], t.body.appendChild(n.panel), n.ok = n.panel.querySelector(".mui-poppicker-btn-ok"), n.cancel = n.panel.querySelector(".mui-poppicker-btn-cancel"), n.body = n.panel.querySelector(".mui-poppicker-body"), n.mask = e.createMask(), n.cancel.innerText = n.options.buttons[0], n.ok.innerText = n.options.buttons[1], n.cancel.addEventListener("tap", function (e) {
                n.hide()
            }, !1), n.ok.addEventListener("tap", function (e) {
                if (n.callback && !mui.signFir && !mui.signSec) {
                    for (var t = n.getSelectedItems(), i = !0, r = 0; r < t.length; r++) i = i && !!t[r].text;
                    if (i) var a = n.callback(n.getSelectedItems());
                    !1 !== a && n.hide()
                }
            }, !1), n.mask[0].addEventListener("tap", function () {
                n.hide()
            }, !1), n._createPicker(), n.panel.addEventListener(e.EVENT_START, function (e) {
                e.preventDefault()
            }, !1), n.panel.addEventListener(e.EVENT_MOVE, function (e) {
                e.preventDefault()
            }, !1)
        },
        _createPicker: function () {
            var t = this,
				n = t.options.layer || 1,
				r = 100 / n + "%",
				a = "mui-picker-inner fir";
            t.pickers = [];
            for (var s = 1; n >= s; s++) {
                i = 1 == s ? i.replace("mui-picker-inner", a) : i.replace(a, "mui-picker-inner");
                var l = e.dom(i)[0];
                l.style.width = r, t.body.appendChild(l);
                var o = e(l).picker();
                t.pickers.push(o), l.addEventListener("change", function (e) {
                    var t = this.nextSibling;
                    if (t && t.picker) {
                        var i = (e.detail || {}).item || {};
                        t.picker.setItems(i.children)
                    }
                }, !1)
            }
        },
        setData: function (e) {
            e = e || [], this.pickers[0].setItems(e)
        },
        getSelectedItems: function () {
            var e = [];
            for (var t in this.pickers) {
                var i = this.pickers[t];
                "object" == typeof i && e.push(i.getSelectedItem() || {})
            }
            return e
        },
        show: function (i) {
            var n = this;
            n.callback = i, n.mask.show(), t.body.classList.add(e.className("poppicker-active-for-page")), n.panel.classList.add(e.className("active")), n.__back = e.back, e.back = function () {
                n.hide()
            }
        },
        hide: function () {
            var i = this;
            i.disposed || (i.panel.classList.remove(e.className("active")), i.mask.close(), t.body.classList.remove(e.className("poppicker-active-for-page")), e.back = i.__back)
        },
        dispose: function () {
            var e = this;
            e.hide(), setTimeout(function () {
                for (var t in e.panel.parentNode.removeChild(e.panel), e) e[t] = null, delete e[t];
                e.disposed = !0
            }, 300)
        }
    })
}(mui, document);