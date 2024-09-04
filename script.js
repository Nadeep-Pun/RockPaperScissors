const playBtnSection = document.getElementById('playBtnSection')
const playButton = document.getElementById('playButton')
const gameSection = document.getElementById('gameSection')

playButton.addEventListener('click', () => {
    playBtnSection.style.visibility = 'hidden'
    gameSection.style.visibility = 'visible'
})

const options = ['✊', '🤚', '✌️']
const playerMoves = document.querySelectorAll('.playerMoves')
const computerMoves = document.querySelectorAll('.computerMoves')
const displayPar = document.getElementById('displayPar')
const computerScoreDisp = document.getElementById('computerScoreDisp')
const playerScoreDisp = document.getElementById('playerScoreDisp')
let computerMove
let playerMove
let playerScore = 0
let computerScore = 0

playerMoves.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('clicked')) return
        button.classList.add('clicked')
        playerMove = button.innerText
        getComputerMove()
        disableComputerButtons(computerMove)
        if (playerHasWon(playerMove, computerMove)) {
            displayPar.innerText = "You won!!"
            playerScore++
            playerScoreDisp.innerText = `Player Score: ${playerScore}`
        } else if (isTie(playerMove, computerMove)) {
            displayPar.innerText = "It's a tie!!"
        } else {
            displayPar.innerText = "Computer won!!"
            computerScore++
            computerScoreDisp.innerText = `Computer Score: ${computerScore}`
        }
        disablePlayerButtons(button)
        checkGameOver()
    })
})

const replayBtn = document.getElementById('replayBtn')

replayBtn.addEventListener('click', () => {
    playerScore = 0
    computerScore = 0
    displayPar.innerText = 'Choose Your Move'
    remClickedDisabled(playerMoves)
    remClickedDisabled(computerMoves)
    replayBtn.style.display = 'none'
    playerScoreDisp.innerText = 'Player Score: 0'
    computerScoreDisp.innerText = 'Computer Score: 0'
})

function getComputerMove() {
    computerMove = options[Math.floor(Math.random() * 3)]
}

function playerHasWon(player, computer) {
    return (
        (player === "✊" && computer === "✌️") ||
        (player === "🤚" && computer === "✊") ||
        (player === "✌️" && computer === "🤚")
    )
}

function isTie(player, computer) {
    return (
        (player === "✊" && computer === "✊") ||
        (player === "🤚" && computer === "🤚") ||
        (player === "✌️" && computer === "✌️")
    )
}

function disablePlayerButtons(button) {
    playerMoves.forEach((btn) => {
        if (button !== btn) {
            btn.disabled = true
        }
    })
}

function disableComputerButtons(computerMove) {
    computerMoves.forEach((btn) => {
        if (btn.innerText !== computerMove) {
            btn.disabled = true
        } else {
            btn.classList.add('clicked')
        }
    })
}

function repeatPlay() {
    setTimeout(() => {
        displayPar.innerText = 'Choose Your Move'
        remClickedDisabled(playerMoves)
        remClickedDisabled(computerMoves)
    }, 1500)
}

function remClickedDisabled(moves) {
    moves.forEach((btn) => {
        if (btn.disabled) {
            btn.disabled = false
        } else {
            btn.classList.remove('clicked')
        }
    })
}

function checkGameOver() {
    if (computerScore === 3 || playerScore === 3) {
        replayBtn.style.display = 'block'
        displayPar.innerText = (computerScore === 3) ? "***** SORRY!! YOU LOST *****" : "***** HURRAY!! YOU WON *****"
    } else {
        repeatPlay()
    }
}