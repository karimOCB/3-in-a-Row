import { Board, Cell, winningLine } from "../../types";

interface PageSquareProps {
  index: number, 
  squares: Board,
  turn: Cell, 
  winningLine: winningLine | undefined,
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
            className={`border flex justify-center items-center h-24 w-24 cursor-pointer text-6xl ${winningLine?.includes(index) ? "text-green-500" : ""}`}
            onClick={() => handleSquareClick(index)}
            >
            {squares[index]}
        </div>

  )
}

export default PageSquare