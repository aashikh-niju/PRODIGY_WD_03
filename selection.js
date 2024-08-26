document.addEventListener("DOMContentLoaded", () => {
    // Event listeners for game mode selection
    document.querySelector("#one-vs-one").addEventListener("click", () => {
        localStorage.setItem("gameMode", "1vs1");
        document.querySelector("#symbol-selection").style.display = "block";
    });

    document.querySelector("#one-vs-ai").addEventListener("click", () => {
        localStorage.setItem("gameMode", "1vsAI");
        document.querySelector("#symbol-selection").style.display = "block";
    });

    // Event listeners for symbol selection
    document.querySelector("#choose-x").addEventListener("click", () => {
        localStorage.setItem("playerSymbol", "X");
        localStorage.setItem("aiSymbol", "O");
        window.location.href = "game.html";
    });

    document.querySelector("#choose-o").addEventListener("click", () => {
        localStorage.setItem("playerSymbol", "O");
        localStorage.setItem("aiSymbol", "X");
        window.location.href = "game.html";
    });
});
