function a(c, u, l, h) {
    var p = "";
    u /= 8;
    var w, g, y;
    for (y = l === -1 ? 3 : 0,
        w = 0; w < u; w += 1)
        g = c[w >>> 2] >>> 8 * (y + w % 4 * l),
            p += "0123456789abcdef".charAt(g >>> 4 & 15) + "0123456789abcdef".charAt(g & 15);
    return h.outputUpper ? p.toUpperCase() : p
}
function S(c) {
    var u = {
        outputUpper: !1,
        b64Pad: "=",
        shakeLen: -1
    };
    if (c = c || {},
        u.outputUpper = c.outputUpper || !1,
        c.hasOwnProperty("b64Pad") === !0 && (u.b64Pad = c.b64Pad),
        c.hasOwnProperty("shakeLen") === !0) {
        if (c.shakeLen % 8 !== 0)
            throw Error("shakeLen must be a multiple of 8");
        u.shakeLen = c.shakeLen
    }
    if (typeof u.outputUpper != "boolean")
        throw Error("Invalid outputUpper formatting option");
    if (typeof u.b64Pad != "string")
        throw Error("Invalid b64Pad formatting option");
    return u
}
function E(c, u, l) {
    c = function (h, p, w) {
        var g, y, O = 0, v, I, P, H, $, W;
        p = p || [0], w = w || 0, P = w >>> 3
        for (W = l === -1 ? 3 : 0,
            v = 0; v < h.length; v += 1)
            for (g = h.charCodeAt(v),
                y = [],
                128 > g ? y.push(g) : 2048 > g ? (y.push(192 | g >>> 6),
                    y.push(128 | g & 63)) : 55296 > g || 57344 <= g ? y.push(224 | g >>> 12, 128 | g >>> 6 & 63, 128 | g & 63) : (v += 1,
                        g = 65536 + ((g & 1023) << 10 | h.charCodeAt(v) & 1023),
                        y.push(240 | g >>> 18, 128 | g >>> 12 & 63, 128 | g >>> 6 & 63, 128 | g & 63)),
                I = 0; I < y.length; I += 1) {
                for ($ = O + P,
                    H = $ >>> 2; p.length <= H;)
                    p.push(0);
                p[H] |= y[I] << 8 * (W + $ % 4 * l),
                    O += 1
            }
        return {
            value: p,
            binLen: 8 * O + w
        }
    };
    return c
}
function Ue(c, u, l, h, p) {
    var w = (c & 65535) + (u & 65535) + (l & 65535) + (h & 65535) + (p & 65535);
    return ((c >>> 16) + (u >>> 16) + (l >>> 16) + (h >>> 16) + (p >>> 16) + (w >>> 16) & 65535) << 16 | w & 65535
}
function C(c, u) {
    return c << u | c >>> 32 - u
}
function G(c, u, l) {
    return c & u ^ c & l ^ u & l
}
function ye(c, u) {
    var l = (c & 65535) + (u & 65535);
    return ((c >>> 16) + (u >>> 16) + (l >>> 16) & 65535) << 16 | l & 65535
}
function jr(c, u) {
    var l = [], h, p, w, g, y, O, v;
    for (h = u[0],
        p = u[1],
        w = u[2],
        g = u[3],
        y = u[4],
        v = 0; 80 > v; v += 1)
        l[v] = 16 > v ? c[v] : C(l[v - 3] ^ l[v - 8] ^ l[v - 14] ^ l[v - 16], 1),
            O = 20 > v ? Ue(C(h, 5), p & w ^ ~p & g, y, 1518500249, l[v]) : 40 > v ? Ue(C(h, 5), p ^ w ^ g, y, 1859775393, l[v]) : 60 > v ? Ue(C(h, 5), G(p, w, g), y, 2400959708, l[v]) : Ue(C(h, 5), p ^ w ^ g, y, 3395469782, l[v]),
            y = g,
            g = w,
            w = C(p, 30),
            p = h,
            h = O;
    return u[0] = ye(h, u[0]),
        u[1] = ye(p, u[1]),
        u[2] = ye(w, u[2]),
        u[3] = ye(g, u[3]),
        u[4] = ye(y, u[4]),
        u
}

