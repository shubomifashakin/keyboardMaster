import { useCallback, useEffect } from "react";
import { VscDebugStart } from "react-icons/vsc";

import { StoreType, gameStore } from "../store";

import { Button } from "./Button";
import { GrKeyboard } from "react-icons/gr";

export function LandingPage() {
  const {
    difficulty,
    difficulties,
    decDiff,
    incDiff,
    resetGame,
    changeDiff,
    setIsPlaying,
  } = gameStore<StoreType>(function (state) {
    return state;
  });

  const handleStart = useCallback(
    function handleStart(): void {
      setIsPlaying(true);
    },
    [setIsPlaying],
  );

  useEffect(
    function () {
      function startGame(e: KeyboardEvent): void {
        //when the user clicks enter key start the game
        if (e.key.toLowerCase() === "enter") {
          handleStart();
        }

        //if they click escape, reset the game
        if (e.key.toLowerCase() === "escape") {
          resetGame();
        }

        //if user clicks left go to previous difficulty
        if (e.key.toLowerCase() === "arrowleft") {
          decDiff();
        }

        //if user clicks right go to next difficulty
        if (e.key.toLowerCase() === "arrowright") {
          incDiff();
        }
      }
      window.addEventListener("keyup", startGame);

      return () => window.removeEventListener("keyup", startGame);
    },
    [handleStart, resetGame, incDiff, decDiff],
  );

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center space-y-6 text-white">
      <section className="space-y-2 text-center">
        <h1 className="flex items-center gap-x-1 text-5xl font-bold uppercase tracking-widest">
          Keyboard Master
          <GrKeyboard className="text-6xl" />
        </h1>

        <p
          className=" tracking-wider text-stone-500
        "
        >
          Do you want to know how effective you are at typing?
        </p>

        <p className="text-sm tracking-wider text-yellow-500">
          Please note that the test is case-sensitive!
        </p>
      </section>

      <section className="items-center space-y-2 text-center">
        <h1 className="text-base font-bold capitalize tracking-wider">
          select difficulty
        </h1>

        <div className="flex  gap-x-4">
          {difficulties.map((diff, i) => {
            return (
              <Button
                key={i}
                title={diff}
                onClickFn={() => changeDiff(i)}
                label={diff}
                isSelected={difficulty === diff}
              />
            );
          })}
        </div>
      </section>

      <Button
        title="Start"
        onClickFn={handleStart}
        label={<VscDebugStart className="text-2xl" />}
        rounded={true}
      />
    </main>
  );
}
