import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';
import { levelDataManager } from '../../lib/LevelDataManager';

type StatsStore = {
  globalScore: number;
};

export const statsStore = createStore<StatsStore>({
  globalScore: levelDataManager.getAllLevels().reduce((a, b) => a + b.score, 0),
});

export const useStats = () => {
  const state = useStore(statsStore);

  return state;
};

export const addScoreToGlobalScore = createEvent<number>();
