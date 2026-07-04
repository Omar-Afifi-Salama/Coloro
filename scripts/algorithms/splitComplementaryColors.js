import { Color } from "../models/Color.js";
import { createAdjacentColors } from "./adjacentColors.js";

/**
 * Generates an extended split-complementary color palette centered around 
 * the base color's geometric complement.
 * * @param {Color} baseColor - The starting core Color instance.
 * @param {number} [numberOfColors=3] - Total number of colors to return in the palette (should be an odd number >= 3).
 * @param {number} [angleBetweenColors=30] - The separation angle in degrees between the fanned-out complement variants.
 * @returns {Color[]} An array of Color objects containing the original base color nestled symmetrically among its split complements.
 */
export function createSplitComplementaryColors(baseColor, numberOfColors = 3, angleBetweenColors = 30) {
    // 2. Create a temporary "virtual" color object at that opposite angle
    // It inherits the base color's saturation and lightness
    const virtualComplement = baseColor.opposite;

    // 3. Let your excellent adjacent function generate the spread around that target
    // For a 3-color split, this will generate 3 colors clustered around the complement.
    const palette = createAdjacentColors(virtualComplement, numberOfColors, angleBetweenColors);

    // 4. Find the middle index of the generated array
    const middleIndex = Math.floor((numberOfColors - 1) / 2);

    // 5. Swap the middle color (which is currently the true opposite hue) 
    // out for your actual base color!
    palette[middleIndex] = baseColor;

    return palette;
}