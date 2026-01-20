import React from "react";
import "./GameLog.css";

const GameLog = ({ playerName, action }) => {
  return (
    <div className="log-entry">
      <span className="log-player">{playerName}</span> {action}
    </div>
  );
};

export default GameLog;
