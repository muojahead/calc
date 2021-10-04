const numBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equals]");
const delBtn = document.querySelector("[data-delete]");
const delAllBtn = document.querySelector("[data-all-clear]");
const prevOperandText = document.querySelector("[data-prev-operand]");
const crntOperandText = document.querySelector("[data-crnt-operand]");

class Calculator {
    constructor(prevOperandText, crntOperandText) {
        this.prevOperandText = prevOperandText;
        this.crntOperandText = crntOperandText;
        this.clear();
    }
    clear() {
        this.crntOperand = "";
        this.prevOperand = "";
        this.operation = undefined;
    }
    delete() {
        this.crntOperand = this.crntOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (this.crntOperand == this.finalValue) {
            this.crntOperand = "";
        }
        if (number == "." && this.crntOperand.includes(".")) return;
        this.crntOperand = this.crntOperand.toString() + number.toString();
    }
    chooseOpeation(operation) {
        if (this.crntOperand === "") return;
        if (this.prevOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.crntOperand;
        this.crntOperand = "";
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const currnt = parseFloat(this.crntOperand);
        if (isNaN(prev) || isNaN(currnt)) return;
        switch (this.operation) {
            case "+":
                computation = prev + currnt;
                break;
            case "-":
                computation = prev - currnt;
                break;

            case "*":
                computation = prev * currnt;
                break;

            case "÷":
                computation = prev / currnt;
                break;
            default:
                return;
        }
        this.crntOperand = computation;
        this.operation = undefined;
        this.prevOperand = "";
        this.finalValue = computation;
    }
    updateDisplay() {
        this.crntOperandText.innerText = this.getDisplayNumber(this.crntOperand);
        if (this.operation != null) {
            this.prevOperandText.innerText = `${this.getDisplayNumber(
        this.prevOperand
      )} ${this.operation}`;
        } else {
            this.prevOperandText.innerText = "";
        }
    }
}
const calculator = new Calculator(prevOperandText, crntOperandText);

numBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});
operationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        calculator.chooseOpeation(btn.innerText);
        calculator.updateDisplay();
    });
});
equalBtn.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

delAllBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

delBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});