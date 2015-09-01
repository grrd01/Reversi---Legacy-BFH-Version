

// App Game Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppGameService', ['$timeout', function ($timeout) {
        var AppGameService = function () {
            var self = this;
            self.isGameRunning = false;
            self.statusMessgaeText = "";
            self.gameStartTime = new Date();

            // Functionen
            self.startTowPlayerGame = function(minMargin) {
                self.gameStartTime = new Date();
                self.isGameRunning = true;
            }

            self.timerHandler = function() {
                if (self.isGameRunning) {
                    var newDate = new Date();
                    var runTime = newDate - self.gameStartTime;
                    var msg = "" + (runTime / 1000).toFixed(0);
                    self.statusMessgaeText = "game running: " + msg + " sec."
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
