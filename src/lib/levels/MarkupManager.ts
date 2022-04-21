import { Markup } from '@app-types/music';
import { Midi } from '@tonejs/midi';

export class MarkupManager {
  markups: Markup[] = [];

  constructor(public urls: string[]) {}

  async loadLevelMarkup(levelNumber: number): Promise<Markup> {
    const index = levelNumber - 1;

    const url = this.urls[index];
    if (!url) {
      throw Error('No markup url for this level');
    }

    const midi = await Midi.fromUrl(url);
    const bpm = midi.header.tempos[0]?.bpm;
    const track = midi.tracks.find((track) => track.name === 'lead');

    if (!track) {
      throw Error('No midi track');
    }

    const bps = bpm / 60;
    const spb = 1 / bps;
    const barDuration = 4 / bps;

    return {
      bpm,
      bps,
      spb,
      barDuration,
      notes: track.notes.map((note) => note.time * bps + 12.5),
    };
  }
}
