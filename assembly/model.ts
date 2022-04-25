import { context, PersistentVector } from 'near-sdk-as';

@nearBindgen
export class Ranking {
  user: string;
  constructor(public score: number) {
    this.user = context.sender;
  }
}

export const rankings = new PersistentVector<Ranking>('r');
