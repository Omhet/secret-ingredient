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

export const useLevels = () => {
  const levels = useStore(levelsStore);
  const levelsList = useStore(levelsListStore);

  return {
    ...levels,
    levels: levelsList,
  };
};

export const startLevel = createEvent<number>();
export const restartCurrentLevel = createEvent();
export const startNextLevel = createEvent();
