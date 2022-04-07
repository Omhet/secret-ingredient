import { GameStatus, Position } from '@app-types/game';
import { Markup, NotesType } from '@app-types/music';
import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import { hotkey } from './keys';

type GameStore = {
  isLoading: boolean;
  status: GameStatus;
  missCount: number;
  hitCount: number;
  touchedHeartCount: number;
  blastCount: number;
  zonePosition: Position;
  markup: Markup;
  notes: NotesType;
};

export const gameStore = createStore<GameStore>({
  isLoading: true,
  status: GameStatus.NotStarted,
  notes: [],
  markup: {} as Markup,
  missCount: 0,
  hitCount: 0,
  blastCount: 0,
  touchedHeartCount: 0,
  zonePosition: {} as Position,
});

export const useGame = () => {
  const state = useStore(gameStore);

  return {
    isGameStarted: state.status === GameStatus.InProgress,
    hasBlasts: state.blastCount > 0,
    notesInitialCount: state.markup?.notes?.length,
    ...state,
  };
};

export const setIsLoading = createEvent<boolean>();
export const setGameStatus = createEvent<GameStatus>();
export const setMarkup = createEvent<Markup>();
export const setBlastCount = createEvent<number>();
export const setZonePosition = createEvent<Position>();
export const removeNote = createEvent<number>();
export const increaseMissCount = createEvent();
export const increaseHitCount = createEvent();
export const increaseTouchedHeartCount = createEvent();
export const decreaseBlastCount = createEvent();

export const loadGame = createEvent();
export const startGame = createEvent();
export const noteTouchedHeart = createEvent<number>();
export const spaceDown = hotkey({ key: ' ', type: 'keydown' });
export const blast = createEvent();
