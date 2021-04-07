'use strict'

var gNums = []
var shuffledsNums = []
var boardSize = 16
var clickCounter = 1
var timeCount = 1;
var interval;

function init() {
    var winStr = document.querySelector('.win')
    var timerRecord = document.querySelector('.timerRecord ')
    clickCounter = 1
    makingNumbers(boardSize)
    shufflesNums()
    renderBoard()
    winStr.innerHTML = ""
    timerRecord.innerHTML = ""
}

function makingNumbers(boardSize) {
    for (var i = 1; i < boardSize + 1; i++) {
        gNums.push(i)
    }
}

function shufflesNums() {
    for (var i = 0; i < boardSize; i++) {
        shuffledsNums.push(gNums.splice(getRandomIntInclusive(0, gNums.length - 1), 1)[0])
    }
}

function gameDifficult(ev) {
    if (ev.className === 'easy') {
        timeCount = 0
        gNums = []
        shuffledsNums = []
        boardSize = 16
        init()
    }
    if (ev.className === 'medium') {
        timeCount = 0
        gNums = []
        shuffledsNums = []
        boardSize = 25
        init()
    }
    if (ev.className === 'hard') {
        timeCount = 0
        gNums = []
        shuffledsNums = []
        boardSize = 36
        init()
    }
    if (ev.className === 'restart') {
        timeCount = 0
        gNums = []
        shuffledsNums = []
        boardSize = boardSize
        init()
    }
}

function renderBoard() {
    var count = 0
    var strHtml = '<table>';
    var board = document.querySelector('.board')
    for (var i = 0; i < Math.sqrt(shuffledsNums.length); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(shuffledsNums.length); j++) {
            strHtml += `<td class="${shuffledsNums[count]}" onclick=" cellClicked(this)">${shuffledsNums[count]}</td>`
            count++
        }
        strHtml += '</tr>'
    }
    strHtml += '</table>'
    board.innerHTML = strHtml
}

function cellClicked(clickedNum) {
    var cell = +clickedNum.className
    if (cell === clickCounter) {
        clickedNum.style.backgroundColor = 'orange'
        clickCounter++
    }
    if (clickCounter === 2) {
        interval = setInterval(Timer, 1000)
    }

    // winning Game!
    if (clickCounter === boardSize + 1) {
        var winStr = document.querySelector('.win')
        winStr.innerHTML = "You Win!"
        timerRecord()
        clearInterval(interval)
        clickCounter = 1
        timeCount = 0
    }
}

function Timer() {
    var body = document.querySelector('.timer')
    body.innerHTML = `<body>Timer : ${timeCount}</body>`
    timeCount++
}

function timerRecord() {
    var timerRecord = document.querySelector('.timerRecord ')
    timerRecord.innerHTML = `best Time is - ${timeCount -1}  `

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}