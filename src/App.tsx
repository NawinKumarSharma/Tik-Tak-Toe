import { useState } from 'react';
import './App.css';
import Block from './components/Block';

const App = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");

  const checkWinner = (state: any[]) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) return true;
    }
    return false;
  }
  const handleBlockClick = (index: number) => {
    // Check if there's already a winner or if the block is already filled
    if (checkWinner(state) || state[index] !== null) {
      return;
    }
  
    const stateCopy = [...state];
    stateCopy[index] = currentTurn;
  
    setCurrentTurn(currentTurn === "X" ? "O" : "X");
    setState(stateCopy);
  
    setTimeout(() => {
      // Check if someone won
      const win = checkWinner(stateCopy);
      const isDraw = stateCopy.every((block) => block !== null); // Check for draw
  
      if (win) {
        alert(`${currentTurn} won the game`);
        window.location.reload();
      } else if (isDraw) {
        alert("It's a draw!");
        window.location.reload();
      }
    }, 100);
  };
  
  return (
    <>
    <div className='text'>
      <h1>Tic-Tak-Toe</h1>
    </div>
      <div className="board">
        <div className="row">
          <Block onClick={() => handleBlockClick(0)} value={state[0]} />
          <Block onClick={() => handleBlockClick(1)} value={state[1]} />
          <Block onClick={() => handleBlockClick(2)} value={state[2]} />
        </div>
        <div className="row">
          <Block onClick={() => handleBlockClick(3)} value={state[3]} />
          <Block onClick={() => handleBlockClick(4)} value={state[4]} />
          <Block onClick={() => handleBlockClick(5)} value={state[5]} />
        </div>
        <div className="row">
          <Block onClick={() => handleBlockClick(6)} value={state[6]} />
          <Block onClick={() => handleBlockClick(7)} value={state[7]} />
          <Block onClick={() => handleBlockClick(8)} value={state[8]} />
        </div>

      </div>

    </>
  )
}

export default App;