"use strict";

// App Game-State Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppGameStateService', ['AppConstantService', function (appConstantService) {
        var AppGameStateService = function () {
            var self = this;
            self.appConstantService = appConstantService;

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

            // initial state
            self.stoneState = [
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,1,2,0,0,0,
                0,0,0,2,1,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0];

            // Functionen
            self.getGameStoneState = function () {
                // spiel steine status wie schwarz gesetzt, weiss gesetz, schwarz setzen möglich, usw
                return self.stoneState;
            }

            self.setStoneState = function (xindex,yindex, state) {
                console.log("self.setStoneState(xindex: " + xindex + ", yindex: " + yindex +", state: " + state + ")");

                if (xindex < 0 || xindex >= self.appConstantService.GAME_MAX_COLUMNS) {
                    console.log("self.setStoneState(... xindex=" + xindex + " ...) out of range.");
                    return;
                }
                if (yindex < 0 || yindex >= self.appConstantService.GAME_MAX_ROWS) {
                    console.log("self.setStoneState(... yindex=" + yindex + " ...) out of range.");
                    return;
                }
                var index = (yindex * self.appConstantService.GAME_MAX_COLUMNS) + xindex;

                self.stoneState[index] = state;
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

                return self.stoneState[index];
            }
        }


        // Service Objekt erstellen.
        var appGameStateService = new AppGameStateService();

        // und zurückgeben
        return appGameStateService;
    }]);
})();



