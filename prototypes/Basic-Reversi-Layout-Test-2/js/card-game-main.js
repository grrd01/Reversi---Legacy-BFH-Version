/*!
*
* Copyright (c) 2015 */

$(document).ready(function() {

    // all resources
    var gameResources = gameResources || {};

    gameResources.stones = [
        // leeres Feld
        "./images/emptycard-128.png",
        // weisses Feld
        "./images/white-stone-128.png",
        // schwarzes Feld
        "./images/black-stone-128.png",
        // rückseiten Feld
        "./images/cardbackside-128.png",
        // ok Feld
        "./images/stone-ok-128.png",
        // wrong Feld
        "./images/stone-wrong-128.png",
    ];

    gameResources.stoneDivContainerId = [];
    gameResources.stoneX = [];
    gameResources.stoneY = [];
    gameResources.stoneWidth = [];
    gameResources.stoneHeight = [];

    gameResources.stoneMaxCol = 8;
    gameResources.stoneMaxRow = 8;
    gameResources.stoneMargin = 3;

    gameResources.maxImageCount = gameResources.stoneMaxCol * gameResources.stoneMaxRow;

    gameResources.stoneId0 = [];
    gameResources.stoneId1 = [];
    gameResources.stoneId2 = [];
    gameResources.stoneId3 = [];
    gameResources.stoneId4 = [];
    gameResources.stoneId5 = [];

    for(var i = 0; i < gameResources.maxImageCount; i++) {
        var xnr = (i % gameResources.stoneMaxCol);
        var ynr = Math.floor(i / gameResources.stoneMaxCol);

        gameResources.stoneDivContainerId.push("div-image-pair-area-" + xnr + ynr);

        gameResources.stoneId0.push("stone-0-" + xnr + ynr);
        gameResources.stoneId1.push("stone-1-" + xnr + ynr);
        gameResources.stoneId2.push("stone-2-" + xnr + ynr);
        gameResources.stoneId3.push("stone-3-" + xnr + ynr);
        gameResources.stoneId4.push("stone-4-" + xnr + ynr);
        gameResources.stoneId5.push("stone-5-" + xnr + ynr);

        var html = "";
        html += "<div id='" + gameResources.stoneDivContainerId[i] +"'>\n"
        html += "  <img id='" + gameResources.stoneId0[i] +"'";
        html += " class='pair-flip-image pair-flip-image-front' src='" + gameResources.stones[0] +"' />\n";
        html += "  <img id='" + gameResources.stoneId1[i] +"'";
        html += " class='pair-flip-image pair-flip-image-back' src='" + gameResources.stones[1] +"' />\n";
        html += "  <img id='" + gameResources.stoneId2[i] +"'";
        html += " class='pair-flip-image pair-flip-image-back' src='" + gameResources.stones[2] +"' />\n";
        html += "  <img id='" + gameResources.stoneId3[i] +"'";
        html += " class='pair-flip-image pair-flip-image-back' src='" + gameResources.stones[3] +"' />\n";
        html += "  <img id='" + gameResources.stoneId4[i] +"'";
        html += " class='pair-flip-image pair-flip-image-back' src='" + gameResources.stones[4] +"' />\n";
        html += "  <img id='" + gameResources.stoneId5[i] +"'";
        html += " class='pair-flip-image pair-flip-image-back' src='" + gameResources.stones[5] +"' />\n";
        html += "</div>\n";
        $(html).appendTo($("#central-rectangle-id"));

        gameResources.stoneX.push(0);
        gameResources.stoneY.push(0);
        gameResources.stoneWidth.push(0);
        gameResources.stoneHeight.push(0);
    }

    function switchOffAllBackImages() {
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

    switchOffAllBackImages();

    function resize() {
        console.log("resize() called.");

        gameResources.areaGameWidth = $('#central-rectangle-id').width();
        gameResources.areaGameHeight = $('#central-rectangle-id').height();
        var stoneWidth = ((gameResources.areaGameWidth - gameResources.stoneMargin) / gameResources.stoneMaxCol) - gameResources.stoneMargin;
        var stoneHeight = ((gameResources.areaGameHeight - gameResources.stoneMargin) / gameResources.stoneMaxRow) - gameResources.stoneMargin;

        for(var i = 0; i < gameResources.maxImageCount; i++) {
            var px = gameResources.stoneMargin + ((i % gameResources.stoneMaxCol) * (stoneWidth + gameResources.stoneMargin));
            var py = gameResources.stoneMargin + (Math.floor(i / gameResources.stoneMaxCol) * (stoneHeight + gameResources.stoneMargin));
            gameResources.stoneX[i] = px;
            gameResources.stoneY[i] = py;

            gameResources.stoneWidth[i] = stoneWidth;
            gameResources.stoneHeight[i] = stoneHeight;
        }

        for(var i = 0; i < gameResources.maxImageCount; i++) {
            //style = "position: absolute; left: 200px;"
            var stoneId0 = $("#" + gameResources.stoneId0[i]);
            var stoneId1 = $("#" + gameResources.stoneId1[i]);
            var stoneId2 = $("#" + gameResources.stoneId2[i]);
            var stoneId3 = $("#" + gameResources.stoneId3[i]);
            var stoneId4 = $("#" + gameResources.stoneId4[i]);
            var stoneId5 = $("#" + gameResources.stoneId5[i]);
            stoneId0.css({position:'absolute', left: gameResources.stoneX[i], top: gameResources.stoneY[i]});
            stoneId1.css({position:'absolute', left: gameResources.stoneX[i], top: gameResources.stoneY[i]});
            stoneId2.css({position:'absolute', left: gameResources.stoneX[i], top: gameResources.stoneY[i]});
            stoneId3.css({position:'absolute', left: gameResources.stoneX[i], top: gameResources.stoneY[i]});
            stoneId4.css({position:'absolute', left: gameResources.stoneX[i], top: gameResources.stoneY[i]});
            stoneId5.css({position:'absolute', left: gameResources.stoneX[i], top: gameResources.stoneY[i]});
            stoneId0.css({height: gameResources.stoneHeight[i], width: gameResources.stoneWidth[i]});
            stoneId1.css({height: gameResources.stoneHeight[i], width: gameResources.stoneWidth[i]});
            stoneId2.css({height: gameResources.stoneHeight[i], width: gameResources.stoneWidth[i]});
            stoneId3.css({height: gameResources.stoneHeight[i], width: gameResources.stoneWidth[i]});
            stoneId4.css({height: gameResources.stoneHeight[i], width: gameResources.stoneWidth[i]});
            stoneId5.css({height: gameResources.stoneHeight[i], width: gameResources.stoneWidth[i]});
        }

        var widthFactor = window.innerWidth / window.innerHeight;
        var heightFactor = window.innerHeight / window.innerWidth;

        var totWidth = window.innerWidth;
        var totHeight = window.innerHeight;
        var leftWidth = (totWidth - $("#central-rectangle-id").width()) / 2;
        var topHeight = (totHeight - $("#central-rectangle-id").height()) / 2;

        /*
        $(".v-wrap-ex").css("width", "" + gameResources.areaGameWidth + "px");
        $(".v-wrap-ex").css("height", "" + window.innerHeight + "px");
        $(".v-wrap-ex").css("left", "" + leftWidth + "px");
        $(".v-wrap-ex").css("top", "" + 0 + "px");
        //$(".v-wrap").css("top", "" + topHeight + "px");
        //$(".v-box").css("height", "50" + "px");
        */
      }

    $(window).resize(resize);

    resize();

    function doAnimation5(index, stoneId0, stoneId1, stoneId2, stoneId3, stoneId4, stoneId5) {
        var imgVis0 = $(".pair-flip-image#" + stoneId0).css("visibility");
        var imgVis1 = $(".pair-flip-image#" + stoneId1).css("visibility");
        var imgVis2 = $(".pair-flip-image#" + stoneId2).css("visibility");
        var imgVis3 = $(".pair-flip-image#" + stoneId3).css("visibility");
        var imgVis4 = $(".pair-flip-image#" + stoneId4).css("visibility");
        var imgVis5 = $(".pair-flip-image#" + stoneId5).css("visibility");

        var visActive = undefined;
        var visNext = undefined;
        if (imgVis0 === "visible") {
            visActive = "#" + stoneId0;
            visNext = "#" + stoneId1;
        } else if (imgVis1 === "visible") {
            visActive = "#" + stoneId1;
            visNext = "#" + stoneId2;
        } else if (imgVis2 === "visible") {
            visActive = "#" + stoneId2;
            visNext = "#" + stoneId3;
        } else if (imgVis3 === "visible") {
            visActive = "#" + stoneId3;
            visNext = "#" + stoneId4;
        } else if (imgVis4 === "visible") {
            visActive = "#" + stoneId4;
            visNext = "#" + stoneId5;
        } else {
            visActive = "#" + stoneId5;
            visNext = "#" + stoneId0;
        }

        var iw = gameResources.stoneWidth[index];
        var iw2 = (iw - 2) / 2;
        var pleftmid = gameResources.stoneX[index] + iw2;

        $(visActive).animate({ left: "+=" + iw2 + "px", width: "2px" },
            {
                queue: true,
                duration: 300,
                start: function () { },
                progress: function(animation, progress) { },
                complete: function() {
                    $(visActive).css("visibility", "hidden");
                    $(visNext).css("left", "" + pleftmid + "px");
                    $(visNext).css("width", "2px");
                    $(visNext).css("visibility", "visible");
                    $(visNext).animate({ left: "-=" + iw2 + "px", width: "" + iw + "px" },
                        {
                            queue: true,
                            duration: 300,
                            start: function () { },
                            progress: function(animation, progress) { },
                            complete: function() {}
                        });
                }
            });
    }

    $('.pair-flip-image').click(function(event) {
        console.log("$('.pair-flip-image').click(...), class: " + this.className + ", id: " +this.id);

        var stoneId0 = "";
        var stoneId1 = "";
        var stoneId2 = "";
        var stoneId3 = "";
        var stoneId4 = "";
        var stoneId5 = "";
        var index = -1;
        for(var i = 0; i < gameResources.maxImageCount; i++) {
            if (this.id === gameResources.stoneId0[i] || this.id === gameResources.stoneId1[i]
                || this.id === gameResources.stoneId2[i] || this.id === gameResources.stoneId3[i]
                || this.id === gameResources.stoneId4[i] || this.id === gameResources.stoneId5[i]) {
                stoneId0 = gameResources.stoneId0[i];
                stoneId1 = gameResources.stoneId1[i];
                stoneId2 = gameResources.stoneId2[i];
                stoneId3 = gameResources.stoneId3[i];
                stoneId4 = gameResources.stoneId4[i];
                stoneId5 = gameResources.stoneId5[i];
                index = i;
                break;
            }
        }

        if (index >= 0) {
            doAnimation5(index, stoneId0, stoneId1, stoneId2, stoneId3, stoneId4, stoneId5);
        } else {
            console.log("$('.pair-flip-image').click(...), class: " + this.className + ", id: " +this.id + " index: " +index);
        }
    });





    function doImageSwitch(column, row, imageindex) {
        console.log("doImageSwitch(...) called. column: "+ column + ", row: " + row +", imageindex; " +imageindex);

        var index = (row * gameResources.stoneMaxCol) + column;
        if (index >= gameResources.maxImageCount || imageindex < 0 || imageindex >= 6) {
            alert("some variable out of range! column: " + column + ", row: " + row + " imageindex: " + imageindex);
            return;
        }

        var stoneId0 = gameResources.stoneId0[index];
        var stoneId1 = gameResources.stoneId1[index];
        var stoneId2 = gameResources.stoneId2[index];
        var stoneId3 = gameResources.stoneId3[index];
        var stoneId4 = gameResources.stoneId4[index];
        var stoneId5 = gameResources.stoneId5[index];

        var stoneIdVisible;
        switch(imageindex){
            case 0: stoneIdVisible = gameResources.stoneId0[index]; break;
            case 1: stoneIdVisible = gameResources.stoneId1[index]; break;
            case 2: stoneIdVisible = gameResources.stoneId2[index]; break;
            case 3: stoneIdVisible = gameResources.stoneId3[index]; break;
            case 4: stoneIdVisible = gameResources.stoneId4[index]; break;
            default: stoneIdVisible = gameResources.stoneId5[index]; break;
        }

        $("#" + stoneId0).css("visibility", "hidden");
        $("#" + stoneId1).css("visibility", "hidden");
        $("#" + stoneId2).css("visibility", "hidden");
        $("#" + stoneId3).css("visibility", "hidden");
        $("#" + stoneId4).css("visibility", "hidden");
        $("#" + stoneId5).css("visibility", "hidden");

        var iw = gameResources.stoneWidth[index];
        var ix = gameResources.stoneX[index];
        $("#" + stoneIdVisible).css("left", "" + ix + "px");
        $("#" + stoneIdVisible).css("width", "" +iw + "px");
        $("#" + stoneIdVisible).css("visibility", "visible");
    }

    $("#button-0").click(function () { doImageSwitch(1,2, 0); });
    $("#button-1").click(function () { doImageSwitch(1,2, 1); });
    $("#button-2").click(function () { doImageSwitch(1,2, 2); });
    $("#button-3").click(function () { doImageSwitch(1,2, 3); });
    $("#button-4").click(function () { doImageSwitch(1,2, 4); });
    $("#button-5").click(function () { doImageSwitch(1,2, 5); });

});