function ac(c, u, l) {
    var h = 0, p = [], w = 0, g, y, O, v, I, P, H, $, W = !1, J = [], xe = [], ue, Ae = !1, ce = !1, z = -1;
    if (l = l || {},
        g = l.encoding || "UTF8",
        ue = l.numRounds || 1,
        ue !== parseInt(ue, 10) || 1 > ue)
        throw Error("numRounds must a integer >= 1");
    if (c === "SHA-1")
        I = 512,
            P = jr,
            H = (c, u, l, h) => {
                var p;
                for (p = (u + 65 >>> 9 << 4) + 15; c.length <= p;)
                    c.push(0);
                for (c[u >>> 5] |= 128 << 24 - u % 32,
                    u += l,
                    c[p] = u & 4294967295,
                    c[p - 1] = u / 4294967296 | 0,
                    u = c.length,
                    p = 0; p < u; p += 16)
                    h = jr(c.slice(p, p + 16), h);
                return h
            },
            v = 160,
            $ = function (A) {
                return A.slice()
            };
    O = E(u, g, z);
    y = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    this.setHMACKey = function (A, R, T) {
        var b;
        if (W === !0)
            throw Error("HMAC key already set");
        if (Ae === !0)
            throw Error("Cannot set HMAC key after calling update");
        if (ce === !0)
            throw Error("SHAKE is not supported for HMAC");
        for (g = (T || {}).encoding || "UTF8",
            R = E(R, g, z)(A),
            A = R.binLen,
            R = R.value,
            b = I >>> 3,
            T = b / 4 - 1,
            b < A / 8 && (R = H(R, A, 0, [1732584193, 4023233417, 2562383102, 271733878, 3285377520], v)); R.length <= T;)
            R.push(0);
        for (A = 0; A <= T; A += 1)
            J[A] = R[A] ^ 909522486,
                xe[A] = R[A] ^ 1549556828;
        y = P(J, y),
            h = I,
            W = !0
    }
    this.update = function (A) {
        var R, T, b, M = 0, B = I >>> 5;
        for (R = O(A, p, w),
            A = R.binLen,
            T = R.value,
            R = A >>> 5,
            b = 0; b < R; b += B)
            M + I <= A && (y = P(T.slice(b, b + B), y),
                M += I);
        h += M,
            p = T.slice(M >>> 5),
            w = A % I,
            Ae = !0
    }
    this.getHMAC = function (A, R) {
        var T, b, M, B;
        if (W === !1)
            throw Error("Cannot call getHMAC without first setting HMAC key");
        switch (M = S(R),
        A) {
            case "HEX":
                T = function (U) {
                    return a(U, v, z, M)
                }
                    ;
                break;
            case "B64":
                T = function (U) {
                    return o(U, v, z, M)
                }
                    ;
                break;
            case "BYTES":
                T = function (U) {
                    return d(U, v, z)
                }
                    ;
                break;
            case "ARRAYBUFFER":
                try {
                    T = new ArrayBuffer(0)
                } catch {
                    throw Error("ARRAYBUFFER not supported by this environment")
                }
                T = function (U) {
                    return f(U, v, z)
                }
                    ;
                break;
            case "UINT8ARRAY":
                try {
                    T = new Uint8Array(0)
                } catch {
                    throw Error("UINT8ARRAY not supported by this environment")
                }
                T = function (U) {
                    return _(U, v, z)
                }
                    ;
                break;
            default:
                throw Error("outputFormat must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")
        }
        return b = H(p.slice(), w, h, $(y), v),
            B = P(xe, [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
            B = H(b, v, I, B, v),
            T(B)
    }
}


// let i = new ac("SHA-1", "TEXT");
// i.setHMACKey('Ikkg568nlM51RHvldlPvc2GzZPE9R4XGzaH9Qj4zK9npbbbTly1gj9K4mgRn0QlV', "TEXT");
// i.update('/missav-default/search/users/fad8a2ce-333f-4aca-b27b-785ae602f16a/items/?frontend_timestamp=1716392575')
// var sss = i.getHMAC("HEX")
// console.log(sss)