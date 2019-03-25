document.addEventListener("DOMContentLoaded", function() {
  startCalculator();
});

function startCalculator() {
  let screen = document.querySelector(".screen");
  let numArray = [NaN, NaN];
  let decimalPressed = false; // to determine the first decimal pressed to prevent multiple decimals appended on a single number
  let operatorPressed = false;
  let calculated = false;
  let selectedOperator;

  document.addEventListener("click", function(event) {
    let target = event.target;
    let targetClasses = target.className.split(" ");
    let htmlOperators = document.querySelectorAll(".operator");
    let operators = Array.from(htmlOperators);
    operators = operators.slice(1, operators.length - 1);

    console.log("target", target);

    if (screen.innerText !== "Error") {
      // append only one decimal per screen session
      if (targetClasses[1] === "decimal" && !decimalPressed) {
        decimalPressed = true;
        if (calculated || operatorPressed) {
          screen.innerText = `0${target.innerText}`;
          calculated = false;
        } else {
          screen.innerText += target.innerText;
        }
      } else if (targetClasses[1] === "number") {
        // if the screen's inner-text is '0' and the button pressed is a number then clear screen to allow number to append without a leading '0'
        if (
          (screen.innerText === "0" && targetClasses[1] === "number") ||
          calculated ||
          operatorPressed
        ) {
          console.log("clearing screen");
          screen.innerText = "";
          calculated = false;
          operatorPressed = false;
          resetOperators(operators);
        }

        screen.innerText += target.innerText;
      }
      // highlight selected operator to indicate an operation is being done with that operator
      else if (
        targetClasses[1] === "operator" &&
        targetClasses[2] !== "clear" &&
        targetClasses[2] !== "equals"
      ) {
        calculated = false;
        operatorPressed = true;
        decimalPressed = false;
        resetOperators(operators);

        target.style.background = "white";
        target.style.color = "#ffa500";

        numArray[0] = Number(screen.innerText);
        selectedOperator = targetClasses[2];
      }
      // calculate when button pressed has a class of 'equals'
      else if (targetClasses[2] === "equals") {
        if (calculated) {
          numArray[0] = Number(screen.innerText);
        } else {
          numArray[1] = Number(screen.innerText);
        }

        if (selectedOperator !== undefined) {
          console.log("numArray", numArray);
          let result = calculate(numArray, selectedOperator);
          resetOperators(operators);
          screen.innerText = result;
          operatorPressed = false;
          calculated = true;
        }
      }
    }
    // clear screen if the button pressed has a class of 'clear'
    if (targetClasses[2] === "clear") {
      resetOperators(operators);
      numArray = [NaN, NaN];
      decimalPressed = false;
      operatorPressed = false;
      calculated = false;
      selectedOperator = null;
      screen.innerText = 0;
    }
  });
}
