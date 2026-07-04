import { createAdjacentColorHues } from "./adjacentColors.js";
import { createOppositeColorHue } from "./complementaryColors.js";

export function createSplitComplementaryColorHues(baseHue, numberOfColors, angleBetweenColors) {
    const oppositeBaseHue = createOppositeColorHue(baseHue);
    const colorsArray = createAdjacentColorHues(oppositeBaseHue);
    colorsArray[Math.floor((numberOfColors - 1) / 2)] = baseHue;
    return colorsArray;
}