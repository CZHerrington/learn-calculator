"use strict";

const input = document.getElementById("input"), // input/output button
    numbers = document.querySelectorAll(".numbers div"), // number buttons
    operators = document.querySelectorAll(".operators div"), // operator buttons
    result = document.getElementById("result"), // equal button
    clear = document.getElementById("clear"); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

let buffer = [];
let operatorStrings = ['+', '-', '*', '/'];

let updateDisplayFromBuffer = () => {
    input.innerHTML = buffer.join(' ');
}

function addNumber(n) {
    if (n === "C") {
        buffer = [];
    } else {
        buffer.push(n);
    }
    updateDisplayFromBuffer();
}

function addOp(op) {
    if (operatorStrings.includes(buffer[buffer.length - 1])) {
        buffer.splice(buffer.length - 1, 1, op);
    } else {
        buffer.push(op);
    }
    updateDisplayFromBuffer();
}

function calculate() {
    let sBuffer = buffer.join('');
    console.log('buffer: ', buffer);
    let opReg = /[\+|\-|\*|\/]/g;
    let numReg = /[0-9|\.]/g;
    let ops = sBuffer.split(numReg).filter(a => a !== "");
    let operands = sBuffer.split(opReg).map((val) => Number(val));

    function singleOperation(o, n, sym) {
        if (ops.indexOf(sym) !== -1) {
            let pOp = o.indexOf(sym);
            let res = (n[pOp] * n[pOp + 1])
            o.splice(pOp, 1)
            n.splice(pOp, 2, res);
        }
    }
    for (let i = 0; i <= ops.length; i++) {
        // complete each operation on operands while respecting pemdas
        // todo: reduce the four blocks of similar code into an abstracted fxn
        if (ops.indexOf('*') !== -1) {
            let pOp = ops.indexOf('*');
            let res = (operands[pOp] * operands[pOp + 1])
            ops.splice(pOp, 1)
            operands.splice(pOp, 2, res);
        }
        else if (ops.indexOf('/') !== -1) {
            let pOp = ops.indexOf('/');
            let res = (operands[pOp] / operands[pOp + 1])
            ops.splice(pOp, 1)
            operands.splice(pOp, 2, res);
        }
        else if (ops.indexOf('+') !== -1) {
            let pOp = ops.indexOf('+');
            let res = (operands[pOp] + operands[pOp + 1])
            ops.splice(pOp, 1)
            operands.splice(pOp, 2, res);
        }
        else if (ops.indexOf('-') !== -1) {
            let pOp = ops.indexOf('-');
            let res = (operands[pOp] - operands[pOp + 1])
            ops.splice(pOp, 1)
            operands.splice(pOp, 2, res);
        }
    }
    return operands[0];
}


// numbers is a NodeList object, we need to make it into an array first, then we can map through it...
numbers.forEach(
    (number) => {
        number.addEventListener('click', function(e) {
            console.log(this.innerHTML);
            addNumber(number.innerHTML);
        })
    }
)

// adding click handlers to the calculation buttons
operators.forEach(
    (operator) => {
        operator.addEventListener('click', function() {
            console.log(this.innerHTML);
            addOp(this.innerHTML);
        })
    }
)
// on click of 'equal' button, perform the mathematical operation
result.addEventListener('click', (e) => {
    input.innerHTML = calculate();
})
// clear the input on press of clear