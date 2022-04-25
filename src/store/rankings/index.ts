import { getRankings, updateRankings } from '@lib/auth/near';
import { userStore } from '@store/user';
import { createEffect, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

export type Ranking = {
  name: string;
  score: number;
  isCurrentUser: boolean;
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

  const user = userStore.getState();

  const rankings: Rankings = rankingsEntries.map(({ key, value }: { key: string; value: number }) => {
    const name = key.split('.')[0];

    return {
      name,
      score: value,
      isCurrentUser: name === user.name,
    };
  });

  return rankings.sort((a, b) => b.score - a.score);
});
export const updateUserRankings = createEffect<number, void, Error>(async (score) => {
  setUpdateStatus('InProgress');
  await updateRankings(score);
  setUpdateStatus('Done');
});
