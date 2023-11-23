import React from "react";
import { useState } from "react";

const BoardCell = ({ isContainShip, isAttacked, isYellow }) => {
  let isSucsessfulAttack = isContainShip && isAttacked;
  let isMissedAttack = isContainShip && !isAttacked;
  let color;
  switch (true) {
    case isSucsessfulAttack:
      color = "red";
      break;
    case isContainShip:
      color = "black";
      break;
    case isMissedAttack:
      color = "red";
      break;
    case isYellow:
      color = "yellow";
      break;
    default:
      color = "#1E90FF";
  }

  return <div className="boardcell" style={{ backgroundColor: color }}></div>;
};

export default BoardCell;
