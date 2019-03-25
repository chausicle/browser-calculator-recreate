function resetOperators(operators) {
  console.log("resetting operators", operators);
  operators.forEach(function(operator){
    operator.style.background = '#ffa500';
    operator.style.color = 'white';
  });
}
