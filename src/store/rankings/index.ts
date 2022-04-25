import { getRankings, updateRankings } from '@lib/auth/near';
import { createEffect, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

export type Ranking = {
  name: string;
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

export const loadRankings = createEffect<void, Rankings, Error>(async () => {
  const rankingsEntries = await getRankings();

  const rankings: Rankings = rankingsEntries.map(({ key, value }: { key: string; value: number }) => ({
    name: key.split('.')[0],
    score: value,
  }));

  return rankings.sort((a, b) => b.score - a.score);
});
export const updateUserRankings = createEffect<number, void, Error>(async (score) => {
  setUpdateStatus('InProgress');
  await updateRankings(score);
  setUpdateStatus('Done');
});
