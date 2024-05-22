import { create } from "zustand";

export type StoreType = {
  isPlaying: boolean;
  difficulty: string;
  diffNum: number;
  difficulties: string[];
  incDiff(): void;
  decDiff(): void;
  changeDiff(difficulty: number): void;
  setIsPlaying(isPlaying: boolean): void;
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
  diffNum: 0,
};

export const gameStore = create<StoreType>(function (set) {
  return {
    ...initialState,

    changeDiff: function (newDifficulty) {
      set((state: StoreType) => ({
        difficulty: state.difficulties[newDifficulty],
      }));
    },

    setIsPlaying: function (isPlaying) {
      set(() => ({
        isPlaying,
      }));
    },

    incDiff: function () {
      set((state: StoreType) => ({
        diffNum:
          state.diffNum < state.difficulties.length - 1 ? state.diffNum + 1 : 0,

        difficulty:
          state.difficulties[
            state.diffNum < state.difficulties.length - 1
              ? state.diffNum + 1
              : 0
          ],
      }));
    },

    decDiff: function () {
      set((state: StoreType) => ({
        diffNum:
          state.diffNum > 0 ? state.diffNum - 1 : state.difficulties.length - 1,

        difficulty:
          state.difficulties[
            state.diffNum > 0
              ? state.diffNum - 1
              : state.difficulties.length - 1
          ],
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
