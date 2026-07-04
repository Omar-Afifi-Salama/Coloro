import { Color } from "../models/Color.js";

/**
 * Generates a 3-color Triadic color palette evenly spaced across the color wheel.
 * @param {Color} baseColor - An instance of your Color class.
 * @returns {Color[]} An array of 3 Color objects sorted chronologically by hue.
 */
export function createTriadicColors(baseColor) {
    // 1. Calculate the three equilateral hue points safely
    const hue1 = baseColor.h;
    const hue2 = (baseColor.h + 120 + 360) % 360;
    const hue3 = (baseColor.h + 240 + 360) % 360;

    // 2. Wrap them into full Color instances inheriting S and L values
    const c1 = baseColor;
    const c2 = new Color(hue2, baseColor.s, baseColor.l);
    const c3 = new Color(hue3, baseColor.s, baseColor.l);

    const palette = [c1, c2, c3];

    // 3. Sort them from 0 to 360 degrees using our subtraction trick
    palette.sort((colorA, colorB) => colorA.h - colorB.h);

    return palette;
}