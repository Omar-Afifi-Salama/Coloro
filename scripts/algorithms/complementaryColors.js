// aka complementary colors
export function createOppositeColorHue(baseHue) {
    return (baseHue + 180) % 360;
}

export function createMultipleOppositeColorHues(huesArray) {
    const oppositeColors = [];
    huesArray.forEach((hue) => {
        oppositeColors.push((hue + 180) % 360);
    });
    return oppositeColors;
}