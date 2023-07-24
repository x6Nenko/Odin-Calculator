const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const displayElement = document.getElementById('display');
const resultBtn = document.getElementById('resultBtn');
const clearBtn = document.getElementById('clearBtn');
const percentageBtn = document.getElementById('percentageBtn');
const decimalBtn = document.getElementById('decimalBtn');
const backspaceBtn = document.getElementById('backspaceBtn');

let firstNum = "";
let secondNum = "";
let chosenOperator = "";
let displayStorage = "";

let isSecondNum = false;
let isPercentageUsed = false;
let isDecimalUsed = false;

let firstNumPercentage = "";
let secondNumPercentage = "";

function refreshStorages() {
    firstNum = "";
    secondNum = "";
    chosenOperator = "";
    isDecimalUsed = false;
    isPercentageUsed = false;
};

function refreshPercentages() {
    firstNumPercentage = "";
    secondNumPercentage = "";
}

function updateDisplay() {
    displayElement.innerText = displayStorage;
};

function ifDecimalResult(result) {
    let resultArr = result.split("");

    for (let i = 0; i < resultArr.length; i++) {
        if (resultArr[i] === ".") {
            isDecimalUsed = true;
        };
    };
};

function add(a, b) {
    let result = (a + b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    ifDecimalResult(result);
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function substract(a, b) {
    let result = (a - b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    ifDecimalResult(result);
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function multiply(a, b) {
    let result = (a * b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    ifDecimalResult(result);
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function divide(a, b) {
    let result = (a / b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    ifDecimalResult(result);
    firstNum += result;
    displayStorage += result;
    updateDisplay();
};

function getPercentage(a, b) {
    if (b === null) {
        return firstNumPercentage += a / 100;
    };

    if (firstNumPercentage.length > 0) {
        return secondNumPercentage += (firstNumPercentage / 100) * b;
    } else {
        return secondNumPercentage += (a / 100) * b;
    };
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

        if (value === "." && isDecimalUsed === false) {
            isDecimalUsed = true;
        } else if (value === "." && isDecimalUsed === true) {
            return null;
        };

        if (value === "%" && isPercentageUsed === false) {
            isPercentageUsed = true;

            if (isSecondNum) {
                getPercentage(firstNum, secondNum);
                displayStorage += value;
                updateDisplay();
            } else {
                getPercentage(firstNum, null);
                displayStorage += value;
                updateDisplay();
            };
        } else if (value === "%" && isPercentageUsed === true) {
            return null;
        };


        if (isPercentageUsed) {
            return null
        }


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

function ifPercentage() {
    if (firstNumPercentage.length > 0 && secondNumPercentage > 0) {
        operate(chosenOperator, +firstNumPercentage, +secondNumPercentage);
        return refreshPercentages();
    } else if (firstNumPercentage.length > 0) {
        operate(chosenOperator, +firstNumPercentage, +secondNum);
        return refreshPercentages();
    } else if (secondNumPercentage.length > 0) {
        console.log(firstNum, secondNumPercentage);
        operate(chosenOperator, +firstNum, +secondNumPercentage);
        return refreshPercentages();
    };
};

operators.forEach(operator => {
    operator.addEventListener("click", function() {
        const value = this.textContent;
        if (chosenOperator.length > 0) {
            if (firstNum.length > 0 && secondNum.length > 0) {
                preOperate();
                updateDisplay();
                ifPercentage();
                operate(chosenOperator, +firstNum, +secondNum);
            } else {
                chosenOperator = value;
                displayStorage = `${firstNum} ${chosenOperator} `
                return updateDisplay();
            };
        };
        chosenOperator = value;
        displayStorage += ` ${value} `;
        isSecondNum = true;
        isDecimalUsed = false;
        isPercentageUsed = false;
        updateDisplay();
    });
});

resultBtn.addEventListener("click", function() {
    if (firstNum.length > 0 && secondNum.length > 0) {
        preOperate();
        updateDisplay();
        ifPercentage();
        operate(chosenOperator, +firstNum, +secondNum);
    };
});

clearBtn.addEventListener("click", function() {
    refreshStorages();
    displayStorage = "";
    isSecondNum = false;
    updateDisplay();
});

backspaceBtn.addEventListener("click", function() {
    let storageArr = displayStorage.split("");
    let lastIndex = storageArr.length -1;
    console.log(storageArr[lastIndex]);

    if (storageArr[lastIndex] === ".") {
        console.log("dot");
    } else if (storageArr[lastIndex] === "%") {
        console.log("percent");
    } else if (storageArr[lastIndex] === "operator"){

    }
    console.log(storageArr);
});