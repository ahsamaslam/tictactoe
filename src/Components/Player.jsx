import { useState } from "react";
export default function Player(props) {
  const [IsEditing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(props.name);
  function handleEditClick(event) {
    setEditing((editing) => !editing);
    if (IsEditing) {
      const input = event.target.parentElement.querySelector("input");
      if (input) {
        const newName = input.value.trim() || props.name;
        setPlayerName(newName);
        // Notify parent component of name change
        if (props.onNameChange) {
          props.onNameChange(props.symbol, newName);
        }
      }
    }
  }
  let content = <span className="PlayerX">{playerName}:</span>;
  if (IsEditing) {
    content = <input type="text" defaultValue={playerName} />;
  }
  return (
    <li className={`player-item ${props.selected ? "selected" : ""}`}>
      <span className="player-info">
        {content}
        <span className="player-symbol"> {props.symbol} </span>
      </span>

      <button
        onClick={(event) => handleEditClick(event)}
        className="edit-button"
      >
        {IsEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
