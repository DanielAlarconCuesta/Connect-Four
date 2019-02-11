var player = null;
var pointsPlayer1=0;
var pointsPlayer2=0;
var lastPointIsFrom=null;
var isThereAWiner=false;
var isADraw = false;
const ROWS = 6;
const COLUMNS = 7;
const POINTSFORWINNING = 4;

function drawEmptyBoard() {
    //Draw board game and asign onclick
	document.write('<table border="1" id="boardTable"></table>');
    var boardTable = document.getElementById("boardTable");
    for (let i=1; i<=ROWS; i++) {
        var row = document.createElement('tr');
        row.id = ""+i;
        for (let j=1; j<=COLUMNS; j++) {
            var column = document.createElement('td');
            column.addEventListener("click", function() {draw(j);});
            column.classList.add('white');
            column.id = ""+j;
            row.appendChild(column);
        }
        boardTable.appendChild(row);
    }
	document.write('<div id="buttonDiv"><button type="button" onclick="restart();">Restart</button></div>');
}

function restart() {
    //paint board game white
    var boardTable = document.getElementById("boardTable");
    isThereAWiner=false;
    for (let i=0; i<ROWS; i++) {
        var row = boardTable.childNodes[i];
        for (let j=0; j<COLUMNS; j++) {
            var column = row.childNodes[j];
            if (column.classList.contains('red')) {
                column.classList.remove('red');
                column.classList.add('white');

            } else if (column.classList.contains('blue')) {
                column.classList.remove('blue');
                column.classList.add('white');
            }
        }
    }
}

function draw(selectedColumn) {
    if (player===null) player = 1;

    if (isThereAWiner===false && isADraw===false) {
        var boardTable = document.getElementById("boardTable");
        for (var i=ROWS-1; i>=0; i--) {
            var row = boardTable.childNodes[i];
            var column = row.childNodes[selectedColumn-1];
            if (column.classList.contains('white')) {
                if (player===1) {
                    column.classList.remove('white');
                    column.classList.add('red');
					player=2;
                } else if (player===2) {
                    column.classList.remove('white');
                    column.classList.add('blue');
					player=1;
                }
                check();
                break;
            }
        }
    }
}

function checkRows() {
    var exit;
    var output = false;

    var boardTable = document.getElementById("boardTable");

    for (var i=0; i<ROWS; i++) {
        var row = boardTable.childNodes[i];
        for (var j=0; j<COLUMNS; j++) {

            var column = row.childNodes[j];

            if (checkIfItsPoint(column)) {
                exit=true;
                break;
            }
        }
        if (exit===true) {
            output = true;
            break;
        } else {
            pointsPlayer1 = 0;
            pointsPlayer2 = 0;
            lastPointIsFrom=null;
        }
    }




    return output;
}

function checkColumns() {
    var exit;
    var boardTable = document.getElementById("boardTable");
    var output=false;

    for (var j=0; j<COLUMNS; j++) {
        for (var i=0; i<ROWS; i++) {
            var row = boardTable.childNodes[i];
            var column = row.childNodes[j];

            if (checkIfItsPoint(column)) {
                exit=true;
                break;
            }
        }
        if (exit===true) {
            output = true;
            break;
        }
        pointsPlayer1 = 0;
        pointsPlayer2 = 0;
        lastPointIsFrom=null;
    }
    return output;
}

function check() {
    isThereAWiner=false;

    if (checkColumns()) {
        isThereAWiner=true;

    } else if (checkRows()) {
        isThereAWiner=true;

    } else if (checkDiagonals()) {
        isThereAWiner=true;
    } else {
		checkDraw();
	}
}

function checkDraw() {
	var counter = 0;
	var boardTable = document.getElementById("boardTable");
	var row = boardTable.childNodes[0];

    for (var j=0; j<COLUMNS; j++) {
        var column = row.childNodes[j];
		if (!column.classList.contains('white')) {
			counter++;
	    }
	}
	if (counter===COLUMNS) {
		alert("Draw! you guys have no idea about how to play");
		isADraw = true;
	}
	return isADraw;
}

function checkIfItsPoint(column) {

    var output=false;
    if (column.classList.contains('blue')) {
        if (lastPointIsFrom==="player 2") {
            pointsPlayer2++;

        } else {
            pointsPlayer2=1;
            lastPointIsFrom="player 2";
        }
    } else if (column.classList.contains('red')) {
        if (lastPointIsFrom==="player 1") {
            pointsPlayer1++;

        } else {
            pointsPlayer1=1;
            lastPointIsFrom="player 1";
        }
    } else if (column.classList.contains('white')) {
        pointsPlayer1=0;
        pointsPlayer2=0;
    }

    if (pointsPlayer2===POINTSFORWINNING) {
        alert("Player 2 won");
        output=true;

    } else if (pointsPlayer1===POINTSFORWINNING) {
        alert("Player 1 won");
        output=true;
    }
    return output;
}

function checkDiagonals() {
    var exit;
    var boardTable = document.getElementById("boardTable");
    var output = false;

    //check from bottom-left to top-right
    for (var i=ROWS-1; i>=0; i--) {
        var currentRow = i;
        var currentColumn = 0;

        while (currentRow>=0 && currentColumn<COLUMNS) {
            var row = boardTable.childNodes[currentRow];
            var column = row.childNodes[currentColumn];

            if (checkIfItsPoint(column)) {
                exit=true;
                break;
            }

            currentRow--;
            currentColumn++;
        }
        if (exit===true) {
            output = true;
            break;
        }
        pointsPlayer1 = 0;
        pointsPlayer2 = 0;
        lastPointIsFrom=null;
    }

    //check from tp-left to bottom-right
    for (var i=0; i<ROWS; i++) {
        var currentRow = i;
        var currentColumn = 0;

        while (currentRow<ROWS && currentColumn<COLUMNS) {
            var row = boardTable.childNodes[currentRow];
            var column = row.childNodes[currentColumn];

            if (checkIfItsPoint(column)) {
                exit=true;
                break;
            }

            currentRow++;
            currentColumn++;
        }
        if (exit===true) {
            output = true;
            break;
        }
        pointsPlayer1 = 0;
        pointsPlayer2 = 0;
        lastPointIsFrom=null;
    }

    //check from bottom-right to top-left
    for (var i=ROWS-1; i>=0; i--) {
        var currentRow = i;
        var currentColumn = COLUMNS-1;

        while (currentRow>=0 && currentColumn>=0) {
            var row = boardTable.childNodes[currentRow];
            var column = row.childNodes[currentColumn];

            if (checkIfItsPoint(column)) {
                exit=true;
                break;
            }

            currentRow--;
            currentColumn--;
        }
        if (exit===true) {
            output = true;
            break;
        }
        pointsPlayer1 = 0;
        pointsPlayer2 = 0;
        lastPointIsFrom=null;
    }

    //check from top-left to bottom-right
    for (var i=0; i<ROWS; i++) {
        var currentRow = i;
        var currentColumn = COLUMNS-1;

        while (currentRow<ROWS && currentColumn>=0) {
            var row = boardTable.childNodes[currentRow];
            var column = row.childNodes[currentColumn];

            if (checkIfItsPoint(column)) {
                exit=true;
                break;
            }

            currentRow++;
            currentColumn--;
        }
        if (exit===true) {
            output = true;
            break;
        }
        pointsPlayer1 = 0;
        pointsPlayer2 = 0;
        lastPointIsFrom=null;
    }
    return output;
}
