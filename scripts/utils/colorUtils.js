export function createHSLString(hue, saturation, lightness) {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function createHSLColorsFromHues(huesArray, saturation, lightness) {
    const colors = [];
    huesArray.forEach((hue) => {
        colors.push(createHSLString(hue, saturation, lightness))
    });
    return colors;
}

export function convertFromHEXToHSL(HEXString) {
    // Convert hex to RGB first
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

export function hexToRgb(hex) {
    const cleanHex = hex.replace("#", "");
    return {
        r: parseInt(cleanHex.slice(0, 2), 16),
        g: parseInt(cleanHex.slice(2, 4), 16),
        b: parseInt(cleanHex.slice(4, 6), 16)
    };
}

export function getContrastColor(hex) {
    const { r, g, b } = hexToRgb(hex);

    // 2. Convert RGB to a 0.0 - 1.0 scale
    let sR = r / 255;
    let sG = g / 255;
    let sB = b / 255;

    // 3. Apply the W3C Gamma Correction formula
    sR = (sR <= 0.03928) ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
    sG = (sG <= 0.03928) ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
    sB = (sB <= 0.03928) ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

    // 4. Calculate Relative Luminance using human-eye perception weights
    // Notice how Green (0.7152) dominates the perceived brightness!
    const luminance = 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;

    // 5. The WCAG Midpoint threshold is 0.179. 
    // If the color is brighter than this, use black text. Otherwise, use white text.
    return (luminance > 0.179) ? "#000000" : "#ffffff";
}