import { Ranking, rankings } from './model';

export function updateRanking(score: number): void {
  const ranking = new Ranking(score);
  rankings.push(ranking);
}

export function getRankings(): Ranking[] {
  const result = new Array<Ranking>(rankings.length);
  for (let i = 0; i < rankings.length; i++) {
    result[i] = rankings[i];
  }
  return result;
}
