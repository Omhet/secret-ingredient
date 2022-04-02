import { Midi } from '@tonejs/midi';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
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

type Position = {
  x: number;
  y: number;
};

type MidiType = {
  bpm: number;
  bps: number;
  spb: number;
  barDuration: number;
  notes: number[];
};

type WithMidi = {
  midi: MidiType;
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
  const [notes, setNotes] = useState<MidiType['notes']>([]);

  const zoneRef = useRef<HTMLDivElement>(null);
  const [zonePos, setZonePos] = useState({ x: 0, y: 0 });

  const { isPlaying, toggle } = useAudio(`/music/${TRACK_NAME}.mp3`);
  const [isPressed] = useKeyPress(' ');

  useEffect(() => {
    setTimeout(() => {
      if (zoneRef.current) {
        const { x, y } = zoneRef.current.getBoundingClientRect();
        setZonePos({ x, y });
      }
    }, 0);
  }, [zoneRef.current]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const midi = await fetchMidi();
      setMidi(midi);
      setNotes(midi.notes);
      setIsLoading(false);
    })();
  }, []);

  useLayoutEffect(() => {
    if (isPressed) {
      const rate = checkHit(zonePos);
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
  }, [isPressed, zonePos]);

  const playGame = () => {
    console.log('Play');
    toggle();
  };

  const handleAnimationComplete = (beat: number) => {
    setNotes((prev) => prev.filter((b) => b !== beat));
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
      {isPlaying && midi && (
        <Notes notes={notes} midi={midi} zonePos={zonePos} onAnimationComplete={handleAnimationComplete} />
      )}
      {midi && <Zone ref={zoneRef} midi={midi} isPlaying={isPlaying} />}
    </>
  );
};

const Notes: FC<
  WithMidi & {
    zonePos: Position;
    notes: MidiType['notes'];
    onAnimationComplete: (beat: number) => void;
  }
> = ({ midi, notes, zonePos, onAnimationComplete }) => {
  return (
    <>
      <div
        style={{
          width: 1,
          background: 'black',
          position: 'absolute',
          height: innerHeight * 2,
          left: innerWidth / 2 - halfBeatSize / 2,
          top: zonePos.y - beatSize * 5,
        }}
      ></div>
      <div
        style={{
          width: 4,
          background: 'black',
          position: 'absolute',
          height: 4,
          left: zonePos.x,
          top: zonePos.y,
        }}
      ></div>
      <AnimatePresence>
        {notes.map((beat) => {
          return (
            <motion.div
              className={classes.noteMovingWrapper}
              data-id="note"
              key={beat}
              initial={{ x: innerWidth / 2 - halfBeatSize / 2, y: zonePos.y - beatSize * 5 }}
              animate={{ x: zonePos.x, y: zonePos.y }}
              exit={{
                opacity: 0,
                transition: {
                  type: 'tween',
                  ease: 'linear',
                  duration: 0.3,
                },
              }}
              transition={{
                type: 'tween',
                ease: 'linear',
                duration: midi.barDuration + LATENCY_COMPENSATION,
                delay: midi.spb * beat,
              }}
              onAnimationComplete={() => onAnimationComplete(beat)}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
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
      </AnimatePresence>
    </>
  );
};

const Zone = forwardRef<HTMLDivElement, WithMidi & { isPlaying: boolean }>(({ midi, isPlaying }, ref) => {
  return (
    <div className={classes.zone}>
      <motion.div
        data-id="zone"
        ref={ref}
        initial={{ scale: 1 }}
        animate={isPlaying ? { scale: 1.1 } : undefined}
        transition={{
          type: 'spring',
          mass: 0.5,
          duration: midi.spb / 2,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={{ width: halfBeatSize, height: halfBeatSize }}
        className={classes.zoneHeart}
      />
      <div className={classes.zoneFence} style={{ width: halfBeatSize * 5, height: halfBeatSize * 5 }}>
        <div className={classes.zoneFenceInner} style={{ width: halfBeatSize * 3, height: halfBeatSize * 3 }} />
      </div>
    </div>
  );
});

function checkHit(zonePos: Position) {
  const notes = Array.from(document.querySelectorAll('[data-id="note"]'));

  for (const note of notes) {
    const rate = getOverlapRate(note, zonePos);
    if (rate !== HitRate.Miss) {
      return rate;
    }
  }

  return HitRate.Miss;
}

function getOverlapRate(note: Element, zonePos: Position): HitRate {
  const noteRect = note.getBoundingClientRect();

  const size = noteRect.height * 3;
  const diff = Math.sqrt(Math.pow(zonePos.x - noteRect.x, 2) + Math.pow(zonePos.y - noteRect.y, 2));

  if (diff > size) {
    return HitRate.Miss;
  }

  const percent = 100 - (diff / size) * 100;
  console.log(diff, size, percent);

  if (percent >= 70) {
    return HitRate.Perfect;
  } else if (percent >= 40) {
    return HitRate.Good;
  } else {
    return HitRate.Bad;
  }
}
