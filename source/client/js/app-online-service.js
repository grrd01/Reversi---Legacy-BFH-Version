/*
 * Reversi
 * Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich
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
            self.userData = { name: "", password: "", password2: ""};
            self.onlineState = "none";
            self.onlineStartPlayer = false;
            self.onlineStartOpponent = false;
            self.socket;
            self.lastStart;
            self.lastQuit;
            self.lastRound = null;
            self.countRound = 0;

            // function to establish a connection to the server and to request an online game
            self.connect = function () {
                self.socket = io.connect('http://localhost:3000', {'forceNew': true});
                //self.socket = io.connect('http://reversi-grrd.rhcloud.com:8000', {'forceNew': true});
                self.socket.heartbeatTimeout = 20000; // milli

                // event when you are successfully connected to the server
                self.socket.on('connected', function (data) {
                    self.user = data;
                    console.info("successfully connected to the server");
                });

                // event when signin was successfull
                self.socket.on('signInOk', function () {
                    console.info("you successfully signed in");
                    self.startPlay();
                });

                // event when signin refused with wrong password
                self.socket.on('signInWrongPw', function () {
                    console.info("your password is not correct");
                    $rootScope.$broadcast('signInWrongPw');
                });

                // event when signin refused with unknown user name
                self.socket.on('signInUnknownUser', function () {
                    console.info("this username is not known");
                    $rootScope.$broadcast('signInUnknownUser');
                });

                // event when register was successfull
                self.socket.on('registerOk', function () {
                    console.info("you successfully registered");
                    self.startPlay();
                });

                // event when register refused because name is already used
                self.socket.on('registerNameOccupied', function () {
                    console.info("this username is no more available");
                    self.signIn(self.userData.name, self.userData.password);
                });

                // event when you have to wait for an opponent
                self.socket.on('wait', function () {
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
                            self.onlineStartPlayer = true;
                            console.info("it's your turn");
                            $rootScope.$broadcast('onlineStartPlayer');
                        } else {
                            // opponent starts game
                            self.onlineStartOpponent = true;
                            console.info("waiting for opponent to  start the game");
                            $rootScope.$broadcast('onlineStartOpponent');
                        }
                    }
                });

                // event when the server tells you, where your opponent played
                self.socket.on('play', function (data) {
                    self.countRound++;
                    if (self.countRound == data.round && self.lastRound != data.round) {
                        self.lastRound = data.round;
                        console.info("your online opponent played in row " + data.row);

                        $rootScope.$broadcast('play', { col: data.col, row: data.row} );

                        //test
                        //self.rankingUpdate("hans","wurst",1,25);
                        //self.ranking();
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
                        console.info("your opponent has left the game");
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
                self.userData.name = name;
                self.userData.password = password;
                self.socket.emit('signIn', {name: name, password: password});
            };

            // function to register in with a new username password
            self.register = function (name, password) {
                self.userData.name = name;
                self.userData.password = password;
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
                self.socket.emit('ranking');
            };

            // function to update ranking
            self.rankingUpdate = function (name, password, gamesWon, pointsWon) {
                self.socket.emit('rankingUpdate', {id: self.user.id, name: name, password: password, gamesWon: gamesWon, pointsWon: pointsWon});
            };

        };

        // Service Objekt erstellen.
        var appOnlineService = new AppOnlineService();

        // und zurückgeben
        return appOnlineService;
    }]);
})();
