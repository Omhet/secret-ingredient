import { Midi } from '@tonejs/midi';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useKeyPress } from 'react-use';
import classes from './Game.module.scss';
import { useAudio } from './useAudio';

export interface GameProps {}

enum HitRate {
  Miss = 'Miss',
  Bad = 'Bad',
  Good = 'Good',
  Perfect = 'Perfect',
}

type MidiType = {
  bpm: number;
  bps: number;
  spb: number;
  barDuration: number;
  notes: number[];
};

const TRACK_NAME = 'techno-120';

const fetchMidi = async () => {
  const midi = await Midi.fromUrl(`midi/${TRACK_NAME}.mid`);
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
    notes: track.notes.map((note) => note.time * bps + 1),
  };
};

const halfBeatSize = innerHeight / 8;
const beatSize = halfBeatSize * 2;

const LATENCY_COMPENSATION = 0.05;

export const Game: FC<GameProps> = ({}) => {
  const [missHits, setMissHits] = useState(0);
  const [badHits, setBadHits] = useState(0);
  const [goodHits, setGoodHits] = useState(0);
  const [perfectHits, setPerfectHits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [midi, setMidi] = useState<MidiType | undefined>();

  const { isPlaying, toggle } = useAudio(`/music/${TRACK_NAME}.mp3`);
  const [isPressed] = useKeyPress(' ');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const midi = await fetchMidi();
      setMidi(midi);
      setIsLoading(false);
    })();
  }, []);

  useLayoutEffect(() => {
    if (isPressed) {
      const rate = checkHit();
      switch (rate) {
        case HitRate.Perfect: {
          setPerfectHits((prev) => prev + 1);
          break;
        }
        case HitRate.Good: {
          setGoodHits((prev) => prev + 1);
          break;
        }
        case HitRate.Bad: {
          setBadHits((prev) => prev + 1);
          break;
        }
        case HitRate.Miss: {
          setMissHits((prev) => prev + 1);
          break;
        }
      }
    }
  }, [isPressed]);

  const playGame = () => {
    console.log('Play');
    toggle();
  };

  return (
    <>
      <div className={classes.scores}>
        <div>Miss: {missHits}</div>
        <div>Bad: {badHits}</div>
        <div>Good: {goodHits}</div>
        <div>Perfect: {perfectHits}</div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button disabled={isPlaying} onClick={playGame} className={classes.playBtn}>
          {isPlaying ? 'Playing' : 'Play'}
        </button>
      )}
      {isPlaying && midi && <Notes midi={midi} />}
      <Zone />
    </>
  );
};

type NotesProps = {
  midi: MidiType;
};
const Notes: FC<NotesProps> = ({ midi }) => {
  return (
    <>
      {midi.notes.map((beat) => {
        return (
          <motion.div
            data-id="note"
            key={beat}
            initial={{ y: -beatSize, originY: 0 }}
            animate={{ y: beatSize * 4 }}
            transition={{
              type: 'tween',
              ease: 'linear',
              duration: midi.barDuration + LATENCY_COMPENSATION,
              delay: midi.spb * beat,
            }}
            className={classes.noteMovingWrapper}
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                mass: 0.5,
                duration: midi.spb / 2,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
              style={{ height: halfBeatSize, width: halfBeatSize }}
              className={classes.note}
            />
          </motion.div>
        );
      })}
    </>
  );
};

const Zone: FC = () => {
  return (
    <>
      <div data-id="zone" style={{ height: halfBeatSize, top: halfBeatSize * 6 }} className={classes.zone} />
      {/* <div style={{ height: beatSize }} className={classes.line} />
      <div style={{ height: beatSize }} className={classes.line} />
      <div style={{ height: beatSize }} className={classes.line} />
      <div style={{ height: beatSize }} className={classes.line} /> */}
    </>
  );
};

function checkHit() {
  const zone = document.querySelector('[data-id="zone"]');
  const notes = Array.from(document.querySelectorAll('[data-id="note"]'));

  if (!zone) {
    throw Error('no zone');
  }

  for (const note of notes) {
    const rate = getOverlapRate(note, zone);
    if (rate !== HitRate.Miss) {
      return rate;
    }
  }

  return HitRate.Miss;
}

function getOverlapRate(note: Element, zone: Element): HitRate {
  const zoneRect = zone.getBoundingClientRect();
  const noteRect = note.getBoundingClientRect();

  const height = zoneRect.height;
  const noteCenter = noteRect.y + height / 2;
  const zoneCenter = zoneRect.y + height / 2;
  const diff = Math.abs(noteCenter - zoneCenter);

  if (diff > height) {
    return HitRate.Miss;
  }

  const percent = 100 - (diff / height) * 100;

  if (percent >= 70) {
    return HitRate.Perfect;
  } else if (percent >= 40) {
    return HitRate.Good;
  } else {
    return HitRate.Bad;
  }
}
