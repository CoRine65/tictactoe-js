// GameBoard Module: IFFE: calls itself right at the end
const GameBoard = ( function (){
// this encapsulates logic
    const board = ['', '', '', '', '', '', '', '', '']
    const boardContainer = document.getElementById('gameboard');
    let currentPlayer = 'X'; //tracking current player
    const restartBtn = document.getElementById('restartBtn');

    //displaying the board:
    function renderBoard (){
        boardContainer.innerHTML = '' //clears the board and we start fresh

        board.forEach((value, index) =>{ //looping through each ceel in the board
            const cell = document.createElement("div"); //this creates the individual cell?
            cell.classList.add('cell');
            cell.textContent = value;
            //adding an data-index to indetify the cell later
            cell.dataset.index = index

            cell.classList.remove('x', 'o');
            if (value === 'X') cell.classList.add('x');
            if (value === 'O') cell.classList.add('o');

            //add event listener here
            cell.addEventListener('click', () => {
                //only allowing the move if the cell is empty
                if (board[index] === ''){
                    board[index] = currentPlayer; //updating 
                    renderBoard();
                    switchPlayer();
                }
            });

            boardContainer.appendChild(cell)
        });
    }

    function switchPlayer(){
        currentPlayer = currentPlayer === 'X' ? 'O': 'X';
    }

    restartBtn.addEventListener('click', () => {
        //reset board array
        for (let i = 0; i < board.length; i++){
            board[i] = '';
        }
        currentPlayer = 'X';
        renderBoard();
    });

    return {
        renderBoard,
    };
})();
GameBoard.renderBoard();


