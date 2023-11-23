import list from "../../utils/shipList";
import BoardCell from "../board/boardCell";

export default function gamestartShips({shipList}) {
  const handleDragStart = (e, ship) => {
    // Store the ship data and the relative position in the dataTransfer object
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        ship
      })
    );
  };

  // Iterate over the list
  const rows = shipList.map((ship, i) => (
    <div key={i} className="ship-row">
      <table draggable onDragStart={(e) => handleDragStart(e, ship)}>
        <tbody>
          {[...Array(ship.length)].map((_, j) => (
            <tr key={j}>
              <td>
                <BoardCell isContainShip={true} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ));
  // Return a row with the divs
  return rows;
}

