function validSolution(matrix) {
    const targetArray = generateTargetArray(1, 10); // make a target massive from 1 to 9
    console.log(`We have a target array: ${targetArray}`);

    // start from checking each row of a given matrix
    // but before that we can sort our row to ease the comparison
    for (let row of matrix) {
        targetRow = row.slice().sort((a, b) => a - b);
        //console.log(`We have a target row: ${targetRow}`);
        if (!arraysEqual(targetRow, targetArray)) {
            console.log(false); // rows are not equal - some number is missed
            return; // stop other checks because the sudoku is done wrong already
        };
    };

    // continue with checking each column - second condition for correct sudoku
    for (let columnNum = 0; columnNum < 9; columnNum++) {
        const column = [];
        for (let row = 0; row < 9; row++) {
            column.push(matrix[row][columnNum]);
        }
        targetCol = column.sort((a, b) => a - b);
        //console.log(`We have target column: ${targetCol}`)
        if (!arraysEqual(targetCol, targetArray)) {
            console.log(false); // rows are not equal - some number is missed
            return; // stop other checks because the sudoku is done wrong already
        }
    }

    // last, check each 3x3 quarter of the matrix, take every num with a step +3
    for (let blockRow = 0; blockRow < 9; blockRow += 3) {
        for (let blockCol = 0; blockCol < 9; blockCol += 3) {
            const subMatrix = [];
            for (let row = blockRow; row < blockRow + 3; row++) {
                for (let columnNum = blockCol; columnNum < blockCol + 3; columnNum++) {
                    subMatrix.push(matrix[row][columnNum]);
                }
            }
            targetSubMatrix = subMatrix.sort((a, b) => a - b);
            //console.log(`We have target submatrix: ${targetSubMatrix}`)
            if (!arraysEqual(targetSubMatrix, targetArray)) {
                console.log(false); // rows are not equal - some number is missed
                return; // stop other checks because the sudoku is done wrong already
            }
        }
    }

    console.log(true); // if every check is confirmed, print true
}

function arraysEqual(a, b) { // helper function to equalize two num massives
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function generateTargetArray(first, last) { // helper function to get a 1 to 9 list
    const array = [];
    for (let i = first; i < last; i++) {
        array.push(i);
    }
    return array;
}


validSolution([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ]); // => true
      
/*
validSolution([
    [5, 3, 4, 6, 7, 8, 9, 1, 2], 
    [6, 7, 2, 1, 9, 0, 3, 4, 8],
    [1, 0, 0, 3, 4, 2, 5, 6, 0],
    [8, 5, 9, 7, 6, 1, 0, 2, 0],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 0, 1, 5, 3, 7, 2, 1, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 0, 0, 4, 8, 1, 1, 7, 9]
]); // => false
*/