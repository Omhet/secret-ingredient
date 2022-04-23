import { GameStatus } from '@app-types/game';
import { NotesType } from '@app-types/music';
import { createEffect, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

type GameStore = {
  isLoading: boolean;
  status: GameStatus;
  hitCount: number;
  blastCount: number;
  noteCount: number;
  notes: NotesType;
};

export const gameStoreInitial = {
  isLoading: true,
  status: GameStatus.NotStarted,
  notes: [],
  hitCount: 0,
  noteCount: Infinity,
  blastCount: Infinity,
};

export const gameStore = createStore<GameStore>(gameStoreInitial);

export const blastCountStore = gameStore.map((state) => state.blastCount);
export const gameStatusStore = gameStore.map((state) => state.status);

export const setIsLoading = createEvent<boolean>();
export const setGameStatus = createEvent<GameStatus>();
export const setNoteCount = createEvent<number>();
export const setBlastCount = createEvent<number>();
export const removeNote = createEvent<number>();
export const decreaseNoteCount = createEvent();
export const increaseHitCount = createEvent();
export const decreaseBlastCount = createEvent();
export const resetGameData = createEvent();

export const startGame = createEvent();
export const endGame = createEvent();

export const loadGame = createEffect<number, void, void>();

export const useGame = () => {
  const state = useStore(gameStore);

  return {
    isGameStarted: state.status === GameStatus.InProgress,
    isGameEnd: state.status === GameStatus.End,
    ...state,
  };
};
