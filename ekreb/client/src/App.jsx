import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [guess, setGuess] = useState("");
  const [originalWord, setOriginalWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [gameState, setGameState] = useState("start");
  const [wordsPlayed, setWordsPlayed] = useState(0);

  //checks to see how many words have been played and ends game after 5
  useEffect(() => {
    if (wordsPlayed == 5) {
      setGameState("end");
    }
  }, [wordsPlayed]);

  //sends guess to sever for validation, clears guess, fetches new word, increments words played
  const handleGuess = async () => {
    try {
      await axios.post("http://localhost:3000/api/ekreb/validate", {
        guess: guess,
      });
      setGuess("");
      setWordsPlayed(wordsPlayed + 1);
      setGameState("result");
    } catch {
      console.error("Error submitting guess");
    }

    try {
      const response = await axios.get("http://localhost:3000/api/ekreb/score");
      setScore(response.data.score);
      setCorrect(response.data.correctness);
    } catch (error) {
      console.error("Error getting score:", error);
    }
  };

  //fetches a new word from the server
  const fetchWord = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/ekreb/random-word"
      );
      if (response.data) {
        setOriginalWord(response.data.originalWord);
        setScrambledWord(response.data.scrambledWord);
      }
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  //resets game state, score, words played, and resets user score on server
  const restartGame = async () => {
    setGameState("game");
    setScore(0);
    setWordsPlayed(0);
    try {
      await axios.patch("http://localhost:3000/api/ekreb/score");
    } catch (error) {
      console.error("Error restarting game:", error);
    }
  };

  let content;
  if (gameState === "start") {
    content = (
      <div className="start">
        <h1>Welcome to ekreb</h1>
        <p>Guess the scrambled word!</p>
        <button
          onClick={() => {
            setGameState("game");
            fetchWord();
          }}
        >
          Start
        </button>
      </div>
    );
  } else if (gameState === "game") {
    content = (
      <div className="game">
        <h1>ekreb</h1>
        <p>Word: {scrambledWord}</p>
        <input
          type="string"
          placeholder="Enter your guess here!"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={handleGuess}>Guess</button>
        <p>Score: {score}</p>
        <button onClick={fetchWord}>New Word</button>
      </div>
    );
  } else if (gameState === "result") {
    content = (
      <div className="result">
        <h2>{correct ? "Correct" : "Wrong"}!</h2>
        <p>Scrambled Word: {scrambledWord}</p>
        <p>Original Word: {originalWord}</p>
        <button
          onClick={() => {
            setGameState("game");
            fetchWord();
          }}
        >
          Next
        </button>
      </div>
    );
  } else if (gameState === "end") {
    content = (
      <div className="end">
        <h1>Game Over!</h1>
        <p>Your score was: {score}</p>
        <button onClick={restartGame}>Restart</button>
      </div>
    );
  }

  return <>{content}</>;
}

export default App;
