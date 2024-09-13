const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else if (button.classList.contains('operator')) {
            chooseOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '';
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    display.value = currentInput;
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result;
    operator = '';
    previousInput = '';
    display.value = result;
}
