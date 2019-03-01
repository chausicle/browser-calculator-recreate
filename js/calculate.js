function calculate(numArray, selectedOperator) {
  switch(selectedOperator) {
    case 'divide':
      if(numArray[1] === 0) return 'Error';
      return numArray[0] / numArray[1];
    case 'multiply':
      return numArray[0] * numArray[1];
    case 'plus':
      return numArray[0] + numArray[1];
    case 'minus':
      return numArray[0] - numArray[1];
    default:
      return 'Error';
  }
}
