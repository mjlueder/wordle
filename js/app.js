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
  win = false
  answer = getWord(1)
  aArr = answer.split('')
  // clear board letters & styling
  render()
  console.log('row ', currentRow)
  console.log('col ', currentCol)
  console.log('guessArr ', guessArr)
  console.log(answer);
}

function useKeys(evt){
  messageEl.textContent = ''
  if (win === true) return
  // below: add exception for enter key (if currentCol === 5 && evt.target.id = 'enter')
  if (currentCol === 5 && evt.target.id === 'enter') {
    handleGuess()
    // guess = guessArr.join('').toLowerCase()
    // console.log(guess);
    // if (checkWord(guess) !== true) {
    //   console.log('rejected');
    //   messageEl.textContent = 'Not a word'
    //   // only allow 'delete'
    //   return
    // } else {
    //   compareLetters(guess, answer)
    // }
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
  rowEls[currentRow].children[currentCol].textContent = evt.target.id.toUpperCase()
  currentCol++
  guessArr.push(evt.target.id)
  console.log(guessArr);
}

function typeLetter(evt){
  messageEl.textContent = ''
  if (win === true) return
  // add delete & enter .which values
  // return evt.which = 13
  // delete evt.which = 8
  if (currentCol === 5 && evt.which === 13) {
    handleGuess()
    // guess = guessArr.join('').toLowerCase()
    // console.log(guess);
    // if (checkWord(guess) !== true) {
    //   console.log('rejected');
    //   messageEl.textContent = 'Not a word'
    //   // only allow 'delete'
    //   return
    // } else {
    //   compareLetters(guess, answer)
    // }
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
  // console.log(guessArr);
}




function handleGuess(){
  //checkWord
  guess = guessArr.join('').toLowerCase()
    console.log(guess);
    if (checkWord(guess) !== true) {
      console.log('rejected');
      messageEl.textContent = 'Not a word'
      // only allow 'delete'
      return
    } else {
      compareLetters(guess, answer)
    }
}

function compareLetters(guess, answer){
  console.log('compareLetters');
  let gArr = guess.split('')
  let copyAArr = answer.split('')
  // console.log(gArr, aArr);
  // compares guess and answer letters. removes letter from answer array, changes tile to green
  for (let i = 0; i < gArr.length; i++){
    if (gArr[i] === copyAArr[i]) {
      // console.log(`match at ${i}!`);
      // console.log(aArr);
      rowEls[currentRow].children[i].classList.add("right")

      let x = rowEls[currentRow].children[i].textContent.toLowerCase()
      console.log(x);
      document.getElementById(x).classList.add("right")

      aArr[i] = 0
      console.log(aArr)
      console.log(copyAArr);
    }
  }

  if (guess === answer) {
    console.log('win!');
    messageEl.textContent = 'You win!'
    win = true
    return
  }

  if (currentRow === 5) {
    messageEl.textContent = `The answer was ${answer.toUpperCase()}`
    return
  }

  currentRow++
  currentCol = 0
  guessArr = []
}



function render(){

}