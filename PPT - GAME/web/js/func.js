function isGameOver(healthA, healthB) {
    return (
        healthA > 0 && healthB == 0 ||
        healthA == 0 && healthB > 0 ||
        healthA == 0 && healthB == 0 ||
        healthA < 1 || healthB < 1 ||
        healthA == 0 || healthB == 0
    );
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function showInputs(array) {
    array.forEach((child) => {
        settingsGame = `
        <input type="radio" name="objeto" id="${child.id}" />
        <label class="imagen-ataque" for="${child.id}">
            <p>${child.name}</p>
            <img src="${child.image}" alt="${child.id}">
        </label>
        `;

        inputsDiv.innerHTML += settingsGame;

        inputStone = document.getElementById('stone-radio');
        inputPaper = document.getElementById('paper-radio');
        inputScissor = document.getElementById('scissor-radio');
    });
}
