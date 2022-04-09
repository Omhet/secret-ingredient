import { addScoreToGlobalScore, statsStore } from './index';

statsStore
  //
  .on(addScoreToGlobalScore, (state, score) => ({ ...state, globalScroe: state.globalScore + score }));
