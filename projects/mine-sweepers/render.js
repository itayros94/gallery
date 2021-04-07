'use strict'
var MINE = '💣';
var FLAG = '⛳';
var HINT = '💡'
var LIVE = '💓'

// Render Board 
function renderBoard(board) {
    var strHTML = '<table>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j]
            var data = ''
            var color = 'grey'
            if (cell.isMarked === true) {
                data = FLAG
            } else if (cell.isShown === true) {
                if (cell.isMine) {
                    data = MINE
                } else {
                    color = 'white'
                    data = cell.minesAroundCount === 0 ? '' : cell.minesAroundCount
                }
            }
            strHTML += `<td onclick="cellClicked(this)" oncontextmenu="cellMarked(event,this)" style="background-color:${color}" id="cell-${i}-${j}">${data}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</table>'
    var table = document.querySelector('.table ')
    table.innerHTML = strHTML
}

function renderHints() {
    var hint = document.querySelector('.hint')
    hint.innerHTML = '';
    for (var i = 0; i < gGame.numOfHints; i++) {
        hint.innerHTML += `<span onclick="hintClicked(this)" class="hint">${HINT}</span>`
    }
}

function renderLives() {
    var elLive = document.querySelector('.lives')
    elLive.innerText = '';
    for (var i = 0; i < gGame.playerLives; i++) {
        elLive.innerText += LIVE;
    }
}