import { loadRankings, rankingsStore, setUpdateStatus, setUserRankingScore, updateUserRankings } from './index';

rankingsStore
  //
  .on(loadRankings.doneData, (state, rankings) => ({ ...state, rankings }))
  .on(setUpdateStatus, (state, updateStatus) => ({ ...state, updateStatus }))
  .on(setUserRankingScore, (state, userRankingScore) => ({ ...state, userRankingScore }))
  .on(updateUserRankings.done, (state) => ({ ...state, updateStatus: 'Done' }));
