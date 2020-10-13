const tiles = document.querySelectorAll('.box');
let player;
let gameFinished = false;


const horizontal = [0, 3, 6,].map(n => { return [n, n + 1, n + 2] });
const vertical = [0, 1, 2].map(n => { return [n, n + 3, n + 6] });
const diagonal = [[0, 4, 8], [2, 4, 6]];
const winningConditions = [].concat(vertical).concat(horizontal).concat(diagonal);

const table = ["", "", "", "", "", "", "", "", ""];

tiles.forEach(tile => {
    tile.addEventListener('click', markTile);
});

function markTile(e) {
    if (player && e.target.textContent == "" && gameFinished == false) {
        if (player == 'X') {
            e.target.textContent = player;
            player = 'O';
        }
        else {
            e.target.textContent = player;
            player = 'X';
        }
        updateTable();
        checkWin();
    }
}

function teamStart() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            if (!player) {
                player = e.target.textContent;
                if (player == 'X') {
                    console.log('X starts');
                }

                else {
                    console.log('O starts');
                }
            }
        })
    })
}

function updateTable() {
    tiles.forEach(function (element, index) {
        table.splice(index, 1, element.textContent);
    })
    console.log(table);
}

function checkWin() {
    let indexX = [];
    let indexO = [];
    table.filter((n, index) => { if (n == 'X') { indexX.push(index) } });
    table.filter((n, index) => { if (n == 'O') { indexO.push(index) } });
    // console.log(JSON.stringify(indexX).replace('[','').replace(']',''));

    for (let i = 0; i < winningConditions.length; i++) {
        // console.log(JSON.stringify(indexX).replace('[','').replace(']','').includes(JSON.stringify(winningConditions[i]).replace('[','').replace(']','')));
        if (indexX.includes(winningConditions[i][0]) && indexX.includes(winningConditions[i][1]) && indexX.includes(winningConditions[i][2])) {
            displayWinner('X Won', winningConditions[i]);
            break;
        }
        if (indexO.includes(winningConditions[i][0]) && indexO.includes(winningConditions[i][1]) && indexO.includes(winningConditions[i][2])) {
            displayWinner('O Won', indexO);
            break;
        }
    }
}

function displayWinner(win, tiles) {
    const winner = document.getElementById('winner');
    let highlight;
    for (let i = 0; i < tiles.length; i++) {
        highlight = document.querySelector(`.box${tiles[i] + 1}`);
        highlight.style.backgroundColor = 'green';
    }

    winner.appendChild(document.createTextNode(win));
    winner.style.visibility = 'visible';
    gameFinished = true;
}

function Game() {
    teamStart();
    markTile();
}

Game();

// Ai coming soon .(probably going to use minimax)



