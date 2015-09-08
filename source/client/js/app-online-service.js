/*
 * Reversi
 * Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers G�rard, Jenzer Ulrich
 */

"use strict";

// App Online Service

(function() {

    // get the application.
    var app = angular.module("ApplicationModule");

    // create the service
    app.factory('AppOnlineService', ['$rootScope', function ($rootScope) {
        var AppOnlineService = function () {
            var self = this;
            self.onlineState = "none";
            self.onlineStartPlayer = false;
            self.onlineStartOpponent = false;
            // variables for online-mode
            self.socket;
            self.user;
            self.connection = false;
            self.laststart;
            self.lastquit;
            self.lastround = null;
            self.countround = 0;

            // function to establish a connection to the server and to request an online game
            self.connect = function () {
                if (!self.connection) {
                    //self.socket = io.connect('http://localhost:3000');
                    self.socket = io.connect('http://reversi-grrd.rhcloud.com:8000');
                    self.connection = true;
                } else {
                    self.socket.reconnect();
                }

                // event when you are successfully connected to the server
                self.socket.on('connect', function (data) {
                    self.onlineState = "connect";
                    self.user = data;
                });

                // event when the server tells you that you can start a online game
                self.socket.on('startgame', function (data) {
                    self.onlineState = "startgame";
                    //alert("online game beginning");
                    console.log("online game beginning");
                    $rootScope.$broadcast('online-game-beginning');
                    self.user = data;
                    if (self.user.id != self.laststart) {
                        // send player metadata to opponent
                        self.socket.emit('usersend', {
                            to: self.user.opponent,
                            name: "your_name",
                            pic: null
                        });
                        self.laststart = self.user.id;
                        if (self.user.role == 0) {
                            // player starts game
                            //alert("it's your turn");
                            self.onlineStartPlayer = true;
                            console.log("it's your turn");
                            // test
                            self.online_play(1, 2);
                            self.game_play(1, 2);
                            // test
                        } else {
                            // opponent starts game
                            //alert("waiting for opponent to  start the game");
                            self.onlineStartOpponent = true;
                            console.log("waiting for opponent to  start the game");
                        }
                    }
                });

                // event when the server tells you, where your opponent played
                self.socket.on('playget', function (data) {
                    if (self.countround == data.round && self.lastround != data.round) {
                        self.lastround = data.round;
                        self.game_play(data.row, data.col);
                        //alert("your online opponent played in row " + data.row);
                        console.log("your online opponent played in row " + data.row);
                        // test
                        // uje self.online_quit();
                        // test
                    }
                });

                // event when the server sends you metadata of your opponent
                self.socket.on('userget', function (data) {
                    if (self.user.role == 0) {
                        //alert("Player 2 has the name" + data.name);
                        console.log("Player 2 has the name" + data.name);
                    } else {
                        //alert("Player 1 has the name" + data.name);
                        console.log("Player 1 has the name" + data.name);
                    }
                });

                // event when your opponent has left the game
                self.socket.on('quit', function () {
                    if (self.user.id != self.lastquit) {
                        self.lastquit = self.user.id;
                        self.onlineState = "none";
                        self.onlineStartPlayer = false;
                        self.onlineStartOpponent = false;
                        alert("your opponent has left the game");
                    }
                });
            };


            // function to end an online game
            self.online_quit = function () {
                self.socket.disconnect();
            };

            // function to send a played move to your opponent
            self.online_play = function (zeilenr, spaltenr) {
                self.socket.emit('playsend', {to: self.user.opponent, row: zeilenr, col: spaltenr, round: self.countround});
            };

            self.game_play = function (zeilenr, spaltenr)
            {
                console.log("now playing in row " + zeilenr + " col " + spaltenr);
                //alert("now playing in row " + zeilenr + " col " + spaltenr);
            }
        }

        // Service Objekt erstellen.
        var appOnlineService = new AppOnlineService();

        // und zur�ckgeben
        return appOnlineService;
    }]);
})();
