import React, { createContext,useState } from 'react';



// Create the context
 const gameContext = createContext({});

// Create the provider
export const GameContextProvider = ({ children }) => {
    const [gameData, setGameData] = useState({});
    
    return (
        <gameContext.Provider value={{gameData,setGameData}}>
            {children}
        </gameContext.Provider>
    );
};

// Export the context
export default gameContext;
