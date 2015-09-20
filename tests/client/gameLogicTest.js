describe("initEmptyBoard", function() {
    it("init empty board", function() {
        gameLogic.initEmptyBoard();

        gameLogic.getBoard().forEach(function(entry){
            expect(entry).toEqual([0,0,0,0,0,0,0,0]);})

    });
});

describe("setStartGame", function() {
    it("initialize default start board", function() {
        gameLogic.initEmptyBoard();
        gameLogic.setStartGame();

        expect(gameLogic.getBoard()[3][3]).toEqual(1);
        expect(gameLogic.getBoard()[4][4]).toEqual(1);
        expect(gameLogic.getBoard()[4][3]).toEqual(2);
        expect(gameLogic.getBoard()[3][4]).toEqual(2);

    });
});


describe("changeObjectStates without update", function() {

    beforeEach(function() {
        gameLogic.initEmptyBoard();
    });


    it("change the state of a field [0,0] to 1", function() {

        gameLogic.changeObjectState(0,0,1,false,false);

        expect(gameLogic.getBoard()[0][0]).toEqual(1);

    });

    it("change the state of a field [0,7] to 1", function() {

        gameLogic.changeObjectState(0,7,1,false,false);

        expect(gameLogic.getBoard()[0][7]).toEqual(1);

    });

    it("change the state of a field [7,0] to 1", function() {

        gameLogic.changeObjectState(7,0,1,false,false);

        expect(gameLogic.getBoard()[7][0]).toEqual(1);

    });

    it("change the state of a field [7,7] to 1", function() {

        gameLogic.changeObjectState(7,7,1,false,false);

        expect(gameLogic.getBoard()[7][7]).toEqual(1);

    });

    it("change the state of a field [3,3] to 1", function() {

        gameLogic.changeObjectState(3,2,1,false,false);

        expect(gameLogic.getBoard()[3][2]).toEqual(1);

    });

    it("change the state of a field [4,5] to 1", function() {

        gameLogic.changeObjectState(4,5,1,false,false);

        expect(gameLogic.getBoard()[4][5]).toEqual(1);

    });

    it("change the state of a field [6,7] to 1", function() {

        gameLogic.changeObjectState(6,7,1,false,false);

        expect(gameLogic.getBoard()[6][7]).toEqual(1);

    });

    it("change the state of a field [2,5] to 1", function() {

        gameLogic.changeObjectState(2,5,1,false,false);

        expect(gameLogic.getBoard()[2][5]).toEqual(1);

    });

    //change back
    it("change the state of a field [0,0] to 0", function() {

        gameLogic.changeObjectState(0,0,0,false,false);

        expect(gameLogic.getBoard()[0][0]).toEqual(0);

    });

    it("change the state of a field [0,7] to 0", function() {

        gameLogic.changeObjectState(0,7,0,false,false);

        expect(gameLogic.getBoard()[0][7]).toEqual(0);

    });

    it("change the state of a field [7,0] to 0", function() {

        gameLogic.changeObjectState(7,0,0,false,false);

        expect(gameLogic.getBoard()[7][0]).toEqual(0);

    });

    it("change the state of a field [7,7] to 0", function() {

        gameLogic.changeObjectState(7,7,0,false,false);

        expect(gameLogic.getBoard()[7][7]).toEqual(0);

    });

    it("change the state of a field [3,3] to 0", function() {

        gameLogic.changeObjectState(3,2,0,false,false);

        expect(gameLogic.getBoard()[3][2]).toEqual(0);

    });

    it("change the state of a field [4,5] to 0", function() {

        gameLogic.changeObjectState(4,5,0,false,false);

        expect(gameLogic.getBoard()[4][5]).toEqual(0);

    });

    it("change the state of a field [6,7] to 0", function() {

        gameLogic.changeObjectState(6,7,0,false,false);

        expect(gameLogic.getBoard()[6][7]).toEqual(0);

    });

    it("change the state of a field [2,5] to 0", function() {

        gameLogic.changeObjectState(2,5,0,false,false);

        expect(gameLogic.getBoard()[2][5]).toEqual(0);

    });

});

describe("Possible moves at startup, state = 1", function() {

    beforeEach(function() {
        gameLogic.initEmptyBoard();
        gameLogic.setStartGame();
    });


    it("position[4,2]", function() {

        expect(gameLogic.getPossibleMoves(1)).toEqual(
            jasmine.arrayContaining([[4,2]]));

    });

    it("position[5,3]", function() {

        expect(gameLogic.getPossibleMoves(1)).toEqual(
            jasmine.arrayContaining([[5,3]]));

    });
    it("position[2,4]", function() {

        expect(gameLogic.getPossibleMoves(1)).toEqual(
            jasmine.arrayContaining([[2,4]]));

    });
    it("position[3,5]", function() {

        expect(gameLogic.getPossibleMoves(1)).toEqual(
            jasmine.arrayContaining([[3,5]]));

    });



});

