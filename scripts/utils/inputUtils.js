import { Color } from "../models/Color.js";

/**
 * Takes a mystery string and intelligently returns a Color instance,
 * or null if it cannot figure it out.
 */
export function parseSmartInput(value) {
    const clean = value.trim().toLowerCase();

    // 1. Is it a Hex code? (e.g., #ff0000, ff0000, #f00)
    // Hex strings are usually just letters/numbers, optionally starting with '#'
    if (clean.startsWith("#") || (/^[0-9a-f]{3,6}$/i.test(clean))) {
        try {
            return Color.fromHex(clean);
        } catch (e) { return null; }
    }

    // 2. Is it an RGB functional string? (e.g., rgb(255, 0, 0))
    if (clean.startsWith("rgb")) {
        try {
            return Color.fromRgbString(clean);
        } catch (e) { return null; }
    }

    // 3. Is it an HSL string? (e.g., hsl(120, 100%, 50%))
    if (clean.startsWith("hsl")) {
        // We can parse this exactly like you parsed RGB strings!
        const match = clean.match(/-?\d+/g);
        if (match && match.length >= 3) {
            const [h, s, l] = match.map(Number);
            return new Color(h, s, l);
        }
    }

    // If it's none of the above, it's invalid input
    return null;
}