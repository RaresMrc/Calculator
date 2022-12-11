//button grid from 0-9 and ()
const buttonGrid = document.querySelector('.button-grid');

//buttons: object with all buttons from buttonGrid with {el.textContent : el} key-values
const buttons = [...buttonGrid.querySelectorAll('button')].reduce((obj, el) => {
    obj[el.textContent] = el;
    return obj;
}, {});

//counts the number of substrings in a string
function substrCount(str, substr) {
    let count = 0;
    let index = 0;
    while (str.includes(substr, index)) {
        count += 1;
        index = str.indexOf(substr, index) + substr.length + 1;
    }
    return count;
}

//counts the number of a char in a string
function charCount(str, char) {
    let count = 0;
    for (c of str) {
        if (c == char) count += 1;
    }
    return count;
}

//click event for the buttonGrid
buttonGrid.addEventListener('click', ev => {
    if (ev.target.localName !== 'button') return;
    console.log(`Clicked: ${ev.target.textContent}`);
    if (ev.target.textContent == ')') {
        if (operations[OUTPUT.textContent.slice(-1)]) return;
        if (substrCount(OUTPUT.textContent, '(') == substrCount(OUTPUT.textContent, ')')) return;
    }
    OUTPUT.textContent += ev.target.textContent;
}, {passive: true});

//keypress event, if the key pressed is in buttons, then simulate click event for respective key
document.addEventListener('keypress', ev => {
    if (!buttons[ev.key]) return;
    buttons[ev.key].click();
}, {passive : true});

//operation grid with +-*/
const operationGrid = document.querySelector('.operation-grid');

//operations: object with all operations from operationGrid with {el.textContent : el} key-values
const operations = [...operationGrid.querySelectorAll('button')].reduce((obj, el) => {
    obj[el.textContent] = el;
    return obj;
}, {});

//object with all operation methods; use callOperation for consistency and cleaner code
const operationsFunctions = {
    '+' : function(firstTerm, secondTerm) {
        return Number(firstTerm) + Number(secondTerm);
    },
    '-' : function(firstTerm, secondTerm) {
        return Number(firstTerm) - Number(secondTerm);
    },
    '*' : function(firstTerm, secondTerm) {
        return Number(firstTerm) * Number(secondTerm);
    },
    '/' : function(firstTerm, secondTerm) {
        return Number(firstTerm) / Number(secondTerm);
    },
    'callOperation' : function(firstTerm, secondTerm, operation) {
        return operationsFunctions[operation](firstTerm, secondTerm);
    }
}

//click event for the operationGrid
operationGrid.addEventListener('click', ev => {
    if (ev.target.localName !== 'button') return;
    console.log(`Clicked: ${ev.target.textContent}`);
    if (!operations[OUTPUT.textContent.slice(-1)] && OUTPUT.textContent && OUTPUT.textContent.slice(-1) !== '(') OUTPUT.textContent += ev.target.textContent;
}, {passive:true});


//keypress event, if the key pressed is in operations, then simulate click event for respective key
document.addEventListener('keypress', ev => {
    if (!operations[ev.key]) return;
    operations[ev.key].click();
}, {passive : true});

//special operations grid
const specialOperationsObject = document.querySelector('.special-operations');

//object with all special operations with {el.textContent : el} key-values
const specialOperations = [...specialOperationsObject.querySelectorAll('button')].reduce((obj, el) => {
    obj[el.textContent] = el;
    return obj;
}, {});

//object with methods for special operations
const specialOperationsFunctions = {
    'C' : function() {
        OUTPUT.textContent = '';
    },
    '=' : function() {
        OUTPUT.textContent = calculate(OUTPUT.textContent);
    },
    '<-': function() {
        OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.textContent.length-1);
    },
    callMethod : function(methodName) {
        this[methodName]();
    },
};


//click event for the special operations grid
specialOperationsObject.addEventListener('click', ev => {
    if (ev.target.localName !== 'button') return;
    console.log(`Clicked: ${ev.target.textContent}`);
    specialOperationsFunctions.callMethod(ev.target.textContent);
});

//keypress event for the special operations, if the key pressed is in specialOperations, then simulate click event for respective key
document.addEventListener('keypress', ev => {
    if (!specialOperations[ev.key]) return;
    specialOperations[ev.key].click();
}, {passive : true});

