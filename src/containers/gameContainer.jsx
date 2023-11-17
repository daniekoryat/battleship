import React, { useState,useEffect }from "react";
import createGameBoard from "../factories/GameBoard";
import Player from "../factories/Player";

export default function GameContainer() {
    const [player, setPlayer] = useState(new Player(false));
    const [computer, setComputer] = useState(new Player(true)); 
    
}