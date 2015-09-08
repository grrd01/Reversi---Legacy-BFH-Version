'use strict';

// App Statistic Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppStatisticService', [function () {
        var AppStatisticService = function () {
            var self = this;

            //self.highscores = [];
            self.highscores = [
                /* spieler name        , anzahl spiel gespielt, maximal Punkt im besten Spiel */
                { name: "player 1 name", gamecount: 12, maxpoints: 21, entered: "2013-08-15" },
                { name: "player 2 name", gamecount: 21, maxpoints: 17, entered: "2013-08-05" },
                { name: "player 3 name", gamecount: 7, maxpoints: 11, entered: "2013-08-02" }
            ];

            self.getHighscores = function() {
                return self.highscores;
            }
        }

        // Service Objekt erstellen.
        var appStatisticService = new AppStatisticService();

        // und zurückgeben
        return appStatisticService;
    }]);
})();
