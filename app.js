// NO.3 two players 

// while (!player1){
//     var player1 = prompt('Player One: Enter your name. You will be red.');
// };
const player1 = 'Player RED';
const player2 = 'Player YELLOW'
var player1Color = 'red';//给与玩家一个颜色，this color can be regnoized 

// while (!player2){
//     var player2 = prompt('Player Two: Enter your name. You will be yellow.');
// };
var player2Color = 'yellow';

// NO.1 Selectors


const tableRow = document.getElementsByTagName('tr');//all row
const tableData = document.getElementsByTagName('td');//all cell
let playerTurn = document.querySelector('.player-turn');
const slots = document.querySelectorAll('.slot');// same as all cell
const resetBtn = document.querySelector('.reset');


// NO.4 
let currentPlayer = 1; // at begining, let player1 play,这是后台的标记玩家

playerTurn.textContent = `${player1} GOGOGO!!` // this ref. to  <h3 class="player-turn"></h3> in HTML，这是前台标记的turn
playerTurn.style.color = 'red';

//NO.2  Log cell coordinates when clicked, this code is to make sure it's clicking 

// for (i = 0; i < tableData.length; i ++){//遍历全部cells
//     tableData[i].addEventListener('click', (e) =>{
//         console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`); //rowIndex确定第几row，cellIndex确定第几个
//     });//e.target use to "select" this line in html
// };


// No.6 - Change color when clicked

function changeColor(e){
    // Get clicked column index
    let column = e.target.cellIndex;// get the column of that cell(e)
    let row = [];

    for (let i = 5; i > -1; i--){ // check from the box row (no.5) back to top row (no. 0), this is to make color drop from bottom
        if (tableRow[i].children[column].style.backgroundColor == 'white'){ // tableRow is collection of all rows. if this cell in this row is white
            row.push(tableRow[i].children[column]);//push that cell in that row
            if (currentPlayer === 1){
                console.log(row);
                row[0].style.backgroundColor = 'red';//if currentPlayer is 1, change that cell color to red
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player1} WINS!!`;// when wins, change playerTurn text
                    playerTurn.style.color = player1Color;
                    return alert(`${player1} WINS!!`);
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    playerTurn.style.color = 'gray';
                    return alert('DRAW!');
                }else{
                    playerTurn.textContent = `${player2}'s turn`;
                    playerTurn.style.color = 'yellow';
                    return currentPlayer = 2;
                }
            }else{
                row[0].style.backgroundColor = 'yellow';
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player2} WINS!!`;
                    playerTurn.style.color = player2Color;
                    return alert(`${player2} WINS!!`);
                }else if (drawCheck()){
                    playerTurn.textContent = 'DRAW!';
                    playerTurn.style.color = 'gray';
                    return alert('DRAW!');
                }else{
                    playerTurn.textContent = `${player1}'s turn`;
                    playerTurn.style.color = 'red';
                    return currentPlayer = 1;
                }
                
            }
        }
    }
   
}


//NO.5 - a code to make all cell in color white
Array.prototype.forEach.call(tableData, (cell) => { //Array.prototype调取array相关object，forEach遍历，将tableData(Cells)内所有cell，点击时变成白色
    cell.addEventListener('click', changeColor) // click to triger chnageColor function, to change color
    // Set all slots to white for new game.
    cell.style.backgroundColor = 'white';//in the begining, make it white
});


// No.7 check color match
function colorMatchCheck(one, two, three, four){//vertal,horizontal, diagno upper, diagno lower
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);// if for cell same color and not white
}

function horizontalCheck(){
    for (let row = 0; row < tableRow.length; row++){ // check each row, horizontal
        for (let col = 0; col < 4; col++){
           if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor, tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){ // if four cell to each other same color
               return true;
           }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col < 7; col++){ // check through each column
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){ // same as above, row ++
                return true;
            };
        }   
    }
}

function diagonalCheck(){// you xie
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

}

function diagonalCheck2(){// zuo xie
    for(let col = 0; col < 4; col++){
        for (let row = 5; row > 2; row--){
            if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}

function drawCheck(){
    let fullSlot = []
    for (i=0; i < tableData.length; i++){//all cells
        if (tableData[i].style.backgroundColor !== 'white'){
            fullSlot.push(tableData[i]);
        }
    }
    if (fullSlot.length === tableData.length){
        return true;
    }
}

resetBtn.addEventListener('click', () => {
    slots.forEach(slot => {
        slot.style.backgroundColor = 'white';
    });
    playerTurn.style.color = 'black';
    return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
});