// utils/domUtils.js

/** Creates a single styled color swatch element */
export function createColorDiv(colorInstance, colorName) {
    const div = document.createElement("div");
    div.classList.add("color-swatch");
    div.style.backgroundColor = colorInstance.toHslString();

    const label = document.createElement("span");
    label.innerText = `${colorName} (${colorInstance.toHexString()})`;
    label.style.color = colorInstance.contrastColor;

    div.appendChild(label);
    return div;
}

/** Clears a specific container and paints its unique array of Color objects */
export function renderPaletteInContainer(colorsArray, containerElement) {
    if (!containerElement) return;

    // Clear out only this specific section's old swatches
    containerElement.innerHTML = "";

    colorsArray.forEach((color) => {
        const swatch = createColorDiv(color);
        containerElement.appendChild(swatch);
    });
}