'use strict';

(function() {

    // get the application.
    var app = angular.module('ApplicationModule');

    /* Controllers */
    app.controller('ApplicationMainCtrl', ['$scope', '$window', '$timeout', 'AppScreenService', 'AppGameStateService', 'AppCardGameService', 'AppStatisticService', 'AppSetupService', 'AppAuthenticationService', 'AppOnlineService', function ($scope, $window, $timeout, appScreenService, appGameStateService, appCardGameService, appStatisticService, appSetupService, appAuthenticationService, appOnlineService) {

        var self = this;
        self.inSettingPage = false;

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
        }
        self.localPlayWithComputer = function () {
            self.appScreenService.switchToScreen('game-screen-id');
            self.appGameStateService.startGameWithComputer();
            self.appCardGameService.updateCardLayout();
            self.appScreenService.switchToComputerMode();
            self.appScreenService.resizeHandler();
            self.appLastGameMode = "LocalComputer";
        }
        self.onlinePlay = function () {
            self.appScreenService.switchToScreen('login-screen-id');
            self.appScreenService.switchToOnlineMode();
            self.appScreenService.resizeHandler();
            self.appLastGameMode = "OnlinePlay";
        }

        self.playerLogin = function () {
            //console.log("playerLogin().");
            self.appAuthenticationService.login();
            self.appScreenService.switchToScreen('wait-online-game-screen-id');
            //self.appOnlineService.connect();
        }
        self.switchToPlayerRegisterDialog = function () {
            //console.log("switchToPlayerRegisterDialog().");
            self.appScreenService.switchToScreen('register-screen-id');
        }
        self.playerRegister = function () {
            console.log("playerRegister().");
            self.appAuthenticationService.register();
            self.appScreenService.switchToScreen('register-screen-id');
        }

        // init
        $('#header-img-info-id').click(function () {
            //console.log("$('#header-img-info-id').click().");
            self.appScreenService.switchToScreen('help-screen-id', self.appLastGameMode);
            if (self.inSettingPage) { self.appSetupService.saveSettings(); self.inSettingPage = false; }
        });
        $('#header-img-setup-id').click(function () {
            //console.log("$('#header-img-setup-id').click().");
            self.appScreenService.switchToScreen('setup-screen-id', self.appLastGameMode);
            if (self.inSettingPage) { self.appSetupService.saveSettings(); self.inSettingPage = false; }
            self.inSettingPage = true;
        });
        $('#header-img-statistic-id').click(function () {
            //console.log("$('#header-img-statistic-id').click().");
            self.appScreenService.switchToScreen('statistic-screen-id', self.appLastGameMode);
            if (self.inSettingPage) { self.appSetupService.saveSettings(); self.inSettingPage = false; }
        });
        $('#header-img-home-id').click(function () {
            //console.log("$('#header-img-home-id').click().");
            self.appScreenService.switchToScreen('startup-screen-id', self.appLastGameMode);
            if (self.appOnlineService.onlineState !== "none") {
                self.appOnlineService.online_quit();
            }
            if (self.inSettingPage) { self.appSetupService.saveSettings(); self.inSettingPage = false; }
            self.appLastGameMode = "";
        });

        // resize registrieren
        //$(window).resize(resize);
        angular.element($window).bind('resize', function () {
            //console.log("angular.element($window).bind('resize', function () ....");
            //console.log("self.main.appSetupService.showPosibleStones: " + self.appSetupService.showPosibleStones);

            self.appScreenService.resizeHandler();
            self.appCardGameService.resizeCardLayout();
            self.appCardGameService.updateCardLayout();

            //$scope.initializeWindowSize();
            return $scope.$apply();
        });

        $scope.$on('update-card-layout', function(event, args) {
            //console.log("$scope.$on('update-card-layout') evenbt .....");
            self.appCardGameService.updateCardLayout();
        });

        $scope.$on('online-game-beginning', function(event, args) {
            self.appGameStateService.startOnlineGame();
            self.appScreenService.switchToScreen('game-screen-id');
        });

        // und zum start-bildschirm
        self.appScreenService.switchToScreen('startup-screen-id');

        self.appScreenService.imageBlinkingStart();

        // und alles einmal beim start updaten.
        self.appScreenService.resizeHandler();
        self.appCardGameService.resizeCardLayout();
    }]);
})();

