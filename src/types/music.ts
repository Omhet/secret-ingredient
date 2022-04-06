export type Markup = {
  bpm: number;
  bps: number;
  spb: number;
  barDuration: number;
  notes: number[];
};

export type NotesType = Markup['notes'];
