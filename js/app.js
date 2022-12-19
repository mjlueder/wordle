/*-------------------------------- Constants --------------------------------*/

import { getWord } from "./words.js"
import { checkWord } from "./words.js"

// console.log(getWord(1));

/*---------------------------- Variables (state) ----------------------------*/

let answer, guess, currentRow, currentCol, win

let guessArr = []
let aArr = []


/*------------------------ Cached Element References ------------------------*/


const boardEl = document.querySelector('.board')
const keyboardEl = document.querySelector('.keyboard')
const rowEls = document.querySelectorAll('.row')
const messageEl = document.getElementById('message')
const resetEl = document.getElementById('reset-btn')



/*----------------------------- Event Listeners -----------------------------*/

// submitBtnEl.addEventListener('click', submit)

// document.querySelector('body').addEventListener('keydown',(evt) =>{console.log(evt.key);})

document.querySelector('body').addEventListener('keydown', typeLetter)

keyboardEl.addEventListener('click', useKeys)

resetEl.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

// console.log(rowEls)
// console.log(rowEls[0]);
// console.log(rowEls[0].children);
// console.log(rowEls[0].children[0]);

// rowEls[0].children[0].textContent = 'A'
// rowEls[1].children[2].textContent = 'B'

// rowEls[currentRow].children[currentCol].textContent = 'C'


init()

function init(){
  currentRow = 0
  currentCol = 0
  guessArr = []
  win = false
  answer = getWord(1)
  aArr = answer.split('')
  clearBoard()
  render()
  // console.log('row ', currentRow)
  // console.log('col ', currentCol)
  // console.log('guessArr ', guessArr)
  console.log(answer);
}

function clearBoard(){
  resetEl.style.display = 'none'
  messageEl.textContent = ''
  // clear board classes
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
      if (rowEls[r].children[c].classList.contains('animate__animated')){
        rowEls[r].children[c].classList.remove('animate__animated')
      }
      if (rowEls[r].children[c].classList.contains('animate__flipInX')){
        rowEls[r].children[c].classList.remove('animate__flipInX')
      }
    }
  }
  // clear keyboard classes
  let alphabet = "abcdefghijklmnopqrstuvwxyz"
  for (let i = 0; i < alphabet.length; i++){
    if (document.getElementById(alphabet[i]).classList.contains('right')){
      document.getElementById(alphabet[i]).classList.remove('right')
    }
    if (document.getElementById(alphabet[i]).classList.contains('almost-right')){
      document.getElementById(alphabet[i]).classList.remove('almost-right')
    }
    if (document.getElementById(alphabet[i]).classList.contains('wrong')){
      document.getElementById(alphabet[i]).classList.remove('wrong')
    }
  }
}

function useKeys(evt){
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
  // console.log(guessArr);
}

function typeLetter(evt){
  if (win === false ) messageEl.textContent = ''
  if (win === true) return
  // return evt.which = 13
  // delete evt.which = 8
  if (currentCol === 5 && evt.which === 13) {
    handleGuess()
  }
  if (evt.which === 8){
    if (currentCol === 0) return
    currentCol--
    rowEls[currentRow].children[currentCol].textContent = ''
    guessArr.pop()
    console.log(guessArr);
    return
  }
  if (evt.which < 65 || evt.which > 90) return
  if (currentCol === 5) return
  // console.log(evt.key);
  rowEls[currentRow].children[currentCol].textContent = evt.key.toUpperCase()
  currentCol++
  guessArr.push(evt.key)
  // console.log(guessArr);
}




function handleGuess(){
  guess = guessArr.join('').toLowerCase()
  
    if (checkWord(guess) !== true) {
      console.log('rejected');
      messageEl.textContent = 'Not a word'
      rowEls[currentRow].classList.add('animate__animated', 'animate__headShake')
      // only allow 'delete'
      rowEls[currentRow].addEventListener('animationend', () => rowEls[currentRow].classList.remove('animate__animated', 'animate__headShake'))
      return
    } else {
      compareLetters(guess, answer)
    }
}


function compareLetters(guess, answer){
  aArr = answer.split('')
  let gArr = guess.split('')
  // compares guess and answer letters. removes letter from answer array, changes tile to green

  // green letters (right letter, right spot)
  for (let i = 0; i < gArr.length; i++){
    let r = currentRow
    if (gArr[i] === aArr[i]) {
      //board
      setTimeout(() => {rowEls[r].children[i].classList.add("right")}, i*900)
      // keyboard
      let x = rowEls[r].children[i].textContent.toLowerCase()
      document.getElementById(x).classList.add("right")
      console.log(x, ' = green');
      aArr[i] = 0
      gArr[i] = 0
    }
  }

  // yellow letters: in the word, not in the right place
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
        console.log(`${x} = 'right': ${document.getElementById(x).classList.contains("right")}`);
        document.getElementById(x).classList.add("almost-right")
      }
    }
  }

  // wrong letters: keyboard only
  for(let i = 0; i < 5; i++){
    let r = currentRow
    if (rowEls[r].children[i].classList.contains('right') || rowEls[r].children[i].classList.contains('almost-right')) {
      console.log(i, ' already green or yellow');
    }
    else {
      console.log('else: ');
      let x = rowEls[r].children[i].textContent.toLowerCase()
      console.log(x, 'should be wrong');
      if ((document.getElementById(x).classList.contains))
      document.getElementById(x).classList.add("wrong")
    }
  }

  animateTiles()
  checkWin()
  checkLoss()
  // timeout so row doesn't change during tile flip animation
  currentRow++
  currentCol = 0
  guessArr = []
}

function animateTiles(){
  let r = currentRow
  rowEls[currentRow].children[0].classList.add('animate__animated', 'animate__flipInX')
  setTimeout(() => {rowEls[r].children[1].classList.add('animate__animated', 'animate__flipInX')}, 900)
  setTimeout(() => {rowEls[r].children[2].classList.add('animate__animated', 'animate__flipInX')}, 1800)
  setTimeout(() => {rowEls[r].children[3].classList.add('animate__animated', 'animate__flipInX')}, 2700)
  setTimeout(() => {rowEls[r].children[4].classList.add('animate__animated', 'animate__flipInX')}, 3600)
}

function checkWin(){
  if (guess === answer) {
    // console.log('win!');
    messageEl.textContent = 'You win!   '
    win = true
    resetEl.style.display = ''
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

function render(){

}