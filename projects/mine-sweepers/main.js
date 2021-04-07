'use strict'
var SIZE = 6;
var LIVES = 3
var gBoard;
var clickCount = 0
var gGame;
var timer;


// Init Game && Restart Game
function init() {
    gGame = {
        isOn: true,
        shownCount: 0,
        playerLives: 3,
        markedCount: 0,
        secPassed: 0,
        numOfHints: 3,
        isHintModeOn: false
    }
    clearInterval(timer)
    clickCount = 0
    elNumsOfFlags.innerText = FLAG + '=' + SIZE;
    elSmiley.innerText = '🙂'
    gBoard = buildBoard(SIZE)
    renderHints()
    renderLives()
    renderBoard(gBoard)
}

// Building the Board!
function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                isShown: false,
                minesAroundCount: '',
                isMine: false,
                isMarked: false
            }
        }
    }
    console.table(board)
    return board
}

// Place The Mines On Board Randomly!
function placingRandomMines(clickedCell) {
    var possibleCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (clickedCell.i === i && clickedCell.j === j) continue
            possibleCells.push({ i: i, j: j })
        }
    }
    for (var i = 0; i < gBoard.length; i++) {
        var selectedCell = possibleCells.splice(getRandomIntInclusive(0, possibleCells.length - 1), 1)[0]
        gBoard[selectedCell.i][selectedCell.j].isMine = true
    }
}

// Placing The Nums Of Negs!
function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine === false) {
                gBoard[i][j].minesAroundCount = checkingNegs(gBoard, i, j);
            }
        }
    }
}

// This Function Checking GAME-OVER Also!
function cellClicked(elCell) {
    // Check If Hint Mode Is On!
    if (!gGame.isOn) return
    var cellCoord = getCellCoord(elCell.id);
    if (gBoard[cellCoord.i][cellCoord.j].isShown) return
    if (gGame.isHintModeOn) {
        revealNegsFor1Sec(cellCoord)
    }
    gBoard[cellCoord.i][cellCoord.j].isShown = true

    if (clickCount === 0) {
        timer = setInterval(gameTimer, 1000)
        placingRandomMines(cellCoord)
        setMinesNegsCount()
        console.log(LIVES)
    }
    // Checking If Game Is Over && Making LIVES 💓 
    if (gBoard[cellCoord.i][cellCoord.j].isMine) {
        gGame.playerLives--;
        renderLives()
        if (gGame.playerLives === 0) {
            elTimer.innerText = `your time is = ${gGame.secPassed}`
            elTimer.innerText = 'GAME OVER !'
            clearInterval(timer)
            elSmiley.innerText = '😪'
            gBoard[cellCoord.i][cellCoord.j].isShown = true
            gGame.isOn = false
            renderBoard(gBoard)
            return
        }
    } else {
        gGame.shownCount++
    }
    expandShown(gBoard, cellCoord.i, cellCoord.j)
    renderBoard(gBoard)
    checkWinning()
    clickCount++
}

// Put Flag On Marked Cell
function cellMarked(event, elCell) {
    event.preventDefault()
    var cellCoord = getCellCoord(elCell.id);
    if (gBoard[cellCoord.i][cellCoord.j].isMarked) {
        gBoard[cellCoord.i][cellCoord.j].isMarked = false
        gGame.markedCount--
    } else {
        gBoard[cellCoord.i][cellCoord.j].isMarked = true
        gGame.markedCount++
    }
    renderBoard(gBoard)
}

// Reveal All Cells Without Mines!
function expandShown(board, i, j) {
    if (board[i][j].minesAroundCount === 0) {
        for (var idx = i - 1; idx <= i + 1; idx++) {
            for (var jdx = j - 1; jdx <= j + 1; jdx++) {
                if (jdx === -1 || idx === -1 || jdx === board.length || idx === board.length) continue
                if (board[idx][jdx].isShown) continue
                board[idx][jdx].isShown = true
                expandShown(board, idx, jdx)
                gGame.shownCount += 1
            }
        }
    }
}

// Check If User Win The Game!
function checkWinning() {
    var minesOnBoard = gBoard.length;
    var cellsOnBoard = gBoard.length * gBoard.length - minesOnBoard
    console.log(gGame.shownCount)
    console.log(cellsOnBoard)
    if (gGame.shownCount === cellsOnBoard) {
        elSmiley.innerText = '😀'
        elLive.innerText = "WINNIG!"
        elTimer.innerText = `your time is = ${gGame.secPassed}`
        clearInterval(timer)
    }
}



// *** BONUS TASK *** 
// Hint Mode
function hintClicked(elHint) {
    gGame.isHintModeOn = true
    elHint.innerText = '🔦'
}

function revealNegsFor1Sec(cellCoord) {
    for (var idx = cellCoord.i - 1; idx <= cellCoord.i + 1; idx++) {
        for (var jdx = cellCoord.j - 1; jdx <= cellCoord.j + 1; jdx++) {
            if (jdx === -1 || idx === -1 || jdx === gBoard.length || idx === gBoard.length) continue
            if (gBoard[idx][jdx].isShown) {
                gBoard[idx][jdx].isNowOnHintMode = false
            } else {
                gBoard[idx][jdx].isNowOnHintMode = true
                gBoard[idx][jdx].isShown = true
            }
        }
    }
    gGame.isHintModeOn = false
    gGame.numOfHints--;
    setTimeout(function () { hideRevealNegs(cellCoord) }, 1000)
}

function hideRevealNegs(cellCoord) {
    for (var idx = cellCoord.i - 1; idx <= cellCoord.i + 1; idx++) {
        for (var jdx = cellCoord.j - 1; jdx <= cellCoord.j + 1; jdx++) {
            if (jdx === -1 || idx === -1 || jdx === gBoard.length || idx === gBoard.length) continue
            if (gBoard[idx][jdx].isShown && gBoard[idx][jdx].isNowOnHintMode) {
                gBoard[idx][jdx].isShown = false
                gBoard[idx][jdx].isHintModeOn = false
            }
        }
    }
    renderBoard(gBoard)
    renderHints()
}