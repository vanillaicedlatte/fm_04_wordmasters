let wordChoice = [];
let initialIndex = 0;
let wordOfTheDayLetters = [];
let isLoading;
let validWord;
let validWordBool;

// get the word of the day from API
isLoading = true;
async function fetchWordOfTheDay() {
  const apiUrl = "https://words.dev-apis.com/word-of-the-day";
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const wordOfTheDay = data.word;
    console.log(wordOfTheDay);
    wordOfTheDayLetters = wordOfTheDay.split("");

  } catch (error) {
    console.error("Error fetching word of the day:", error.message);
  }
}

isLoading = false;

fetchWordOfTheDay();

// wait until all page content is loaded
document.addEventListener('DOMContentLoaded', function () {

  // select all of the inputs on the page
  let letterInputs = document.querySelectorAll(".letter-input");

  // loop through each input object and wait for input text
  letterInputs.forEach((input, index, array) => {
    input.addEventListener("input", function (event) {
      if (isLetter(event.data)) {
        // if it's not input in the last column, then move to the next input object and focus
        if (index !== 4 && index !== 9 && index !== 14 && index !== 19 && index !== 24 && index !== 29) {
          array[index + 1].focus();
        }
      }
    });

    // keydown event for backspace
    input.addEventListener("keydown", function (event) {
      if (event.key === "Backspace") {
        // if the input value is not empty, then delete what's in there
        if (input.value !== "") {
          input.value = "";
        // if the input object is in the last column, not allow backspace
        } else if (index == 0 || index == 5 || index == 10 || index == 15 || index == 20 || index == 25) {
          event.preventDefault();
        // after user presses delete while in an empty input object, it will go back to the one before it and erase its value
        } else if (index > 0) {
          array[index - 1].focus();
          array[index - 1].select();
          array[index - 1].value = "";
        }
        // otherwise, don't allow backspace
        event.preventDefault();
      }

      if (!isLetter(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
        event.preventDefault();
      }
    });
  });

  // after entering a value, move to the next input and focus
  letterInputs[0].focus();
});

// event listener for Enter
document.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {

    // select all of the inputs on the page
    let letterInputs = document.querySelectorAll(".letter-input");

    // if the current input is the last item in the row and does not have an empty value
    if (letterInputs[initialIndex + 4].value !== "") {

      // map the word of the day
      const map = makeMap(wordOfTheDayLetters);

      // add the letter input to the word choice variable
      for (i = initialIndex; i < initialIndex + 5; i++) {
        wordChoice += letterInputs[i].value;
        // set all inputs in the row to readonly
        letterInputs[i].setAttribute("readonly", "readonly");
      }

      console.log(wordChoice);

    // validate word

async function validateIsWord() {

  // Define validateWord as an async function
  async function validateWord(wordChoice) {
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: wordChoice }),
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;
    validWordBool = validWord;

    // Do something with validWord if needed
    console.log(validWord);
  }

  // Call validateWord with a specific word or provide wordChoice from an external source
  await validateWord(wordChoice);
}

// Call the validateIsWord function
await validateIsWord(wordChoice);

console.log(validWord);

if (validWordBool === true) {
      // split the word choice into an array of letters to match to the word of the day
      wordChoiceLetters = wordChoice.split("");

      // reset counter so that it only loops 5 times, since the index of the inputs goes up to 29
      counter = 0;

      for (i = initialIndex; i < initialIndex + 5; i++) {
        // if the letters in the word choice matches the word of the day, change the input to green and decrement the mapped object count
        if (wordChoiceLetters[counter] == wordOfTheDayLetters[counter]) {
          letterInputs[i].classList.add("green");
          map[wordChoiceLetters[counter]]--;
        }
        // increment the counter for the loop
        counter++;
      }

      counter = 0;
      for (i = initialIndex; i < initialIndex + 5; i++) {
        // if the word choice letters match the word of the day letters, do nothing
        if (wordChoiceLetters[counter] == wordOfTheDayLetters[counter]) {
          
          // if the word of the day includes any letters that match the word choice
          // and the mapped object count is more than zero, change the input to yellow and decrement the mapped object count
        } else if ( wordOfTheDayLetters.includes(wordChoiceLetters[counter]) && map[wordChoiceLetters[counter]] > 0 ) {
          letterInputs[i].classList.add("yellow");
          map[wordChoiceLetters[counter]]--;
        } else {
          // otherwise, make the input grey
          letterInputs[i].classList.add("grey");
        }
        counter++;
      }

      // if it's on the last row and the word choice does not equal the word of the day, initiate lost event
      if (initialIndex === 25 && wordChoiceLetters.some((letter, index) => letter != wordOfTheDayLetters[index])) {
        youLost = document.querySelector(".you-lost");
        youLost.innerText = `You lost! You did not guess the word of the day.`
        youLost.classList.remove("hidden");
      }

      // if the word choice letters match the word of the day letters, trigger the won event
      if (wordChoiceLetters.every((letter, index) => letter === wordOfTheDayLetters[index])) {
        youWon = document.querySelector(".you-won");
        youWon.innerText = `You won! That was the word of the day.`
        youWon.classList.remove("hidden");
        endGame();
      } else {
        
      }      

      // reset the word choice and initial index
      wordChoice = "";
      initialIndex = initialIndex + 5;

      // check if the initial index is not the last item in the array
      // if it's not, then focus on the initial index
      if (initialIndex !== 30) {
        letterInputs[initialIndex].focus();
        letterInputs[initialIndex].select();
      } 
    } else if (validWordBool === false) {
      // delete last 5 values
      deleteRow();
      alert("Not a valid word");
    }

  } else if (letterInputs[initialIndex].value === "") {
    // if the user hits enter while any inputs are blank, they will be warned they have to enter a value
    alert("You have to enter a value");
  }

} 

});

// is letter function
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

// rounds the index up to 5 to keep track of the items to enable looping through rows of 5
function round5(x) {
  return Math.ceil(x / 5) * 5;
}

// maps the word of the day into an object to count how many of each letter in the word there are
function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}

// when the game ends, mark all of the inputs to readonly to prevent editing inputs and deselect all inputs
function endGame() {
  let letterInputs = document.querySelectorAll(".letter-input");

  letterInputs.forEach((input, index, array) => {
    input.setAttribute("readonly", "readonly");
    setTimeout(() => {
      input.blur();
    }, 0);
  });
}

if (isLoading) {
  document.querySelector(".loading").classList.remove("hidden");
} else {
  document.querySelector(".loading").classList.add("hidden");
}

function deleteRow() {
  let letterInputs = document.querySelectorAll(".letter-input");
  initialIndex = initialIndex + 5;
  console.log(initialIndex);
    for (i = initialIndex; i > initialIndex - 6; i--) {
       letterInputs[i].value = "";
       letterInputs[i].removeAttribute("readonly", "readonly");
    }
    letterInputs[initialIndex - 5].focus();
    letterInputs[initialIndex - 5].select();
    wordChoice = "";
    initialIndex = initialIndex - 5;

}