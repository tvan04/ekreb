const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

let score = 0;

//scramble word from api 
function scrambleWord(word) {
  const characters = inputString.split("");

  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  const scrambledString = characters.join("");
  return scrambledString;
}
//get a word from the api
app.get("/api/ekreb/random-word", async (req, res) => {
  try {
    const response = await axios.get(
      "https://random-word-api.herokuapp.com/word"
    );

    if (response.data && response.data.length > 0) {
      const randomWord = response.data[0];
      const scrambledWord = scrambleWord(randomWord);
      res.status(200).json({ word: scrambledWord });
    } else {
      res.status(404).json({ message: "Word not found in API" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//check user guesses
app.post("/api/ekreb/validate", (req, res) => {
  const { guess, originalWord } = req.body;

  if (guess === originalWord) {
    score += 1;
    res.status(200).json({ answer: true, score });
  } else {
    res.status(200).json({ answer: false, score });
  }
});
