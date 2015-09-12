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
            self.lastStart;
            self.lastQuit;
            self.lastRound = null;
            self.countRound = 0;

            // function to establish a connection to the server and to request an online game
            self.connect = function () {
                self.socket = io.connect('http://localhost:3000', {'forceNew': true});
                //self.socket = io.connect('http://reversi-grrd.rhcloud.com:8000', {'forceNew': true});

                // event when you are successfully connected to the server
                self.socket.on('connected', function (data) {
                    self.user = data;
                    console.info("successfully connected to the server");
                    //test
                    self.register("hans","wurst");
                    //test
                });

                // event when signin was successfull
                self.socket.on('signInOk', function (data) {
                    console.info("you successfully signed in");
                    //test
                    self.startPlay();
                    //test
                });

                // event when signin refused with wrong password
                self.socket.on('signInWrongPw', function (data) {
                    console.info("your password is not correct");
                    //test
                    self.signIn("wurst","brot");
                    //test
                });

                // event when signin refused with unknown user name
                self.socket.on('signInUnknownUser', function (data) {
                    console.info("this username is not known");
                    //test
                    self.signIn("hans","wurst");
                    //test
                });

                // event when register was successfull
                self.socket.on('registerOk', function (data) {
                    console.info("you successfully registered");
                    //test
                    self.startPlay();
                    //test
                });

                // event when register refused because name is already used
                self.socket.on('registerNameOccupied', function (data) {
                    console.info("this username is no more available");
                    //test
                    self.signIn("hans","brot");
                    //test
                });

                // event when you have to wait for an opponent
                self.socket.on('wait', function (data) {
                    console.info("waiting for opponent");
                    self.onlineState = "connect";
                });

                // event when the server tells you that you can start a online game
                self.socket.on('startPlay', function (data) {
                    self.user = data;
                    self.onlineState = "startPlay";
                    self.countRound = 0;
                    self.lastQuit = null;
                    console.info("online game beginning");
                    $rootScope.$broadcast('online-game-beginning');
                    if (self.user.id != self.lastStart) {
                        // send player metadata to opponent
                        self.socket.emit('userData', {
                            to: self.user.opponent,
                            name: "your_name",
                            pic: null
                        });
                        self.lastStart = self.user.id;
                        if (self.user.role == 0) {
                            // player starts game
                            console.info("it's your turn");
                            self.onlineStartPlayer = true;
                            //test
                            self.play(1,2);
                            //test
                        } else {
                            // opponent starts game
                            self.onlineStartOpponent = true;
                            console.info("waiting for opponent to  start the game");
                        }
                    }
                });

                // event when the server tells you, where your opponent played
                self.socket.on('play', function (data) {
                    self.countRound++;
                    if (self.countRound == data.round && self.lastRound != data.round) {
                        self.lastRound = data.round;
                        console.info("your online opponent played in row " + data.row);
                        //test
                        self.rankingUpdate("hans","wurst",1,25);
                        self.ranking();
                        //test
                    }
                });

                // event when the server sends you metadata of your opponent
                self.socket.on('userData', function (data) {
                    if (self.user.role == 0) {
                        console.info("Player 2 has the name" + data.name);
                    } else {
                        console.info("Player 1 has the name" + data.name);
                    }
                });

                // event when your opponent has left the game
                self.socket.on('stopPlay', function () {
                    if (self.user.id != self.lastQuit) {
                        self.lastQuit = self.user.id;
                        self.onlineState = "none";
                        self.onlineStartPlayer = false;
                        self.onlineStartOpponent = false;
                        alert("your opponent has left the game");
                    }
                });

                // event when you receive the current ranking from the server
                self.socket.on('ranking', function (data) {
                    console.info("received current ranking" + data[0].name + data[0].pointsWon);
                    //test
                    self.stopPlay();
                    //test
                });
            };

            // function to sign in with a existing username password
            self.signIn = function (name, password) {
                self.socket.emit('signIn', {name: name, password: password});
            };

            // function to register in with a new username password
            self.register = function (name, password) {
                self.socket.emit('register', {name: name, password: password});
            };

            // function to request a new game
            self.startPlay = function () {
                self.socket.emit('startPlay');
            };

            // function to send a played move to your opponent
            self.play = function (row, col) {
                self.countRound++;
                self.socket.emit('play', {to: self.user.opponent, row: row, col: col, round: self.countRound});
            };

            // function to end an online game, the connection will remain open
            self.stopPlay = function () {
                self.socket.emit('stopPlay');
            };

            // function to get ranking
            self.ranking = function () {
                self.socket.emit('ranking', {name: name});
            };

            // function to update ranking
            self.rankingUpdate = function (name, password, gamesWon, pointsWon) {
                self.socket.emit('rankingUpdate', {id: self.user.id, name: name, password: password, gamesWon: gamesWon, pointsWon: pointsWon});
            };

        }

        // Service Objekt erstellen.
        var appOnlineService = new AppOnlineService();

        // und zur�ckgeben
        return appOnlineService;
    }]);
})();
