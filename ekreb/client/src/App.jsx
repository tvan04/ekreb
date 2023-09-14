import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [guess, setGuess] = useState("");
  const [word, setWord] = useState("");

  const handleGuess = async () => {
    try {
      const response = await axios.post("/api/ekreb/validate", {
        userGuess: guess,
        originalWord: word,
      });
      }
    catch {
      console.log("error");
    }
};
  return (
    <>
      <div className="heading">
        <h1>ekreb</h1>
        <h2>Guess the scrambled word!</h2>
      </div>

      <div className="game">
      <p>Word: {word}</p>
        <input
          type="string"
          placeholder="Enter your guess here!"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={handleGuess}>Guess</button>
      </div>
    </>
  );
}

export default App;
