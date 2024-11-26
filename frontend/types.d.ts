export interface IMatch {
  username1: string;
  email1: string;
  username2: string;
  email2: string;
  played?: number;
  won1?: number;
  won2?: number;
}

type Turn = "O" | "X" | ""

type Board = [Turn, Turn, Turn, Turn, Turn, Turn, Turn, Turn, Turn]


