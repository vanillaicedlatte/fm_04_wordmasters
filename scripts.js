let wordChoice1 = [];
let wordChoice2 = [];
let wordChoice3 = [];
let wordChoice4 = [];
let wordChoice5 = [];
let wordChoice6 = [];

document.addEventListener('DOMContentLoaded', function () {
    let letterInputs = document.querySelectorAll(".letter-input");
  
    letterInputs.forEach((input, index, array) => {
      input.addEventListener("input", function (event) {
        if (isLetter(event.data)) {
          if (index < 4) {
            array[index + 1].focus();
          }
        }
      });
  
      input.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          if (input.value !== "") {
            input.value = "";
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
        for (i=0; i < 5; i++) {
            wordChoice1 += letterInputs[i].value;
        }
        console.log(wordChoice1);
    }
  });
  
  function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }  