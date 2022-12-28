import {substrCount, charCount} from './stringHandling.js'
import {prec, infixToPostfix, postfixCalculation, calculate} from './postfix.js'
import {buttons, operations, operationsFunctions, specialOperations, specialOperationsFunctions, buttonGrid, operationGrid, specialOperationsObject} from './buttons.js'

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
    buttons[ev.key].focus();
    buttons[ev.key].click();
}, {passive : true});

//click event for the operationGrid
operationGrid.addEventListener('click', ev => {
    if (ev.target.localName !== 'button') return;
    console.log(`Clicked: ${ev.target.textContent}`);
    if (!operations[OUTPUT.textContent.slice(-1)] && OUTPUT.textContent && OUTPUT.textContent.slice(-1) !== '(') OUTPUT.textContent += ev.target.textContent;
}, {passive:true});


//keypress event, if the key pressed is in operations, then simulate click event for respective key
document.addEventListener('keypress', ev => {
    if (!operations[ev.key]) return;
    operations[ev.key].focus();
    operations[ev.key].click();
}, {passive : true});


//click event for the special operations grid
specialOperationsObject.addEventListener('click', ev => {
    if (ev.target.localName !== 'button') return;
    console.log(`Clicked: ${ev.target.textContent}`);
    specialOperationsFunctions.callMethod(ev.target.textContent);
});

//keypress event for the special operations, if the key pressed is in specialOperations, then simulate click event for respective key
document.addEventListener('keypress', ev => {
    if (!specialOperations[ev.key]) return;
    specialOperations[ev.key].focus();
    specialOperations[ev.key].click();
}, {passive : true});

document.addEventListener('keydown', ev => {
    if (ev.code == 'ArrowLeft') {
        specialOperations['<-'].click();
        specialOperations['<-'].focus();
    }
});

//OUTPUT.textContent is the string used to show the output
export let OUTPUT = document.getElementById('output');
OUTPUT.textContent = '';

// OUTPUT.addEventListener('keydown', (ev) => {
//     if (ev.ctrlKey && ev.key == 'c') {
//         console.log('Pressed Ctrl+C');
//         navigator.clipboard.writeText(OUTPUT.textContent);
//     }

//     if (ev.ctrlKey && ev.key == 'v') {
//         console.log('Pressed Ctrl+V');
//         navigator.clipboard.readText().then((clipText) => {
//             OUTPUT.textContent = clipText;
//         })
//     }
// })