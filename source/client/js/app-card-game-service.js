"use strict";

// App CardGame Service (zeichnen des Spielfeld)

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppCardGameService', ['$timeout', 'AppConstantService', 'AppSetupService', 'AppGameStateService', function ($timeout, appConstantService, appSetupService, appGameStateService) {
        var AppCardGameService = function () {
            var self = this;
            self.appConstantService = appConstantService;
            self.appGameStateService = appGameStateService;
            self.appSetupService = appSetupService;

            // all resources
            self.gameResources = {};

            self.gameResources.stones = [
                // leeres Feld
                "./images/emptycard-128.png",
                // weisser Stein Feld
                "./images/white-stone-128.png",
                // schwarzer Stein Feld
                "./images/black-stone-r-128.png",
                // fragezeiche für unbekannten status auf dem Feld
                "./images/question-128.png",
                // ok Feld
                "./images/stone-ok-l-128.png",
                // nicht erlauptes Feld
                "./images/stone-wrong-l-128.png",
            ];

            self.gameResources.stoneDivContainerId = [];
            self.gameResources.stoneX = [];
            self.gameResources.stoneY = [];
            self.gameResources.stoneWidth = [];
            self.gameResources.stoneHeight = [];

            self.gameResources.stoneMaxCol = self.appConstantService.GAME_MAX_COLUMNS;
            self.gameResources.stoneMaxRow = self.appConstantService.GAME_MAX_ROWS;
            self.gameResources.stoneMargin = 3;

            self.gameResources.maxImageCount = self.gameResources.stoneMaxCol * self.gameResources.stoneMaxRow;

            self.gameResources.stoneId0 = [];
            self.gameResources.stoneId1 = [];
            self.gameResources.stoneId2 = [];
            self.gameResources.stoneId3 = [];
            self.gameResources.stoneId4 = [];
            self.gameResources.stoneId5 = [];

            for (var i = 0; i < self.gameResources.maxImageCount; i++) {
                var xnr = (i % self.gameResources.stoneMaxCol);
                var ynr = Math.floor(i / self.gameResources.stoneMaxCol);

                self.gameResources.stoneDivContainerId.push("div-image-pair-area-" + xnr + ynr);

                self.gameResources.stoneId0.push("stone-0-" + xnr + ynr);
                self.gameResources.stoneId1.push("stone-1-" + xnr + ynr);
                self.gameResources.stoneId2.push("stone-2-" + xnr + ynr);
                self.gameResources.stoneId3.push("stone-3-" + xnr + ynr);
                self.gameResources.stoneId4.push("stone-4-" + xnr + ynr);
                self.gameResources.stoneId5.push("stone-5-" + xnr + ynr);

                var html = "";
                html += "<div id='" + self.gameResources.stoneDivContainerId[i] + "'>\n"
                html += "  <img id='" + self.gameResources.stoneId0[i] + "'";
                html += " class='pair-flip-image pair-flip-image-front' src='" + self.gameResources.stones[0] + "' />\n";
                html += "  <img id='" + self.gameResources.stoneId1[i] + "'";
                html += " class='pair-flip-image pair-flip-image-back' src='" + self.gameResources.stones[1] + "' />\n";
                html += "  <img id='" + self.gameResources.stoneId2[i] + "'";
                html += " class='pair-flip-image pair-flip-image-back' src='" + self.gameResources.stones[2] + "' />\n";
                html += "  <img id='" + self.gameResources.stoneId3[i] + "'";
                html += " class='pair-flip-image pair-flip-image-back' src='" + self.gameResources.stones[3] + "' />\n";
                html += "  <img id='" + self.gameResources.stoneId4[i] + "'";
                html += " class='pair-flip-image pair-flip-image-back' src='" + self.gameResources.stones[4] + "' />\n";
                html += "  <img id='" + self.gameResources.stoneId5[i] + "'";
                html += " class='pair-flip-image pair-flip-image-back' src='" + self.gameResources.stones[5] + "' />\n";
                html += "</div>\n";
                $(html).appendTo($("#game-player-stone-field-id"));

                self.gameResources.stoneX.push(0);
                self.gameResources.stoneY.push(0);
                self.gameResources.stoneWidth.push(0);
                self.gameResources.stoneHeight.push(0);
            }

            self.switchOffAllBackImages = function() {
                var allBackImgs = $(".pair-flip-image-back");
                allBackImgs.each(function (index, item) {
                    var classname = item.className;
                    console.log("classname: " + classname);
                });
                allBackImgs.css("visibility", "hidden");

                var allFrontImgs = $(".pair-flip-image-front");
                allFrontImgs.each(function (index, item) {
                    var classname = item.className;
                    console.log("classname: " + classname);
                });
                allFrontImgs.css("visibility", "visible");
            }

            self.switchOffAllBackImages();

            self.resize = function() {
                console.log("resize() called.");

                var stoneDy = $('#game-player-info-id').height(); // + $('#game-logo-id').height();
                self.gameResources.areaGameWidth = $('#game-player-stone-field-id').width();
                self.gameResources.areaGameHeight = $('#game-player-stone-field-id').height();
                var stoneWidth = ((self.gameResources.areaGameWidth - self.gameResources.stoneMargin) / self.gameResources.stoneMaxCol) - self.gameResources.stoneMargin;
                var stoneHeight = ((self.gameResources.areaGameHeight - self.gameResources.stoneMargin) / self.gameResources.stoneMaxRow) - self.gameResources.stoneMargin;

                for (var i = 0; i < self.gameResources.maxImageCount; i++) {
                    var px = self.gameResources.stoneMargin + ((i % self.gameResources.stoneMaxCol) * (stoneWidth + self.gameResources.stoneMargin));
                    var py = self.gameResources.stoneMargin + (Math.floor(i / self.gameResources.stoneMaxCol) * (stoneHeight + self.gameResources.stoneMargin));
                    self.gameResources.stoneX[i] = px;
                    self.gameResources.stoneY[i] = py + stoneDy;

                    self.gameResources.stoneWidth[i] = stoneWidth;
                    self.gameResources.stoneHeight[i] = stoneHeight;
                }

                for (var i = 0; i < self.gameResources.maxImageCount; i++) {
                    //style = "position: absolute; left: 200px;"
                    var stoneId0 = $("#" + self.gameResources.stoneId0[i]);
                    var stoneId1 = $("#" + self.gameResources.stoneId1[i]);
                    var stoneId2 = $("#" + self.gameResources.stoneId2[i]);
                    var stoneId3 = $("#" + self.gameResources.stoneId3[i]);
                    var stoneId4 = $("#" + self.gameResources.stoneId4[i]);
                    var stoneId5 = $("#" + self.gameResources.stoneId5[i]);
                    stoneId0.css({
                        position: 'absolute',
                        left: self.gameResources.stoneX[i],
                        top: self.gameResources.stoneY[i]
                    });
                    stoneId1.css({
                        position: 'absolute',
                        left: self.gameResources.stoneX[i],
                        top: self.gameResources.stoneY[i]
                    });
                    stoneId2.css({
                        position: 'absolute',
                        left: self.gameResources.stoneX[i],
                        top: self.gameResources.stoneY[i]
                    });
                    stoneId3.css({
                        position: 'absolute',
                        left: self.gameResources.stoneX[i],
                        top: self.gameResources.stoneY[i]
                    });
                    stoneId4.css({
                        position: 'absolute',
                        left: self.gameResources.stoneX[i],
                        top: self.gameResources.stoneY[i]
                    });
                    stoneId5.css({
                        position: 'absolute',
                        left: self.gameResources.stoneX[i],
                        top: self.gameResources.stoneY[i]
                    });
                    stoneId0.css({height: self.gameResources.stoneHeight[i], width: self.gameResources.stoneWidth[i]});
                    stoneId1.css({height: self.gameResources.stoneHeight[i], width: self.gameResources.stoneWidth[i]});
                    stoneId2.css({height: self.gameResources.stoneHeight[i], width: self.gameResources.stoneWidth[i]});
                    stoneId3.css({height: self.gameResources.stoneHeight[i], width: self.gameResources.stoneWidth[i]});
                    stoneId4.css({height: self.gameResources.stoneHeight[i], width: self.gameResources.stoneWidth[i]});
                    stoneId5.css({height: self.gameResources.stoneHeight[i], width: self.gameResources.stoneWidth[i]});
                }
            }

            //wird vom app-main-controller aufgerufen ==> $(window).resize(self.resize);
            self.resizeCardLayout = function() {
                self.resize();
                //self.updateCardLayout();
            }

            self.updateCardLayout = function() {
                var maxStone = self.appConstantService.GAME_MAX_COLUMNS * self.appConstantService.GAME_MAX_ROWS;
                for(var idx = 0; idx < maxStone; idx++) {
                    var stoneId0 = self.gameResources.stoneId0[idx];
                    var stoneId1 = self.gameResources.stoneId1[idx];
                    var stoneId2 = self.gameResources.stoneId2[idx];
                    var stoneId3 = self.gameResources.stoneId3[idx];
                    var stoneId4 = self.gameResources.stoneId4[idx];
                    var stoneId5 = self.gameResources.stoneId5[idx];

                    var imgVis0 = $(".pair-flip-image#" + stoneId0).css("visibility");
                    var imgVis1 = $(".pair-flip-image#" + stoneId1).css("visibility");
                    var imgVis2 = $(".pair-flip-image#" + stoneId2).css("visibility");
                    var imgVis3 = $(".pair-flip-image#" + stoneId3).css("visibility");
                    var imgVis4 = $(".pair-flip-image#" + stoneId4).css("visibility");
                    var imgVis5 = $(".pair-flip-image#" + stoneId5).css("visibility");

                    var visActiveNr = -1;
                    if (imgVis0 === "visible") {
                        visActiveNr = 0;
                    } else if (imgVis1 === "visible") {
                        visActiveNr = 1;
                    } else if (imgVis2 === "visible") {
                        visActiveNr = 2;
                    } else if (imgVis3 === "visible") {
                        visActiveNr = 3;
                    } else if (imgVis4 === "visible") {
                        visActiveNr = 4;
                    } else {
                        visActiveNr = 5;
                    }

                    var xindex = idx % 8;
                    var yindex = Math.floor(idx / 8);

                    var stateNr = -1;
                    //var state = self.appGameEngineService.getStoneState(xindex,yindex);
                    var state = self.appGameStateService.getStoneState(xindex,yindex);
                    switch(state) {
                        default: // == 0
                            stateNr = 0;
                            break;
                        case 1:
                            stateNr = 1;
                            break;
                        case 2:
                            stateNr = 2;
                            break;
                        case 3:
                            stateNr = 3;
                            break;
                        case 4:
                            stateNr = 4;
                            break;
                        case 5:
                            stateNr = 4;
                            break;
                        case 6:
                            stateNr = 5;
                            break;
                    }

                    if (visActiveNr != stateNr) {
                        if (stateNr == self.appGameStateService.STONE_WHITE || stateNr == self.appGameStateService.STONE_BLACK) {
                            self.doAnimationTo(idx, stateNr);
                        } else if (stateNr == 4) {
                            if (self.appSetupService.showPosibleStones)
                                self.doImageSwitch(xindex, yindex, stateNr);
                        } else {
                            self.doImageSwitch(xindex, yindex, stateNr);
                        }
                    }
                }
            }

            self.doAnimation = function(toIndex, stoneIndex, stoneId0, stoneId1, stoneId2, stoneId3, stoneId4, stoneId5) {
                var imgVis0 = $(".pair-flip-image#" + stoneId0).css("visibility");
                var imgVis1 = $(".pair-flip-image#" + stoneId1).css("visibility");
                var imgVis2 = $(".pair-flip-image#" + stoneId2).css("visibility");
                var imgVis3 = $(".pair-flip-image#" + stoneId3).css("visibility");
                var imgVis4 = $(".pair-flip-image#" + stoneId4).css("visibility");
                var imgVis5 = $(".pair-flip-image#" + stoneId5).css("visibility");

                var visActive = undefined;
                if (imgVis0 === "visible") {
                    visActive = "#" + stoneId0;
                } else if (imgVis1 === "visible") {
                    visActive = "#" + stoneId1;
                } else if (imgVis2 === "visible") {
                    visActive = "#" + stoneId2;
                } else if (imgVis3 === "visible") {
                    visActive = "#" + stoneId3;
                } else if (imgVis4 === "visible") {
                    visActive = "#" + stoneId4;
                } else {
                    visActive = "#" + stoneId5;
                }

                var visNext = undefined;
                switch (toIndex) {
                    default: // == 0
                        visNext = "#" + stoneId0;
                        break;
                    case 1:
                        visNext = "#" + stoneId1;
                        break;
                    case 2:
                        visNext = "#" + stoneId2;
                        break;
                    case 3:
                        visNext = "#" + stoneId3;
                        break;
                    case 4:
                        visNext = "#" + stoneId4;
                        break;
                    case 5:
                        visNext = "#" + stoneId5;
                        break;
                }

                var iw = self.gameResources.stoneWidth[stoneIndex];
                var iw2 = (iw - 2) / 2;
                var pleftmid = self.gameResources.stoneX[stoneIndex] + iw2;

                $(visActive).animate({left: "+=" + iw2 + "px", width: "2px"},
                    {
                        queue: true,
                        duration: 300,
                        start: function () {
                        },
                        progress: function (animation, progress) {
                        },
                        complete: function () {
                            $(visActive).css("visibility", "hidden");
                            $(visNext).css("left", "" + pleftmid + "px");
                            $(visNext).css("width", "2px");
                            $(visNext).css("visibility", "visible");
                            $(visNext).animate({left: "-=" + iw2 + "px", width: "" + iw + "px"},
                                {
                                    queue: true,
                                    duration: 300,
                                    start: function () {
                                    },
                                    progress: function (animation, progress) {
                                    },
                                    complete: function () {
                                    }
                                });
                        }
                    });
            }

            self.doAnimationTo = function(clickEeventIndex, imgIndex) {

                var stoneId0 = self.gameResources.stoneId0[clickEeventIndex];
                var stoneId1 = self.gameResources.stoneId1[clickEeventIndex];
                var stoneId2 = self.gameResources.stoneId2[clickEeventIndex];
                var stoneId3 = self.gameResources.stoneId3[clickEeventIndex];
                var stoneId4 = self.gameResources.stoneId4[clickEeventIndex];
                var stoneId5 = self.gameResources.stoneId5[clickEeventIndex];

                self.doAnimation(imgIndex, clickEeventIndex, stoneId0, stoneId1, stoneId2, stoneId3, stoneId4, stoneId5);
            }

            self.doImageSwitch = function(column, row, imageindex) {
                console.log("doImageSwitch(...) called. column: " + column + ", row: " + row + ", imageindex; " + imageindex);

                var index = (row * self.gameResources.stoneMaxCol) + column;
                if (index >= self.gameResources.maxImageCount || imageindex < 0 || imageindex >= 6) {
                    alert("some variable out of range! column: " + column + ", row: " + row + " imageindex: " + imageindex);
                    return;
                }

                var stoneId0 = self.gameResources.stoneId0[index];
                var stoneId1 = self.gameResources.stoneId1[index];
                var stoneId2 = self.gameResources.stoneId2[index];
                var stoneId3 = self.gameResources.stoneId3[index];
                var stoneId4 = self.gameResources.stoneId4[index];
                var stoneId5 = self.gameResources.stoneId5[index];

                var stoneIdVisible;
                switch (imageindex) {
                    case 0:
                        stoneIdVisible = self.gameResources.stoneId0[index];
                        break;
                    case 1:
                        stoneIdVisible = self.gameResources.stoneId1[index];
                        break;
                    case 2:
                        stoneIdVisible = self.gameResources.stoneId2[index];
                        break;
                    case 3:
                        stoneIdVisible = self.gameResources.stoneId3[index];
                        break;
                    case 4:
                        stoneIdVisible = self.gameResources.stoneId4[index];
                        break;
                    default:
                        stoneIdVisible = self.gameResources.stoneId5[index];
                        break;
                }

                $("#" + stoneId0).css("visibility", "hidden");
                $("#" + stoneId1).css("visibility", "hidden");
                $("#" + stoneId2).css("visibility", "hidden");
                $("#" + stoneId3).css("visibility", "hidden");
                $("#" + stoneId4).css("visibility", "hidden");
                $("#" + stoneId5).css("visibility", "hidden");

                var iw = self.gameResources.stoneWidth[index];
                var ix = self.gameResources.stoneX[index];
                $("#" + stoneIdVisible).css("left", "" + ix + "px");
                $("#" + stoneIdVisible).css("width", "" + iw + "px");
                $("#" + stoneIdVisible).css("visibility", "visible");
            }

            $('.pair-flip-image').click(function (event) {
                console.log("$('.pair-flip-image').click(...), class: " + this.className + ", id: " + this.id);

                var index = -1;
                for (var i = 0; i < self.gameResources.maxImageCount; i++) {
                    if (this.id === self.gameResources.stoneId0[i] || this.id === self.gameResources.stoneId1[i]
                        || this.id === self.gameResources.stoneId2[i] || this.id === self.gameResources.stoneId3[i]
                        || this.id === self.gameResources.stoneId4[i] || this.id === self.gameResources.stoneId5[i]) {
                        index = i;
                        break;
                    }
                }

                self.appGameStateService.eventTrySetStone(index);
                self.updateCardLayout();
            });
        }

        // Service Objekt erstellen.
        var appCardGameService = new AppCardGameService();

        // und zurückgeben
        return appCardGameService;
    }]);
})();


