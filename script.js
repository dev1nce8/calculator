const screen = document.querySelector("#screen");
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".op");
const equalButton = document.querySelector("#equal");
const signButton = document.querySelector("#sign");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#del");
const decimalButton = document.querySelector("#dec");

const component = {
	text: "",
	firstNumber: { digit: "", signed: false },
	secondNumber: { digit: "", signed: false },
	result: null,
	operator: null
};

// keyboard support
window.addEventListener("keydown", (e) => {
	const value = e.key;
	if (!isNaN(Number(value)) && value !== " ") {
		inputDigit(value, component);
	};

	if (value === "+" || value === "-" || value === "*" || value === "/" || value === "%") {
		inputOperartor(value, component);
	};

	if (value === "Enter") {
		equal(component);
	};

	if (value === "Backspace") {
		del(component);
	}

	if (value === ".") {
		inputDecimanl(component);
	}

	if (e.shiftKey) {
		if (value === "Backspace") {
			clearComponent(component);
		}
	}
	displayDigits(screen, component.text);
});

numButtons.forEach(b => {
	b.addEventListener("click", () => {
		const value = b.dataset.value;
		inputDigit(value, component);
		displayDigits(screen, component.text);
	});
});

operatorButtons.forEach(b => {
	b.addEventListener("click", () => {
		inputOperartor(b.dataset.value, component);
		displayDigits(screen, component.text);
	});
});


decimalButton.addEventListener("click", () => {
	inputDecimanl(component);
	displayDigits(screen, component.text);
});

equalButton.addEventListener("click", () => {
	equal(component);
	displayDigits(screen, component.text);
});


signButton.addEventListener("click", () => {
	inputSign(component);
	displayDigits(screen, component.text);
});

clearButton.addEventListener("click", () => {
	clearComponent(component);
	displayDigits(screen, component.text);
});

deleteButton.addEventListener("click", () => {
	del(component);
	displayDigits(screen, component.text);
})


function operate(firstNumber, secondNumber, operator) {
	// add signed while simultanously convert the string digits to Number
	const n1 = Number(firstNumber);
	const n2 = Number(secondNumber);
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
	};
};


function resetComponent(component) {
	component.text = component.result;
	component.firstNumber = { digit: component.result, signed: false };
	component.secondNumber = { digit: "", signed: false };
	component.operator = null;
};

function clearComponent(component) {
	component.text = "";
	component.firstNumber = { digit: "", signed: false };
	component.seconNumber = { digit: "", signed: false };
	component.operator = null;
	component.result = null;
};

function displayDigits(screen, value) {
	screen.innerText = value;
};

function inputDigit(digit, component) {
	if (component.result) clearComponent(component);
	if (component.text === "" && digit === "0") return;

	component.text += digit;

	if (component.operator) {
		component.secondNumber.digit += digit;
	} else {
		component.firstNumber.digit += digit;
	};
};

function inputOperartor(operator, component) {
	if (component.firstNumber.digit === "") return;
	if (component.operator) {
		component.result = operate(component.firstNumber.digit, component.secondNumber.digit, component.operator);
		// set firstNumber & text = result of the operation
		// reset secondNumber & operator = "" & null
		if (component.result === Infinity) {
			alert("Can't Divide by zero")
			return;
		};
		resetComponent(component);
		const value = operator;
		component.text += ` ${value} `; // adds spaces
		component.operator = value;
	} else {
		const value = operator;
		component.text += ` ${value} `; // adds spaces
		component.operator = value;
	};
}

function equal(component) {
	if (!component.operator || component.secondNumber.digit === "") return;
	component.result = operate(component.firstNumber.digit, component.secondNumber.digit, component.operator);
	if (component.result === Infinity) {
		alert("Can't Divide by zero")
		return;
	};
	// set firstNumber & text = result of the operation
	// reset secondNumber & operator = "" & null
	resetComponent(component);
};

function del(component) {
	if (component.result) {
		clearComponent(component);
		displayDigits(screen, component.text);
	};
	if (component.secondNumber.digit) {
		const secondNumber = component.secondNumber.digit;
		component.secondNumber.digit = secondNumber.slice(0, secondNumber.length - 1);
	} else if (component.operator && !component.secondNumber.digit) {
		component.operator = null;
	} else {
		const firstNumber = component.firstNumber.digit;
		component.firstNumber.digit = firstNumber.slice(0, firstNumber.length - 1);
	};
	const num1 = component.firstNumber.digit ? component.firstNumber.digit : "";
	const num2 = component.secondNumber.digit ? component.secondNumber.digit : "";
	const op = component.operator ? ` ${component.operator} ` : "";
	component.text = num1 + op + num2;
}

function inputDecimanl(component) {
	if (component.text.includes(".")) return;
	component.text += ".";
	if (component.secondNumber.digit !== "") {
		if (!component.secondNumber.digit.includes(".")) {
			component.secondNumber.digit += ".";
		};
	} else if (component.firstNumber.digit !== "") {
		if (!component.firstNumber.digit.includes(".")) {
			component.firstNumber.digit += ".";
		};
	};
}

function inputSign(component) {
	if (component.secondNumber.digit !== "") {
		const num2 = component.secondNumber.digit;
		component.secondNumber.signed = !component.secondNumber.signed;
		component.secondNumber.digit = component.secondNumber.signed ? "-" + num2 : num2.slice(1);
	} else if (component.firstNumber.digit !== "") {
		const num1 = component.firstNumber.digit;
		component.firstNumber.signed = !component.firstNumber.signed;
		component.firstNumber.digit = component.firstNumber.signed ? "-" + num1 : num1.slice(1);
	}
	const num1 = component.firstNumber.digit ? component.firstNumber.digit : "";
	const num2 = component.secondNumber.digit ? component.secondNumber.digit : "";
	const op = component.operator ? ` ${component.operator} ` : "";
	component.text = num1 + op + num2;
}

function add(n1, n2) {
	return n1 + n2;
};
function subtract(n1, n2) {
	return n1 - n2;
};
function multiply(n1, n2) {
	return n1 * n2;
};
function divide(n1, n2) {
	return n1 / n2;
};
function modulo(n1, n2) {
	return n1 % n2;
};
