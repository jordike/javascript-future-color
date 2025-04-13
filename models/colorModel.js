export default class ColorModel {
    static combineColors(colors) {
        let totalR = 0;
        let totalG = 0;
        let totalB = 0;

        for (let { r, g, b } of colors) {
            totalR += r;
            totalG += g;
            totalB += b;
        }

        const length = colors.length;
        const avgR = Math.round(totalR / length);
        const avgG = Math.round(totalG / length);
        const avgB = Math.round(totalB / length);

        return { r: avgR, g: avgG, b: avgB };
    }

    static hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    }

    static rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h,
            s,
            l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // Achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    static hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l; // Achromatic
        } else {
            const hueToRgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hueToRgb(p, q, h + 1 / 3);
            g = hueToRgb(p, q, h);
            b = hueToRgb(p, q, h - 1 / 3);
        }

        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }

    static getTriadicColors(rgb) {
        const { r, g, b } = rgb;
        const hsl = this.rgbToHsl(r, g, b);

        const triadic1Hue = (hsl.h + 120) % 360;
        const triadic2Hue = (hsl.h + 240) % 360;

        const triadic1 = this.hslToRgb(triadic1Hue, hsl.s, hsl.l);
        const triadic2 = this.hslToRgb(triadic2Hue, hsl.s, hsl.l);

        return [
            { r: triadic1.r, g: triadic1.g, b: triadic1.b },
            { r: triadic2.r, g: triadic2.g, b: triadic2.b }
        ];
    }
}
