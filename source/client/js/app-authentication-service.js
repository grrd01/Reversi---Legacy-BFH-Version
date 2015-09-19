/*
 * Reversi
 * Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich
 *
 * Login und Registrierung Funktionen.
 * (Angular Service)
 */

'use strict';

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppAuthenticationService', ['AppOnlineService', function (appOnlineService) {
        var AppAuthenticationService = function () {
            var self = this;
            self.userData = { name: "", password: "", password2: ""};

            self.appOnlineService = appOnlineService;

            self.register = function() {
                if (self.userData.name.length <= 0) {
                    self.showColoredMessage("Eingabe Fehler", "Kein Name eingegeben.", '#e81e1a');
                } else if (self.userData.password.length <= 0) {
                    self.showColoredMessage("Eingabe Fehler", "Keine Password Eingabe.", '#e81e1a');
                } else if (self.userData.password != self.userData.password2) {
                    self.showColoredMessage("Eingabe Fehler", "Beide Passwörter nicht gleich.", '#e81e1a');
                } else {
                    self.appOnlineService.register(self.userData.name, self.userData.password);
                    // registrierung erfolgreich!
                    return true;
                }
                // registrierung nicht erfolgreich!
                return false;
            };

            self.login = function() {
                if (self.userData.name.length <= 0) {
                    self.showColoredMessage("Eingabe Fehler", "Kein Name eingegeben.", '#e81e1a');
                } else {
                    self.appOnlineService.signIn(self.userData.name, self.userData.password);
                    // login erfolgreich!
                    return true;
                }
                // login nicht erfolgreich!
                return false;
            };

            self.logout = function() {
                //self.appOnlineService.register(name, password);
            };

            self.showColoredMessage = function(title, message, backgroundColor){
                $('#modal-colored-title-text-h4-id')[0].innerHTML = title;
                $('#modal-colored-title-text-h4-id').css("background-color", backgroundColor);
                $('#modal-colored-body-text-p-id')[0].innerHTML = message;
                $("#modal-colored-dialog").modal();
            }

        };

        // Service Objekt erstellen.
        var appAuthenticationService = new AppAuthenticationService();

        // und zurückgeben
        return appAuthenticationService;
    }]);
})();
