import GameContext from "../../gameContext"
import { useContext } from "react"


export default function gameStartPage() {
    const {gameData, setGameData} = useContext(GameContext)

    const handleClick = () => {
        setGameData({
            ...gameData,
            isGameStarted: true,
        })
    }

    return (
        <>
            <h1>game is not started</h1>
            <button onClick={handleClick}>start game</button>
        </>
    )
    
}