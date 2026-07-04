import { createHSLString, createHSLColorsFromHues, convertFromHEXToHSL } from "./utils/colorUtils.js";
import { createColorDiv, createMultipleColorDivs, appendColorDiv, appendMultipleColorDivs, clearColorContainer } from "./utils/domUtils.js";
import { createAdjacentColorHues } from "./algorithms/adjacentColors.js";
import { createOppositeColorHue, createMultipleOppositeColorHues } from "./algorithms/complementaryColors.js";
import { createSplitComplementaryColorHues } from "./algorithms/splitComplementaryColors.js";
import { createTriadicColors } from "./algorithms/triadicColors.js";
import { createTetradicColors } from "./algorithms/tetradicColors.js";
import { createColorShades, createColorTints, createMonochromaticVariants } from "./algorithms/colorLightnessVariations.js";
import { createColorTones } from "./algorithms/colorSaturationVariations.js";
import { loadDatabase, getClosestColorName } from "./utils/dataUtils.js";

// const adjacentColorsTest = createAdjacentColorHues(0, 3, 15)
// appendMultipleColorDivs(createMultipleColorDivs(createHSLColorsFromHues(adjacentColorsTest, 100, 50)));

// const oppositeColorsTest = createMultipleOppositeColorHues(adjacentColorsTest);
// appendMultipleColorDivs(createMultipleColorDivs(createHSLColorsFromHues(oppositeColorsTest, 100, 50)));

// const splitComplementaryTest = createSplitComplementaryColorHues(0, 5, 15);
// console.log(splitComplementaryTest)
// appendMultipleColorDivs(createMultipleColorDivs(createHSLColorsFromHues(splitComplementaryTest, 100, 50)));

// const shadesTest = createColorShades(120, 80, 60);
// console.log(shadesTest)
// appendMultipleColorDivs(createMultipleColorDivs(shadesTest));

// const tintsTest = createColorTints(230, 80, 30);
// console.log(tintsTest)
// appendMultipleColorDivs(createMultipleColorDivs(tintsTest));

// const monochromaticTest = createMonochromaticVariants(170, 100, 50, 9, 10);
// console.log(monochromaticTest);
// appendMultipleColorDivs(createMultipleColorDivs(monochromaticTest));

// const tonesTest = createColorTones(240, 50, 50, 10, 10);
// console.log(tonesTest);
// appendMultipleColorDivs(createMultipleColorDivs(tonesTest));

// appendColorDiv(createColorDiv(createHSLString(0, 100, 50)));
// appendColorDiv(createColorDiv(createHSLString(30, 100, 50)));
// appendColorDiv(createColorDiv(createHSLString(60, 100, 50)));
// appendColorDiv(createColorDiv(createHSLString(90, 100, 50)));
// clearColorContainer()

async function init() {
    await loadDatabase(); // Sets up the internal database state inside the module
    startApp();
}

function startApp() {
    // 🌟 Zero variables passed! It just works.
    const name = getClosestColorName("feb341");
    console.log(name);
}

init();

