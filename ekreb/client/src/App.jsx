import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [guess, setGuess] = useState("");
  const [word, setWord] = useState("");
  const [score, setScore] = useState(0);

  const handleGuess = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ekreb/validate",
        {
          guess: guess,

        }
      );
    } catch {
      console.log("error");
    }
    const response = await axios.get("http://localhost:3000/api/ekreb/score");
    setScore(response.data.score);
    
  };

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ekreb/random-word"
        );
        if (response.data) {
          setWord(response.data.word);
        }
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    };

    fetchWord();
  }, []);

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
        <p>Score: {score}</p>
      </div>
    </>
  );
}

export default App;
