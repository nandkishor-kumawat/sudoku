let cells = document.querySelectorAll('.cell');
let numbers = document.querySelectorAll('.number');
let erase = document.getElementById("erase");
let resetBtn = document.getElementById("resetBtn");
let hilightRegion = document.getElementById("hilightRegion");
let hilightNumber = document.getElementById("hilightNumber");
let selected_cell = -1;


const addBorders = () => {
    cells.forEach((cell, index) => {
        let width = "0.185rem solid #000"
        if (index % 27 < 9) cell.style.borderTop = width;
        if (index % 9 == 0 || index % 9 == 3 || index % 9 == 6) cell.style.borderLeft = width;
        if (index % 9 == 8) cell.style.borderRight = width;
        if (index >= 72 && index <= 80) cell.style.borderBottom = width;
    });
}

const insertValues = () => {
    let s = generateBoard().b;
    for (let i = 0; i < cells.length; i++) {
        let row = Math.floor(i / size);
        let col = i % size;

        if (s[row][col] !== 0) {
            cells[i].innerHTML = s[row][col];
            cells[i].classList.add('filled');
        }
    }
}

const heighlightRegion = () => {
    cells.forEach(e => e.classList.remove('sameRegion'));
    if (hilightRegion.checked) {
        let row = Math.floor(selected_cell / size);
        let col = selected_cell % size;

        for (let i = 0; i < 9; i++) {
            cells[9 * i + col].classList.add("sameRegion")
            cells[9 * row + i].classList.add("sameRegion")
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[9 * (row - row % 3 + i) + (col - col % 3 + j)].classList.add("sameRegion")
            }
        }
    }
}

const heighlightNumber = (num) => {
    cells.forEach(e => e.classList.remove('sameNumber'));
    if (typeof num == "object") num = cells[selected_cell].innerHTML;

    if (num && hilightNumber.checked) {
        for (let i = 0; i < size ** 2; i++) {
            if (cells[i].innerHTML == num) {
                cells[i].classList.add("sameNumber")
            }
        }
    }
}

const isValidNum = () => {
    let row = Math.floor(selected_cell / size);
    let col = selected_cell % size;

    for (let i = 0; i < i; i++) {
        if (cells[9 * i + col].innerHTML == value) return false;
        if (cells[9 * row + i].innerHTML == value) return false;
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (cells[9 * (row - row % 3 + i) + (col - col % 3 + j)].innerHTML == value) return false;
        }
    }
    return true;
}

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

    if (isValidNum) {
        cells[selected_cell].classList.remove("wrong");
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            addErr(cells[9 * (3 * i + j) + col]);
            addErr(cells[9 * row + (3 * i + j)]);
            addErr(cells[9 * (row - row % 3 + i) + (col - col % 3 + j)]);
        }
    }

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
            if (!cells[selected_cell].classList.contains('filled')) {
                cells[selected_cell].innerHTML = index + 1;
                checkErr(index + 1);
                heighlightRegion();
                heighlightNumber(index + 1);
            }
        })
    });
}


const startGame = () => {
    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove('selected', 'err', 'sameNumber', 'sameRegion','filled','wrong')
    });
    selected_cell = -1;

    addBorders()
    insertValues()
    initializNum()
    initializVal()
}

erase.addEventListener('click', () => {
    let cell = document.querySelector('.selected');
    if (!cell.classList.contains("filled")) cell.innerHTML = "";
})

hilightRegion.addEventListener('click', heighlightRegion);
hilightNumber.addEventListener('click', heighlightNumber);
resetBtn.addEventListener('click', startGame);

startGame()