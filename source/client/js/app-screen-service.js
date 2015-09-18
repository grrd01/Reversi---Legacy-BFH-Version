/*
 * Reversi
 * Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich
 */

'use strict';

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppScreenService', ['$window', 'AppSetupService', 'AppStatisticService', 'AppOnlineService', function ($window, appSetupService, appStatisticService, appOnlineService) {
        var AppScreenService = function () {
            var self = this;
            self.appSetupService = appSetupService;
            self.appStatisticService = appStatisticService;
            self.appOnlineService = appOnlineService;

            // Functionen
            self.resizeGameEx = function(minMargin) {
                // game size and all we have to see
                var gameSize = {
                    width: 800,
                    height: 1100, // logoH = 62; + playerInfoH = 220; + stoneFieldH = 800; + statusH = 24;
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
                var statusHeight = 24;
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
                var logoFontSize = '42px';
                var logoFontTop = '7px';
                if (gsr.gameSizeWidth < 290) {
                    logoFontSize = '6px';
                    logoFontTop = '26px';
                } else if (gsr.gameSizeWidth < 310) {
                    logoFontSize = '10px';
                    logoFontTop = '24px';
                } else if (gsr.gameSizeWidth < 340) {
                    logoFontSize = '16px';
                    logoFontTop = '22px';
                } else if (gsr.gameSizeWidth < 380) {
                    logoFontSize = '20px';
                    logoFontTop = '20px';
                } else if (gsr.gameSizeWidth < 430) {
                    logoFontSize = '28px';
                    logoFontTop = '16px';
                }
                $('#game-logo-text-id').css('font-size', logoFontSize);
                $('#game-logo-text-id').css('top', logoFontTop);

                if (gsr.gameSizeWidth < 340) {
                    $('.startup-menu-img').css('margin-right', '1px');
                    $('.startup-menu-img').css('height', '12px');
                } else if (gsr.gameSizeWidth < 400) {
                        $('.startup-menu-img').css('margin-right', '5px');
                        $('.startup-menu-img').css('height', '16px');
                } else if (gsr.gameSizeWidth < 500) {
                    $('.startup-menu-img').css('margin-right', '20px');
                    $('.startup-menu-img').css('height', '32px');
                } else {
                    $('.startup-menu-img').css('margin-right', '50px');
                    $('.startup-menu-img').css('height', '64px');
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
            };

            self.switchToScreen = function (onId, lastGameMode) {
                var isVisibleScreen = !$('#' + onId).is(':hidden');

                $('#header-img-info-id').css("background-color", '');
                $('#header-img-setup-id').css("background-color", '');
                $('#header-img-statistic-id').css("background-color", '');

                $('#startup-screen-id').hide();
                $('#help-screen-id').hide();
                $('#setup-screen-id').hide();
                $('#statistic-screen-id').hide();
                $('#login-screen-id').hide();
                $('#register-screen-id').hide();
                $('#wait-online-game-screen-id').hide();
                $('#game-screen-id').hide();

                if (!isVisibleScreen && onId === 'help-screen-id')
                    $('#header-img-info-id').css("background-color", '#DDDDDD');
                if (!isVisibleScreen && onId === 'setup-screen-id')
                    $('#header-img-setup-id').css("background-color", '#DDDDDD');
                if (!isVisibleScreen && onId === 'statistic-screen-id') {
                    $('#header-img-statistic-id').css("background-color", '#DDDDDD');

                    self.appStatisticService.inStatisticPage = true;
                    if (self.appOnlineService.socket === undefined) {
                        self.appOnlineService.connect();
                    } else {
                        self.appOnlineService.ranking();
                    }
                } else {
                    self.appStatisticService.inStatisticPage = false;
                }

                if (isVisibleScreen && (lastGameMode !== undefined && lastGameMode.length > 0)) {
                    $('#game-screen-id').show();
                } else if (isVisibleScreen || onId === 'startup-screen-id') {
                    $('#startup-screen-id').show();
                } else {
                    $('#' + onId).show();
                }

                if (self.appSetupService.inSettingPage) {
                    self.appSetupService.saveSettings();
                    self.appSetupService.inSettingPage = false;
                }

                if (onId === 'setup-screen-id') {
                    try {
                        if (self.appSetupService.localUserImageWhite.length > 0) {
                            var img = $('#local-user-img-id');
                            var imgSrc = img.attr("src");

                            if (imgSrc != self.appSetupService.localUserImageWhite) {
                                img.attr("src", self.appSetupService.localUserImageWhite);
                            }
                        }
                        if (self.appSetupService.localUserImageBlack.length > 0) {
                            var img = $('#local-user-img-id-2');
                            var imgSrc = img.attr("src");

                            if (imgSrc != self.appSetupService.localUserImageBlack) {
                                img.attr("src", self.appSetupService.localUserImageBlack);
                            }
                        }
                    } catch (e) {
                        console.log("exception in if (onId === 'setup-screen-id')  exception: " + e);
                    }
                    self.appSetupService.inSettingPage = true;
                }
            }

            self.updatePlayerImages = function() {
                try {
                    if (self.appSetupService.localUserImageWhite != null && self.appSetupService.localUserImageWhite.length > 0) {
                        var img = $('#img-left-player-info-local-id');
                        var imgSrc = img.attr("src");

                        if (imgSrc != self.appSetupService.localUserImageWhite) {
                            img.attr("src", self.appSetupService.localUserImageWhite);
                        }
                    }
                } catch (e) {
                    console.log("exception in if (onId === 'setup-screen-id')  exception: " + e);
                }
                try {
                    if (self.appSetupService.localUserImageWhite != null && self.appSetupService.localUserImageWhite.length > 0) {
                        var img = $('#img-right-player-info-local-id');
                        var imgSrc = img.attr("src");

                        if (imgSrc != self.appSetupService.localUserImageBlack) {
                            img.attr("src", self.appSetupService.localUserImageBlack);
                        }
                    }
                } catch (e) {
                    console.log("exception in if (onId === 'setup-screen-id')  exception: " + e);
                }
            }

            self.switchToLocalMode = function() {
                $('#img-left-player-info-local-id').show();
                $('#img-left-player-info-computer-id').hide();
                $('#img-left-player-info-online-id').hide();

                $('#img-right-player-info-local-id').show();
                $('#img-right-player-info-computer-id').hide();
                $('#img-right-player-info-online-id').hide();

                self.updatePlayerImages();
            }

            self.switchToComputerMode = function() {
                $('#img-left-player-info-local-id').show();
                $('#img-left-player-info-computer-id').hide();
                $('#img-left-player-info-online-id').hide();

                $('#img-right-player-info-local-id').hide();
                $('#img-right-player-info-computer-id').show();
                $('#img-right-player-info-online-id').hide();

                self.updatePlayerImages();
            }

            self.switchToOnlineMode = function(playerMode) {
                if (playerMode === 'StartPlayer') {
                    $('#img-left-player-info-local-id').show();
                    $('#img-left-player-info-computer-id').hide();
                    $('#img-left-player-info-online-id').hide();

                    $('#img-right-player-info-local-id').hide();
                    $('#img-right-player-info-computer-id').hide();
                    $('#img-right-player-info-online-id').show();
                } else /*if (playerMode === 'StartOpponent')*/ {
                    $('#img-left-player-info-local-id').hide();
                    $('#img-left-player-info-computer-id').hide();
                    $('#img-left-player-info-online-id').show();

                    $('#img-right-player-info-local-id').show();
                    $('#img-right-player-info-computer-id').hide();
                    $('#img-right-player-info-online-id').hide();
                }
                self.updatePlayerImages();
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

            self.fileInput = document.getElementById('getimage');
            self.fileInput.addEventListener('change', handleFiles);

            function handleFiles() {
                self.fileDisplayArea = document.getElementById('file-display-area');
                self.fileLocalUserImg = document.getElementById('local-user-img-id');
                var filesToUpload = document.getElementById('getimage').files;
                var file = filesToUpload[0];

                // Create a file reader
                var reader = new FileReader();
                // Set the image once loaded into file reader
                reader.onload = function(e) {
                    self.appSetupService.localUserImageWhite = self.resizeLoadedImage(self.fileLocalUserImg, e.target.result);
                }
                // Load files into file reader
                reader.readAsDataURL(file);
            }

            self.fileInput2 = document.getElementById('getimage-2');
            self.fileInput2.addEventListener('change', handleFiles2);

            function handleFiles2() {
                self.fileDisplayArea2 = document.getElementById('file-display-area-2');
                self.fileLocalUserImg2 = document.getElementById('local-user-img-id-2');
                var filesToUpload = document.getElementById('getimage-2').files;
                var file = filesToUpload[0];

                // Create a file reader
                var reader = new FileReader();
                // Set the image once loaded into file reader
                reader.onload = function(e) {
                    self.appSetupService.localUserImageBlack = self.resizeLoadedImage(self.fileLocalUserImg2, e.target.result);
                }
                // Load files into file reader
                reader.readAsDataURL(file);
            }

            self.resizeLoadedImage = function(flieLocImg, eTargetResult) {
                try {
                    flieLocImg.src = eTargetResult;
                } catch (e) {
                    console.log("exception in if (onId === 'setup-screen-id')  exception: " + e);
                }

                var canvas = document.createElement("canvas");
                //var canvas = $("<canvas>", {"id":"testing"})[0];
                var ctx = canvas.getContext("2d");
                ctx.drawImage(flieLocImg, 0, 0);

                var MAX_WIDTH = 90;
                var MAX_HEIGHT = 120;
                var width = flieLocImg.width;
                var height = flieLocImg.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(flieLocImg, 0, 0, width, height);

                var dataurl = canvas.toDataURL("image/png");
                var localUserImage = dataurl;

                flieLocImg.src = dataurl;
                //flieLocImg.id = "picture";

                return localUserImage;
            }

        }

        // Service Objekt erstellen.
        var appScreenService = new AppScreenService();

        // und zurückgeben
        return appScreenService;
    }]);
})();
