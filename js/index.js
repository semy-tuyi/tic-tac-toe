const x_class ='x';
const circle_class = 'circle';
let circleTurn;
const WINNING_cOMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const resultShow=document.getElementById('winning-show');
const winningMessage =document.getElementById('win');
const restartButton = document.getElementById('restart');


restartButton.addEventListener('click',startGame)
startGame();
// start game
function startGame(){
    circleTurn=false;
    cellElements.forEach(cell =>{
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{once:true});
    })
    setBoardHoverClass();
    resultShow.classList.remove('show');
}

// handle a Click function 
function handleClick(e){
    const cell =e.target;
    const currentClass = circleTurn?circle_class:x_class;
    placeMark(cell,currentClass);
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns();
        setBoardHoverClass();
    }
}

// place Mark on board
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

// swicht turns
function swapTurns(){
    circleTurn =! circleTurn;
}

// hovering effect on board
function setBoardHoverClass(){
    if(circleTurn){
        board.classList.remove(x_class);
        board.classList.add(circle_class);
    }else{
        board.classList.remove(circle_class);
        board.classList.add(x_class);
    }
}

// check for win
function checkWin(currentClass){
    return WINNING_cOMBINATION.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

// check for Draw
function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class);
    })
}

// end the game
function endGame(draw){
    if(draw){
        winningMessage.innerText="Draw! ..";
    }else{
        winningMessage.innerText =`${circleTurn?"O's":"X's"} Won! `;
    }
    resultShow.classList.add('show');

}