import { expect, it } from "@jest/globals";
import { runRobot, Commands, Directions, switchDirection, move } from ".";


describe('Move Robot', () => {

    it('runRobot', () => {
        const grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [2, 0, 0, 0],
            [0, 3, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 9, 0, 0],
            [0, 0, 0, 4],
            [0, 0, 1, 0],
        ];
        const start = [0, 0];
        const moves = 'RMMLMRMMMMM';
        expect(runRobot(grid, start, moves)).toBe(14);

        let moves2 = moves.substring(0, 3);
        expect(runRobot(grid, start, moves2)).toBe(2);
    })

    it('switchDirection with Right Command', () => {
        expect(switchDirection(Directions.RIGHT, Commands.RIGHT)).toBe(Directions.DOWN);
        expect(switchDirection(Directions.UP, Commands.RIGHT)).toBe(Directions.RIGHT);
        expect(switchDirection(Directions.LEFT, Commands.RIGHT)).toBe(Directions.UP);
        expect(switchDirection(Directions.DOWN, Commands.RIGHT)).toBe(Directions.LEFT);
    });

    it('switchDirection with Left Command', () => {
        expect(switchDirection(Directions.RIGHT, Commands.LEFT)).toBe(Directions.UP);
        expect(switchDirection(Directions.UP, Commands.LEFT)).toBe(Directions.LEFT);
        expect(switchDirection(Directions.LEFT, Commands.LEFT)).toBe(Directions.DOWN);
        expect(switchDirection(Directions.DOWN, Commands.DOWN)).toBe(Directions.RIGHT);
    });

    it('switchDirection with Move Command', () => {
        expect(switchDirection(Directions.RIGHT, Commands.MOVE)).toBe(Directions.RIGHT);
        expect(switchDirection(Directions.UP, Commands.MOVE)).toBe(Directions.UP);
        expect(switchDirection(Directions.LEFT, Commands.MOVE)).toBe(Directions.LEFT);
        expect(switchDirection(Directions.DOWN, Commands.MOVE)).toBe(Directions.DOWN);
    });

    const x = Math.random();
    const y = Math.random();

    it('move', () => {
        expect(move([x, y], Directions.RIGHT)).toEqual([x, y + 1]);
        expect(move([x, y], Directions.LEFT)).toEqual([x, y - 1]);
        expect(move([x, y], Directions.UP)).toEqual([x - 1, y]);
        expect(move([x, y], Directions.DOWN)).toEqual([x + 1, y]);
    });

    it('move throws exception', () => {
        expect(() => {
            move([x, y], 'UNSUPPORTED')
        }).toThrow('Unsupported Direction');
    })
});