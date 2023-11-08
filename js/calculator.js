// Script to operate a calculator

// Global variables
let valueStorage = [];

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

// *** Future work - reset variables *** //
// Set up event listener to clear screenDiv
const clearBtn = document.querySelector('.clear-button');


// ** NUMBER Buttons ** //
const numbers = document.querySelectorAll('.nums button');
numbers.forEach(number => {
    number.addEventListener('click', numberHandler);
});

// Function to handle numbers that are clicked
function numberHandler(e) {
    const screenDiv = document.querySelector('.screen');

    // Clear screen if screenDiv has class="result", then remove class
    if (screenDiv.classList.contains('result')) {
        screenDiv.textContent = ""; // Reset screen content
        screenDiv.classList.remove('result');
    }

    screenDiv.textContent += e.srcElement.textContent;
}

//** Operators **//
const operators = document.querySelectorAll('.operator'); // Node list of operators
operators.forEach(operator => {
    operator.addEventListener('click', operatorHandler);
});

// Add class to operator button onClick to highlight its selection, remove highlight
// from other operator buttons
function operatorHandler(e) {

    // Storing then clearing previous values, styling selected operator
    const screenDiv = document.querySelector('.screen');
    storeValues(screenDiv.textContent, e.srcElement.textContent);

    // // Clear previous value from screen
    // screenDiv.textContent = "";
    styleActiveOperator(e);
}

function styleActiveOperator(e) {
    const siblings = e.srcElement.parentElement.childNodes;

    // Styling operator active selection
    siblings.forEach(sibling => {
        if (e.srcElement === sibling) {
            sibling.classList.add('operator-active');
        } else if (sibling.classList) {
            sibling.classList.remove('operator-active');
        }
    });
}

function storeValues(number, operator) {
    
    valueStorage.push(number);
    console.log(`Value storage length ${valueStorage.length}`);
    let screenDivRef = document.querySelector(".screen");


    if (valueStorage.length === 3) {
        const result = operate(parseInt(valueStorage[0]), parseInt(number), valueStorage[1]);
        
        screenDivRef.textContent = result;

        // Reset valueStorage array
        valueStorage = [];

        // Push current result and operator to valueStorage list
        valueStorage.push(result);
        valueStorage.push(operator);

        // Add result class to screenDiv as flag to validate that textContent is result
        screenDivRef.classList.add('result');
    } else {
        valueStorage.push(operator);

        // Clear screen 
        screenDivRef.textContent = "";
    }
}

// NEXT STEPS //

// Add the number 0 to index.html 

// Set up event listener on the equal button to 
// call the operate function

// Set up event listener on the AC button to clear/reset everything

