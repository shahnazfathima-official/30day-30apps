import React, { use, useEffect, useState } from 'react'
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import Square from './components/Square';
import { checkWinner } from './Utils/winner';
import { getAiMoveFromOpenRouter } from './Utils/aiOpenRouter';
import { div } from 'framer-motion/client';

const App = () => {

  //State for 3x3 board (9 cells)

  const [board, setBoard] = useState(Array(9).fill(null));

  //Is it player turn?

  const [isPlayerTurn, setIsPlayerTurn]= useState(true);

  //Who won? ("X", "O" or "Draw")

  const [winner, setWinner]= useState (null);

  //Score Tracking

  const [score, setScore] = useState({X:0, O:0});

   // Reset game state (keeps the score)
 const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  }
  

  //When player clicks a square

  const handleClick = (i) =>{
    if(!isPlayerTurn || board[i] || winner) return;

    const newBoard= [...board];
    newBoard[i] ="X";
    setBoard(newBoard);
    // console.log(newBoard);
    setIsPlayerTurn(false);
    
  }

  useEffect(()=>{
    
    if(winner) return // prevent double scoring

    //Check who won

    const result= checkWinner(board);

    if(result?.winner){
      setWinner(result.winner);
      if(result.winner ==="X" || result.winner ==="O"){
        setScore((prev)=>({
          ...prev,
          [result.winner]:prev[result.winner] + 1
        }))
        return;
      }
      
      
    }

    //If it is AI's turn and game not over

    if(!isPlayerTurn && !winner) {
      const aiTurn= async ()=>{
        const move= await getAiMoveFromOpenRouter(board);
        if(move !== null && board[move]===null){
          const newBoard= [...board];
          newBoard[move]="O";
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }

      }
      const timeout= setTimeout(aiTurn, 600);
      return () => clearTimeout(timeout);
    }
  },[board, isPlayerTurn, winner])

  return (
    <div className='bg-[#1a0919] min-h-screen text-white flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold mb-4'>Tic Tac TAI 🤖</h1>

      <Scoreboard score={score}/>
      <GameBoard board={board} handleClick={handleClick}/>
      {winner && (
        <div className='mt-4 text-4xl'>
          {winner ==="Draw"? "It's a draw! " : `${winner} wins! `}
          <button 
          onClick={resetGame}
          className='ml-4 px-4 py-2 bg-[#38bdf8] text-black text-3xl rounded-2xl hover:bg-[#0ea5e9]'>
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
// class="text-3xl font-bold underline ">

export default App