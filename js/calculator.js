// Script to operate a calculator

// Create variables
const a = 10;
const b = 10;
const operator = '/';

// Create functions for the different operators
const add = function (a, b) {
    return a + b;
};

const subtract = function (a, b) {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
};

const divide = function (a, b) {
    return a / b;
};

function operate(a, b, operator) {

    const resultDiv = document.querySelector('.result');

    // Calls function corresponding to operator on the numbers
    if (operator === '+') {
        resultDiv.textContent = `${a} + ${b} = ${add(a, b)}`;
        return add(a, b);
    } else if (operator === '-') {
        resultDiv.textContent = `${a} - ${b} = ${subtract(a, b)}`;
        return subtract(a, b);
    } else if (operator === 'x') {
        resultDiv.textContent = `${a} x ${b} = ${multiply(a, b)}`;
        return multiply(a, b);
    } else {
        resultDiv.textContent = `${a} / ${b} = ${divide(a, b)}`;
        return divide(a, b);
    }
}

// Event listener
operate(a, b, operator);