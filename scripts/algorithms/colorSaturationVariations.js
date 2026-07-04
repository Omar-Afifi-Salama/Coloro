import { createHSLString } from "../utils/colorUtils.js";

/**
 * Generates a centered range of tones, breaking if saturation goes out of bounds.
 */
export function createColorTones(baseHue, baseSaturation, baseLightness, numberOfColors = 5, step = 5) {
    const colors = [];

    const numberOfColorsBehindBase = Math.floor((numberOfColors - 1) / 2);
    let offset = -1 * numberOfColorsBehindBase * step + baseSaturation;

    for (let i = 0; i < numberOfColors; i++) {

        if (offset < 0 || offset > 100) {
            break;
        }

        colors.push(createHSLString(baseHue, offset, baseLightness));

        offset += step;
    }

    return colors;
}