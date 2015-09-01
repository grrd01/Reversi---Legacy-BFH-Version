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
        $('#game-logo-text-id').click(function () {
            console.log("$('#game-logo-text-id').click().");
            self.appScreenService.switchToScreen('game-screen-id');
        });

        // resize registrieren
        //$(window).resize(resize);
        angular.element($window).bind('resize', function () {
            console.log("angular.element($window).bind('resize', function () ....");

            self.appScreenService.resizeHandler();
            //$scope.initializeWindowSize();
            return $scope.$apply();
        });

        // und alles einmal beim start initialisieren.
        self.appScreenService.resizeHandler();

        // und zum start-bildschirm
        self.appScreenService.switchToScreen('startup-screen-id');

        self.appScreenService.imageBlinkingStart();

        self.appScreenService.playersLeftTurn();

        self.appCardGameService.updateCards();

        self.appCardGameService.doImageSwitch(3, 3, 2);
        self.appCardGameService.doImageSwitch(4, 4, 2);
        self.appCardGameService.doImageSwitch(3, 4, 1);
        self.appCardGameService.doImageSwitch(4, 3, 1);

    }]);
})();

