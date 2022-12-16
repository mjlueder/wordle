/*-------------------------------- Constants --------------------------------*/

// import list of words

const allowedChars = ""

/*---------------------------- Variables (state) ----------------------------*/

let answer, guess, currentRow, currentCol




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

function useKeys(evt){
  // console.log(evt.target.id);
  if (currentCol === 5) return
  rowEls[currentRow].children[currentCol].textContent = evt.target.id
  currentCol++
}

function typeLetter(evt){
  if (evt.which < 65 || evt.which > 90) return
  if (currentCol === 5) return
  // console.log(evt.key);
  rowEls[currentRow].children[currentCol].textContent = evt.key.toUpperCase()
  currentCol++
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