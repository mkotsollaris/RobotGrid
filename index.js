const Directions = {
    LEFT: 'l',
    RIGHT: 'r',
    UP: 'u',
    DOWN: 'd'
}

const Commands = {
    LEFT: 'l',
    RIGHT: 'r',
    MOVE: 'm'
}

const directionArray = [Directions.RIGHT, Directions.DOWN, Directions.LEFT, Directions.UP];

const switchDirection = (currDirection, command) => {
    if (command === Commands.MOVE) {
        return currDirection
    }

    const currDirectionIndex = directionArray.indexOf(currDirection);
    if (command === Commands.RIGHT) {
        return directionArray[(currDirectionIndex + 1) % 4];
    }
    return directionArray[((currDirectionIndex - 1) + 4) % 4];
}

const move = (currPos, currDirection) => {
    if (currDirection === Directions.RIGHT) {
        return [currPos[0], currPos[1] + 1];
    }
    if (currDirection === Directions.LEFT) {
        return [currPos[0], currPos[1] - 1];
    }
    if (currDirection === Directions.UP) {
        return [currPos[0] - 1, currPos[1]];
    }
    if (currDirection === Directions.DOWN) {
        return [currPos[0] + 1, currPos[1]];
    }
    throw new Error('Unsupported Direction')
}

const runRobot = (grid, start, input) => {
    let currPoints = 0;
    let currPos = start;
    let currDirection = Directions.RIGHT;
    [...input].forEach(c => {
        c = c.toLowerCase();
        currDirection = switchDirection(currDirection, c);
        if (c !== Commands.MOVE) {
            return;
        }

        currPos = move(currPos, currDirection);
        const currX = currPos[0];
        const currY = currPos[1];
        currPoints += grid[currX][currY];
    })
    return currPoints;
}

export { runRobot, switchDirection, Directions, Commands, move };