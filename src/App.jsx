import "./App.css";
import Player from "./Components/Player";

function App() {
  return (
    <main>
      <div className="App">
        <ol>
          <Player name="Player 1" symbol="X" />
          <Player name="Player 2" symbol="O" />
        </ol>
      </div>
    </main>
  );
}

export default App;
