let firstNum = 0;
let secondNum = 0;
let operator = "";

function add(a, b) {
    return a + b
};

function substract(a, b) {
    return a - b
};

function multiply(a, b) {
    return a * b
};

function divide(a, b) {
    return a / b
};

function operate(operator, firstNum, secondNum) {
    if (operator === "+") {
        add(firstNum, secondNum)
    };

    if (operator === "-") {
        substract(firstNum, secondNum)
    };

    if (operator === "*") {
        multiply(firstNum, secondNum)
    };

    if (operator === "/") {
        divide(firstNum, secondNum)
    };
    
};