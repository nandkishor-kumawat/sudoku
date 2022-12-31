let cells = document.querySelectorAll('.cell');
let numbers = document.querySelectorAll('.number');
let erase = document.getElementById("erase");


let selected_cell = -1;

cells.forEach((cell, index) => {
    let width = "0.185rem"
    if (index % 27 < 9) cell.style.borderTopWidth = width;
    if (index % 9 == 0 || index % 9 == 3 || index % 9 == 6) cell.style.borderLeftWidth = width;
    if (index % 9 == 8) cell.style.borderRightWidth = width;
    if (index >= 72 && index <= 80) cell.style.borderBottomWidth = width;
})


const printSudoku = () => {
    let su = generateBoard();
    for (let i = 0; i < cells.length; i++) {
        let row = Math.floor(i / size);
        let col = i % size;

        if (su.b[row][col] !== 0) {
            cells[i].innerHTML = su.b[row][col];
            cells[i].classList.add('filled');
            cells[i].disabled = true;
        }

    }
}

const heighlightRegion = () => {
    let row = Math.floor(selected_cell / size);
    let col = selected_cell % size;

    cells.forEach(e => e.classList.remove("sameRegion"));


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

const heighlightNumber = (num) => {
    cells.forEach(e => e.classList.remove("sameNumber"));
    if (num) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let index = 9 * i + j;
                if (cells[index].innerHTML == num) {
                    cells[index].classList.add("sameNumber")
                }

            }
        }
    }
}

const checkErr = (value) => {
    cells.forEach(e => e.classList.remove("err"));

    let row = Math.floor(selected_cell / size);
    let col = selected_cell % size;

    const addErr = (cell) => {
        if (cell.innerHTML == value && !cell.classList.contains("selected")) {
            cell.classList.add("err");
            // cells[selected_cell].classList.add("wrong");
        };
    }

    for (let i = 0; i < 9; i++) {
        addErr(cells[9 * i + col])
        addErr(cells[9 * row + i])
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            addErr(cells[9 * (row - row % 3 + i) + (col - col % 3 + j)]);
        }
    }
}




cells.forEach((cell, i) => {
    cell.addEventListener('click', () => {
        cells.forEach(e => e.classList.remove('selected'));
        cells.forEach(e => e.classList.remove("err"));
        selected_cell = i;
        console.log(i)
        cell.classList.add('selected');
        heighlightRegion();
        heighlightNumber(cell.innerHTML);
    });
});

numbers.forEach((num, index) => {
    num.innerHTML = index + 1;
    num.addEventListener('click', () => {
        if (!cells[selected_cell].classList.contains('filled')) {
            cells[selected_cell].innerHTML = index + 1;
            checkErr(index + 1)
        }
    })
});


erase.addEventListener('click',()=>{
    let sel = document.querySelector('.selected');
    if(!sel.classList.contains("filled")) sel.innerHTML = "";
})

printSudoku()