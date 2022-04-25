import { loadRankings, rankingsStore } from './index';

rankingsStore
  //
  .on(loadRankings.doneData, (state, rankings) => ({ ...state, rankings }));
