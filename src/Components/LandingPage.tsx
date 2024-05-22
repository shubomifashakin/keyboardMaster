import { useEffect } from "react";
import { VscDebugStart } from "react-icons/vsc";

import { StoreType, gameStore } from "../store";

import { Button } from "./Button";

export function LandingPage() {
  const { diffNum, difficulties, decDiff, changeDiff, incDiff, setIsPlaying } =
    gameStore<StoreType>(function (state) {
      return state;
    });

  function handleStart(): void {
    setIsPlaying(true);
  }

  useEffect(
    function () {
      function startGame(e: KeyboardEvent): void {
        //when the user clicks enter start the game
        if (e.key.toLowerCase() === "enter") {
          setIsPlaying(true);
        }

        //if the user clicks right go to next difficulty
        if (e.key.toLowerCase() === "arrowright") {
          incDiff();
        }

        //if user clicks left go to previous difficulty
        if (e.key.toLowerCase() === "arrowleft") {
          decDiff();
        }
      }
      window.addEventListener("keyup", startGame);

      return () => window.removeEventListener("keyup", startGame);
    },
    [setIsPlaying, incDiff, decDiff],
  );

  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center space-y-6 text-white">
      <section className="space-y-2 text-center">
        <h1 className="text-5xl font-bold uppercase tracking-widest">
          Keyboard Master
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
                isSelected={diffNum === i}
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
