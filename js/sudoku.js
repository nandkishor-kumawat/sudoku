const size = 9;
const newGrid = size => {
    let arr = new Array(size);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(size);
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

// const isColSafe = (box, col, num) => {
//     for (let row = 0; row < size; row++) {
//         if (box[row][col] == num) return false;
//     }
//     return true;
// }

// const isRowSafe = (box, row, num) => {
//     for (let col = 0; col < size; col++) {
//         if (box[row][col] == num) return false;
//     }
//     return true;
// }

// const isBoxSafe = (box, i, j, num) => {
//     for (let row = 0; row < 3; row++) {
//         for (let col = 0; col < 3; col++) {
//             if (box[row + i][col + j] == num) return false;
//         }
//     }
//     return true;
// }

// const isSafe = (grid, row, col, value) => {
//     return isColSafe(grid, col, value) && isRowSafe(grid, row, value) && isBoxSafe(grid, row - row % 3, col - col % 3, value) && value !== 0;
// }

const isSafe = (board, row, col, k) => {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}

// const isSafe = (box, row, col, num)=>{

//         for (let i = 0; i < size; i++) {
//             if (box[i][col] == num) return false;
//             if (box[row][i] == num) return false;
//         }

//         for (let i = 0; i < 3; i++) {
//             for (let j = 0; j < 3; j++) {
//                 if (box[i + row - row % 3][j + col - col % 3] == num) return false;
//             }
//         }
//         return true;

// }

const checkEmptySpace = (box, pos) => {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (box[row][col] == 0) {
                pos[0] = row;
                pos[1] = col;
                return true;
            }
        }
    }
    return false;
}

const isFull = box => {
    return box.forEach(row => {
        return row.forEach(value => {
            return value !== 0;
        })
    });
}

const createSudokuBoard = box => {
    let emptyPos = new Array(2);

    if (!checkEmptySpace(box, emptyPos)) return true;

    let row = emptyPos[0],
        col = emptyPos[1];

    for (let i = 0; i < size; i++) {
        let n = Math.ceil(Math.random() * size);
        if (isSafe(box, row, col, n)) {
            box[row][col] = n;
            if (isFull(box)) {
                return true;
            }
            if (createSudokuBoard(box)) {
                return true;

            }

            box[row][col] = 0;
        }
    }

    return isFull(box);
}


const generateBoard = (level) => {
    let sudoku = newGrid(9);
    let check = createSudokuBoard(sudoku);

    if (check) {
        let arr = newGrid(9);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                arr[i][j] = sudoku[i][j];
            }
        }

        for (let i = 0; i < level; i++) {
            let row, col;
            do {
                row = Math.floor(Math.random() * size);
                col = Math.floor(Math.random() * size);
            } while (arr[row][col] == 0);
            arr[row][col] = 0;
        }
        return {
            a: sudoku,
            b: arr
        }
    }
}
// let s = generateBoard()


