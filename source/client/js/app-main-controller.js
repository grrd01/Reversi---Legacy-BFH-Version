/*
 * Reversi
 * Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich
 *
 * Einziger Angular Controller. Dieser benutzt die Services direkt oder indirekt.
 * (Angular Controller)
 */

'use strict';

(function() {

    // get the application.
    var app = angular.module('ApplicationModule');

    /* Controllers */
    app.controller('ApplicationMainCtrl', ['$scope', '$window', '$timeout', 'AppScreenService', 'AppGameStateService', 'AppCardGameService', 'AppStatisticService', 'AppSetupService', 'AppAuthenticationService', 'AppOnlineService', function ($scope, $window, $timeout, appScreenService, appGameStateService, appCardGameService, appStatisticService, appSetupService, appAuthenticationService, appOnlineService) {

        var self = this;
        self.appScreenService = appScreenService;
        self.appGameStateService = appGameStateService;
        self.appCardGameService = appCardGameService;
        self.appStatisticService = appStatisticService;
        self.appSetupService = appSetupService;
        self.appAuthenticationService = appAuthenticationService;
        self.appOnlineService = appOnlineService;

        self.appLastGameMode = "";
        self.userLeftInfoText = "Spieler links";
        self.userRightInfoText = "Spieler rechts";

        // functions

        self.localTowPlayerGame = function() {
            self.appScreenService.switchToScreen('game-screen-id');
            self.appGameStateService.startTowPlayerGame();
            self.appCardGameService.updateCardLayout();
            self.appScreenService.switchToLocalMode();
            self.appScreenService.resizeHandler();
            self.appLastGameMode = "LocalTowPlayer";
        };
        self.localPlayWithComputer = function () {
            self.appScreenService.switchToScreen('game-screen-id');
            self.appGameStateService.startGameWithComputer();
            self.appCardGameService.updateCardLayout();
            self.appScreenService.switchToComputerMode();
            self.appScreenService.resizeHandler();
            self.appLastGameMode = "LocalComputer";
        };
        self.onlinePlay = function () {
            self.appScreenService.switchToScreen('login-screen-id');
            self.appScreenService.resizeHandler();
            self.appLastGameMode = "OnlinePlay";

            if (self.appOnlineService.socket === undefined) {
                self.appOnlineService.connect();
            }
        };

        self.playerLogin = function () {
            var valid = self.appAuthenticationService.login();
            if (valid) {
                self.appScreenService.switchToScreen('wait-online-game-screen-id');
            }
        };

        self.switchToPlayerRegisterDialog = function () {
            self.appScreenService.switchToScreen('register-screen-id');
        };

        self.playerRegister = function () {
            var valid = self.appAuthenticationService.register();
            if (valid) {
                self.appScreenService.switchToScreen('wait-online-game-screen-id');
                self.appCardGameService.updateCardLayout();
                self.appScreenService.resizeHandler();
                self.appLastGameMode = "LocalTowPlayer";
            }
        };

        self.goBack = function ($event) {
            switch(self.appScreenService.lastScreenSwitch) {
                case 'statistic-screen-id':
                    self.appScreenService.switchToScreen('statistic-screen-id', self.appLastGameMode);
                    break;
                case "setup-screen-id":
                    self.appScreenService.switchToScreen('setup-screen-id', self.appLastGameMode);
                    break;
                case "help-screen-id":
                    self.appScreenService.switchToScreen('help-screen-id', self.appLastGameMode);
                    break;
            }
        };

        // init
        $('#header-img-info-id').click(function () {
            self.appScreenService.switchToScreen('help-screen-id', self.appLastGameMode);
        });
        $('#header-img-setup-id').click(function () {
            self.appScreenService.switchToScreen('setup-screen-id', self.appLastGameMode);
        });
        $('#header-img-statistic-id').click(function () {
            self.appScreenService.switchToScreen('statistic-screen-id', self.appLastGameMode);
        });
        $('#header-img-home-id').click(function () {
            self.appScreenService.switchToScreen('startup-screen-id', self.appLastGameMode);
            if (self.appOnlineService.onlineState !== "none") {
                self.appOnlineService.stopPlay();
            }
            self.appLastGameMode = "";
        });

        // resize registrieren
        angular.element($window).bind('resize', function () {
            self.appScreenService.resizeHandler();
            self.appCardGameService.resizeCardLayout();
            self.appCardGameService.updateCardLayout();
            return $scope.$apply();
        });

        $scope.$on('update-card-layout', function(event, args) {
            self.appCardGameService.updateCardLayout();
        });

        $scope.$on('online-game-beginning', function(event, args) {
            self.appScreenService.switchToScreen('game-screen-id');
            self.appCardGameService.updateCardLayout();
            self.appScreenService.resizeHandler();
        });

        $scope.$on('signInUnknownUser', function(event, args) {
            //self.appScreenService.switchToScreen('register-screen-id');
            self.appScreenService.switchToScreen('login-screen-id');
            self.appAuthenticationService.showColoredMessage("Eingabe Fehler", "Unbekannter Name.", '#e81e1a');
        });

        $scope.$on('signInWrongPw', function(event, args) {
            self.appScreenService.switchToScreen('login-screen-id');
            self.appAuthenticationService.showColoredMessage("Eingabe Fehler", "Falsches Password.", '#e81e1a');
        });


        $scope.$on('onlineStartPlayer', function(event, args) {
            console.log("$scope.$on('onlineStartPlayer'...);");
            self.appGameStateService.startOnlineGame('StartPlayer');
            self.appScreenService.switchToOnlineMode('StartPlayer');
            self.appScreenService.resizeHandler();
            self.appCardGameService.updateCardLayout();
        });

        $scope.$on('onlineStartOpponent', function(event, args) {
            console.log("$scope.$on('onlineStartOpponent'...);");
            self.appGameStateService.startOnlineGame('StartOpponent');
            self.appScreenService.switchToOnlineMode('StartOpponent');
            self.appScreenService.resizeHandler();
            self.appCardGameService.updateCardLayout();
        });

        $scope.$on('play', function(event, args) {
            console.log("$scope.$on('onlineStartOpponent' col: " + args.col + ", row: " +args.row + ");");
            var eventIndex = (args.row * 8) +args.col;
            self.appGameStateService.eventTrySetStone(eventIndex, true);
            self.appCardGameService.updateCardLayout();
        });

        $scope.$on('stopPlay', function(event, args) {
            console.log("$scope.$on('stopPlay');");

            if (!self.appGameStateService.gameLogic.isGameOver()) {
                self.appAuthenticationService.showColoredMessage("Spielabbruch", "Gegner hat Spiel beendet.", '#e81e1a');
            }
            self.appScreenService.switchToScreen('startup-screen-id');
        });

        $scope.$on('connected', function (event, args) {
            console.log("$scope.$on('connected');");
            if (self.appStatisticService.inStatisticPage) {
                self.appOnlineService.ranking();
            }
        });

        $scope.$on('ranking', function (event, args) {
            console.log("$scope.$on('ranking', ....);");
            self.appStatisticService.setHighscores(args);
        });

        // und zum Start-Bildschirm
        self.appScreenService.switchToScreen('startup-screen-id');

        self.appScreenService.imageBlinkingStart();

        // und alles einmal beim Start updaten.
        self.appScreenService.resizeHandler();
        self.appCardGameService.resizeCardLayout();
    }]);
})();

