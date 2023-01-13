let cells = document.querySelectorAll('.cell'),
    numbers = document.querySelectorAll('.number'),
    modes = document.querySelectorAll('.mode'),
    erase = document.getElementById("erase"),
    timeId = document.getElementById("timer"),
    resetBtn = document.getElementById("resetBtn"),
    startBtn = document.getElementById("startBtn"),
    newGameBtn = document.getElementById("newGameBtn"),
    hilightRegion = document.getElementById("hilightRegion"),
    hilightNumber = document.getElementById("hilightNumber"),
    menu = document.querySelector('#menu'),
    startPage = document.querySelector('.start-page'),
    gameContainer = document.querySelector('.game-container'),
    selected_cell = -1,
    mode = "",
    time = 0,
    timer,
    sudoku_q,
    sudoku_a;

modes.forEach(e => {
    e.addEventListener('click', () => {
        mode = e.value;
        document.getElementById('mode-name').innerHTML = "Selected Mode: " + mode;
        startBtn.disabled = false;
    });
});

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
});

const addBorders = () => {
    cells.forEach((cell, index) => {
        let width = "0.185rem solid #000"
        if (index % 27 < 9) cell.style.borderTop = width;
        if (index % 9 == 0 || index % 9 == 3 || index % 9 == 6) cell.style.borderLeft = width;
        if (index % 9 == 8) cell.style.borderRight = width;
        if (index >= 72 && index <= 80) cell.style.borderBottom = width;
    });
}

const insertValues = (level) => {
    let sdk = generateBoard(level);
    sudoku_q = newGrid(size);
    sudoku_a = sdk.a;
    s = sdk.b;
    for (let i = 0; i < cells.length; i++) {
        let row = Math.floor(i / size);
        let col = i % size;

        if (s[row][col] !== 0) {
            cells[i].innerHTML = s[row][col];
            sudoku_q[row][col] = s[row][col];
            cells[i].classList.add('filled');
        }
    }
}

const heighlightRegion = () => {
    cells.forEach(e => e.classList.remove('sameRegion'));
    if (hilightRegion.checked && selected_cell != -1) {
        let row = Math.floor(selected_cell / size);
        let col = selected_cell % size;

        for (let i = 0; i < 9; i++) {
            cells[9 * i + col].classList.add("sameRegion");
            cells[9 * row + i].classList.add("sameRegion");
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[9 * (row - row % 3 + i) + (col - col % 3 + j)].classList.add("sameRegion");
            }
        }
    }
}

const heighlightNumber = (num) => {
    cells.forEach(e => e.classList.remove('sameNumber'));
    if (selected_cell != -1) {
        if (typeof num == "object") num = cells[selected_cell].innerHTML;

        if (num && hilightNumber.checked) {
            for (let i = 0; i < size ** 2; i++) {
                if (cells[i].innerHTML == num) {
                    cells[i].classList.add("sameNumber");
                }
            }
        }
    }
}

// const isValidNum = (selected = selected_cell, value) => {
//     let row = Math.floor(selected / size);
//     let col = selected % size;

//     for (let i = 0; i < 9; i++) {
//         if (cells[9 * i + col].innerHTML == value) return false;
//         if (cells[9 * row + i].innerHTML == value) return false;
//     }

//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             if (cells[9 * (row - row % 3 + i) + (col - col % 3 + j)].innerHTML == value) return false;
//         }
//     }
//     return true;
// }

// function isValid(board, row, col, k) {
//     for (let i = 0; i < 9; i++) {
//         const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
//         const n = 3 * Math.floor(col / 3) + i % 3;
//         if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
//           return false;
//         }
//     }
//     return true;
// }

