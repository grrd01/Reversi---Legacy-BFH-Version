# Reversi
a HTML5 Reversi webapp created for the CAS at Berner Fachhochschule

Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich


Spiel starten mit externem Server (Openshift)
=============================================

Wenn der Server auf Openshift verwendet wird, so im File "Reversi/sources/clinet/js/app-online-service.js" ca. Zeile 33+34

   //self.socket = io.connect('http://localhost:3000', {'forceNew': true});
   self.socket = io.connect('http://reversi-grrd.rhcloud.com:8000', {'forceNew': true});

so aus und einkommentieren. Danach einfach HTML File "Reversi/sources/clinet/reversi-game-src.html" starten.



Spiel starten mit lokalem Server
================================

Wenn der lokale Server verwendet wird, so im File "Reversi/sources/clinet/js/app-online-service.js" ca. Zeile 33+34

   self.socket = io.connect('http://localhost:3000', {'forceNew': true});
   //self.socket = io.connect('http://reversi-grrd.rhcloud.com:8000', {'forceNew': true});

so aus und einkommentieren. Nun im Verzeichnis "Reversi/sources/server/" die Datei server.js mit node.js starten.
Danach einfach HTML File "Reversi/sources/clinet/reversi-game-src.html" starten.

