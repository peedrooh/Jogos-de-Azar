const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const setOfWords = ['cachorro', 'grama', 'placa', 'carro', 'bola', 'jogador', 'lagoa', 'residencia', 'janela', 'carteira', 'celular', 'banco', 'faculdade', 'poste', 'lixeira', 'tampa', 'refri', 'escada', 'bala', 'caminho']
let answer = generateWords(setOfWords)
createGame()

function createGame() {
    let tableContent = generateTableContent(alphabet)
    tableContent = mergeWith(answer, tableContent)
    insertTableContent(tableContent)
    insertWords(answer)
}

function generateWords(arr) {
    let words = []
    let randomWords = arr.slice()
    let j = 19
    for(let i = 0; i < 3; i++) {
        const num = Math.floor(Math.random() * j)
        j--
        words[i] = randomWords[num]
        randomWords.splice(num, 1)
    }
    return words
}

function generateTableContent(str) {
    let tableContent = []
    for(let i = 0; i < 10; i++) {
        tableContent[i] = []
        for(let j = 0; j < 10; j++){
            tableContent[i][j] = str.split('')[Math.floor(Math.random() * 26)]
        }
    }
    return tableContent
}

function mergeWith(words, tableContent) {
    let positions = []
    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let m = 9
    for (let i = 0; i < words.length; i++) {
        positions[i] = []
        for(let j = 0; j < 2; j++) {
            const random = Math.floor(Math.random() * m)
            m--
            positions[i][0] = num[random]
            num.splice(random, 1)
            positions[i][1] = Math.floor(Math.random() * (11 - words[i].length))
        }
    }
    for( let i = 0; i < positions.length; i++) {
        let k = 0
        for(let j = positions[i][1]; j < positions[i][1] + words[i].length; j++) {
            tableContent[positions[i][0]][j] = words[i][k]
            k++
        }
    }
    return tableContent
}

function insertTableContent(tableContent) {
    let num
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            num = i + '' + j
            if( i < 1) {
                num = '' + j
            }
            document.getElementById(`${num}`).innerText = tableContent[i][j]
        }
    }
}

function insertWords(words) {
    for(let i = 0; i < words.length; i++) {
        const id = 'word' + (i + 1)
        document.getElementById(id).innerText = words[i]
    }
}

let currentUserSelection = []
let userAnswer = []
let numberOfSelections = 0
let win = false

function handleClick() {
    if(currentUserSelection.length === 0 && win === false) {
        currentUserSelection[0] = parseInt(event.target.id)
        highligth(currentUserSelection)
    } else if(currentUserSelection.length === 1 && win === false) {
        currentUserSelection[1] = parseInt(event.target.id)
        userAnswer[numberOfSelections] = currentUserSelection
        numberOfSelections++
        highligth(currentUserSelection)
        currentUserSelection = []
    }
    if(userAnswer.length === 3 && win === false) {
        let message = createMessage(win)
        if(isWinner(userAnswer)) {
            win = true
            message = createMessage(win)
            displayMesage(message, 'win')
            return
        }
        displayMesage(message, '')
        deleteHighligth()
        userAnswer = []
        numberOfSelections = 0
    }
}

function highligth(arr) {
    if(arr.length === 1) {
        document.getElementById(arr[0]).style.backgroundColor = 'yellow'
    } else if (arr.length === 2) {
        arr.sort()
        for(let i = arr[0]; i <= arr[1]; i++) {
            document.getElementById(i).style.backgroundColor = 'yellow'
        }
    }
}

function deleteHighligth() {
    for(let i = 0; i < 100; i++) {
        document.getElementById(i).style.backgroundColor = '#F2D091'
    }
}

function createMessage(str) {
    return (str === true)? 'Parabéns, Você ganhou!':'Respostas incorretas. Tente Novamente'
}

function displayMesage(msg, clas) {
    document.getElementById("systemMessages").innerText = msg
    document.getElementById("systemMessages").setAttribute('class', clas)
}

function isWinner(userAnswer) {
    let answerCopy = answer.slice()
    for(let i = 0; i < answer.length; i++) {
       let word = []
       let k = 0
       userAnswer[i].sort()
        for(let j = userAnswer[i][0]; j <= userAnswer[i][1]; j++) {
            word[k] = document.getElementById(j).innerText
            k++
        }
        if(!answerCopy.includes(word.join(''))) {
            return false
        }
        answerCopy.splice(answerCopy.indexOf(word.join('')), 1)
    }
    return true
}

function restart() {
    deleteHighligth()
    message = 'Este é o jogo caça palavras. Ele consiste basicamente em achar as três palavras escondidas na tabela de letras abaixo. Para achar a palvra basta clicar na sua primeira e última letra. As palavras a serem encontradas são aquelas abaixo da tabela.'
    displayMesage(message, '')
    currentUserSelection = []
    userAnswer = []
    numberOfSelections = 0
    win = false
    answer = generateWords(setOfWords)
    createGame()
}

document.getElementById('restart').onclick = function() {
    restart()
}

const cells = document.querySelectorAll('td');

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}