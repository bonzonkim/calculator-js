class Calculator {
    currentOperand; // 현재 연산
    previousOperand; // 이전 연산
    operation; // ÷, -, + 등 연산기호
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText; // 계산기 제일 위 입력했던 연산
        this.currentOperandText = currentOperandText; // 현재 입력중인 연산
        this.clear(); // Calculator 객체 생성 시 초기값 세팅
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number;
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return; // 아무것도 입력하지 않고 연산버튼을 누를 경우 반응 없음
        if (this.previousOperand !== '') {
            this.compute(); // 이전값이 있다면 연산버튼 누를경우 이전 값에 계산되어서 반영됨
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand; // 연산버튼을 누를 경우 현재 입력중인 것은 위로 올라가고
        this.currentOperand = ''; // 현재 입력중인건 빈칸으로 바뀐다.
    }

    compute() {
        let computeResult;
        const prev = +this.previousOperand; // +는 정수형변환
        const current = +this.currentOperand;
        if (isNaN(prev) || isNaN(current)) return; // 정수가 아니라면 리턴

        switch (this.operation) {
            case "+":
                computeResult = prev + current;
                break;
            case "-":
                computeResult = prev - current;
                break;
            case "*":
                computeResult = prev * current;
                break;
            case "÷":
                computeResult = prev /  current;
                break;
            default:
                return;
        }
        this.currentOperand = computeResult;
        this.operation = undefined;
        this.previousOperand = '';

    }

    updateDisplay() {
        // 연산버튼을 누르지 않았다면 현재 입력값만 보여주고 연산버튼을 누르면 연산기호까지 보여줌
        this.previousOperandText.innerText =
            this.previousOperand === '' ?
            this.previousOperand :
            `${this.previousOperand} ${this.operation}`;

        this.currentOperandText.innerText = this.currentOperand;
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const acButton = document.querySelector('[data-ac]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText); //현재 버튼의 숫자를 넣음
        calculator.updateDisplay(); // 계산기화면 업데이트
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

acButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
