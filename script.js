function Gameboard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    // Initialise the board with empty values
    for (var i = 0; i < rows; i++) {
        board[i] = [];
        for (var j = 0; j < cols; j++) {
            board[i].push("");
        }
    }

    const getBoard = () => board;
    
    const printBoard = () => {
        console.log(getBoard());
    }

    const updateBoard = (move, symbol) => {
        board[move.row][move.col] = symbol;
    } 

    return { getBoard, printBoard, updateBoard };
}


// function Player(playerSymbol) {
//     let symbol = playerSymbol;
//     const getSymbol = () => symbol;

//     const setSymbol = (newSymbol) => {
//         symbol = newSymbol;
//     }

//     return { getSymbol, setSymbol }
// }


function GameController() {
    const board = Gameboard();

    const players = [
        {
            name: "Player X",
            symbol: "X"
        },
        {
            name: "Player O",
            symbol: "O"
        }
    ];

    let currentPlayer = players[0];

    const switchPlayerTurn = () => {
        return currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    const getCurrentPlayer = () => currentPlayer;

    const isValidMove = (move) => {
        return board.getBoard()[move.row][move.col] === "" ? true : false;
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getCurrentPlayer().name}'s turn.`);
    }

    const printWinner = () => {
        board.printBoard();
        console.log(`Game over. ${getCurrentPlayer().name} won.`);
    }

    const playRound = (row, col) => {
        const move = {
            "row": Number(row), 
            "col": Number(col)
        }
        if (isValidMove(move)) {
            board.updateBoard(move, getCurrentPlayer().symbol);
            if (checkWin(getCurrentPlayer().symbol)) {
                printWinner();
                return 1;
            } else {
                switchPlayerTurn();
                printNewRound();
            }
        } else {
            console.log("Move is invalid, please try again.");
        }
    }

    const checkWin = (symbol) => {
        const currentBoard = board.getBoard();
    
        for (var i = 0; i < currentBoard.length; i++) {
            // Check for 3 in a row
            if (currentBoard[i][0] == symbol 
                && currentBoard[i][1] == symbol 
                && currentBoard[i][2] == symbol) {
                    return true;
                }
            // Check for 3 in a column
            if (currentBoard[0][i] == symbol 
                && currentBoard[1][i] == symbol 
                && currentBoard[2][i] == symbol) {
                    return true;
                }
        }
        // Check for 3 in a diagonal
        if (currentBoard[0][2] == symbol 
            && currentBoard[1][1] == symbol 
            && currentBoard[2][0] == symbol) {
                return true;
            }
        if (currentBoard[0][0] == symbol 
            && currentBoard[1][1] == symbol 
            && currentBoard[2][2] == symbol) {
                return true;
            }

        return false;
    }

    return { playRound, getCurrentPlayer };
}

function ScreenController() {
    const updateScreen = () => {
        // display board
        // display current player
    }

    const clickHandlerBoard = () => {
        // get DOM click event when user plays
        // calls game.playRound
        // calls updateScreen
    }
}

const game = GameController();
// while (1) {
//     var userInput = prompt("Which slot would you like to play? ").split(",");
//     if (game.playRound(userInput[0], userInput[1])) 
//         break;
// } 
