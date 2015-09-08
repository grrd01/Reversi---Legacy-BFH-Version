"use strict";

// App Game-Engine Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppGameEngineService', ['AppConstantService', 'AppGameStateService', function (appConstantService, appGameStateService) {
        var AppGameEngineService = function () {
            var self = this;
            self.appConstantService = appConstantService;
            self.appGameStateService = appGameStateService;

            self.actualPlayerIsWhite = false;
            self.actualPlayerIsBlack = false;
            self.actualPlayerYou = false;
            self.actualPlayerOnline = false;

            // Functionen
            self.getGameStoneState = function () {
                // spiel steine status wie schwarz gesetzt, weiss gesetz, schwarz setzen möglich, usw
                return self.stoneState;
            }

            self.getStoneState = function (xindex,yindex) {
                if (xindex < 0 || xindex >= self.appConstantService.GAME_MAX_COLUMNS) {
                    console.log("self.getStoneState(... xindex=" + xindex + " ...) out of range.");
                    return;
                }
                if (yindex < 0 || yindex >= self.appConstantService.GAME_MAX_ROWS) {
                    console.log("self.getStoneState(... yindex=" + yindex + " ...) out of range.");
                    return;
                }
                var index = (yindex * self.appConstantService.GAME_MAX_COLUMNS) + xindex;

                var state = self.appGameStateService.getStoneState(xindex,yindex);
                return state;
            }

            self.isWhiteLayingPossible = function (xindex,yindex) {
                var state = self.appGameStateService.getStoneState(xindex,yindex);
                return state === self.appGameStateService.STONE_WHITE_CAN_BE_PLACED; // 10==weiss kann gelegt werden
            }

            self.isBlackLayingPossible = function (xindex,yindex) {
                var state = self.appGameStateService.getStoneState(xindex,yindex);
                return state === self.appGameStateService.STONE_BLACK_CAN_BE_PLACED; // 11==schwarz kann gelegt werden,}
            }


            self.clearWrongFields = function(boardarrarr) {
                console.log("clearPossibleFields()");

                for (var irow = 0; irow < self.appConstantService.GAME_MAX_ROWS; irow++) {
                    for (var icol = 0; icol < self.appConstantService.GAME_MAX_COLUMNS; icol++) {
                        var state = self.getStoneState(icol, irow);
                        if (state == 6)
                            self.appGameStateService.setStoneState(icol, irow, 0);
                    }
                }
            }

            self.clearPossibleFields = function(boardarrarr) {
                console.log("clearPossibleFields()");

                for (var irow = 0; irow < self.appConstantService.GAME_MAX_ROWS; irow++) {
                    for (var icol = 0; icol < self.appConstantService.GAME_MAX_COLUMNS; icol++) {
                        var state = self.getStoneState(icol, irow);
                        if (state == 4 || state == 5)
                            self.appGameStateService.setStoneState(icol, irow, 0);
                    }
                }
            }

            self.calculatePossibleFieldsSub = function(forState, boardarrarr, icol, irow) {
                // kann gelegt werden ?
                if (boardarrarr[irow][icol] == 0) {
                    var testState1 = (forState === self.appGameStateService.STONE_WHITE) ? self.appGameStateService.STONE_BLACK : self.appGameStateService.STONE_WHITE;
                    var testState2 = (forState !== self.appGameStateService.STONE_WHITE) ? self.appGameStateService.STONE_BLACK : self.appGameStateService.STONE_WHITE;

                    // richtung x minus
                    if (icol > 1) {
                        if (boardarrarr[irow][icol- 2] == testState2 && boardarrarr[irow][icol - 1] == testState1) {
                            boardarrarr[irow][icol] = (forState == self.appGameStateService.STONE_WHITE) ? 4 : 5; // wenn für WHITE so 4, wenn für BLACK so 5!
                        }
                    }
                    // richtung x plus
                    if (icol < (self.appConstantService.GAME_MAX_COLUMNS-2)) {
                        if (boardarrarr[irow][icol+ 2] == testState2 && boardarrarr[irow][icol + 1] == testState1) {
                            boardarrarr[irow][icol] = (forState == self.appGameStateService.STONE_WHITE) ? 4 : 5; // wenn für WHITE so 4, wenn für BLACK so 5!
                        }
                    }

                    // richtung y minus
                    if (irow > 1) {
                        if (boardarrarr[irow - 2][icol] == testState2 && boardarrarr[irow - 1][icol] == testState1) {
                            boardarrarr[irow][icol] = (forState == self.appGameStateService.STONE_WHITE) ? 4 : 5; // wenn für WHITE so 4, wenn für BLACK so 5!
                        }
                    }
                    // richtung y plus
                    if (irow < (self.appConstantService.GAME_MAX_ROWS-2)) {
                        if (boardarrarr[irow + 2][icol] == testState2 && boardarrarr[irow + 1][icol] == testState1) {
                            boardarrarr[irow][icol] = (forState == self.appGameStateService.STONE_WHITE) ? 4 : 5; // wenn für WHITE so 4, wenn für BLACK so 5!
                        }
                    }

                    // richtung x plus, y plus diagonal
                    if (icol > 1 && irow > 1) {
                        if (boardarrarr[irow - 2][icol - 2] == testState2 && boardarrarr[irow - 1][icol - 1] == testState1) {
                            boardarrarr[irow][icol] = (forState == self.appGameStateService.STONE_WHITE) ? 4 : 5; // wenn für WHITE so 4, wenn für BLACK so 5!
                        }
                    }
                    // richtung x minus, y minus diagonal
                    if (icol < (self.appConstantService.GAME_MAX_COLUMNS-2) && irow < (self.appConstantService.GAME_MAX_ROWS-2)) {
                        if (boardarrarr[irow + 2][icol + 2] == testState2 && boardarrarr[irow + 1][icol + 1] == testState1) {
                            boardarrarr[irow][icol] = (forState == self.appGameStateService.STONE_WHITE) ? 4 : 5; // wenn für WHITE so 4, wenn für BLACK so 5!
                        }
                    }

                    // richtung x plus, y minus diagonal
                    if (icol > 1 && irow < (self.appConstantService.GAME_MAX_ROWS-2)) {
                        if (boardarrarr[irow + 2][icol - 2] == testState2 && boardarrarr[irow + 1][icol - 1] == testState1) {
                            boardarrarr[irow][icol] = (forState == self.appGameStateService.STONE_WHITE) ? 4 : 5; // wenn für WHITE so 4, wenn für BLACK so 5!
                        }
                    }

                    // richtung x minus, y plus diagonal
                    if (icol < (self.appConstantService.GAME_MAX_COLUMNS-2) && irow > 1) {
                        if (boardarrarr[irow - 2][icol + 2] == testState2 && boardarrarr[irow - 1][icol + 1] == testState1) {
                            boardarrarr[irow][icol] = (forState == self.appGameStateService.STONE_WHITE) ? 4 : 5; // wenn für WHITE so 4, wenn für BLACK so 5!
                        }
                    }
                }
            }

            self.calculatePossibleFields = function(forState, boardarrarr) {
                //console.log("calculatePossibleFields(forState: " + forState + ")");

                for (var irow = 0; irow < self.appConstantService.GAME_MAX_ROWS; irow++) {
                    for (var icol = 0; icol < self.appConstantService.GAME_MAX_COLUMNS; icol++) {
                        self.calculatePossibleFieldsSub(forState, boardarrarr, icol, irow);
                    }
                }
            }


            self.calculatePossibleStoneFiels = function () {
                var maxStone = (self.appConstantService.GAME_MAX_COLUMNS * self.appConstantService.GAME_MAX_ROWS);

                var tmpArray = [];
                for(var j = 0; j < self.appConstantService.GAME_MAX_ROWS; j++) {
                    tmpArray[j] = [];
                    for(var i = 0; i < self.appConstantService.GAME_MAX_COLUMNS; i++) {
                        tmpArray[j][i] = 0;
                    }
                }

                for(var i = 0; i < maxStone; i++) {
                    var xi = i % self.appConstantService.GAME_MAX_COLUMNS;
                    var yi = Math.floor(i / self.appConstantService.GAME_MAX_COLUMNS);

                    var state = self.appGameStateService.getStoneState(xi,yi);

                    tmpArray[yi][xi] = state;
                }

                var palyer = (self.actualPlayerIsWhite) ? self.appGameStateService.STONE_WHITE : self.appGameStateService.STONE_BLACK;
                self.calculatePossibleFields(palyer, tmpArray);

                for(var j = 0; j < self.appConstantService.GAME_MAX_ROWS; j++) {
                    for(var i = 0; i < self.appConstantService.GAME_MAX_COLUMNS; i++) {
                        var state = tmpArray[j][i];
                        if (state == 4 || state == 5){
                            var index = (j * self.appConstantService.GAME_MAX_COLUMNS) +i;
                            self.appGameStateService.setStoneState(i,j,state);
                        }
                    }
                }

                console.log("");
            }


            self.clearActualPlayer = function () {
                self.actualPlayerIsWhite = false;
                self.actualPlayerIsBlack = false;
            }
            self.setActualPlayerToWhite = function () {
                self.actualPlayerIsWhite = true;
                self.actualPlayerIsBlack = false;
            }
            self.setActualPlayerToBlack = function () {
                self.actualPlayerIsWhite = false;
                self.actualPlayerIsBlack = true;
            }


            // es wir versucht ein stein zu legen, erfolgreich aber nur wenn möglich!
            self.eventTrySetStone = function(eventIndex) {

                if (eventIndex < 0 || eventIndex >= (self.appConstantService.GAME_MAX_COLUMNS * self.appConstantService.GAME_MAX_ROWS)) {
                    console.log("self.eventTrySetStone(" + eventIndex + ") out of range.");
                    return;
                }

                var xindex = eventIndex % 8;
                var yindex = Math.floor(eventIndex / 8);

                console.log("eventTrySetStone=" +eventIndex + "), xindex: " + xindex + " yindex: " + yindex);

                var actState = self.getStoneState(xindex,yindex);
                if (actState == self.appGameStateService.STONE_WHITE || actState == self.appGameStateService.STONE_BLACK) {
                    console.log("it is already a stone at the site.");
                    return;
                }

                if (self.actualPlayerIsWhite) {
                    if (self.isWhiteLayingPossible(xindex,yindex)) {
                        self.appGameStateService.setStoneState(xindex, yindex, self.appGameStateService.STONE_WHITE);
                        self.clearPossibleFields();
                        self.clearWrongFields();
                        self.setActualPlayerToBlack();
                        self.calculatePossibleStoneFiels();
                    } else {
                        self.appGameStateService.setStoneState(xindex, yindex, self.appGameStateService.STONE_PLACING_ERROR);
                    }
                } else if (self.actualPlayerIsBlack) {
                    if (self.isBlackLayingPossible(xindex,yindex)) {
                        self.appGameStateService.setStoneState(xindex, yindex, self.appGameStateService.STONE_BLACK);
                        self.clearPossibleFields();
                        self.clearWrongFields();
                        self.setActualPlayerToWhite();
                        self.calculatePossibleStoneFiels();
                    } else {
                        self.appGameStateService.setStoneState(xindex, yindex, self.appGameStateService.STONE_PLACING_ERROR);
                    }
                }
            }
        }


        // Service Objekt erstellen.
        var appGameEngineService = new AppGameEngineService();

        // und zurückgeben
        return appGameEngineService;
    }]);
})();



