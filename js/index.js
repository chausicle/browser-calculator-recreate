document.addEventListener("DOMContentLoaded", function() {
  startCalculator();
});

function startCalculator() {
  let screen = document.querySelector(".screen");
  let numArray = [];
  let decimalPressed = false;
  let operatorPressed = false;
  let equalPressed = false;
  let selectedOperator;

  document.addEventListener("click", function(event) {
    let target = event.target;
    let targetClasses = target.className.split(" ");
    let htmlOperators = document.querySelectorAll(".operator");
    let operators = Array.from(htmlOperators);
    operators = operators.slice(1, operators.length - 1);

    if (screen.innerText !== "Error") {
      // append only one decimal per screen session
      if (targetClasses[1] === "decimal" && !decimalPressed) {
        decimalPressed = true;
        if (equalPressed || operatorPressed) {
          screen.innerText = `0${target.innerText}`;
          equalPressed = false;
          operatorPressed = false;
        } else {
          screen.innerText += target.innerText;
        }
      } else if (targetClasses[1] === "number") {
        // clear screen to allow number to append:
        //    without a leading '0'
        //    when calculation has occured when the equal button is pressed
        //    when an operator is pressed
        if (
          (screen.innerText === "0" && targetClasses[1] === "number") ||
          equalPressed ||
          operatorPressed
        ) {
          screen.innerText = "";
          equalPressed = false;
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
        decimalPressed = false;
        resetOperators(operators);

        target.style.background = "white";
        target.style.color = "#ffa500";

        if (equalPressed) {
          numArray = [Number(screen.innerText)];
          operatorPressed = true;
          equalPressed = false;
        } else if (!operatorPressed) {
          numArray.push(Number(screen.innerText));
          operatorPressed = true;
        }

        // for continuous flow of calculations with the use of operators instead of pressing the equal button
        if (numArray.length === 2) {
          const result = calculate(numArray, selectedOperator);
          numArray = [result];
          screen.innerText = result;
        }
        selectedOperator = targetClasses[2];
      }
      // calculate when button pressed has a class of 'equals'
      else if (targetClasses[2] === "equals") {
        if (equalPressed) {
          numArray[0] = Number(screen.innerText);
        } else {
          numArray[1] = Number(screen.innerText);
        }

        if (selectedOperator !== undefined) {
          const result = calculate(numArray, selectedOperator);
          resetOperators(operators);
          screen.innerText = result;
          operatorPressed = false;
          equalPressed = true;
        }
      }
    }
    // clear screen if the button pressed has a class of 'clear'
    if (targetClasses[2] === "clear") {
      resetOperators(operators);
      numArray = [];
      decimalPressed = false;
      operatorPressed = false;
      equalPressed = false;
      selectedOperator = null;
      screen.innerText = 0;
    }
  });
}
