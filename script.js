const screen = document.querySelector("#screen");
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".op");
const equalButton = document.querySelector("#equal");
const signButton = document.querySelector("#sign")

const component = {
	text: "",
	firstNumber: { digit: "", signed: false },
	secondNumber: { digit: "", signed: false },
	operator: null
}

numButtons.forEach(b => {
	b.addEventListener("click", () => {
		const value = b.dataset.value;
		component.text += value;
		if (component.operator) {
			component.secondNumber.digit += value;
		} else {
			component.firstNumber.digit += value;
		}
		console.log(component.firstNumber.digit, component.secondNumber.digit); // TEST 
		displayDigits(screen, component.text);
	})
})

operatorButtons.forEach(b => {
	b.addEventListener("click", () => {
		if (component.operator) return;
		const value = b.dataset.value;
		component.text += ` ${value} `; // adds spaces
		component.operator = value;
		console.log(component.firstNumber.digit, component.secondNumber.digit); // TEST 
		displayDigits(screen, component.text);
	})
})

equalButton.addEventListener("click", () => {
	if (!component.operator) return;
	const result = operate(component.firstNumber, component.secondNumber, component.operator);
	// set firstNumber & text = result of the operation
	// reset secondNumber & operator = "" & null
	resetComponent(component, result);
	console.log(component.firstNumber.digit, component.secondNumber.digit); // TEST 
	displayDigits(screen, component.text)
})

signButton.addEventListener("click", () => {
	// TODO: Implement the signing numbers
})


function operate(firstNumber, secondNumber, operator) {
	// add signed while simultanously convert the string digits to Number
	const n1 = firstNumber.signed ? -firstNumber.digit : +firstNumber.digit;
	const n2 = secondNumber.signed ? -secondNumber.digit : +secondNumber.digit;
	if (operator === "+") {
		return add(n1, n2);
	} else if (operator === "-") {
		return subtract(n1, n2);
	} else if (operator === "*") {
		return multiply(n1, n2);
	} else if (operator === "/") {
		return divide(n1, n2);
	} else if (operator === "%") {
		return modulo(n1, n2);
	}
}

function resetComponent(component, operationResult) {
	component.text = operationResult;
	component.firstNumber.digit = operationResult;
	component.secondNumber.digit = "";
	component.operator = null;
}

function displayDigits(screen, value) {
	screen.innerText = value;
}


function add(n1, n2) {
	return n1 + n2
}
function subtract(n1, n2) {
	return n1 - n2;
}
function multiply(n1, n2) {
	return n1 * n2;
}
function divide(n1, n2) {
	return n1 / n2;
}
function modulo(n1, n2) {
	return n1 % n2;
}



