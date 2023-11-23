import { useContext, useEffect } from "react";
import Player from "./factories/Player.js";
import GameStartPage from "./components/pages/gameStartPage.js";
import MainGamePage from "./components/pages/mainGamePage.js";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./app/counterSlice.js";


function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
    <h1>{count}</h1>
    <button onClick={() => dispatch(increment())}>+</button>
    <button onClick={() => dispatch(decrement())}>-</button>
    <input type="number" id="amount"/>
    <button onClick={() => dispatch(incrementByAmount(Number(document.getElementById("amount").value)))}>Add Amount</button>

    </>
  );

}

export default App;

/*
src/
  actions/
    gameActions.js
  reducers/
    gameReducer.js
  components/
    Board.js
    Ship.js
    Square.js
  App.js
  store.js 
*/
