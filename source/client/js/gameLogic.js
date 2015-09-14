var gameLogic = function() {
    var board, columns= 8, rows= 8,
        gameStart = true,
        currentPlayer = 0,

        init = function(){
            gameLogic.initEmptyBoard();
            // uje gameLogic.showBoard();

            //gameLogic.changeObjectState(3,3,1);
            gameLogic.setStartGame();
            // uje gameLogic.showBoard();
            // uje gameLogic.getFigures(1);
            // uje gameLogic.getPossibleMoves(1);

            // uje gameLogic.changeObjectState(4,2,1, true);
            // uje gameLogic.showBoard();

            // uje gameLogic.moveFromComputerPlayer(2);
            // uje gameLogic.showBoard();

            // uje gameLogic.moveFromComputerPlayer(1);
            // uje gameLogic.showBoard();

            // uje gameLogic.moveFromComputerPlayer(2);
            // uje gameLogic.showBoard();

            // uje gameLogic.moveFromComputerPlayer(1);
            // uje gameLogic.showBoard();

            //gameLogic.changeObjectState(3, 2, 2, true);
            //gameLogic.showBoard();

            //gameLogic.updateStates(1, 4, 2);
            //gameLogic.showBoard();

            // uje gameLogic.getPossibleMoves(2);
        },

        initEmptyBoard = function() {
            board = getNewGame(columns,rows,0);
        },

        showBoard = function() {
            //for(var i=0; i<columns; i++){
            //    for(var j=0; j<rows; j++){
            //        console.log(board[i][j])
            //    }
            //}
            Debugger;

            console.log(board);
            console.log("");
        },

        getNewGame = function(cols, rows, defaultValue){

            var arr = [];

            // Creates all lines:
            for(var i=0; i < rows; i++){

                // Creates an empty line
                arr.push([]);

                // Adds cols to the empty line:
                arr[i].push( new Array(cols));

                for(var j=0; j < cols; j++){
                    // Initializes:
                    arr[i][j] = defaultValue;
                }
            }

            return arr;
        },

        changeObjectState = function(col, row, state, isWithUpdate, isWithAutoPlayer) {
            board[col][row] = state;
            if (isWithUpdate) {
                updateStates(state, col, row);
            };
            if (isWithAutoPlayer) {
                if (state == 1) {
                    moveFromComputerPlayer(2);
                } else{
                    moveFromComputerPlayer(1);
                }
            };
        },

        setStartGame = function(){
            changeObjectState(3, 3, 1, false);
            changeObjectState(4, 4, 1, false);
            changeObjectState(4, 3, 2, false);
            changeObjectState(3, 4, 2, false);
        },

        getPossibleMoves = function(state){
            var possibleMoves = [];
            for (var i = 0; i < columns; i++) {
                for (var j = 0; j < rows; j++) {
                    if (board[i][j] == 0 && isPossibleMove(state,i,j)) {
                        possibleMoves.push([i, j]);
                    }
                }
            }
            // uje console.log("possibleMoves: " + state);
            // uje console.log(possibleMoves);
            return possibleMoves;
        },

        isPossibleMove = function(state, indexX, indexY){
            var possibleMoves = [];


            if (isPossibleLeftTop(state, indexX, indexY, true) ||
                isPossibleTop(state, indexX, indexY, true) ||
                isPossibleRightTop(state, indexX, indexY, true) ||
                isPossibleLeft(state, indexX, indexY, true) ||
                isPossibleRight(state, indexX, indexY, true) ||
                isPossibleLeftBottom(state, indexX, indexY, true) ||
                isPossibleBottom(state, indexX, indexY, true) ||
                isPossibleRightBottom(state, indexX, indexY, true)) {
                //console.log("isPossible: yes " + indexX + " " + indexY);
                return true;
            }
            else {
                //console.log("isPossible: no " + indexX + " " + indexY);
                return false;
            }
        },

        updateStates = function (state, indexX, indexY) {
            var updateFigures = [];
            updateStateLeftTop(state, indexX, indexY, updateFigures);
            updateStateTop(state, indexX, indexY, updateFigures);
            updateStateRightTop(state, indexX, indexY, updateFigures);
            updateStateLeft(state, indexX, indexY, updateFigures);
            updateStateRight(state, indexX, indexY, updateFigures);
            updateStateLeftBottom(state, indexX, indexY, updateFigures);
            updateStateBottom(state, indexX, indexY, updateFigures);
            updateStateRightBottom(state, indexX, indexY, updateFigures);
            // uje console.log("updateFigures: " + updateFigures);
            return updateFigures;
        },

        updateStateLeftTop = function (state, indexX, indexY, updateFigures) {
            if (isPossibleLeftTop(state, indexX, indexY, true)) {
                if (board[indexX - 1][indexY - 1] != state) {
                    // uje console.log("changeObjectState: X: " + indexX + " Y: " + indexY + " state: " + state);
                    updateFigures.push([indexX - 1, indexY - 1]);
                    changeObjectState(indexX - 1, indexY - 1, state);
                    updateStateLeftTop(state, indexX - 1, indexY - 1, updateFigures)
                }
            }
        },

        updateStateTop = function (state, indexX, indexY, updateFigures) {
            if (isPossibleTop(state, indexX, indexY, true)) {
                if (board[indexX][indexY - 1] != state) {
                    // uje console.log("changeObjectState: X: " + indexX + " Y: " + indexY + " state: " + state);
                    updateFigures.push([indexX, indexY - 1]);
                    changeObjectState(indexX, indexY - 1, state);
                    updateStateTop(state, indexX, indexY - 1, updateFigures)
                }
            }
        },

        updateStateRightTop = function (state, indexX, indexY, updateFigures) {
            if (isPossibleRightTop(state, indexX, indexY, true)) {
                if (board[indexX + 1][indexY - 1] != state) {
                    // uje console.log("changeObjectState: X: " + indexX + " Y: " + indexY + " state: " + state);
                    updateFigures.push([indexX + 1, indexY - 1]);
                    changeObjectState(indexX + 1, indexY - 1, state);
                    updateStateRightTop(state, indexX + 1, indexY - 1, updateFigures)
                }
            }
        },

        updateStateLeft = function (state, indexX, indexY, updateFigures) {
            if (isPossibleLeft(state, indexX, indexY, true)) {
                if (board[indexX - 1][indexY] != state) {
                    // uje console.log("changeObjectState: X: " + indexX + " Y: " + indexY + " state: " + state);
                    updateFigures.push([indexX - 1, indexY]);
                    changeObjectState(indexX - 1, indexY, state);
                    updateStateLeft(state, indexX - 1, indexY, updateFigures)
                }
            }
        },

        updateStateRight = function (state, indexX, indexY, updateFigures) {
            if (isPossibleRight(state, indexX, indexY, true)) {
                if (board[indexX + 1][indexY] != state) {
                    // uje console.log("changeObjectState: X: " + indexX + " Y: " + indexY + " state: " + state);
                    updateFigures.push([indexX + 1, indexY]);
                    changeObjectState(indexX + 1, indexY, state);
                    updateStateRight(state, indexX + 1, indexY, updateFigures)
                }
            }
        },

        updateStateLeftBottom = function (state, indexX, indexY, updateFigures) {
            if (isPossibleLeftBottom(state, indexX, indexY, true)) {
                if (board[indexX - 1][indexY + 1] != state) {
                    // uje console.log("changeObjectState: X: " + indexX + " Y: " + indexY + " state: " + state);
                    updateFigures.push([indexX - 1, indexY + 1]);
                    changeObjectState(indexX - 1, indexY + 1, state);
                    updateStateLeftBottom(state, indexX - 1, indexY + 1, updateFigures)
                }
            }
        },

        updateStateBottom = function (state, indexX, indexY, updateFigures) {
            if (isPossibleBottom(state, indexX, indexY, true)) {
                if (board[indexX][indexY + 1] != state) {
                    // uje console.log("changeObjectState: X: " + indexX + " Y: " + indexY + " state: " + state);
                    updateFigures.push([indexX, indexY + 1]);
                    changeObjectState(indexX, indexY + 1, state);
                    updateStateBottom(state, indexX, indexY + 1, updateFigures);
                }
            }
        },

        updateStateRightBottom = function (state, indexX, indexY, updateFigures) {
            if (isPossibleRightBottom(state, indexX, indexY, true)) {
                if (board[indexX + 1][indexY + 1] != state) {
                    // uje console.log("changeObjectState: X: " + indexX + " Y: " + indexY + " state: " + state);
                    updateFigures.push([indexX + 1, indexY + 1]);
                    changeObjectState(indexX + 1, indexY + 1, state);
                    updateStateRightBottom(state, indexX + 1, indexY + 1, updateFigures);
                }
            }
        },

        isPossibleLeftTop = function (state, indexX, indexY, isFirst) {
            //out range
            if (indexX - 1 < 0 || indexY - 1 < 0) return false;

            var boardState = board[indexX-1][indexY - 1];
            if (!isFirst && boardState == state){
                return true;
            } else if (!isFirst && boardState == 0) {
                return false;
            }
            //no figure or same state
            if (boardState == 0 || boardState == state) {
                return false;
            } else {
                return isPossibleLeftTop(state, indexX - 1, indexY - 1,false);
            }
        },

        isPossibleTop = function (state, indexX, indexY, isFirst) {
            //out range
            if (indexY - 1 < 0) return false;

            var boardState = board[indexX][indexY - 1];
            if (!isFirst && boardState == state){
                return true;
            } else if (!isFirst && boardState == 0) {
                return false;
            }
            //no figure or same state
            if (boardState == 0 || boardState == state) {
                return false;
            } else {
                return isPossibleTop(state, indexX, indexY - 1, false);
            }
        },

        isPossibleRightTop = function (state, indexX, indexY, isFirst) {
            //out range
            if (indexX + 1 >= columns || indexY - 1 < 0) return false;

            var boardState = board[indexX+1][indexY - 1];
            if (!isFirst && boardState == state){
                return true;
            } else if (!isFirst && boardState == 0) {
                return false;
            }
            //no figure or same state
            if (boardState == 0 || boardState == state) {
                return false;
            } else {
                return isPossibleRightTop(state, indexX + 1, indexY - 1, false);
            }
        },

        isPossibleLeft = function (state, indexX, indexY, isFirst) {
            //out range
            if (indexX - 1 < 0) return false;

            var boardState = board[indexX-1][indexY];
            if (!isFirst && boardState == state){
                return true;
            } else if (!isFirst && boardState == 0) {
                return false;
            }
            //no figure or same state
            if (boardState== 0 || boardState == state) {
                return false;
            } else {
                return isPossibleLeft(state, indexX - 1, indexY ,false);
            }
        },

        isPossibleRight = function (state, indexX, indexY, isFirst) {
            //out range
            if (indexX + 1 >= columns) return false;

            var boardState = board[indexX+1][indexY];
            if (!isFirst && boardState == state){
                return true;
            } else if (!isFirst && boardState == 0) {
                return false;
            }
            //no figure or same state
            if (boardState == 0 || boardState == state) {
                return false;
            } else {
                return isPossibleRight(state, indexX + 1, indexY, false);
            }
        },

        isPossibleLeftBottom = function (state, indexX, indexY, isFirst) {
            //out range
            if (indexX - 1 < 0 || indexY + 1 >= rows) return false;

            var boardState = board[indexX-1][indexY + 1];
            if (!isFirst && boardState == state){
                return true;
            } else if (!isFirst && boardState == 0) {
                return false;
            }
            //no figure or same state
            if (boardState == 0 || boardState == state) {
                return false;
            } else {
                return isPossibleLeftBottom(state, indexX - 1, indexY + 1,false);
            }
        },

        isPossibleBottom = function (state, indexX, indexY, isFirst) {
            //out range
            if (indexY + 1 >= rows) return false;

            var boardState = board[indexX][indexY + 1];
            if (!isFirst && boardState == state){
                return true;
            } else if (!isFirst && boardState == 0) {
                return false;
            }
            //no figure or same state
            if (boardState == 0 || boardState == state) {
                return false;
            } else {
                return isPossibleBottom(state, indexX, indexY + 1, false);
            }
        },

        isPossibleRightBottom = function (state, indexX, indexY, isFirst) {
            //out range
            if (indexX + 1 >= columns || indexY + 1 >= rows) return false;

            var boardState = board[indexX+1][indexY + 1];
            if (!isFirst && boardState == state){
                return true;
            } else if (!isFirst && boardState == 0) {
                return false;
            }
            //no figure or same state
            if (boardState == 0 || boardState == state) {
                return false;
            } else {
                return isPossibleRightBottom(state, indexX + 1, indexY + 1, false);
            }
        },

        moveFromComputerPlayer = function(state) {
            var possibleMoves = getPossibleMoves(state);

            if (possibleMoves.length == 0){
                console.log("moveFromComputerPlayer(state=" + state +")");
                console.log("possibleMoves.length: " + possibleMoves.length);
                console.log("possibleMoves: " + possibleMoves);

                var randomIndex = Math.floor(Math.random() * 10 % (possibleMoves.length));
                // uje console.log("randomIndex: " + randomIndex);
                // uje console.log("moveFromComputerPlayer: " + possibleMoves[randomIndex]);
                // uje console.log("randomIndex][0]: " + possibleMoves[randomIndex][0]);
                // uje console.log("randomIndex][1]: " + possibleMoves[randomIndex][1]);
                changeObjectState(possibleMoves[randomIndex][0], possibleMoves[randomIndex][1], state ,true, false)
                return true;
            }else{
                return false;
            }

        },

        getFigures = function (state) {
            var filtered = [];
            for (var i = 0; i < columns; i++) {
                for (var j = 0; j < rows; j++) {
                    if (board[i][j] == state) {
                        //var temp = [i,j];
                        filtered.push([i, j]);
                    }
                }
            }

            // uje console.log("getFigures:" + state);
            // uje console.log(filtered);
            return filtered;
        }
        ;

    return {
        init: init,
        initEmptyBoard: initEmptyBoard,
        setStartGame: setStartGame,
        showBoard: showBoard,
        changeObjectState: changeObjectState,
        getFigures: getFigures,
        getPossibleMoves: getPossibleMoves,
        isPossibleMove: isPossibleMove,
        updateStates: updateStates,
        moveFromComputerPlayer: moveFromComputerPlayer,
        getBoard: function() { return board; }
    };
}();

gameLogic.init();
//gameLogic.initEmptyBoard();
//gameLogic.showBoard();
//
////gameLogic.changeObjectState(3,3,1);
//gameLogic.setStartGame();
//gameLogic.showBoard();
//gameLogic.getPossibleMoves();

//function PlayObject(state) {
//    this.value = state;
//};