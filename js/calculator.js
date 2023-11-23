// Script to operate a calculator

// Global variables
let valueStorage = [];
const screen = document.querySelector('.screen');
const userMessage = document.querySelector('.user-message');
const operationMessage = document.querySelector('.operation-message');
const errorMessage = document.querySelector('.error-message');

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

    if (b === 0) {
        errorMessage.textContent = 'Cannot divide by zero!';
        return clearButtonHandler();
    }

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

// ** NUMBER Buttons ** //
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', numberHandler);
});

// Function to handle numbers that are clicked
function numberHandler(e) {

    if (screen.classList.contains('equal-selected')) {
        console.log('Need an operator !!');
        errorMessage.textContent = 'Select an operator';
    } else {
        // As soon as numberHanlder is triggered, add number-selected class to screen as flag that previous selection was number
        if (screen.classList.contains('number-selected') == false) {
            console.log("Number was selected");
            screen.classList.add('number-selected');
        } 

        // *** Can abstract this into another function *** //
        // Remove operator-selected class from screen if there
        if (screen.classList.contains('operator-selected')) {
            screen.classList.remove('operator-selected');
            console.log(`Operator-selected removed: ${screen.classList}`);
        }

        // ** This can be abstracted ** //
        // *** This is a check to see if current display on screen is a previous result, if so clear so that the number stored in e can be displayed *** //
        // Clear screen if screenDiv has class="result", then remove class
        if (screen.classList.contains('result')) {
            screen.textContent = ''; // Reset screen content
            screen.classList.remove('result');
        }

        screen.textContent += e.srcElement.textContent;  // Append number stored in e to screen 
    }

}

//** Operators **//
const operators = document.querySelectorAll('.operator'); // Node list of operators
operators.forEach(operator => {
    operator.addEventListener('click', operatorHandler);
});

// Add class to operator button onClick to highlight its selection, remove highlight
// from other operator buttons
function operatorHandler(e) {
    
    // Style whatever operator was selected, currently stored in e, as the active operator
    styleActiveOperator(e);

    if (screen.classList.contains('number-selected') == false && screen.classList.contains('operator-selector')) {
        console.log('NEED A NUMBER bro');
        valueStorage[1] = e.srcElement.textContent; // Update value for operator in the values array to user-selected operation
        operationMessage.textContent = `${valueStorage[0]} ${valueStorage[1]}`;
    } else if (screen.classList.contains('operator-selected')) {  // Check if screen has an operator-selected class 
        valueStorage[1] = e.srcElement.textContent; // Update value for operator in the values array to user-selected operation
        operationMessage.textContent = `${valueStorage[0]} ${valueStorage[1]}`;
    } else if (screen.classList.length === 1) {
        console.log("Screen just has the screen class, no action here!!");
        resetOperatorStyle();
    } else {
        screen.classList.remove('number-selected');
        screen.classList.remove('equal-selected');
        screen.classList.add('operator-selected');

        errorMessage.textContent = '';
        
        // Store values, add op-selected class to screen as flag that most recent user selection was an operator
        storeValues(screen.textContent, e.srcElement.textContent); 

        // Display current operation
        operationMessage.textContent = `${valueStorage[0]} ${valueStorage[1]}`;
    }

    console.log(`Value storage: ${valueStorage}`);
}

function styleActiveOperator(e) {
    const siblings = e.srcElement.parentElement.childNodes;

    // Add style to currently selected operator, remove style from all other operators
    siblings.forEach(sibling => {
        if (e.srcElement === sibling) {
            sibling.classList.add('operator-active');
        } else if (sibling.classList) {
            sibling.classList.remove('operator-active');
        }
    });
}

function resetOperatorStyle() {
    // Assign nodelist of operators to var
    const operators = document.querySelectorAll('.operator');

    operators.forEach(operator => {
        if (operator.classList.contains('operator-active')) {
            operator.classList.remove('operator-active');
        }
    });
}

function storeValues(number, operator) {

    const userMessage = document.querySelector('.user-message');
    
    valueStorage.push(number);

    if (valueStorage.length === 3) {
        const result = operate(parseInt(valueStorage[0]), parseInt(number), valueStorage[1]);
        
        // Display result on screen
        screen.textContent = result;

        // Reset valueStorage array, push current result and operator
        valueStorage = [];
        valueStorage.push(result);
        valueStorage.push(operator);

        // Add result class to screen as flag to validate that textContent is the current result
        screen.classList.add('result');

        // Set userMessage to display answer
        userMessage.textContent = `Ans = ${result}`;
        operationMessage.textContent = `${result} ${operator}`;
        

        // Remove operator class
        screen.classList.remove('operator-active');

    } else {
        valueStorage.push(operator)

        // Clear screen 
        screen.textContent = "";
    }
}

// Reference to equal button
const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', equalHandler);


function equalHandler() {
    console.log("***Equal handler ***");
    console.log(`Currently stored values ${valueStorage}`);

    if (valueStorage.length == 2 && screen.textContent != "" && screen.classList.contains('result') === false) {
        const result = operate(parseInt(valueStorage[0]), parseInt(screen.textContent), valueStorage[1]);
        screen.textContent = result;
        screen.classList.add('result');
        screen.classList.add('equal-selected');
        userMessage.textContent = `Ans = ${result}`;
        operationMessage.textContent = `${result}`;
        valueStorage = [];
    } else if (screen.textContent == "") {
        console.log("Screen is empty and or valueStorage doesn't have enough values and or screen is displaying the previous result and user hasn't selected a new number.");
    } else {
        console.log("Value storage does not have enough values");
    }

    console.log(`Values stored after operations ${valueStorage}`);
}

// Reference to clear button, set click listener
const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clearButtonHandler);

function clearButtonHandler() {
    // Reset screen
    screen.textContent = '';

    // Reset ans and operation displays
    userMessage.textContent = '';
    operationMessage.textContent = '';

    // Reset list of values
    valueStorage = [];

    // Clear class list from screen except screen class
    screen.classList.remove(...screen.classList);
    screen.classList.add('screen');


    console.log(screen.classList);

    // Reset any active operators
    resetOperatorStyle();
}

// Reference to +/- change sign
const changeSign = document.querySelector('.change-sign');
changeSign.addEventListener('click', () => {
    if (screen.textContent != "")
        if (parseInt(screen.textContent) >= 0) {
            let temp = screen.textContent;
            screen.textContent = "-" + temp; 
            if (screen.classList.contains('result')) {
                // Update value in value storage array
                valueStorage[0] = screen.textContent;
            }
        } else {
            let temp = screen.textContent.slice(1);
            screen.textContent = temp;
            if (screen.classList.contains('result')) {
                // Update value in value storage array
                valueStorage[0] = screen.textContent;
            }
        }
});

function changeSignHandler() {

    if (screen.textContent != "")
        if (parseInt(screen.textContent) >= 0) {
            let temp = screen.textContent;
            screen.textContent = "-" + temp; 
            if (screen.classList.contains('result')) {
                // Update value in value storage array
                valueStorage[0] = screen.textContent;
            }
        } else {
            let temp = screen.textContent.slice(1);
            screen.textContent = temp;
            if (screen.classList.contains('result')) {
                // Update value in value storage array
                valueStorage[0] = screen.textContent;
            }
        }
        
}