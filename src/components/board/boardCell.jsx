import React from 'react';
import '../../styles/boardCell.css';

const BoardCell = ({ isMarked, isContainShip, isMissedAttack }) => {
  let className = 'board-cell';

  if (isMarked && isContainShip) {
    className += ' marked-ship';
  } else if (isMarked && isMissedAttack) {
    className += ' marked-missed-attack';
  }

  return <div className={className}></div>;
};

export default BoardCell;
