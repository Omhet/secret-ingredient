import { Midi } from '@tonejs/midi';
import { AnimatePresence, motion, TargetAndTransition } from 'framer-motion';
import React, { FC, forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useKeyPress } from 'react-use';
import classes from './Game.module.scss';
import { useAudio } from './useAudio';

export interface GameProps {}

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
    notes: track.notes.map((note) => note.time * bps + 0.5),
  };
};

const halfBeatSize = innerHeight / 8;
const beatSize = halfBeatSize * 2;

const LATENCY_COMPENSATION = 0.05;

export const Game: FC<GameProps> = ({}) => {
  const [missCount, setMissCount] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [touchedHeartCount, setTouchedHeartCountCount] = useState(0);
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
      const isHit = checkHit(zonePos);
      if (isHit) {
        setHitCount((prev) => prev + 1);
      } else {
        setMissCount((prev) => prev + 1);
      }
    }
  }, [isPressed, zonePos]);

  const playGame = () => {
    console.log('Play');
    toggle();
  };

  const handleAnimationComplete = useCallback((beat: number) => {
    setTouchedHeartCountCount((prev) => prev + 1);
    setNotes((prev) => prev.filter((b) => b !== beat));
  }, []);

  return (
    <>
      <div className={classes.scores}>
        <div>Touched heart: {touchedHeartCount}</div>
        <div>Miss: {missCount}</div>
        <div>Hit: {hitCount}</div>
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
          const initX = innerWidth / 2 - halfBeatSize / 2;
          const initY = zonePos.y - beatSize * 5 - halfBeatSize;

          const targetX = zonePos.x;
          const targetY = zonePos.y - halfBeatSize;

          return (
            <Note
              key={beat}
              beat={beat}
              initPos={{ x: initX, y: initY }}
              targetPos={{ x: targetX, y: targetY }}
              translateDuration={midi.barDuration + LATENCY_COMPENSATION}
              translateDelay={midi.spb * beat}
              beatDuration={midi.spb / 2}
              size={halfBeatSize}
              onAnimationComplete={onAnimationComplete}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
};

const Note: FC<{
  initPos: Position;
  targetPos: Position;
  translateDuration: number;
  translateDelay: number;
  beatDuration: number;
  beat: number;
  size: number;
  onAnimationComplete: (beat: number) => void;
}> = ({ beat, size, initPos, targetPos, translateDuration, translateDelay, beatDuration, onAnimationComplete }) => {
  return (
    <motion.div
      className={classes.noteMovingWrapper}
      data-id="note"
      initial={{ x: initPos.x, y: initPos.y }}
      animate={{ x: targetPos.x, y: targetPos.y }}
      exit={{
        opacity: 0,
        transition: {
          type: 'tween',
          ease: 'linear',
          duration: 0.1,
        },
      }}
      transition={{
        type: 'tween',
        ease: 'linear',
        duration: translateDuration,
        delay: translateDelay,
      }}
      onAnimationComplete={(target: TargetAndTransition) => {
        if (target.x && target.y) {
          onAnimationComplete(beat);
        }
      }}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          type: 'spring',
          mass: 0.5,
          duration: beatDuration,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={{ height: size, width: size }}
        className={classes.note}
      />
    </motion.div>
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

  return notes.some((note) => checkNoteHit(note, zonePos));
}

const HIT_PERCENT = 20;
function checkNoteHit(note: Element, zonePos: Position): boolean {
  const noteRect = note.getBoundingClientRect();

  const size = noteRect.height * 3;
  const diff = Math.sqrt(Math.pow(zonePos.x - noteRect.x, 2) + Math.pow(zonePos.y - noteRect.y, 2));

  const percent = (diff / size) * 100;

  return percent >= HIT_PERCENT && percent <= 100 - HIT_PERCENT;
}
