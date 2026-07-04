import { createHSLString } from "../utils/colorUtils.js";

/**
 * Generates a specific number of darker shades from a base color.
 */
export function createColorShades(baseHue, baseSaturation, baseLightness, numberOfShades = 5, step = 10, minimumLightness = 10) {
    const shades = [];

    for (let i = 0; i < numberOfShades; i++) {
        let currentLightness = baseLightness - (i * step);

        if (currentLightness < minimumLightness) {
            break;
        }

        shades.push(createHSLString(baseHue, baseSaturation, currentLightness));
    }

    return shades;
}

export function createColorTints(baseHue, baseSaturation, baseLightness, numberOfTints = 5, step = 10, maximumLightness = 90) {
    const tints = [];

    for (let i = 0; i < numberOfTints; i++) {
        let currentLightness = baseLightness + (i * step);

        if (currentLightness > maximumLightness) {
            break;
        }

        tints.push(createHSLString(baseHue, baseSaturation, currentLightness));
    }

    return tints;
}

export function createMonochromaticVariants(baseHue, baseSaturation, baseLightness, numberOfTotalColors = 5, step = 10) {
    const numberOfShades = Math.floor((numberOfTotalColors - 1) / 2);
    const numberOfTints = numberOfTotalColors - numberOfShades - 1 // subtract one to leave room for the base color

    const shades = createColorShades(baseHue, baseSaturation, baseLightness, numberOfShades, step);
    const baseColor = createHSLString(baseHue, baseSaturation, baseLightness);
    const tints = createColorTints(baseHue, baseSaturation, baseLightness, numberOfTints, step);

    return [...shades.reverse(), baseColor, ...tints];
}