/*
 * Reversi
 * Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich
 */

"use strict";

var online = (function() {

    // variables for online-mode
    var socket;
    var user;
    var connection = false;
    var laststart;
    var lastquit;
    var lastround = null;
    var countround = 0;

    // function to establish a connection to the server and to request an online game
    var online_connect = function () {
        if(!connection) {
            socket = io.connect('http://localhost:3000');
            //socket = io.connect('http://reversi.nodeserver.com:80');
            connection = true;
        } else {
            socket.socket.reconnect();
        }

        // event when you are successfully connected to the server
        socket.on('connect', function (data) {
            alert("you are now connected to the server");
            user = data;
        });

        // event when the server tells you that you can start a online game
        socket.on('startgame', function (data) {
            alert("online game beginning");
            user = data;
            if (user.id != laststart) {
                // send player metadata to opponent
                socket.emit('usersend', {
                    to: user.opponent,
                    name: "your_name",
                    pic: null
                });
                laststart = user.id;
                if (user.role == 0) {
                    // player starts game
                    alert("it's your turn");
                    // test
                    online_play(1, 2);
                    game_play(1, 2);
                    // test
                } else {
                    // opponent starts game
                    alert("waiting for opponent to  start the game");
                }
            }
        });

        // event when the server tells you, where your opponent played
        socket.on('playget', function (data) {
            if (countround == data.round && lastround != data.round) {
                lastround = data.round;
                game_play(data.row, data.col);
                alert("your online opponent played in row " + data.row);
                // test
                online_quit();
                // test
            }
        });

        // event when the server sends you metadata of your opponent
        socket.on('userget', function (data) {
            if (user.role == 0) {
                alert("Player 2 has the name" + data.name);
            } else {
                alert("Player 1 has the name" + data.name);
            }
        });

        // event when your opponent has left the game
        socket.on('quit', function () {
            if (user.id != lastquit) {
                lastquit = user.id;
                alert("your opponent has left the game");
            }
        });
    };


    // function to end an online game
    var online_quit = function () {
        socket.disconnect();
    };

    // function to send a played move to your opponent
    var online_play = function (zeilenr, spaltenr) {
        socket.emit('playsend', {to: user.opponent, row: zeilenr, col: spaltenr, round: countround});
    };

    function game_play(zeilenr, spaltenr) {
        alert("now playing in row " + zeilenr + " col " + spaltenr);
    }

    return {
        connect : online_connect,
        quit : online_quit,
        play : online_play
    }

}());
