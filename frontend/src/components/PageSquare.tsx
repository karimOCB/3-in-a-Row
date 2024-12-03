import { Board, Cell, winningLine } from "../../types";

interface PageSquareProps {
  index: number, 
  squares: Board,
  turn: Cell, 
  winningLine: winningLine | null,
  setSquares: React.Dispatch<React.SetStateAction<Board>>,
  setTurn: React.Dispatch<React.SetStateAction<Cell>>,
}

const PageSquare = ({ index, squares, turn, winningLine, setSquares, setTurn }: PageSquareProps) => {
  const handleSquareClick = (index: number) => {
    if (squares[index] === "O" || squares[index] === "X") return
    const newSquares = squares.map((square, i) => i === index ? turn : square) as Board;
    setSquares(newSquares)
    setTurn(turn === "O" ? "X" : "O");
  }

  return (
        <div
            key={index}
            className={`border border-t-2 border-r-2 flex justify-center items-center h-14 w-14 sm:h-24 sm:w-24 cursor-pointer text-4xl sm:text-6xl ${winningLine?.includes(index) ? "text-green-500" : ""}`}
            onClick={() => handleSquareClick(index)}
            >
            {squares[index]}
        </div>

  )
}

export default PageSquare