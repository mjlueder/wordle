/*-------------------------------- Constants --------------------------------*/
import { getWord } from "./words.js"
import { checkWord } from "./words.js"
/*---------------------------- Variables (state) ----------------------------*/
let answer, guess, currentRow, currentCol, win, answerPicked
let guessArr = []
let gArr = []
let aArr = []
/*------------------------ Cached Element References ------------------------*/
const keyboardEl = document.querySelector('.keyboard')
const rowEls = document.querySelectorAll('.row')
const messageEl = document.getElementById('message')
const resetEl = document.getElementById('reset-btn')
const muteBtnEl = document.getElementById('sound')
const levelEls = document.getElementById('levels')
/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('body').addEventListener('keydown', typeLetter)
keyboardEl.addEventListener('click', useKeys)
resetEl.addEventListener('click', init)
muteBtnEl.addEventListener('click', manageAudio)
levelEls.addEventListener('click', chooseLevel)
/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  answerPicked = false
  clearTimeouts()
  messageEl.textContent = "Choose Game Difficulty"
  levelEls.style.display = ''
  currentRow = 0
  currentCol = 0
  guessArr = []
  win = false
  clearBoard()
}

function clearTimeouts(){
  let id = setTimeout(() => {}, 0)
  for (let i = 0; i < id; i++){
    clearTimeout(i)
  }
}

function chooseLevel(evt){
  if (evt.target.id === 'levels') return
  if (evt.target.id === 'surprise'){
    let x = Math.floor(Math.random() * 5 + 1)
    answer = getWord(x)
  } else {
    let x = parseInt(evt.target.id[0])
    answer = getWord(x)
  }
  aArr = answer.split('')
  console.log(answer);
  levelEls.style.display = 'none'
  messageEl.textContent = 'Guess a 5-letter word!'
  answerPicked = true
}

function clearBoard(){
  resetEl.style.display = 'none'
  // clear board tile color and animation classes
  for (let r = 0; r < 6; r++){
    for (let c = 0; c < 5; c++){
      if (rowEls[r].children[c].textContent !== ''){
        rowEls[r].children[c].textContent = ''
      }
      if (rowEls[r].children[c].classList.contains('right')){
        rowEls[r].children[c].classList.remove('right')
      }
      if (rowEls[r].children[c].classList.contains('almost-right')){
        rowEls[r].children[c].classList.remove('almost-right')
      }
      if (rowEls[r].children[c].classList.contains('wrong-tile')){
        rowEls[r].children[c].classList.remove('wrong-tile')
      }
      if (rowEls[r].children[c].classList.contains('animate__animated', 'animate__flipInX')){
        rowEls[r].children[c].classList.remove('animate__animated', 'animate__flipInX')
      }
    }
  }
  // clear keyboard color class
  let alphabet = "abcdefghijklmnopqrstuvwxyz"
  for (let i = 0; i < alphabet.length; i++){
    if (document.getElementById(alphabet[i]).classList.contains('right')){
      document.getElementById(alphabet[i]).classList.remove('right')
    }
    if (document.getElementById(alphabet[i]).classList.contains('almost-right')){
      document.getElementById(alphabet[i]).classList.remove('almost-right')
    }
    if (document.getElementById(alphabet[i]).classList.contains('wrong-key')){
      document.getElementById(alphabet[i]).classList.remove('wrong-key')
    }
  }
  // clear row 'win' animation
  for (let i = 0; i < 6; i++) {
    if (rowEls[i].classList.contains('animate__animated', 'animate__flash')){
      rowEls[i].classList.remove('animate__animated', 'animate__flash')
    }
  }
  // clear difficulty message animation
  if (messageEl.classList.contains('animate__animated', 'animate__flash')) {
    messageEl.classList.remove('animate__animated', 'animate__flash')
  }
}

function useKeys(evt){
  if (answerPicked === false) {
    messageEl.classList.add('animate__animated', 'animate__flash')
    return
  }
  if (win === false ) messageEl.textContent = ''
  if (win === true) return
  if (currentCol === 5 && evt.target.id === 'enter') {
    handleGuess()
  }
  if (evt.target.id === 'delete'){
    if (currentCol === 0) return
    currentCol--
    rowEls[currentRow].children[currentCol].textContent = ''
    guessArr.pop()
    console.log(guessArr);
    return
  }
  if (currentCol === 5) return
  if (evt.target.id === 'enter' || evt.target.id === '') return
  rowEls[currentRow].children[currentCol].textContent = evt.target.id.toUpperCase()
  currentCol++
  guessArr.push(evt.target.id)
}

