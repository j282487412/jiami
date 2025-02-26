function $e(c) {
    var u = [], l;
    if (c === "SHA-1")
        u = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    else if (c.lastIndexOf("SHA-", 0) === 0)
        switch (u = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428],
        l = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
        c) {
            case "SHA-224":
                break;
            case "SHA-256":
                u = l;
                break;
            case "SHA-384":
                u = [new r(3418070365, u[0]), new r(1654270250, u[1]), new r(2438529370, u[2]), new r(355462360, u[3]), new r(1731405415, u[4]), new r(41048885895, u[5]), new r(3675008525, u[6]), new r(1203062813, u[7])];
                break;
            case "SHA-512":
                u = [new r(l[0], 4089235720), new r(l[1], 2227873595), new r(l[2], 4271175723), new r(l[3], 1595750129), new r(l[4], 2917565137), new r(l[5], 725511199), new r(l[6], 4215389547), new r(l[7], 327033209)];
                break;
            default:
                throw Error("Unknown SHA variant")
        }
    else if (c.lastIndexOf("SHA3-", 0) === 0 || c.lastIndexOf("SHAKE", 0) === 0)
        for (c = 0; 5 > c; c += 1)
            u[c] = [new r(0, 0), new r(0, 0), new r(0, 0), new r(0, 0), new r(0, 0)];
    else
        throw Error("No SHA variants supported");
    return u
}
function Ue(c, u, l, h, p) {
    var w = (c & 65535) + (u & 65535) + (l & 65535) + (h & 65535) + (p & 65535);
    return ((c >>> 16) + (u >>> 16) + (l >>> 16) + (h >>> 16) + (p >>> 16) + (w >>> 16) & 65535) << 16 | w & 65535
}
function ye(c, u) {
    var l = (c & 65535) + (u & 65535);
    return ((c >>> 16) + (u >>> 16) + (l >>> 16) & 65535) << 16 | l & 65535
}
function G(c, u, l) {
    return c & u ^ c & l ^ u & l
}
function C(c, u) {
    return c << u | c >>> 32 - u
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
function Cs(c, u, l, h) {
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
}
function qr(c, u, l) {
    var h, p, w, g, y, O, v, I, P, H, $, W, J, xe, ue, Ae, ce, z, pe, A, R, T, b = [], M;
    if (l === "SHA-224" || l === "SHA-256")
        H = 64,
            W = 1,
            T = Number,
            J = ye,
            xe = xs,
            ue = Ue,
            Ae = ws,
            ce = bs,
            z = ee,
            pe = he,
            R = G,
            A = q,
            M = x;
    else if (l === "SHA-384" || l === "SHA-512")
        H = 80,
            W = 2,
            T = r,
            J = As,
            xe = Ss,
            ue = Es,
            Ae = _s,
            ce = ys,
            z = ae,
            pe = vs,
            R = re,
            A = D,
            M = Lr;
    else
        throw Error("Unexpected error in SHA-2 implementation");
    for (l = u[0],
        h = u[1],
        p = u[2],
        w = u[3],
        g = u[4],
        y = u[5],
        O = u[6],
        v = u[7],
        $ = 0; $ < H; $ += 1)
        16 > $ ? (P = $ * W,
            I = c.length <= P ? 0 : c[P],
            P = c.length <= P + 1 ? 0 : c[P + 1],
            b[$] = new T(I, P)) : b[$] = xe(ce(b[$ - 2]), b[$ - 7], Ae(b[$ - 15]), b[$ - 16]),
            I = ue(v, pe(g), A(g, y, O), M[$], b[$]),
            P = J(z(l), R(l, h, p)),
            v = O,
            O = y,
            y = g,
            g = J(w, I),
            w = p,
            p = h,
            h = l,
            l = J(I, P);
    return u[0] = J(l, u[0]),
        u[1] = J(h, u[1]),
        u[2] = J(p, u[2]),
        u[3] = J(w, u[3]),
        u[4] = J(g, u[4]),
        u[5] = J(y, u[5]),
        u[6] = J(O, u[6]),
        u[7] = J(v, u[7]),
        u
}
function Je(c, u) {
    var l, h, p, w, g = [], y = [];
    if (c !== null)
        for (h = 0; h < c.length; h += 2)
            u[(h >>> 1) % 5][(h >>> 1) / 5 | 0] = ke(u[(h >>> 1) % 5][(h >>> 1) / 5 | 0], new r(c[h + 1], c[h]));
    for (l = 0; 24 > l; l += 1) {
        for (w = $e("SHA3-"),
            h = 0; 5 > h; h += 1) {
            p = u[h][0];
            var O = u[h][1]
                , v = u[h][2]
                , I = u[h][3]
                , P = u[h][4];
            g[h] = new r(p.a ^ O.a ^ v.a ^ I.a ^ P.a, p.b ^ O.b ^ v.b ^ I.b ^ P.b)
        }
        for (h = 0; 5 > h; h += 1)
            y[h] = ke(g[(h + 4) % 5], Q(g[(h + 1) % 5], 1));
        for (h = 0; 5 > h; h += 1)
            for (p = 0; 5 > p; p += 1)
                u[h][p] = ke(u[h][p], y[h]);
        for (h = 0; 5 > h; h += 1)
            for (p = 0; 5 > p; p += 1)
                w[p][(2 * h + 3 * p) % 5] = Q(u[h][p], Nr[h][p]);
        for (h = 0; 5 > h; h += 1)
            for (p = 0; 5 > p; p += 1)
                u[h][p] = ke(w[h][p], new r(~w[(h + 1) % 5][p].a & w[(h + 2) % 5][p].a, ~w[(h + 1) % 5][p].b & w[(h + 2) % 5][p].b));
        u[0][0] = ke(u[0][0], Br[l])
    }
    return u
}
function E(c, u, l) {
    switch (u) {
        case "UTF8":
        case "UTF16BE":
        case "UTF16LE":
            break;
        default:
            throw Error("encoding must be UTF8, UTF16BE, or UTF16LE")
    }
    switch (c) {
        case "HEX":
            c = function (h, p, w) {
                var g = h.length, y, O, v, I, P, H;
                if (g % 2 !== 0)
                    throw Error("String of HEX type must be in byte increments");
                for (p = p || [0],
                    w = w || 0,
                    P = w >>> 3,
                    H = l === -1 ? 3 : 0,
                    y = 0; y < g; y += 2) {
                    if (O = parseInt(h.substr(y, 2), 16),
                        isNaN(O))
                        throw Error("String of HEX type contains invalid characters");
                    for (I = (y >>> 1) + P,
                        v = I >>> 2; p.length <= v;)
                        p.push(0);
                    p[v] |= O << 8 * (H + I % 4 * l)
                }
                return {
                    value: p,
                    binLen: 4 * g + w
                }
            }
                ;
            break;
        case "TEXT":
            c = function (h, p, w) {
                var g, y, O = 0, v, I, P, H, $, W;
                if (p = p || [0],
                    w = w || 0,
                    P = w >>> 3,
                    u === "UTF8")
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
                else if (u === "UTF16BE" || u === "UTF16LE")
                    for (W = l === -1 ? 2 : 0,
                        y = u === "UTF16LE" && l !== 1 || u !== "UTF16LE" && l === 1,
                        v = 0; v < h.length; v += 1) {
                        for (g = h.charCodeAt(v),
                            y === !0 && (I = g & 255,
                                g = I << 8 | g >>> 8),
                            $ = O + P,
                            H = $ >>> 2; p.length <= H;)
                            p.push(0);
                        p[H] |= g << 8 * (W + $ % 4 * l),
                            O += 2
                    }
                return {
                    value: p,
                    binLen: 8 * O + w
                }
            };
            break;
        case "B64":
            c = function (h, p, w) {
                var g = 0, y, O, v, I, P, H, $, W;
                if (h.search(/^[a-zA-Z0-9=+\/]+$/) === -1)
                    throw Error("Invalid character in base-64 string");
                if (O = h.indexOf("="),
                    h = h.replace(/\=/g, ""),
                    O !== -1 && O < h.length)
                    throw Error("Invalid '=' found in base-64 string");
                for (p = p || [0],
                    w = w || 0,
                    H = w >>> 3,
                    W = l === -1 ? 3 : 0,
                    O = 0; O < h.length; O += 4) {
                    for (P = h.substr(O, 4),
                        v = I = 0; v < P.length; v += 1)
                        y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(P.charAt(v)),
                            I |= y << 18 - 6 * v;
                    for (v = 0; v < P.length - 1; v += 1) {
                        for ($ = g + H,
                            y = $ >>> 2; p.length <= y;)
                            p.push(0);
                        p[y] |= (I >>> 16 - 8 * v & 255) << 8 * (W + $ % 4 * l),
                            g += 1
                    }
                }
                return {
                    value: p,
                    binLen: 8 * g + w
                }
            }
                ;
            break;
        case "BYTES":
            c = function (h, p, w) {
                var g, y, O, v, I, P;
                for (p = p || [0],
                    w = w || 0,
                    O = w >>> 3,
                    P = l === -1 ? 3 : 0,
                    y = 0; y < h.length; y += 1)
                    g = h.charCodeAt(y),
                        I = y + O,
                        v = I >>> 2,
                        p.length <= v && p.push(0),
                        p[v] |= g << 8 * (P + I % 4 * l);
                return {
                    value: p,
                    binLen: 8 * h.length + w
                }
            }
                ;
            break;
        case "ARRAYBUFFER":
            try {
                c = new ArrayBuffer(0)
            } catch {
                throw Error("ARRAYBUFFER not supported by this environment")
            }
            c = function (h, p, w) {
                return s(new Uint8Array(h), p, w, l)
            }
                ;
            break;
        case "UINT8ARRAY":
            try {
                c = new Uint8Array(0)
            } catch {
                throw Error("UINT8ARRAY not supported by this environment")
            }
            c = function (h, p, w) {
                return s(h, p, w, l)
            }
                ;
            break;
        default:
            throw Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")
    }
    return c
}

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
            H = Cs,
            v = 160,
            $ = function (A) {
                return A.slice()
            }
            ;
    else if (c.lastIndexOf("SHA-", 0) === 0)
        if (P = function (A, R) {
            return qr(A, R, c)
        }
            ,
            H = function (A, R, T, b) {
                var M, B;
                if (c === "SHA-224" || c === "SHA-256")
                    M = (R + 65 >>> 9 << 4) + 15,
                        B = 16;
                else if (c === "SHA-384" || c === "SHA-512")
                    M = (R + 129 >>> 10 << 5) + 31,
                        B = 32;
                else
                    throw Error("Unexpected error in SHA-2 implementation");
                for (; A.length <= M;)
                    A.push(0);
                for (A[R >>> 5] |= 128 << 24 - R % 32,
                    R = R + T,
                    A[M] = R & 4294967295,
                    A[M - 1] = R / 4294967296 | 0,
                    T = A.length,
                    R = 0; R < T; R += B)
                    b = qr(A.slice(R, R + B), b, c);
                if (c === "SHA-224")
                    A = [b[0], b[1], b[2], b[3], b[4], b[5], b[6]];
                else if (c === "SHA-256")
                    A = b;
                else if (c === "SHA-384")
                    A = [b[0].a, b[0].b, b[1].a, b[1].b, b[2].a, b[2].b, b[3].a, b[3].b, b[4].a, b[4].b, b[5].a, b[5].b];
                else if (c === "SHA-512")
                    A = [b[0].a, b[0].b, b[1].a, b[1].b, b[2].a, b[2].b, b[3].a, b[3].b, b[4].a, b[4].b, b[5].a, b[5].b, b[6].a, b[6].b, b[7].a, b[7].b];
                else
                    throw Error("Unexpected error in SHA-2 implementation");
                return A
            }
            ,
            $ = function (A) {
                return A.slice()
            }
            ,
            c === "SHA-224")
            I = 512,
                v = 224;
        else if (c === "SHA-256")
            I = 512,
                v = 256;
        else if (c === "SHA-384")
            I = 1024,
                v = 384;
        else if (c === "SHA-512")
            I = 1024,
                v = 512;
        else
            throw Error("Chosen SHA variant is not supported");
    else if (c.lastIndexOf("SHA3-", 0) === 0 || c.lastIndexOf("SHAKE", 0) === 0) {
        var pe = 6;
        if (P = Je,
            $ = function (A) {
                var R = [], T;
                for (T = 0; 5 > T; T += 1)
                    R[T] = A[T].slice();
                return R
            }
            ,
            z = 1,
            c === "SHA3-224")
            I = 1152,
                v = 224;
        else if (c === "SHA3-256")
            I = 1088,
                v = 256;
        else if (c === "SHA3-384")
            I = 832,
                v = 384;
        else if (c === "SHA3-512")
            I = 576,
                v = 512;
        else if (c === "SHAKE128")
            I = 1344,
                v = -1,
                pe = 31,
                ce = !0;
        else if (c === "SHAKE256")
            I = 1088,
                v = -1,
                pe = 31,
                ce = !0;
        else
            throw Error("Chosen SHA variant is not supported");
        H = function (A, R, T, b, M) {
            T = I;
            var B = pe, U, Me = [], Xe = T >>> 5, He = 0, Rs = R >>> 5;
            for (U = 0; U < Rs && R >= T; U += Xe)
                b = Je(A.slice(U, U + Xe), b),
                    R -= T;
            for (A = A.slice(U),
                R %= T; A.length < Xe;)
                A.push(0);
            for (U = R >>> 3,
                A[U >> 2] ^= B << U % 4 * 8,
                A[Xe - 1] ^= 2147483648,
                b = Je(A, b); 32 * Me.length < M && (A = b[He % 5][He / 5 | 0],
                    Me.push(A.b),
                    !(32 * Me.length >= M));)
                Me.push(A.a),
                    He += 1,
                    64 * He % T === 0 && (Je(null, b),
                        He = 0);
            return Me
        }
    } else
        throw Error("Chosen SHA variant is not supported");
    O = E(u, g, z),
        y = $e(c),
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
                b < A / 8 && (R = H(R, A, 0, $e(c), v)); R.length <= T;)
                R.push(0);
            for (A = 0; A <= T; A += 1)
                J[A] = R[A] ^ 909522486,
                    xe[A] = R[A] ^ 1549556828;
            y = P(J, y),
                h = I,
                W = !0
        }
        ,
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
        ,
        this.getHash = function (A, R) {
            var T, b, M, B;
            if (W === !0)
                throw Error("Cannot call getHash after setting HMAC key");
            if (M = S(R),
                ce === !0) {
                if (M.shakeLen === -1)
                    throw Error("shakeLen must be specified in options");
                v = M.shakeLen
            }
            switch (A) {
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
                        b = new ArrayBuffer(0)
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
                        b = new Uint8Array(0)
                    } catch {
                        throw Error("UINT8ARRAY not supported by this environment")
                    }
                    T = function (U) {
                        return _(U, v, z)
                    }
                        ;
                    break;
                default:
                    throw Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")
            }
            for (B = H(p.slice(), w, h, $(y), v),
                b = 1; b < ue; b += 1)
                ce === !0 && v % 32 !== 0 && (B[B.length - 1] &= 16777215 >>> 24 - v % 32),
                    B = H(B, v, 0, $e(c), v);
            return T(B)
        }
        ,
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
                B = P(xe, $e(c)),
                B = H(b, v, I, B, v),
                T(B)
        }
}
