const winningCombinations = [
    ['rock', 'scissor'], 
    ['paper', 'rock'], 
    ['scissor', 'paper']
]

const computerPossibilities = ['rock', 'paper', 'scissor']

document.querySelector('input').onclick = function() {
    if(document.querySelector('input').checked) {
        document.getElementById('userInputContainer').style.border = '4px solid #424242'
    } else {
        document.getElementById('userInputContainer').style.border = 'none'
    }
}


const handleClick = function() {
    const input = event.target.id
    let computer = computerPossibilities[Math.floor(Math.random() * 3)]
    let winner = checkWinner(input, computer)
    const isVisible = document.querySelector('input').checked
    if(!isVisible) {
        for(let i = 0; i < winningCombinations.length; i++) {
            if(winningCombinations[i][1] === input) {
                computer = winningCombinations[i][0]
            }
        }
        winner = checkWinner(input, computer)
    } 
    displayCharacters(input, computer)
    winnerAnimation(winner)
}

function checkWinner(input, computer) {
    for(let i = 0; i < winningCombinations.length; i++) {
        if(input === winningCombinations[i][0]) {
            if(computer === winningCombinations[i][1]) {
                return 0
            }
        } else if(computer === winningCombinations[i][0]) {
            if(input === winningCombinations[i][1]) {
                return 1
            }
        } 
    }
    return 2
}

function displayCharacters(input, computer) {
    if(input === 'rock') {
        document.getElementById("userWarriorSimble").innerHTML = '&#9994;&#127996;'
    } else if(input === 'paper') {
        document.getElementById("userWarriorSimble").innerHTML = '&#9995;&#127996;'
    } else {
        document.getElementById("userWarriorSimble").innerHTML = '&#9996;&#127996;'
    }
    if(computer === 'rock') {
        document.getElementById("computerWarriorSimble").innerHTML = '&#9994;&#127996;'
    } else if(computer === 'paper') {
        document.getElementById("computerWarriorSimble").innerHTML = '&#9995;&#127996;'
    } else {
        document.getElementById("computerWarriorSimble").innerHTML = '&#9996;&#127996;'
    }
}

function winnerAnimation(winner) {
    if(winner === 0) {
        document.getElementById('battleText').style.display = 'none'
        document.getElementById('userWarriorContainer').setAttribute('class', 'winner')
        document.getElementById('userWarriorName').innerText = 'Vencedor'
        document.getElementById('computerWarriorContainer').setAttribute('class', 'toRight')
        document.getElementById('computerWarriorName').innerText = 'Máquina'
    } else if(winner === 1) {
        document.getElementById('battleText').style.display = 'none'
        document.getElementById('computerWarriorContainer').setAttribute('class', 'winner')
        document.getElementById('computerWarriorName').innerText = 'Vencedor'
        document.getElementById('userWarriorContainer').setAttribute('class', 'toLeft')
        document.getElementById('userWarriorName').innerText = 'Você'
    } else if(winner === 2) {
        document.getElementById('battleText').style.display = ''
        document.getElementById('battleText').innerText = "Empate"
        document.getElementById('userWarriorName').innerText = 'Você'
        document.getElementById('computerWarriorName').innerText = 'Máquina'
        document.getElementById('battleText').setAttribute('class', 'draw')
        document.getElementById('userWarriorContainer').setAttribute('class', 'toLeft')
        document.getElementById('computerWarriorContainer').setAttribute('class', 'toRight')
    }
}

const userInput = document.querySelectorAll('li')

for( let i = 0; i < userInput.length; i++) {
    userInput[i].addEventListener('click', handleClick)
}