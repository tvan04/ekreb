# ekreb

A word unscrambling game made for Change++

Made by: Tristan Van

Email: tristan.v.van@vanderbilt.edu 

Github: https://www.github.com/tvan04



## Gameplay

**1. Unscramble the words in the allotted time!**


**2. Recieve a hint if you're stuck!**


**3. See your score!**




## Run Locally

Clone the project

```bash
  git clone https://github.com/ChangePlusPlusVandy/change-coding-challenge-2023-tvan04.git
```

Navigate to the project directory

```bash
  cd /ekreb/
```

Install dependencies

```bash
  npm run postinstall
```

Start the game

```bash
  npm run game
```

After starting game, navigate to http://localhost:5173/ to open the game. 


## Words

The words used in this project are taken from this random word API: 

https://random-word-api.herokuapp.com/home


## Reflection

I created the frontend using React, and I created the RESTful API using Node.js and Express. I got my words from an API. I was able to implement the timer using useEffect, and I gave the first letter of the unscrambled word as a hint. I also implemented a restart button that resets the states in the frontend and backend so you don't have to completely restart the frontend and backend if you want to play again. Overall, I think this was a good challenge. It was simple enough to where most people could do it, but it also allowed for a decent amount of customizability. 
