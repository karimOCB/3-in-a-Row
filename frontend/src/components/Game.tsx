import React, { useEffect, useState } from 'react'
import PageSquare from "./PageSquare";
import { Board, Cell, GameStats, winningLine } from "../types";
import { windowResize } from "../utils";

interface GameProps {
  gameProps: {
    squares: Board,
    turn: Cell, 
    winningLine: winningLine | null,
    gameStats: GameStats | undefined,
    setSquares: React.Dispatch<React.SetStateAction<Board>>,
    setTurn: React.Dispatch<React.SetStateAction<Cell>>,
    username1: string,
    username2: string
  }
}

const Game = ({ gameProps }: GameProps) => {
  const { squares, gameStats, username1, username2 } = gameProps
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    windowResize({setWindowWidth})
  }, [])

 
    return (
      windowWidth > 500 ? 
        <div className="flex items-center justify-center">
          <div className="flex flex-col mr-10 border px-2 py-1 rounded-xl bg-blue-900">
            <h2>User 1: {username1}</h2>
            <span>Won: {gameStats?.won1 }</span>
          </div>
          <div className="grid grid-cols-3 min-w-[168px] h-[168px] sm:w-72 sm:h-72">
            {squares.map((_, index) => <PageSquare key={index} index={index} {...gameProps}/>)}
          </div>
          <div className="flex flex-col ml-10 border px-2 py-1 rounded-xl bg-blue-900">
            <h2>User 2: {username2}</h2>
            <span>Won: {gameStats?.won2}</span>
          </div>
        </div>   
      : 
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 min-w-[168px] h-[168px] sm:w-72 sm:h-72">
            {squares.map((_, index) => <PageSquare key={index} index={index} {...gameProps}/>)}
          </div>
          <div className="flex mt-5 space-x-4 text-center">
            <div className={`flex flex-col border p-2 ${username1 > username2 ? "border-fuchsia-700" : "border-green-200"}`}>
              <h2>{username2}</h2>
              <p>Won: <span className="">{gameStats?.won2}</span></p>
            </div>
            <div className={`flex flex-col border p-2 ${username1 > username2 ? "border-green-200" : "border-fuchsia-700"}`}>
              <h2>{username1}</h2>
              <p>Won: <span>{gameStats?.won1 }</span></p>
            </div>
          </div>
        </div>
    ) 
}

export default Game