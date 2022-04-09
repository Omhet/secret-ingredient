import { levelDataManager } from '@lib/LevelDataManager';
import { combine, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

type Level = {
  number: number;
  unlockScore: number;
  score: number;
};

type LevelsStore = {
  currentLevelNumber: number;
  currentLevelScore: number;
  restartCounter: number;
  levels: Level[];
};

export const levelsStore = createStore<LevelsStore>({
  currentLevelNumber: 1,
  currentLevelScore: 0,
  restartCounter: 0,
  levels: levelDataManager.getAllLevels().map(({ score, unlockScore, number }) => ({ score, unlockScore, number })),
});

export const globalScoreStore = levelsStore.map(({ levels }) => levels.reduce((a, b) => a + b.score, 0));

export const levelsListStore = combine(levelsStore, globalScoreStore, (levelsState, globalScore) => {
  return levelsState.levels.map((level) => {
    return {
      isOpen: globalScore >= level.unlockScore,
      ...level,
    };
  });
});

const currentLevelNumberStore = levelsStore.map(({ currentLevelNumber }) => currentLevelNumber);

export const currentLevelStore = combine(currentLevelNumberStore, levelsListStore, (currentLevelNumber, levelsList) => {
  return levelsList[currentLevelNumber - 1];
});

export const nextLevelStore = combine(currentLevelNumberStore, levelsListStore, (currentLevelNumber, levelsList) => {
  return levelsList[currentLevelNumber] ?? null;
});

export const useLevels = () => {
  const levels = useStore(levelsStore);
  const levelsList = useStore(levelsListStore);
  const globalScore = useStore(globalScoreStore);

  return {
    ...levels,
    globalScore,
    levels: levelsList,
  };
};

export const useCurrentLevel = () => {
  const state = useStore(currentLevelStore);

  return state;
};

export const useNextLevel = () => {
  const state = useStore(nextLevelStore);

  return state;
};

export const startLevel = createEvent<number>();
export const restartCurrentLevel = createEvent();
export const startNextLevel = createEvent();
export const setCurrentLevelScore = createEvent<number>();
export const rewriteCurrentLevelScore = createEvent<number>();