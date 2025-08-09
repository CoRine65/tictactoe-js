const GameBoard = (function () {
    const board = ['', '', '', '', '', '', '', '', ''];
    const boardContainer = document.getElementById('gameboard');
    const restartBtn = document.getElementById('restartBtn');
    const winningCombinations = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    let gameOver = false;
    let gameActive = false;

    let player1 = { name: "Player 1", marker: "X" };
    let player2 = { name: "Player 2", marker: "O" };
    let currentPlayer = player1;

    const gameMessage = document.getElementById("game-message");
    const startButton = document.getElementById("start-game");

    startButton.addEventListener("click", () => {
        const p1Name = document.getElementById("player1-name").value.trim();
        const p2Name = document.getElementById("player2-name").value.trim();

        player1.name = p1Name || "Player 1";
        player2.name = p2Name || "Player 2";

        resetBoard();
        currentPlayer = player1;
        gameOver = false;
        gameActive = true;
        gameMessage.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
    });

    function renderBoard() {
        boardContainer.innerHTML = '';

        board.forEach((value, index) => {
            const cell = document.createElement("div");
            cell.classList.add('cell');
            cell.textContent = value;
            cell.dataset.index = index;

            cell.classList.remove('x', 'o');
            if (value === 'X') cell.classList.add('x');
            if (value === 'O') cell.classList.add('o');

            cell.addEventListener('click', () => {
                if (!gameOver && gameActive && board[index] === '') {
                    board[index] = currentPlayer.marker;

                    if (checkWin(currentPlayer.marker)) {
                        gameOver = true;
                        gameMessage.textContent = `${currentPlayer.name} wins!`;
                    } else if (checkDraw()) {
                        gameOver = true;
                        gameMessage.textContent = `It's a draw!`;
                    } else {
                        switchPlayer();
                        gameMessage.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
                    }
                    renderBoard();
                }
            });

            boardContainer.appendChild(cell);
        });
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    restartBtn.addEventListener('click', () => {
        resetBoard();
        currentPlayer = player1;
        gameOver = false;
        gameActive = true;
        gameMessage.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
    });

    function resetBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        renderBoard();
    }

    function checkWin(player) {
        return winningCombinations.some(combo => {
            return combo.every(index => board[index] === player);
        });
    }

    function checkDraw() {
        return board.every(cell => cell !== '');
    }

    return { renderBoard };
})();
GameBoard.renderBoard();
