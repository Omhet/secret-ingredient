import create from 'zustand';

type GameStore = {
  missCount: number;
  hitCount: number;
  touchedHeartCount: number;
  increaseMissCount: () => void;
  increaseHitCount: () => void;
  increaseTouchedHeartCount: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  missCount: 0,
  hitCount: 0,
  touchedHeartCount: 0,
  increaseMissCount: () => set((state) => ({ missCount: state.missCount + 1 })),
  increaseHitCount: () => set((state) => ({ hitCount: state.hitCount + 1 })),
  increaseTouchedHeartCount: () => set((state) => ({ touchedHeartCount: state.touchedHeartCount + 1 })),
}));
