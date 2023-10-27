// Script to operate a calculator

// Create variables
const a = 2;
const b = 4;
const operator = '+';

// Could have an object that reads the user's operator and calls function that corresponds to it

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
    // Calls function corresponding to operator on the numbers
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === 'x') {
        return multiply(a, b);
    } else {
        return divide(a, b);
    }
}

// Event listener
operate(a, b, operator);