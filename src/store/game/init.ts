import { GameStatus } from '@app-types/game';
import { guard } from 'effector';
import {
  blast,
  decreaseBlastCount,
  gameStore,
  increaseHitCount,
  increaseMissCount,
  increaseTouchedHeartCount,
  loadGame,
  noteTouchedHeart,
  removeNote,
  setBlastCount,
  setGameStatus,
  setIsLoading,
  setMarkup,
  setZonePosition,
  spaceDown,
  startGame,
} from './index';
import { checkHit, fetchMarkup } from './utils';

gameStore
  .on(setIsLoading, (state, isLoading) => ({ ...state, isLoading }))
  .on(setGameStatus, (state, status) => ({ ...state, status }))
  .on(setBlastCount, (state, blastCount) => ({ ...state, blastCount }))
  .on(setMarkup, (state, markup) => ({ ...state, markup, notes: markup.notes }))
  .on(setZonePosition, (state, zonePosition) => ({ ...state, zonePosition }))
  .on(removeNote, (state, noteToDelete) => ({ ...state, notes: state.notes.filter((note) => note !== noteToDelete) }))
  .on(increaseMissCount, (state) => ({ ...state, missCount: state.missCount + 1 }))
  .on(increaseHitCount, (state) => ({ ...state, hitCount: state.hitCount + 1 }))
  .on(increaseTouchedHeartCount, (state) => ({ ...state, touchedHeartCount: state.touchedHeartCount + 1 }))
  .on(decreaseBlastCount, (state) => ({ ...state, blastCount: state.blastCount > 0 ? state.blastCount - 1 : 0 }));

loadGame.watch(async () => {
  const TRACK_NAME = 'techno-120';

  setIsLoading(true);
  const markup = await fetchMarkup(TRACK_NAME);
  setMarkup(markup);
  setBlastCount(markup.notes.length * 1.25);
  setIsLoading(false);
});

startGame.watch(() => {
  setGameStatus(GameStatus.InProgress);
});

// Blast
guard({
  source: gameStore,
  clock: spaceDown,
  filter: ({ status, blastCount }) => status === GameStatus.InProgress && blastCount > 0,
  target: blast,
});
blast.watch(() => {
  const { zonePosition } = gameStore.getState();

  decreaseBlastCount();

  const beat = checkHit(zonePosition);
  if (beat !== undefined) {
    removeNote(beat);
    increaseHitCount();
  } else {
    increaseMissCount();
  }
});

// Touch heart
noteTouchedHeart.watch((note) => {
  removeNote(note);
  increaseTouchedHeartCount();
});

// End game
guard({
  source: gameStore,
  filter: ({ status, blastCount, notes }) =>
    status === GameStatus.InProgress && (blastCount === 0 || notes.length === 0),
  target: setGameStatus.prepend(() => GameStatus.End),
});
