import { context, PersistentVector } from 'near-sdk-as';

@nearBindgen
export class Ranking {
  user: string;

  constructor(public score: i32) {
    this.user = context.sender;
  }
}

export const rankings = new PersistentVector<Ranking>('r');
