// 四个参数分别是：
// t: current time（当前时间）；
// c: change in value（变化量）；
// d: duration（持续时间）。
// b: beginning value（初始值）；
// ps：Elastic和Back有其他可选参数，里面都有说明。

// easeIn：从0开始加速的缓动；
// easeOut：减速到0的缓动；
// easeInOut：前半段从0开始加速，后半段减速到0的缓动。

export function Linear(t, c, d, b = 0) {
  return (c * t) / d + b;
}
export const Quad = {
  easeIn: function (t, c, d, b = 0) {
    return c * (t /= d) * t + b;
  },
  easeOut: function (t, c, d, b = 0) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOut: function (t, c, d, b = 0) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  },
};
export const Cubic = {
  easeIn: function (t, c, d, b = 0) {
    return c * (t /= d) * t * t + b;
  },
  easeOut: function (t, c, d, b = 0) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOut: function (t, c, d, b = 0) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  },
};
export const Quart = {
  easeIn: function (t, c, d, b = 0) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOut: function (t, c, d, b = 0) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOut: function (t, c, d, b = 0) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
  },
};
export const Quint = {
  easeIn: function (t, c, d, b = 0) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOut: function (t, c, d, b = 0) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOut: function (t, c, d, b = 0) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
  },
};
export const Sine = {
  easeIn: function (t, c, d, b = 0) {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
  },
  easeOut: function (t, c, d, b = 0) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  },
  easeInOut: function (t, c, d, b = 0) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  },
};
export const Expo = {
  easeIn: function (t, c, d, b = 0) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOut: function (t, c, d, b = 0) {
    return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
  },
  easeInOut: function (t, c, d, b = 0) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
  },
};
export const Circ = {
  easeIn: function (t, c, d, b = 0) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOut: function (t, c, d, b = 0) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOut: function (t, c, d, b = 0) {
    if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
};
export const Elastic = {
  easeIn: function (t, c, d, a, p, b = 0) {
    let s;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    return (
      -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p)
      ) + b
    );
  },
  easeOut: function (t, b, c, d, a, p) {
    let s;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
      c +
      b
    );
  },
  easeInOut: function (t, c, d, a, p, b = 0) {
    let s;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
    if (t < 1)
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
        b
      );
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
        0.5 +
      c +
      b
    );
  },
};
export const Back = {
  easeIn: function (t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOut: function (t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOut: function (t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1)
      return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
};
export const Bounce = {
  easeIn: function (t, c, d, b = 0) {
    return c - Bounce.easeOut(d - t, 0, c, d) + b;
  },
  easeOut: function (t, c, d, b = 0) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInOut: function (t, c, d, b = 0) {
    if (t < d / 2) return Bounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
    else return Bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
  },
};
export default {
  Linear,
  Quad,
  Cubic,
  Quart,
  Quint,
  Sine,
  Expo,
  Circ,
  Back,
  Elastic,
  Bounce,
};
