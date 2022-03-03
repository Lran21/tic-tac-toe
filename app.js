window.onload = function(){
    setGame();
}

// const gameBoard = (function(){

    
    var board;
    var playerOne = 'X';
    var playerTwo = 'O';
    var currPlayer = playerOne;
    var prevPlayer = '';
    var gameOver = false;
    let moveCounter = 0;


function setGame(){
        board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        //create board array cells
    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            let cell = document.createElement('div');
            cell.id = r.toString() + '-' + c.toString();
            cell.classList.add('cell');
            cell.addEventListener('click', setCell);
            document.getElementById('board').append(cell);
        }
    }
}


let restartBtn = document.querySelector('#restartBtn');
restartBtn.addEventListener('click', function (){
    window.location.reload();
});

    /* Board visualized 
    [0-0][0-1][0-2]
    [1-0][1-1][1-2]
    [2-0][2-1][2-2]
    */

function setCell() {   
    moveCounter++;
    if(gameOver === true){
        return;
        }
    

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if(board[r][c] != ' '){
            return;
        }

        board[r][c] = currPlayer;
        this.innerText = currPlayer;

        if(currPlayer == playerOne){
        currPlayer = playerTwo;
        prevPlayer = playerOne;
        }
        else{
        currPlayer = playerOne;
        prevPlayer = playerTwo;
        }

        //change message to player's turn
        
            if(currPlayer === playerOne){
            setMessage("Player X's Turn");
            }
            else if (currPlayer === playerTwo && gameOver === false) {
            setMessage("Player O's Turn");
            }
            if(moveCounter === 9 && gameOver != true){
            setMessage("It's a TIE. Try again!");
        }

        checkWinner();
}
//checks winner horizontally and vertically
function checkWinner(){
    //horizontal
    for(let r = 0; r < 3; r++){
        if(board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for(let i = 0; i < 3; i++){
                let cell = document.getElementById(r.toString() + "-" + i.toString());
                cell.classList.add('winner');
            }
            gameOver = true;
            setMessage(`Player ${prevPlayer} has won!`);
            return;
        }
    }
    //vertical
    for(let c= 0; c < 3; c++){
        if(board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' '){
            for(let i = 0; i < 3; i++){
                let cell = document.getElementById(i.toString() + "-" + c.toString());
                cell.classList.add('winner');
            }
            gameOver = true;
            setMessage(`Player ${prevPlayer} has won!`);
            return;
        }
    }
    //diagnal 
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' '){
        let cell = document.getElementById("0-0");
        cell.classList.add("winner");
        cell = document.getElementById("1-1");
        cell.classList.add("winner");

        cell = document.getElementById("2-2");
        cell.classList.add("winner");

        gameOver = true;
        setMessage(`Player ${prevPlayer} has won!`);
        return;
    }
    //diagnal
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' '){
        let cell = document.getElementById("0-2");
        cell.classList.add("winner");
        cell = document.getElementById("1-1");
        cell.classList.add("winner");

        cell = document.getElementById("2-0");
        cell.classList.add("winner");

        gameOver = true;
        setMessage(`Player ${currPlayer} has won!`);
        return;
    }


}

function setMessage(msg){
    document.getElementById('message').innerText = msg;
}




// });