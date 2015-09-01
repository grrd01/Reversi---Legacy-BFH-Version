

// App Screen Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppScreenService', ['$window', function ($window) {
        var AppScreenService = function () {
            var self = this;
            self.actualScreenId = "";


            // Functionen 

            self.resizeGameEx = function(minMargin) {
                // game size and all we have to see
                var gameSize = {
                    width: 800,
                    height: 1100, // logoH = 62; + playerInfoH = 220; + stoneFieldH = 800; + statusH = 18;
                    safeWidth: 800,
                    safeHeight: 1100
                };

                // the dimensions of the viewport
                var viewport = {
                    width: window.innerWidth - (2 * minMargin),
                    height: window.innerHeight - (2 * minMargin)
                };

                var newWidth, newHeight, newX, newY;

                // Determine game size
                if (gameSize.height / gameSize.width > viewport.height / viewport.width) {
                    if (gameSize.safeHeight / gameSize.width > viewport.height / viewport.width) {
                        newHeight = viewport.height * gameSize.height / gameSize.safeHeight;
                        newWidth = newHeight * gameSize.width / gameSize.height;
                    } else {
                        newWidth = viewport.width;
                        newHeight = newWidth * gameSize.height / gameSize.width;
                    }
                } else {
                    if (gameSize.height / gameSize.safeWidth > viewport.height / viewport.width) {
                        newHeight = viewport.height;
                        newWidth = newHeight * gameSize.width / gameSize.height;
                    } else {
                        newWidth = viewport.width * gameSize.width / gameSize.safeWidth;
                        newHeight = newWidth * gameSize.height / gameSize.width;
                    }
                }

                var gsr = {};
                gsr.gameSizeWidth = newWidth;
                gsr.gameSizeHeight = newHeight;

                gsr.gameX = ((viewport.width - newWidth) / 2) + minMargin;
                gsr.gameY = ((viewport.height - newHeight) / 2) + minMargin;

                return gsr;
            }

            self.resizeGameField = function(gsr) {
                var left = 0;
                var logoHeight = $('#game-logo-id').height();
                var stoneHeight = gsr.gameSizeWidth; // quadratisch
                var statusHeight = 18;
                var infoHeight = gsr.gameSizeHeight - (stoneHeight + statusHeight + logoHeight);
                var infoTop = logoHeight;
                var stoneTop = infoTop + infoHeight;
                var statusTop = stoneTop + stoneHeight;

                $('#game-player-info-id').css('width', '' + gsr.gameSizeWidth + 'px');
                $('#game-player-info-id').css('height', '' + infoHeight + 'px');
                $('#game-player-info-id').css('left', '' + left + 'px');
                $('#game-player-info-id').css('top', '' + infoTop + 'px');

                $('#game-player-stone-field-id').css('width', '' + gsr.gameSizeWidth + 'px');
                $('#game-player-stone-field-id').css('height', '' + stoneHeight + 'px');
                $('#game-player-stone-field-id').css('left', '' + left + 'px');
                $('#game-player-stone-field-id').css('top', '' + stoneTop + 'px');

                $('#game-player-status-id').css('width', '' + gsr.gameSizeWidth + 'px');
                $('#game-player-status-id').css('height', '' + statusHeight + 'px');
                $('#game-player-status-id').css('left', '' + left + 'px');
                $('#game-player-status-id').css('top', '' + statusTop + 'px');
            }

            self.resizeHtmlElements = function(gsr) {
                if (gsr.gameSizeWidth < 350) {
                    var logoFontSize = '28px';
                    var isFontSize = $('#game-logo-text-id').css('font-size');
                    if (logoFontSize !== isFontSize) {
                        $('#game-logo-text-id').css('font-size', '' + logoFontSize);
                        $('#game-logo-text-id').css('margin-top', '' + 14 + 'px');
                    }
                } else {
                    var logoFontSize = '42px';
                    var isFontSize = $('#game-logo-text-id').css('font-size');
                    if (logoFontSize !== isFontSize) {
                        $('#game-logo-text-id').css('font-size', '' + logoFontSize);
                        $('#game-logo-text-id').css('margin-top', '' + 7 + 'px');
                    }
                }

                var infoMidd = gsr.gameSizeWidth /2;
                var infoHeight = $('#game-player-info-id').height();
                var fontSize = infoHeight * 0.20;
                var playerImgHeight = infoHeight - 2 - (fontSize *1.05);
                var stoneImgHeight = playerImgHeight;
                var statusImgHeight = playerImgHeight;
                var playerImgWidth = playerImgHeight * 0.75;

                $('.img-player-info').css('width', '' + playerImgWidth + 'px');
                $('.img-player-info').css('height', '' + playerImgHeight + 'px');

                $('.img-player-stone').css('width', '' + stoneImgHeight + 'px');
                $('.img-player-stone').css('height', '' + stoneImgHeight + 'px');

                $('.img-player-status').css('width', '' + statusImgHeight + 'px');
                $('.img-player-status').css('height', '' + statusImgHeight + 'px');

                $('#img-player-stone-left-id').css('left', '' + (playerImgWidth + 3) + 'px');
                $('#img-player-stone-right-id').css('right', '' + (playerImgWidth + 3) + 'px');

                $('#img-player-status-left-id').css('left', '' + (playerImgWidth + stoneImgHeight + 3) + 'px');
                $('#img-player-status-right-id').css('right', '' + (playerImgWidth + stoneImgHeight + 3) + 'px');

                $('#text-player-info-left-id').css('left', '' + 3 + 'px');
                $('#text-player-info-right-id').css('right', '' + 3 + 'px');

                var textPlayerinfoY = infoHeight + 2 - (fontSize * 1.4);
                $('.text-player-info').css('top', '' + textPlayerinfoY + 'px');
                $('.text-player-info').css('font-size', '' + fontSize + 'px');
            }

            self.resizeHandler = function() {
                console.log("resize() called.");

                var minMargin = 0; // minimum Rand in pixel;
                var gsr = self.resizeGameEx(minMargin);

                // container breite setzen
                $('.container-game').css('width', '' + (gsr.gameSizeWidth) + 'px');

                $('#game-logo-id').css('width', '' + (gsr.gameSizeWidth - 3) + 'px');
                $('#game-logo-id').css('height', '' + 62 + 'px');

                $('#central-rectangle-id').css('width', '' + gsr.gameSizeWidth + 'px');
                $('#central-rectangle-id').css('height', '' + gsr.gameSizeHeight + 'px');
                $('#central-rectangle-id').css('left', '' + gsr.gameX + 'px');
                $('#central-rectangle-id').css('top', '' + gsr.gameY + 'px');

                var gameLogoHeight = $('#game-logo-id').height() + 3; //+border
                var gameScreenHeight = gsr.gameSizeHeight - gameLogoHeight;
                $('.switch-area-screen').css('height', '' + gameScreenHeight + 'px');
                $('.switch-area-screen').css('top', '' + gameLogoHeight + 'px');

                self.resizeGameField(gsr);
                self.resizeHtmlElements(gsr);

                console.log("resize() win: " + window.innerWidth + "*" + window.innerHeight + " game: " + gsr.gameSizeWidth + "*" + gsr.gameSizeHeight);
            };

            self.switchToScreen = function (onId) {
                var isVisibleScreen = !$('#' + onId).is(':hidden');

                $('#startup-screen-id').hide();
                $('#help-screen-id').hide();
                $('#setup-screen-id').hide();
                $('#statistic-screen-id').hide();
                $('#login-screen-id').hide();
                $('#game-screen-id').hide();

                if (isVisibleScreen) {
                    $('#startup-screen-id').show();
                } else {
                    $('#' + onId).show();
                }
            }


            self.imageBlinkingOn = false;
            self.imageBlinkingId = 0;
            self.imageBlinking = function() {
                if (self.playersLeftTurnOn) {
                    //$('.img-player-status-left').fadeOut(100).fadeIn(100);
                    /*
                    $('.img-player-status-left').animate({ left: "+=5px", width: "-=5px" },
                        {
                            queue: true,
                            duration: 300,
                            start: function () { },
                            progress: function(animation, progress) { },
                            complete: function() {
                                $('.img-player-status-left').animate({ left: "-=5px", width: "+=5px" },
                                    {
                                        queue: true,
                                        duration: 300,
                                        start: function () { },
                                        progress: function(animation, progress) { },
                                        complete: function() {}
                                    });
                            }
                        });
                        */
                }
                if (self.playersRightTurnOn) {
                    $('.img-player-status-right').fadeOut(100).fadeIn(100);
                }

                if (self.imageBlinkingOn) {
                    self.imageBlinkingId = setTimeout(self.imageBlinking, 1000); //Runs n millisecond
                } else {
                    self.imageBlinkingId = 0;
                }
            }
            self.imageBlinkingStart = function() {
                if (self.imageBlinkingId === 0) {
                    self.imageBlinkingId = setTimeout(self.imageBlinking, 1000); //Runs n millisecond
                }
                self.imageBlinkingOn = true;
            }
            self.imageBlinkingStop = function() {
                self.imageBlinkingOn = false;
            }

            self.playersLeftTurnOn = false;
            self.playersRightTurnOn = false;
            self.playersRightTurn = function() {
                self.playersLeftTurnOn = false;
                self.playersRightTurnOn = true;
                $('.img-player-status-left').hide();
                $('.img-player-status-right').show();
            }
            self.playersLeftTurn = function() {
                self.playersLeftTurnOn = true;
                self.playersRightTurnOn = false;
                $('.img-player-status-left').show();
                $('.img-player-status-right').hide();
            }
            self.playersStop = function() {
                self.playersLeftTurnOn = false;
                self.playersRightTurnOn = false;
                $('.img-player-status-left').hide();
                $('.img-player-status-right').hide();
            }
        }

        // Service Objekt erstellen.
        var appScreenService = new AppScreenService();

        // und zurückgeben
        return appScreenService;
    }]);
})();