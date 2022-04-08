import { levelsStore, setCurrentLevelNumber, startLevel } from './index';

levelsStore
  //
  .on(setCurrentLevelNumber, (state, currentLevelNumber) => ({ ...state, currentLevelNumber }));

startLevel.watch((number) => {
  setCurrentLevelNumber(number);
});
