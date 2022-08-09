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

    if (!action) {
      if (displayedNum === "0" || previousBtnType === "operator") {
        display.textContent = btnContent;
      } else {
        display.textContent = displayedNum + btnContent;
      }
      calculator.dataset.previousBtnType = "number";
    }

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

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && previousBtnType !== "operator") {
        const resultVal = operate(firstValue, operator, secondValue);
        display.textContent = resultVal;
        calculator.dataset.firstValue = resultVal;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      btn.classList.add("is-depressed");
      calculator.dataset.previousBtnType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      display.textContent = operate(firstValue, operator, secondValue);
    }
  }
});

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
