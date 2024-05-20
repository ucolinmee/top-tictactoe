function Gameboard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    // Initialise the board with empty values
    const resetBoard = () => {
        for (var i = 0; i < rows; i++) {
            board[i] = [];
            for (var j = 0; j < cols; j++) {
                board[i].push("");
            }
        }
    }
    
    const getBoard = () => board;

    const updateBoard = (move, symbol) => {
        board[move.row][move.col] = symbol;
    } 

    resetBoard();

    return { getBoard, updateBoard, resetBoard };
}


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

    const playRound = (row, col) => {
        const move = {
            "row": Number(row), 
            "col": Number(col)
        }
        const currentPlayer = getCurrentPlayer();
        if (isValidMove(move)) {
            board.updateBoard(move, currentPlayer.symbol);
            if (checkWin(currentPlayer.symbol)) {
                return currentPlayer;
            } else {
                switchPlayerTurn();
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

    return { 
        playRound, 
        getCurrentPlayer, 
        getBoard: board.getBoard, 
        resetBoard: board.resetBoard 
    };
}

function ScreenController() {
    const game = GameController();
    const boardDiv = document.querySelector(".board");
    const currentPlayerDiv = document.querySelector(".turn");
    const playAgainBtn = document.querySelector("button");

    const displayBoard = () => {
        boardDiv.innerHTML = "";
        var board = game.getBoard();
        
        for (var i = 0; i <  board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                var temp = document.createElement("div");
                temp.setAttribute("id", `${i},${j}`);
                const cellContent = board[i][j];
                temp.textContent = cellContent;
                boardDiv.appendChild(temp);
            }
        }
    }

    const displayText = (text) => {
        currentPlayerDiv.textContent = text;
    }

    const updateScreen = () => {
        displayBoard();

        // display current player's turn
        displayText(`${game.getCurrentPlayer().name}'s turn`);
    }

    const checkGameStatus = (winner) => {
        if (winner !== undefined) {
            displayText(`Game Over! ${winner.name} won.`);
            gameOver();
        } else {
            var fullBoard = true;
            const currentBoard = game.getBoard();
            for (var i = 0; i < currentBoard.length; i++) {
                for (var j = 0; j < currentBoard[i].length; j++) {
                    if (currentBoard[i][j] === "")
                        fullBoard = false;
                }
            }

            if (fullBoard) {
                displayText(`Draw. Nobody wins.`);
                gameOver();
            }
        }
    }

    const gameOver = () => {
        playAgainBtn.classList.toggle("hidden");
        boardDiv.removeEventListener("click", clickBoardHandler);
    }

    const clickBoardHandler = (e) => {
        var move = e.target.id.split(",");
        var winner = game.playRound(move[0], move[1]);
        updateScreen();
        checkGameStatus(winner);
    }

    const playAgainClickHandler = () => {
        game.resetBoard();
        playAgainBtn.classList.toggle("hidden");
        init();
    }

    const init = () => {
        // Initial render 
        updateScreen();

        boardDiv.addEventListener("click", clickBoardHandler);
    }

    init();
    playAgainBtn.addEventListener("click", playAgainClickHandler);
    
}

ScreenController();