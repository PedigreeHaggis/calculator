const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator-display");
const btns = calculator.querySelector(".calculator-btns");

btns.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const btn = e.target;
    const action = btn.dataset.action;
    const btnContent = btn.textContent;
    const displayedNum = display.textContent;
    const previousBtnType = calculator.dataset.previousBtnType;

    Array.from(btn.parentNode.children).forEach((btn) =>
      btn.classList.remove("is-depressed")
    );

    // update display as long as number keys are being pressed
    if (!action) {
      if (displayedNum === "0" || previousBtnType === "operator") {
        display.textContent = btnContent;
      } else {
        display.textContent = displayedNum + btnContent;
      }
      calculator.dataset.previousBtnType = "number";
    }

    // ensure only 1 decimal place can be added
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousBtnType === "operator") {
        display.textContent = "0.";
      }
      calculator.dataset.previousBtnType = "decimal";
    }

    if (action === "clear") {
      calculator.dataset.previousBtnType = "clear";
    }

    if (action === "calculate") {
      calculator.dataset.previousBtnType = "calculate";
    }

    // carry out calculations based on the operator chosen and chain
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      /* if the first number and operator exist and extra numbers have been added,
        assign the result to first number to continue chaining.
        if there is no first number assign the displayed number as the first number.
      */
      if (firstValue && operator && previousBtnType !== "operator") {
        const resultVal = operate(firstValue, operator, secondValue);
        display.textContent = resultVal;
        calculator.dataset.firstValue = resultVal;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      // assign operator and change operator button display.
      btn.classList.add("is-depressed");
      calculator.dataset.previousBtnType = "operator";
      calculator.dataset.operator = action;
    }

    // calculate if equals key is pressed
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      display.textContent = operate(firstValue, operator, secondValue);
    }
  }
});

// carry out requested action
function operate(n1, operator, n2) {
  let result = "";

  switch (operator) {
    case "add":
      result = parseFloat(n1) + parseFloat(n2);
      break;
    case "subtract":
      result = parseFloat(n1) - parseFloat(n2);
      break;
    case "multiply":
      result = parseFloat(n1) * parseFloat(n2);
      break;
    case "divide":
      result = parseFloat(n1) / parseFloat(n2);
      break;
    default:
      break;
  }

  return result;
}
