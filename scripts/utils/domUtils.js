
const colorContainer = document.querySelector("#color-container");

export function createColorDiv(HSLString) {
    const div = document.createElement("div");
    div.classList.add("color");
    div.style.backgroundColor = HSLString;
    return div;
}

export function createMultipleColorDivs(HSLStringArray) {
    const divs = [];
    HSLStringArray.forEach((HSLString) => {
        divs.push(createColorDiv(HSLString));
    });
    return divs;
}

export function appendColorDiv(div) {
    colorContainer.appendChild(div);
}

export function appendMultipleColorDivs(divsArray) {
    divsArray.forEach((div) => {
        colorContainer.appendChild(div);
    })
}

export function clearColorContainer() {
    const colors = colorContainer.children;
    while (colors.length !== 0) {
        colors[0].remove();
    }
    return true;
}