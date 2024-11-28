// get the name and wins of the users from Login page with useContext or retrieve again from database.
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Board, Cell, IMatch, Winner, winningLine } from "../../types";
import Confetti from "react-confetti";


const Play = () => {
  const [turn, setTurn] = useState<Cell>("O");
  const [squares, setSquares] = useState<Board>(Array(9).fill("") as Board)
  const [matchHistory, setMatchHistory] = useState<IMatch>();
  const [winner, setWinner] = useState <Winner>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);


  const winningLines: winningLine[] = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ]


  const location = useLocation();
  const { username1, username2, played, won1, won2 } = location.state;
  useEffect(() => {
    if (location.state) {
      console.log(location.state)
      setMatchHistory(location.state)
    }
  }, [location.state])
  
  useEffect(() => {
    const determineWinner = (board: Board): Winner => {
      for (const [a, b, c] of winningLines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a]
        }
      }
      return null;
    }

    const winner = determineWinner(squares);
    if (winner) { 
      setWinner(winner) 
    }
  }, [squares])

  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth)
      console.log(windowWidth)
      setWindowHeight(window.innerHeight)
    }
    document.addEventListener("resize", resize)
  }, [])

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
    
      <div className="flex items-center justify-center">
        <div className={`flex flex-col w-screen h-screen items-center justify-center ${winner ? "opacity-20": ""}`}>
          <header className="flex flex-col items-center mb-6 -mt-10">
            <h1 className="mb-8 text-[5rem] font-extrabold text-slate-100 underline decoration-dashed decoration-[6px] underline-offset-8 decoration-fuchsia-600">Play 3 in a Row</h1>
            <p className="text-[16px] text-center max-w-[420px]">Can you outsmart your opponent? Who will rise, dominate the board, and claim the title of Conqueror of the World?</p>
          </header>
          <h2 className="text-2xl mb-3">Matches: {played}</h2>
          <div className="flex items-center justify-center">
            <div className="flex flex-col mr-10">
              <h2>User 1: {username1}</h2>
              <span>Win: {won1}</span>
            </div>
            <div className="grid grid-cols-3 w-72 h-72">
              {squares.map((_, index) => renderSquare(index))}
            </div>
            <div className="flex flex-col ml-10">
              <h2>User 2: {username2}</h2>
              <span>Win: {won2}</span>
            </div>
          </div>   
        </div>
         {winner &&
          <>
          <div className="absolute opacity-100">
            <p className="text-5xl font-semibold">¡¡¡{winner === "O" ? username1 : username2} Wins!!!</p>
          </div>
          <Confetti width={windowWidth} height={windowHeight} />
          </>
        } 
      </div> 
  );
}

export default Play