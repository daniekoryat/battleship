import {createContext,useReducer} from "react";
import gameReducer, {initialState} from "./gameReducer";

//export const GameContext = createContext(initialState)
export default gameProvider = ({children}) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const initializeGame = () => {
        

        dispatch({type: 'INITIALIZE_GAME'})
    }


    return (
        <GameContext.Provider >
            {children}
        </GameContext.Provider>
    )
}