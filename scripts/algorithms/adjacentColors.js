// aka analogous colors
export function createAdjacentColorHues(baseHue, numberOfColors, angleBetweenColors) {
    numberOfColors = numberOfColors || 5;
    angleBetweenColors = angleBetweenColors || 15;

    const intervals = numberOfColors - 1;

    if (intervals * angleBetweenColors >= 360) {
        angleBetweenColors = 360 / numberOfColors;
        console.warn(`Angles exceed 360°. Adjusting angle to fit perfectly.\nNew Angle Between Colors ≈ ${Math.round(angleBetweenColors)}°`);
    }

    const colors = [];

    const numberOfColorsBehindBase = Math.floor((numberOfColors - 1) / 2);

    let offset = -1 * numberOfColorsBehindBase * angleBetweenColors + baseHue;

    for (let i = 0; i < numberOfColors; i++) {
        colors.push((offset + 360) % 360);
        offset += angleBetweenColors;
    }

    return colors;
}