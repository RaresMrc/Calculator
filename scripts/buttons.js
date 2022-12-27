import {OUTPUT} from './main.js'
import {calculate} from './postfix.js'

//button grid from 0-9 and ()
const buttonGrid = document.querySelector('.button-grid');

//buttons: object with all buttons from buttonGrid with {el.textContent : el} key-values
export const buttons = [...buttonGrid.querySelectorAll('button')].reduce((obj, el) => {
    obj[el.textContent] = el;
    return obj;
}, {});

//operation grid with +-*/
const operationGrid = document.querySelector('.operation-grid');

//operations: object with all operations from operationGrid with {el.textContent : el} key-values
export const operations = [...operationGrid.querySelectorAll('button')].reduce((obj, el) => {
    obj[el.textContent] = el;
    return obj;
}, {});

//object with all operation methods; use callOperation for consistency and cleaner code
export const operationsFunctions = {
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

//special operations grid
const specialOperationsObject = document.querySelector('.special-operations');

//object with all special operations with {el.textContent : el} key-values
export const specialOperations = [...specialOperationsObject.querySelectorAll('button')].reduce((obj, el) => {
    obj[el.textContent] = el;
    return obj;
}, {});

//object with methods for special operations
export const specialOperationsFunctions = {
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

export {buttonGrid, operationGrid, specialOperationsObject};