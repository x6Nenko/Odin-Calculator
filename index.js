const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const displayElement = document.getElementById('display');
const previousDisplayElement = document.getElementById('previousDisplay');
const resultBtn = document.getElementById('resultBtn');
const clearBtn = document.getElementById('clearBtn');
const percentageBtn = document.getElementById('percentageBtn');
const decimalBtn = document.getElementById('decimalBtn');
const backspaceBtn = document.getElementById('backspaceBtn');

let firstNum = "";
let secondNum = "";
let chosenOperator = "";
let displayStorage = "";
let displayPreviousStorage = "";

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
};

function updateDisplay() {
    displayElement.innerText = displayStorage;
    previousDisplayElement.innerText = displayPreviousStorage;
};

function updateStorages(result) {
    firstNum += result;
    displayPreviousStorage = displayStorage + result;
    displayStorage = result;
};


function add(a, b) {
    let result = (a + b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    updateStorages(result);
    updateDisplay();
};

function substract(a, b) {
    let result = (a - b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    updateStorages(result);
    updateDisplay();
};

function multiply(a, b) {
    let result = (a * b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    updateStorages(result);
    updateDisplay();
};

function divide(a, b) {
    let result = (a / b).toFixed(2).replace(/\.?0*$/,'');
    refreshStorages();
    updateStorages(result);
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

function controlPercentage(value) {
    let val = value;


    if (isSecondNum && secondNum.length === 0 && firstNumPercentage.length > 0) {
        return null;
    };

    // Remove the previosly chosen operator because instead of typing the second number, the user pressed "%" (he wants to put it instead of the operator).
    if (isSecondNum && secondNum.length === 0) {
        let storageArr = displayStorage.split("");
        isSecondNum = false;
        chosenOperator = "";
        storageArr.splice(-3, 3);
        displayStorage = storageArr.join("");
        updateDisplay();
    };


    isPercentageUsed = true;

    if (isSecondNum) {
        getPercentage(firstNum, secondNum);
        displayStorage += val;
        updateDisplay();
    } else {
        getPercentage(firstNum, null);
        displayStorage += val;
        updateDisplay();
    };
};


digits.forEach(digit => {
    digit.addEventListener("click", function() {
        const value = this.textContent;

        // Block possibility to edit previous operation
        if (displayPreviousStorage.length > 0 && !isSecondNum) {
            return null;
        };

        if (isSecondNum) {
            if (value === "0" && +secondNum === 0 && secondNum.length === 1) {
                return null;
            };
        } else {
            if (value === "0" && +firstNum === 0 && firstNum.length === 1) {
                return null;
            };
        };

        // Allow decimals only when it makes sense. Disable such an option right after %, the operator, and as the very first input.
        if (value === "." && isDecimalUsed === false) {
            if (isSecondNum) {
                let secondNumStorageArr = secondNum.split("");
                let lastEl = secondNumStorageArr[secondNumStorageArr.length - 1];
        
                let storageArr = displayStorage.split("");
                let lastStorageEl = storageArr[storageArr.length - 1];
        
                if (lastStorageEl === "%" || lastStorageEl === " " || lastEl === undefined) {
                    return null;
                };
            } else if (!isSecondNum) {
                let firstNumStorageArr = firstNum.split("");
                let lastEl = firstNumStorageArr[firstNumStorageArr.length - 1];
        
                let storageArr = displayStorage.split("");
                let lastStorageEl = storageArr[storageArr.length - 1];
        
                if (lastStorageEl === "%" || lastStorageEl === " " || lastEl === undefined) {
                    return null;
                };
            };
        
            isDecimalUsed = true;
        } else if (value === "." && isDecimalUsed === true) {
            return null;
        };

        if (value === "%" && isPercentageUsed === false) {
            if (!isSecondNum) {
                let firstNumStorageArr = firstNum.split("");
                let lastEl = firstNumStorageArr[firstNumStorageArr.length - 1];
                if (lastEl === undefined) {
                    return null;
                };
            };
            controlPercentage(value);
        } else if (value === "%" && isPercentageUsed === true) {
            return null;
        };


        if (isPercentageUsed) {
            return null
        };


        if (isSecondNum) {
            if (+secondNum === 0 && secondNum.length === 1 && value !== "." && value !== "%") {
                secondNum = value;
                let storageArr = displayStorage.split("");
                storageArr.pop();
                displayStorage = storageArr.join("");
                displayStorage += value;
                return updateDisplay();
            };
            secondNum += value;
        } else {
            if (+firstNum === 0 && firstNum.length === 1 && value !== "." && value !== "%") {
                firstNum = value;
                displayStorage = value;
                return updateDisplay();
            };
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

        if (firstNum.length === 0) {
            return null;
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
    displayPreviousStorage = "";
    isSecondNum = false;
    updateDisplay();
});


function removeLastDisplayItem(storageArr) {
    storageArr.pop();
    displayStorage = storageArr.join("");
};

function backspace() {
    let storageArr = displayStorage.split("");
    let lastIndex = storageArr.length -1;

    // Block the possibility of editing a previous operation.
    if (displayPreviousStorage.length > 0 && !isSecondNum) {
        return null;
    };

    // Remove the previously chosen operator.
    if (storageArr[lastIndex] === " ") {
        if (firstNumPercentage.length > 0) {
            isPercentageUsed = true;
        };
        isSecondNum = false;
        chosenOperator = "";
        storageArr.splice(-3, 3);
        displayStorage = storageArr.join("");
        return updateDisplay();
    };

    // Remove decimals from the numbers storage.
    if (storageArr[lastIndex] === ".") {
        isDecimalUsed = false;

        if (isSecondNum) {
            let secondNumStorageArr = secondNum.split("");
            secondNumStorageArr.pop();
            secondNum = secondNumStorageArr.join("");
        } else {
            let firstNumStorageArr = firstNum.split("");
            firstNumStorageArr.pop();
            firstNum = firstNumStorageArr.join("");
        };

        removeLastDisplayItem(storageArr);
        return updateDisplay();
    } else if (storageArr[lastIndex] === "%") {
        isPercentageUsed = false;

        // Remove unneeded previous percentage calculations.
        if (isSecondNum) {
            secondNumPercentage = "";
        } else {
            refreshPercentages();
        };

        removeLastDisplayItem(storageArr);
        return updateDisplay();
    };

    // Remove the number from a number storage.
    if (isSecondNum) {
        let secondNumStorageArr = secondNum.split("");
        secondNumStorageArr.pop();
        secondNum = secondNumStorageArr.join("");
    } else {
        let firstNumStorageArr = firstNum.split("");
        firstNumStorageArr.pop();
        firstNum = firstNumStorageArr.join("");
    };

    removeLastDisplayItem(storageArr);
    return updateDisplay();
};

backspaceBtn.addEventListener("click", function() {
    backspace();
});


// ========== Keyboard support
function controlOperator(value) {
    let pressedOperator = "";

    if (value === "NumpadAdd") pressedOperator = "+";
    if (value === "NumpadSubtract") pressedOperator = "-";
    if (value === "NumpadMultiply") pressedOperator = "x";
    if (value === "NumpadDivide") pressedOperator = "/";

    if (chosenOperator.length > 0) {
        if (firstNum.length > 0 && secondNum.length > 0) {
            preOperate();
            updateDisplay();
            ifPercentage();
            operate(chosenOperator, +firstNum, +secondNum);
        } else {
            chosenOperator = pressedOperator;
            displayStorage = `${firstNum} ${chosenOperator} `
            return updateDisplay();
        };
    };
    chosenOperator = pressedOperator;
    displayStorage += ` ${pressedOperator} `;
    isSecondNum = true;
    isDecimalUsed = false;
    isPercentageUsed = false;
};

document.addEventListener("keydown", function(event) {
    const value = event.code;
    let pressedBtn = "";

    if (value === "NumpadAdd" || value === "NumpadSubtract" || value === "NumpadMultiply" || value === "NumpadDivide") {
        controlOperator(value);
        return updateDisplay();
    };

    if (value === "Escape") {
        refreshStorages();
        displayStorage = "";
        displayPreviousStorage = "";
        isSecondNum = false;
        return updateDisplay();
    };

    // Block possibility to edit previous operation
    if (displayPreviousStorage.length > 0 && !isSecondNum) {
        return null;
    };

    if (value === "NumpadEnter") {
        if (firstNum.length > 0 && secondNum.length > 0) {
            preOperate();
            updateDisplay();
            ifPercentage();
            operate(chosenOperator, +firstNum, +secondNum);
        };
    };

    if (value === "Backspace") {
        backspace();
    };

    if (isSecondNum) {
        if (value === "Numpad0" && +secondNum === 0 && secondNum.length === 1) {
            return null;
        };
    } else {
        if (value === "Numpad0" && +firstNum === 0 && firstNum.length === 1) {
            return null;
        };
    };

    // Allow decimals only when it makes sense. Disable such an option right after %, the operator, and as the very first input.
    if (value === "NumpadDecimal" && isDecimalUsed === false || value === "Period" && isDecimalUsed === false) {
        if (isSecondNum) {
            let secondNumStorageArr = secondNum.split("");
            let lastEl = secondNumStorageArr[secondNumStorageArr.length - 1];
    
            let storageArr = displayStorage.split("");
            let lastStorageEl = storageArr[storageArr.length - 1];
    
            if (lastStorageEl === "%" || lastStorageEl === " " || lastEl === undefined) {
                return null;
            };
        } else if (!isSecondNum) {
            let firstNumStorageArr = firstNum.split("");
            let lastEl = firstNumStorageArr[firstNumStorageArr.length - 1];
    
            let storageArr = displayStorage.split("");
            let lastStorageEl = storageArr[storageArr.length - 1];
    
            if (lastStorageEl === "%" || lastStorageEl === " " || lastEl === undefined) {
                return null;
            };
        };
    
        isDecimalUsed = true;
        pressedBtn = ".";
    } else if (value === "NumpadDecimal" && isDecimalUsed === true) {
        return null;
    };

    if (value === "Digit5" && isPercentageUsed === false) {
        if (!isSecondNum) {
            let firstNumStorageArr = firstNum.split("");
            let lastEl = firstNumStorageArr[firstNumStorageArr.length - 1];
            if (lastEl === undefined) {
                return null;
            };
        };
        controlPercentage("%");
    } else if (value === "Digit5" && isPercentageUsed === true) {
        return null;
    };


    if (isPercentageUsed) {
        return null
    };


    let numpadNumsRegex = /Numpad[0-9]/i;

    if (numpadNumsRegex.test(value)) {
        let getNum = value.match(/[0-9]/);
        pressedBtn = getNum.toString();
    };


    if (isSecondNum) {
        if (+secondNum === 0 && secondNum.length === 1 && value !== "NumpadDecimal" && value !== "Digit5") {
            secondNum = pressedBtn;
            let storageArr = displayStorage.split("");
            storageArr.pop();
            displayStorage = storageArr.join("");
            displayStorage += pressedBtn;
            return updateDisplay();
        };
        secondNum += pressedBtn;
    } else {
        if (+firstNum === 0 && firstNum.length === 1 && value !== "NumpadDecimal" && value !== "Digit5") {
            firstNum = pressedBtn;
            displayStorage = pressedBtn;
            return updateDisplay();
        };
        firstNum += pressedBtn;
    };

    displayStorage += pressedBtn;
    updateDisplay();
});