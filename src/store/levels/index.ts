import { statsStore } from '@store/stats';
import { combine, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import { levelDataManager } from '../../lib/LevelDataManager';

type Level = {
  number: number;
  unlockScore: number;
  score: number;
};

type LevelsStore = {
  currentLevelNumber: number;
  restartCounter: number;
  levels: Level[];
};

export const levelsStore = createStore<LevelsStore>({
  currentLevelNumber: 1,
  restartCounter: 0,
  levels: levelDataManager.getAllLevels().map(({ score, unlockScore, number }) => ({ score, unlockScore, number })),
});

export const levelsListStore = combine(levelsStore, statsStore, (levelsState, statsState) => {
  return levelsState.levels.map((level) => {
    return {
      isOpen: statsState.globalScore >= level.unlockScore,
      ...level,
    };
  });
});

const currentLevelNumberStore = levelsStore.map(({ currentLevelNumber }) => currentLevelNumber);

export const currentLevelStore = combine(currentLevelNumberStore, levelsListStore, (currentLevelNumber, levelsList) => {
  return levelsList[currentLevelNumber - 1];
});

export const useLevels = () => {
  const levels = useStore(levelsStore);
  const levelsList = useStore(levelsListStore);

  return {
    ...levels,
    levels: levelsList,
  };
};

export const useCurrentLevel = () => {
  const state = useStore(currentLevelStore);

  return state;
};

export const startLevel = createEvent<number>();
export const restartCurrentLevel = createEvent();
export const startNextLevel = createEvent();
export const setCurrentLevelScore = createEvent<number>();
