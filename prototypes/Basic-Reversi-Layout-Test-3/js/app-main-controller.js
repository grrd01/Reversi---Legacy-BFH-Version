/* createt: uje */

'use strict';

(function() {

    // get the application.
    var app = angular.module('ApplicationModule');

    /* Controllers */
    app.controller('ApplicationMainCtrl', ['$scope', '$rootScope', '$window', '$timeout', 'AppScreenService', 'AppGameService', 'AppCardGameService', function ($scope, $rootScope, $window, $timeout, appScreenService, appGameService, appCardGameService) {

        var self = this;

        self.appScreenService = appScreenService;
        self.appGameService = appGameService;
        self.appCardGameService = appCardGameService;

        // functionsen

        self.localTowPlayerGame = function() {
            console.log("localTowPlayerGame().");

            // direkt zum Spielbildschirm
            self.appGameService.startTowPlayerGame();
            self.appScreenService.switchToScreen('game-screen-id');
        }
        self.localPlayWithComputer = function () {
            console.log("localPlayWithComputer().");
            //self.appGameService.startGameWithComputer();
            self.appScreenService.switchToScreen('game-screen-id');
        }
        self.onlinePlay = function () {
            console.log("onlinePlay().");
            self.appScreenService.switchToScreen('login-screen-id');
            //self.appUserService.checkLogin();
            //self.appGameService.startGameWithComputer();
            //self.appScreenService.switchToScreen('game-screen-id');
        }

        self.playerLogin = function () {
            console.log("playerLogin().");
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
            self.appScreenService.switchToScreen('help-screen-id');
        });
        $('#header-img-setup-id').click(function () {
            console.log("$('#header-img-setup-id').click().");
            self.appScreenService.switchToScreen('setup-screen-id');
        });
        $('#header-img-statistic-id').click(function () {
            console.log("$('#header-img-statistic-id').click().");
            self.appScreenService.switchToScreen('statistic-screen-id');
        });
        $('#header-img-home-id').click(function () {
            console.log("$('#header-img-home-id').click().");
            self.appScreenService.switchToScreen('startup-screen-id');
        });

        // resize registrieren
        //$(window).resize(resize);
        angular.element($window).bind('resize', function () {
            console.log("angular.element($window).bind('resize', function () ....");

            self.appScreenService.resizeHandler();
            self.appCardGameService.updateCards();

            //$scope.initializeWindowSize();
            return $scope.$apply();
        });

        // und zum start-bildschirm
        self.appScreenService.switchToScreen('startup-screen-id');

        self.appScreenService.imageBlinkingStart();

        self.appScreenService.playersLeftTurn();

        // und alles einmal beim start updaten.
        self.appScreenService.resizeHandler();
        self.appCardGameService.updateCards();

        self.appCardGameService.doImageSwitch(3, 3, 2);
        self.appCardGameService.doImageSwitch(4, 4, 2);
        self.appCardGameService.doImageSwitch(3, 4, 1);
        self.appCardGameService.doImageSwitch(4, 3, 1);

    }]);
})();

