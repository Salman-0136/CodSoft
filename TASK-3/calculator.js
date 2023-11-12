const screen = document.getElementById('screen');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const percentageButton = document.getElementById('percentage');
const divideButton = document.getElementById('divide');
const multiplyButton = document.getElementById('multiply');
const subtractButton = document.getElementById('subtract');
const addButton = document.getElementById('add');
const equalsButton = document.getElementById('equals');
const decimalButton = document.getElementById('decimal');
const numberButtons = document.querySelectorAll('.number');
const piButton = document.getElementById('pi-button');

let currentInput = '0';
let operator = null;
let previousInput = '';
let shouldResetScreen = false;

const history = [];

function updateScreen() {
    screen.value = currentInput;
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput === '0' || shouldResetScreen) {
            currentInput = button.textContent;
            shouldResetScreen = false;
        } else {
            currentInput += button.textContent;
        }
        updateScreen();
    });
});

function updateHistoryDisplay() {
    const historyDisplay = history.join('<br>');
    document.getElementById('history-display').innerHTML = historyDisplay;
}

clearButton.addEventListener('click', () => {
    currentInput = '0';
    operator = null;
    previousInput = '';
    updateScreen();
});

const clearHistoryButton = document.getElementById('clear-history-button');
clearHistoryButton.addEventListener('click', () => {
    history.length = 0;
    updateHistoryDisplay();
});

backspaceButton.addEventListener('click', () => {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateScreen();
});

decimalButton.addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateScreen();
    }
});

divideButton.addEventListener('click', () => {
    if (operator !== null) {
        compute();
    }
    operator = '/';
    previousInput = currentInput;
    shouldResetScreen = true;
});

multiplyButton.addEventListener('click', () => {
    if (operator !== null) {
        compute();
    }
    operator = 'X';
    previousInput = currentInput;
    shouldResetScreen = true;
});

subtractButton.addEventListener('click', () => {
    if (operator !== null) {
        compute();
    }
    operator = '-';
    previousInput = currentInput;
    shouldResetScreen = true;
});

addButton.addEventListener('click', () => {
    if (operator !== null) {
        compute();
    }
    operator = '+';
    previousInput = currentInput;
    shouldResetScreen = true;
});

equalsButton.addEventListener('click', () => {
    compute();
    operator = null;
});

piButton.addEventListener('click', () => {
    currentInput = Math.PI.toString();
    updateScreen();
});

percentageButton.addEventListener('click', () => {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateScreen();
});

function compute() {
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    if (operator === '+') {
        result = previous + current;
    } else if (operator === '-') {
        result = previous - current;
    } else if (operator === 'X') {
        result = previous * current;
    } else if (operator === '/') {
        if (current !== 0) {
            result = previous / current;
        } else {
            currentInput = 'Error';
        }
    }

    const calculation = `${previousInput} ${operator} ${currentInput} = ${result}`;
    history.push(calculation);

    currentInput = result.toString();
    shouldResetScreen = true;
    updateHistoryDisplay();
    updateScreen();
}
