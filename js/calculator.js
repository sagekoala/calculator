// Script to operate a calculator

// Global variables
const a = 13;
const b = 13;
const operator = 'x';

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

    // Performs operation and returns result
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

function displayResult(result) {

    // Reference to div where result will be displayed
    const resultDiv = document.querySelector('.result');
    resultDiv.textContent = `${a} ${operator} ${b} = ${result}`;
}

// Calling functions to test correctness
// Set up event handler for when = is clicked
const equals = document.querySelector('.equal-button');
equals.addEventListener('click', function() {

    // Operate on the query and display result onClick of =
    const value = operate(a, b, operator);
    displayResult(value);
});



// *** Future work - reset variables *** //
// Set up event listener to clear resultDiv
const clearBtn = document.querySelector('.clear-button');
clearBtn.addEventListener('click', function() {
    const resultDiv = document.querySelector('.result');
    resultDiv.textContent = '';
});

// ** NUMBERS ** //
// For fun, set up event listener to display numbers being typed
// with a space after each click
const numbers = document.querySelectorAll('.nums button');
numbers.forEach(number => {
    number.addEventListener('click', numberHandler);
});

// Function to handle numbers that are clicked
function numberHandler(e) {
    const resultDiv = document.querySelector('.result');
    resultDiv.textContent += e.srcElement.textContent;
}

//** Operators **//
const operators = document.querySelectorAll('.operator'); // Node list of operators
operators.forEach(operator => {
    operator.addEventListener('click', operatorHandler);
});

// Add class to operator button onClick to highlight its selection, remove highlight
// from other operator buttons
function operatorHandler(e) {
    const siblings = e.srcElement.parentElement.childNodes;

    siblings.forEach(sibling => {
        if (e.srcElement === sibling) {
            sibling.classList.add('operator-active');
        } else if (sibling.classList) {
            sibling.classList.remove('operator-active')
        }
    });
}




// NEXT STEPS //

//Set up a function to read user input, break up nums and operators into vars and calculate pairs
// Set up event lister on the buttons
// to display user query in result screen

// Add equal button that will trigger the operate function
// Somehow need to set it up so that it calls operate function
// on each trio of 2 nums and operator
// but also that it respects order of operations

// Set up event listener on the equal button to 
// call the operate function

