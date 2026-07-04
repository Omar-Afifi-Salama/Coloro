import { Color } from "../models/Color.js";

/**
 * Generates a 4-color Tetradic (Double-Complementary) color palette.
 * @param {Color} baseColor - An instance of your Color class.
 * @param {number} angle - The separation angle between the two pairs (typically 30°, 60°, or 90° for a perfect square).
 * @returns {Color[]} An array of 4 Color objects sorted chronologically by hue.
 */
export function createTetradicColors(baseColor, angle = 60) {
    // 1. Calculate the 4 harmonic hue points mathematically
    const hue1 = baseColor.h;
    const hue2 = (baseColor.h + angle + 360) % 360;
    const hue3 = (baseColor.h + 180) % 360;
    const hue4 = (baseColor.h + angle + 180 + 360) % 360;

    // 2. Instantiate them as proper Color objects (inheriting base saturation & lightness)
    const c1 = baseColor;
    const c2 = new Color(hue2, baseColor.s, baseColor.l);
    const c3 = new Color(hue3, baseColor.s, baseColor.l);
    const c4 = new Color(hue4, baseColor.s, baseColor.l);

    const palette = [c1, c2, c3, c4];

    // 3. 🌟 Sort chronologically by hue degree (0 to 360) so they render beautifully in order
    palette.sort((colorA, colorB) => colorA.h - colorB.h);

    return palette;
}