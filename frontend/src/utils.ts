import { Board, Winner, winningLine } from "../types";

export const winningLines: winningLine[] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Top row, Middle row, Bottom row
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Left column, Middle column, Right column
    [0, 4, 8], [2, 4, 6], // Diagonal top-left to bottom-right, Diagonal top-right to bottom-left
]

export const determineWinner = (board: Board): [Winner, number[] | null] => {
    for (const [a, b, c] of winningLines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return [board[a], [a, b, c]]
        }
    }
    return [null, null];
}
