export class Color {
    constructor(h, s, l) {
        this.h = Math.round(h);
        this.s = Math.round(s);
        this.l = Math.round(l);

        this._rgbCache = null;
        this._hexCache = null;
        this._contrastCache = null;
    }

    static fromHex(hexString) {
        const cleanHex = hexString.replace("#", "");
        const r = parseInt(cleanHex.slice(0, 2), 16);
        const g = parseInt(cleanHex.slice(2, 4), 16);
        const b = parseInt(cleanHex.slice(4, 6), 16);
        return Color.fromRgb(r, g, b);
    }
    static fromRgb(r, g, b) {
        const normR = r / 255;
        const normG = g / 255;
        const normB = b / 255;

        const max = Math.max(normR, normG, normB);
        const min = Math.min(normR, normG, normB);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case normR: h = (normG - normB) / d + (normG < normB ? 6 : 0); break;
                case normG: h = (normB - normR) / d + 2; break;
                case normB: h = (normR - normG) / d + 4; break;
            }
            h /= 6;
        }

        return new Color(h * 360, s * 100, l * 100);
    }
    static fromRgbString(rgbString) {
        // Regular expression to strip away characters and pluck the numbers
        const match = rgbString.match(/\d+/g);
        if (!match || match.length < 3) return new Color(0, 0, 0);

        const [r, g, b] = match.map(Number);
        return Color.fromRgb(r, g, b);
    }

    toRgb() {
        if (this._rgbCache !== null) {
            return this._rgbCache;
        }

        const s = this.s / 100;
        const l = this.l / 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((this.h / 60) % 2) - 1));
        const m = l - c / 2;

        let r = 0, g = 0, b = 0;

        if (0 <= this.h && this.h < 60) { r = c; g = x; b = 0; }
        else if (60 <= this.h && this.h < 120) { r = x; g = c; b = 0; }
        else if (120 <= this.h && this.h < 180) { r = 0; g = c; b = x; }
        else if (180 <= this.h && this.h < 240) { r = 0; g = x; b = c; }
        else if (240 <= this.h && this.h < 300) { r = x; g = 0; b = c; }
        else if (300 <= this.h && this.h <= 360) { r = c; g = 0; b = x; }

        this._rgbCache = {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        };
        return this._rgbCache;
    }
    toRgbString() {
        const { r, g, b } = this.toRgb();
        return `rgb(${r}, ${g}, ${b})`;
    }

    toHex() {
        if (this._hexCache !== null) {
            return this._hexCache;
        }

        const { r, g, b } = this.toRgb();
        const toHexByte = (val) => val.toString(16).padStart(2, "0");

        this._hexCache = `${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
        return this._hexCache;
    }
    toHexString() {
        return `#${this.toHex()}`;
    }

    toHslString() {
        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    }

    get contrastColor() {
        if (this._contrastCache !== null) {
            return this._contrastCache;
        }

        const { r, g, b } = this.toRgb();

        let sR = r / 255, sG = g / 255, sB = b / 255;
        sR = (sR <= 0.03928) ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
        sG = (sG <= 0.03928) ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
        sB = (sB <= 0.03928) ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

        const luminance = 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;

        this._contrastCache = (luminance > 0.179) ? "#000000" : "#ffffff";
        return this._contrastCache;
    }
}