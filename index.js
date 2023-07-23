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

function updateDisplay() {
    displayElement.innerText = displayStorage;
};

function add(a, b) {
    let result = (a + b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function substract(a, b) {
    let result = (a - b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function multiply(a, b) {
    let result = (a * b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function divide(a, b) {
    let result = (a / b).toFixed(2).replace(/\.?0*$/,'');
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

    if (chosenOperator === "x") {
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

function preOperate() {
    displayStorage += " = ";
    isSecondNum = false;
};

operators.forEach(operator => {
    operator.addEventListener("click", function() {
        const value = this.textContent;
        if (chosenOperator.length > 0) {
            preOperate();
            updateDisplay();
            operate(chosenOperator, +firstNum, +secondNum);
        }
        chosenOperator = value;
        displayStorage += ` ${value} `;
        isSecondNum = true;
        updateDisplay();
    });
});

resultBtn.addEventListener("click", function() {
    if (firstNum.length > 0 && secondNum.length > 0) {
        preOperate();
        updateDisplay();
        operate(chosenOperator, +firstNum, +secondNum);
    }
});