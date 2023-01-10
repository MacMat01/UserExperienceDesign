let schema = new TicTacToe(3);
let turno = CIRCLE;

function getWinnerImageUrl(symbol) {
    if (symbol === CROSS) {
        return "url(../imgs/cross_winner.png)"
    } else {
        return "url(../imgs/circle_winner.png)"
    }

}

function getImageUrl(isMoving = false) {
    if (turno === CROSS) {
        if (isMoving) {
            return "url(../imgs/cross_moving.png)"
        } else {
            return "url(../imgs/cross.png)"
        }
    } else {
        if (isMoving) {
            return "url(../imgs/circle_moving.png)"
        } else {
            return "url(../imgs/circle.png)"
        }
    }
}

function recordMouseOverListener(divElement, i, j) {
    divElement.addEventListener('mouseover', _ => {
        if (!schema.isOver() && (schema.isEmpty(i, j))) {
            divElement.style.backgroundImage = getImageUrl(true);
        }
    });
}

function showDrawMessage() {

}

function showWinnerMessage() {

}


function setWinnerSymbol(witness, winner) {
    for (let i = 0; i < witness.length; i++) {
        const divElement = document.getElementById(getCellId(witness[i][0], witness[i][1]));
        divElement.style.backgroundImage = getWinnerImageUrl(winner);
    }

}

function handleGameTermination() {
    if (schema.isDraw()) {
        showDrawMessage();
    } else {
        setWinnerSymbol(schema.getWitness(), schema.winner());
        showWinnerMessage();
    }
}

function recordMousePressedListener(divElement, i, j) {
    divElement.addEventListener('mousedown', _ => {
        if (!schema.isOver() && (schema.isEmpty(i, j))) {
            if (turno === CROSS) {
                schema.addCross(i, j);
            } else {
                schema.addCircle(i, j);
            }
            divElement.style.backgroundImage = getImageUrl(false);
            if (schema.isOver()) {
                handleGameTermination();
            } else {
                turno = nextSymbol(turno);
            }
        }
    });
}

function recordMouseOutListener(divElement, i, j) {
    divElement.addEventListener('mouseout', _ => {
        if (!schema.isOver() && (schema.isEmpty(i, j))) {
            divElement.style.backgroundImage = '';
        }
    });
}

function recordEventListeners(divElement, i, j) {
    recordMouseOverListener(divElement, i, j);
    recordMouseOutListener(divElement, i, j);
    recordMousePressedListener(divElement, i, j);
}

function getCellId(i, j) {
    return `_${i}_${j}_`;
}

function createCellDiv(i, j) {
    let divElement = document.createElement("div");
    divElement.classList.add("cell")
    divElement.setAttribute("id", getCellId(i, j));
    recordEventListeners(divElement, i, j)
    return divElement;
}

function createMainPanel(size) {
    const mp = document.querySelector(".mainpanel");
    schema = new TicTacToe(size);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            mp.appendChild(createCellDiv(i, j));
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createMainPanel(3);
})