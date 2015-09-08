'use strict';

// App Constant Service

(function () {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppConstantService', [function () {
        var AppConstantService = function () {
            var self = this;

            self.GAME_MAX_COLUMNS = 8;
            self.GAME_MAX_ROWS = 8;

        }

        // Service Objekt erstellen.
        var appConstantService = new AppConstantService();

        // und zurückgeben
        return appConstantService;
    }]);
})();
