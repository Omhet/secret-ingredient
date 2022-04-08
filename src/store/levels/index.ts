import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

type LevelsStore = {
  currentLevelNumber: number;
};

export const levelsStore = createStore<LevelsStore>({
  currentLevelNumber: 1,
});

export const useLevels = () => {
  const state = useStore(levelsStore);

  return state;
};

export const setCurrentLevelNumber = createEvent<number>();
export const startLevel = createEvent<number>();
