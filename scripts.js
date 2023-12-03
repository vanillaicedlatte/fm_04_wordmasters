let wordChoice = [];
let initialIndex = 0;
let wordOfTheDayLetters = [];

async function fetchWordOfTheDay() {
  const apiUrl = "https://words.dev-apis.com/word-of-the-day";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const wordOfTheDay = data.word;
    wordOfTheDayLetters = wordOfTheDay.split("");
    console.log("Word of the day letters:", wordOfTheDayLetters);

  } catch (error) {
    console.error("Error fetching word of the day:", error.message);
  }
}

fetchWordOfTheDay();

document.addEventListener('DOMContentLoaded', function () {
  let letterInputs = document.querySelectorAll(".letter-input");

  letterInputs.forEach((input, index, array) => {
    input.addEventListener("input", function (event) {
      if (isLetter(event.data)) {
        if (index !== 4 && index !== 9 && index !== 14 && index !== 19 && index !== 24 && index !== 29) {
          array[index + 1].focus();
        }
      }
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Backspace") {
        if (input.value !== "") {
          input.value = "";
        } else if (index == 0 || index == 5 || index == 10 || index == 15 || index == 20 || index == 25) {
          event.preventDefault();
        } else if (index > 0) {
          array[index - 1].focus();
          array[index - 1].select();
          array[index - 1].value = "";
        }
        event.preventDefault();
      }

      if (!isLetter(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
        event.preventDefault();
      }
    });
  });

  letterInputs[0].focus();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let letterInputs = document.querySelectorAll(".letter-input");
    if (letterInputs[initialIndex + 4].value !== "") {

      const map = makeMap(wordOfTheDayLetters);

      for (i = initialIndex; i < initialIndex + 5; i++) {
        wordChoice += letterInputs[i].value;
        letterInputs[i].setAttribute("readonly", "readonly");
      }

      wordChoiceLetters = wordChoice.split("");

      counter = 0;

      for (i = initialIndex; i < initialIndex + 5; i++) {
        if (wordChoiceLetters[counter] == wordOfTheDayLetters[counter]) {
          letterInputs[i].classList.add("green");
          map[wordChoiceLetters[counter]]--;
        }
        counter++;
      }
      counter = 0;
      for (i = initialIndex; i < initialIndex + 5; i++) {
        if (wordChoiceLetters[counter] == wordOfTheDayLetters[counter]) {
          // do nothing
        } else if ( wordOfTheDayLetters.includes(wordChoiceLetters[counter]) && map[wordChoiceLetters[counter]] > 0 ) {
          letterInputs[i].classList.add("yellow");
          map[wordChoiceLetters[counter]]--;
        } else {
          letterInputs[i].classList.add("grey");
        }
        counter++;
      }

      console.log(initialIndex);

      if (initialIndex === 25 && wordChoiceLetters.some((letter, index) => letter != wordOfTheDayLetters[index])) {
        youLost = document.querySelector(".you-lost");
        youLost.innerText = `You lost! You did not guess the word of the day.`
        youLost.classList.remove("hidden");
      }
      

      console.log(wordChoiceLetters);

      if (wordChoiceLetters.every((letter, index) => letter === wordOfTheDayLetters[index])) {
        console.log("true");
        youWon = document.querySelector(".you-won");
        youWon.innerText = `You won! That was the word of the day.`
        youWon.classList.remove("hidden");

        endGame();
      } else {
        console.log("false");
      }      

      wordChoice = "";
      initialIndex = initialIndex + 5;

      if (initialIndex !== 30) {
        // Use initialIndex instead of i
        letterInputs[initialIndex].focus();
        letterInputs[initialIndex].select();
      } 
    } else {
      alert("You have to enter a value");
    }

  }
});

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function round5(x) {
  return Math.ceil(x / 5) * 5;
}

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

function endGame() {
  let letterInputs = document.querySelectorAll(".letter-input");
  letterInputs.forEach((input, index, array) => {
    input.setAttribute("readonly", "readonly");
  });
}