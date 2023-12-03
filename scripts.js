let wordChoice = [];
let initialIndex = 0;
let wordOfTheDay = "booty";
wordOfTheDayLetters = wordOfTheDay.split("");
const map = makeMap(wordOfTheDayLetters);

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
    console.log("Keydown event triggered");
    let letterInputs = document.querySelectorAll(".letter-input");
    if (letterInputs[initialIndex + 4].value !== "") {

      for (i = initialIndex; i < initialIndex + 5; i++) {
        console.log("Loop 0:", i);
        wordChoice += letterInputs[i].value;
        letterInputs[i].setAttribute("readonly", "readonly");
      }
      wordChoiceLetters = wordChoice.split("");
      counter = 0;
      for (i = initialIndex; i < initialIndex + 5; i++) {
        console.log("Loop 1:", i, wordChoiceLetters[counter], wordOfTheDayLetters[counter]);
        if (wordChoiceLetters[counter] == wordOfTheDayLetters[counter]) {
          letterInputs[i].classList.add("green");
          map[wordChoiceLetters[counter]]--;
          console.log(map);
          console.log("break");
        }
        counter++;
      }
      counter = 0;
      for (i = initialIndex; i < initialIndex + 5; i++) {
        console.log("Loop 2:", i, wordChoiceLetters[counter], wordOfTheDayLetters[counter]);
        if (wordChoiceLetters[counter] == wordOfTheDayLetters[counter]) {
          // do nothing
        } else if ( wordOfTheDayLetters.includes(wordChoiceLetters[counter]) && map[wordChoiceLetters[counter]] > 0 ) {
          letterInputs[i].classList.add("yellow");
          map[wordChoiceLetters[counter]]--;
          console.log(map);
          console.log("break 2");
        } else {
          letterInputs[i].classList.add("grey");
        }
        counter++;
      }


      if (wordChoice == wordOfTheDay) {
        console.log("true");

      } else {
        console.log("false");
      }

      wordChoice = "";
      initialIndex = initialIndex + 5;

      if (initialIndex !== 30) {
        letterInputs[i].focus();
        letterInputs[i].select();
      }
    } else {
      alert("You have to enter a value");
    }
  }
})

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