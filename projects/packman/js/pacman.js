'use strict'
const PACMAN = '😀';

var gPacman;


function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    winGame()
    findEmptyCell()

    if (!gGame.isOn) return

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
        // eating ghost when isSuper=true
    if (nextCell === GHOST && gPacman.isSuper === true) {
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                gGhosts.splice(i, 1)
                setTimeout(function() { createGhost(gBoard) }, 5000)
            }
        }

    }
    if (nextCell === CHERRY) updateScore(10)
    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === SUPERFOOD) {
        paintFood()

    } else if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    }


    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation

    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    renderCell(gPacman.location, PACMAN)
        // TODO: return if cannot move
        // TODO: hitting a ghost?  call gameOver
        // TODO: update the model
        // TODO: update the DOM
        // TODO: Move the pacman
        // TODO: update the model
        // TODO: update the DOM
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
                break;
        case 'ArrowDown':
            nextLocation.i++
                break;
        case 'ArrowLeft':
            nextLocation.j--
                break;
        case 'ArrowRight':
            nextLocation.j++
                break;
        default:
            return null
    }

    return nextLocation;
}

// When packman eat superFood
function paintFood() {
    gPacman.isSuper = true
    setTimeout(() => {
        gPacman.isSuper = false
    }, 5000);

}