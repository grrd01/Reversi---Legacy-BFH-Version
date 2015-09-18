/*
 * Reversi
 * Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich
 */

'use strict';

// App Statistic Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppStatisticService', [function () {
        var AppStatisticService = function () {
            var self = this;
            self.inStatisticPage = false;

            //self.highscores = [];
            self.highscores = [
                /* Test Daten */
                { gamesPlayed: 3, gamesWon: 3, name: "1", pointsWon: 55, rank: 5 },
                { gamesPlayed: 7, gamesWon: 2, name: "ABCDEFGHJ-22-22", pointsWon: 43, rank: 4 },
            ];

            self.setHighscores = function (highscores) {
                self.highscores = highscores;
            }
        };

        // Service Objekt erstellen.
        var appStatisticService = new AppStatisticService();

        // und zurückgeben
        return appStatisticService;
    }]);
})();
