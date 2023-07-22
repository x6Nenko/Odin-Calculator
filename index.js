const digits = document.querySelectorAll('.digit');

let firstNum = 0;
let secondNum = 0;
let operator = "";
let display = "";

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

digits.forEach(digit => {
    digit.addEventListener("click", function() {
        const value = this.textContent;
        display += value;
        console.log(display);
    })
});