const checkErr = (value) => {
    cells.forEach(e => e.classList.remove("err"));

    let row = Math.floor(selected_cell / size);
    let col = selected_cell % size;

    const addErr = (cell) => {
        if (cell.innerHTML == value && !cell.classList.contains("selected")) {
            cell.classList.add("err");
            if (!cells[selected_cell].classList.contains("filled")) cells[selected_cell].classList.add("wrong");
        }
    }

    // if (isValidNum(value)) {
        cells[selected_cell].classList.remove("wrong");
    // }
    // if (isSafe(sudoku_q,row,col,value)) {
    //     cells[selected_cell].classList.remove("wrong");
    // }
    // console.log(isValidNum(value))
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            addErr(cells[9 * (3 * i + j) + col]);
            addErr(cells[9 * row + (3 * i + j)]);
            addErr(cells[9 * (row - row % 3 + i) + (col - col % 3 + j)]);
        }
    }

}

const isComplete = () => {
    // let a = 0, b = 0;
    // cells.forEach(cell => {
    //     if (cell.classList.contains('err') || cell.classList.contains('wrong')) a++;
    //     if (cell.innerHTML == "") b++;
    // });

    // return (a == 0 & b == 0);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku_q[i][j] !== sudoku_a[i][j]) return false;
        }
    }
    return true
}

const showResult = () => {
    clearInterval(timer);
    console.log('f')
}



const initializVal = () => {
    cells.forEach((cell, i) => {
        cell.addEventListener('click', () => {
            cells.forEach(e => e.classList.remove('selected', 'err', 'sameNumber', 'sameRegion'));
            selected_cell = i;
            cell.classList.add('selected');
            if (cell.innerHTML != "") checkErr(cell.innerHTML);
            heighlightRegion();
            heighlightNumber(cell.innerHTML);
        });
    });
}

const initializNum = () => {
    numbers.forEach((num, index) => {
        num.innerHTML = index + 1;
        num.addEventListener('click', () => {
            if (selected_cell != -1 && !cells[selected_cell].classList.contains('filled')) {
                cells[selected_cell].innerHTML = index + 1;

                let row = Math.floor(selected_cell / size);
                let col = selected_cell % size;
                sudoku_q[row][col] = index + 1;

                checkErr(index + 1);
                heighlightRegion();
                heighlightNumber(index + 1);

                if (isComplete()) showResult();


            }
        });
    });
}

const findLevel = (val) => {
    switch (val) {
        case 'Easy':
            return 30 + Math.floor(Math.random() * 5);

        case 'Medium':
            return 35 + Math.floor(Math.random() * 5);

        case 'Hard':
            return 40 + Math.floor(Math.random() * 5);

        case 'Expert':
            return 45 + Math.floor(Math.random() * 5);

    }
}

const resetBoard = () => {

    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove('selected', 'err', 'sameNumber', 'sameRegion', 'filled', 'wrong');
    });
    selected_cell = -1;
    time = 0;
    timeId.innerHTML = "00:00";
    clearInterval(timer);
}

const updateTime = () => {
    let m = Math.floor(time / 60);
    let s = time % 60;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? ("0" + s) : s;
    timeId.innerHTML = m + ":" + s;
    time++;
}

const startGame = (val) => {
    resetBoard();
    addBorders();
    insertValues(findLevel(val));
    initializNum();
    initializVal();
    document.getElementById("mode").innerHTML = mode;
    updateTime();
    timer = setInterval(updateTime, 1000);
}

const resetGame = () => {
    // resetBoard();
    startGame(mode);
}

erase.addEventListener('click', () => {
    cells.forEach(e => e.classList.remove("err"));
    let cell = document.querySelector('.selected');
    if (cell && !cell.classList.contains("filled")) cell.innerHTML = "";
});

startBtn.addEventListener('click', () => {
    startPage.style.display = "none";
    gameContainer.style.display = "flex";
    if (mode) startGame(mode);
});

newGameBtn.addEventListener('click', () => {
    startPage.style.display = "flex";
    gameContainer.style.display = "none";
    mode = "";
    document.getElementById('mode-name').innerHTML = "Choose dificulty level";
    startBtn.disabled = true;
    resetBoard();
});

hilightRegion.addEventListener('click', heighlightRegion);
hilightNumber.addEventListener('click', heighlightNumber);
resetBtn.addEventListener('click', resetGame);
resetGame()