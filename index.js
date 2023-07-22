const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const displayElement = document.getElementById('display');
const resultBtn = document.getElementById('resultBtn');

let firstNum = "";
let secondNum = "";
let chosenOperator = "";
let displayStorage = "";
let isSecondNum = false;

function refreshStorages() {
    firstNum = "";
    secondNum = "";
    chosenOperator = "";
};

function add(a, b) {
    let result = a + b;
    refreshStorages();
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function substract(a, b) {
    let result = a - b;
    refreshStorages();
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function multiply(a, b) {
    let result = a * b;
    refreshStorages();
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function divide(a, b) {
    let result = a / b;
    refreshStorages();
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function operate(chosenOperator, firstNum, secondNum) {
    if (chosenOperator === "+") {
        add(firstNum, secondNum)
    };

    if (chosenOperator === "-") {
        substract(firstNum, secondNum)
    };

    if (chosenOperator === "*") {
        multiply(firstNum, secondNum)
    };

    if (chosenOperator === "/") {
        divide(firstNum, secondNum)
    };
    
};

digits.forEach(digit => {
    digit.addEventListener("click", function() {
        const value = this.textContent;
        if (isSecondNum) {
            secondNum += value;
        } else {
            firstNum += value;
        };
        displayStorage += value;
        updateDisplay();
    });
});

function updateDisplay() {
    displayElement.innerText = displayStorage;
};

operators.forEach(operator => {
    operator.addEventListener("click", function() {
        const value = this.textContent;
        chosenOperator = value;
        displayStorage += ` ${value} `;
        isSecondNum = true;
        updateDisplay();
    });
});

resultBtn.addEventListener("click", function() {
    displayStorage += " =";
    isSecondNum = false;
    updateDisplay();
    operate(chosenOperator, +firstNum, +secondNum);
});