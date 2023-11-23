import { START_GAME,PLACE_SHIP } from "./actionTypes";


export const startGame = () => ({
    type: START_GAME,
});


export const placeShip = (shipData, rowIndex, cellIndex, direction = "vertical") => ({
    type: PLACE_SHIP,
    shipData,
    rowIndex,
    cellIndex,
    direction
});

    


