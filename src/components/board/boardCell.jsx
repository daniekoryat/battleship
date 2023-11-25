import React from "react";

const BoardCell = ({
  isContainShip,
  isAttacked,
  hoverColor,
  isPlayerBord,
  isGameStart,
}) => {

  const isSuccsesfullHit = isContainShip && isAttacked;
  const isMissedHit = !isContainShip && isAttacked;
  const style = {
    backgroundColor: getColor(isContainShip, isAttacked,hoverColor,isPlayerBord),
    cursor: !isGameStart && isPlayerBord ? "default" : "crosshair",
  };

  return <div className="boardcell" style={style}></div>;
};

function getColor(isSuccsesfullHit, isMissedHit, isContainShip, hoverColor, isPlayerBord) {
  if (isPlayerBord) {
    if (isSuccsesfullHit) {
      return "red";
    } 
    else if (isMissedHit) {
      return "white";
    } 
    else if (isContainShip) {
      return "black";
    }
    else {
      return "#1E90FF";
    }
  } 
  else {
    if (isSuccsesfullHit || isMissedHit) {
      return "red";
    } 
    else if (hoverColor) {
      return hoverColor;
    } 
    else {
      return "#1E90FF";
    }
  }
}

export default BoardCell;
