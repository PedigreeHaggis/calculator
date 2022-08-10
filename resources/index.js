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

    if (action !== "clear") {
      const clearButton = document.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
    // update display as long as number keys are being pressed
    if (!action) {
      if (
        displayedNum === "0" ||
        previousBtnType === "operator" ||
        previousBtnType === "calculate"
      ) {
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
      display.textContent = "0";
      if (btn.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousBtnType = "";
      } else {
        btn.textContent = "AC";
      }
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
      if (
        firstValue &&
        operator &&
        previousBtnType !== "operator" &&
        previousBtnType !== "calculate"
      ) {
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
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;
      if (firstValue) {
        if (previousBtnType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = operate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      display.textContent = operate(firstValue, operator, secondValue);
    }
  }
});

// carry out requested action
function operate(n1, operator, n2) {
  switch (operator) {
    case "add":
      return (parseFloat(n1) + parseFloat(n2)).toFixed(5);
    case "subtract":
      return (parseFloat(n1) - parseFloat(n2)).toFixed(5);
    case "multiply":
      return (parseFloat(n1) * parseFloat(n2)).toFixed(5);
    case "divide":
      return (parseFloat(n1) / parseFloat(n2)).toFixed(5);
    default:
      break;
  }

  return result;
}
