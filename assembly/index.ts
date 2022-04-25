import { context, MapEntry, PersistentUnorderedMap } from 'near-sdk-as';

const rankings = new PersistentUnorderedMap<string, i32>('r');

export function updateRankings(score: i32): void {
  rankings.set(context.sender, score);
}

export function getRankings(): MapEntry<string, i32>[] {
  return rankings.entries();
}
