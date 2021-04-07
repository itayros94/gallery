'use strict'
const WALL = '🌵'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '🍔';
const CHERRY = '🍒'
var elWinGame = document.querySelector('.winGame')


var gBoard;
var gFoodCount = 0

var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    setInterval(creatCherry, 15000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];

    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gFoodCount--
            }
        }
    }
    // Placing SuperFood
    board[1][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][8] = SUPERFOOD
    board[8][1] = SUPERFOOD

    return board;
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
        // TODO: update model and dom
}

var elGameOver = document.querySelector('.gameOver');

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    elGameOver.innerHTML = `<button onclick="restartGame()">Play Again!</button>`
    gFoodCount = 0
}

// Restart the game!
function restartGame() {
    elGameOver.innerHTML = `<div></div>`
    elWinGame.innerText = ""

    gGhosts = []
    gGame.score = -1
    clearInterval(gIntervalGhosts)
    init()
}

// Win game Function

function winGame() {
    var foodCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) {
                foodCount++
            }
        }
    }
    if (gFoodCount - foodCount === gFoodCount) {
        console.log('win Game!')
        elWinGame.innerHTML = `<div>Win Game!</div>`
        elGameOver.innerHTML = `<button onclick="restartGame()">Play Again!</button>`

    }
}

function creatCherry() {
    var emptyCells = findEmptyCell()
    var location = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)]

    gBoard[location.i][location.j] = CHERRY
    renderCell({ i: location.i, j: location.j }, CHERRY)
}

function findEmptyCell() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i: i, j: j })
            }
        }
    }
    return emptyCells
}