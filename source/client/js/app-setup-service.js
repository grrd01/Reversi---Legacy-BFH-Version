'use strict';

// App Setup Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppSetupService', [function () {
        var AppSetupService = function () {
            var self = this;

            self.showPosibleStones = false;
            self.localUserImageWhite = "";
            self.localUserImageBlack = "";
            self.inSettingPage = false;

            self.saveSettings = function() {
                if (typeof(Storage) !== "undefined" && typeof(localStorage) !== "undefined") {
                    localStorage.setItem("showPosibleStones", self.showPosibleStones);
                    localStorage.setItem("localUserImageWhite", self.localUserImageWhite);
                    localStorage.setItem("localUserImageBlack", self.localUserImageBlack);
                } else {
                    // Kein Web Storage support.., so nichts machen
                }
            };

            self.readSettings = function() {
                if (typeof(Storage) !== "undefined" && typeof(localStorage) !== "undefined") {
                    var showStones = localStorage.getItem("showPosibleStones");
                    self.showPosibleStones = JSON.parse(showStones) || false;
                    var localImgWhite = localStorage.getItem("localUserImageWhite");
                    self.localUserImageWhite = localImgWhite;
                    var localImgBlack = localStorage.getItem("localUserImageBlack");
                    self.localUserImageBlack = localImgBlack;
                } else {
                    // Kein Web Storage support.., so nichts machen
                }
            };

            self.readSettings();
        };

        // Service Objekt erstellen.
        var appSetupService = new AppSetupService();

        // und zurückgeben
        return appSetupService;
    }]);
})();
