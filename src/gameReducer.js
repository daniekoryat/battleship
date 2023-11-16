import createPlayer from "./factories/Player"; 
import GameBoard from "./factories/GameBoard";
import { initialComputersBoard } from "./utils/helpers";


export const initialState  = {
        playerBoard: [],
        computerBoard: [],  
}

export default function gameReducer(state, action) {
    const { type, payload } = action;

    switch (type) {

        case 'INITIALIZE_GAME':
            return {
                
            }

            
        case 'PLACE_SHIP':
            const { ship, x, y, orientation } = payload;

            return {
                ...state,
                ...payload
            }
        case 'MAKE_ATTACK':
            console.log(payload)
            return {             
            }
        default:
            throw new Error("Unhandled action type: " + type);
        
    }
}