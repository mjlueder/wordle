/*-------------------------------- Constants --------------------------------*/

import { getWord } from "./words.js"
import { checkWord } from "./words.js"

// console.log(getWord(1));

/*---------------------------- Variables (state) ----------------------------*/

let answer, guess, currentRow, currentCol

let guessArr = []


/*------------------------ Cached Element References ------------------------*/


const boardEl = document.querySelector('.board')

const keyboardEl = document.querySelector('.keyboard')

const rowEls = document.querySelectorAll('.row')


/*----------------------------- Event Listeners -----------------------------*/

// submitBtnEl.addEventListener('click', submit)

// document.querySelector('body').addEventListener('keydown',(evt) =>{console.log(evt.key);})

document.querySelector('body').addEventListener('keydown', typeLetter)

keyboardEl.addEventListener('click', useKeys)

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
  answer = getWord(1)
  // clear board letters & styling
  render()
  console.log('row ', currentRow)
  console.log('col ', currentCol)
  console.log('guessArr ', guessArr)
  console.log(answer);
}

function useKeys(evt){
  // below: add exception for enter key (if currentCol === 5 && evt.target.id = 'enter')
  if (currentCol === 5 && evt.target.id === 'enter') {
    handleGuess(guessArr)
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
  // add animation?
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
  if (currentCol === 5 && evt.which === 13) {
    handleGuess(guessArr)
    return
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
  // below: add exception for enter key (if currentCol === 5 && evt.key = 'enter')
  if (currentCol === 5) return
  // console.log(evt.key);
  rowEls[currentRow].children[currentCol].textContent = evt.key.toUpperCase()
  currentCol++
  guessArr.push(evt.key)
  console.log(guessArr);
}




//getWord

//checkWord  ** make guess lowercase **


function handleGuess(guessArr){
  //checkWord
  console.log('handle guess is being called');
  guess = guessArr.join('').toLowerCase()
  console.log(guess);
  if (checkWord(guess)=== false) {
    rejectGuess()
  }
  // add rejection message/animation
  else if (guess === answer) {
    console.log('win!');
    //add win animation etc
  } else {
    compareLetters(guess, answer)
  }
}

function rejectGuess(){
  // keep function ?
}

function compareLetters(guess, answer){
  console.log(guess[0]);
  for (let i = 0; i < guess.length; i++){
    if (guess[i] === answer[i]) {
      console.log(`match at ${i}!`);
      rowEls[currentRow].children[i].classList.add("right")
      // changes div color to green when letter is right
      let x = rowEls[currentRow].children[i].textContent.toLowerCase()
      console.log(x);
      document.getElementById(x).classList.add("right")
    }
  }
  currentRow++
  currentCol = 0
  guessArr = []
}

function updateBoard(){

}

function colorBoard(){
  
}

function colorKeyboard(){

}

function checkForLoss(){
  // if all values in the guesses array are !== null, display correct answer and "play again?" button
}

function render(){

}