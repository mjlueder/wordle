/*-------------------------------- Constants --------------------------------*/

import { getWord } from "./words.js"
import { checkWord } from "./words.js"
// import list of words

const allowedChars = ""

/*---------------------------- Variables (state) ----------------------------*/

let answer, guess, currentRow, currentCol

// console.log(checkWord);


/*------------------------ Cached Element References ------------------------*/

// const inputEl = document.querySelector('input')

// const submitBtnEl = document.getElementById('submit-btn')

const boardEl = document.querySelector('.board')

const keyboardEl = document.querySelector('.keyboard')

const rowEls = document.querySelectorAll('.row')


/*----------------------------- Event Listeners -----------------------------*/

// submitBtnEl.addEventListener('click', submit)

// document.querySelector('body').addEventListener('keydown',(evt) =>{console.log(evt.key);})

document.querySelector('body').addEventListener('keydown', typeLetter)

keyboardEl.addEventListener('click', useKeys)

/*-------------------------------- Functions --------------------------------*/

console.log(rowEls)
console.log(rowEls[0]);
console.log(rowEls[0].children);
console.log(rowEls[0].children[0]);

rowEls[0].children[0].textContent = 'A'
rowEls[1].children[2].textContent = 'B'

currentRow = 4
currentCol = 0

// rowEls[currentRow].children[currentCol].textContent = 'C'

let guessArr = []

function useKeys(evt){
  // below: add exception for enter key (if currentCol === 5 && evt.target.id = 'enter')
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
  rowEls[currentRow].children[currentCol].textContent = evt.target.id
  currentCol++
  guessArr.push(evt.target.id)
  console.log(guessArr);
}

function typeLetter(evt){
  // add delete & enter .which values
  // return evt.which = 13
  // delete evt.which = 8
  if (evt.which === 8){
    if (currentCol === 0) return
    currentCol--
    rowEls[currentRow].children[currentCol].textContent = ''
    guessArr.pop()
    console.log(guessArr);
    return
  }
  if (evt.which < 65 || evt.which > 90) return
  // below: add exception for enter key (if currentCol === 5 && evt.key = 'enter')
  if (currentCol === 5) return
  // console.log(evt.key);
  rowEls[currentRow].children[currentCol].textContent = evt.key.toUpperCase()
  currentCol++
  guessArr.push(evt.key)
  console.log(guessArr);
}


function init(){
  currentRow = 0
  currentCol = 0
  guessArr = []
  // clear board letters & styling
  render()
}

function getRandomWord(){

}

function handleGuess(){
  checkGuess() 
}

function checkGuess(){
  // check word length
  // check for letter characters only
  // change guess to lower or upper case
  // compare guess to list of approved words
  // reject if guess is not a word, if it is too long, or if it has non-letters
  // if it is an acceptable word, compare guess to answer
}

function compareGuess(){
  // split guess into an array
  // compare each index
  // how to handle this information? 
}

function updateBoard(){

}








function colorBoard(){
  
}

function colorKeyboard(){

}

function checkForWin(){
  // if guess === answer, animation, win message?
}

function checkForLoss(){
  // if all values in the guesses array are !== null, display correct answer and "play again?" button
}

function render(){

}