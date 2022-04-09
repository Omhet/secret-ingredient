import { levelsStore, restartCurrentLevel, setCurrentLevelScore, startLevel, startNextLevel } from './index';

levelsStore
  //
  .on(startLevel, (state, currentLevelNumber) => ({ ...state, currentLevelNumber }))
  .on(startNextLevel, (state) => ({ ...state, currentLevelNumber: state.currentLevelNumber + 1 }))
  .on(restartCurrentLevel, (state) => ({ ...state, restartCounter: state.restartCounter + 1 }))
  .on(setCurrentLevelScore, (state, score) => ({
    ...state,
    levels: state.levels.map((level) => {
      if (level.number === state.currentLevelNumber) {
        return {
          ...level,
          score,
        };
      }
      return level;
    }),
  }));
