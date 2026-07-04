export function createTriadicColors(baseHue) {
    return [baseHue % 360, (baseHue + 120) % 360, (baseHue + 240) % 360];
}