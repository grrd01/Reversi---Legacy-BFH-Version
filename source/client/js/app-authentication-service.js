'use strict';

// App Authentication  Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppAuthenticationService', ['AppOnlineService', function (appOnlineService) {
        var AppAuthenticationService = function () {
            var self = this;
            self.register = { name: "", password: "", password2: ""};

            self.appOnlineService = appOnlineService;

            self.register = function() {
                self.appOnlineService.register(name, password);
            }

            self.login = function() {
                self.appOnlineService.register(name, password);
            }

            self.logout = function() {
                self.appOnlineService.register(name, password);
            }
        }

        // Service Objekt erstellen.
        var appAuthenticationService = new AppAuthenticationService();

        // und zurückgeben
        return appAuthenticationService;
    }]);
})();
