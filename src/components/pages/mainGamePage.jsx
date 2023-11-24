import { useSelector } from "react-redux";
import BoardContainer from "../board/boardContainer";

export default function MainGamePage() {
  const playerBoard = useSelector((state) => state.game.player.board);
  const computerBoard = useSelector((state) => state.game.computer.board);

  return (
    <>
    <h1 className="main-game-title">battle!</h1>
      <div className="main-game-container">
        <BoardContainer recivedBoard={playerBoard} />
        <BoardContainer recivedBoard={computerBoard} />
      </div>
    </>
  );
}
