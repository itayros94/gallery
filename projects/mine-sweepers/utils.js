'use stirct'
// Global Elements!
var elLive = document.querySelector('.lives')
var elSmiley = document.querySelector('.smiley')
var elTimer = document.querySelector('.timer')
var elNumsOfFlags = document.querySelector('.flagsNumber')

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Checking Negs Function
function checkingNegs(board, i, j) {
    var res = 0
    for (var idx = i - 1; idx <= i + 1; idx++) {
        for (var jdx = j - 1; jdx <= j + 1; jdx++) {
            if (jdx === -1 || idx === -1 || jdx === board.length || idx === board.length) continue
            if (board[idx][jdx].isMine) {
                res++
            }
        }
    }
    return res;
}

function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}

// Game Levels
function easy() {
    SIZE = 6
    init()
}

function medium() {
    SIZE = 8
    init()
}

function hard() {
    SIZE = 12
    init()
}

function gameTimer() {
    var timer = document.querySelector('.timer');
    timer.innerHTML = `Game Time = ${gGame.secPassed}`
    gGame.secPassed++

}