import { create } from "zustand";

export type StoreType = {
  isPlaying: boolean;
  difficulty: string;
  difficulties: string[];
  changeDiff(difficulty: number): void;
  setIsPlaying(): void;
};

export const gameStore = create<StoreType>(function (set) {
  return {
    isPlaying: false,
    difficulty: "Easy",
    difficulties: ["Easy", "Medium", "Hard"],

    changeDiff: function (newDifficulty) {
      set((state: StoreType) => ({
        difficulty: state.difficulties[newDifficulty],
      }));
    },

    setIsPlaying: function () {
      set((state) => ({
        isPlaying: !state.isPlaying,
      }));
    },
  };
});
