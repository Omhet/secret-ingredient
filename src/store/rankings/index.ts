import { getRankings } from '@lib/auth/near';
import { createEffect, createStore } from 'effector';
import { useStore } from 'effector-react';

export type Ranking = {
  user: string;
  score: number;
};

export type Rankings = Ranking[];

type RankingsStore = {
  rankings: Rankings;
};

export const rankingsStore = createStore<RankingsStore>({
  rankings: [],
});

export const useRankings = () => {
  const state = useStore(rankingsStore);
  const isLoading = useStore(loadRankings.pending);

  return {
    ...state,
    isLoading,
  };
};

export const loadRankings = createEffect<void, Rankings, Error>(() => getRankings());
