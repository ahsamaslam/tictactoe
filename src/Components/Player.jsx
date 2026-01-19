import { useState } from "react";
export default function Player(props) {
  const [IsEditing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(props.name);
  function handleEditClick(event) {
    setEditing((editing) => !editing);
    if (IsEditing) {
      const input = event.target.parentElement.querySelector("input");
      if (input) {
        setPlayerName(input.value);
      }
    }
  }
  let content = <span className="PlayerX">{playerName}:</span>;
  if (IsEditing) {
    content = <input type="text" defaultValue={playerName} />;
  }
  return (
    <li>
      <span className="Player">
        {content}
        <span className="PlayerSymbol"> {props.symbol} </span>
      </span>

      <button onClick={(event) => handleEditClick(event)}>
        {IsEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
