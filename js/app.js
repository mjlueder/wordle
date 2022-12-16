/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/

let answer, guess, currentRow, currentCol


const board = [] // SOURCE  OF TRUTH!

/*------------------------ Cached Element References ------------------------*/

// const inputEl = document.querySelector('input')

// const submitBtnEl = document.getElementById('submit-btn')

const boardEl = document.querySelector('.board')

const keyboardEl = document.querySelector('.keyboard')

const rowEls = document.querySelectorAll('.row')


/*----------------------------- Event Listeners -----------------------------*/

// submitBtnEl.addEventListener('click', submit)

// document.querySelector('body').addEventListener('keydown',(evt) =>{console.log(evt.key);})

document.querySelector('body').addEventListener('keydown', placeLetter)

keyboardEl.addEventListener('click', testKeys)

/*-------------------------------- Functions --------------------------------*/

console.log(rowEls)
console.log(rowEls[0]);
console.log(rowEls[0].children);
console.log(rowEls[0].children[0]);

rowEls[0].children[0].textContent = 'A'
rowEls[1].children[2].textContent = 'B'


currentRow = 3
currentCol = 4

rowEls[currentRow].children[currentCol].textContent = 'C'

// DELETE, testing
// function submit(){
//   console.log(inputEl.value);
// }

function testKeys(evt){
  // console.log(evt.target.id);
  rowEls[1].children[1].textContent = evt.target.id

}

function placeLetter(evt){
  console.log(evt.key);
  rowEls[0].children[2].textContent = evt.key.toUpperCase()
  // make each index of the guess the value(?) of the corresponding square
  // how do we handle going down rows?
}


function init(){
  currentRow = 0
  currentCol = 0
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