// get the name and wins of the users from Login page with useContext or retrieve again from database.
import { useState } from "react"
import { Board, Turn } from "../../types";

const Play = () => {
  const [turn, setTurn] = useState<Turn>("O");
  const [squares, setSquares] = useState<Board>(Array(9).fill("") as Board)

  const handleSquareClick = (index: number) => {
    if (squares[index] === "O" || squares[index] === "X") return
    const newSquares = squares.map((square, i) => i === index ? turn : square) as Board;
    setSquares(newSquares)
    setTurn(turn === "O" ? "X" : "O");
  }

  const renderSquare = (index: number) => (
    <div
      key={index}
      className="border flex justify-center items-center h-24 w-24 cursor-pointer text-6xl"
      onClick={() => handleSquareClick(index)}
    >
      {squares[index]}
    </div>
  )

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <header className="flex flex-col items-center mb-6 -mt-10">
        <h1 className="mb-8 text-[5rem] font-extrabold text-slate-100 underline decoration-dashed decoration-[6px] underline-offset-8 decoration-fuchsia-600">Play 3 in a Row</h1>
        <p className="text-[16px] text-center max-w-[420px]">Can you outsmart your opponent? Who will rise, dominate the board, and claim the title of Conqueror of the World?</p>
      </header>
      <h2 className="text-2xl mb-3">Matches:</h2>
      <div className="flex items-center justify-center">
        <div className="flex flex-col mr-10">
          <h2>User 1:</h2>
          <span>Win: </span>
        </div>
        <div className="grid grid-cols-3 w-72 h-72">
          {squares.map((_, index) => renderSquare(index))}
        </div>
        <div className="flex flex-col ml-10">
          <h2>User 2:</h2>
          <span>Win: </span>
        </div>
      </div>
    </div>
  );
}

export default Play