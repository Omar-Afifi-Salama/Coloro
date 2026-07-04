import { Color } from "../models/Color.js";

// aka analogous colors
export function createAdjacentColors(baseColor, numberOfColors, angleBetweenColors) {
    numberOfColors = numberOfColors || 5;
    angleBetweenColors = angleBetweenColors || 15;

    const intervals = numberOfColors - 1;

    if (intervals * angleBetweenColors >= 360) {
        angleBetweenColors = 360 / numberOfColors;
        console.warn(`Angles exceed 360°. Adjusting angle to fit perfectly.\nNew Angle Between Colors ≈ ${Math.round(angleBetweenColors)}°`);
    }

    const colors = [];

    const numberOfColorsBehindBase = Math.floor((numberOfColors - 1) / 2);

    let offset = -1 * numberOfColorsBehindBase * angleBetweenColors + baseColor.h;

    for (let i = 0; i < numberOfColors; i++) {
        colors.push(new Color(((offset + 360) % 360), baseColor.s, baseColor.l));
        offset += angleBetweenColors;
    }

    return colors;
}