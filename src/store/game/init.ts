import { GameStatus } from '@app-types/game';
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { ingredientBlast } from '@lib/particles';
import { currentLevelStore, rewriteCurrentLevelScore, setCurrentLevelScore } from '@store/levels';
import { openGameEndModal } from '@store/modals';
import { guard } from 'effector';
import party from 'party-js';
import {
  blast,
  blastKey,
  decreaseBlastCount,
  endGame,
  gameStatusStore,
  gameStore,
  gameStoreInitial,
  increaseHitCount,
  increaseMissCount,
  increaseTouchedHeartCount,
  loadGame,
  noteTouchedHeart,
  removeNote,
  resetGameData,
  setBlastCount,
  setGameStatus,
  setIsLoading,
  setMarkup,
  setZone,
  startGame,
} from './index';
import { checkHit, getScore } from './utils';

gameStore
  .on(setIsLoading, (state, isLoading) => ({ ...state, isLoading }))
  .on(setGameStatus, (state, status) => ({ ...state, status }))
  .on(setBlastCount, (state, blastCount) => ({ ...state, blastCount }))
  .on(setMarkup, (state, markup) => ({ ...state, markup, notes: markup.notes }))
  .on(setZone, (state, zonePosition) => ({ ...state, zone: zonePosition }))
  .on(removeNote, (state, noteToDelete) => ({ ...state, notes: state.notes.filter((note) => note !== noteToDelete) }))
  .on(increaseMissCount, (state) => ({ ...state, missCount: state.missCount + 1 }))
  .on(increaseHitCount, (state) => ({ ...state, hitCount: state.hitCount + 1 }))
  .on(increaseTouchedHeartCount, (state) => ({ ...state, touchedHeartCount: state.touchedHeartCount + 1 }))
  .on(decreaseBlastCount, (state) => ({ ...state, blastCount: state.blastCount > 0 ? state.blastCount - 1 : 0 }))
  .on(resetGameData, () => ({ ...gameStoreInitial }));

loadGame.use(async (levelNumber: number) => {
  setIsLoading(true);

  resetGameData();

  const { markup } = await levelDataManager.loadLevelData(levelNumber);

  setMarkup(markup);
  setBlastCount(Math.round(markup.notes.length * 1.25));

  setIsLoading(false);
});

startGame.watch(() => {
  setGameStatus(GameStatus.InProgress);
  levelDataManager.playLevelMusic();
});

// Blast
guard({
  source: gameStore,
  clock: blastKey,
  filter: ({ status, blastCount }) => status === GameStatus.InProgress && blastCount > 0,
  target: blast,
});
blast.watch(() => {
  const {
    zone: { position, size },
  } = gameStore.getState();

  const colors = levelDataManager.getCurrentLevelData().ingredientColors;
  ingredientBlast(new party.Circle(position.x, position.y - size, size * 2), { colors });
  ingredientBlast(new party.Circle(position.x - size, position.y, size * 2), { colors });
  ingredientBlast(new party.Circle(position.x + size, position.y, size * 2), { colors });

  decreaseBlastCount();

  const beat = checkHit(position);
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

// Set end game status
guard({
  source: gameStore,
  filter: ({ status, blastCount, notes }) =>
    status === GameStatus.InProgress && (blastCount === 0 || notes.length === 0),
  target: setGameStatus.prepend(() => GameStatus.End),
});
// Call end game
guard({
  source: gameStatusStore,
  filter: (status) => status === GameStatus.End,
  target: endGame,
});

// Do end game stuff
endGame.watch(() => {
  const { hitCount, markup } = gameStore.getState();
  const { score: oldScore } = currentLevelStore.getState();

  const newScore = getScore(hitCount, markup.notes.length);
  setCurrentLevelScore(newScore);
  if (newScore > oldScore) {
    rewriteCurrentLevelScore(newScore);
  }

  openGameEndModal();
  levelDataManager.stopLevelMusic();
});
