let cells = document.querySelectorAll('.cell');
let numbers = document.querySelectorAll('.number');
let selected_cell = -1;


cells.forEach((cell, index) => {
    if (index % 27 < 9) {
        cell.style.borderTop = '2px solid black';

    }
    if(index%9==0||index%9==3||index%9==6){
        cell.style.borderLeft = '2px solid black';
    }
    if(index%9==8) cell.style.borderRight = '2px solid black';
    if(index) cell.style.borderBottom = '2px solid black';
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

const checkErr = (value) => {
    cells.forEach(e => e.classList.remove("err"))
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
    }

    for (let i = 0; i < 9; i++) {
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
        selected_cell = i;
        console.log(i)
        cell.classList.add('selected')
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

// printSudoku()