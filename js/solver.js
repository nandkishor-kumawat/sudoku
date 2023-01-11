let cells = document.querySelectorAll('.cell');
let numbers = document.querySelectorAll('.number');

let sq = newGrid(9)

cells.forEach((cell, index) => {
    let width = "0.185rem solid #000"
    if (index % 27 < 9) cell.style.borderTop = width;
    if (index % 9 == 0 || index % 9 == 3 || index % 9 == 6) cell.style.borderLeft = width;
    if (index % 9 == 8) cell.style.borderRight = width;
    if (index >= 72 && index <= 80) cell.style.borderBottom = width;
    cell.addEventListener('click', () => {
        cells.forEach(e => e.classList.remove('selected', 'err', 'sameNumber', 'sameRegion'));
        selected_cell = index;
        cell.classList.add('selected');
    });
});

numbers.forEach((num, index) => {
    num.innerHTML = index + 1;
    num.addEventListener('click', () => {
        cells[selected_cell].innerHTML = index + 1;
        let row = Math.floor(selected_cell / size);
        let col = selected_cell % size;
        sq[row][col] = index + 1;
        console.log(sq)
    });
});

function solveSudoku() {
    do {
        var ck = createSudokuBoard(sq)
        console.log(1)
        for (let i = 0; i < cells.length; i++) {
            let row = Math.floor(i / size);
            let col = i % size;

            if (sq[row][col] !== 0) {
                cells[i].innerHTML = sq[row][col];
                cells[i].classList.add('filled');
            }
        }
    } while (!ck)
}