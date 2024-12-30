
let board, turn, winner, tie;

const squareEls = document.querySelectorAll('.square');
const messageEl = document.querySelector('.game-message');
const resetBtnEl = document.getElementById('reset');


const winningCombos = 
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function init() 
{
    console.log('Initializing game...');
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

function render() 
{
    updateBoard();
    updateMessage();
}

function updateBoard() 
{
    board.forEach((cell, index) => 
    {
        squareEls[index].textContent = cell;
    });
}

function updateMessage() 
{
    if (winner) {
        messageEl.textContent = `Player ${turn} wins!`;
        document.body.style.background = "#ff9b9b";  
    } else if (tie) {
        messageEl.textContent = "It's a tie!";
        document.body.style.background = "#fbc2eb"; 
    } else {
        messageEl.textContent = `Player ${turn}'s turn.`;
    }
}


function handleClick(event) 
{
    const squareIndex = parseInt(event.target.id);

    if (board[squareIndex] || winner) return;

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index)
{
    board[index] = turn;
    console.log(board);
}

function checkForWinner() 
{
    winner = winningCombos.some(combo =>
        board[combo[0]] &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[0]] === board[combo[2]]
    );
}

function checkForTie() 
{
    if (winner) return;
    tie = !board.includes('');
}

// Switch player turn
function switchPlayerTurn()
{
    if (winner) return;

    turn = turn === 'X' ? 'O' : 'X';
}

squareEls.forEach(square => 
{
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);



init();

  
  