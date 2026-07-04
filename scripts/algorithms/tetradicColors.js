import { createOppositeColorHue } from "./complementaryColors.js";

export function createTetradicColors(baseHue, angle) {
    const oppositeBaseHue = createOppositeColorHue(baseHue);

    const secondHue = (baseHue + angle) % 360;
    const oppositeSecondHue = createOppositeColorHue(secondHue);

    return [baseHue, secondHue, oppositeBaseHue, oppositeSecondHue];
}