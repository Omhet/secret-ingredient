import { GameStatus } from '@app-types/game';
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { currentLevelStore, rewriteCurrentLevelScore, setCurrentLevelScore } from '@store/levels';
import { openGameEndModal } from '@store/modals';
import { guard } from 'effector';
import {
  decreaseBlastCount,
  decreaseNoteCount,
  endGame,
  gameStatusStore,
  gameStore,
  gameStoreInitial,
  increaseHitCount,
  loadGame,
  resetGameData,
  setBlastCount,
  setGameStatus,
  setIsLoading,
  setNoteCount,
  startGame,
} from './index';

gameStore
  .on(setIsLoading, (state, isLoading) => ({ ...state, isLoading }))
  .on(setGameStatus, (state, status) => ({ ...state, status }))
  .on(setBlastCount, (state, blastCount) => ({ ...state, blastCount }))
  .on(setNoteCount, (state, noteCount) => ({ ...state, noteCount }))
  .on(increaseHitCount, (state) => ({ ...state, hitCount: state.hitCount + 1 }))
  .on(decreaseBlastCount, (state) => ({ ...state, blastCount: state.blastCount > 0 ? state.blastCount - 1 : 0 }))
  .on(decreaseNoteCount, (state) => ({ ...state, noteCount: state.noteCount > 0 ? state.noteCount - 1 : 0 }))
  .on(resetGameData, () => ({ ...gameStoreInitial }));

loadGame.use(async (levelNumber: number) => {
  setIsLoading(true);

  resetGameData();

  const { markup } = await levelDataManager.loadLevelData(levelNumber);

  setNoteCount(markup.notes.length);
  setBlastCount(Math.round(markup.notes.length * 1.25));

  setIsLoading(false);
});

startGame.watch(() => {
  setGameStatus(GameStatus.InProgress);
});

// Set end game status
guard({
  source: gameStore,
  filter: ({ status, blastCount, noteCount }) =>
    status === GameStatus.InProgress && (blastCount === 0 || noteCount === 0),
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
  const { hitCount } = gameStore.getState();
  const { score: oldScore } = currentLevelStore.getState();

  const newScore = hitCount;
  setCurrentLevelScore(newScore);
  if (newScore > oldScore) {
    rewriteCurrentLevelScore(newScore);
  }

  openGameEndModal();
  levelDataManager.stopLevelMusic();
});
