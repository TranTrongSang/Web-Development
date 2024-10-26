let currentInput = '';
let previousInput = '';
let operation = null;

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculateResult();
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Error';
            break;
        default:
            return;
    }

    currentInput = result;
    operation = null;
    previousInput = '';
    updateDisplay();
}

function clearResult() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('result').value = currentInput;
}
