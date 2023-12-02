// Ensure you're importing React if you're using JSX
import React from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../../actions/gameActions";
import "./gameEndPage.css";

export default function GameEndPage({ winner }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <h1>The winner is {winner}!</h1>
        <h2>Thanks for playing</h2>
        <button
          className="end-game-button"
          onClick={() => dispatch(resetGame())}
        >
          Play Again
        </button>
        <br/>
        <button className="end-game-button" onClick={() => window.close()}>
          Close Tab
        </button>
      </div>
    </>
  );
}
