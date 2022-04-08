import { levelsStore, restartCurrentLevel, startLevel, startNextLevel } from './index';

levelsStore
  //
  .on(startLevel, (state, currentLevelNumber) => ({ ...state, currentLevelNumber }))
  .on(startNextLevel, (state) => ({ ...state, currentLevelNumber: state.currentLevelNumber + 1 }))
  .on(restartCurrentLevel, (state) => ({ ...state, restartCounter: state.restartCounter + 1 }));
