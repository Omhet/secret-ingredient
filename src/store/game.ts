import { GameStatus } from '@app-types/game';
import { Markup, NotesType } from '@app-types/music';
import create from 'zustand';

type GameStore = {
  isLoading: boolean;
  status: GameStatus;
  missCount: number;
  hitCount: number;
  touchedHeartCount: number;
  blastCount: number;
  markup: Markup;
  notes: NotesType;
  setIsLoading: (isLoading: boolean) => void;
  setGameStatus: (status: GameStatus) => void;
  setMarkup: (markup: Markup) => void;
  setNotes: (notes: NotesType) => void;
  removeNote: (beat: number) => void;
  increaseMissCount: () => void;
  increaseHitCount: () => void;
  increaseTouchedHeartCount: () => void;
  setBlastCount: (count: number) => void;
  decreaseBlastCount: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  isLoading: true,
  status: GameStatus.NotStarted,
  notes: [],
  markup: {} as Markup,
  missCount: 0,
  hitCount: 0,
  blastCount: 0,
  touchedHeartCount: 0,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setGameStatus: (status) => set(() => ({ status })),
  setMarkup: (markup) => set(() => ({ markup })),
  setNotes: (notes) => set(() => ({ notes })),
  removeNote: (noteToDelete) => set((state) => ({ notes: state.notes.filter((note) => note !== noteToDelete) })),
  increaseMissCount: () => set((state) => ({ missCount: state.missCount + 1 })),
  increaseHitCount: () => set((state) => ({ hitCount: state.hitCount + 1 })),
  increaseTouchedHeartCount: () => set((state) => ({ touchedHeartCount: state.touchedHeartCount + 1 })),
  setBlastCount: (blastCount) => set(() => ({ blastCount })),
  decreaseBlastCount: () =>
    set((state) => ({
      blastCount: state.blastCount > 0 ? state.blastCount - 1 : 0,
    })),
}));

export const useGame = () => {
  const state = useGameStore();

  return {
    isGameStarted: state.status === GameStatus.InProgress,
    hasBlasts: state.blastCount > 0,
    ...state,
  };
};
