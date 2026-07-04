// models imports
import { Color } from "./models/Color.js";

// algorithm imports
import { createAdjacentColors } from "./algorithms/adjacentColors.js";
import { createSplitComplementaryColors } from "./algorithms/splitComplementaryColors.js";
import { createTriadicColors } from "./algorithms/triadicColors.js";
import { createTetradicColors } from "./algorithms/tetradicColors.js";
import { createColorShades, createColorTints, createMonochromaticVariants } from "./algorithms/colorLightnessVariations.js";
import { createColorTones } from "./algorithms/colorSaturationVariations.js";

// utils imports
import { createColorDiv } from "./utils/domUtils.js";
import { loadDatabase, getClosestColorName } from "./utils/dataUtils.js";
import { parseSmartInput } from "./utils/inputUtils.js";

// 1. Grab Input DOM Nodes
const colorPicker = document.getElementById("color-picker");
const smartInput = document.getElementById("smart-color-input");
const countInput = document.getElementById("number-of-colors");
const messageBox = document.getElementById("message-box");

// 2. Map all the separate HTML containers
const containers = {
    adjacent: document.getElementById("adjacent-container"),
    split: document.getElementById("split-complementary-container"),
    triadic: document.getElementById("triadic-container"),
    tetradic: document.getElementById("tetradic-container"),
    mono: document.getElementById("monochromatic-container")
};

// Application Bootstrapper
async function init() {
    try {
        await loadDatabase(); // Wait for JSON data to fetch completely
        startApp();
    } catch (error) {
        console.error("Failed to initialize color naming database:", error);
    }
}

function startApp() {
    // Core Orchestration Loop
    function updateDashboard() {
        // Find our base color from either the text box or visual picker safely
        const rawValue = smartInput.value.trim() || colorPicker.value;
        let baseColor;

        if (rawValue !== "") {
            baseColor = parseSmartInput(rawValue);
        }

        if (!baseColor) return;

        // Sync inputs visually
        colorPicker.value = baseColor.toHexString();
        if (document.activeElement !== smartInput) {
            smartInput.value = baseColor.toHexString();
        }

        if (baseColor.l >= 95) {
            messageBox.textContent = "Warning: High Lightness. Generated palettes will appear mostly white.";
        } else if (baseColor.l <= 5) {
            messageBox.textContent = "Warning: Low Lightness. Generated palettes will appear mostly black.";
        } else {
            messageBox.textContent = "";
        }

        if (baseColor.s === 0) {
            baseColor = new Color(baseColor.h, 5, baseColor.l);
        }

        // Get dynamic count spacing
        const numColors = parseInt(countInput.value, 10) || 5;

        // Calculate all algorithmic palettes
        const palettes = {
            adjacent: createAdjacentColors(baseColor, numColors),
            split: createSplitComplementaryColors(baseColor, numColors),
            triadic: createTriadicColors(baseColor),
            tetradic: createTetradicColors(baseColor),
            mono: createMonochromaticVariants(baseColor, numColors)
        };

        // Render each collection out into the DOM with database names mapped
        Object.keys(containers).forEach((key) => {
            const container = containers[key];
            const colorArray = palettes[key];

            if (!container || !colorArray) return;

            // Clear out old elements
            container.innerHTML = "";

            // Build fresh swatches with dynamic structural names
            colorArray.forEach((colorInstance) => {
                // Look up name by converting HSL to RGB internal coordinates safely
                const colorName = getClosestColorName(colorInstance);

                // Build element card and append
                const swatchDiv = createColorDiv(colorInstance, colorName);
                container.appendChild(swatchDiv);
            });
        });
    }

    // Register Event Listeners
    colorPicker.addEventListener("change", () => {
        smartInput.value = colorPicker.value;
        updateDashboard();
    });

    smartInput.addEventListener("change", updateDashboard);
    countInput.addEventListener("change", updateDashboard);

    // Initial paint run
    updateDashboard();
}

init();