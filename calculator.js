let calculation = '';

let isSecondMode = false;

function handleButtonClick(button) {
    const buttonText = button.textContent;

    if (buttonText === '2nd') {
        button.classList.toggle('active');
        toggleSecondMode();
        return;
    }

    function toggleSecondMode() {
        isSecondMode = !isSecondMode;
        updateButtonLabels();
    }

    function updateButtonLabels() {
        const buttonsToToggle = document.querySelectorAll('.buttons:not(.button-group) .button:first-child');
        buttonsToToggle.forEach((button) => {
            const originalText = button.dataset.originalText;
            button.textContent = isSecondMode ? button.dataset.secondText : originalText;
        });
    }

    switch (buttonText) {
        case 'CE':
            clearResult();
            break;
        case '=':
            calculateResult();
            break;
        case 'X':
            appendToResult('*');
            break;
        case '⌫':
            removeFromResult();
            break;
        case 'e':
            appendToResult(Math.E.toString());
            break;
        case 'π':
            appendToResult(Math.PI.toString());
            break;
        case 'mod':
            appendToResult('%');
            break;
        case 'x²':
            calculatePow(2, '²');
            break;
        case 'xy':
            appendToResult('**');
            break;
        case 'log':
            appendToResult('log(');
            break;
        case 'ln':
            appendToResult('ln(');
            break;
        case 'n!':
            handleFactorial();
            break;
        case '2√x':
            appendToResult('√');
            break;
        
        default:
            appendToResult(buttonText);
            break;
    }
}

function appendToResult(value) {
    calculation += value;
    updateResultDisplay();
}

function removeFromResult() {
    const resultElement = document.getElementById("result");
    const currentText = resultElement.textContent;
    resultElement.textContent = currentText.slice(0, -1);
    calculation = calculation.slice(0, -1);
}

function clearResult() {
    calculation = '';
    updateResultDisplay();
}

function calculateResult() {
    try {
        const replacedCalculation = replaceSpecialFunctions(calculation);
        const result = new Function('return ' + replacedCalculation)();
        document.getElementById("result").textContent = result;
        calculation = result.toString();
    } catch (error) {
        document.getElementById("result").textContent = 'Error';
        calculation = '';
    }
}

function updateResultDisplay() {
    document.getElementById("result").textContent = calculation;
}

function calculatePow(exponent, displayText) {
    const resultElement = document.getElementById("result");
    try {
        const result = Math.pow(eval(calculation), exponent);
        resultElement.innerHTML += displayText;
        calculation = result.toString();
    } catch (error) {
        resultElement.innerHTML = 'Error';
        calculation = '';
    }
}

function handleFactorial() {
    const resultElement = document.getElementById("result");
    try {
        const value = eval(calculation);
        const result = factorial(value);
        resultElement.innerHTML = `${value}!`;
        calculation = result.toString();
    } catch (error) {
        resultElement.innerHTML = 'Error';
        calculation = '';
    }
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function replaceSpecialFunctions(expression) {
    return expression
        .replace(/log/g, 'Math.log10')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√/g, 'Math.sqrt(');
}
