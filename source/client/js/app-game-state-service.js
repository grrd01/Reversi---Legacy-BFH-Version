"use strict";

// App Game-State Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppGameStateService', ['$timeout', '$rootScope', 'AppConstantService', 'AppAuthenticationService', 'AppOnlineService', function ($timeout, $rootScope, appConstantService, appAuthenticationService, appOnlineService) {
        var AppGameStateService = function () {
            var self = this;
            self.appConstantService = appConstantService;
            self.appAuthenticationService = appAuthenticationService;
            self.appOnlineService = appOnlineService;
            self.startWithBlack = false;

            /*
             steine status {0==leer,
             1==weiss, 2==schwarz, 3==weiss kann gelegt werden, 4==schwarz kann gelegt werden, 5==lege fehler}
             */
            self.STONE_WHITE = 1;
            self.STONE_BLACK = 2;
            self.STONE_UNKOWN_STATE = 3;
            self.STONE_WHITE_CAN_BE_PLACED = 4;
            self.STONE_BLACK_CAN_BE_PLACED = 5;
            self.STONE_PLACING_ERROR = 6;

            self.isGameRunning = false;
            self.isComputerGameRunning = false;
            self.isOnlineGameRunning = false;
            self.isOnlineComputerGameRunning = false;
            self.isComputerThinkingTime = 0;
            self.isComputerMove = false;
            self.statusMessgaeText = "";
            self.gameStartTime = new Date();

            self.actualPlayerIsWhite = false;
            self.actualPlayerIsBlack = false;
            self.actualPlayer = self.STONE_WHITE;
            self.wrongStone = undefined;
            self.gameOver = undefined;

            // externe Logic Library
            self.gameLogic = gameLogic;

            // Functionen
            self.initStoneState = function () {
                self.gameLogic.init();
            };

            self.setStoneStateError = function (xindex, yindex) {
                self.wrongStone = {x: xindex, y: yindex};
            };

            self.setStoneState = function (xindex, yindex, withoutCheck) {
                if (withoutCheck === undefined)
                    withoutCheck = false;

                if (xindex < 0 || xindex >= self.appConstantService.GAME_MAX_COLUMNS) {
                    console.log("self.setStoneState(... xindex=" + xindex + " ...) out of range.");
                    return;
                }
                if (yindex < 0 || yindex >= self.appConstantService.GAME_MAX_ROWS) {
                    console.log("self.setStoneState(... yindex=" + yindex + " ...) out of range.");
                    return;
                }

                var siPossible = self.gameLogic.isPossibleMove(self.actualPlayer, xindex, yindex);
                if (siPossible || withoutCheck) {
                    self.gameLogic.changeObjectState(xindex, yindex, self.actualPlayer, true, false);
                    self.wrongStone = undefined;
                } else {
                    self.setStoneStateError(xindex, yindex);
                }
            };

            self.getStoneState = function (xindex, yindex) {
                if (xindex < 0 || xindex >= self.appConstantService.GAME_MAX_COLUMNS) {
                    console.log("self.getStoneState(... xindex=" + xindex + " ...) out of range.");
                    return;
                }
                if (yindex < 0 || yindex >= self.appConstantService.GAME_MAX_ROWS) {
                    console.log("self.getStoneState(... yindex=" + yindex + " ...) out of range.");
                    return;
                }
                var rBoard = self.gameLogic.getBoard();

                var state = rBoard[xindex][yindex];

                if (state == 0) {
                    var moves = self.gameLogic.getPossibleMoves(self.actualPlayer);
                    for (var itemx = 0; itemx < moves.length; itemx++) {
                        for (var iy = 0; iy < moves[itemx].length; iy++) {
                            if (xindex == moves[itemx][0] && yindex == moves[itemx][1]) {
                                state = (self.actualPlayer == self.STONE_WHITE) ? self.STONE_WHITE_CAN_BE_PLACED : self.STONE_BLACK_CAN_BE_PLACED;
                                break;
                            }
                        }
                    }
                }

                if (state == 0) {
                    if (self.wrongStone !== undefined) {
                        if (xindex == self.wrongStone.x && yindex == self.wrongStone.y) {
                            state = 6;
                        }
                    }
                }

                return state;
            };


            self.isWhiteLayingPossible = function (xindex, yindex) {
                var result = false;
                var moves = self.gameLogic.getPossibleMoves(self.actualPlayer);
                for (var itemx = 0; itemx < moves.length; itemx++) {
                    for (var iy = 0; iy < moves[itemx].length; iy++) {
                        if (xindex == moves[itemx][0] && yindex == moves[itemx][1]) {
                            result = (self.actualPlayer === self.STONE_WHITE);
                            break;
                        }
                    }
                }
                return result;
            };

            self.isBlackLayingPossible = function (xindex, yindex) {
                var result = false;
                var moves = self.gameLogic.getPossibleMoves(self.actualPlayer);
                for (var itemx = 0; itemx < moves.length; itemx++) {
                    for (var iy = 0; iy < moves[itemx].length; iy++) {
                        if (xindex == moves[itemx][0] && yindex == moves[itemx][1]) {
                            result = (self.actualPlayer !== self.STONE_WHITE);
                            break;
                        }
                    }
                }
                return result;
            };

            // es wir versucht ein stein zu legen, erfolgreich aber nur wenn möglich
            // und nicht der Computer daran ist!
            self.eventTrySetStone = function(eventIndex, fromOnlinePlayer) {
                var xindex = eventIndex % 8;
                var yindex = Math.floor(eventIndex / 8);

                if (fromOnlinePlayer === undefined)
                    fromOnlinePlayer = false;

                if (self.isOnlineGameRunning && !fromOnlinePlayer) {
                    if (self.appOnlineService.onlineStartPlayer && self.actualPlayerIsBlack) {
                        console.log("self.eventTrySetStone(online && Withe).");
                        self.setStoneStateError(xindex, yindex);
                        return;
                    }
                    if (self.appOnlineService.onlineStartOpponent && self.actualPlayerIsWhite) {
                        console.log("self.eventTrySetStone(online && Black).");
                        self.setStoneStateError(xindex, yindex);
                        return;
                    }
                }

                if (eventIndex < 0 || eventIndex >= (self.appConstantService.GAME_MAX_COLUMNS * self.appConstantService.GAME_MAX_ROWS)) {
                    console.log("self.eventTrySetStone(" + eventIndex + ") out of range.");
                    return;
                }

                if (self.actualPlayerIsWhite && self.startWithBlack && self.isComputerGameRunning) {
                    console.log("self.eventTrySetStone(" + eventIndex + "), the computer is in the game.");
                    return;
                }
                if (self.actualPlayerIsBlack && !self.startWithBlack && self.isComputerGameRunning) {
                    console.log("self.eventTrySetStone(" + eventIndex + "), the computer is in the game.");
                    return;
                }

                var actState = self.getStoneState(xindex,yindex);
                if (actState == self.STONE_WHITE || actState == self.STONE_BLACK) {
                    console.log("it is already a stone at the site.");
                    return;
                }

                if (self.actualPlayerIsWhite) {
                    if (self.isWhiteLayingPossible(xindex,yindex) || fromOnlinePlayer) {
                        self.setStoneState(xindex, yindex, fromOnlinePlayer);
                        if (self.isOnlineGameRunning && !fromOnlinePlayer)
                            self.appOnlineService.play(yindex, xindex);
                        self.setActualPlayerToBlack();

                        if (self.isComputerGameRunning && !self.startWithBlack) {
                            self.startComputerMove();
                        }
                    } else {
                        self.setStoneStateError(xindex, yindex);
                    }
                } else if (self.actualPlayerIsBlack) {
                    if (self.isBlackLayingPossible(xindex,yindex) || fromOnlinePlayer) {
                        self.setStoneState(xindex, yindex, fromOnlinePlayer);
                        if (self.isOnlineGameRunning && !fromOnlinePlayer)
                            self.appOnlineService.play(yindex, xindex);
                        self.setActualPlayerToWhite();

                        if (self.isComputerGameRunning && self.startWithBlack) {
                            self.startComputerMove();
                        }
                    } else {
                        self.setStoneStateError(xindex, yindex);
                    }
                }
            };

            self.setActualPlayerToWhite = function() {
                self.actualPlayer = self.STONE_WHITE;
                self.actualPlayerIsWhite = true;
                self.actualPlayerIsBlack = false;
            };
            self.setActualPlayerToBlack = function() {
                self.actualPlayer = self.STONE_BLACK;
                self.actualPlayerIsWhite = false;
                self.actualPlayerIsBlack = true;
            };

            self.startInitGame = function() {
                self.gameStartTime = new Date();
                if (self.startWithBlack) {
                    self.setActualPlayerToBlack();
                    self.initStoneState();
                } else {
                    self.setActualPlayerToWhite();
                    self.initStoneState();
                }
                self.isGameRunning = true;
                self.isComputerGameRunning = false;
                self.isComputerThinkingTime = 0;
                self.isComputerMove = false;
                self.isOnlineGameRunning = false;
                self.isOnlineComputerGameRunning = false;
                self.statusMessgaeText = "";
                self.wrongStone = undefined;
                self.gameOver = undefined;
            };

            self.startTowPlayerGame = function () {
                self.startInitGame();
            };

            self.startGameWithComputer = function() {
                self.startInitGame();
                self.isComputerGameRunning = true;
            };

            self.startOnlineGame = function (playerMode) {
                self.startInitGame();
                self.isOnlineGameRunning = true;

                self.setActualPlayerToWhite();

                if (playerMode === 'StartPlayer') {
                } else /*if (playerMode === 'StartOpponent')*/ {
                }

            };

            self.isTheGameOver = function() {
                var moves1 = self.gameLogic.getPossibleMoves(self.actualPlayer);
                if (moves1.length > 0) {
                    // aktueller spieler kann noch spielen
                    self.gameOver = undefined;
                } else {
                    var otherPlayer = (self.actualPlayer === self.STONE_WHITE) ? self.STONE_BLACK : self.STONE_WHITE;
                    if (self.gameOver === undefined) {
                        self.gameOver = { actual: self.actualPlayer, other: otherPlayer };
                    }
                    var moves3 = self.gameLogic.getPossibleMoves(otherPlayer);
                    if (moves3.length > 0) {
                        // der andere spler kann noch spielen, so umschlten
                        if (otherPlayer === self.STONE_WHITE) {
                            self.setActualPlayerToWhite();
                        } else {
                            self.setActualPlayerToBlack();
                        }
                        $rootScope.$broadcast('update-card-layout');
                    } else {
                        // sonst spiel beenden
                        return true;
                    }
                }
                return false;
            };

            self.startComputerMove = function() {
                //console.log("self.startComputerMove()");
                self.isComputerThinkingTime = 4;
                self.isComputerMove = true;
            };

            self.timerHandler = function() {
                var msg, name, password, gamesWon;
                if (self.isGameRunning) {
                    var newDate = new Date();
                    var runTime = ((newDate.getTime() - self.gameStartTime.getTime()) / 1000).toFixed(0);

                    var gmtp = "local paly: ";
                    if (self.isComputerGameRunning)
                        gmtp = "local to computer: ";
                    else if (self.isOnlineGameRunning)
                        gmtp = "online paly: ";
                    else if (self.isOnlineComputerGameRunning)
                        gmtp = "online to computer: ";

                    self.statusMessgaeText = "";

                    msg = "" + runTime;
                    self.statusMessgaeText = gmtp + ", running: " + msg + " sec.";

                    if (self.isComputerThinkingTime > 0) {
                        self.statusMessgaeText = "the computer is thinking.";
                        self.isComputerThinkingTime--;
                    }
                    if (self.isComputerThinkingTime <= 0 && self.isComputerMove) {
                        self.isComputerMove = false;

                        var actCompState = (self.startWithBlack) ? self.STONE_WHITE : self.STONE_BLACK;
                        var moves = self.gameLogic.getPossibleMoves(self.actualPlayer);

                        console.log("self.gameLogic.moveFromComputerPlayer(" + actCompState + "), self.actualPlayer: " +self.actualPlayer +", moves.length: " + moves.length);
                        self.gameLogic.moveFromComputerPlayer(actCompState);

                        if (self.startWithBlack) {
                            self.setActualPlayerToBlack();
                        } else {
                            self.setActualPlayerToWhite();
                        }
                        $rootScope.$broadcast('update-card-layout');
                    }

                    // prüfe ob spiel fertig ist
                    if (self.isTheGameOver()) {
                        var whiteStones = self.gameLogic.getFigures(self.STONE_WHITE);
                        var blackStones = self.gameLogic.getFigures(self.STONE_BLACK);

                        $('#modal-title-text-h4-id')[0].innerHTML = "Der Gewinner ist:";
                        msg = (whiteStones.length > blackStones.length) ? "Weiss" : "Black";
                        msg += "  [Weiss=" + whiteStones.length + ", Black=" +blackStones.length + "]";
                        $('#modal-body-text-p-id')[0].innerHTML = msg;
                        $("#modal-dialog").modal();
                        self.isGameRunning = false;

                        console.log("self.timerHandler() { self.isTheGameOver(): " + msg);

                        if (self.isOnlineGameRunning) {
                            if (self.appOnlineService.onlineStartPlayer) {
                                console.log("self.eventTrySetStone(online && Withe).");

                                name = self.appAuthenticationService.userData.name;
                                password = self.appAuthenticationService.userData.password;
                                gamesWon = (whiteStones.length > blackStones.length) ? 1 : 0;
                                self.appOnlineService.rankingUpdate(name, password, gamesWon, whiteStones.length);
                                console.log("(self.appOnlineService.onlineStartPlayer) self.rankingUpdate(" + name + ", " + password + ", " + gamesWon + ", " + blackStones.length + ")");
                            }
                            if (self.appOnlineService.onlineStartOpponent) {
                                name = self.appAuthenticationService.userData.name;
                                password = self.appAuthenticationService.userData.password;
                                gamesWon = (blackStones.length > whiteStones.length) ? 1 : 0;
                                self.appOnlineService.rankingUpdate(name, password, gamesWon, blackStones.length);
                                console.log("(self.appOnlineService.onlineStartOpponent) self.rankingUpdate(" + name + ", " + password + ", " + gamesWon + ", " + blackStones.length + ")");
                            }
                            self.appOnlineService.stopPlay();
                            $rootScope.$broadcast('stopPlay');
                            console.log("(self.appOnlineService.onlineStartOpponent) stopPlay()");
                        }
                    }
                } else {
                    self.statusMessgaeText = "ready";
                }

                $('#game-player-status-p-id')[0].innerHTML = self.statusMessgaeText;

                $timeout(self.timerHandler, 333);
            };

            $('#modal-dialog').on('hidden.bs.modal', function (e) {
                console.log("modal dialog is done.");
            });

            $timeout(self.timerHandler, 1000);
        };

        // Service Objekt erstellen.
        var appGameStateService = new AppGameStateService();

        // und zurückgeben
        return appGameStateService;
    }]);
})();



