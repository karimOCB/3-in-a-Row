import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Board, Cell, GameStats, Winner, winningLine } from "../../types";
import { determineWinner } from "../utils";
import * as MatchesApi from "../network/matches_api.ts"

import PageSquare from "../components/PageSquare";
import WinnerModal from "../components/WinnerModal";


const Play = () => {
  const [turn, setTurn] = useState<Cell>("O");
  const [squares, setSquares] = useState(Array(9).fill("") as Board)
  const [winner, setWinner] = useState<Winner>(null);
  const [gameStats, setGameStats] = useState<GameStats>({played: 0, won1: 0, won2: 0});
  const [winningLine, setWinningLine] = useState<winningLine>()

  const location = useLocation();
  const { username1, username2, _id } = location.state || {};

  useEffect(() => { 
    console.log(_id)
    MatchesApi.updateGameStats(_id, gameStats)
  }, [gameStats])  

  useEffect(() => {
    const winner = determineWinner(squares);
    setWinningLine(winner[1] as winningLine);
    if (winner[0]) { 
      setWinner(winner[0])
    }
    if (!squares.includes("") && !winner) {
      setWinner("Draw")
    }
  }, [squares])

  return (
    
      <div className="flex items-center justify-center">
        <div className={`flex flex-col w-screen h-screen items-center justify-center ${winner ? "opacity-20": ""}`}>
          <header className="flex flex-col items-center mb-6 -mt-10">
            <h1 className="mb-8 text-[5rem] font-extrabold text-slate-100 underline decoration-dashed decoration-[6px] underline-offset-8 decoration-fuchsia-600">Play 3 in a Row</h1>
            <p className="text-[16px] text-center max-w-[420px]">Can you outsmart your opponent? Who will rise, dominate the board, and claim the title of Conqueror of the World?</p>
          </header>
          <h2 className="text-2xl mb-3">Matches: {gameStats?.played}</h2>
          <div className="flex items-center justify-center">
            <div className="flex flex-col mr-10">
              <h2>User 1: {username1}</h2>
              <span>Won: {gameStats?.won1 }</span>
            </div>
            <div className="grid grid-cols-3 w-72 h-72">
              {squares.map((_, index) => <PageSquare key={index} index={index} squares={squares} setSquares={setSquares} setTurn={setTurn} turn={turn} winningLine={winningLine}/>)}
            </div>
            <div className="flex flex-col ml-10">
              <h2>User 2: {username2}</h2>
              <span>Won: {gameStats?.won2}</span>
            </div>
          </div>   
        </div>
        {winner && <WinnerModal winner={winner} username1={username1} username2={username2} setWinner={setWinner} setSquares={setSquares} setGameStats={setGameStats} gameStats={gameStats} setTurn={setTurn}/>} 
      </div> 
  );
}

export default Play