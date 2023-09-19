const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors"); 
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let score = 0;
let correctness = false;
let originalWord = "";

//scramble word from api
function scrambleWord(word) {
  const characters = word.split("");

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
      originalWord = response.data[0];
      const scrambledWord = scrambleWord(originalWord);
      res.status(200).json({ originalWord, scrambledWord });
    } else {
      res.status(404).json({ message: "Word not found in API" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//check user guesses and update score accordingly 
app.post("/api/ekreb/validate", (req, res) => {
  const { guess } = req.body;

  if (guess === originalWord) {
    score += 1;
    correctness = true;
    res.status(200).json({score});
  } else {
    res.status(200).json({score});
    correctness = false;
  }
});

//get user score and correctness of guess
app.get("/api/ekreb/score", (req, res) => {
  res.status(200).json({ score, correctness });
});

//reset user score 
app.patch("/api/ekreb/score", (req, res) => {
  score = 0;
  res.status(200).json({ score });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
