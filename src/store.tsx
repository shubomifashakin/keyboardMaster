import { create } from "zustand";

export type StoreType = {
  isPlaying: boolean;
  difficulty: string;
  difficulties: string[];
  changeDiff(difficulty: number): void;
  setIsPlaying(hasFinished: boolean): void;
  resetGame(): void;
};

export type TimeStoreType = {
  timeUsed: number;
  incTime(): void;
  resetTime(): void;
};

const initialState = {
  isPlaying: false,
  difficulty: "Easy",
  difficulties: ["Easy", "Medium", "Hard"],
};

export const gameStore = create<StoreType>(function (set) {
  return {
    ...initialState,

    changeDiff: function (newDifficulty) {
      set((state: StoreType) => ({
        difficulty: state.difficulties[newDifficulty],
      }));
    },

    setIsPlaying: function (hasFinished) {
      set(() => ({
        isPlaying: hasFinished,
      }));
    },

    resetGame: function () {
      set(() => initialState);
    },
  };
});

export const timeStore = create<TimeStoreType>(function (set) {
  return {
    timeUsed: 1,

    incTime: function () {
      set((state) => ({
        timeUsed: state.timeUsed + 1,
      }));
    },

    resetTime: function () {
      set(() => ({ timeUsed: 1 }));
    },
  };
});
