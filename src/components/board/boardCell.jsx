import React from "react";

const BoardCell = ({
  isContainShip,
  isAttacked,
  hoverColor,
  isPlayerBord,
  isGameStart,
}) => {
  let isSucsessfulAttack = isContainShip && isAttacked;
  let isMissedAttack = isContainShip && !isAttacked;

  const style = {
    backgroundColor: getColor(
      isContainShip,
      isSucsessfulAttack,
      isMissedAttack,
      hoverColor
    ),
    cursor: !isGameStart && isPlayerBord ? "default" : "crosshair",
  };

  return <div className="boardcell" style={style}></div>;
};

function getColor(
  isContainShip,
  isSuccessfulAttack,
  isMissedAttack,
  hoverColor
) {
  if (isContainShip) {
    return "black";
  } else if (isSuccessfulAttack) {
    return "red";
  } else if (isMissedAttack) {
    return "green";
  } else if (hoverColor) {
    return hoverColor;
  } else {
    return "#1E90FF";
  }
}

export default BoardCell;