function typeLetter(evt){
  if (answerPicked === false) {
    messageEl.classList.add('animate__animated', 'animate__flash')
    return
  }
  if (win === false ) messageEl.textContent = ''
  if (win === true) return
  // return evt.which = 13, delete evt.which = 8
  if (currentCol === 5 && evt.which === 13) {
    handleGuess()
  }
  if (evt.which === 8){
    if (currentCol === 0) return
    currentCol--
    rowEls[currentRow].children[currentCol].textContent = ''
    guessArr.pop()
    return
  }
  if (evt.which < 65 || evt.which > 90) return
  if (currentCol === 5) return
  rowEls[currentRow].children[currentCol].textContent = evt.key.toUpperCase()
  currentCol++
  guessArr.push(evt.key)
}

function handleGuess(){
  guess = guessArr.join('').toLowerCase()
  if (checkWord(guess) !== true) {
    messageEl.textContent = 'Not a word'
    rowEls[currentRow].classList.add('animate__animated', 'animate__headShake')
    rowEls[currentRow].addEventListener('animationend', () => rowEls[currentRow].classList.remove('animate__animated', 'animate__headShake'))
    return
  } else {
    compareLetters(guess, answer)
  }
}

function compareLetters(guess, answer){
  aArr = answer.split('')
  gArr = guess.split('')
  greenLetters()
  yellowLetters()
  wrongLetters()
  animateTiles()
  progressGame()
}

function progressGame(){
  checkWin()
  checkLoss()
  currentRow++
  currentCol = 0
  guessArr = []
}

function greenLetters(){
  for (let i = 0; i < gArr.length; i++){
    let r = currentRow
    if (gArr[i] === aArr[i]) {
      // board
      setTimeout(() => {rowEls[r].children[i].classList.add("right")}, i*900)
      // keyboard
      let x = rowEls[r].children[i].textContent.toLowerCase()
      document.getElementById(x).classList.add("right")
      aArr[i] = 0
      gArr[i] = 0
    }
  }
}

function yellowLetters(){
  for (let i = 0; i < gArr.length; i++){
    let r = currentRow
    let idx = aArr.findIndex(function(el){
      return (el !== 0 && el === gArr[i])
    })
    if (idx !== -1) {
      aArr[idx] = 0
      // board
      setTimeout(() => {rowEls[r].children[i].classList.add("almost-right")}, i*900)
      // keyboard
      let x = rowEls[r].children[i].textContent.toLowerCase()
      if (document.getElementById(x).classList.contains("right") === false){
        document.getElementById(x).classList.add("almost-right")
      }
    }
  }
}

function wrongLetters(){
  for(let i = 0; i < 5; i++){
    let r = currentRow
    if (rowEls[r].children[i].classList.contains('right') || rowEls[r].children[i].classList.contains('almost-right')) {
    }
    else {
      setTimeout(() => {rowEls[r].children[i].classList.add('wrong-tile')}, i*900)
      let x = rowEls[r].children[i].textContent.toLowerCase()
      if ((document.getElementById(x).classList.contains))
      document.getElementById(x).classList.add("wrong-key")
    }
  }
}

function animateTiles(){
  let r = currentRow
  rowEls[currentRow].children[0].classList.add('animate__animated', 'animate__flipInX')
  playFlip()
  setTimeout(() => {
    rowEls[r].children[1].classList.add('animate__animated', 'animate__flipInX')
    playFlip()
  }, 900)
  setTimeout(() => {
    rowEls[r].children[2].classList.add('animate__animated', 'animate__flipInX')
    playFlip()
  }, 1800)
  setTimeout(() => {
    rowEls[r].children[3].classList.add('animate__animated', 'animate__flipInX')
    playFlip()
  }, 2700)
  setTimeout(() => {
    rowEls[r].children[4].classList.add('animate__animated', 'animate__flipInX')
    playFlip()
  }, 3600)
}

function checkWin(){
  let r = currentRow
  if (guess === answer) {
    win = true
    setTimeout(() => {
      messageEl.textContent = 'You win!   '
      resetEl.style.display = ''
      rowEls[r].classList.add('animate__animated', 'animate__flash')
    }, 4000)
    return
  }
}

function checkLoss(){
  if (currentRow === 5 && win === false) {
    messageEl.textContent = `The answer was ${answer.toUpperCase()}  `
    resetEl.style.display = ''
    return
  }
}

let flip = new Audio('../assets/flip.mp3')

function playFlip(){
  flip.play()
}

function manageAudio() {
  // prevent double activation via 'enter' keydown
  muteBtnEl.blur()
  if (muteBtnEl.textContent === '🔕'){
    flip.volume = 0
    muteBtnEl.textContent = '🔔'
  } else if (muteBtnEl.textContent === '🔔'){
    flip.volume = .25
    muteBtnEl.textContent = '🔕'
  }
}