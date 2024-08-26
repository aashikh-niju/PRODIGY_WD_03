document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let turn = localStorage.getItem("playerSymbol") || "X";
    let aiTurn = localStorage.getItem("aiSymbol") || "O";
    let isGameOver = false;
    let gameMode = localStorage.getItem("gameMode") || "1vs1";

    function startGame() {
        boxes.forEach(e => {
            e.innerHTML = "";
            e.addEventListener("click", () => {
                if (!isGameOver && e.innerHTML === "") {
                    if (gameMode === "1vs1") {
                        handlePlayerMove(e);
                    } else if (gameMode === "1vsAI") {
                        if (turn === localStorage.getItem("playerSymbol")) {
                            handlePlayerMove(e);
                            if (!isGameOver) {
                                setTimeout(aiMove, 500); // Delayed AI move for realism
                            }
                        }
                    }
                }
            });
        });
    }

    function handlePlayerMove(box) {
        box.innerHTML = turn;
        checkWin();
        if (!isGameOver) {
            checkDraw();
            changeTurn();
        }
    }

    function changeTurn() {
        turn = turn === "X" ? "O" : "X";
        document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        winConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
                isGameOver = true;
                document.querySelector("#results").innerHTML = turn + " wins";
                document.querySelector("#play-again").style.display = "inline";
                highlightWinningCombination(condition);
            }
        });
    }

    function highlightWinningCombination(indices) {
        indices.forEach(index => {
            boxes[index].style.backgroundColor = "#08D9D6";
            boxes[index].style.color = "#000";
        });
    }

    function checkDraw() {
        if (!isGameOver && Array.from(boxes).every(box => box.innerHTML !== "")) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }

    function aiMove() {
        let bestMove;
        let bestScore = -Infinity;

        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].innerHTML === "") {
                boxes[i].innerHTML = aiTurn;
                let score = minimax(Array.from(boxes).map(box => box.innerHTML), 0, false);
                boxes[i].innerHTML = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        if (bestMove !== undefined) {
            boxes[bestMove].innerHTML = aiTurn;
            checkWin();
            if (!isGameOver) {
                checkDraw();
                changeTurn();
            }
        }
    }

    function minimax(board, depth, isMaximizing) {
        let result = evaluate(board);
        if (result !== null) {
            if (result === "X") return -10;
            else if (result === "O") return 10;
            else return 0; // tie
        }
    
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "O"; // AI's turn
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "X"; // Player's turn
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
    

    function evaluate(board) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes("") ? null : "tie";
    }

    document.querySelector("#play-again").addEventListener("click", () => {
        isGameOver = false;
        turn = localStorage.getItem("playerSymbol") || "X";
        aiTurn = localStorage.getItem("aiSymbol") || "O";
        document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
        document.querySelector("#results").innerHTML = "";
        document.querySelector("#play-again").style.display = "none";

        boxes.forEach(e => {
            e.innerHTML = "";
            e.style.removeProperty("background-color");
            e.style.color = "#fff";
        });

        startGame();
    });

    startGame();
});