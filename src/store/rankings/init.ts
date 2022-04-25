import { loadRankings, rankingsStore, setUpdateStatus, updateUserRankings } from './index';

rankingsStore
  //
  .on(loadRankings.doneData, (state, rankings) => ({ ...state, rankings }))
  .on(setUpdateStatus, (state, updateStatus) => ({ ...state, updateStatus }))
  .on(updateUserRankings.done, (state) => ({ ...state, updateStatus: 'Done' }));
