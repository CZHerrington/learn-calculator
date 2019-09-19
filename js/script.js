"use strict";

const input = document.getElementById("input"), // input/output button
    numbers = document.querySelectorAll(".numbers div"), // number buttons
    operators = document.querySelectorAll(".operators div"), // operator buttons
    result = document.getElementById("result"), // equal button
    clear = document.getElementById("clear"); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

let buffer = []
let operatorStrings = ['+', '-', '*', '/']

function update() {
    input.innerHTML = buffer.join(' ');
}

function addNumber(n) {
    if (n === "C") {
        buffer = [];
    } else {
        buffer.push(n);
    }
    update();
}

function addOp(op) {
    if (operatorStrings.includes(buffer[buffer.length - 1])) {
        buffer.splice(buffer.length - 1, 1, op);
    } else {
        buffer.push(op);
    }
    update();
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

// clear the input on press of clear