document.addEventListener('keydown', ev => {
    if (ev.code == 'Backspace') specialOperations['<-'].click();
});

//evaluates the string and calculates the given operation until there's none left
function calculateOperation(str, operation) {
    while (str.indexOf(operation, 1) !== -1) {
        let opIndex = str.indexOf(operation, 1);
        let opStart = 0;
        let opEnd = str.length-1;
        
        for (let iterator = opIndex-1; iterator > 0; iterator--) {
            if (operations[str[iterator]]) {
                opStart = iterator + 1;
                break;
            }
        }

        for (let iterator = opIndex+1; iterator < str.length; iterator++) {
            if (operations[str[iterator]]) {
                opEnd = iterator - 1;
                break;
            }
        }

        let firstTerm = str.slice(opStart, opIndex);
        let secondTerm = str.slice(opIndex+1, opEnd + 1);
        let result = operationsFunctions.callOperation(firstTerm, secondTerm, operation);
        console.log(`Operation: ${firstTerm} ${operation} ${secondTerm}; Result: ${result}`);
        str = str.slice(0, opStart) + result + str.slice(opEnd + 1, str.length);
        str = signAnalysis(str);
        console.log(str);
    }
    return str;
}

//analyzes the string and changes signs where needed
function signAnalysis(str) {
    for (let index = 0; index < str.length - 1; index++) {
        if ((str[index] == str[index+1]) && (str[index] == '-')) {
            str = str.slice(0, index) + '+' + str.slice(index+2, str.length);
        }

        if ((str[index] == '+') && (str[index+1] == '-')) {
            str = str.slice(0, index) + str.slice(index+1, str.length);
        }
    }
    return str;
}

//returns the precedence of an operator
function prec(c) {
    if(c == '^')
        return 3;
    else if(c == '/' || c=='*')
        return 2;
    else if(c == '+' || c == '-')
        return 1;
    else
        return -1;
}

function infixToPostfix(str) {
    let stack = [];
    let result = [];
    let i = 0;
    while (i < str.length) {
        let c = str[i];

        if (c >= '0' && c <= '9') {
            let n = 0;
            while (c >= '0' && c <= '9') {
                n = n * 10 + +c;
                i++;
                c = str[i];
            }
            i--;
            result.push(n);
        } else if (c == '(') {
            stack.push('(');
        } else if (c == ')') {
            while (stack[stack.length - 1] != '(') {
                result.push(stack[stack.length - 1]);
                stack.pop();
            }
            stack.pop();
        } else {
            while (stack.length != 0 && prec(str[i]) <= prec(stack[stack.length - 1])) {
                result.push(stack[stack.length - 1]);
                stack.pop();
            }
            stack.push(c);
        }
        i++;
    }

    while (stack.length != 0) {
        result.push(stack[stack.length - 1]);
        stack.pop();
    }
    
    return result;
}

function postfixCalculation(str) {
    let stack = [];

    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (!operations[c]) {
            stack.push(c);
        } else {
            let secondTerm = stack.pop();
            let firstTerm = stack.pop();
            stack.push(operationsFunctions.callOperation(firstTerm, secondTerm, c));
        }
    }
    return stack.pop();
}

//calculates all paranthesis individually, then gets rid of the paranthesis and adds the result to the output string
function calculateParanthesis(str) {
    while (str.indexOf(')') !== -1) {
        let paranthesisEnd = str.indexOf(')');
        let paranthesisStart = 0;

        for (let index = paranthesisEnd - 1; index > 0; index--) {
            if (str[index] == '(') {
                paranthesisStart = index;
                break;
            }
        }

        paranthesisResult = calculate(str.slice(paranthesisStart + 1, paranthesisEnd));
        str = str.slice(0, paranthesisStart) + paranthesisResult + str.slice(paranthesisEnd + 1, str.length);
    }
    return str;
}

//evaluates and calculates the string
function calculate(str) {
    // str = calculateParanthesis(str);
    // str = calculateOperation(str, '/');
    // str = calculateOperation(str, '*');
    // str = calculateOperation(str, '-');
    // str = calculateOperation(str, '+');
    str = infixToPostfix(str);
    console.log(str);
    str = postfixCalculation(str);
    console.log(str);
    return str;
}



//OUTPUT.textContent is the string used to show the output
let OUTPUT = document.getElementById('output');
OUTPUT.textContent = '';