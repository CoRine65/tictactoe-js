// GameBoard Module: IFFE: calls itself right at the end
const GameBoard = ( function (){
// this encapsulates logic
    const board = ['', '', '', '', '', '', '', '', '']
    const boardContainer = document.getElementById('gameboard');

    //displaying the board:
    function renderBoard (){
        boardContainer.innerHTML = '' //clears the board and we start fresh

        board.forEach((value, index) =>{ //looping through each ceel in the board
            const cell = document.createElement("div"); //this creates the individual cell?
            cell.classList.add('cell');
            cell.textContent = value;

            //adding an data-index to indetify the cell later
            cell.dataset.index = index

            //add event listener here

            boardContainer.appendChild(cell)
        });
    }
    return {
        renderBoard,
    };
})();
GameBoard.renderBoard();


