import { useEffect, useState } from 'react'
import Confetti from "react-confetti";
import { Board, Cell, GameStats, Winner } from "../../types";

interface WinnerModalInt {
  winner: Winner,
  username1: string,
  username2: string,
  gameStats: GameStats,
  setWinner: React.Dispatch<React.SetStateAction<Winner>>
  setSquares: React.Dispatch<React.SetStateAction<Board>>
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>
  setTurn: React.Dispatch<React.SetStateAction<Cell>>
}

const WinnerModal = ({ winner, username1, username2, gameStats, setWinner, setSquares, setGameStats, setTurn}: WinnerModalInt) => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  
  const onCloseModal = () => {
    if(winner === "O"){
      setGameStats({
        ...gameStats,
        played: gameStats.played + 1,
        won1: gameStats.won1 + 1,
      })
    } else if (winner === "X") {
      setGameStats({
        ...gameStats,
        played: gameStats.played + 1,
        won2: gameStats.won2 + 1,
      })
    }
    setWinner(null)
    setSquares(Array(9).fill("") as Board)
    setTurn("O")
  }

  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [])

  return (
    <>
      <div className="absolute opacity-100 border-4 rounded-lg px-5 py-6 text-5xl">
          <div className="flex items-center justify-center text-red-500 font-bold cursor-pointer">
          <span className="border-4 border-blue-700 rounded-xl py-1 px-3" onClick={() => onCloseModal()}>X</span>
          </div>
          <p className="text-5xl font-semibold">¡¡¡{winner === "O" ? username1 : username2} Wins!!!</p>
      </div>
      <Confetti width={windowWidth} height={windowHeight} />
    </>
  )
}

export default WinnerModal