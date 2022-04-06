import { Position } from '@app-types/game';
import { Midi } from '@tonejs/midi';

export const fetchMarkup = async (name: string) => {
  const midi = await Midi.fromUrl(`midi/${name}.mid`);
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
    notes: track.notes.map((note) => note.time * bps + 0.5),
  };
};

export const checkHit = (zonePosition: Position) => {
  const notes = Array.from(document.querySelectorAll<HTMLDivElement>('[data-id="note"]'));

  for (const note of notes) {
    const beat = checkNoteHit(note, zonePosition);
    if (beat !== undefined) {
      return beat;
    }
  }

  return undefined;
};

const HIT_PERCENT_BOTTOM = 40;
const HIT_PERCENT_TOP = 10;
export const checkNoteHit = (note: HTMLDivElement, zonePosition: Position) => {
  const noteRect = note.getBoundingClientRect();

  const size = noteRect.height * 3;
  const diff = Math.sqrt(Math.pow(zonePosition.x - noteRect.x, 2) + Math.pow(zonePosition.y - noteRect.y, 2));

  const percent = (diff / size) * 100;

  if (percent >= HIT_PERCENT_BOTTOM && percent <= 100 - HIT_PERCENT_TOP) {
    return Number(note.dataset.beat);
  }
};
