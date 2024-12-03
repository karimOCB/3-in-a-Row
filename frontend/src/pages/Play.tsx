import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Board, Cell, GameStats, Winner, winningLine } from "../../types";
import * as MatchesApi from "../network/matches_api.ts";
import { determineWinner } from "../utils";

import WinnerModal from "../components/WinnerModal";
import Game from "../components/Game.tsx";


const Play = () => {
  const [turn, setTurn] = useState<Cell>("O");
  const [squares, setSquares] = useState(Array(9).fill("") as Board)
  const [winner, setWinner] = useState<Winner>(null);
  const [gameStats, setGameStats] = useState<GameStats>();
  const [winningLine, setWinningLine] = useState<winningLine | null>(null)

  const location = useLocation();
  const { username1, username2, _id }: { username1: string, username2: string, _id: string} = location.state || {};

  useEffect(() => { 
    if(!gameStats) {
      const fetchGameStats = async () => {
        if(_id) {
          try {
            const data = await MatchesApi.getPairMatches(_id)
            setGameStats(data)
          } catch (error) {
            console.error("Failed to fetch game stats:", error)
          }
        } else {
          console.error("Match ID is missing!")
        }
      }
      fetchGameStats();
    }

    if (_id && gameStats) {
      MatchesApi.updateGameStats(_id, gameStats)
    } 
  }, [gameStats, _id])  

  useEffect(() => {
    const [winnerSymbol, line] = determineWinner(squares);
    setWinningLine(line as winningLine);
    
    if (winnerSymbol) setWinner(winnerSymbol)
    else if (!squares.includes("")) setWinner("Draw")

  }, [squares])

  const gameProps={ squares, turn, winningLine, gameStats, setSquares, setTurn, username1, username2 }

  return (
    
      <div className="flex items-center justify-center">
        <div className={`flex flex-col w-screen h-screen px-5 items-center justify-center ${winner ? "opacity-20": ""}`}>
          <header className="flex flex-col items-center mb-4 -mt-10">
            <h1 className="mb-8 sm:text-[5rem] font-extrabold text-center text-slate-100 underline decoration-dashed decoration-[6px] underline-offset-8 decoration-fuchsia-600">Play 3 in a Row</h1>
            <p className="sm:text-[16px] text-[14px] text-center max-w-[420px] ">Can you outsmart your opponent? Who will rise, dominate the board, and claim the title of Conqueror of the World?</p>
          </header>
          <h2 className="text-xl sm:text-2xl mb-3 border px-2 py-1 rounded-xl bg-blue-900">Matches: {gameStats?.played}</h2>
          <Game gameProps={gameProps}/>
        </div>
        {winner && <WinnerModal winner={winner} username1={username1} username2={username2} setWinner={setWinner} setSquares={setSquares} setGameStats={setGameStats} gameStats={gameStats} setTurn={setTurn}/>} 
      </div> 
  );
}

export default Play