import { Color } from "../models/Color.js";

/**
 * Generates a specific number of darker shades from a base color.
 */
export function createColorShades(baseColor, numberOfShades = 5, step = 10, minimumLightness = 10) {
    const shades = [];

    for (let i = 0; i < numberOfShades; i++) {
        const currentLightness = baseColor.l - (i * step);

        if (currentLightness < minimumLightness) {
            break;
        }

        shades.push(new Color(baseColor.h, baseColor.s, currentLightness));
    }

    return shades;
}

export function createColorTints(baseColor, numberOfTints = 5, step = 10, maximumLightness = 90) {
    const tints = [];

    for (let i = 0; i < numberOfTints; i++) {
        let currentLightness = baseColor.l + (i * step);

        if (currentLightness > maximumLightness) {
            break;
        }

        tints.push(new Color(baseColor.h, baseColor.s, currentLightness));
    }

    return tints;
}

// export function createMonochromaticVariants(baseColor, numberOfTotalColors = 5, step = 10) {
//     const numberOfShades = Math.floor((numberOfTotalColors - 1) / 2);
//     const numberOfTints = numberOfTotalColors - numberOfShades - 1 // subtract one to leave room for the base color

//     const shades = createColorShades(baseColor, numberOfShades, step);
//     const tints = createColorTints(baseColor, numberOfTints, step);

//     return [...shades.reverse(), baseColor, ...tints];
// }


/**
 * Generates an optimized, dynamically balanced monochromatic palette based on the base color's position.
 */
export function createMonochromaticVariants(baseColor, numberOfTotalColors = 5, step = 10) {
    const minL = 10;
    const maxL = 90;

    // 1. Generate all mathematically viable shades going down from the base color
    const availableShades = [];
    let currentShadeL = baseColor.l - step;
    while (currentShadeL >= minL) {
        availableShades.push(new Color(baseColor.h, baseColor.s, currentShadeL));
        currentShadeL -= step;
    }
    // Reverse so they flow numerically from darkest up towards the base color
    availableShades.reverse();

    // 2. Generate all mathematically viable tints going up from the base color
    const availableTints = [];
    let currentTintL = baseColor.l + step;
    while (currentTintL <= maxL) {
        availableTints.push(new Color(baseColor.h, baseColor.s, currentTintL));
        currentTintL += step;
    }

    // 3. Figure out how many items we need to harvest around our base color
    const targetsNeeded = numberOfTotalColors - 1; // leave 1 slot for baseColor
    if (targetsNeeded <= 0) return [baseColor];

    let shadesToTake = 0;
    let tintsToTake = 0;

    // 4. Distribute slots step-by-step based on actual structural availability
    for (let i = 0; i < targetsNeeded; i++) {
        // If we have slots left on both sides, balance it by looking at where the color naturally leans
        if (shadesToTake < availableShades.length && tintsToTake < availableTints.length) {
            if (availableShades.length - shadesToTake > availableTints.length - tintsToTake) {
                shadesToTake++; // Color is bright, it has a longer runway down!
            } else {
                tintsToTake++;  // Color is dark, it has a longer runway up!
            }
        }
        // Fallbacks if one side completely runs out of room
        else if (shadesToTake < availableShades.length) {
            shadesToTake++;
        } else if (tintsToTake < availableTints.length) {
            tintsToTake++;
        }
    }

    // 5. Slice the target pools and construct the final seamless array
    // Slice from the end of the shades array to get the colors closest to the base color
    const finalShades = availableShades.slice(availableShades.length - shadesToTake);
    const finalTints = availableTints.slice(0, tintsToTake);

    return [...finalShades, baseColor, ...finalTints];
}