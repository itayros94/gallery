var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '<img src="img/candy.png"/>';

var gBoard;
var gGamerPos;
var gBallsCollect = 0
var gBallsOnBoard = 1
var randomBalls
var placeingTheGlue;
var collectSound = new Audio("img/pop.wav")

function initGame() {
    gBallsCollect = 0
    gBallsOnBoard = 1
    countingBallsCollected()
    gGamerPos = { i: 2, j: 9 };
    gBoard = buildBoard();
    renderBoard(gBoard);
    randomBalls = setInterval(placeRandomBalls, 2000)
    placeingTheGlue = setInterval(placeingGlue, 5000)

}

function buildBoard() {
    // Create the Matrix
    var board = createMat(10, 12)
        // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // Put FLOOR in a regular cell
            var cell = { type: FLOOR, gameElement: null };
            // Place Walls at edges
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }
            // Add created cell to The game board
            board[i][j] = cell;
        }
    }
    // Place the gamer at selected position
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
    // Place the Balls(currently randomly chosen positions)
    board[3][8].gameElement = BALL;
    board[4][11].type = FLOOR
    board[4][0].type = FLOOR
    board[9][6].type = FLOOR
    board[0][6].type = FLOOR
        // place the ball randomly
    return board;
}


// Render the board to an HTML table
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            // TODO - change to short if statement
            if (currCell.type === FLOOR) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';

            //TODO - Change To template string
            strHTML += '\t<td class="cell ' + cellClass +
                '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

            // TODO - change to switch case statement
            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
    // Teleport from left to right && Up and down
    if (i === 4 && j === -1) {
        i = 4;
        j = 11
    }
    if (i === -1 && j === 6) {
        i = 9;
        j = 6
    }
    if (i === 4 && j === 12) {
        i = 4
        j = 0
    }

    if (i === 10 && j === 6) {
        i = 0;
        j = 6
    }

    console.log(i, j)
    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;

    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);

    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || (iAbsDiff === 0 && jAbsDiff === 11) || (iAbsDiff === 9 && jAbsDiff === 0)) {

        if (targetCell.gameElement === BALL) {
            console.log('Collecting!');
            gBallsCollect++
            collectSound.play()
            countingBallsCollected()
            checkWinGame()
        }

        // MOVING from current position
        // Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        // Dom:
        renderCell(gGamerPos, '');

        // MOVING to selected position
        // Model:
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        // DOM:
        renderCell(gGamerPos, GAMER_IMG);

    } //else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;

    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            moveTo(i + 1, j);
            break;
    }
}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

// * Place random balls
function placeRandomBalls() {
    var row = getRandomInt(1, 9)
    var col = getRandomInt(1, 11)
    var pos = { i: row, j: col }

    if (gBoard[row][col].gameElement === null) {
        gBoard[row][col].gameElement = BALL
        renderCell(pos, BALL_IMG)
        gBallsOnBoard++
    }
}

//* Counting how many balls are collected

function countingBallsCollected() {
    var ballsCollecting = document.querySelector('.colletingBalls');
    ballsCollecting.innerHTML = `<div>Balls Collect = ${gBallsCollect}</div>`
}

// Cheking winnig
function checkWinGame() {
    if (gBallsOnBoard === gBallsCollect) {
        alert('Finish Game!')
        restartGame()
    }
}

// Restart the game
function restartGame() {
    clearInterval(randomBalls)
    initGame()

}

// Generate Glue to the board

function placeingGlue() {

    var row = getRandomInt(1, 9)
    var col = getRandomInt(1, 11)
    var pos = { i: row, j: col }
    renderCell(pos, GLUE_IMG)

}