import { getRankings, updateRankings } from '@lib/auth/near';
import { createEffect, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

export type Ranking = {
  user: string;
  score: number;
};

export type Rankings = Ranking[];

export type UpdateStatus = 'Init' | 'InProgress' | 'Done';

type RankingsStore = {
  rankings: Rankings;
  updateStatus: UpdateStatus;
};

export const rankingsStore = createStore<RankingsStore>({
  rankings: [],
  updateStatus: 'Init',
});

export const useRankings = () => {
  const state = useStore(rankingsStore);
  const isRankingsLoading = useStore(loadRankings.pending);

  return {
    ...state,
    isRankingsLoading,
  };
};

export const setUpdateStatus = createEvent<UpdateStatus>();

export const loadRankings = createEffect<void, Rankings, Error>(() => getRankings());
export const updateUserRankings = createEffect<number, void, Error>(async (score) => {
  setUpdateStatus('InProgress');
  await updateRankings(score);
  setUpdateStatus('Done');
});
