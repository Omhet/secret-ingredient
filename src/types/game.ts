export type Position = {
  x: number;
  y: number;
};

export enum GameStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Lose = 'Lose',
  Win = 'Win',
}
