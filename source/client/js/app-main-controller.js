'use strict';

(function() {

    // get the application.
    var app = angular.module('ApplicationModule');

    /* Controllers */
    app.controller('ApplicationMainCtrl', ['$scope', '$rootScope', '$window', '$timeout', 'AppScreenService', 'AppGameService', 'AppCardGameService', 'AppStatisticService', 'AppSetupService', 'AppOnlineService', function ($scope, $rootScope, $window, $timeout, appScreenService, appGameService, appCardGameService, appStatisticService, appSetupService, appOnlineService) {

        var self = this;
        self.inSettingPage = false;

        self.appScreenService = appScreenService;
        self.appGameService = appGameService;
        self.appCardGameService = appCardGameService;
        self.appStatisticService = appStatisticService;
        self.appSetupService = appSetupService;
        self.appOnlineService = appOnlineService;

        self.appLastGameMode = "";
        self.userLeftInfoText = "Spieler links";
        self.userRightInfoText = "Spieler rechts";

        self.onlineMessage = "";

        // functions

        self.localTowPlayerGame = function() {
            console.log("localTowPlayerGame().");
            // direkt zum Spielbildschirm
            self.appScreenService.switchToScreen('game-screen-id');
            self.appGameService.startTowPlayerGame();
            self.appCardGameService.updateCardLayout();
            self.appScreenService.resizeHandler();
            self.appLastGameMode = "LocalTowPlayer";
        }
        self.localPlayWithComputer = function () {
            console.log("localPlayWithComputer().");
            self.appScreenService.switchToScreen('game-screen-id');
            self.appGameService.startGameWithComputer();
            self.appCardGameService.updateCardLayout();
            self.appScreenService.resizeHandler();
            self.appLastGameMode = "LocalComputer";
        }
        self.onlinePlay = function () {
            console.log("onlinePlay().");
            self.appScreenService.switchToScreen('login-screen-id');
            //self.appUserService.checkLogin();
            //self.appGameService.startGameWithComputer();
            //self.appScreenService.switchToScreen('game-screen-id');
            self.appScreenService.resizeHandler();
            self.appLastGameMode = "OnlinePlay";
        }

        self.playerLogin = function () {
            console.log("playerLogin().");

            //self.appOnlineService.isConnected

            self.onlineMessage = "Warten auf Server.";
            self.appScreenService.switchToScreen('wait-online-game-screen-id');

            //online.connect();
            self.appOnlineService.connect();
        }
        self.switchToPlayerRegisterDialog = function () {
            console.log("switchToPlayerRegisterDialog().");
            self.appScreenService.switchToScreen('register-screen-id');
        }
        self.playerRegister = function () {
            console.log("playerRegister().");
            self.appScreenService.switchToScreen('register-screen-id');
        }

        // init
        $('#header-img-info-id').click(function () {
            console.log("$('#header-img-info-id').click().");
            self.appScreenService.switchToScreen('help-screen-id', self.appLastGameMode);
            if (self.inSettingPage) { self.appSetupService.saveSettings(); self.inSettingPage = false; }
        });
        $('#header-img-setup-id').click(function () {
            console.log("$('#header-img-setup-id').click().");
            self.appScreenService.switchToScreen('setup-screen-id', self.appLastGameMode);
            self.inSettingPage = true;
            if (self.inSettingPage) { self.appSetupService.saveSettings(); self.inSettingPage = false; }
        });
        $('#header-img-statistic-id').click(function () {
            console.log("$('#header-img-statistic-id').click().");
            self.appScreenService.switchToScreen('statistic-screen-id', self.appLastGameMode);
            if (self.inSettingPage) { self.appSetupService.saveSettings(); self.inSettingPage = false; }
        });
        $('#header-img-home-id').click(function () {
            console.log("$('#header-img-home-id').click().");
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
            console.log("angular.element($window).bind('resize', function () ....");
            console.log("self.main.appSetupService.showPosibleStones: " + self.appSetupService.showPosibleStones);

            self.appScreenService.resizeHandler();
            self.appCardGameService.resizeCardLayout();
            self.appCardGameService.updateCardLayout();

            //$scope.initializeWindowSize();
            return $scope.$apply();
        });

        // und zum start-bildschirm
        self.appScreenService.switchToScreen('startup-screen-id');

        self.appScreenService.imageBlinkingStart();

        // und alles einmal beim start updaten.
        self.appScreenService.resizeHandler();
        self.appCardGameService.resizeCardLayout();
    }]);
})();