describe("Possible moves at startup,left top -> state = 2", function() {

    //beforeEach(function() {
    //    gameLogic.initEmptyBoard();
    //    gameLogic.setStartGame();
    //});
    gameLogic.initEmptyBoard();

    //it("possible moves startup state 2", function() {
    //
    //    expect(gameLogic.getPossibleMoves(2)).toEqual(
    //        jasmine.arrayContaining([[3,2],[2,3],[5,4],[4,5]]));
    //
    //});

    it("position[3,2]", function() {

        expect(gameLogic.getPossibleMoves(2)).toEqual(
            jasmine.arrayContaining([[3,2]]));

    });

    it("position[2,3]", function() {

        expect(gameLogic.getPossibleMoves(2)).toEqual(
            jasmine.arrayContaining([[2,3]]));

    });
    it("position[5,4]", function() {

        expect(gameLogic.getPossibleMoves(2)).toEqual(
            jasmine.arrayContaining([[5,4]]));

    });
    it("position[4,5]", function() {

        expect(gameLogic.getPossibleMoves(2)).toEqual(
            jasmine.arrayContaining([[4,5]]));

    });

});

describe("field is possible move, state = 2", function() {

    beforeEach(function() {
        gameLogic.initEmptyBoard();
    });

    //board situation 1
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0

    //position[5,5] possible (t)?
    it("-situation 1", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        expect(gameLogic.isPossibleMove(2,5,5)).toBeFalsy();
    });

    //board situation 2
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0

    //position[5,5] possible (t)?
    it("-situation 2", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        expect(gameLogic.isPossibleMove(2,5,5)).toBeFalsy();
    });


    //board situation 3
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 2 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 3", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,2,false,false);
        expect(gameLogic.isPossibleMove(2,5,5)).toBeTruthy();
    });

    //board situation 4
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 2 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 4", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,2,false,false);
        expect(gameLogic.isPossibleMove(2,5,5)).toBeTruthy();
    });

    //board situation 5
    // 0 0 0 0 0 0 0 0
    // 0 2 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 5", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(1,1,2,false,false);
        expect(gameLogic.isPossibleMove(2,5,5)).toBeFalsy();
    });

    //board situation 6
    // 0 0 0 0 0 0 0 0
    // 0 2 0 0 0 0 0 0
    // 0 0 1 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 6", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,1,false,false);
        gameLogic.changeObjectState(1,1,2,false,false);
        expect(gameLogic.isPossibleMove(2,5,5)).toBeTruthy();
    });

    //board situation 7
    // 0 0 0 0 0 0 0 0
    // 0 1 0 0 0 0 0 0
    // 0 0 1 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 7", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,1,false,false);
        gameLogic.changeObjectState(1,1,1,false,false);
        expect(gameLogic.isPossibleMove(2,5,5)).toBeFalsy();
    });

    //board situation 8
    // 1 0 0 0 0 0 0 0
    // 0 1 0 0 0 0 0 0
    // 0 0 1 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 8", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,1,false,false);
        gameLogic.changeObjectState(1,1,1,false,false);
        gameLogic.changeObjectState(0,0,1,false,false);
        expect(gameLogic.isPossibleMove(2,5,5)).toBeFalsy();
    });

    //board situation 9
    // 2 0 0 0 0 0 0 0
    // 0 1 0 0 0 0 0 0
    // 0 0 1 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 9", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,1,false,false);
        gameLogic.changeObjectState(1,1,1,false,false);
        gameLogic.changeObjectState(0,0,2,false,false);
        expect(gameLogic.isPossibleMove(2,5,5)).toBeTruthy();
    });



});

