'use strict';

// App Game Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppGameService', ['$timeout', 'AppConstantService', 'AppSetupService', 'AppCardGameService', 'AppGameEngineService', function ($timeout, appConstantService, appSetupService, appCardGameService, appGameEngineService) {
        var AppGameService = function () {
            var self = this;
            self.appConstantService = appConstantService;
            self.appSetupService = appSetupService;
            self.appCardGameService = appCardGameService;
            self.appGameEngineService = appGameEngineService;

            self.isGameRunning = false;
            self.isComputerGameRunning = false;
            self.isOnlineGameRunning = false;
            self.isOnlineComputerGameRunning = false;
            self.statusMessgaeText = "";
            self.gameStartTime = new Date();

            // Functionen
            self.startInitGame = function() {
                self.gameStartTime = new Date();
                self.appGameEngineService.setActualPlayerToWhite();
                self.isGameRunning = true;

                self.isComputerGameRunning = false;
                self.isOnlineGameRunning = false;
                self.isOnlineComputerGameRunning = false;
                self.statusMessgaeText = "";
            }

            self.startTowPlayerGame = function () {
                self.startInitGame();
                self.appGameEngineService.calculatePossibleStoneFiels();
            }

            self.startGameWithComputer = function() {
                self.startInitGame();
                self.isComputerGameRunning = true;
                self.appGameEngineService.calculatePossibleStoneFiels();
            }

            self.startOnlineGame = function () {
                self.startInitGame();
                self.isOnlineGameRunning = true;
                self.appGameEngineService.calculatePossibleStoneFiels();
            }

            self.timerHandler = function() {
                if (self.isGameRunning) {
                    var newDate = new Date();
                    var runTime = newDate - self.gameStartTime;

                    var gmtp = "2 local paly: ";
                    if (self.isComputerGameRunning)
                        gmtp = "local to computer: ";
                    else if (self.isOnlineGameRunning)
                        gmtp = "2 online paly: ";
                    else if (self.isOnlineComputerGameRunning)
                        gmtp = "online to computer: ";

                    self.statusMessgaeText = "";

                    var msg = "" + (runTime / 1000).toFixed(0);
                    self.statusMessgaeText = gmtp + ", running: " + msg + " sec."
                } else {
                    self.statusMessgaeText = "ready";
                }

                $('#game-player-status-p-id')[0].innerHTML = self.statusMessgaeText;

                $timeout(self.timerHandler, 1000);
            }

            $timeout(self.timerHandler, 1000);
        }

        // Service Objekt erstellen.
        var appGameService = new AppGameService();

        // und zurückgeben
        return appGameService;
    }]);
})();
