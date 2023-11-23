import { useSelector } from "react-redux";
import BoardContainer from "../board/boardContainer";

export default function MainGamePage() {
  const playerBoard = useSelector((state) => state.game.player.board);
  const computerBoard = useSelector((state) => state.game.computer.board);

  return (
    <>
      <div className="main-game-container">
        <BoardContainer board={playerBoard} />
        <BoardContainer board={computerBoard} />
      </div>
    </>
  );
}