describe("update field state after change -> state = 2", function() {

    beforeEach(function() {
        gameLogic.initEmptyBoard();
    });

    //board situation 1
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0

    //position[5,5] possible (set t=2)?
    it("-situation 1", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        expect(gameLogic.updateStates(2,5,5).length).toEqual(0);
    });

    //board situation 2
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0

    //position[5,5] possible (t)?
    it("-situation 2", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        expect(gameLogic.updateStates(2,5,5).length).toEqual(0);
    });


    //board situation 3
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 2 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 3", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,2,false,false);
        expect(gameLogic.updateStates(2,5,5)).toEqual(
            jasmine.arrayContaining([[4,4]])
        );
    });

    //board situation 4
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 2 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 4", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,2,false,false);
        expect(gameLogic.updateStates(2,5,5)).toEqual(
            jasmine.arrayContaining([[4,4],[3,3]])
        );
    });

    //board situation 5
    // 0 0 0 0 0 0 0 0
    // 0 2 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 5", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(1,1,2,false,false);
        expect(gameLogic.updateStates(2,5,5).length).toEqual(0);
    });

    //board situation 6
    // 0 0 0 0 0 0 0 0
    // 0 2 0 0 0 0 0 0
    // 0 0 1 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 6", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,1,false,false);
        gameLogic.changeObjectState(1,1,2,false,false);
        expect(gameLogic.updateStates(2,5,5)).toEqual(
            jasmine.arrayContaining([[4,4],[3,3],[2,2]])
        );
    });

    //board situation 7
    // 0 0 0 0 0 0 0 0
    // 0 1 0 0 0 0 0 0
    // 0 0 1 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 7", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,1,false,false);
        gameLogic.changeObjectState(1,1,1,false,false);
        expect(gameLogic.updateStates(2,5,5).length).toEqual(0);
    });

    //board situation 8
    // 1 0 0 0 0 0 0 0
    // 0 1 0 0 0 0 0 0
    // 0 0 1 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 8", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,1,false,false);
        gameLogic.changeObjectState(1,1,1,false,false);
        gameLogic.changeObjectState(0,0,1,false,false);
        expect(gameLogic.updateStates(2,5,5).length).toEqual(0);
    });

    //board situation 9
    // 2 0 0 0 0 0 0 0
    // 0 1 0 0 0 0 0 0
    // 0 0 1 0 0 0 0 0
    // 0 0 0 1 0 0 0 0
    // 0 0 0 0 1 0 0 0
    // 0 0 0 0 0 t 0 0
    // 0 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0 0


    //position[5,5] possible (t)?
    it("-situation 9", function() {
        gameLogic.changeObjectState(4,4,1,false,false);
        gameLogic.changeObjectState(3,3,1,false,false);
        gameLogic.changeObjectState(2,2,1,false,false);
        gameLogic.changeObjectState(1,1,1,false,false);
        gameLogic.changeObjectState(0,0,2,false,false);
        expect(gameLogic.updateStates(2,5,5)).toEqual(
            jasmine.arrayContaining([[4,4],[3,3],[2,2],[1,1]])
        );
    });



});

describe("moveFromComputerPlayer", function() {

    beforeEach(function() {
        gameLogic.initEmptyBoard();
        gameLogic.setStartGame();
    });


    it("ComputerPlayer 1, index auto move", function() {

        var possibleMoves=[[1,2], [2,3], [5,7], [8,9]];

        var randomIndex = gameLogic.getMoveByComputer(possibleMoves);

        expect(randomIndex).toBeGreaterThan(-1);
        expect(randomIndex).toBeLessThan(4);

    });

    it("ComputerPlayer 1, no moves", function() {

        var possibleMoves=[];

        var randomIndex = gameLogic.getMoveByComputer(possibleMoves);

        expect(randomIndex).toEqual(-1);

    });

    it("ComputerPlayer 1, moves not defined", function() {

        var possibleMoves;

        var randomIndex = gameLogic.getMoveByComputer(possibleMoves);

        expect(randomIndex).toEqual(-1);

    });



});

describe("getFigures player 1", function() {

    beforeEach(function() {
        gameLogic.initEmptyBoard();
        gameLogic.setStartGame();
    });


    it("all figures from player 1, startup", function() {

        expect(gameLogic.getFigures(1).length).toEqual(2);

    });

    it("all figures from player 2, startup", function() {

        expect(gameLogic.getFigures(2).length).toEqual(2);

    });

    it("all figures from player 1, 4 figures", function() {

        gameLogic.changeObjectState(0,0,1,false, false);
        gameLogic.changeObjectState(7,0,1,false, false);

        expect(gameLogic.getFigures(1).length).toEqual(4);

    });

    it("all figures from player 2, 5 figures", function() {

        gameLogic.changeObjectState(7,0,2,false, false);
        gameLogic.changeObjectState(6,6,2,false, false);
        gameLogic.changeObjectState(7,7,2,false, false);
        expect(gameLogic.getFigures(2).length).toEqual(5);

    });


});

describe("isGameOver", function() {

    beforeEach(function() {
        gameLogic.initEmptyBoard();
    });

    it("game over -> empty board", function() {
        expect(gameLogic.isGameOver()).toBeTruthy();
    });

    it("game over -> at game start", function() {
        gameLogic.setStartGame();
        expect(gameLogic.isGameOver()).toBeFalsy();
    });


});
