import { Markup, NotesType } from '@app-types/music';
import create from 'zustand';

type GameStore = {
  isLoading: boolean;
  missCount: number;
  hitCount: number;
  touchedHeartCount: number;
  markup: Markup;
  notes: NotesType;
  setIsLoading: (isLoading: boolean) => void;
  setMarkup: (markup: Markup) => void;
  setNotes: (notes: NotesType) => void;
  removeNote: (beat: number) => void;
  increaseMissCount: () => void;
  increaseHitCount: () => void;
  increaseTouchedHeartCount: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  isLoading: true,
  notes: [],
  markup: {} as Markup,
  missCount: 0,
  hitCount: 0,
  touchedHeartCount: 0,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setMarkup: (markup) => set(() => ({ markup })),
  setNotes: (notes) => set(() => ({ notes })),
  removeNote: (noteToDelete) => set((state) => ({ notes: state.notes.filter((note) => note !== noteToDelete) })),
  increaseMissCount: () => set((state) => ({ missCount: state.missCount + 1 })),
  increaseHitCount: () => set((state) => ({ hitCount: state.hitCount + 1 })),
  increaseTouchedHeartCount: () => set((state) => ({ touchedHeartCount: state.touchedHeartCount + 1 })),
}));
