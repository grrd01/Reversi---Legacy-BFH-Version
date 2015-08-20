
var mainViewWidthMinFactor = 1.30;
var mainViewHeightMinFactor = 0;


var portrait = true;
var mainViewWidth = 0;
var mainViewHeight = 0;

function resize() {
    console.log("<div>Handler for .resize() called.</div>" );

    var widthFactor = window.innerWidth / window.innerHeight;
    var heightFactor = window.innerHeight / window.innerWidth;

    if (window.innerWidth > window.innerHeight && widthFactor >= mainViewWidthMinFactor) {
        portrait = false;
        mainViewHeight = window.innerHeight * 0.99;
        mainViewWidth = mainViewHeight;
    } else if (window.innerWidth > window.innerHeight || (window.innerWidth > (window.innerHeight * 0.75))) {
        portrait = true;
        mainViewHeight = window.innerHeight * 0.75;
        mainViewWidth = mainViewHeight;
    } else {
        portrait = true;
        mainViewWidth = window.innerWidth * 0.99;
        mainViewHeight = mainViewWidth;
    }

    //number.toFixed(2) + '';
    var txt = "win: " + mainViewWidth.toFixed(2) + "x" + mainViewHeight.toFixed(2) + "  portrait:" + portrait;
    txt += " | fx: " + widthFactor.toFixed(2)+ " fy: " + heightFactor.toFixed(2);
    $(".main-label").text(txt);

    if (portrait == false) {
        $(".main-view").width(mainViewWidth);
        $(".main-view").height(mainViewHeight);

        var leftWidth = ((window.innerWidth - mainViewWidth) / 2) - 5;
        $(".main-view-left").width(leftWidth);
        $(".main-view-left").height(mainViewHeight);
        $(".main-view-left").css('left', 2);
        $(".main-view-left").css('top', 2);

        var rightWidth = ((window.innerWidth - mainViewWidth) / 2) - 5;
        $(".main-view-right").width(rightWidth);
        $(".main-view-right").height(mainViewHeight);
        $(".main-view-right").css('right', 2);
        $(".main-view-right").css('top', 2);
    } else {



        $(".main-view").width(mainViewWidth);
        $(".main-view").height(mainViewHeight);

        var leftRightTop = mainViewHeight + 4;
        var leftRightHeight = ((window.innerHeight - mainViewHeight) - 8);
        var leftWidth = 2;
        $(".main-view-left").width((window.innerWidth - 4) /2);
        $(".main-view-left").height(leftRightHeight);
        $(".main-view-left").css('left', 2);
        $(".main-view-left").css('top', leftRightTop);

        var rightWidth = 2;
        $(".main-view-right").width((window.innerWidth - 4) /2);
        $(".main-view-right").height(leftRightHeight);
        $(".main-view-right").css('right', rightWidth);
        $(".main-view-right").css('top', leftRightTop);
    }
}


$(document).ready(function() {

    console.log( "ready!" );

    $(window).resize(resize);


    resize();
});




