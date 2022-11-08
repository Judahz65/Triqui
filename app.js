const xClass= 'x';
const circleClass = 'circle';
const COMBINATIONS= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

]
const cellElements= document.querySelectorAll('.cell' );
const winner= document.getElementById('winner');
const ganadorMsj= document.getElementById('ganadorMsj');
const restartButton= document.getElementById('restart');
const board =document.getElementById('board');
let circleTurn;

startGame();
restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn =false;
    cellElements.forEach(cell =>{
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.addEventListener('click', handleClick , {once:true} )
    }   )
    hoverClass();
    ganadorMsj.classList.remove('show');
}


function handleClick(e){
    const cell=e.target;
    const currentClass = circleTurn ? circleClass:xClass;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        nextTurn();
        hoverClass();
    }
}
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function nextTurn(){
    circleTurn =!circleTurn
}

function hoverClass(){
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if(circleTurn){
        board.classList.add(circleClass)
    }else{
        board.classList.add(xClass)
    }
}
function checkWin(currentClass){
    return COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw){
    if(draw){
        winner.innerText='It´s a Draw'
    }else{
        winner.innerText= `${circleTurn ? "O's":"X's"}Wins!`
    }
    ganadorMsj.classList.add('show');
}