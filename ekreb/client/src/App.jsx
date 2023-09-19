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
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(60);

  //ends game after 5 words and controls timer for each word
  useEffect(() => {
    // number of rounds
    if (wordsPlayed === 5) {
      setGameState("end");
    }

    // timer
    if (gameState === "game") {
      const timerId = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          setGuess("");
          handleGuess();
          clearInterval(timerId);
        }
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [wordsPlayed, gameState, timer]);

  //sends guess to sever for validation, clears guess, fetches new word, increments words played
  const handleGuess = async () => {
    try {
      await axios.post("http://localhost:3000/api/ekreb/validate", {
        guess: guess,
      });
      setGuess("");
      setGameState("result");
      setShowHint(false);
      setTimer(60);
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

  //changes state of the hint to true if button is clicked
  const revealHint = () => {
    if (originalWord && originalWord.length > 0) {
      setShowHint(true);
    }
  };

  let content;
  //start screen
  if (gameState === "start") {
    content = (
      <div className="start">
        <h1>Welcome to ekreb</h1>
        <h2>
          Guess the scrambled word! You have ___ minutes to unscramble the word.
          After 5 words your score will be displayed
        </h2>
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
    //game screen
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
        <p>Time Left: {timer}</p>
        {showHint && <p>Hint: The first letter is {originalWord.charAt(0)}</p>}
        <button onClick={revealHint}>Hint</button>
      </div>
    );
    //result screen
  } else if (gameState === "result") {
    content = (
      <div className="result">
        <h2>{correct ? "Correct" : "Wrong"}!</h2>
        <p>Scrambled Word: {scrambledWord}</p>
        <p>Original Word: {originalWord}</p>
        <button
          onClick={() => {
            setWordsPlayed(wordsPlayed + 1);
            setGameState("game");
            fetchWord();
          }}
        >
          Next
        </button>
      </div>
    );
    //end screen
  } else if (gameState === "end") {
    content = (
      <div className="end">
        <h1>Game Over!</h1>
        <p>Your score was: {score}/5</p>
        <button onClick={restartGame}>Restart</button>
      </div>
    );
  }

  return <>{content}</>;
}

export default App;
