i = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;


var r, e;
r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    n = {
        rotl: function (t, r) {
            return t << r | t >>> 32 - r
        },
        rotr: function (t, r) {
            return t << 32 - r | t >>> r
        },
        endian: function (t) {
            if (t.constructor == Number)
                return 16711935 & e.rotl(t, 8) | 4278255360 & e.rotl(t, 24);
            for (var r = 0; r < t.length; r++)
                t[r] = e.endian(t[r]);
            return t
        },
        randomBytes: function (t) {
            for (var r = []; t > 0; t--)
                r.push(Math.floor(256 * Math.random()));
            return r
        },
        bytesToWords: function (t) {
            for (var r = [], e = 0, n = 0; e < t.length; e++,
                n += 8)
                r[n >>> 5] |= t[e] << 24 - n % 32;
            return r
        },
        wordsToBytes: function (t) {
            for (var r = [], e = 0; e < 32 * t.length; e += 8)
                r.push(t[e >>> 5] >>> 24 - e % 32 & 255);
            return r
        },
        bytesToHex: function (t) {
            for (var r = [], e = 0; e < t.length; e++)
                r.push((t[e] >>> 4).toString(16)),
                    r.push((15 & t[e]).toString(16));
            return r.join("")
        },
        hexToBytes: function (t) {
            for (var r = [], e = 0; e < t.length; e += 2)
                r.push(parseInt(t.substr(e, 2), 16));
            return r
        },
        bytesToBase64: function (t) {
            for (var e = [], n = 0; n < t.length; n += 3)
                for (var o = t[n] << 16 | t[n + 1] << 8 | t[n + 2], i = 0; i < 4; i++)
                    8 * n + 6 * i <= 8 * t.length ? e.push(r.charAt(o >>> 6 * (3 - i) & 63)) : e.push("=");
            return e.join("")
        },
        base64ToBytes: function (t) {
            t = t.replace(/[^A-Z0-9+\/]/ig, "");
            for (var e = [], n = 0, o = 0; n < t.length; o = ++n % 4)
                0 != o && e.push((r.indexOf(t.charAt(n - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | r.indexOf(t.charAt(n)) >>> 6 - 2 * o);
            return e
        }
    };
e = n;
u = function (t, r) {
    var r = {
        utf8: {
            stringToBytes: function (t) {
                return r.bin.stringToBytes(unescape(encodeURIComponent(t)))
            },
            bytesToString: function (t) {
                return decodeURIComponent(escape(r.bin.bytesToString(t)))
            }
        },
        bin: {
            stringToBytes: function (t) {
                for (var r = [], e = 0; e < t.length; e++)
                    r.push(255 & t.charCodeAt(e));
                return r
            },
            bytesToString: function (t) {
                for (var r = [], e = 0; e < t.length; e++)
                    r.push(String.fromCharCode(t[e]));
                return r.join("")
            }
        }
    };
    const o = r.utf8
    t.constructor == String ? t = r && "binary" === r.encoding ? f.stringToBytes(t) : o.stringToBytes(t) : i(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || t.constructor === Uint8Array || (t = t.toString());
    for (var e = n.bytesToWords(t), s = 8 * t.length, a = 1732584193, c = -271733879, h = -1732584194, l = 271733878, p = 0; p < e.length; p++)
        e[p] = (e[p] << 8 | e[p] >>> 24) & 16711935 | (e[p] << 24 | e[p] >>> 8) & 4278255360;
    e[s >>> 5] |= 128 << s % 32,
        e[(s + 64 >>> 9 << 4) + 14] = s;
    for (var y = u._ff, g = u._gg, d = u._hh, v = u._ii, p = 0; p < e.length; p += 16) {
        var b = a
            , m = c
            , w = h
            , E = l;
        var y = function (t, r, e, n, o, i, f) {
            var u = t + (r & e | ~r & n) + (o >>> 0) + f;
            return (u << i | u >>> 32 - i) + r
        };
        var g = function (t, r, e, n, o, i, f) {
            var u = t + (r & n | e & ~n) + (o >>> 0) + f;
            return (u << i | u >>> 32 - i) + r
        }
        var d = function (t, r, e, n, o, i, f) {
            var u = t + (r ^ e ^ n) + (o >>> 0) + f;
            return (u << i | u >>> 32 - i) + r
        }
        var v = function (t, r, e, n, o, i, f) {
            var u = t + (e ^ (r | ~n)) + (o >>> 0) + f;
            return (u << i | u >>> 32 - i) + r
        }
        a = y(a, c, h, l, e[p + 0], 7, -680876936),
            l = y(l, a, c, h, e[p + 1], 12, -389564586),
            h = y(h, l, a, c, e[p + 2], 17, 606105819),
            c = y(c, h, l, a, e[p + 3], 22, -1044525330),
            a = y(a, c, h, l, e[p + 4], 7, -176418897),
            l = y(l, a, c, h, e[p + 5], 12, 1200080426),
            h = y(h, l, a, c, e[p + 6], 17, -1473231341),
            c = y(c, h, l, a, e[p + 7], 22, -45705983),
            a = y(a, c, h, l, e[p + 8], 7, 1770035416),
            l = y(l, a, c, h, e[p + 9], 12, -1958414417),
            h = y(h, l, a, c, e[p + 10], 17, -42063),
            c = y(c, h, l, a, e[p + 11], 22, -1990404162),
            a = y(a, c, h, l, e[p + 12], 7, 1804603682),
            l = y(l, a, c, h, e[p + 13], 12, -40341101),
            h = y(h, l, a, c, e[p + 14], 17, -1502002290),
            c = y(c, h, l, a, e[p + 15], 22, 1236535329),
            a = g(a, c, h, l, e[p + 1], 5, -165796510),
            l = g(l, a, c, h, e[p + 6], 9, -1069501632),
            h = g(h, l, a, c, e[p + 11], 14, 643717713),
            c = g(c, h, l, a, e[p + 0], 20, -373897302),
            a = g(a, c, h, l, e[p + 5], 5, -701558691),
            l = g(l, a, c, h, e[p + 10], 9, 38016083),
            h = g(h, l, a, c, e[p + 15], 14, -660478335),
            c = g(c, h, l, a, e[p + 4], 20, -405537848),
            a = g(a, c, h, l, e[p + 9], 5, 568446438),
            l = g(l, a, c, h, e[p + 14], 9, -1019803690),
            h = g(h, l, a, c, e[p + 3], 14, -187363961),
            c = g(c, h, l, a, e[p + 8], 20, 1163531501),
            a = g(a, c, h, l, e[p + 13], 5, -1444681467),
            l = g(l, a, c, h, e[p + 2], 9, -51403784),
            h = g(h, l, a, c, e[p + 7], 14, 1735328473),
            c = g(c, h, l, a, e[p + 12], 20, -1926607734),
            a = d(a, c, h, l, e[p + 5], 4, -378558),
            l = d(l, a, c, h, e[p + 8], 11, -2022574463),
            h = d(h, l, a, c, e[p + 11], 16, 1839030562),
            c = d(c, h, l, a, e[p + 14], 23, -35309556),
            a = d(a, c, h, l, e[p + 1], 4, -1530992060),
            l = d(l, a, c, h, e[p + 4], 11, 1272893353),
            h = d(h, l, a, c, e[p + 7], 16, -155497632),
            c = d(c, h, l, a, e[p + 10], 23, -1094730640),
            a = d(a, c, h, l, e[p + 13], 4, 681279174),
            l = d(l, a, c, h, e[p + 0], 11, -358537222),
            h = d(h, l, a, c, e[p + 3], 16, -722521979),
            c = d(c, h, l, a, e[p + 6], 23, 76029189),
            a = d(a, c, h, l, e[p + 9], 4, -640364487),
            l = d(l, a, c, h, e[p + 12], 11, -421815835),
            h = d(h, l, a, c, e[p + 15], 16, 530742520),
            c = d(c, h, l, a, e[p + 2], 23, -995338651),
            a = v(a, c, h, l, e[p + 0], 6, -198630844),
            l = v(l, a, c, h, e[p + 7], 10, 1126891415),
            h = v(h, l, a, c, e[p + 14], 15, -1416354905),
            c = v(c, h, l, a, e[p + 5], 21, -57434055),
            a = v(a, c, h, l, e[p + 12], 6, 1700485571),
            l = v(l, a, c, h, e[p + 3], 10, -1894986606),
            h = v(h, l, a, c, e[p + 10], 15, -1051523),
            c = v(c, h, l, a, e[p + 1], 21, -2054922799),
            a = v(a, c, h, l, e[p + 8], 6, 1873313359),
            l = v(l, a, c, h, e[p + 15], 10, -30611744),
            h = v(h, l, a, c, e[p + 6], 15, -1560198380),
            c = v(c, h, l, a, e[p + 13], 21, 1309151649),
            a = v(a, c, h, l, e[p + 4], 6, -145523070),
            l = v(l, a, c, h, e[p + 11], 10, -1120210379),
            h = v(h, l, a, c, e[p + 2], 15, 718787259),
            c = v(c, h, l, a, e[p + 9], 21, -343485551),
            a = a + b >>> 0,
            c = c + m >>> 0,
            h = h + w >>> 0,
            l = l + E >>> 0
    }
    return n.endian([a, c, h, l])
}
u.isBuffer = function (t) {
    return null != t && !0 === t._isBuffer && t !== u.prototype
}
u.isEncoding = function (t) {
    switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return !0;
        default:
            return !1
    }
}
function p(t, r) {
    function x(t, r) {
        return t instanceof r || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === r.name
    }

    if (u.isBuffer(t))
        return t.length;
    if (ArrayBuffer.isView(t) || x(t, ArrayBuffer))
        return t.byteLength;
    if ("string" != typeof t)
        throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
    var e = t.length
        , n = arguments.length > 2 && !0 === arguments[2];
    if (!n && 0 === e)
        return 0;
    for (var o = !1; ;)
        switch (r) {
            case "ascii":
            case "latin1":
            case "binary":
                return e;
            case "utf8":
            case "utf-8":
                return T(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * e;
            case "hex":
                return e >>> 1;
            case "base64":
                return C(t).length;
            default:
                if (o)
                    return n ? -1 : T(t).length;
                r = ("" + r).toLowerCase(),
                    o = !0
        }
}
write = function (that, t, r, e, n) {
    if (void 0 === r)
        n = "utf8",
            e = that.length,
            r = 0;
    else if (void 0 === e && "string" == typeof r)
        n = r,
            e = that.length,
            r = 0;
    else if (isFinite(r))
        r >>>= 0,
            isFinite(e) ? (e >>>= 0,
                void 0 === n && (n = "utf8")) : (n = e,
                    e = void 0);
    else
        throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    var o, i, f, u, s, a, c, h, l, p, y, g, d = that.length - r;
    if ((void 0 === e || e > d) && (e = d),
        t.length > 0 && (e < 0 || r < 0) || r > that.length)
        throw RangeError("Attempt to write outside buffer bounds");
    n || (n = "utf8");
    for (var v = !1; ;)
        switch (n) {
            case "hex":
                return function (t, r, e, n) {
                    e = Number(e) || 0;
                    var o = t.length - e;
                    n ? (n = Number(n)) > o && (n = o) : n = o;
                    var i = r.length;
                    n > i / 2 && (n = i / 2);
                    for (var f = 0; f < n; ++f) {
                        var u = parseInt(r.substr(2 * f, 2), 16);
                        if (u != u)
                            break;
                        t[e + f] = u
                    }
                    return f
                }(that, t, r, e);
            case "utf8":
            case "utf-8":
                return s = r,
                    a = e,
                    U(T(t, that.length - s), that, s, a);
            case "ascii":
                return c = r,
                    h = e,
                    U(O(t), that, c, h);
            case "latin1":
            case "binary":
                ; return o = that,
                    i = t,
                    f = r,
                    u = e,
                    U(O(i), o, f, u);
            case "base64":
                return l = r,
                    p = e,
                    U(C(t), that, l, p);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return y = r,
                    g = e,
                    U(function (t, r) {
                        for (var e, n, o = [], i = 0; i < t.length && !((r -= 2) < 0); ++i)
                            n = (e = t.charCodeAt(i)) >> 8,
                                o.push(e % 256),
                                o.push(n);
                        return o
                    }(t, that.length - y), that, y, g);
            default:
                if (v)
                    throw TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(),
                    v = !0
        }
}
slice = function (that, t, r) {
    var e = that.length;
    t = ~~t,
        r = void 0 === r ? e : ~~r,
        t < 0 ? (t += e) < 0 && (t = 0) : t > e && (t = e),
        r < 0 ? (r += e) < 0 && (r = 0) : r > e && (r = e),
        r < t && (r = t);
    var rs = new Uint8Array(that);
    var n = rs.subarray(t, r);
    return Object.setPrototypeOf(n, u.prototype),
        n
}
function y(t, r, e) {
    if ("string" == typeof t)
        return function (t, r) {
            if (("string" != typeof r || "" === r) && (r = "utf8"),
                !u.isEncoding(r))
                throw TypeError("Unknown encoding: " + r);
            function f(t) {
                if (t > 2147483647)
                    throw RangeError('The value "' + t + '" is invalid for option "size"');
                var r = new Uint8Array(t);
                return Object.setPrototypeOf(r, Enc.prototype),
                    r
            }
            var e = 0 | p(t, r)
                , n = f(e)
                , o = write(n, t, r);
            return o !== e && (n = slice(n, 0, o)),
                n
        }(t, r);
    if (ArrayBuffer.isView(t))
        return h(t);
    if (null == t)
        throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
    if (x(t, ArrayBuffer) || t && x(t.buffer, ArrayBuffer) || "undefined" != typeof SharedArrayBuffer && (x(t, SharedArrayBuffer) || t && x(t.buffer, SharedArrayBuffer)))
        return function (t, r, e) {
            var n;
            if (r < 0 || t.byteLength < r)
                throw RangeError('"offset" is outside of buffer bounds');
            if (t.byteLength < r + (e || 0))
                throw RangeError('"length" is outside of buffer bounds');
            return Object.setPrototypeOf(n = void 0 === r && void 0 === e ? new Uint8Array(t) : void 0 === e ? new Uint8Array(t, r) : new Uint8Array(t, r, e), u.prototype),
                n
        }(t, r, e);
    if ("number" == typeof t)
        throw TypeError('The "value" argument must not be of type number. Received type number');
    var n = t.valueOf && t.valueOf();
    if (null != n && n !== t)
        return u.from(n, r, e);
    var o = function (t) {
        if (u.isBuffer(t)) {
            var r, e = 0 | l(t.length), n = f(e);
            return 0 === n.length || t.copy(n, 0, 0, e),
                n
        }
        return void 0 !== t.length ? "number" != typeof t.length || (r = t.length) != r ? f(0) : h(t) : "Buffer" === t.type && Array.isArray(t.data) ? h(t.data) : void 0
    }(t);
    if (o)
        return o;
    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive])
        return u.from(t[Symbol.toPrimitive]("string"), r, e);
    throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
}

function N(t, r) {
    if (null == t) throw Error("Illegal argument " + t);
    var e = n.wordsToBytes(u(t, r));
    return r && r.asBytes ? e : r && r.asString ? f.bytesToString(e) : n.bytesToHex(e)
}


function Enc(t, r, e) {
    if ("number" == typeof t) {
        if ("string" == typeof r)
            throw TypeError('The "string" argument must be of type string. Received type number');
        return c(t)
    }
    return s(t, r, e)
}



Enc.TYPED_ARRAY_SUPPORT = function () {
    try {
        var t = new Uint8Array(1)
            , r = {
                foo: function () {
                    return 42
                }
            };
        return Object.setPrototypeOf(r, Uint8Array.prototype),
            Object.setPrototypeOf(t, r),
            42 === t.foo()
    } catch (t) {
        return !1
    }
}(),
    Enc.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
    Object.defineProperty(Enc.prototype, "parent", {
        enumerable: !0,
        get: function () {
            if (Enc.isBuffer(this))
                return this.buffer
        }
    }),
    Object.defineProperty(Enc.prototype, "offset", {
        enumerable: !0,
        get: function () {
            if (Enc.isBuffer(this))
                return this.byteOffset
        }
    }),
    Enc.poolSize = 8192,
    Enc.from = function (t, r, e) {
        return s(t, r, e)
    }
    ,
    Object.setPrototypeOf(Enc.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(Enc, Uint8Array),
    Enc.alloc = function (t, r, e) {
        return (a(t),
            t <= 0) ? f(t) : void 0 !== r ? "string" == typeof e ? f(t).fill(r, e) : f(t).fill(r) : f(t)
    }
    ,
    Enc.allocUnsafe = function (t) {
        return c(t)
    }
    ,
    Enc.allocUnsafeSlow = function (t) {
        return c(t)
    }
    ,
    Enc.isBuffer = function (t) {
        return null != t && !0 === t._isBuffer && t !== Enc.prototype
    }
    ,
    Enc.compare = function (t, r) {
        if (x(t, Uint8Array) && (t = Enc.from(t, t.offset, t.byteLength)),
            x(r, Uint8Array) && (r = Enc.from(r, r.offset, r.byteLength)),
            !Enc.isBuffer(t) || !Enc.isBuffer(r))
            throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (t === r)
            return 0;
        for (var e = t.length, n = r.length, o = 0, i = Math.min(e, n); o < i; ++o)
            if (t[o] !== r[o]) {
                e = t[o],
                    n = r[o];
                break
            }
        return e < n ? -1 : n < e ? 1 : 0
    }
    ,
    Enc.isEncoding = function (t) {
        switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
        }
    }
    ,
    Enc.concat = function (t, r) {
        if (!Array.isArray(t))
            throw TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length)
            return Enc.alloc(0);
        if (void 0 === r)
            for (e = 0,
                r = 0; e < t.length; ++e)
                r += t[e].length;
        var e, n = Enc.allocUnsafe(r), o = 0;
        for (e = 0; e < t.length; ++e) {
            var i = t[e];
            if (x(i, Uint8Array) && (i = Enc.from(i)),
                !Enc.isBuffer(i))
                throw TypeError('"list" argument must be an Array of Buffers');
            i.copy(n, o),
                o += i.length
        }
        return n
    }
    ,
    Enc.byteLength = p,
    Enc.prototype._isBuffer = !0,
    Enc.prototype.swap16 = function () {
        var t = this.length;
        if (t % 2 != 0)
            throw RangeError("Buffer size must be a multiple of 16-bits");
        for (var r = 0; r < t; r += 2)
            g(this, r, r + 1);
        return this
    }
    ,
    Enc.prototype.swap32 = function () {
        var t = this.length;
        if (t % 4 != 0)
            throw RangeError("Buffer size must be a multiple of 32-bits");
        for (var r = 0; r < t; r += 4)
            g(this, r, r + 3),
                g(this, r + 1, r + 2);
        return this
    }
    ,
    Enc.prototype.swap64 = function () {
        var t = this.length;
        if (t % 8 != 0)
            throw RangeError("Buffer size must be a multiple of 64-bits");
        for (var r = 0; r < t; r += 8)
            g(this, r, r + 7),
                g(this, r + 1, r + 6),
                g(this, r + 2, r + 5),
                g(this, r + 3, r + 4);
        return this
    }
    ,
    Enc.prototype.toString = function () {
        var t = this.length;
        return 0 === t ? "" : 0 == arguments.length ? b(this, 0, t) : y.apply(this, arguments)
    }
    ,
    Enc.prototype.toLocaleString = Enc.prototype.toString,
    Enc.prototype.equals = function (t) {
        if (!Enc.isBuffer(t))
            throw TypeError("Argument must be a Buffer");
        return this === t || 0 === Enc.compare(this, t)
    }
    ,
    Enc.prototype.inspect = function () {
        var t = ""
            , e = r.INSPECT_MAX_BYTES;
        return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(),
            this.length > e && (t += " ... "),
            "<Buffer " + t + ">"
    }
    ,
    i && (Enc.prototype[i] = Enc.prototype.inspect),
    Enc.prototype.compare = function (t, r, e, n, o) {
        if (x(t, Uint8Array) && (t = Enc.from(t, t.offset, t.byteLength)),
            !Enc.isBuffer(t))
            throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
        if (void 0 === r && (r = 0),
            void 0 === e && (e = t ? t.length : 0),
            void 0 === n && (n = 0),
            void 0 === o && (o = this.length),
            r < 0 || e > t.length || n < 0 || o > this.length)
            throw RangeError("out of range index");
        if (n >= o && r >= e)
            return 0;
        if (n >= o)
            return -1;
        if (r >= e)
            return 1;
        if (r >>>= 0,
            e >>>= 0,
            n >>>= 0,
            o >>>= 0,
            this === t)
            return 0;
        for (var i = o - n, f = e - r, s = Math.min(i, f), a = this.slice(n, o), c = t.slice(r, e), h = 0; h < s; ++h)
            if (a[h] !== c[h]) {
                i = a[h],
                    f = c[h];
                break
            }
        return i < f ? -1 : f < i ? 1 : 0
    }
    ,
    Enc.prototype.includes = function (t, r, e) {
        return -1 !== this.indexOf(t, r, e)
    }
    ,
    Enc.prototype.indexOf = function (t, r, e) {
        return d(this, t, r, e, !0)
    }
    ,
    Enc.prototype.lastIndexOf = function (t, r, e) {
        return d(this, t, r, e, !1)
    }
    ,
    Enc.prototype.write = function (t, r, e, n) {
        if (void 0 === r)
            n = "utf8",
                e = this.length,
                r = 0;
        else if (void 0 === e && "string" == typeof r)
            n = r,
                e = this.length,
                r = 0;
        else if (isFinite(r))
            r >>>= 0,
                isFinite(e) ? (e >>>= 0,
                    void 0 === n && (n = "utf8")) : (n = e,
                        e = void 0);
        else
            throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        var o, i, f, u, s, a, c, h, l, p, y, g, d = this.length - r;
        if ((void 0 === e || e > d) && (e = d),
            t.length > 0 && (e < 0 || r < 0) || r > this.length)
            throw RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var v = !1; ;)
            switch (n) {
                case "hex":
                    return function (t, r, e, n) {
                        e = Number(e) || 0;
                        var o = t.length - e;
                        n ? (n = Number(n)) > o && (n = o) : n = o;
                        var i = r.length;
                        n > i / 2 && (n = i / 2);
                        for (var f = 0; f < n; ++f) {
                            var u = parseInt(r.substr(2 * f, 2), 16);
                            if (u != u)
                                break;
                            t[e + f] = u
                        }
                        return f
                    }(this, t, r, e);
                case "utf8":
                case "utf-8":
                    return s = r,
                        a = e,
                        U(T(t, this.length - s), this, s, a);
                case "ascii":
                    return c = r,
                        h = e,
                        U(O(t), this, c, h);
                case "latin1":
                case "binary":
                    ; return o = this,
                        i = t,
                        f = r,
                        u = e,
                        U(O(i), o, f, u);
                case "base64":
                    return l = r,
                        p = e,
                        U(C(t), this, l, p);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return y = r,
                        g = e,
                        U(function (t, r) {
                            for (var e, n, o = [], i = 0; i < t.length && !((r -= 2) < 0); ++i)
                                n = (e = t.charCodeAt(i)) >> 8,
                                    o.push(e % 256),
                                    o.push(n);
                            return o
                        }(t, this.length - y), this, y, g);
                default:
                    if (v)
                        throw TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(),
                        v = !0
            }
    }
    ,
    Enc.prototype.toJSON = function () {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    }
    ,
    Enc.prototype.slice = function (t, r) {
        var e = this.length;
        t = ~~t,
            r = void 0 === r ? e : ~~r,
            t < 0 ? (t += e) < 0 && (t = 0) : t > e && (t = e),
            r < 0 ? (r += e) < 0 && (r = 0) : r > e && (r = e),
            r < t && (r = t);
        var n = this.subarray(t, r);
        return Object.setPrototypeOf(n, Enc.prototype),
            n
    }
    ,
    Enc.prototype.readUIntLE = function (t, r, e) {
        t >>>= 0,
            r >>>= 0,
            e || m(t, r, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < r && (o *= 256);)
            n += this[t + i] * o;
        return n
    }
    ,
    Enc.prototype.readUIntBE = function (t, r, e) {
        t >>>= 0,
            r >>>= 0,
            e || m(t, r, this.length);
        for (var n = this[t + --r], o = 1; r > 0 && (o *= 256);)
            n += this[t + --r] * o;
        return n
    }
    ,
    Enc.prototype.readUInt8 = function (t, r) {
        return t >>>= 0,
            r || m(t, 1, this.length),
            this[t]
    }
    ,
    Enc.prototype.readUInt16LE = function (t, r) {
        return t >>>= 0,
            r || m(t, 2, this.length),
            this[t] | this[t + 1] << 8
    }
    ,
    Enc.prototype.readUInt16BE = function (t, r) {
        return t >>>= 0,
            r || m(t, 2, this.length),
            this[t] << 8 | this[t + 1]
    }
    ,
    Enc.prototype.readUInt32LE = function (t, r) {
        return t >>>= 0,
            r || m(t, 4, this.length),
            (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
    }
    ,
    Enc.prototype.readUInt32BE = function (t, r) {
        return t >>>= 0,
            r || m(t, 4, this.length),
            16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
    }
    ,
    Enc.prototype.readIntLE = function (t, r, e) {
        t >>>= 0,
            r >>>= 0,
            e || m(t, r, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < r && (o *= 256);)
            n += this[t + i] * o;
        return n >= (o *= 128) && (n -= Math.pow(2, 8 * r)),
            n
    }
    ,
    Enc.prototype.readIntBE = function (t, r, e) {
        t >>>= 0,
            r >>>= 0,
            e || m(t, r, this.length);
        for (var n = r, o = 1, i = this[t + --n]; n > 0 && (o *= 256);)
            i += this[t + --n] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * r)),
            i
    }
    ,
    Enc.prototype.readInt8 = function (t, r) {
        return (t >>>= 0,
            r || m(t, 1, this.length),
            128 & this[t]) ? -((255 - this[t] + 1) * 1) : this[t]
    }
    ,
    Enc.prototype.readInt16LE = function (t, r) {
        t >>>= 0,
            r || m(t, 2, this.length);
        var e = this[t] | this[t + 1] << 8;
        return 32768 & e ? 4294901760 | e : e
    }
    ,
    Enc.prototype.readInt16BE = function (t, r) {
        t >>>= 0,
            r || m(t, 2, this.length);
        var e = this[t + 1] | this[t] << 8;
        return 32768 & e ? 4294901760 | e : e
    }
    ,
    Enc.prototype.readInt32LE = function (t, r) {
        return t >>>= 0,
            r || m(t, 4, this.length),
            this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
    }
    ,
    Enc.prototype.readInt32BE = function (t, r) {
        return t >>>= 0,
            r || m(t, 4, this.length),
            this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
    }
    ,
    Enc.prototype.readFloatLE = function (t, r) {
        return t >>>= 0,
            r || m(t, 4, this.length),
            o.read(this, t, !0, 23, 4)
    }
    ,
    Enc.prototype.readFloatBE = function (t, r) {
        return t >>>= 0,
            r || m(t, 4, this.length),
            o.read(this, t, !1, 23, 4)
    }
    ,
    Enc.prototype.readDoubleLE = function (t, r) {
        return t >>>= 0,
            r || m(t, 8, this.length),
            o.read(this, t, !0, 52, 8)
    }
    ,
    Enc.prototype.readDoubleBE = function (t, r) {
        return t >>>= 0,
            r || m(t, 8, this.length),
            o.read(this, t, !1, 52, 8)
    }
    ,
    Enc.prototype.writeUIntLE = function (t, r, e, n) {
        if (t = +t,
            r >>>= 0,
            e >>>= 0,
            !n) {
            var o = Math.pow(2, 8 * e) - 1;
            w(this, t, r, e, o, 0)
        }
        var i = 1
            , f = 0;
        for (this[r] = 255 & t; ++f < e && (i *= 256);)
            this[r + f] = t / i & 255;
        return r + e
    }
    ,
    Enc.prototype.writeUIntBE = function (t, r, e, n) {
        if (t = +t,
            r >>>= 0,
            e >>>= 0,
            !n) {
            var o = Math.pow(2, 8 * e) - 1;
            w(this, t, r, e, o, 0)
        }
        var i = e - 1
            , f = 1;
        for (this[r + i] = 255 & t; --i >= 0 && (f *= 256);)
            this[r + i] = t / f & 255;
        return r + e
    }
    ,
    Enc.prototype.writeUInt8 = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 1, 255, 0),
            this[r] = 255 & t,
            r + 1
    }
    ,
    Enc.prototype.writeUInt16LE = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 2, 65535, 0),
            this[r] = 255 & t,
            this[r + 1] = t >>> 8,
            r + 2
    }
    ,
    Enc.prototype.writeUInt16BE = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 2, 65535, 0),
            this[r] = t >>> 8,
            this[r + 1] = 255 & t,
            r + 2
    }
    ,
    Enc.prototype.writeUInt32LE = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 4, 4294967295, 0),
            this[r + 3] = t >>> 24,
            this[r + 2] = t >>> 16,
            this[r + 1] = t >>> 8,
            this[r] = 255 & t,
            r + 4
    }
    ,
    Enc.prototype.writeUInt32BE = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 4, 4294967295, 0),
            this[r] = t >>> 24,
            this[r + 1] = t >>> 16,
            this[r + 2] = t >>> 8,
            this[r + 3] = 255 & t,
            r + 4
    }
    ,
    Enc.prototype.writeIntLE = function (t, r, e, n) {
        if (t = +t,
            r >>>= 0,
            !n) {
            var o = Math.pow(2, 8 * e - 1);
            w(this, t, r, e, o - 1, -o)
        }
        var i = 0
            , f = 1
            , u = 0;
        for (this[r] = 255 & t; ++i < e && (f *= 256);)
            t < 0 && 0 === u && 0 !== this[r + i - 1] && (u = 1),
                this[r + i] = (t / f >> 0) - u & 255;
        return r + e
    }
    ,
    Enc.prototype.writeIntBE = function (t, r, e, n) {
        if (t = +t,
            r >>>= 0,
            !n) {
            var o = Math.pow(2, 8 * e - 1);
            w(this, t, r, e, o - 1, -o)
        }
        var i = e - 1
            , f = 1
            , u = 0;
        for (this[r + i] = 255 & t; --i >= 0 && (f *= 256);)
            t < 0 && 0 === u && 0 !== this[r + i + 1] && (u = 1),
                this[r + i] = (t / f >> 0) - u & 255;
        return r + e
    }
    ,
    Enc.prototype.writeInt8 = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 1, 127, -128),
            t < 0 && (t = 255 + t + 1),
            this[r] = 255 & t,
            r + 1
    }
    ,
    Enc.prototype.writeInt16LE = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 2, 32767, -32768),
            this[r] = 255 & t,
            this[r + 1] = t >>> 8,
            r + 2
    }
    ,
    Enc.prototype.writeInt16BE = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 2, 32767, -32768),
            this[r] = t >>> 8,
            this[r + 1] = 255 & t,
            r + 2
    }
    ,
    Enc.prototype.writeInt32LE = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 4, 2147483647, -2147483648),
            this[r] = 255 & t,
            this[r + 1] = t >>> 8,
            this[r + 2] = t >>> 16,
            this[r + 3] = t >>> 24,
            r + 4
    }
    ,
    Enc.prototype.writeInt32BE = function (t, r, e) {
        return t = +t,
            r >>>= 0,
            e || w(this, t, r, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            this[r] = t >>> 24,
            this[r + 1] = t >>> 16,
            this[r + 2] = t >>> 8,
            this[r + 3] = 255 & t,
            r + 4
    }
    ,
    Enc.prototype.writeFloatLE = function (t, r, e) {
        return A(this, t, r, !0, e)
    }
    ,
    Enc.prototype.writeFloatBE = function (t, r, e) {
        return A(this, t, r, !1, e)
    }
    ,
    Enc.prototype.writeDoubleLE = function (t, r, e) {
        return B(this, t, r, !0, e)
    }
    ,
    Enc.prototype.writeDoubleBE = function (t, r, e) {
        return B(this, t, r, !1, e)
    }
    ,
    Enc.prototype.copy = function (t, r, e, n) {
        if (!Enc.isBuffer(t))
            throw TypeError("argument should be a Buffer");
        if (e || (e = 0),
            n || 0 === n || (n = this.length),
            r >= t.length && (r = t.length),
            r || (r = 0),
            n > 0 && n < e && (n = e),
            n === e || 0 === t.length || 0 === this.length)
            return 0;
        if (r < 0)
            throw RangeError("targetStart out of bounds");
        if (e < 0 || e >= this.length)
            throw RangeError("Index out of range");
        if (n < 0)
            throw RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length),
            t.length - r < n - e && (n = t.length - r + e);
        var o = n - e;
        if (this === t && "function" == typeof Uint8Array.prototype.copyWithin)
            this.copyWithin(r, e, n);
        else if (this === t && e < r && r < n)
            for (var i = o - 1; i >= 0; --i)
                t[i + r] = this[i + e];
        else
            Uint8Array.prototype.set.call(t, this.subarray(e, n), r);
        return o
    }
    ,
    Enc.prototype.fill = function (t, r, e, n) {
        if ("string" == typeof t) {
            if ("string" == typeof r ? (n = r,
                r = 0,
                e = this.length) : "string" == typeof e && (n = e,
                    e = this.length),
                void 0 !== n && "string" != typeof n)
                throw TypeError("encoding must be a string");
            if ("string" == typeof n && !Enc.isEncoding(n))
                throw TypeError("Unknown encoding: " + n);
            if (1 === t.length) {
                var o, i = t.charCodeAt(0);
                ("utf8" === n && i < 128 || "latin1" === n) && (t = i)
            }
        } else
            "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
        if (r < 0 || this.length < r || this.length < e)
            throw RangeError("Out of range index");
        if (e <= r)
            return this;
        if (r >>>= 0,
            e = void 0 === e ? this.length : e >>> 0,
            t || (t = 0),
            "number" == typeof t)
            for (o = r; o < e; ++o)
                this[o] = t;
        else {
            var f = Enc.isBuffer(t) ? t : Enc.from(t, n)
                , s = f.length;
            if (0 === s)
                throw TypeError('The value "' + t + '" is invalid for argument "value"');
            for (o = 0; o < e - r; ++o)
                this[o + r] = f[o % s]
        }
        return this
    }
    ;
