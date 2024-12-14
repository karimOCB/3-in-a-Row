export interface IMatch {
  _id: string;
  username1: string;
  email1: string;
  username2: string;
  email2: string;
  password: string;
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

type Winner = "O" | "X" | "Draw" | null;

type winningLine = [number, number, number];
