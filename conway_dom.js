/*
 * Name: C.N.
 * Course: CS375-003, Drexel University
 * Subject: Conway's Game of Life, Visualization
*/

let defaultArray = [
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true]
]
let currentArray = defaultArray;  // Shared State of the Board
let goTimer;
let goFlag = false;

function drawBoard(array) {
    let container = document.getElementById("board");
    let table = document.createElement("table");
    array.forEach(function(subarray,row){
        let tableRow = document.createElement("tr");
        subarray.forEach(function(item,col){
            let cell = document.createElement("td");
            if (item) {
                cell.classList.add("alive-cell");
            }
            else {
                cell.classList.add("dead-cell");
            }
            tableRow.append(cell);
        })
        table.append(tableRow);
    })
    container.append(table);
}

function createButton() {
    let container = document.getElementById("buttons");
    
    let stepBtn = document.createElement("button");
    stepBtn.textContent = "Step"
    stepBtn.addEventListener("click", updateBoard);
    container.append(stepBtn);

    let resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset"
    resetBtn.addEventListener("click",resetBoard);
    container.append(resetBtn);

    let goBtn = document.createElement("button");
    goBtn.textContent = "Go"
    goBtn.addEventListener("click",goBoard);
    container.append(goBtn);

    let pauseBtn = document.createElement("button");
    pauseBtn.textContent = "Pause"
    pauseBtn.addEventListener("click",pauseBoard);
    container.append(pauseBtn);

    let randomBtn = document.createElement("button");
    randomBtn.textContent = "Random"
    randomBtn.addEventListener("click",randomize);
    container.append(randomBtn);
}

drawBoard(defaultArray);
createButton();

function eraseBoard() {
    let board = document.getElementById("board");
    for (child of board.childNodes) {
        child.remove();
    }
}

function resetBoard() {
    if (goFlag) {
        pauseBoard();
    }
    eraseBoard();
    drawBoard(defaultArray);
    currentArray = defaultArray;
}

function updateBoard() {
    currentArray = stepBoard(currentArray);
    eraseBoard();
	drawBoard(currentArray);
}

function goBoard(){
    if (!goFlag) {
        goTimer = setInterval(updateBoard, 100);
        goFlag = true;
    }
}

function pauseBoard(){
    if (goFlag) {
        goFlag = false;
        clearInterval(goTimer);
    }
}

function randomize() {
    if (goFlag) {
        pauseBoard();
    }

    let newArray = [];
    
    for (let row = 0; row < 25; row++) {
        newArray.push([]);

        for (let col = 0; col < 25; col++) {
            if (Math.random() >= 0.5)  // 50% Chance to get True
            {
                newArray[row].push(true);
            }
            else {
                newArray[row].push(false);
            }
        }
    }
    currentArray = newArray;
    updateBoard();
}