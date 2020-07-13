/*
 * Name: C.N.
 * Course: CS375-003, Drexel University
 * Subject: Conway's Game of Life, JavaScript Implementation
*/

/* Main Function */
const stepBoard = (array) => {
    let updatedArray = [];
    
    array.forEach(function(subArray,row) {
        updatedArray.push([]);
        
        for (let col = 0; col < subArray.length; col++) {
            let sum = countAliveBorders(array,row,col);
            if (array[row][col] && sum === 2) {  // Behavior for Alive Cell with 3 Alive Neighbors
                updatedArray[row].push(true);
            }
            else if (array[row][col] && sum === 3) {  // Behavior for Alive Cell with 3 Alive Neighbors
                updatedArray[row].push(true);
            }
            else if (!array[row][col] && sum === 3) {  // Behavior for Dead Cell with 3 Alive Neighbors
                updatedArray[row].push(true);
            }
            else {
                updatedArray[row].push(false);
            }
        }
    })
    return updatedArray;
}

/* Helper Function */
const countAliveBorders = (array, row, col) => {
    if (row < 0 || col < 0)
        return 0;

    // Array Dimensions
    const rowLength = array.length;
    const colLength = array[0].length;

    // Border Variables
    let tl = 0;
    let top = 0;
    let tr = 0;
    let left = 0;
    let right = 0;
    let bl = 0;
    let bottom = 0;
    let br = 0;

    if (row - 1 >= 0 && col - 1 >= 0)  // Top Left Cell
        if (array[row-1][col-1])
            tl = 1;
    
    if (row - 1 >= 0)  // Top Cell
        if (array[row-1][col])
            top = 1;

    if (row - 1 >= 0 && col + 1 < colLength)  // Top Right Cell
        if (array[row-1][col+1])
            tr = 1;

    if (col - 1 >= 0)  // Left Cell
        if (array[row][col-1])    
            left = 1;

    if (col + 1 < colLength)  // Right Cell
        if (array[row][col+1])
            right = 1;

    if (row + 1 < rowLength && col - 1 >= 0)  // Bottom Left Cell
        if (array[row+1][col-1])
            bl = 1;

    if (row + 1 < rowLength)  // Bottom Cell
        if (array[row+1][col])    
            bottom = 1;
    
    if (row + 1 < rowLength && col + 1 < colLength)  // Bottom Right Cell
        if (array[row+1][col+1])    
            br = 1;

    return tl + top + tr + left + right + bl + bottom + br;
}

/* TEST CASES - UNCOMMENT (CTRL+/ WHILE HIGHLIGHTED) CODE BELOW TO RUN */
// let array = [];
// console.log(array);
// // should print: []

// array = [[true, true, true]]
// console.log(stepBoard(array));
// // should print: [[false, true, false]]

// array = [
//     [true, false, true], 
//     [false, true, false]]
// console.log(stepBoard(array));
// // should print: [[false, true, false], [false, true, false]]

// array = [
//     [true, true, false, true],
//     [false, true, false, true],
//     [false, false, false, true]
// ]
// console.log(stepBoard(array));
// // should print: [[true, true, false, false], [true, true, false, true], [false, false, true, false]]

// array = [[]];
// console.log(stepBoard(array));
// // should print: [[]]