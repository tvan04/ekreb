import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [guess, setGuess] = useState("")

  const handleGuess = () => {
    
  }
  return (
    <>
      <div className="heading">
       <h1>ekreb</h1>
       <h2>Guess the scrambled word!</h2>
      </div>

      <div className="game"></div>
      <input
          type="string"
          placeholder="Enter your guess here!"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      <button onClick={handleGuess}>Guess</button>
    </>
  )
}

export default App
