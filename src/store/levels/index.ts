import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

type LevelsStore = {
  currentLevelNumber: number;
  restartCounter: number;
};

export const levelsStore = createStore<LevelsStore>({
  currentLevelNumber: 1,
  restartCounter: 0,
});

export const useLevels = () => {
  const state = useStore(levelsStore);

  return state;
};

export const startLevel = createEvent<number>();
export const restartCurrentLevel = createEvent();
export const startNextLevel = createEvent();
