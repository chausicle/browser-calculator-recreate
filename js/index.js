document.addEventListener("DOMContentLoaded", function() {
  startCalculator();
});

function startCalculator() {
  let screen = document.querySelector('.screen');
  let numArray = [0, 0];
  let decimalPressed = false; // to determine the first decimal pressed to prevent multiple decimals appended on a single number
  let operatorPressed = false;
  let selectedOperator;

  document.addEventListener('click', function(event) {
    let target = event.target;
    let targetClasses = target.className.split(' ');
    let htmlOperators = document.querySelectorAll('.operator');
    let operators = Array.from(htmlOperators);
    operators = operators.slice(1, operators.length - 1);

    // append only one decimal per screen session
    if(targetClasses[1] === 'decimal' && !decimalPressed) {
      decimalPressed = true;
      screen.innerText += target.innerText;
    }
    else if(targetClasses[1] === 'number' || targetClasses[1] === 'decimal') {
      // if the screen's inner-text is '0' and the button pressed is a number then clear screen to allow number to append without a leading '0'
      if(screen.innerText === '0' && targetClasses[1] === 'number' || operatorPressed) {
        screen.innerText = '';
      }
      if((targetClasses[1] === 'decimal' && !decimalPressed) || (targetClasses[1] === 'number' && screen.innerText !== '0')) {
        screen.innerText += target.innerText;
      }
    }
    // highlight selected operator to indicate an operation is being done with that operator
    else if(targetClasses[1] === 'operator' && targetClasses[2] !== 'clear' && targetClasses[2] !== 'equals') {
      operatorPressed = true;
      resetOperators(operators);

      target.style.background = 'white';
      target.style.color = '#ffa500';

      numArray[0] = Number(screen.innerText);
      selectedOperator = targetClasses[2];
    }
    // clear screen if the button pressed has a class of 'clear'
    else if(targetClasses[2] === 'clear') {
      resetOperators(operators);
      decimalPressed = false;
      operatorPressed = false;
      selectedOperator = null;
      screen.innerText = 0;
    }
    // calculate when button pressed has a class of 'equals'
    else if(targetClasses[2] === 'equals') {
      if(operatorPressed) {
        numArray[1] = Number(screen.innerText);
      } else {
        numArray[0] = Number(screen.innerText);
      }

      let result = calculate(numArray, selectedOperator);
      resetOperators(operators);
      screen.innerText = result;
      operatorPressed = false;
    }
  });
}

function resetOperators(operators) {
  operators.forEach(function(operator){
    operator.style.background = '#ffa500';
    operator.style.color = 'white';
  });
}
