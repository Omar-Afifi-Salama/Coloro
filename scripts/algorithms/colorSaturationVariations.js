import { Color } from "../models/Color.js";

/**
 * Generates a centered range of tones, breaking if saturation goes out of bounds.
 */
export function createColorTones(baseColor, numberOfColors = 5, step = 5) {
    const colors = [];

    const numberOfColorsBehindBase = Math.floor((numberOfColors - 1) / 2);
    let offset = -1 * numberOfColorsBehindBase * step + baseColor.s;

    for (let i = 0; i < numberOfColors; i++) {

        if (offset < 0 || offset > 100) {
            break;
        }

        colors.push(new Color(baseColor.h, offset, baseColor.l));

        offset += step;
    }

    return colors;
}