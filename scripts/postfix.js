import {buttons, operations, operationsFunctions, specialOperations, specialOperationsFunctions, buttonGrid, operationGrid, specialOperationsObject} from './buttons.js'

//returns the precedence of an operator
export function prec(c) {
    if(c == '^')
        return 3;
    else if(c == '/' || c=='*')
        return 2;
    else if(c == '+' || c == '-')
        return 1;
    else
        return -1;
}

export function infixToPostfix(str) {
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

export function postfixCalculation(str) {
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

//evaluates and calculates the string
export function calculate(str) {
    str = infixToPostfix(str);
    console.log(str);
    str = postfixCalculation(str);
    console.log(str);
    return str;
}