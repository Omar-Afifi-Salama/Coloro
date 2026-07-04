import { Color } from "../models/Color.js";
import { hexToRgb } from "./colorUtils.js";

let colorDB = null;
let hexKeys = null;

export async function loadDatabase() {
    const response = await fetch("./scripts/data/colornames.min.json");
    colorDB = await response.json();
    hexKeys = Object.keys(colorDB);
    return colorDB; // Optional, just in case
}

export function getClosestColorName(color) {

    if (!colorDB) {
        console.warn("Database not loaded yet!");
        return "Unknown Color";
    }

    const targetRgb = color.toRgb();

    let closestName = null;
    let minDistanceSq = Infinity;

    for (let i = 0; i < hexKeys.length; i++) {
        const currentHex = hexKeys[i];
        const currentRgb = hexToRgb(currentHex);

        const distanceSq =
            Math.pow(targetRgb.r - currentRgb.r, 2) +
            Math.pow(targetRgb.g - currentRgb.g, 2) +
            Math.pow(targetRgb.b - currentRgb.b, 2);

        if (distanceSq < minDistanceSq) {
            minDistanceSq = distanceSq;
            closestName = colorDB[currentHex];
        }
    }

    return closestName;
}