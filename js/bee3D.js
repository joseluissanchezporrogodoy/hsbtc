! function e(t, n, i) {
    function o(s, a) {
        if (!n[s]) {
            if (!t[s]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(s, !0);
                if (r) return r(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var c = n[s] = {
                exports: {}
            };
            t[s][0].call(c.exports, function(e) {
                var n = t[s][1][e];
                return o(n ? n : e)
            }, c, c.exports, e, t, n, i)
        }
        return n[s].exports
    }
    for (var r = "function" == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
    return o
}({
    1: [function(e, t, n) {
        t.exports = {
            wrapper: document.body,
            selector: ".bee3D--slide",
            effect: "coverflow",
            focus: 0,
            listeners: {
                keys: !1,
                touches: !1,
                clicks: !1,
                scroll: !1,
                drag: !1
            },
            navigation: {
                enabled: !1,
                next: ".bee3D--nav__next",
                prev: ".bee3D--nav__prev"
            },
            ajax: {
                enabled: !1,
                path: null,
                when: 2,
                maxFetches: null,
                builder: function(e) {
                    return "<p>" + e.content + "</p>"
                }
            },
            autoplay: {
                enabled: !1,
                speed: 5e3,
                pauseHover: !1
            },
            loop: {
                enabled: !1,
                continuous: !1,
                offset: 2
            },
            sync: {
                enabled: !1,
                targets: []
            },
            parallax: {
                enabled: !1,
                className: "bee3D--parallax",
                friction: .7,
                settings: {
                    relativeInput: !0,
                    clipRelativeInput: !0,
                    calibrateX: !0,
                    calibrateY: !0,
                    scalarX: 4,
                    scalarY: 5,
                    frictionX: .1,
                    frictionY: .1
                }
            },
            shadows: {
                enabled: !1,
                template: ['<div class="bee3D--shadow-wrapper">', '<div class="bee3D--shadow">', "<span></span>", "</div>", "</div>"].join("")
            },
            onInit: function() {},
            onChange: function() {},
            onDestroy: function() {}
        }
    }, {}],
    2: [function(e, t, n) {
        function i(e, t) {
            if ("object" != typeof e) return !1;
            if (!t) return e;
            var n, o;
            return Object.keys(t).forEach(function(r) {
                return n = e[r], o = t[r], o !== e ? "object" != typeof o || null === o ? void(e[r] = o) : "object" != typeof n || null === n || Array.isArray(n) ? void(e[r] = i({}, o)) : void(e[r] = i(n, o)) : void 0
            }), e
        }
        t.exports = i
    }, {}],
    3: [function(e, t, n) {
        t.exports = function(e) {
            return function(t) {
                t.on("activate", function(n) {
                    return t.initialized ? e(n) : void 0
                })
            }
        }
    }, {}],
    4: [function(e, t, n) {
        t.exports = function(e) {
            var t = "bee3D--",
                n = e.loop.continuous,
                i = e.loop.offset;
            return function(o) {
                var r = o.slides.length,
                    s = function(e, n) {
                        classie.add(e, t + n)
                    },
                    a = function(e, n) {
                        e.className = e.className.replace(new RegExp(t + n + "(\\s|$)", "g"), " ").trim()
                    },
                    l = function(e, t) {
                        var l = o.slide(),
                            u = t - l,
                            c = u > 0 ? "after" : "before";
                        if (n) {
                            var f = r - i - 1;
                            u >= f && (c = "before", u = r - u), -f >= u && (c = "after", u = r + u)
                        }["before(-\\d+)?", "after(-\\d+)?", "slide__active", "slide__inactive"].map(a.bind(null, e)), t !== l && ["slide__inactive", c, c + "-" + Math.abs(u)].map(s.bind(null, e))
                    };
                s(o.parent, "parent"), ".bee3D--slide" !== !e.slideSelector && o.slides.forEach(function(e) {
                    s(e, "slide")
                }), o.on("activate", function(e) {
                    o.slides.map(l), s(e.slide, "slide__active"), a(e.slide, "slide__inactive")
                })
            }
        }
    }, {}],
    5: [function(e, t, n) {
        var i = e("../-defaults");
        t.exports = function() {
            var e = this.el.parent,
                t = this.el.slides,
                n = new RegExp("bee3D-(.*)", "g");
            e.className = e.className.replace(n, "");
            for (var o = ".bee3D--slide" === this.options.selector, r = 0; r < t.length; r++) t[r].className = o ? "bee3D--slide" : t[r].className.replace(n, "");
            this.el.fire("destroy");
            var s = this.options.onDestroy;
            this.options = i, this.plugins(), s()
        }
    }, {
        "../-defaults": 1
    }],
    6: [function(e, t, n) {
        t.exports = function(e) {
            return function(t) {
                var n = "vertical" !== e,
                    i = function(e) {
                        (34 === e.which || 32 === e.which || n && 39 === e.which || !n && 40 === e.which) && t.next(), (33 === e.which || n && 37 === e.which || !n && 38 === e.which) && t.prev()
                    };
                document.addEventListener("keydown", i), t.on("destroy", function() {
                    document.removeEventListener("keydown", i)
                })
            }
        }
    }, {}],
    7: [function(e, t, n) {
        t.exports = function(e) {
            return function(t) {
                function n(e) {
                    1 === e.touches.length && (r = e.touches[0]["page" + a], s = 0)
                }

                function i(e) {
                    1 === e.touches.length && (e.preventDefault(), s = e.touches[0]["page" + a] - r)
                }

                function o() {
                    Math.abs(s) > 50 && t[s > 0 ? "prev" : "next"]()
                }
                var r, s, a = "vertical" === e ? "Y" : "X";
                t.parent.addEventListener("touchstart", n), t.parent.addEventListener("touchmove", i), t.parent.addEventListener("touchend", o), t.on("destroy", function() {
                    t.parent.removeEventListener("touchstart", n), t.parent.removeEventListener("touchmove", i), t.parent.removeEventListener("touchend", o)
                })
            }
        }
    }, {}],
    8: [function(e, t, n) {
        t.exports = function(e) {
            var t = [].slice.call(e),
                n = t[-1],
                i = {},
                o = function() {
                    return t.indexOf(n)
                },
                r = function(e, n) {
                    return n = n || {}, n.index = t.indexOf(e), n.slide = e, n
                },
                s = function(e, t) {
                    return (i[e] || []).reduce(function(e, n) {
                        return e && n(t) !== !1
                    }, !0)
                },
                a = function(e) {
                    return s("activate", r(n, e))
                },
                l = function(e, i) {
                    t[e] && (s("deactivate", r(n, i)), n = t[e], a(i))
                },
                u = function(e, n) {
                    var i = o();
                    if (i !== e) return arguments.length ? (s("slide", r(t[e], n)), void l(e, n)) : i
                },
                c = function(e, i) {
                    var o = t.indexOf(n) + e;
                    s(e > 0 ? "next" : "prev", r(n, i)), l(o, i)
                },
                f = function(e, t) {
                    return (i[e] || (i[e] = [])).push(t),
                        function() {
                            i[e] = i[e].filter(function(e) {
                                return e !== t
                            })
                        }
                };
            return {
                on: f,
                fire: s,
                touch: a,
                slide: u,
                next: c.bind(null, 1),
                prev: c.bind(null, -1),
                slides: t
            }
        }
    }, {}],
    9: [function(e, t, n) {
        (function(e) {
            function t() {
                if (e.XMLHttpRequest) return new e.XMLHttpRequest;
                try {
                    return new e.ActiveXObject("MSXML2.XMLHTTP.3.0")
                } catch (t) {}
                throw new Error("no xmlhttp request able to be created")
            }

            function i(e, t, n) {
                e[t] = e[t] || n
            }
            n.init = function(e, n) {
                "string" == typeof e && (e = {
                    url: e
                });
                var o = e.headers || {},
                    r = e.body,
                    s = e.method || (r ? "POST" : "GET"),
                    a = e.withCredentials || !1,
                    l = t();
                l.onreadystatechange = function() {
                    4 === l.readyState && n(l.status, l.responseText, l)
                }, r && (i(o, "X-Requested-With", "XMLHttpRequest"), i(o, "Content-Type", "application/x-www-form-urlencoded")), l.open(s, e.url, !0), l.withCredentials = a;
                for (var u in o) o.hasOwnProperty(u) && l.setRequestHeader(u, o[u]);
                l.send(r)
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    10: [function(e, t, n) {
        var i = e("./-lib");
        t.exports = function() {
            var e = this,
                t = e.options.ajax,
                n = t.when,
                o = t.path,
                r = t.maxFetches,
                s = t.builder,
                a = e.el.slides,
                l = a.length,
                u = e.options.selector.substring(1),
                c = function(t) {
                    e.el.parent.appendChild(t), e.el.slides.push(t)
                },
                f = function(n) {
                    var i = n.map(function(e) {
                        var t = document.createElement("section");
                        return t.className = u, t.innerHTML = '<div class="bee3D--inner">' + s(e) + "</div>", c(t), t
                    });
                    return l = e.el.slides.length, e.slideEvents(i), t.maxFetches && r--, e.el.touch()
                },
                d = function() {
                    i.init(o, function(e, t) {
                        return 200 === e ? f(JSON.parse(t).data) : void 0
                    })
                },
                p = function(e) {
                    if (l - n === e.index) {
                        if (!t.maxFetches) return d();
                        if (r && r > 0) return d()
                    }
                };
            this.el.on("activate", p)
        }
    }, {
        "./-lib": 9
    }],
    11: [function(e, t, n) {
        t.exports = function(e) {
            function t() {
                i.el.fire("pauseAutoplay")
            }

            function n() {
                i.el.fire("resetAutoplay")
            }
            var i = this;
            e.addEventListener("mouseover", t), e.addEventListener("mouseout", n), i.el.on("destroy", function() {
                e.removeEventListener("mouseover", n), e.removeEventListener("mouseout", t)
            })
        }
    }, {}],
    12: [function(e, t, n) {
        t.exports = function() {
            var e = this,
                t = function() {
                    e.timer = setTimeout(function() {
                        e.el.next()
                    }, e.options.autoplay.speed)
                },
                n = function() {
                    clearTimeout(e.timer)
                },
                i = function() {
                    n(), t()
                };
            t(), e.el.on("resumeAutoplay", t), e.el.on("pauseAutoplay", n), e.el.on("resetAutoplay", i), e.el.on("activate", i), e.options.autoplay.pauseHover && e.el.on("activate", function(t) {
                e.listenToHover(t.slide)
            }), e.el.on("destroy", function() {
                n()
            })
        }
    }, {}],
    13: [function(e, t, n) {
        t.exports = function(e) {
            for (var t = this, n = function() {
                    var n = e.indexOf(this);
                    return t.el.slide(n)
                }, i = 0; i < e.length; i++) e[i].style.pointerEvents = "auto", e[i].style.cursor = "pointer", e[i].addEventListener("click", n);
            this.el.on("activate", function(e) {
                e.slide.removeEventListener("click", n)
            }), this.el.on("deactivate", function(e) {
                e.slide.addEventListener("click", n)
            }), this.el.on("destroy", function() {
                e.forEach(function(e) {
                    e.removeAttribute("style"), e.removeEventListener("click", n)
                })
            })
        }
    }, {}],
    14: [function(e, t, n) {
        t.exports = function() {
            var e = this.el;
            e.on("prev", function(t) {
                0 === t.index && e.slide(e.slides.length - 1)
            }), e.on("next", function(t) {
                t.index === e.slides.length - 1 && e.slide(0)
            })
        }
    }, {}],
    15: [function(e, t, n) {
        t.exports = function() {
            var e, t, n = this,
                i = this.el.parent,
                o = function(n) {
                    e = n.x, t = 0
                },
                r = function(n) {
                    n.preventDefault(), t = n.x - e
                },
                s = function() {
                    Math.abs(t) > 50 && n.el[t > 0 ? "prev" : "next"]()
                };
            classie.add(i, "draggable"), i.addEventListener("mousedown", o), i.addEventListener("mousemove", r), i.addEventListener("mouseup", s), this.el.on("destroy", function() {
                classie.remove(i, "draggable"), i.removeEventListener("mousedown", o), i.removeEventListener("mousemove", r), i.removeEventListener("mouseup", s)
            })
        }
    }, {}],
    16: [function(e, t, n) {
        t.exports = function() {
            var e = this,
                t = this.el.parent,
                n = function(t) {
                    var n = t.wheelDelta || -t.detail;
                    return 0 > n ? e.el.next() : e.el.prev()
                };
            t.addEventListener("mousewheel", n), t.addEventListener("DOMMouseScroll", n), this.el.on("destroy", function() {
                t.removeEventListener("mousewheel", n), t.removeEventListener("DOMMouseScroll", n)
            })
        }
    }, {}],
    17: [function(e, t, n) {
        t.exports = function() {
            var e = this,
                t = e.options,
                n = e.el.parent,
                i = function(n, i) {
                    n.addEventListener("click", function(t) {
                        return t.preventDefault(), i ? e.el.next() : e.el.prev()
                    }), t.autoplay.enabled && t.autoplay.pauseHover && e.listenToHover(n)
                },
                o = n.querySelector(t.navigation.prev),
                r = n.querySelector(t.navigation.next);
            r && i(r, !0), o && i(o, !1)
        }
    }, {}],
    18: [function(e, t, n) {
        t.exports = function(e) {
            if (window.Parallax) {
                for (var t = this, n = t.options, i = n.shadows.enabled, o = n.parallax.className, r = n.parallax.friction, s = n.parallax.settings, a = function(e) {
                        classie.add(e, o), e.setAttribute("data-depth", r)
                    }, l = 0; l < e.length; l++) {
                    var u = e[l];
                    a(u.firstElementChild), i && a(u.lastChild)
                }
                s.className = o, t._parallax = new Parallax(t.el.parent, n.parallax.settings), t.el.parent.style.transformStyle = "initial", t.el.on("destroy", function() {
                    t.el.parent.removeAttribute("style"), t._parallax.disable();
                    var e = t._parallax.layers;
                    t._parallax = t._parallax.layers = t._parallax.element = void 0;
                    for (var n = e.length - 1; n >= 0; n--) {
                        var i = e[n];
                        classie.remove(i, o), i.removeAttribute("data-depth"), i.removeAttribute("style")
                    }
                })
            }
        }
    }, {}],
    19: [function(e, t, n) {
        t.exports = function(e) {
            var t = this.options.shadows.template;
            e.forEach(function(e) {
                e.innerHTML += t
            }), this.el.on("destroy", function() {
                e.forEach(function(e) {
                    e.removeChild(e.lastChild)
                })
            })
        }
    }, {}],
    20: [function(e, t, n) {
        t.exports = function() {
            var e = this.options.sync.targets,
                t = function(t) {
                    for (var n = t.index, i = 0; i < e.length; i++) window[e[i]].el.slide(n)
                };
            this.el.on("activate", t)
        }
    }, {}],
    21: [function(e, t, n) {
        "use strict";

        function i(e, t) {
            var n = c({}, u);
            this.options = c(n, t), this.init(e)
        }
        var o = e("./core"),
            r = e("./core/-classes"),
            s = e("./core/-touches"),
            a = e("./core/-changed"),
            l = e("./core/-keys"),
            u = e("./-defaults"),
            c = e("./-merge");
        i.prototype = {
            init: function(e) {
                var t = this.options,
                    n = e.querySelectorAll(t.selector);
                this.el = o(n), this.el.parent = e, this.plugins(), this.el.slide(this.options.focus), classie.add(this.el.parent, "bee3D--effect__" + this.options.effect), this.events(), this.slideEvents(), this.options.onInit(), this.el.initialized = !0
            },
            plugins: function() {
                var e = this,
                    t = e.options,
                    n = [r(t), a(t.onChange)];
                t.listeners.keys && n.push(l()), t.listeners.touches && n.push(s()), (n || []).forEach(function(t) {
                    t(e.el)
                })
            },
            events: function() {
                var e = this.options;
                e.sync.enabled && this.sync(), e.ajax.enabled && this.ajax(), e.loop.enabled && this.loop(), e.autoplay.enabled && this.autoplay(), e.navigation.enabled && this.navigation(), e.listeners.scroll && this.mouseScroll(), e.listeners.drag && this.mouseDrag()
            },
            slideEvents: function(e) {
                var t = this.options;
                e || (e = this.el.slides), t.shadows.enabled && this.shadows(e), t.parallax.enabled && this.parallax(e), t.listeners.clicks && this.clickInactives(e)
            },
            sync: e("./features/sync"),
            ajax: e("./features/ajax"),
            loop: e("./features/loop"),
            shadows: e("./features/shadows"),
            autoplay: e("./features/autoplay"),
            navigation: e("./features/navigation"),
            parallax: e("./features/parallax"),
            clickInactives: e("./features/clickInactives"),
            mouseScroll: e("./features/mouseScroll"),
            mouseDrag: e("./features/mouseDrag"),
            destroy: e("./core/-destroy"),
            listenToHover: e("./features/autoplay/-listenToHover")
        }, t.exports = i
    }, {
        "./-defaults": 1,
        "./-merge": 2,
        "./core": 8,
        "./core/-changed": 3,
        "./core/-classes": 4,
        "./core/-destroy": 5,
        "./core/-keys": 6,
        "./core/-touches": 7,
        "./features/ajax": 10,
        "./features/autoplay": 12,
        "./features/autoplay/-listenToHover": 11,
        "./features/clickInactives": 13,
        "./features/loop": 14,
        "./features/mouseDrag": 15,
        "./features/mouseScroll": 16,
        "./features/navigation": 17,
        "./features/parallax": 18,
        "./features/shadows": 19,
        "./features/sync": 20
    }],
    22: [function(e, t, n) {
        window.Bee3D = e("./")
    }, {
        "./": 21
    }]
}, {}, [22]);