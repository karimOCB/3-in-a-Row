export interface IMatch {
  username1: string;
  email1: string;
  username2: string;
  email2: string;
  played?: number;
  won1?: number;
  won2?: number;
}

export interface GameStats {
  played: number,
  won1: number,
  won2: number
}

type Cell = "O" | "X" | "";

type Board = [Cell, Cell, Cell,
              Cell, Cell, Cell,
              Cell, Cell, Cell];

type Winner = "O" | "X" | null;

type winningLine = [number, number, number];




