function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  return n1 / n2;
}

function operate(n1, n2, operator) {
  switch (operator) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "*":
      return multiply(n1, n2);
    case "/":
      return divide(n1, n2);
    default:
      break;
  }
}

let firstNum = "";
let secondNum = "";
let result = "";
let lastAction = "";
let action = "";

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const backspaceButton = document.querySelector(".backspace");
const clearButton = document.querySelector(".clear");
const display = document.querySelector(".calc-display");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (
      display.textContent === "0" ||
      display.textContent === "" ||
      display.textContent === result.toString()
    ) {
      display.textContent = btn.textContent;
      result = "";
    } else {
      display.textContent = display.textContent + btn.textContent;
    }
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if(display.textContent === firstNum.toString()){display.textContent ='0'};
    lastAction = action;
    if (btn.classList.contains("add")) {
      action = "+";
    } else if (btn.classList.contains("subtract")) {
      action = "-";
    } else if (btn.classList.contains("multiply")) {
      action = "*";
    } else if (btn.classList.contains("divide")) {
      action = "/";
    }

    if(!firstNum) {
      firstNum = Number(display.textContent);
      display.textContent = "0";
    } else{
      secondNum = Number(display.textContent);
      display.textContent = '0'
    }

    if (firstNum && secondNum && lastAction) {
      result = operate(firstNum, secondNum, lastAction);
      firstNum = result;
      secondNum = "";
      display.textContent = firstNum;
    }
  });
});

equalsButton.addEventListener("click", () => {
  lastAction = action;
  if (!secondNum) {
    secondNum = Number(display.textContent);
  }

  if (firstNum && secondNum) {
    result = operate(firstNum, secondNum, action);
    firstNum = result;
    secondNum = "";

  }

  if (!result) {
    display.textContent = "0";
  } else {
    display.textContent = firstNum;
  }
});
