/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/

let answer, guess, currentRow


const board = [] // SOURCE  OF TRUTH!

/*------------------------ Cached Element References ------------------------*/

const inputEl = document.querySelector('input')

const submitBtnEl = document.getElementById('submit-btn')

const boardEl = document.querySelector('.board')

const keyboardEl = document.querySelector('.keyboard')

/*----------------------------- Event Listeners -----------------------------*/

submitBtnEl.addEventListener('click', submit)

// document.querySelector('body').addEventListener('keydown',(evt) =>{console.log(evt.key);})

/*-------------------------------- Functions --------------------------------*/


function submit(){
  console.log(submitBtnEl.value);
}




function init(){
  board = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ]
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

function placeLetters(){
  // make each index of the guess the value(?) of the corresponding square
  // how do we handle going down rows?
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