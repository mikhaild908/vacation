"use strict";

var x = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

var solved = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    
    var sourceBoxId = ev.dataTransfer.getData("text");
    var sourceBox = document.getElementById(sourceBoxId);
    var targetBox = document.getElementById(ev.target.id);
    
    swap(sourceBox, targetBox);
    copyTextContentsIntoArray();

    if(isPuzzleSolved()) {
        messages.textContent = "Puzzle solved!!!";
    }

    addRemoveEventListenersToSquares();
}

function swap(source, target) {
    swapBackgrounds(source, target);
    swapTextContent(source, target);
}

function swapTextContent(source, target) {
    var targetTextContent = target.textContent;

    target.textContent = source.textContent;
    source.textContent = targetTextContent;
}

function swapBackgrounds(source, target) {
    var sourceBoxBackground = window.getComputedStyle(source, null).getPropertyValue("background");

    target.style.background = sourceBoxBackground;
    source.style.background = "black";
}

function copyTextContentsIntoArray() {
    var squares = document.getElementsByClassName("square");

    for(var i = 0; i < x.length; i++) {
        for(var j = 0; j < x.length; j++) {
            x[i][j] = Number(squares[i * x.length + j].textContent);
        }
    }
}

function isBox9ToTheRight(box) {
    var boxNumber = box.id.replace("box", "");
    var modulus = Number(boxNumber) % x.length;

    if(modulus == 0) {
        return false;
    }

    var boxToTheRight = document.getElementById("box".concat(Number(boxNumber) + 1));
    var boxToTheRightTextContent = boxToTheRight.textContent;
    
    if(boxToTheRightTextContent == 9) {
        return true;
    }

    return false;
}

function isBox9ToTheLeft(box) {
    var boxNumber = box.id.replace("box", "");
    var modulus = Number(boxNumber) % x.length;

    if(modulus == 1) {
        return false;
    }

    var boxToTheLeft = document.getElementById("box".concat(Number(boxNumber) - 1));
    var boxToTheLeftTextContent = boxToTheLeft.textContent;
    
    if(boxToTheLeftTextContent == 9) {
        return true;
    }

    return false;
}

function isBox9OnTop(box) {
    var boxNumber = box.id.replace("box", "");

    if(Number(boxNumber) <= x.length) {
        return false;
    }

    var boxOnTop = document.getElementById("box".concat(Number(boxNumber) - x.length));
    var boxOnTopTextContent = boxOnTop.textContent;
    
    if(boxOnTopTextContent == 9) {
        return true;
    }

    return false;
}

function isBox9Below(box) {
    var boxNumber = box.id.replace("box", "");

    if(boxNumber > x.length * (x.length - 1)) {
        return false;
    }

    var boxBelow = document.getElementById("box".concat(Number(boxNumber) + x.length));
    var boxBelowTextContent = boxBelow.textContent;
    
    if(boxBelowTextContent == 9) {
        return true;
    }

    return false;
}

function addRemoveEventListenersToSquares() {
    var squares = document.getElementsByClassName("square");
    
    for(var i = 0; i < squares.length; i++) {
        squares[i].removeEventListener("drop", drop);
        squares[i].removeEventListener("dragover", allowDrop);
        squares[i].removeEventListener("dragstart", drag);
        
        squares[i]["draggable"] = false;
    }

    for(var i = 0; i < x.length; i++) {
        for(var j = 0; j < x.length; j++) {
            var currentBox = squares[i * x.length + j];

            if(currentBox.textContent == 9) {
                currentBox.addEventListener("drop", drop, false);
                currentBox.addEventListener("dragover", allowDrop, false);
            }
            else {
                if(isBox9Below(currentBox) ||
                    isBox9OnTop(currentBox) ||
                    isBox9ToTheLeft(currentBox) ||
                    isBox9ToTheRight(currentBox)) {
                    currentBox.addEventListener("dragstart", drag, false);
                    currentBox["draggable"] = true;
                }
            }
        }
    }
}

function isPuzzleSolved() {
    for(var i = 0; i < x.length; i++) {
        for(var j = 0; j < x.length; j++) {
            if(x[i][j] != solved[i][j]) {
                return false;
            }
        }    
    }

    return true;
}

function scramblePuzzlePieces() {
    // TODO:
    swap(getBox(6), getBox(9));
    swap(getBox(3), getBox(6));
    swap(getBox(2), getBox(3));
    swap(getBox(1), getBox(2));
    swap(getBox(4), getBox(1));
    swap(getBox(7), getBox(4));
    swap(getBox(8), getBox(7));

    swap(getBox(5), getBox(8));
}

function getBox(id) {
    return document.getElementById("box" + id);
}

document.getElementById("newGameButton").addEventListener("click", function() {
    location.reload();
}, false);

scramblePuzzlePieces();
copyTextContentsIntoArray();
addRemoveEventListenersToSquares();