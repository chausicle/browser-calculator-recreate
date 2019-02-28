document.addEventListener("DOMContentLoaded", function() {
  startCalculator();
});

function startCalculator() {
  let screen = document.querySelector('.screen');
  let decimalPressed = false; //

  document.addEventListener('click', function(event) {
    let target = event.target;
    let targetClasses = target.className.split(' ');
    let htmlOperators = document.querySelectorAll('.operator');
    let operators = Array.from(htmlOperators);
    operators = operators.slice(1, operators.length - 1);
    let firstNumPressed = false; // counter for first number on screen to determine whether to clear screen when

    if(targetClasses[1] === 'decimal' && !decimalPressed) {
      decimalPressed = true;
      screen.innerText += target.innerText;
    }
    if(targetClasses[1] === 'number' || targetClasses[1] === 'decimal') {
      firstNumPressed = true;
      // if the firstNumPressed is 1 and the screen's inner text is '0' then clear screen to allow number appending without a leading '0'
      if(firstNumPressed && screen.innerText === '0' && targetClasses[2] !== 'zero' && targetClasses[1] !== 'decimal') {
        screen.innerText = '';
      }
      if(targetClasses[1] === 'decimal' && !decimalPressed) {
        screen.innerText += target.innerText;
      } else if(targetClasses[1] === 'number') {
        screen.innerText += target.innerText;
      }
    }
    // highlight selected operator to indicate an operation is being done with that operator
    else if(targetClasses[1] === 'operator' && targetClasses[2] !== 'clear' && targetClasses[2] !== 'equals') {
      resetOperators(operators);

      target.style.background = 'white';
      target.style.color = '#ffa500';
    }
    // clear screen if the button pressed has a class of 'clear'
    else if(targetClasses[2] === 'clear') {
      resetOperators(operators);
      firstNumPressed = false;
      decimalPressed = false;
      screen.innerText = 0;
    }
    
    console.log('operators', operators);
    console.log('decimalPressed', decimalPressed);
    console.log('target', target);
    console.log('targetClasses', targetClasses);
    console.log(firstNumCounter);
  });
}

function resetOperators(operators) {
  operators.forEach(function(operator){
    operator.style.background = '#ffa500';
    operator.style.color = 'white';
  });
}
